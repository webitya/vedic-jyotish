"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus, Save, Trash2, Edit3, X, CheckCircle2,
  Upload, Image as ImageIcon, Eye, EyeOff, Loader2,
  Search, ArrowLeft, ExternalLink, Sparkles,
  Layers, Check, Copy, AlertCircle, FileText, ChevronRight,
  Settings2, Image, Tag, Star, ZoomIn, ArrowLeftRight
} from "lucide-react";

const DEFAULT_CATEGORIES = [
  "Consultation Chamber",
  "Classical Treatises",
  "Natural Gemstones",
  "Sacred Rudraksha",
  "Vastu & Yantras",
  "Spiritual Events",
];

export default function GalleryAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // New item form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Consultation Chamber");
  const [newCustomCategory, setNewCustomCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newPublicId, setNewPublicId] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Quick edit modal state
  const [editingItem, setEditingItem] = useState(null);

  // Lightbox preview modal
  const [lightboxImg, setLightboxImg] = useState(null);

  const fileInputRef = useRef();

  // ── Fetch Gallery Items from MongoDB ───────────────────────────────────────
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery?all=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to connect to database. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Upload Image to Cloudinary ────────────────────────────────────────────
  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/gallery");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setNewImageUrl(data.url);
      setNewPublicId(data.publicId || "");
      if (!newTitle) {
        // Auto-fill title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setNewTitle(cleanName);
      }
      showToast("Image uploaded to Cloudinary ✓");
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // ── Create New Gallery Item ───────────────────────────────────────────────
  const handleAddItem = async (e) => {
    e?.preventDefault();
    if (!newImageUrl.trim()) {
      setError("Please provide an image (upload or URL).");
      return;
    }
    if (!newTitle.trim()) {
      setError("Please enter a title or caption.");
      return;
    }

    setSaving(true);
    setError("");

    const categoryToUse =
      newCategory === "custom" ? newCustomCategory.trim() || "General" : newCategory;

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: categoryToUse,
          description: newDesc.trim(),
          image: {
            url: newImageUrl.trim(),
            publicId: newPublicId,
            alt: newAlt.trim() || newTitle.trim(),
          },
          active: true,
          featured: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add item");

      // Reset form
      setNewTitle("");
      setNewImageUrl("");
      setNewPublicId("");
      setNewAlt("");
      setNewDesc("");
      setNewCustomCategory("");
      showToast("Photo added to gallery ✓");
      fetchItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Gallery Item ───────────────────────────────────────────────────
  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title || 'this photo'}"?`)) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Delete failed");
      }
      showToast("Photo deleted permanently ✓");
      await fetchItems();
    } catch (err) {
      showToast("Error: " + err.message);
    }
  };

  // ── Toggle Active & Featured ──────────────────────────────────────────────
  const toggleActive = async (item) => {
    const itemId = item._id || item.id;
    try {
      const res = await fetch(`/api/gallery/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !item.active }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchItems();
      showToast(item.active ? "Photo hidden" : "Photo visible ✓");
    } catch (err) {
      showToast("Failed to update status: " + err.message);
    }
  };

  const toggleFeatured = async (item) => {
    const itemId = item._id || item.id;
    try {
      const res = await fetch(`/api/gallery/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !item.featured }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchItems();
      showToast(item.featured ? "Unmarked from Featured" : "Marked as Featured ✓");
    } catch (err) {
      showToast("Failed to update status: " + err.message);
    }
  };

  // ── Update Item in Quick Edit ─────────────────────────────────────────────
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    const itemId = editingItem._id || editingItem.id;
    try {
      const res = await fetch(`/api/gallery/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editingItem.title,
          category: editingItem.category,
          description: editingItem.description,
          image: {
            url: editingItem.image?.url || editingItem.url || "",
            publicId: editingItem.image?.publicId || "",
            alt: editingItem.image?.alt || editingItem.title,
          },
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Update failed");
      }
      setEditingItem(null);
      showToast("Photo updated in database ✓");
      await fetchItems();
    } catch (err) {
      showToast("Update failed: " + err.message);
    }
  };

  // Categories list derived from items + defaults
  const categoriesList = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...items.map((i) => i.category).filter(Boolean)])
  );

  // Filtered items
  const filteredItems = items.filter((i) => {
    const matchesSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.category && i.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "All" || i.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Compact Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
              Gallery Management
            </h1>
            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-medium text-neutral-700">
              Recommended: 1920 × 1080 px (16:9)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
            Upload, organize, and categorize photographic records and artifacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/gallery"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
          >
            <span>View Public Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ── Main Workspace Body ───────────────────────────────────────────────── */}
      <div className="flex-1 p-4 sm:p-5 space-y-4 w-full">
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-none font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="shrink-0 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Upload New Photo Studio Card ───────────────────────────────────── */}
        <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
            <div className="flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-black" />
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                Add Photo to Gallery
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">1920 × 1080 px (16:9 Ratio)</span>
          </div>

          <form onSubmit={handleAddItem} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
              
              {/* Left: Thumbnail & Upload Box */}
              <div className="md:col-span-4">
                <div
                  className={`aspect-[16/9] border-2 border-dashed relative flex flex-col items-center justify-center p-2 text-center transition-all ${
                    uploading
                      ? "border-neutral-400 bg-neutral-50"
                      : "border-neutral-300 hover:border-black bg-neutral-50"
                  }`}
                >
                  {newImageUrl ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={newImageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover border border-neutral-200"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2 py-0.5 bg-white text-black text-[10px] font-medium cursor-pointer rounded-none hover:bg-neutral-100"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewImageUrl("");
                            setNewPublicId("");
                          }}
                          className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-medium cursor-pointer rounded-none hover:bg-red-700"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer text-neutral-500 hover:text-black"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-neutral-600" />
                          <span className="text-[10px] font-medium">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-neutral-400" />
                          <span className="text-[11px] font-medium text-black">Upload File</span>
                          <span className="text-[9px] text-neutral-500 font-mono">1920 × 1080 px (16:9)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files?.[0])}
                />
              </div>

              {/* Right: Metadata Inputs */}
              <div className="md:col-span-8 space-y-2.5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Title / Caption *
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Rare 18th-century Palm Leaf Treatise"
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Category *
                    </label>
                    <div className="flex gap-1.5">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 text-xs border border-neutral-300 p-1.5 rounded-none bg-white focus:outline-none focus:border-black text-black font-medium"
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="custom">+ Add Custom Category...</option>
                      </select>

                      {newCategory === "custom" && (
                        <input
                          type="text"
                          value={newCustomCategory}
                          onChange={(e) => setNewCustomCategory(e.target.value)}
                          placeholder="Category name..."
                          className="w-36 text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Or Direct Image URL
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Alt Text (SEO & Accessibility)
                    </label>
                    <input
                      type="text"
                      value={newAlt}
                      onChange={(e) => setNewAlt(e.target.value)}
                      placeholder="e.g. Natural Untreated Yellow Sapphire Gemstone"
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Optional Description / Historical Context
                  </label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Short description of the artifact, location, or consultation record..."
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={saving || uploading || !newImageUrl.trim() || !newTitle.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save to Gallery</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </form>
        </div>

        {/* ── Filter Bar & Search ────────────────────────────────────────────── */}
        <div className="bg-white border border-neutral-300 p-2.5 shadow-xs rounded-none flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex-1 min-w-[220px] relative">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery photos..."
              className="w-full text-xs pl-7 pr-2.5 py-1.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black text-black"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {["All", ...categoriesList].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-2 py-1 text-[11px] font-medium border rounded-none cursor-pointer transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Photo Grid List ─────────────────────────────────────────────────── */}
        {loading ? (
          <div className="bg-white border border-neutral-300 p-16 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
            <span className="text-xs text-neutral-500 font-medium">Loading gallery records...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 p-16 text-center space-y-2.5">
            <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Photos Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Upload your first photographic record or artifact using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 w-full">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-neutral-300 hover:border-black shadow-xs rounded-none overflow-hidden flex flex-col justify-between transition-all group"
              >
                {/* Image Thumbnail & Overlay (16:9) */}
                <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden">
                  <img
                    src={item.image?.url || item.url || item.secure_url}
                    alt={item.image?.alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />

                  {/* Category Pill */}
                  <span className="absolute top-2 left-2 bg-black/80 text-white text-[9px] px-1.5 py-0.5 font-medium uppercase tracking-wider">
                    {item.category}
                  </span>

                  {item.featured && (
                    <span className="absolute top-2 right-2 bg-amber-600 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider">
                      Featured ★
                    </span>
                  )}

                  {/* Hover Zoom & View */}
                  <button
                    type="button"
                    onClick={() => setLightboxImg(item)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* Info & Caption */}
                <div className="p-3 space-y-1 flex-1">
                  <h3 className="text-xs font-semibold text-black line-clamp-1 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-[11px] text-neutral-500 line-clamp-2 font-normal">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom Actions Bar */}
                <div className="px-3 py-2 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(item)}
                      title={item.featured ? "Remove Featured" : "Mark Featured"}
                      className={`p-1 border rounded-none transition-colors cursor-pointer ${
                        item.featured
                          ? "bg-amber-50 text-amber-600 border-amber-300"
                          : "text-neutral-400 border-neutral-300 hover:text-amber-600"
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleActive(item)}
                      title={item.active ? "Hide Photo" : "Make Visible"}
                      className="p-1 text-neutral-500 hover:text-black border border-neutral-300 rounded-none cursor-pointer"
                    >
                      {item.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditingItem(item)}
                      className="p-1 text-neutral-700 hover:text-black border border-neutral-300 rounded-none cursor-pointer"
                      title="Edit Caption"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id, item.title)}
                      className="p-1 text-red-500 hover:text-red-700 border border-neutral-300 hover:border-red-500 rounded-none cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Quick Edit Modal ─────────────────────────────────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-300 w-full max-w-md shadow-2xl rounded-none overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                Edit Gallery Photo
              </span>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateItem} className="p-4 space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Title / Caption
                </label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Description
                </label>
                <textarea
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={2}
                  className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1 text-xs border border-neutral-300 hover:bg-neutral-100 rounded-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Fullscreen Lightbox Zoom Modal ───────────────────────────────────── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImg(null)}
            className="absolute top-4 right-4 text-white hover:text-neutral-300 p-2 cursor-pointer z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.image?.url || lightboxImg.url || lightboxImg.secure_url}
              alt={lightboxImg.title}
              className="max-h-[75vh] w-auto object-contain border border-neutral-700 shadow-2xl"
            />
            <div className="text-center text-white space-y-0.5">
              <h3 className="text-sm font-semibold">{lightboxImg.title}</h3>
              <p className="text-xs text-neutral-400">{lightboxImg.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notification ────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] bg-black text-white text-xs px-3.5 py-2 rounded-none shadow-2xl flex items-center gap-1.5 font-medium border border-neutral-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

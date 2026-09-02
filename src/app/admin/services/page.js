"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus, Save, Trash2, Edit3, X, CheckCircle2,
  Upload, Image as ImageIcon, Eye, EyeOff, Loader2,
  Search, ArrowLeft, ExternalLink, Sparkles,
  Layers, Check, Copy, AlertCircle, FileText, ChevronRight,
  Settings2, Tag, Star, Clock, Compass, DollarSign, LayoutTemplate
} from "lucide-react";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const DEFAULT_CATEGORIES = [
  "Astrology Consultation",
  "Financial & Professional Guidance",
  "Vastu Consultation",
  "Spiritual & Traditional Practices",
];

const emptyService = () => ({
  _id: null,
  name: "",
  slug: "",
  subtitle: "",
  category: "Astrology Consultation",
  shortSummary: "",
  description: "",
  icon: "Compass",
  price: "₹1,500",
  duration: "45-60 mins",
  bhavasAnalyzed: "",
  karakaPlanets: "",
  methodology: "",
  inclusions: [],
  image: { url: "", publicId: "", alt: "" },
  active: true,
  isPopular: false,
});

export default function ServicesAdminPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = List view, object = Studio View
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [newInclusion, setNewInclusion] = useState("");

  const fileRef = useRef();

  // ── Fetch Services from MongoDB ──────────────────────────────────────────
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services?all=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to connect to database. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Open Studio View ───────────────────────────────────────────────────────
  const openNew = () => {
    setEditing(emptyService());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (service) => {
    setEditing({
      ...emptyService(),
      ...service,
      inclusions: Array.isArray(service.inclusions) ? service.inclusions : [],
      image: service.image || { url: "", publicId: "", alt: "" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeStudio = () => {
    setEditing(null);
    setError("");
  };

  // ── Name Change Handler ────────────────────────────────────────────────────
  const handleNameChange = (val) => {
    setEditing((prev) => {
      const isNew = !prev._id;
      return {
        ...prev,
        name: val,
        slug: isNew ? slugify(val) : prev.slug,
        image: {
          ...prev.image,
          alt: prev.image?.alt || val,
        },
      };
    });
  };

  // ── Upload Image to Cloudinary ────────────────────────────────────────────
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/services");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setEditing((prev) => ({
        ...prev,
        image: {
          url: data.url,
          publicId: data.publicId,
          alt: prev.image?.alt || prev.name || "Service Cover Image",
        },
      }));
      showToast("Cover image uploaded to Cloudinary ✓");
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  // ── Add / Remove Inclusions ───────────────────────────────────────────────
  const addInclusion = (e) => {
    e?.preventDefault();
    if (!newInclusion.trim()) return;
    setEditing((p) => ({
      ...p,
      inclusions: [...(p.inclusions || []), newInclusion.trim()],
    }));
    setNewInclusion("");
  };

  const removeInclusion = (index) => {
    setEditing((p) => ({
      ...p,
      inclusions: p.inclusions.filter((_, idx) => idx !== index),
    }));
  };

  // ── Save Service to MongoDB ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!editing.name.trim()) {
      setError("Service Name is required.");
      return;
    }
    if (!editing.slug.trim()) {
      setError("URL Slug is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const isNew = !editing._id;
      const url = isNew ? "/api/services" : `/api/services/${editing._id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...editing,
        name: editing.name.trim(),
        slug: editing.slug.trim().toLowerCase(),
        image: {
          url: editing.image?.url || "",
          publicId: editing.image?.publicId || "",
          alt: editing.image?.alt || editing.name || "Service Image",
        },
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save service.");

      showToast(isNew ? "Service created ✓" : "Service updated ✓");
      closeStudio();
      fetchServices();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Service ────────────────────────────────────────────────────────
  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete service "${name}"?`)) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Service deleted ✓");
      fetchServices();
    } catch (err) {
      showToast("Error: " + err.message);
    }
  };

  // ── Toggle Active / Popular ───────────────────────────────────────────────
  const toggleActive = async (service) => {
    try {
      await fetch(`/api/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !service.active }),
      });
      fetchServices();
      showToast(service.active ? "Service Hidden" : "Service Activated ✓");
    } catch {
      showToast("Failed to update status");
    }
  };

  const togglePopular = async (service) => {
    try {
      await fetch(`/api/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPopular: !service.isPopular }),
      });
      fetchServices();
      showToast(service.isPopular ? "Removed from Featured" : "Marked as Featured ✓");
    } catch {
      showToast("Failed to update status");
    }
  };

  // Extract unique categories from current services + defaults
  const categoriesList = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...services.map((s) => s.category).filter(Boolean)])
  );

  // Filtered services
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.shortSummary && s.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "All" || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Studio Header (When Editing) ─────────────────────────────────────── */}
      {editing ? (
        <div className="bg-white border-b border-neutral-300 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeStudio}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="h-4 w-[1px] bg-neutral-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                {editing._id ? "Edit Service" : "New Service"}
              </span>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 border border-neutral-300 font-mono">
                {editing.slug ? `/services/${editing.slug}` : "/services/new-service"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editing._id && (
              <a
                href={`/services/${editing.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 rounded-none font-medium"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              type="button"
              onClick={closeStudio}
              className="px-3 py-1 text-xs border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-none cursor-pointer font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploadingImg}
              className="inline-flex items-center gap-1.5 px-4 py-1 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs disabled:opacity-50 transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Compact Header in List Mode */
        <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
              Services Directory
            </h1>
            <p className="text-[11px] text-neutral-500 font-normal">
              Manage consultation disciplines, pricing, descriptions, and methodology.
            </p>
          </div>

          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Service</span>
          </button>
        </div>
      )}

      {/* ── Main Workspace Body ───────────────────────────────────────────────── */}
      <div className="flex-1 p-4 sm:p-5 w-full">
        {/* Error Alert */}
        {error && (
          <div className="mb-3.5 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-none font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="shrink-0 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            SERVICE STUDIO VIEW (FULL WIDTH 100%)
        ════════════════════════════════════════════════════════════════════════ */}
        {editing ? (
          <div className="space-y-4 w-full">
            
            {/* 1. Basic Info (Full Width) */}
            <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3 w-full">
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-black">
                  Basic Discipline Info
                </span>
                <span className="text-[10px] text-neutral-400">Core Metadata</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Birth Chart Analysis"
                    className="w-full text-sm font-medium border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Sanskrit / Classical Subtitle
                  </label>
                  <input
                    type="text"
                    value={editing.subtitle}
                    onChange={(e) => setEditing((p) => ({ ...p, subtitle: e.target.value }))}
                    placeholder="e.g. Janam Kundali & Dasha"
                    className="w-full text-sm border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Category *
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))}
                    className="w-full text-xs border border-neutral-300 p-2 rounded-none bg-white focus:outline-none focus:border-black font-medium text-black"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Consultation Fee / Price
                  </label>
                  <input
                    type="text"
                    value={editing.price}
                    onChange={(e) => setEditing((p) => ({ ...p, price: e.target.value }))}
                    placeholder="e.g. ₹2,100"
                    className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Session Duration
                  </label>
                  <input
                    type="text"
                    value={editing.duration}
                    onChange={(e) => setEditing((p) => ({ ...p, duration: e.target.value }))}
                    placeholder="e.g. 45-60 mins"
                    className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                    URL Slug *
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    /services/{editing.slug || "service-slug"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="bg-neutral-100 border border-r-0 border-neutral-300 px-2.5 py-1.5 text-xs text-neutral-500 font-mono select-none">
                    /services/
                  </span>
                  <input
                    type="text"
                    value={editing.slug}
                    onChange={(e) => setEditing((p) => ({ ...p, slug: slugify(e.target.value) }))}
                    placeholder="birth-chart-analysis"
                    className="w-full text-xs font-mono border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>
            </div>

            {/* 2. Cover Image & Card Look Studio (Full Width) */}
            <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3 w-full">
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                <div className="flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-black" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-black">
                    Featured Cover Image & Card Look
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">Cloudinary Upload</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Left: Upload Box / Preview */}
                <div className="md:col-span-5">
                  <div
                    className={`aspect-[16/10] border-2 border-dashed relative flex flex-col items-center justify-center p-2 text-center transition-all ${
                      uploadingImg
                        ? "border-neutral-400 bg-neutral-50"
                        : "border-neutral-300 hover:border-black bg-neutral-50"
                    }`}
                  >
                    {editing.image?.url ? (
                      <div className="relative w-full h-full group">
                        <img
                          src={editing.image.url}
                          alt={editing.image.alt || editing.name}
                          className="w-full h-full object-cover border border-neutral-200"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="px-2.5 py-1 bg-white text-black text-xs font-medium cursor-pointer rounded-none hover:bg-neutral-100"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditing((p) => ({
                                ...p,
                                image: { url: "", publicId: "", alt: "" },
                              }))
                            }
                            className="px-2.5 py-1 bg-red-600 text-white text-xs font-medium cursor-pointer rounded-none hover:bg-red-700"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        disabled={uploadingImg}
                        className="w-full h-full flex flex-col items-center justify-center gap-1.5 cursor-pointer text-neutral-500 hover:text-black p-4"
                      >
                        {uploadingImg ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin text-neutral-600" />
                            <span className="text-xs font-medium">Uploading to Cloudinary...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-neutral-400" />
                            <span className="text-xs font-medium text-black">Upload Cover Image</span>
                            <span className="text-[10px] text-neutral-400">JPG, PNG, WebP (Recommended: 1200x800)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  />
                </div>

                {/* Right: URL & SEO Alt Inputs */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Direct Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={editing.image?.url || ""}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          image: { ...p.image, url: e.target.value },
                        }))
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                      Image Alt Text (SEO & Accessibility)
                    </label>
                    <input
                      type="text"
                      value={editing.image?.alt || ""}
                      onChange={(e) =>
                        setEditing((p) => ({
                          ...p,
                          image: { ...p.image, alt: e.target.value },
                        }))
                      }
                      placeholder="e.g. Ach. Dr. Mohit Shah analyzing birth chart horoscope"
                      className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                    />
                  </div>

                  {/* Public Card Appearance Live Simulator */}
                  <div className="pt-2 border-t border-neutral-200">
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 uppercase tracking-wider font-semibold mb-2">
                      <LayoutTemplate className="w-3.5 h-3.5" />
                      <span>Card Preview on Public Website</span>
                    </div>

                    <div className="bg-neutral-50 border border-neutral-200 p-3 max-w-sm rounded-none shadow-2xs">
                      {editing.image?.url ? (
                        <div className="aspect-[16/10] bg-neutral-900 mb-2 overflow-hidden relative">
                          <img
                            src={editing.image.url}
                            alt="Card Preview"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 bg-black text-white text-[9px] px-1.5 py-0.5 font-medium">
                            {editing.category}
                          </span>
                        </div>
                      ) : (
                        <div className="aspect-[16/10] bg-neutral-200 mb-2 flex items-center justify-center text-neutral-400 text-xs">
                          No Cover Image Attached
                        </div>
                      )}
                      <h4 className="text-xs font-semibold text-black truncate">
                        {editing.name || "Service Name"}
                      </h4>
                      {editing.subtitle && (
                        <span className="text-[10px] text-neutral-500 italic block">
                          {editing.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Descriptions & Summary (Full Width) */}
            <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3 w-full">
              <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-black">
                  Overview & Explanation
                </span>
                <span className="text-[10px] text-neutral-400">Public Descriptions</span>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                  Short Summary (Cards & Previews)
                </label>
                <textarea
                  value={editing.shortSummary}
                  onChange={(e) => setEditing((p) => ({ ...p, shortSummary: e.target.value }))}
                  placeholder="Concise overview shown on service cards..."
                  rows={2}
                  className="w-full text-xs border border-neutral-300 p-2.5 rounded-none focus:outline-none focus:border-black text-black resize-none font-normal leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                  Detailed Comprehensive Description
                </label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))}
                  placeholder="In-depth explanation of this consultation discipline..."
                  rows={4}
                  className="w-full text-xs border border-neutral-300 p-2.5 rounded-none focus:outline-none focus:border-black text-black resize-none font-normal leading-relaxed"
                />
              </div>
            </div>

            {/* ── Section Divider ───────────────────────────────────────────── */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700 whitespace-nowrap">
                Astrological Methodology, Deliverables & Media
              </span>
              <div className="h-[1px] bg-neutral-300 flex-1" />
            </div>

            {/* 4. Grid for Astrological Analysis & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              
              {/* Card A: Astrological Methodology */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Vedic Calculation Methodology
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Bhavas (Houses) Analyzed
                  </label>
                  <input
                    type="text"
                    value={editing.bhavasAnalyzed}
                    onChange={(e) => setEditing((p) => ({ ...p, bhavasAnalyzed: e.target.value }))}
                    placeholder="e.g. 1st to 12th Bhavas, Lagna Lord, Moon Sign..."
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Karaka Planets
                  </label>
                  <input
                    type="text"
                    value={editing.karakaPlanets}
                    onChange={(e) => setEditing((p) => ({ ...p, karakaPlanets: e.target.value }))}
                    placeholder="e.g. Sun (Atmakaraka), Moon (Mind), Jupiter (Wisdom)..."
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Calculation System / Treatises
                  </label>
                  <input
                    type="text"
                    value={editing.methodology}
                    onChange={(e) => setEditing((p) => ({ ...p, methodology: e.target.value }))}
                    placeholder="e.g. Parashari Ganita, Shadbala strength matrices, Ashtakavarga..."
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>

              {/* Card B: Inclusions / Deliverables */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Key Inclusions & Deliverables ({editing.inclusions?.length || 0})
                    </span>
                  </div>
                </div>

                {/* Add inclusion input */}
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addInclusion();
                      }
                    }}
                    placeholder="Add deliverable point & press Enter..."
                    className="flex-1 text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                  <button
                    type="button"
                    onClick={addInclusion}
                    className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Inclusions list */}
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {editing.inclusions?.map((inc, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-neutral-800 leading-snug flex-1">
                        • {inc}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeInclusion(idx)}
                        className="text-neutral-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Status Toggles */}
                <div className="pt-2 border-t border-neutral-200 grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 bg-neutral-50 border border-neutral-200">
                    <div>
                      <div className="text-xs font-medium text-black">Active Status</div>
                      <div className="text-[9px] text-neutral-500">Live on website</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing((p) => ({ ...p, active: !p.active }))}
                      className={`w-9 h-5 rounded-none transition-colors cursor-pointer relative shrink-0 ${
                        editing.active ? "bg-black" : "bg-neutral-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white shadow transition-all ${
                          editing.active ? "left-4.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-neutral-50 border border-neutral-200">
                    <div>
                      <div className="text-xs font-medium text-black">Featured Service</div>
                      <div className="text-[9px] text-neutral-500">Popular badge</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditing((p) => ({ ...p, isPopular: !p.isPopular }))}
                      className={`w-9 h-5 rounded-none transition-colors cursor-pointer relative shrink-0 ${
                        editing.isPopular ? "bg-black" : "bg-neutral-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white shadow transition-all ${
                          editing.isPopular ? "left-4.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════════
              SERVICES LIST VIEW
          ════════════════════════════════════════════════════════════════════════ */
          <div className="space-y-3.5 w-full">
            {/* Filter & Search Bar */}
            <div className="bg-white border border-neutral-300 p-2.5 shadow-xs rounded-none flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex-1 min-w-[220px] relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search consultation services..."
                  className="w-full text-xs pl-7 pr-2.5 py-1.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black text-black"
                />
              </div>

              {/* Category pills */}
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

            {/* Services List */}
            {loading ? (
              <div className="bg-white border border-neutral-300 p-12 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
                <span className="text-xs text-neutral-500 font-medium">Loading consultation services...</span>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 p-12 text-center space-y-2.5">
                <Compass className="w-8 h-8 text-neutral-300 mx-auto" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Services Found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  No services matching your filter. Click below to add a new consultation service.
                </p>
                <button
                  type="button"
                  onClick={openNew}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Service</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredServices.map((srv) => (
                  <div
                    key={srv._id}
                    className="bg-white border border-neutral-300 hover:border-black p-3.5 shadow-xs rounded-none flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all"
                  >
                    {/* Left: Info & Cover Preview */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {srv.image?.url ? (
                        <div className="w-14 h-14 bg-neutral-900 border border-neutral-200 overflow-hidden shrink-0">
                          <img
                            src={srv.image.url}
                            alt={srv.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 text-black">
                          <Compass className="w-4 h-4" />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-xs font-semibold text-black truncate max-w-lg">
                            {srv.name}
                          </h3>
                          {srv.subtitle && (
                            <span className="text-[10px] text-neutral-500 italic">
                              ({srv.subtitle})
                            </span>
                          )}
                          <span
                            className={`text-[9px] px-1.5 py-0.2 border font-medium ${
                              srv.active
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-neutral-100 text-neutral-500 border-neutral-200"
                            }`}
                          >
                            {srv.active ? "Active" : "Hidden"}
                          </span>
                          {srv.isPopular && (
                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 font-medium">
                              Featured ★
                            </span>
                          )}
                          {srv.category && (
                            <span className="text-[9px] bg-neutral-100 text-neutral-600 border border-neutral-200 px-1.5 py-0.2 font-medium">
                              {srv.category}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-neutral-600 line-clamp-1 font-normal mb-1">
                          {srv.shortSummary || srv.description}
                        </p>

                        <div className="flex items-center gap-3 text-[10px] text-neutral-500 font-normal">
                          {srv.price && (
                            <span className="font-semibold text-neutral-800">
                              Fee: {srv.price}
                            </span>
                          )}
                          {srv.duration && (
                            <>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-neutral-400" />
                                <span>{srv.duration}</span>
                              </span>
                            </>
                          )}
                          <span>·</span>
                          <span className="font-mono text-neutral-400">/services/{srv.slug}</span>
                          {srv.inclusions?.length > 0 && (
                            <>
                              <span>·</span>
                              <span>{srv.inclusions.length} deliverables</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-1.5 md:pt-0 border-t md:border-t-0 border-neutral-100">
                      <a
                        href={`/services/${srv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Public Service"
                        className="p-1.5 text-neutral-500 hover:text-black border border-neutral-300 hover:border-black rounded-none transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => togglePopular(srv)}
                        title={srv.isPopular ? "Remove Featured" : "Mark as Featured"}
                        className={`p-1.5 border rounded-none transition-colors cursor-pointer ${
                          srv.isPopular
                            ? "bg-amber-50 text-amber-600 border-amber-300"
                            : "text-neutral-400 border-neutral-300 hover:text-amber-600 hover:border-black"
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleActive(srv)}
                        title={srv.active ? "Hide from website" : "Make visible"}
                        className="p-1.5 text-neutral-500 hover:text-black border border-neutral-300 hover:border-black rounded-none transition-colors cursor-pointer"
                      >
                        {srv.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(srv)}
                        title="Edit Service"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(srv._id, srv.name)}
                        title="Delete"
                        className="p-1.5 text-red-500 hover:text-red-700 border border-neutral-300 hover:border-red-500 rounded-none transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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

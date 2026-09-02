"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus, Save, Trash2, Edit3, X, Clock, CheckCircle2,
  Upload, Image as ImageIcon, Eye, EyeOff, Loader2,
  Globe, Search, ArrowLeft, ExternalLink, FileCode,
  Layers, Check, Copy, AlertCircle, FileText, ChevronRight,
  Settings2, Image, Tag, Laptop, Smartphone, MoreVertical
} from "lucide-react";
import BlogWordEditor from "@/components/admin/BlogWordEditor";
import BadgeInput from "@/components/admin/BadgeInput";
import SchemaGeneratorModal from "@/components/admin/SchemaGeneratorModal";
import CategoryManagerModal from "@/components/admin/CategoryManagerModal";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const emptyForm = () => ({
  _id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Jyotish",
  tags: [],
  readTime: "5 min read",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  focusKeyword: "",
  canonicalUrl: "",
  robotsDirectives: "index, follow",
  schemaMarkup: "",
  author: {
    name: "Ach. Dr. Mohit Shah",
    role: "Founder & Chief Astrologer",
    avatar: "",
  },
  published: true,
  isFeatured: false,
  image: { url: "", publicId: "", alt: "", caption: "" },
});

const ASTRO_KEYWORD_SUGGESTIONS = [
  "Vedic Astrology", "Kundali Analysis", "Navamsha D9 Chart", "Vimshottari Dasha",
  "Vastu Shastra", "Planetary Transits", "Graha Dosha", "Gemstone Recommendation",
  "Marriage Compatibility", "Career Astrology", "Rahu Ketu Transit", "Saturn Sade Sati"
];

const CATEGORY_OPTIONS = [
  "Jyotish", "Vastu Shastra", "Planetary Transits", "Gemology", "Muhurat", "Spiritual Remedies", "Panchang"
];

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = List view, object = Studio View
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [serpMode, setSerpMode] = useState("desktop");

  const fileRef = useRef();

  // ── Fetch Categories from MongoDB ──────────────────────────────────────────
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      }
    } catch (e) {
      console.warn("Could not fetch categories:", e);
    }
  };

  // ── Fetch Blogs from MongoDB ───────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to connect to database. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Open Studio View ───────────────────────────────────────────────────────
  const openNew = () => {
    setEditing(emptyForm());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (blog) => {
    setEditing({
      ...emptyForm(),
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      metaKeywords: Array.isArray(blog.metaKeywords) ? blog.metaKeywords : [],
      author: blog.author || { name: "Ach. Dr. Mohit Shah", role: "Founder & Chief Astrologer" },
      image: blog.image || { url: "", publicId: "", alt: "", caption: "" },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeStudio = () => {
    setEditing(null);
    setError("");
  };

  // ── Title Change Handler ──────────────────────────────────────────────────
  const handleTitleChange = (val) => {
    setEditing((prev) => {
      const isNew = !prev._id;
      return {
        ...prev,
        title: val,
        slug: isNew ? slugify(val) : prev.slug,
        metaTitle: prev.metaTitle || val,
      };
    });
  };

  // ── Upload Image to Cloudinary ────────────────────────────────────────────
  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    setUploadingImg(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/blogs");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      showToast("Image uploaded to Cloudinary ✓");
      return data;
    } catch (err) {
      setError("Image upload failed: " + err.message);
      return null;
    } finally {
      setUploadingImg(false);
    }
  };

  const handleCoverUpload = async (file) => {
    const data = await uploadImageToCloudinary(file);
    if (data?.url) {
      setEditing((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          url: data.url,
          publicId: data.publicId || "",
          alt: prev.image?.alt || prev.title || "Article Image",
        },
      }));
    }
  };

  // ── Save Blog ─────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!editing.title.trim()) {
      setError("Title is required.");
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
      const url = isNew ? "/api/blogs" : `/api/blogs/${editing._id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...editing,
        title: editing.title.trim(),
        slug: editing.slug.trim().toLowerCase(),
        metaTitle: editing.metaTitle?.trim() || editing.title.trim(),
        metaDescription: editing.metaDescription?.trim() || editing.excerpt?.trim() || "",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save article.");

      showToast(isNew ? "Article created ✓" : "Article updated ✓");
      closeStudio();
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete Blog ───────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Article deleted ✓");
      fetchBlogs();
    } catch (err) {
      showToast("Error: " + err.message);
    }
  };

  // ── Toggle Publish ────────────────────────────────────────────────────────
  const togglePublish = async (blog) => {
    try {
      await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });
      fetchBlogs();
      showToast(blog.published ? "Article set to Draft" : "Article Published ✓");
    } catch (err) {
      showToast("Failed to update status");
    }
  };

  // Filtered blogs for list view
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "All" || b.category === filterCategory;
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
                {editing._id ? "Edit Article" : "New Article"}
              </span>
              <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 border border-neutral-300 font-mono">
                {editing.slug ? `/${editing.slug}` : "/new-post"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {editing._id && (
              <a
                href={`/blogs/${editing.slug}`}
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
                  <span>Save Article</span>
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
              Blog Management
            </h1>
            <p className="text-[11px] text-neutral-500 font-normal">
              Create, edit, and publish articles.
            </p>
          </div>

          <button
            type="button"
            onClick={openNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
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
            STUDIO VIEW (100% FULL-WIDTH WRITING AREA + METADATA ON SCROLL)
        ════════════════════════════════════════════════════════════════════════ */}
        {editing ? (
          <div className="space-y-4 w-full">
            
            {/* 1. Article Title & Slug (Full Width) */}
            <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-2.5 w-full">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter article title..."
                  className="w-full text-base sm:text-lg font-medium border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black placeholder-neutral-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                    URL Slug *
                  </label>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    /blogs/{editing.slug || "url-slug"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="bg-neutral-100 border border-r-0 border-neutral-300 px-2.5 py-1.5 text-xs text-neutral-500 font-mono select-none">
                    /blogs/
                  </span>
                  <input
                    type="text"
                    value={editing.slug}
                    onChange={(e) => setEditing((p) => ({ ...p, slug: slugify(e.target.value) }))}
                    placeholder="url-friendly-slug"
                    className="w-full text-xs font-mono border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>
              </div>
            </div>

            {/* 2. MS Word Rich Text Editor (100% Full Width) */}
            <div className="bg-white border border-neutral-300 p-1 shadow-xs rounded-none w-full">
              <div className="px-3.5 py-2 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-black" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-black">
                    Article Content
                  </span>
                </div>
              </div>

              <div className="p-1.5 w-full">
                <BlogWordEditor
                  value={editing.content}
                  onChange={(html) => setEditing((p) => ({ ...p, content: html }))}
                  onImageUpload={async (file) => {
                    const data = await uploadImageToCloudinary(file);
                    return data?.url || data;
                  }}
                />
              </div>
            </div>

            {/* 3. Short Excerpt / Summary (Full Width) */}
            <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none w-full">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                  Article Excerpt / Summary
                </label>
                <span className="text-[10px] text-neutral-400">
                  {editing.excerpt?.length || 0} characters
                </span>
              </div>
              <textarea
                value={editing.excerpt}
                onChange={(e) => setEditing((p) => ({ ...p, excerpt: e.target.value }))}
                placeholder="Brief summary displayed on article cards, previews, and RSS feeds..."
                rows={2}
                className="w-full text-xs border border-neutral-300 p-2.5 rounded-none focus:outline-none focus:border-black text-black placeholder-neutral-400 resize-none font-normal leading-relaxed"
              />
            </div>

            {/* ── Section Divider ───────────────────────────────────────────── */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-700 whitespace-nowrap">
                Publishing, Media & SEO Settings
              </span>
              <div className="h-[1px] bg-neutral-300 flex-1" />
            </div>

            {/* ── Metadata & Settings Grid (Appears on Scroll Below Editor) ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              
              {/* Card 1: Publishing & Visibility */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Publishing Settings
                    </span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.2 border font-medium ${
                    editing.published ? "bg-green-50 text-green-700 border-green-200" : "bg-neutral-100 text-neutral-500 border-neutral-200"
                  }`}>
                    {editing.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <div>
                    <div className="text-xs font-medium text-black">Visibility Status</div>
                    <div className="text-[10px] text-neutral-500">
                      {editing.published ? "Visible on live website" : "Hidden from public view"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditing((p) => ({ ...p, published: !p.published }))}
                    className={`w-9 h-5 rounded-none transition-colors cursor-pointer relative shrink-0 ${
                      editing.published ? "bg-black" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white shadow transition-all ${
                        editing.published ? "left-4.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1 border-t border-neutral-100">
                  <div>
                    <div className="text-xs font-medium text-black">Featured Article</div>
                    <div className="text-[10px] text-neutral-500">Pin article to top of listing</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditing((p) => ({ ...p, isFeatured: !p.isFeatured }))}
                    className={`w-9 h-5 rounded-none transition-colors cursor-pointer relative shrink-0 ${
                      editing.isFeatured ? "bg-black" : "bg-neutral-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white shadow transition-all ${
                        editing.isFeatured ? "left-4.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-neutral-200">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block">
                        Category
                      </label>
                      <button
                        type="button"
                        onClick={() => setCategoryModalOpen(true)}
                        className="text-[10px] text-black font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>Add / Manage</span>
                      </button>
                    </div>
                    <select
                      value={editing.category}
                      onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))}
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none bg-white focus:outline-none focus:border-black font-medium text-black"
                    >
                      {categories.map((cat) => (
                        <option key={cat._id || cat.id || cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={editing.readTime}
                      onChange={(e) => setEditing((p) => ({ ...p, readTime: e.target.value }))}
                      placeholder="5 min read"
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Author Attribution
                  </label>
                  <input
                    type="text"
                    value={editing.author?.name || ""}
                    onChange={(e) => setEditing((p) => ({ ...p, author: { ...p.author, name: e.target.value } }))}
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                  />
                </div>
              </div>

              {/* Card 2: Featured Image */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Featured Cover Image
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400">16:9 Aspect</span>
                </div>

                <div
                  className={`border-2 border-dashed p-2 transition-all text-center ${
                    uploadingImg ? "border-neutral-400 bg-neutral-50" : "border-neutral-300 hover:border-black"
                  }`}
                >
                  {editing.image?.url ? (
                    <div className="relative group">
                      <img
                        src={editing.image.url}
                        alt={editing.image.alt || "Cover"}
                        className="w-full h-36 object-cover border border-neutral-200"
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
                          onClick={() => setEditing((p) => ({ ...p, image: { url: "", publicId: "", alt: "", caption: "" } }))}
                          className="px-2.5 py-1 bg-red-600 text-white text-xs font-medium cursor-pointer rounded-none hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingImg}
                      className="w-full py-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-neutral-500 hover:text-black"
                    >
                      {uploadingImg ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-neutral-600" />
                          <span className="text-xs font-medium">Uploading to Cloudinary...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-neutral-400" />
                          <span className="text-xs font-medium text-black">Click to Upload Cover Image</span>
                          <span className="text-[10px] text-neutral-400">JPG, PNG, WebP</span>
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
                  onChange={(e) => handleCoverUpload(e.target.files?.[0])}
                />

                <div className="space-y-2 pt-1">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                      Image Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      value={editing.image?.alt || ""}
                      onChange={(e) => setEditing((p) => ({ ...p, image: { ...p.image, alt: e.target.value } }))}
                      placeholder="Descriptive explanation for search engines..."
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                      Or Direct Image URL
                    </label>
                    <input
                      type="url"
                      value={editing.image?.url || ""}
                      onChange={(e) => setEditing((p) => ({ ...p, image: { ...p.image, url: e.target.value } }))}
                      placeholder="https://..."
                      className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: SEO & Meta Tags */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      SEO & Meta Tags
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                    Focus Target Keyword
                  </label>
                  <input
                    type="text"
                    value={editing.focusKeyword}
                    onChange={(e) => setEditing((p) => ({ ...p, focusKeyword: e.target.value }))}
                    placeholder="e.g. Navamsha Chart"
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                      Meta Title
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {editing.metaTitle?.length || 0} / 60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={editing.metaTitle}
                    onChange={(e) => setEditing((p) => ({ ...p, metaTitle: e.target.value }))}
                    placeholder="SEO title tag displayed on search results..."
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                      Meta Description
                    </label>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {editing.metaDescription?.length || 0} / 160
                    </span>
                  </div>
                  <textarea
                    value={editing.metaDescription}
                    onChange={(e) => setEditing((p) => ({ ...p, metaDescription: e.target.value }))}
                    placeholder="Google search summary snippet..."
                    rows={2}
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black resize-none"
                  />
                </div>

                {/* Google Snippet Preview (Authentic Google Search UI) */}
                <div className="pt-2 border-t border-neutral-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                      Google Search Result Snippet Preview
                    </span>
                    <div className="flex items-center border border-neutral-300 rounded-none bg-neutral-100 p-0.5">
                      <button
                        type="button"
                        onClick={() => setSerpMode("desktop")}
                        className={`px-1.5 py-0.5 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                          serpMode === "desktop" ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                        }`}
                      >
                        <Laptop className="w-2.5 h-2.5" />
                        <span>Desktop</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSerpMode("mobile")}
                        className={`px-1.5 py-0.5 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                          serpMode === "mobile" ? "bg-white text-black shadow-xs" : "text-neutral-500 hover:text-black"
                        }`}
                      >
                        <Smartphone className="w-2.5 h-2.5" />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* Real Google SERP Result Card */}
                  <div className={`bg-white border border-neutral-200 p-3.5 shadow-xs font-sans text-left ${
                    serpMode === "mobile" ? "max-w-sm mx-auto border-neutral-300 rounded-lg p-3 bg-[#f8f9fa]" : ""
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Header: Favicon + Site Title + Breadcrumbs */}
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-[#f1f3f4] border border-[#dadce0] flex items-center justify-center shrink-0 text-[11px] font-semibold text-[#202124]">
                            🕉️
                          </div>
                          <div className="leading-tight min-w-0 flex-1">
                            <div className="text-[12px] font-normal text-[#202124] leading-tight">
                              Vedic Jyotish Kendra
                            </div>
                            <div className="text-[11px] text-[#4d5156] truncate font-normal leading-tight">
                              https://vedicjyotishkendra.in › blogs › {editing.slug || "url-slug"}
                            </div>
                          </div>
                          <div className="text-[#70757a] hover:text-[#202124] p-0.5 shrink-0 cursor-default">
                            <MoreVertical className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Blue Headline */}
                        <h4 className={`text-[#1a0dab] hover:underline font-normal cursor-pointer leading-snug mb-1 ${
                          serpMode === "mobile" ? "text-[16px]" : "text-[18px]"
                        }`}>
                          {editing.metaTitle || editing.title || "Vedic Astrology Article Title — Kundali & Remedies"}
                        </h4>

                        {/* Snippet Description */}
                        <p className="text-[13px] text-[#4d5156] leading-[1.5] font-normal line-clamp-2">
                          <span className="text-[#70757a] text-[12px]">
                            {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })} —{" "}
                          </span>
                          {editing.metaDescription || editing.excerpt || "Comprehensive Vedic astrology analysis, kundali horoscope charts, planetary remedies, and guidance from Ach. Dr. Mohit Shah."}
                        </p>
                      </div>

                      {/* SERP Image Thumbnail */}
                      {editing.image?.url && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-neutral-200 mt-1">
                          <img
                            src={editing.image.url}
                            alt={editing.image.alt || "Snippet preview"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Keywords, Tags & Schema */}
              <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3.5">
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-black" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black">
                      Keywords, Tags & Schema
                    </span>
                  </div>
                  {editing.schemaMarkup && (
                    <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.2 font-medium">
                      Schema Active ✓
                    </span>
                  )}
                </div>

                {/* Keywords */}
                <BadgeInput
                  label="Keywords (Badges)"
                  badges={editing.metaKeywords || []}
                  onChange={(newBadges) => setEditing((p) => ({ ...p, metaKeywords: newBadges }))}
                  placeholder="Type keyword & press Enter..."
                  suggestions={ASTRO_KEYWORD_SUGGESTIONS}
                />

                {/* Tags */}
                <div className="pt-2 border-t border-neutral-100">
                  <BadgeInput
                    label="Topics / Tags"
                    badges={editing.tags || []}
                    onChange={(newTags) => setEditing((p) => ({ ...p, tags: newTags }))}
                    placeholder="Type tag & press Enter..."
                    suggestions={["Astrology", "Planets", "Dasha", "Vastu", "Horoscope", "Kundali"]}
                  />
                </div>

                {/* Schema Generator */}
                <div className="pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setSchemaModalOpen(true)}
                    className="w-full py-2 bg-neutral-900 text-white hover:bg-black text-xs font-medium rounded-none flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <FileCode className="w-3.5 h-3.5 text-neutral-300" />
                    <span>Open Schema Generator & Editor</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════════
              ARTICLE LIST VIEW
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
                  placeholder="Search articles..."
                  className="w-full text-xs pl-7 pr-2.5 py-1.5 border border-neutral-300 rounded-none focus:outline-none focus:border-black text-black"
                />
              </div>

              {/* Category filter pills */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                <button
                  type="button"
                  onClick={() => setFilterCategory("All")}
                  className={`px-2 py-1 text-[11px] font-medium border rounded-none cursor-pointer transition-colors whitespace-nowrap ${
                    filterCategory === "All"
                      ? "bg-black text-white border-black"
                      : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id || cat.id || cat.name}
                    type="button"
                    onClick={() => setFilterCategory(cat.name)}
                    className={`px-2 py-1 text-[11px] font-medium border rounded-none cursor-pointer transition-colors whitespace-nowrap ${
                      filterCategory === cat.name
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
                    }`}
                  >
                    {cat.name} {cat.count ? `(${cat.count})` : ""}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(true)}
                  className="px-2 py-1 text-[11px] font-medium border border-dashed border-neutral-300 hover:border-black text-neutral-600 hover:text-black rounded-none cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>Category</span>
                </button>
              </div>
            </div>

            {/* Articles List */}
            {loading ? (
              <div className="bg-white border border-neutral-300 p-12 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
                <span className="text-xs text-neutral-500 font-medium">Loading articles...</span>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 p-12 text-center space-y-2.5">
                <FileText className="w-8 h-8 text-neutral-300 mx-auto" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Articles Found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  No articles matching your current filter. Click below to create your first article.
                </p>
                <button
                  type="button"
                  onClick={openNew}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Article</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border border-neutral-300 hover:border-black p-3 shadow-xs rounded-none flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all"
                  >
                    {/* Left: Thumbnail & Info */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-20 h-14 bg-neutral-100 border border-neutral-200 shrink-0 overflow-hidden relative">
                        {blog.image?.url ? (
                          <img
                            src={blog.image.url}
                            alt={blog.image.alt || blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                        {blog.isFeatured && (
                          <span className="absolute top-0.5 left-0.5 bg-black text-white text-[8px] uppercase tracking-wider px-1 font-bold">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className="text-xs font-semibold text-black truncate max-w-lg">
                            {blog.title}
                          </h3>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 border font-medium ${
                              blog.published
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-neutral-100 text-neutral-500 border-neutral-200"
                            }`}
                          >
                            {blog.published ? "Published" : "Draft"}
                          </span>
                          {blog.category && (
                            <span className="text-[9px] bg-neutral-100 text-neutral-600 border border-neutral-200 px-1.5 py-0.2 font-medium">
                              {blog.category}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 text-[10px] text-neutral-500 font-normal">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{blog.readTime || "5 min read"}</span>
                          </span>
                          <span>·</span>
                          <span className="font-mono text-neutral-400 truncate">/blogs/{blog.slug}</span>
                          {blog.createdAt && (
                            <>
                              <span>·</span>
                              <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-1.5 md:pt-0 border-t md:border-t-0 border-neutral-100">
                      <a
                        href={`/blogs/${blog.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Public Post"
                        className="p-1.5 text-neutral-500 hover:text-black border border-neutral-300 hover:border-black rounded-none transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => togglePublish(blog)}
                        title={blog.published ? "Switch to Draft" : "Publish"}
                        className="p-1.5 text-neutral-500 hover:text-black border border-neutral-300 hover:border-black rounded-none transition-colors cursor-pointer"
                      >
                        {blog.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(blog)}
                        title="Edit Article"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(blog._id)}
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

      {/* ── Category Manager Modal ────────────────────────────────────────── */}
      <CategoryManagerModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        categories={categories}
        onCategoryCreated={(newCat) => {
          setCategories((prev) => [...prev, newCat]);
          if (editing) {
            setEditing((p) => ({ ...p, category: newCat.name }));
          }
          showToast(`Category "${newCat.name}" created ✓`);
        }}
        onCategoryDeleted={(deletedId) => {
          setCategories((prev) => prev.filter((c) => (c._id || c.id) !== deletedId));
          showToast("Category deleted ✓");
        }}
      />

      {/* ── Schema Generator Modal ────────────────────────────────────────────── */}
      <SchemaGeneratorModal
        isOpen={schemaModalOpen}
        onClose={() => setSchemaModalOpen(false)}
        blogData={editing || {}}
        currentSchema={editing?.schemaMarkup || ""}
        onApplySchema={(jsonStr) => {
          setEditing((p) => ({ ...p, schemaMarkup: jsonStr }));
          showToast("Schema attached ✓");
        }}
      />

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

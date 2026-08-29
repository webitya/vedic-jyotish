"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus, Save, Trash2, Edit3, X, Clock, CheckCircle2,
  Upload, Image as ImageIcon, Eye, EyeOff, Loader2,
} from "lucide-react";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-neutral-200 px-6 py-4">
      <h1 className="text-base font-medium text-black">{title}</h1>
      <p className="text-xs text-neutral-500 font-normal mt-0.5">{subtitle}</p>
    </div>
  );
}

const emptyForm = () => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Jyotish",
  readTime: "5 min read",
  published: true,
  image: { url: "", publicId: "", alt: "" },
});

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = drawer closed
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const fileRef = useRef();

  // ── Fetch all blogs ──────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogs(data);
    } catch {
      setError("Could not connect to database. Check MONGODB_URI in .env.local");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // ── Toast helper ─────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Open drawer for new / edit ────────────────────────────────────────────
  const openNew = () => setEditing({ ...emptyForm(), _id: null });
  const openEdit = (blog) => setEditing({ ...blog });
  const closeDrawer = () => { setEditing(null); setError(""); };

  // ── Auto-slug from title ──────────────────────────────────────────────────
  const handleTitleChange = (val) => {
    setEditing((prev) => ({
      ...prev,
      title: val,
      slug: prev._id ? prev.slug : slugify(val), // only auto-slug for new
    }));
  };

  // ── Image upload → Cloudinary ─────────────────────────────────────────────
  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/blogs");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setEditing((prev) => ({
        ...prev,
        image: { url: data.url, publicId: data.publicId, alt: prev.title || "" },
      }));
      showToast("Image uploaded to Cloudinary ✓");
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploadingImg(false);
    }
  };

  // ── Save (create or update) ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!editing.title.trim() || !editing.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const isNew = !editing._id;
      const url = isNew ? "/api/blogs" : `/api/blogs/${editing._id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        title: editing.title,
        slug: editing.slug,
        excerpt: editing.excerpt,
        content: editing.content,
        category: editing.category,
        readTime: editing.readTime,
        published: editing.published,
        image: editing.image,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      showToast(isNew ? "Blog created ✓" : "Blog updated ✓");
      closeDrawer();
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post? This also removes the Cloudinary image.")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Blog deleted ✓");
      fetchBlogs();
    } catch (err) {
      showToast("Error: " + err.message);
    }
  };

  // ── Toggle publish ────────────────────────────────────────────────────────
  const togglePublish = async (blog) => {
    try {
      await fetch(`/api/blogs/${blog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blog.published }),
      });
      fetchBlogs();
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Blog Articles"
        subtitle="Manage blog posts stored in MongoDB. Images hosted on Cloudinary."
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Error banner */}
        {error && !editing && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-md font-normal flex items-start gap-2">
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="shrink-0 cursor-pointer"><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Actions bar */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500 font-normal">
            {loading ? "Loading…" : `${blogs.length} article${blogs.length !== 1 ? "s" : ""} in MongoDB`}
          </p>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-md cursor-pointer font-normal"
          >
            <Plus className="w-3 h-3" /> New Article
          </button>
        </div>

        {/* Blog list */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 rounded-md p-12 text-center">
            <p className="text-sm text-neutral-400 font-normal">No articles yet. Click "New Article" to create one.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white border border-neutral-200 rounded-md shadow-xs overflow-hidden flex items-stretch hover:border-neutral-300 transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 shrink-0 bg-neutral-100">
                  {blog.image?.url ? (
                    <img src={blog.image.url} alt={blog.image.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-neutral-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 px-4 py-3 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-black truncate">{blog.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-normal border ${blog.published ? "bg-green-50 text-green-700 border-green-200" : "bg-neutral-100 text-neutral-500 border-neutral-200"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    {blog.category && <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-normal">{blog.category}</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-[11px] text-neutral-400 font-normal">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                    <span>/{blog.slug}</span>
                    {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString("en-IN")}</span>}
                  </div>
                  {blog.excerpt && <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1 font-normal">{blog.excerpt}</p>}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 px-3 shrink-0 border-l border-neutral-100">
                  <button
                    onClick={() => togglePublish(blog)}
                    title={blog.published ? "Unpublish" : "Publish"}
                    className="p-1.5 text-neutral-400 hover:text-black border border-neutral-200 hover:border-neutral-400 rounded-md transition-all cursor-pointer"
                  >
                    {blog.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => openEdit(blog)}
                    className="p-1.5 text-neutral-400 hover:text-black border border-neutral-200 hover:border-neutral-400 rounded-md transition-all cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-1.5 text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 rounded-md transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Edit / New Drawer ─────────────────────────────────────────────── */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={closeDrawer}>
          <div
            className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 shrink-0">
              <h2 className="text-sm font-medium text-black">
                {editing._id ? "Edit Article" : "New Article"}
              </h2>
              <button onClick={closeDrawer} className="p-1 text-neutral-400 hover:text-black cursor-pointer rounded">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-md font-normal">{error}</div>
              )}

              {/* Image Upload */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal block mb-1.5">
                  Cover Image (Cloudinary)
                </label>
                <div
                  className={`border-2 border-dashed rounded-md transition-all ${uploadingImg ? "border-neutral-300 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"}`}
                >
                  {editing.image?.url ? (
                    <div className="relative">
                      <img src={editing.image.url} alt="Cover" className="w-full h-36 object-cover rounded-md" />
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <button
                          onClick={() => fileRef.current?.click()}
                          className="px-2 py-1 bg-black/70 text-white text-[10px] rounded cursor-pointer hover:bg-black font-normal"
                        >
                          Change
                        </button>
                        <button
                          onClick={() => setEditing((p) => ({ ...p, image: { url: "", publicId: "", alt: "" } }))}
                          className="px-2 py-1 bg-red-600/80 text-white text-[10px] rounded cursor-pointer hover:bg-red-600 font-normal"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingImg}
                      className="w-full h-24 flex flex-col items-center justify-center gap-2 cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      {uploadingImg ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /><span className="text-xs font-normal">Uploading…</span></>
                      ) : (
                        <><Upload className="w-5 h-5" /><span className="text-xs font-normal">Click to upload image</span><span className="text-[10px]">JPG, PNG, WebP up to 10MB</span></>
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
                {editing.image?.url && (
                  <div className="mt-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Image Alt Text</label>
                    <input
                      type="text"
                      value={editing.image.alt || ""}
                      onChange={(e) => setEditing((p) => ({ ...p, image: { ...p.image, alt: e.target.value } }))}
                      placeholder="Descriptive text for accessibility"
                      className="w-full mt-0.5 text-xs border border-neutral-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Title *</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Blog post title"
                  className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Slug * (auto-generated)</label>
                <input
                  type="text"
                  value={editing.slug}
                  onChange={(e) => setEditing((p) => ({ ...p, slug: slugify(e.target.value) }))}
                  placeholder="url-friendly-slug"
                  className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-mono text-neutral-700 placeholder-neutral-400"
                />
              </div>

              {/* Category + ReadTime row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Category</label>
                  <input
                    type="text"
                    value={editing.category}
                    onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))}
                    placeholder="Jyotish, Vastu…"
                    className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Read Time</label>
                  <input
                    type="text"
                    value={editing.readTime}
                    onChange={(e) => setEditing((p) => ({ ...p, readTime: e.target.value }))}
                    placeholder="5 min read"
                    className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Excerpt</label>
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing((p) => ({ ...p, excerpt: e.target.value }))}
                  placeholder="Short summary shown in listing pages…"
                  rows={3}
                  className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400 resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-normal">Full Content (HTML supported)</label>
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing((p) => ({ ...p, content: e.target.value }))}
                  placeholder="<p>Full article content…</p>"
                  rows={12}
                  className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-mono text-neutral-700 placeholder-neutral-400 resize-y"
                />
              </div>

              {/* Publish toggle */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setEditing((p) => ({ ...p, published: !p.published }))}
                  className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative shrink-0 ${editing.published ? "bg-black" : "bg-neutral-300"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${editing.published ? "left-4" : "left-0.5"}`} />
                </button>
                <span className="text-xs text-neutral-600 font-normal">
                  {editing.published ? "Published (visible on website)" : "Draft (hidden from website)"}
                </span>
              </div>
            </div>

            {/* Drawer footer */}
            <div className="px-5 py-4 border-t border-neutral-200 flex gap-2 shrink-0">
              <button onClick={closeDrawer} className="flex-1 py-2 text-xs border border-neutral-300 text-neutral-600 rounded-md cursor-pointer hover:bg-neutral-50 font-normal">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploadingImg}
                className="flex-1 py-2 text-xs bg-black text-white rounded-md cursor-pointer hover:bg-neutral-800 font-normal flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {saving ? <><Loader2 className="w-3 h-3 animate-spin" /> Saving…</> : <><Save className="w-3 h-3" /> Save to MongoDB</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-black text-white text-xs px-4 py-2.5 rounded-md shadow-xl flex items-center gap-2 font-normal">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus, Trash2, Save, CheckCircle2, Upload,
  Image as ImageIcon, Loader2, ArrowUp, ArrowDown,
  Eye, EyeOff, Sparkles, ExternalLink, ChevronLeft, ChevronRight
} from "lucide-react";

export default function CarouselAdminPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0);

  const fileInputRefs = useRef({});

  // ── Fetch Carousel Slides from MongoDB ─────────────────────────────────────
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/carousel?all=1");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSlides(data);
      } else {
        setSlides([]);
      }
    } catch {
      setError("Could not load slides from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Add New Slide ──────────────────────────────────────────────────────────
  const addSlide = () => {
    setSlides((prev) => [
      ...prev,
      {
        id: `temp-${Date.now()}`,
        url: "",
        image: "",
        publicId: "",
        alt: "",
        title: "",
        subtitle: "",
        link: "",
        active: true,
      },
    ]);
  };

  // ── Remove Slide ───────────────────────────────────────────────────────────
  const removeSlide = (index) => {
    setSlides((prev) => prev.filter((_, idx) => idx !== index));
  };

  // ── Update Field ───────────────────────────────────────────────────────────
  const updateField = (index, field, value) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      if (field === "url") copy[index].image = value;
      return copy;
    });
  };

  // ── Move Up / Down ─────────────────────────────────────────────────────────
  const moveUp = (index) => {
    if (index === 0) return;
    setSlides((prev) => {
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  const moveDown = (index) => {
    if (index === slides.length - 1) return;
    setSlides((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  };

  // ── Image Upload to Cloudinary ─────────────────────────────────────────────
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingIdx(index);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/carousel");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setSlides((prev) => {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          url: data.url,
          image: data.url,
          publicId: data.publicId,
          alt: copy[index].alt || "Vedic Jyotish Banner",
        };
        return copy;
      });
      showToast("Image uploaded to Cloudinary ✓");
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  // ── Save to MongoDB ────────────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slides),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      if (Array.isArray(data)) {
        setSlides(data);
      }
      showToast("Carousel slides saved to database ✓");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const activeSlides = slides.filter((s) => s.active && (s.url || s.image));

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Compact Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
              Hero Carousel
            </h1>
            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-medium text-neutral-700">
              Recommended: 1920 × 640 px (3:1)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
            Manage homepage hero banner slides with automated Cloudinary uploads and MongoDB sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-700 rounded-none cursor-pointer font-medium transition-colors"
          >
            {previewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{previewOpen ? "Hide Preview" : "Show Preview"}</span>
          </button>

          <button
            type="button"
            onClick={addSlide}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-black rounded-none cursor-pointer font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main Body ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 p-4 sm:p-5 space-y-4 w-full">
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2 rounded-none font-medium flex items-start gap-2">
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="shrink-0 cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* ── Live Carousel Simulator Preview ───────────────────────────────── */}
        {previewOpen && activeSlides.length > 0 && (
          <div className="bg-white border border-neutral-300 p-3 shadow-xs rounded-none space-y-2">
            <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600">
              <span className="uppercase tracking-wider font-semibold text-black">
                Live Homepage Simulator (1920 × 640 px · 3:1 Ratio)
              </span>
              <span>Slide {currentPreviewIdx + 1} of {activeSlides.length}</span>
            </div>

            <div className="relative w-full aspect-[1920/640] bg-neutral-900 overflow-hidden border border-neutral-200">

              {activeSlides.map((s, idx) => (
                <div
                  key={s._id || s.id || idx}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    idx === currentPreviewIdx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={s.url || s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={() => setCurrentPreviewIdx((p) => (p === 0 ? activeSlides.length - 1 : p - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/50 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPreviewIdx((p) => (p === activeSlides.length - 1 ? 0 : p + 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/50 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentPreviewIdx(idx)}
                    className={`h-1 cursor-pointer transition-all ${
                      idx === currentPreviewIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Slide Cards List ───────────────────────────────────────────────── */}
        {loading ? (
          <div className="bg-white border border-neutral-300 p-16 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
            <span className="text-xs text-neutral-500 font-medium">Loading carousel slides...</span>
          </div>
        ) : slides.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 p-16 text-center space-y-2.5">
            <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Slides in Carousel</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Add your first banner slide to display on the homepage hero section.
            </p>
            <button
              type="button"
              onClick={addSlide}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slide</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 w-full">
            {slides.map((slide, index) => {
              const hasImage = !!(slide.url || slide.image);
              const isUploading = uploadingIdx === index;

              return (
                <div
                  key={slide._id || slide.id || index}
                  className="bg-white border border-neutral-300 hover:border-black p-3.5 shadow-xs rounded-none transition-all"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-stretch gap-3.5">
                    
                    {/* Thumbnail / Upload Trigger */}
                    <div className="w-full md:w-44 aspect-[16/10] bg-neutral-100 border border-neutral-200 shrink-0 relative overflow-hidden group">
                      {hasImage ? (
                        <>
                          <img
                            src={slide.url || slide.image}
                            alt={slide.alt || `Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[index]?.click()}
                              className="px-2 py-0.5 bg-white text-black text-[10px] font-medium cursor-pointer rounded-none hover:bg-neutral-100"
                            >
                              Replace
                            </button>
                            <button
                              type="button"
                              onClick={() => updateField(index, "url", "")}
                              className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-medium cursor-pointer rounded-none hover:bg-red-700"
                            >
                              Clear
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[index]?.click()}
                          disabled={isUploading}
                          className="w-full h-full flex flex-col items-center justify-center gap-1 text-neutral-400 hover:text-black cursor-pointer p-2"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-neutral-600" />
                              <span className="text-[10px] font-medium">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-neutral-400" />
                              <span className="text-[10px] font-medium text-black">Upload Slide</span>
                              <span className="text-[9px] text-neutral-500 font-mono">1920 × 640 px (3:1)</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Index badge */}
                      <span className="absolute top-1 left-1 bg-black text-white text-[9px] font-mono px-1 py-0.2">
                        #{index + 1}
                      </span>
                    </div>

                    <input
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(index, e.target.files?.[0])}
                    />

                    {/* Inputs */}
                    <div className="flex-1 space-y-2 w-full">
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                            Image URL (or upload above) · 1920 × 640 px *
                          </label>
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[index]?.click()}
                            className="text-[10px] text-black font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-2.5 h-2.5" />
                            <span>Upload File</span>
                          </button>
                        </div>

                        <input
                          type="url"
                          value={slide.url || slide.image || ""}
                          onChange={(e) => updateField(index, "url", e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-normal"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-0.5">
                          Alt Text (SEO & Accessibility)
                        </label>
                        <input
                          type="text"
                          value={slide.alt || ""}
                          onChange={(e) => updateField(index, "alt", e.target.value)}
                          placeholder="e.g. Vedic Astrology — Kundali Analysis and Planetary Horoscopes"
                          className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-normal"
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex md:flex-col items-center justify-between md:justify-center gap-1.5 md:border-l md:border-neutral-200 md:pl-3 w-full md:w-auto shrink-0">
                      
                      {/* Active toggle */}
                      <button
                        type="button"
                        onClick={() => updateField(index, "active", !slide.active)}
                        title={slide.active ? "Slide Active (Visible)" : "Slide Inactive (Hidden)"}
                        className={`px-2 py-1 text-[10px] font-medium border rounded-none cursor-pointer transition-colors flex items-center gap-1 ${
                          slide.active
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-neutral-100 text-neutral-500 border-neutral-300"
                        }`}
                      >
                        {slide.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{slide.active ? "Active" : "Hidden"}</span>
                      </button>

                      {/* Reorder Up / Down */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          title="Move Slide Up"
                          className="p-1 border border-neutral-300 hover:border-black disabled:opacity-30 cursor-pointer rounded-none text-neutral-700"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveDown(index)}
                          disabled={index === slides.length - 1}
                          title="Move Slide Down"
                          className="p-1 border border-neutral-300 hover:border-black disabled:opacity-30 cursor-pointer rounded-none text-neutral-700"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeSlide(index)}
                        title="Delete Slide"
                        className="p-1 text-red-500 hover:text-red-700 border border-neutral-300 hover:border-red-500 rounded-none cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
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

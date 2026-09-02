"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus, Trash2, Save, CheckCircle2, Upload,
  Image as ImageIcon, Loader2, ArrowUp, ArrowDown,
  Eye, EyeOff, Monitor, Smartphone, Globe, ChevronLeft, ChevronRight
} from "lucide-react";

export default function CarouselAdminPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(true);
  const [filterTab, setFilterTab] = useState("all"); // "all" | "desktop" | "mobile" | "shared"
  const [simulatorMode, setSimulatorMode] = useState("desktop"); // "desktop" | "mobile"
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0);

  const fileInputRefs = useRef({});

  // ── Fetch Carousel Slides from MongoDB ─────────────────────────────────────
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/carousel?all=1&t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSlides(data.map((s) => ({
          ...s,
          device: s.device === "mobile" ? "mobile" : s.device === "all" ? "all" : "desktop",
        })));
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
    setTimeout(() => setToast(""), 3500);
  };

  // ── Add New Slide ──────────────────────────────────────────────────────────
  const addSlide = () => {
    let targetDevice = "desktop";
    if (filterTab === "mobile") targetDevice = "mobile";
    else if (filterTab === "shared") targetDevice = "all";
    else targetDevice = "desktop";

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
        device: targetDevice,
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
        const updated = data.map((s) => ({
          ...s,
          device: s.device === "mobile" ? "mobile" : s.device === "all" ? "all" : "desktop",
        }));
        setSlides(updated);

        const dCount = updated.filter((s) => s.device === "desktop").length;
        const mCount = updated.filter((s) => s.device === "mobile").length;
        const sCount = updated.filter((s) => s.device === "all").length;

        showToast(`Saved ${dCount} Desktop, ${mCount} Mobile (16:9), and ${sCount} Shared slides ✓`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Counts for each category
  const desktopCount = slides.filter((s) => s.device === "desktop" || !s.device).length;
  const mobileCount = slides.filter((s) => s.device === "mobile").length;
  const sharedCount = slides.filter((s) => s.device === "all").length;
  const totalCount = slides.length;

  // Active slides for preview based on simulatorMode
  const activeSimulatorSlides = slides.filter((s) => {
    if (!s.active || !(s.url || s.image)) return false;
    if (simulatorMode === "mobile") {
      return s.device === "mobile" || s.device === "all";
    } else {
      return s.device === "desktop" || s.device === "all" || !s.device;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
              Homepage Carousel &amp; Device Manager
            </h1>
            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-medium text-neutral-700">
              Desktop: 1920 × 640 · Mobile: 16:9 Ratio
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
            Target per slide: <strong>Desktop Only</strong> shows on desktop screens; <strong>Mobile (16:9)</strong> shows on mobile screens; <strong>Both</strong> shows on all screens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-700 rounded-none cursor-pointer font-medium transition-colors"
          >
            {previewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{previewOpen ? "Hide Preview" : "Live Simulator"}</span>
          </button>

          <button
            type="button"
            onClick={addSlide}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-black rounded-none cursor-pointer font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add {filterTab === "mobile" ? "Mobile 16:9" : "Desktop"} Slide</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs bg-[#6E3B1E] text-white hover:bg-[#582f17] rounded-none cursor-pointer font-semibold shadow-xs disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Carousel</span>
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

        {/* ── Device Filter Tabs ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-neutral-300 p-2 shadow-2xs">
          <div className="flex items-center gap-1">
            
            {/* All Tab */}
            <button
              type="button"
              onClick={() => { setFilterTab("all"); setCurrentPreviewIdx(0); }}
              className={`px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                filterTab === "all"
                  ? "bg-black text-white shadow-xs font-semibold"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <span>All Slides ({totalCount})</span>
            </button>

            {/* Desktop Tab */}
            <button
              type="button"
              onClick={() => { setFilterTab("desktop"); setSimulatorMode("desktop"); setCurrentPreviewIdx(0); }}
              className={`px-3.5 py-2 text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                filterTab === "desktop"
                  ? "bg-blue-700 text-white shadow-xs font-semibold"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>💻 Desktop Slides ({desktopCount})</span>
            </button>

            {/* Mobile Tab */}
            <button
              type="button"
              onClick={() => { setFilterTab("mobile"); setSimulatorMode("mobile"); setCurrentPreviewIdx(0); }}
              className={`px-3.5 py-2 text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                filterTab === "mobile"
                  ? "bg-amber-700 text-white shadow-xs font-semibold"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>📱 Mobile Slides · 16:9 ({mobileCount})</span>
            </button>

            {/* Both / Shared Tab */}
            <button
              type="button"
              onClick={() => { setFilterTab("shared"); setCurrentPreviewIdx(0); }}
              className={`px-3 py-2 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTab === "shared"
                  ? "bg-neutral-800 text-white shadow-xs font-semibold"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>🌐 Shared ({sharedCount})</span>
            </button>
          </div>

          <div className="text-[11px] text-neutral-500 font-normal pr-2">
            {filterTab === "all" && <span>Viewing all slides across all devices.</span>}
            {filterTab === "desktop" && <span>Editing banners visible <strong>on Desktop screens only</strong>.</span>}
            {filterTab === "mobile" && <span>Editing banners visible <strong>on Mobile screens only (16:9)</strong>.</span>}
            {filterTab === "shared" && <span>Editing banners visible <strong>on both Desktop and Mobile</strong>.</span>}
          </div>
        </div>

        {/* ── Live Carousel Simulator Preview with Mode Switcher ─────────────── */}
        {previewOpen && (
          <div className="bg-white border border-neutral-300 p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-neutral-200 pb-2.5">
              <div className="flex items-center gap-3">
                <span className="uppercase tracking-wider font-semibold text-black">
                  Live Screen Simulator:
                </span>
                {/* Simulator Switcher Pills */}
                <div className="flex bg-neutral-100 p-0.5 border border-neutral-300 rounded-xs">
                  <button
                    type="button"
                    onClick={() => { setSimulatorMode("desktop"); setCurrentPreviewIdx(0); }}
                    className={`px-3 py-1 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                      simulatorMode === "desktop"
                        ? "bg-blue-700 text-white font-semibold shadow-xs"
                        : "text-neutral-700 hover:text-black"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (1920 × 640)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSimulatorMode("mobile"); setCurrentPreviewIdx(0); }}
                    className={`px-3 py-1 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                      simulatorMode === "mobile"
                        ? "bg-amber-700 text-white font-semibold shadow-xs"
                        : "text-neutral-700 hover:text-black"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (16:9 Phone)</span>
                  </button>
                </div>

                <span className="text-neutral-500 text-[11px]">
                  ({activeSimulatorSlides.length} active slide{activeSimulatorSlides.length !== 1 ? "s" : ""})
                </span>
              </div>

              <div className="text-[11px] text-neutral-500">
                {simulatorMode === "desktop"
                  ? "Displays slides marked Desktop Only & Both"
                  : "Displays slides marked Mobile (16:9) & Both"}
              </div>
            </div>

            {activeSimulatorSlides.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-50 border border-dashed border-neutral-300">
                No active slides assigned to <strong>{simulatorMode === "desktop" ? "Desktop" : "Mobile (16:9)"}</strong>. Set target on any slide card below to &quot;{simulatorMode === "desktop" ? "Desktop Only" : "Mobile (16:9)"}&quot; and click Save.
              </div>
            ) : simulatorMode === "desktop" ? (
              /* Desktop Simulator View (1920 × 640) */
              <div className="relative w-full aspect-[1920/640] bg-neutral-900 overflow-hidden border border-neutral-300 shadow-inner">
                {activeSimulatorSlides.map((s, idx) => (
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

                {/* Controls */}
                {activeSimulatorSlides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setCurrentPreviewIdx((p) => (p === 0 ? activeSimulatorSlides.length - 1 : p - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPreviewIdx((p) => (p === activeSimulatorSlides.length - 1 ? 0 : p + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
                      {activeSimulatorSlides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentPreviewIdx(idx)}
                          className={`h-1 cursor-pointer transition-all ${
                            idx === currentPreviewIdx ? "w-5 bg-white" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Mobile Simulator View (Exact 16:9 Ratio Phone Frame) */
              <div className="flex justify-center py-3 bg-neutral-100 border border-neutral-200">
                <div className="w-full max-w-sm">
                  <div className="text-center text-[11px] text-neutral-600 font-semibold mb-1.5 flex items-center justify-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Mobile Screen Preview (16:9 Native Ratio)</span>
                  </div>
                  <div className="relative w-full aspect-[16/9] bg-neutral-900 rounded-lg overflow-hidden border-2 border-neutral-800 shadow-md">
                    {activeSimulatorSlides.map((s, idx) => (
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

                    {/* Mobile Controls */}
                    {activeSimulatorSlides.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setCurrentPreviewIdx((p) => (p === 0 ? activeSimulatorSlides.length - 1 : p - 1))}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-black/60 text-white hover:bg-black flex items-center justify-center rounded-full cursor-pointer transition-colors"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPreviewIdx((p) => (p === activeSimulatorSlides.length - 1 ? 0 : p + 1))}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 bg-black/60 text-white hover:bg-black flex items-center justify-center rounded-full cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1">
                          {activeSimulatorSlides.map((_, idx) => (
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
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Slide Cards List ───────────────────────────────────────────────── */}
        {loading ? (
          <div className="bg-white border border-neutral-300 p-16 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
            <span className="text-xs text-neutral-500 font-medium">Loading carousel slides...</span>
          </div>
        ) : (
          <div className="space-y-3 w-full">
            {slides.map((slide, realIndex) => {
              const deviceTarget = slide.device === "mobile" ? "mobile" : slide.device === "all" ? "all" : "desktop";

              // Strict tab filtering:
              if (filterTab === "desktop" && deviceTarget !== "desktop") return null;
              if (filterTab === "mobile" && deviceTarget !== "mobile") return null;
              if (filterTab === "shared" && deviceTarget !== "all") return null;

              const hasImage = !!(slide.url || slide.image);
              const isUploading = uploadingIdx === realIndex;

              return (
                <div
                  key={slide._id || slide.id || realIndex}
                  className="bg-white border border-neutral-300 hover:border-black p-4 shadow-xs rounded-none transition-all"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-stretch gap-4">
                    
                    {/* Thumbnail & Upload Box */}
                    <div className={`w-full md:w-48 ${deviceTarget === "mobile" ? "aspect-[16/9]" : "aspect-[16/10]"} bg-neutral-100 border border-neutral-200 shrink-0 relative overflow-hidden group`}>
                      {hasImage ? (
                        <>
                          <img
                            src={slide.url || slide.image}
                            alt={slide.alt || `Slide ${realIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[realIndex]?.click()}
                              className="px-2 py-1 bg-white text-black text-[10px] font-medium cursor-pointer rounded-none hover:bg-neutral-100"
                            >
                              Replace
                            </button>
                            <button
                              type="button"
                              onClick={() => updateField(realIndex, "url", "")}
                              className="px-2 py-1 bg-red-600 text-white text-[10px] font-medium cursor-pointer rounded-none hover:bg-red-700"
                            >
                              Clear
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[realIndex]?.click()}
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
                              <span className="text-[10px] font-medium text-black">Upload Banner</span>
                              <span className="text-[9px] text-neutral-500 font-mono">
                                {deviceTarget === "mobile" ? "16:9 Aspect Ratio" : "1920 × 640 px"}
                              </span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Index & Device Badge */}
                      <div className="absolute top-1 left-1 flex items-center gap-1">
                        <span className="bg-black text-white text-[9px] font-mono px-1 py-0.2">
                          #{realIndex + 1}
                        </span>
                        <span className={`text-[9px] font-semibold px-1 py-0.2 ${
                          deviceTarget === "mobile"
                            ? "bg-amber-600 text-white"
                            : deviceTarget === "desktop"
                            ? "bg-blue-600 text-white"
                            : "bg-neutral-800 text-white"
                        }`}>
                          {deviceTarget === "mobile" ? "Mobile (16:9)" : deviceTarget === "desktop" ? "Desktop Only" : "Both (Shared)"}
                        </span>
                      </div>
                    </div>

                    <input
                      ref={(el) => (fileInputRefs.current[realIndex] = el)}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(realIndex, e.target.files?.[0])}
                    />

                    {/* Inputs & Device Selector */}
                    <div className="flex-1 space-y-3 w-full">
                      
                      {/* Device Target Selector Tabs */}
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                          Target Display Device <span className="text-[#6E3B1E]">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-0.5 border border-neutral-300 max-w-md">
                          <button
                            type="button"
                            onClick={() => updateField(realIndex, "device", "desktop")}
                            className={`py-1.5 text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              deviceTarget === "desktop"
                                ? "bg-blue-700 text-white shadow-xs font-semibold"
                                : "text-neutral-700 hover:text-black hover:bg-neutral-200"
                            }`}
                          >
                            <Monitor className="w-3 h-3" />
                            <span>💻 Desktop Only</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => updateField(realIndex, "device", "mobile")}
                            className={`py-1.5 text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              deviceTarget === "mobile"
                                ? "bg-amber-700 text-white shadow-xs font-semibold"
                                : "text-neutral-700 hover:text-black hover:bg-neutral-200"
                            }`}
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>📱 Mobile (16:9)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => updateField(realIndex, "device", "all")}
                            className={`py-1.5 text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              deviceTarget === "all"
                                ? "bg-black text-white shadow-xs font-semibold"
                                : "text-neutral-700 hover:text-black hover:bg-neutral-200"
                            }`}
                          >
                            <Globe className="w-3 h-3" />
                            <span>🌐 Both</span>
                          </button>
                        </div>
                      </div>

                      {/* Image URL */}
                      <div>
                        <div className="flex items-center justify-between mb-0.5">
                          <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                            Image URL · {deviceTarget === "mobile" ? "16:9 Mobile Aspect" : "1920 × 640 Desktop"}
                          </label>
                          <button
                            type="button"
                            onClick={() => fileInputRefs.current[realIndex]?.click()}
                            className="text-[10px] text-black font-semibold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Upload className="w-2.5 h-2.5" />
                            <span>Upload File</span>
                          </button>
                        </div>

                        <input
                          type="url"
                          value={slide.url || slide.image || ""}
                          onChange={(e) => updateField(realIndex, "url", e.target.value)}
                          placeholder="https://..."
                          className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                        />
                      </div>

                      {/* Alt text */}
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-0.5">
                          Alt Text (SEO &amp; Accessibility)
                        </label>
                        <input
                          type="text"
                          value={slide.alt || ""}
                          onChange={(e) => updateField(realIndex, "alt", e.target.value)}
                          placeholder="Vedic Astrology Consultation Banner"
                          className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                        />
                      </div>

                    </div>

                    {/* Controls */}
                    <div className="flex md:flex-col items-center justify-between md:justify-center gap-1.5 md:border-l md:border-neutral-200 md:pl-3 w-full md:w-auto shrink-0">
                      
                      {/* Active toggle */}
                      <button
                        type="button"
                        onClick={() => updateField(realIndex, "active", !slide.active)}
                        title={slide.active ? "Slide Active (Visible)" : "Slide Inactive (Hidden)"}
                        className={`px-2.5 py-1 text-[10px] font-medium border rounded-none cursor-pointer transition-colors flex items-center gap-1 ${
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
                          onClick={() => moveUp(realIndex)}
                          disabled={realIndex === 0}
                          title="Move Slide Up"
                          className="p-1.5 border border-neutral-300 hover:border-black disabled:opacity-30 cursor-pointer rounded-none text-neutral-700"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveDown(realIndex)}
                          disabled={realIndex === slides.length - 1}
                          title="Move Slide Down"
                          className="p-1.5 border border-neutral-300 hover:border-black disabled:opacity-30 cursor-pointer rounded-none text-neutral-700"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeSlide(realIndex)}
                        title="Delete Slide"
                        className="p-1.5 text-red-500 hover:text-red-700 border border-neutral-300 hover:border-red-500 rounded-none cursor-pointer transition-colors"
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

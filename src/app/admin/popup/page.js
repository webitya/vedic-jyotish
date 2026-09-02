"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Save,
  Trash2,
  Upload,
  Eye,
  EyeOff,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Power,
  BellRing,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";

export default function PopupAdminPage() {
  const [enabled, setEnabled] = useState(true);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const fileInputRefs = useRef([]);
  const multiFileInputRef = useRef(null);

  // Fetch popup configuration
  useEffect(() => {
    fetch("/api/popup?all=1")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setEnabled(data.enabled !== false);
          setImages(Array.isArray(data.images) ? data.images : []);
        }
      })
      .catch(() => {
        setError("Failed to connect to database. Please check your connection.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Add a blank image card
  const addImage = () => {
    const newEntry = {
      url: "",
      publicId: "",
      link: "",
      active: true,
      order: images.length,
    };
    setImages([...images, newEntry]);
    setError("");
  };

  // Update field of an image
  const updateField = (idx, field, value) => {
    const updated = [...images];
    updated[idx][field] = value;
    setImages(updated);
  };

  // Delete an image
  const deleteImage = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    if (currentPreviewIdx >= updated.length) {
      setCurrentPreviewIdx(Math.max(0, updated.length - 1));
    }
  };

  // Move image up
  const moveUp = (idx) => {
    if (idx === 0) return;
    const updated = [...images];
    const temp = updated[idx - 1];
    updated[idx - 1] = updated[idx];
    updated[idx] = temp;
    setImages(updated);
  };

  // Move image down
  const moveDown = (idx) => {
    if (idx === images.length - 1) return;
    const updated = [...images];
    const temp = updated[idx + 1];
    updated[idx + 1] = updated[idx];
    updated[idx] = temp;
    setImages(updated);
  };

  // Upload single image to Cloudinary
  const handleImageUpload = async (idx, file) => {
    if (!file) return;
    setUploadingIdx(idx);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "vedic-jyotish/popup");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      const updated = [...images];
      updated[idx].url = data.url;
      updated[idx].publicId = data.publicId || "";
      setImages(updated);
      showToast("Banner image uploaded successfully ✓");
    } catch (err) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  // Upload multiple images simultaneously
  const handleMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSaving(true);
    setError("");

    try {
      const uploadedEntries = [];

      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "vedic-jyotish/popup");

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.url) {
          uploadedEntries.push({
            url: data.url,
            publicId: data.publicId || "",
            link: "",
            active: true,
            order: images.length + uploadedEntries.length,
          });
        }
      }

      if (uploadedEntries.length > 0) {
        setImages((prev) => [...prev, ...uploadedEntries]);
        showToast(`${uploadedEntries.length} popup banner(s) uploaded successfully ✓`);
      }
    } catch (err) {
      setError("Bulk upload error: " + err.message);
    } finally {
      setSaving(false);
      if (multiFileInputRef.current) {
        multiFileInputRef.current.value = "";
      }
    }
  };

  // Save all settings to MongoDB
  const handleSave = async () => {
    setSaving(true);
    setError("");

    const validImages = images
      .filter((img) => !!img.url.trim())
      .map((img, idx) => ({
        ...img,
        order: idx,
      }));

    try {
      const res = await fetch("/api/popup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled,
          images: validImages,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      showToast("Popup settings saved & synchronized ✓");
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const activeSlides = images.filter((img) => img.active && !!img.url);

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Compact Header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-black uppercase tracking-wider flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-black" />
              <span>Notification Popup Banner</span>
            </h1>
            <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-[10px] font-mono font-medium text-neutral-700">
              Size: 600 × 400 px (3:2)
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
            Manage modal announcement banners with master ON/OFF toggle, single or multi-slide carousel.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-2">
          {/* Master ON/OFF Switch */}
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-none cursor-pointer transition-colors border ${
              enabled
                ? "bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-xs"
                : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700 border-neutral-300"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>Popup: {enabled ? "ON (Active)" : "OFF (Disabled)"}</span>
          </button>

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
            onClick={() => multiFileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-black rounded-none cursor-pointer font-medium transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Multi</span>
          </button>

          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleMultiUpload}
          />

          <button
            type="button"
            onClick={addImage}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-black rounded-none cursor-pointer font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Banner</span>
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
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="shrink-0 cursor-pointer">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Master Status Banner */}
        <div className={`p-3.5 border flex items-center justify-between gap-4 transition-colors ${
          enabled ? "bg-green-50/70 border-green-200 text-green-900" : "bg-neutral-200/60 border-neutral-300 text-neutral-700"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-2.5 h-2.5 rounded-full ${enabled ? "bg-green-600 animate-pulse" : "bg-neutral-400"}`} />
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider">
                {enabled ? "Popup Notification is ENABLED" : "Popup Notification is DISABLED"}
              </div>
              <div className="text-[11px] text-neutral-600 font-normal">
                {enabled
                  ? `Active on website with ${activeSlides.length} banner image(s).`
                  : "Popup is paused and will not be displayed to website visitors."}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`px-3 py-1 text-xs font-medium border rounded-none cursor-pointer transition-colors ${
              enabled
                ? "bg-white text-green-800 border-green-300 hover:bg-green-100"
                : "bg-white text-black border-neutral-400 hover:bg-neutral-100"
            }`}
          >
            Switch to {enabled ? "OFF" : "ON"}
          </button>
        </div>

        {/* ── Live 600 × 400 px Popup Simulator Preview ───────────────────────── */}
        {previewOpen && (
          <div className="bg-white border border-neutral-300 p-4 shadow-xs rounded-none space-y-3">
            <div className="flex items-center justify-between text-[11px] font-medium text-neutral-600 border-b border-neutral-200 pb-2">
              <span className="uppercase tracking-wider font-semibold text-black flex items-center gap-1.5">
                <span>Live Popup Simulator (600 × 400 px Modal Aspect)</span>
                {!enabled && <span className="text-red-500 font-bold">(Currently OFF)</span>}
              </span>
              <span>
                {activeSlides.length > 0
                  ? `Slide ${currentPreviewIdx + 1} of ${activeSlides.length}`
                  : "No active images"}
              </span>
            </div>

            {/* Dark Backdrop Simulation */}
            <div className="relative w-full bg-black/75 p-6 sm:p-10 flex items-center justify-center min-h-[360px] overflow-hidden">
              
              {/* 600x400 Container */}
              <div className="relative w-full max-w-[600px] aspect-[600/400] bg-neutral-900 border border-neutral-700 shadow-2xl overflow-hidden group">
                
                {/* Close Button X */}
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute top-2.5 right-2.5 z-30 w-7 h-7 bg-black/70 hover:bg-black text-white border border-white/30 flex items-center justify-center cursor-pointer transition-colors rounded-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {activeSlides.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 p-4 text-center">
                    <ImageIcon className="w-8 h-8 text-neutral-600 mb-1" />
                    <span className="text-xs font-medium text-neutral-400">No active banner uploaded</span>
                    <span className="text-[10px] text-neutral-600">Upload 600 × 400 px image below</span>
                  </div>
                ) : (
                  <>
                    {activeSlides.map((s, idx) => (
                      <div
                        key={s._id || s.id || idx}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                          idx === currentPreviewIdx
                            ? "opacity-100 z-10"
                            : "opacity-0 z-0 pointer-events-none"
                        }`}
                      >
                        <img
                          src={s.url}
                          alt="Notification Popup Banner"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {/* Prev / Next controls for Carousel Mode */}
                    {activeSlides.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => setCurrentPreviewIdx((p) => (p === 0 ? activeSlides.length - 1 : p - 1))}
                          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPreviewIdx((p) => (p === activeSlides.length - 1 ? 0 : p + 1))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Indicator dots */}
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                          {activeSlides.map((_, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setCurrentPreviewIdx(idx)}
                              className={`transition-all ${
                                currentPreviewIdx === idx
                                  ? "w-5 h-1 bg-white"
                                  : "w-2 h-1 bg-white/40"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Banner Images Studio Cards ────────────────────────────────────────── */}
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-1.5">
              <span>Popup Banners ({images.length})</span>
              <span className="text-[10px] text-neutral-500 font-normal">
                (Pure image banner · No text fields)
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="bg-white border border-neutral-300 p-12 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
              <span className="text-xs text-neutral-500 font-medium">Loading popup records...</span>
            </div>
          ) : images.length === 0 ? (
            <div className="bg-white border border-dashed border-neutral-300 p-14 text-center space-y-2.5">
              <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Popup Banner Uploaded</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto font-normal">
                Upload a 600 × 400 px notification image to announce updates, events, or consultations.
              </p>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Banner</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 w-full">
              {images.map((img, index) => {
                const hasImage = !!img.url;
                const isUploading = uploadingIdx === index;

                return (
                  <div
                    key={index}
                    className={`bg-white border p-3.5 shadow-xs rounded-none transition-all ${
                      img.active ? "border-neutral-300 hover:border-black" : "border-neutral-200 opacity-60 bg-neutral-50"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-stretch gap-3.5">
                      
                      {/* Thumbnail (600 × 400 aspect: 3:2) */}
                      <div className="w-full md:w-48 aspect-[600/400] bg-neutral-100 border border-neutral-200 shrink-0 relative overflow-hidden group">
                        {hasImage ? (
                          <>
                            <img
                              src={img.url}
                              alt={`Popup Banner #${index + 1}`}
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
                                <span className="text-[10px] font-medium text-black">Upload Banner</span>
                                <span className="text-[9px] text-neutral-500 font-mono">600 × 400 px</span>
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

                      {/* Inputs without text/title fields */}
                      <div className="flex-1 space-y-2.5 w-full">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold">
                              Banner Image URL (600 × 400 px) *
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
                            value={img.url}
                            onChange={(e) => updateField(index, "url", e.target.value)}
                            placeholder="https://res.cloudinary.com/... or paste image link"
                            className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-semibold block mb-1">
                            Optional Click Redirect Link (e.g. /contact, /services, or external URL)
                          </label>
                          <div className="flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <input
                              type="text"
                              value={img.link || ""}
                              onChange={(e) => updateField(index, "link", e.target.value)}
                              placeholder="e.g. /contact#book or https://wa.me/..."
                              className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black font-normal"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Side Controls */}
                      <div className="flex md:flex-col items-center justify-between md:justify-center gap-1.5 md:border-l md:border-neutral-200 md:pl-3 w-full md:w-auto shrink-0">
                        {/* Active toggle */}
                        <button
                          type="button"
                          onClick={() => updateField(index, "active", !img.active)}
                          title={img.active ? "Banner Active" : "Banner Inactive"}
                          className={`px-2 py-1 text-[10px] font-medium border rounded-none cursor-pointer transition-colors flex items-center gap-1 w-full justify-center ${
                            img.active
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-neutral-100 text-neutral-500 border-neutral-300"
                          }`}
                        >
                          {img.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{img.active ? "Active" : "Hidden"}</span>
                        </button>

                        {/* Reorder Up / Down */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                            title="Move Up"
                            className="p-1 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveDown(index)}
                            disabled={index === images.length - 1}
                            title="Move Down"
                            className="p-1 border border-neutral-300 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => deleteImage(index)}
                          title="Delete Banner"
                          className="p-1 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer transition-colors"
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

"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical, Save, RotateCcw, CheckCircle2 } from "lucide-react";

const DEFAULT_SLIDES = [
  {
    id: "s1",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=2400&q=85",
    alt: "Vedic Astrology — Kundali and Dasha Chart",
  },
  {
    id: "s2",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    alt: "Vastu Shastra — Residential Architecture",
  },
  {
    id: "s3",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=2400&q=85",
    alt: "Navratna Gemstones and Rudraksha",
  },
  {
    id: "s4",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=2400&q=85",
    alt: "Ach. Dr. Mohit Shah — Vedic Astrologer",
  },
];

function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-neutral-200 px-6 py-4">
      <h1 className="text-base font-medium text-black">{title}</h1>
      <p className="text-xs text-neutral-500 font-normal mt-0.5">{subtitle}</p>
    </div>
  );
}

export default function CarouselAdmin() {
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_carousel");
    if (stored) {
      try { setSlides(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("admin_carousel", JSON.stringify(slides));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setSlides(DEFAULT_SLIDES);
    localStorage.removeItem("admin_carousel");
  };

  const addSlide = () => {
    setSlides([
      ...slides,
      { id: `s${Date.now()}`, image: "", alt: "" },
    ]);
  };

  const removeSlide = (id) => {
    setSlides(slides.filter((s) => s.id !== id));
  };

  const updateSlide = (id, field, value) => {
    setSlides(slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const arr = [...slides];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setSlides(arr);
  };

  const moveDown = (index) => {
    if (index === slides.length - 1) return;
    const arr = [...slides];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setSlides(arr);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Hero Carousel"
        subtitle="Manage the homepage hero carousel slides. Changes are saved to browser storage and reflect immediately on the homepage."
      />

      <div className="flex-1 p-6 space-y-4">
        {/* Action bar */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500 font-normal">{slides.length} slide{slides.length !== 1 ? "s" : ""}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 text-neutral-600 hover:border-neutral-400 hover:text-black rounded-md transition-all cursor-pointer font-normal"
            >
              <RotateCcw className="w-3 h-3" /> Reset Defaults
            </button>
            <button
              onClick={addSlide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-neutral-300 text-black hover:bg-neutral-100 rounded-md transition-all cursor-pointer font-normal"
            >
              <Plus className="w-3 h-3" /> Add Slide
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-md transition-all cursor-pointer font-normal"
            >
              {saved ? (
                <><CheckCircle2 className="w-3 h-3" /> Saved!</>
              ) : (
                <><Save className="w-3 h-3" /> Save Changes</>
              )}
            </button>
          </div>
        </div>

        {/* Slides */}
        <div className="space-y-3">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="bg-white border border-neutral-200 rounded-md shadow-xs overflow-hidden"
            >
              <div className="flex items-stretch">
                {/* Preview */}
                <div className="w-32 h-20 shrink-0 bg-neutral-100 relative overflow-hidden">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-400 text-[10px]">No image</div>
                  )}
                  <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-normal">
                    #{index + 1}
                  </div>
                </div>

                {/* Fields */}
                <div className="flex-1 p-3 space-y-2">
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-normal">Image URL</label>
                    <input
                      type="url"
                      value={slide.image}
                      onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full mt-0.5 text-xs border border-neutral-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-normal">Alt Text</label>
                    <input
                      type="text"
                      value={slide.alt}
                      onChange={(e) => updateSlide(slide.id, "alt", e.target.value)}
                      placeholder="Descriptive text for the image"
                      className="w-full mt-0.5 text-xs border border-neutral-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center justify-between p-2 border-l border-neutral-100 bg-neutral-50 gap-1">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 text-neutral-400 hover:text-black disabled:opacity-20 cursor-pointer text-[10px] font-normal">↑</button>
                  <GripVertical className="w-4 h-4 text-neutral-300" />
                  <button onClick={() => moveDown(index)} disabled={index === slides.length - 1} className="p-1 text-neutral-400 hover:text-black disabled:opacity-20 cursor-pointer text-[10px] font-normal">↓</button>
                  <button
                    onClick={() => removeSlide(slide.id)}
                    className="p-1 text-red-400 hover:text-red-600 cursor-pointer mt-1"
                    aria-label="Delete slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {slides.length === 0 && (
          <div className="bg-white border border-dashed border-neutral-300 rounded-md p-10 text-center">
            <p className="text-sm text-neutral-400 font-normal">No slides. Click "Add Slide" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

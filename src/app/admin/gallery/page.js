"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, CheckCircle2, Image as ImageIcon } from "lucide-react";

function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-neutral-200 px-6 py-4">
      <h1 className="text-base font-medium text-black">{title}</h1>
      <p className="text-xs text-neutral-500 font-normal mt-0.5">{subtitle}</p>
    </div>
  );
}

const DEFAULT_GALLERY = [
  { id: "g1", url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80", caption: "Kundali Chart Study" },
  { id: "g2", url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80", caption: "Sacred Texts Collection" },
  { id: "g3", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", caption: "Consultation Center" },
];

export default function GalleryAdmin() {
  const [images, setImages] = useState(DEFAULT_GALLERY);
  const [saved, setSaved] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("admin_gallery");
    if (stored) {
      try { setImages(JSON.parse(stored)); } catch {}
    }
  }, []);

  const save = (list) => {
    setImages(list);
    localStorage.setItem("admin_gallery", JSON.stringify(list));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addImage = () => {
    if (!newUrl.trim()) return;
    save([...images, { id: `g${Date.now()}`, url: newUrl.trim(), caption: newCaption.trim() }]);
    setNewUrl("");
    setNewCaption("");
  };

  const removeImage = (id) => save(images.filter((img) => img.id !== id));

  const updateCaption = (id, caption) => {
    setImages(images.map((img) => (img.id === id ? { ...img, caption } : img)));
  };

  const saveAll = () => save(images);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Gallery Images"
        subtitle="Manage images displayed in the gallery section. Add, remove, or reorder images."
      />

      <div className="flex-1 p-6 space-y-5">
        {/* Add new */}
        <div className="bg-white border border-neutral-200 rounded-md shadow-xs p-4">
          <h3 className="text-xs font-medium text-black mb-3">Add New Image</h3>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-normal">Image URL</label>
              <input
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://..."
                className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
              />
            </div>
            <div className="w-44">
              <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-normal">Caption</label>
              <input
                type="text"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Optional caption"
                className="w-full mt-1 text-xs border border-neutral-200 rounded px-2.5 py-2 focus:outline-none focus:border-neutral-400 font-normal text-black placeholder-neutral-400"
              />
            </div>
            <button
              onClick={addImage}
              disabled={!newUrl.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs bg-black text-white hover:bg-neutral-800 rounded-md cursor-pointer font-normal disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={saveAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-md cursor-pointer font-normal"
          >
            {saved ? <><CheckCircle2 className="w-3 h-3" /> Saved!</> : <><Save className="w-3 h-3" /> Save All</>}
          </button>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="bg-white border border-neutral-200 rounded-md shadow-xs overflow-hidden group">
              <div className="relative aspect-square bg-neutral-100">
                {img.url ? (
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-8 h-8 text-neutral-300" />
                  </div>
                )}
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <div className="p-2">
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) => updateCaption(img.id, e.target.value)}
                  placeholder="Caption…"
                  className="w-full text-[11px] text-neutral-700 placeholder-neutral-400 focus:outline-none font-normal border-b border-transparent focus:border-neutral-300 pb-0.5 transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="bg-white border border-dashed border-neutral-300 rounded-md p-10 text-center">
            <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-400 font-normal">No images. Add one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ZoomIn, X, ImageIcon } from "lucide-react";
import { galleryItems } from "@/data/siteContent";

export default function HomeGallerySection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Show up to 8 items to form 2 balanced rows
  const displayItems = items.slice(0, 8);

  return (
    <section className="w-full py-10 sm:py-14 bg-[#FAF7F2] border-b border-[#E6DDCE] font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Block: Full width description without explore button */}
        <div className="w-full mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight uppercase">
            View Gallery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
            There may be no better way to communicate what we do than through images. As you browse our site, take a few moments to let your eyes linger here, and see if you can get a feel for our signature touch.
          </p>
        </div>


        {/* 2-Row Photos Grid with Shimmering Skeletons */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-200/90 animate-pulse aspect-[16/9] rounded-lg border border-neutral-300/40 relative overflow-hidden flex flex-col justify-end p-3"
              >
                <div className="space-y-1.5 w-full">
                  <div className="h-3 bg-neutral-300/90 rounded-xs w-2/3" />
                  <div className="h-2 bg-neutral-300/60 rounded-xs w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayItems.length === 0 ? (
          <div className="text-center py-12 bg-white border border-[#E6DDCE] rounded-lg">
            <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-xs text-neutral-600">No gallery photos uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {displayItems.map((item, idx) => {
              const imgUrl = item.image?.url || item.url || item.secure_url;
              const imgTitle = item.title || item.caption || "Vedic Jyotish Kendra";
              return (
                <div
                  key={item._id || item.id || idx}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative aspect-[16/9] bg-neutral-900 rounded-lg overflow-hidden border border-[#E6DDCE] hover:border-[#7C2D37] shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={item.image?.alt || imgTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Zoom Icon on Hover Only (No text overlay) */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs border border-white/30 shadow-md">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}


      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxItem(null)}
              aria-label="Close Preview"
              className="absolute top-3 right-3 z-10 p-1.5 bg-black/70 text-white hover:bg-black rounded-full cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Image Preview (16:9 / 1920x1080 aspect) */}
            <div className="relative aspect-[16/9] bg-neutral-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.url || activeLightboxItem.image?.url || activeLightboxItem.image}
                alt={activeLightboxItem.caption || activeLightboxItem.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>


            {/* Bottom Caption */}
            <div className="p-4 bg-white border-t border-neutral-200 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-black">
                  {activeLightboxItem.caption || activeLightboxItem.title || "Vedic Jyotish Kendra"}
                </h3>
                {activeLightboxItem.category && (
                  <span className="text-[10px] bg-[#EFE7D8] text-neutral-800 px-2 py-0.5 rounded-sm font-medium uppercase">
                    {activeLightboxItem.category}
                  </span>
                )}
              </div>
              {activeLightboxItem.description && (
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {activeLightboxItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

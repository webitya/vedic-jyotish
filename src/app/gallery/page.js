"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { ZoomIn, X, ImageIcon } from "lucide-react";
import { galleryItems } from "@/data/siteContent";

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full bg-white">
        {/* Unified Gallery Section with tight heading spacing */}
        <section className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 border-b border-neutral-200">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Centered Heading */}
            <h1 className="text-xl sm:text-2xl font-semibold text-black uppercase tracking-wider text-center mb-5 sm:mb-6">
              Gallery
            </h1>

            {/* Photo Grid or Shimmering Light-Gray Skeletons */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-neutral-200/90 animate-pulse aspect-[16/9] rounded-md border border-neutral-300/40 relative overflow-hidden flex flex-col justify-end p-3.5"
                  >
                    <div className="space-y-1.5 w-full">
                      <div className="h-3.5 bg-neutral-300/90 rounded-xs w-3/4"></div>
                      <div className="h-2.5 bg-neutral-300/60 rounded-xs w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-neutral-300 rounded-md">
                <ImageIcon className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                <p className="text-xs text-neutral-500">No photos in the gallery yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
                {items.map((item) => {
                  const imgUrl = item.image?.url || item.image || item.url;
                  return (
                    <div
                      key={item._id || item.id}
                      onClick={() => setActiveLightboxItem(item)}
                      className="group relative cursor-pointer border border-neutral-200 bg-neutral-900 overflow-hidden aspect-[16/9] rounded-md shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      <img
                        src={imgUrl}
                        alt={item.image?.alt || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
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
        </section>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />

      {/* Compact Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 cursor-pointer"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative bg-white border border-neutral-300 max-w-2xl w-full overflow-hidden shadow-xl rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="px-4 py-2.5 bg-white border-b border-neutral-200 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <h3 className="text-xs font-semibold text-black uppercase tracking-wider truncate">
                  {activeLightboxItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                aria-label="Close"
                className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-md cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Image display (16:9 / 1920x1080) */}
            <div className="relative aspect-[16/9] bg-neutral-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.image?.url || activeLightboxItem.image || activeLightboxItem.url}
                alt={activeLightboxItem.image?.alt || activeLightboxItem.title}
                className="w-full h-full object-contain"
              />
            </div>


            {/* Description & Category Bar */}
            <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600 leading-relaxed font-normal space-y-1">
              {activeLightboxItem.category && (
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                  {activeLightboxItem.category}
                </span>
              )}
              <p className="text-neutral-700">
                {activeLightboxItem.description || activeLightboxItem.caption || `Photographic documentation of ${activeLightboxItem.title} preserved at Vedic Jyotish Kendra under Ach. Dr. Mohit Shah.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService="Kendra Visit & Consultation"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { ZoomIn, X } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/siteContent";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.categoryId === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Header */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                The Kendra & Vedic Artifacts
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Explore our consultation chamber in Ranchi, historical Sanskrit treatises, calculation charts, untreated gemstones, and sacred Himalayan Rudrakshas.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 mb-6 pb-3 border-b border-neutral-200">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-normal transition-all rounded-md cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-black text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="group relative cursor-pointer border border-neutral-200 bg-neutral-900 overflow-hidden min-h-[260px] flex flex-col justify-end rounded-md shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-102 transition-all duration-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>
                  
                  <div className="relative z-10 p-4 text-white flex items-end justify-between">
                    <div>
                      <h3 className="text-base font-medium text-white">
                        {item.title}
                      </h3>
                    </div>
                    <div className="w-7 h-7 bg-white/10 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 rounded-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <ConsultationCTA onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative bg-white border border-neutral-200 max-w-3xl w-full overflow-hidden shadow-2xl rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              aria-label="Close image lightbox"
              className="absolute top-3 right-3 z-10 w-7 h-7 bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer rounded-md"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 bg-black max-h-[55vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain max-h-[55vh]"
                />
              </div>

              <div className="md:col-span-5 p-5 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-medium text-black mb-2">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 text-[11px] text-neutral-500">
                  Vedic Jyotish Kendra · Archive Record
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

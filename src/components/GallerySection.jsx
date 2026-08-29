"use client";

import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/siteContent";

export default function GallerySection() {
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  return (
    <section id="gallery" className="w-full py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E6DED2]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-2 leading-tight">
              The Kendra & Vedic Heritage
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#626773] max-w-lg font-normal leading-relaxed">
            A visual record of our consultation chamber in Ranchi, classical Sanskrit treatises, astronomical natal chart ephemeris, and precious certified Vedic minerals.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Item 1 (Col 7) */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[0])}
            className="lg:col-span-7 group relative cursor-pointer border border-[#E6DED2] bg-[#191B20] overflow-hidden min-h-[300px] lg:min-h-[380px]"
          >
            <img
              src={galleryItems[0].image}
              alt={galleryItems[0].title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-103 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-[#191B20]/20 to-transparent"></div>
            
            <div className="absolute bottom-0 inset-x-0 p-6 text-[#FAF7F2] flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                  {galleryItems[0].category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
                  {galleryItems[0].title}
                </h3>
              </div>
              <div className="w-9 h-9 bg-white/10 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Item 2 (Col 5) */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[1])}
            className="lg:col-span-5 group relative cursor-pointer border border-[#E6DED2] bg-[#191B20] overflow-hidden min-h-[300px] lg:min-h-[380px]"
          >
            <img
              src={galleryItems[1].image}
              alt={galleryItems[1].title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-103 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-[#191B20]/20 to-transparent"></div>
            
            <div className="absolute bottom-0 inset-x-0 p-6 text-[#FAF7F2] flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                  {galleryItems[1].category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
                  {galleryItems[1].title}
                </h3>
              </div>
              <div className="w-9 h-9 bg-white/10 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Item 3 (Col 4) */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[2])}
            className="lg:col-span-4 group relative cursor-pointer border border-[#E6DED2] bg-[#191B20] overflow-hidden min-h-[260px]"
          >
            <img
              src={galleryItems[2].image}
              alt={galleryItems[2].title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-103 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-[#191B20]/20 to-transparent"></div>
            
            <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF7F2]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                {galleryItems[2].category}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-1">
                {galleryItems[2].title}
              </h3>
            </div>
          </div>

          {/* Item 4 (Col 4) */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[3])}
            className="lg:col-span-4 group relative cursor-pointer border border-[#E6DED2] bg-[#191B20] overflow-hidden min-h-[260px]"
          >
            <img
              src={galleryItems[3].image}
              alt={galleryItems[3].title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-103 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-[#191B20]/20 to-transparent"></div>
            
            <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF7F2]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                {galleryItems[3].category}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-1">
                {galleryItems[3].title}
              </h3>
            </div>
          </div>

          {/* Item 5 (Col 4) */}
          <div
            onClick={() => setActiveLightboxItem(galleryItems[4])}
            className="lg:col-span-4 group relative cursor-pointer border border-[#E6DED2] bg-[#191B20] overflow-hidden min-h-[260px]"
          >
            <img
              src={galleryItems[4].image}
              alt={galleryItems[4].title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-103 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-[#191B20]/20 to-transparent"></div>
            
            <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF7F2]">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                {galleryItems[4].category}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mt-1">
                {galleryItems[4].title}
              </h3>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#191B20]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative bg-[#FAF7F2] border border-[#B88E4B] max-w-4xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              aria-label="Close image lightbox"
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#191B20] text-white flex items-center justify-center hover:bg-[#5C1625] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 bg-[#191B20] max-h-[65vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-contain max-h-[65vh]"
                />
              </div>

              <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF7F2]">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#5C1625] font-semibold">
                    {activeLightboxItem.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1F2228] font-normal mt-1 mb-3">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#626773] leading-relaxed font-normal">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6DED2] text-xs text-[#626773]">
                  Vedic Jyotish Kendra · Archive
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

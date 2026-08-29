"use client";

import { Gem, ShieldCheck, CheckCircle2, Bell } from "lucide-react";

export default function GemstonesSection({ onOpenBooking }) {
  return (
    <section id="gemstones" className="w-full py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Container */}
        <div className="border border-[#E6DED2] bg-[#F4EFE6] p-6 sm:p-10 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (Col 7) */}
            <div className="lg:col-span-7">
              
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
                  Curated Mineral Collection
                </span>
                <span className="text-xs text-[#626773]">·</span>
                <span className="text-xs font-semibold tracking-wider text-[#B88E4B] uppercase">
                  Coming Soon
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1F2228] font-normal leading-tight mb-4">
                Laboratory-Certified Precious Gemstones & Sacred Rudraksha
              </h2>

              <p className="text-sm sm:text-base text-[#626773] leading-relaxed font-normal mb-6">
                In classical Jyotirvigyan (Ratna Vigyan), a gemstone is effective solely when it is 100% natural, unheated, untreated, and aligned with your ascendant lord. We are preparing a certified repository of natural Navratna gemstones and authentic Himalayan Rudrakshas.
              </p>

              {/* Verified Quality Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#E6DED2] mb-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#5C1625] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F2228]">Government Lab Testing</div>
                    <div className="text-xs text-[#626773] mt-0.5">Authentic gemological report accompanying every stone.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Gem className="w-4 h-4 text-[#5C1625] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F2228]">100% Natural & Untreated</div>
                    <div className="text-xs text-[#626773] mt-0.5">Zero thermal enhancements or glass treatments.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#5C1625] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F2228]">Ascendant Compatibility</div>
                    <div className="text-xs text-[#626773] mt-0.5">Prescribed strictly per your Lagna and dasha.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#5C1625] mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-[#1F2228]">Muhurta & Prana Pratishtha</div>
                    <div className="text-xs text-[#626773] mt-0.5">Guidance on exact weekday and Vedic consecration.</div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking("Gemstone & Rudraksha Suitability")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#5C1625] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Enquire for Gemstone Suitability</span>
                </button>

                <span className="text-xs text-[#626773] text-center sm:text-left">
                  Physical inspection available at Ranchi Kendra by appointment
                </span>
              </div>

            </div>

            {/* Right Column: Editorial Visual (Col 5) */}
            <div className="lg:col-span-5">
              <div className="border border-[#E6DED2] bg-[#FAF7F2] p-3 sm:p-4">
                <div className="relative aspect-square overflow-hidden bg-[#191B20]">
                  <img
                    src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=1000&q=80"
                    alt="Natural Untreated Vedic Gemstones"
                    className="w-full h-full object-cover opacity-90 hover:scale-103 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF7F2]">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                      Authentic Navratna Repository
                    </div>
                    <div className="font-serif text-lg font-normal text-white mt-0.5">
                      Yellow Sapphire · Ruby · Emerald · Blue Sapphire · Pearl
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

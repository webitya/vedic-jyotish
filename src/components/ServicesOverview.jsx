"use client";

import { ArrowRight, Compass, TrendingUp, Home, Flame, ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/data/siteContent";

export default function ServicesOverview({ onSelectCategory, onOpenBooking }) {
  const categoryIcons = {
    astrology: Compass,
    "finance-career": TrendingUp,
    vastu: Home,
    "spiritual-practices": Flame,
  };

  const romanNumerals = ["I", "II", "III", "IV"];

  return (
    <section id="services-overview" className="w-full py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E6DED2]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Consultation Framework
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-2 leading-tight">
              Guidance Rooted in Vedic Wisdom
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#626773] max-w-lg font-normal leading-relaxed">
            Vedic Jyotish combines celestial mathematics, environmental spatial harmony (Vastu), and classical remedial principles. Organized into four primary domains.
          </p>
        </div>

        {/* 4 Category Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => {
            const Icon = categoryIcons[category.id] || Compass;
            return (
              <div
                key={category.id}
                className="bg-[#FAF7F2] border border-[#E6DED2] p-6 flex flex-col justify-between hover:border-[#B88E4B] transition-all duration-300 group"
              >
                <div>
                  {/* Top Bar: Roman Numeral & Subtle Icon */}
                  <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#EAE2D5]">
                    <span className="font-serif text-lg font-medium text-[#5C1625]">
                      {romanNumerals[index]}.
                    </span>
                    <Icon className="w-4 h-4 text-[#B88E4B] group-hover:text-[#5C1625] transition-colors" />
                  </div>

                  {/* Title & Short Summary */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F2228] font-normal mb-2 leading-snug">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#626773] leading-relaxed mb-5 font-normal">
                    {category.shortDescription}
                  </p>

                  {/* Included Services List */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-[#EAE2D5]">
                    {category.services.map((srv) => (
                      <div key={srv.id} className="flex items-baseline gap-2 text-xs text-[#2F333B]">
                        <span className="w-1 h-1 rounded-full bg-[#B88E4B] shrink-0 mt-1"></span>
                        <span className="font-medium text-[#1F2228]">{srv.name}</span>
                        {srv.subtitle && (
                          <span className="text-[#626773] italic">({srv.subtitle})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-between">
                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5C1625] group-hover:text-[#3E0C17] transition-colors cursor-pointer"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="text-xs text-[#626773] hover:text-[#1F2228] underline underline-offset-4 cursor-pointer"
                  >
                    Book Slot
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

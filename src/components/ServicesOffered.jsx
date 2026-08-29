"use client";

import { useState } from "react";
import {
  Compass,
  Heart,
  CircleUser,
  Shield,
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart3,
  Scale,
  Home,
  Flame,
  Hash,
  Eye,
  Gem,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { serviceCategories, allServices, clinicInfo } from "@/data/siteContent";

export default function ServicesOffered({ activeCategoryId, onOpenBooking }) {
  const [selectedServiceId, setSelectedServiceId] = useState("birth-chart");

  const iconMap = {
    Compass,
    Heart,
    CircleUser,
    Shield,
    BookOpen,
    GraduationCap,
    Briefcase,
    TrendingUp,
    BarChart3,
    Scale,
    Home,
    Flame,
    Hash,
    Eye,
    Gem,
  };

  const currentService =
    allServices.find((s) => s.id === selectedServiceId) || allServices[0];
  const CurrentIcon = iconMap[currentService.icon] || Compass;

  return (
    <section id="services" className="w-full py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E6DED2]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Complete Consultation Directory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-2 leading-tight">
              Services Offered
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#626773] max-w-lg font-normal leading-relaxed">
            All consultations are conducted directly by Ach. Dr. Mohit Shah. Browse any of the 15 disciplines below to review diagnostic parameters and specific chart factors analyzed.
          </p>
        </div>

        {/* Dual-Column Interactive Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Categorized Index (Col 5) */}
          <div className="lg:col-span-5 space-y-5">
            {serviceCategories.map((cat) => (
              <div key={cat.id} className="border border-[#E6DED2] bg-[#FAF7F2]">
                
                {/* Category Header */}
                <div className="bg-[#F4EFE6] px-4 py-2.5 border-b border-[#E6DED2] flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#5C1625]">
                    {cat.title}
                  </span>
                  <span className="text-[11px] text-[#626773]">
                    {cat.services.length} Disciplines
                  </span>
                </div>

                {/* Service Items */}
                <div className="divide-y divide-[#EAE2D5]">
                  {cat.services.map((srv) => {
                    const SrvIcon = iconMap[srv.icon] || Compass;
                    const isSelected = selectedServiceId === srv.id;

                    return (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedServiceId(srv.id)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-[#5C1625] text-[#FAF7F2]"
                            : "hover:bg-[#F4EFE6] text-[#1F2228]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <SrvIcon
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? "text-[#DFCA9B]" : "text-[#B88E4B]"
                            }`}
                          />
                          <div>
                            <div className="text-sm font-semibold tracking-wide leading-snug">
                              {srv.name}
                            </div>
                            {srv.subtitle && (
                              <div
                                className={`text-xs ${
                                  isSelected ? "text-[#DFCA9B]/80 font-normal" : "text-[#626773] italic"
                                }`}
                              >
                                {srv.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 transition-transform shrink-0 ${
                            isSelected ? "text-[#DFCA9B] translate-x-1" : "text-transparent"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>

          {/* Right Column: Deep-Dive Presentation Showcase (Col 7) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="bg-[#FAF7F2] border border-[#B88E4B]/40 p-6 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[#5C1625]"></div>

              {/* Header */}
              <div className="flex items-start justify-between pb-5 border-b border-[#E6DED2] mb-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#5C1625] font-semibold">
                    {currentService.categoryTitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2228] font-normal mt-1 leading-tight">
                    {currentService.name}
                  </h3>
                  {currentService.subtitle && (
                    <div className="text-xs sm:text-sm italic text-[#626773] mt-1">
                      Traditional Classification: {currentService.subtitle}
                    </div>
                  )}
                </div>

                <div className="w-12 h-12 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                  <CurrentIcon className="w-5 h-5 text-[#5C1625]" />
                </div>
              </div>

              {/* In-depth Narrative */}
              <div className="text-[#626773] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                <p>{currentService.description}</p>
              </div>

              {/* Key Diagnostic Elements */}
              <div className="bg-[#F4EFE6] p-5 border border-[#E6DED2] mb-6">
                <h4 className="font-serif text-sm font-semibold text-[#1F2228] mb-3 uppercase tracking-wider">
                  Diagnostic & Chart Parameters Analyzed
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2F333B]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E4B] shrink-0" />
                    <span>Lagna & Navamsha (D9) Chart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E4B] shrink-0" />
                    <span>Vimshottari Dasha & Transits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E4B] shrink-0" />
                    <span>Shadbala & Planetary Strengths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E4B] shrink-0" />
                    <span>Classical Remedial Guidance</span>
                  </div>
                </div>
              </div>

              {/* Action Suite */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking(currentService.name)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#5C1625] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Book for {currentService.name}</span>
                </button>

                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#B88E4B] text-[#1F2228] hover:bg-[#F4EFE6] text-xs uppercase tracking-widest font-semibold transition-colors"
                >
                  <span>Call {clinicInfo.formattedPhone}</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

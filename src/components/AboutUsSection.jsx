"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, GraduationCap, CheckCircle2, ShieldCheck, Compass } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function AboutUsSection({ onOpenBooking }) {
  return (
    <section className="w-full py-8 sm:py-10 bg-[#FAF7F2] border-b border-[#E6DDCE] relative overflow-hidden font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Compact About Content */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            
            {/* Simple Sub-heading Text without badge or star icon */}
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#A86121] uppercase tracking-wider block mb-1">
                About Us
              </span>
            </div>

            {/* Heading & Subtitle */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black tracking-tight leading-snug">
                Classical Sanskrit Scholarship & Ethical Jyotish Diagnostics
              </h2>
              <p className="text-xs sm:text-sm text-[#7C2D37] font-serif italic font-medium mt-0.5">
                Guided by {clinicInfo.practitioner} — Jyotishacharya (M.A. RU) & Spiritual Counsellor
              </p>
            </div>

            {/* Concise Narrative */}
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              A premier Vedic advisory practice in Ranchi with over <strong>20+ years of clinical experience</strong> and 6,000+ consultations worldwide. We provide mathematical Parashari & Jaimini chart analysis, non-demolition scientific Vastu, and ethical remedial counselling without fatalistic fear.
            </p>

            {/* Compact Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="bg-white border border-[#E6DDCE] px-2.5 py-2 rounded-md shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black">
                  <GraduationCap className="w-3.5 h-3.5 text-[#A86121] shrink-0" />
                  <span>M.A. & MBA</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-normal">Jyotish Acharya</div>
              </div>

              <div className="bg-white border border-[#E6DDCE] px-2.5 py-2 rounded-md shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A86121] shrink-0" />
                  <span>20+ Years</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-normal">6,000+ Charts</div>
              </div>

              <div className="bg-white border border-[#E6DDCE] px-2.5 py-2 rounded-md shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black">
                  <Compass className="w-3.5 h-3.5 text-[#A86121] shrink-0" />
                  <span>Vastu Shastra</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-normal">No Demolition</div>
              </div>

              <div className="bg-white border border-[#E6DDCE] px-2.5 py-2 rounded-md shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-black">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A86121] shrink-0" />
                  <span>100% Private</span>
                </div>
                <div className="text-[10px] text-neutral-500 font-normal">Strict Privacy</div>
              </div>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-[#D5C9B6] hover:border-black text-black text-xs uppercase tracking-wider font-medium transition-all rounded-md shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <span>Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right Column: Acharya Ji Portrait with Rotating Vedic Mandala Backdrop */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-4 lg:py-0">
            {/* Rotating Circular Vedic Mandala Backdrop */}
            <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden flex items-center justify-center opacity-85 pointer-events-none -z-0">
              <img
                src="/vedicrounded.webp"
                alt="Vedic Astrology Mandala"
                className="w-full h-full object-contain rounded-full animate-[spin_90s_linear_infinite] drop-shadow-[0_6px_20px_rgba(168,97,33,0.12)] select-none pointer-events-none"
                loading="eager"
              />
            </div>

            {/* Acharya Ji Portrait Foreground */}
            <img
              src="/aacharyajii.png"
              alt="Acharya Dr. Mohit Shah - Vedic Jyotish Kendra"
              className="relative z-10 w-auto max-h-[340px] sm:max-h-[380px] object-contain object-top drop-shadow-lg select-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

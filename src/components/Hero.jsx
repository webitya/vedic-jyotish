"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, GraduationCap, BookOpen } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function Hero({ onOpenBooking }) {
  return (
    <section className="relative w-full bg-white border-b border-neutral-200 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-black"></span>
              <span className="text-xs uppercase tracking-widest font-bold text-neutral-700">
                {clinicInfo.name} · Ranchi Practice
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[1.08] mb-6">
              Ancient Wisdom. <br />
              <span className="text-neutral-600 font-semibold">Meaningful Guidance.</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl font-normal">
              A private astrological advisory and counselling practice established in Ranchi by <strong className="text-black font-semibold">Ach. Dr. Mohit Shah</strong>. Integrating classical Sanskrit mathematical systems, divisional chart synthesis, residential & commercial Vastu, and personalized remedial counselling without fatalistic superstition.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => onOpenBooking ? onOpenBooking() : window.location.href = "/contact#book"}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
              >
                <span>Reserve Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-300" />
              </button>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-black text-black hover:bg-neutral-50 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <span>Explore All 15 Disciplines</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>

            {/* Academic Foundations */}
            <div className="pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-base font-bold text-black">Ph.D. in Vedic Astrology</div>
                  <div className="text-xs text-neutral-500 mt-0.5">MCVA, Udaypur, RJ · Doctoral Research</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-base font-bold text-black">M.A. in Jyotirvigyan</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Ranchi University · Classical Studies</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Col 5) */}
          <div className="lg:col-span-5">
            <div className="border border-neutral-200 bg-neutral-50 p-3 sm:p-4">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80"
                  alt="Classical Vedic Astrology Ephemeris and Natal Chart Study"
                  className="w-full h-full object-cover object-center opacity-90 hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mb-1">
                    Personalized Jyotish Guidance
                  </div>
                  <div className="text-lg sm:text-xl font-bold leading-snug text-white mb-1.5">
                    Exact Mathematical Calculations & Classical Parashari Synthesis
                  </div>
                  <div className="text-xs text-neutral-300 font-normal leading-relaxed">
                    Consultations at Ranchi Kendra (Opp. Harmu Ground) & confidential online sessions.
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

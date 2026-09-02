"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  Calendar,
  Users,
  Star,
  Globe,
  Award,
  Compass,
  Grid,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Mic,
  ArrowRight
} from "lucide-react";

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full space-y-12 sm:space-y-16 py-8 sm:py-12">
        
        {/* ── SECTION 1: HERO SECTION ────────────────────────────────────────── */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading & Vision */}
              <div className="lg:col-span-6 space-y-5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 leading-[1.15] font-serif">
                  Rooted in Tradition.<br />
                  Guided by <span className="text-[#6E3B1E] font-medium">Wisdom.</span>
                </h1>

                <div className="flex items-center gap-2 py-1">
                  <div className="w-12 h-px bg-[#D9CDBF]"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#6E3B1E]"></div>
                  <div className="w-12 h-px bg-[#D9CDBF]"></div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal max-w-xl">
                  <p>
                    Vedic Jyotish Kendra was founded with a simple vision — to help individuals understand their life&apos;s purpose and journey through the timeless science of Vedic Astrology.
                  </p>
                  <p>
                    With decades of experience, Acharya Mohit Ji has guided thousands of individuals across the world with clarity, compassion and accurate astrological solutions.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>BOOK A CONSULTATION</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Portrait with Circular Vedic Backdrop */}
              <div className="lg:col-span-6 flex justify-center items-center relative py-6">
                {/* Circular Vedic Chakra Mandala Backdrop (Enlarged) */}
                <div className="absolute w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] lg:w-[520px] lg:h-[520px] rounded-full overflow-hidden flex items-center justify-center opacity-85 pointer-events-none -z-0">
                  <img
                    src="/vedicrounded.webp"
                    alt="Vedic Astrology Chakra"
                    className="w-full h-full object-contain rounded-full animate-[spin_90s_linear_infinite]"
                  />
                </div>

                {/* Acharya Ji Portrait in foreground */}
                <img
                  src="/aacharyajii.png"
                  alt="Acharya Dr. Mohit Shah - Vedic Jyotish Kendra"
                  className="relative z-10 w-auto max-h-[380px] sm:max-h-[420px] object-contain object-top drop-shadow-lg select-none"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 2: STATS / METRICS STRIP ──────────────────────────────── */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Stat 1 */}
              <div className="bg-white border border-[#E6DDCE] p-5 sm:p-6 rounded-lg text-center space-y-2 shadow-2xs">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center mx-auto">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-serif">
                  15+
                </div>
                <div className="text-xs text-neutral-600 font-normal">
                  Years of Experience
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white border border-[#E6DDCE] p-5 sm:p-6 rounded-lg text-center space-y-2 shadow-2xs">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center mx-auto">
                  <Star className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-serif">
                  5000+
                </div>
                <div className="text-xs text-neutral-600 font-normal">
                  Happy Clients
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white border border-[#E6DDCE] p-5 sm:p-6 rounded-lg text-center space-y-2 shadow-2xs">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center mx-auto">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-serif">
                  20+
                </div>
                <div className="text-xs text-neutral-600 font-normal">
                  Countries Served
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white border border-[#E6DDCE] p-5 sm:p-6 rounded-lg text-center space-y-2 shadow-2xs">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center mx-auto">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 font-serif">
                  98%
                </div>
                <div className="text-xs text-neutral-600 font-normal">
                  Client Satisfaction
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── SECTION 3: OUR USP / WHAT MAKES US DIFFERENT ──────────────────── */}
        <section className="w-full py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Section Heading */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 font-serif">
                What Makes Us Different
              </h2>
              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="w-10 h-px bg-[#D9CDBF]"></div>
                <div className="w-1.5 h-1.5 rotate-45 bg-[#6E3B1E]"></div>
                <div className="w-10 h-px bg-[#D9CDBF]"></div>
              </div>
            </div>

            {/* 5-Column USP Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* USP 1 */}
              <div className="bg-white border border-[#E6DDCE] p-5 rounded-lg text-center flex flex-col items-center justify-start space-y-2.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-semibold text-neutral-900 leading-snug font-serif">
                  Authentic<br />Vedic Astrology
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  We follow the ancient Vedic scriptures and traditional methods for accurate predictions.
                </p>
              </div>

              {/* USP 2 */}
              <div className="bg-white border border-[#E6DDCE] p-5 rounded-lg text-center flex flex-col items-center justify-start space-y-2.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center shrink-0">
                  <Grid className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-semibold text-neutral-900 leading-snug font-serif">
                  Personalized<br />Approach
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  Every horoscope is carefully analyzed to provide practical and personalized solutions.
                </p>
              </div>

              {/* USP 3 */}
              <div className="bg-white border border-[#E6DDCE] p-5 rounded-lg text-center flex flex-col items-center justify-start space-y-2.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-semibold text-neutral-900 leading-snug font-serif">
                  Ethical &amp; Honest<br />Guidance
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  We believe in truth, transparency and ethical advice for your long-term well-being.
                </p>
              </div>

              {/* USP 4 */}
              <div className="bg-white border border-[#E6DDCE] p-5 rounded-lg text-center flex flex-col items-center justify-start space-y-2.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-semibold text-neutral-900 leading-snug font-serif">
                  Confidential &amp;<br />Trustworthy
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  Your privacy is our priority. Every consultation is handled with complete confidentiality.
                </p>
              </div>

              {/* USP 5 */}
              <div className="bg-white border border-[#E6DDCE] p-5 rounded-lg text-center flex flex-col items-center justify-start space-y-2.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 rounded-full border border-[#D9CDBF] bg-[#FAF7F2] text-[#6E3B1E] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-semibold text-neutral-900 leading-snug font-serif">
                  Holistic Life<br />Solutions
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  From career and health to relationships and spiritual growth – we guide you at every step.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── SECTION 4: ABOUT ACHARYA MOHIT JI ─────────────────────────────── */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#E6DDCE] p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left: Round Portrait with Ornaments */}
                <div className="lg:col-span-3 flex justify-center">
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 border-2 border-[#D9CDBF] bg-[#FAF7F2] shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden border border-[#E6DDCE] bg-white">
                      <img
                        src="/logo.jpeg"
                        alt="Acharya Dr. Mohit Shah - Vedic Jyotish Kendra"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Middle: Biography Story */}
                <div className="lg:col-span-5 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-normal text-neutral-900 font-serif leading-tight">
                    A Legacy of Knowledge<br />and <span className="text-[#6E3B1E] font-medium">Guidance</span>
                  </h2>
                  <div className="space-y-2.5 text-xs text-neutral-600 leading-relaxed font-normal">
                    <p>
                      Acharya Mohit Ji is a renowned Vedic Astrologer and Spiritual Guide with more than 15 years of experience in the field of astrology, Vastu Shastra and spiritual counselling.
                    </p>
                    <p>
                      His deep knowledge, intuitive insights and compassionate approach have helped thousands of individuals lead a more balanced, successful and fulfilling life.
                    </p>
                  </div>
                </div>

                {/* Right: 4 Feature Bullet Points */}
                <div className="lg:col-span-4 space-y-3 border-t lg:border-t-0 lg:border-l border-[#E6DDCE] pt-4 lg:pt-0 lg:pl-6">
                  
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] text-[#6E3B1E] flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-neutral-800 font-medium leading-snug">
                      Expert in Vedic Astrology, Vastu Shastra &amp; Numerology
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] text-[#6E3B1E] flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-neutral-800 font-medium leading-snug">
                      Specialized in Kundli Analysis, Muhurta &amp; Remedial Solutions
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] text-[#6E3B1E] flex items-center justify-center shrink-0 mt-0.5">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-neutral-800 font-medium leading-snug">
                      Guided 5000+ Individuals Worldwide
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#D9CDBF] text-[#6E3B1E] flex items-center justify-center shrink-0 mt-0.5">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-neutral-800 font-medium leading-snug">
                      Regular Speaker &amp; Spiritual Counsellor
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: BOTTOM CALLOUT BANNER ──────────────────────────────── */}
        <section className="w-full pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-5 sm:p-7 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              
              <div className="flex items-center gap-3.5 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-[#6E3B1E] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-800 font-medium font-serif">
                  Let the ancient wisdom guide you towards a brighter and more prosperous future.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  <span>BOOK YOUR CONSULTATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

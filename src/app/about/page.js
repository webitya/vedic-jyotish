"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { GraduationCap, BookOpen, CheckCircle2, ArrowUpRight } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Page Hero */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                About Ach. Dr. Mohit Shah
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Synthesizing academic doctoral research in Vedic Astrology with classical Sanskrit Ganita and compassionate psychological counselling in Ranchi, Jharkhand.
              </p>
            </div>
          </div>
        </section>

        {/* In-Depth Biographical & Academic Feature */}
        <section className="w-full py-10 sm:py-14 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Portrait & Credentials (Col 4) */}
              <div className="lg:col-span-4 sticky top-20">
                <div className="border border-neutral-200 bg-neutral-50 p-3 rounded-md shadow-sm">
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900 rounded-md">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                      alt="Ach. Dr. Mohit Shah"
                      className="w-full h-full object-cover filter contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                      <div className="text-lg font-medium text-white mt-0.5">
                        {clinicInfo.practitioner}
                      </div>
                      <div className="text-[11px] text-neutral-300">
                        {clinicInfo.role} · Ranchi
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Degrees */}
                <div className="mt-4 bg-neutral-50 border border-neutral-200 p-4 space-y-3 rounded-md shadow-xs">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-black">
                    Academic Qualifications
                  </div>

                  <div className="flex items-start gap-3 pb-3 border-b border-neutral-200">
                    <div className="w-8 h-8 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                      <GraduationCap className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-black">
                        Ph.D. in Vedic Astrology
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        MCVA, Udaypur, Rajasthan
                      </div>
                      <div className="text-[10px] text-neutral-700 mt-0.5">
                        Doctoral Research in Vedic Astrological Sciences
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                      <BookOpen className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-black">
                        M.A. in Jyotirvigyan
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Ranchi University, Jharkhand
                      </div>
                      <div className="text-[10px] text-neutral-700 mt-0.5">
                        Postgraduate Classical Jyotish Studies
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Deep-Dive Content (Col 8) */}
              <div className="lg:col-span-8 space-y-6">
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium text-black mb-2 leading-tight">
                    Jyotirvigyan as a Discipline of Precision & Ethical Clarity
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    In ancient Indian tradition, Jyotish is revered as the <em>Vedanga Chakshu</em> — the "Eye of the Vedas." Far from arbitrary predictions or fatalism, authentic Vedic astrology is a mathematical and observational framework that maps celestial energy cycles against individual human consciousness and worldly events.
                  </p>
                </div>

                <div className="border-t border-neutral-200 pt-4 space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  <h3 className="text-lg font-medium text-black">
                    The Academic Journey & Classical Foundations
                  </h3>
                  <p>
                    Having pursued postgraduate education in Jyotirvigyan at Ranchi University followed by doctoral research (Ph.D.) at MCVA in Udaipur (Rajasthan), Ach. Dr. Mohit Shah has spent years decoding the mathematical foundations and interpretive nuances of foundational Sanskrit treatises.
                  </p>
                  <p>
                    His consultation practice draws directly from the <strong>Brihat Parashara Hora Shastra</strong> for natal chart synthesis, the <strong>Jaimini Upadesha Sutras</strong> for chara dasha timing and karaka analysis, and classical <strong>Sthapatya Veda</strong> principles for architectural and residential Vastu harmonisation.
                  </p>
                </div>

                {/* Four Ethical Pillars */}
                <div className="bg-neutral-50 border border-neutral-200 p-5 sm:p-6 space-y-4 rounded-md shadow-xs">
                  <h3 className="text-base font-medium text-black">
                    Our Ethical Consultation Commitments
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1 bg-white p-3 border border-neutral-200 rounded-md shadow-2xs">
                      <div className="flex items-center gap-2 font-medium text-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>No Fear-Mongering</span>
                      </div>
                      <p className="text-neutral-500">
                        We never exploit planetary placements to induce fear or commercial anxiety.
                      </p>
                    </div>

                    <div className="space-y-1 bg-white p-3 border border-neutral-200 rounded-md shadow-2xs">
                      <div className="flex items-center gap-2 font-medium text-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>Complete Confidentiality</span>
                      </div>
                      <p className="text-neutral-500">
                        All personal charts and life discussions remain strictly private.
                      </p>
                    </div>

                    <div className="space-y-1 bg-white p-3 border border-neutral-200 rounded-md shadow-2xs">
                      <div className="flex items-center gap-2 font-medium text-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>Mathematical Exactitude</span>
                      </div>
                      <p className="text-neutral-500">
                        Accurate astronomical calculations and Shadbala strength matrices.
                      </p>
                    </div>

                    <div className="space-y-1 bg-white p-3 border border-neutral-200 rounded-md shadow-2xs">
                      <div className="flex items-center gap-2 font-medium text-black">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>Actionable Remedies</span>
                      </div>
                      <p className="text-neutral-500">
                        Guidance focused on ethical lifestyle alignment and authentic minerals.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Book Session with Acharya Ji</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-300 text-black hover:bg-neutral-50 text-xs uppercase tracking-wider font-normal transition-all rounded-md shadow-xs hover:shadow-sm"
                  >
                    <span>Direct Call: {clinicInfo.formattedPhone}</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        <ConsultationCTA onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

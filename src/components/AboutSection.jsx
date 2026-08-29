"use client";

import { BookOpen, GraduationCap, CheckCircle2, ArrowUpRight } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function AboutSection({ onOpenBooking }) {
  return (
    <section id="about" className="w-full py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[#B88E4B]"></span>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5C1625]">
            Scholarly Heritage & Foundations
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual & Academic Certifications (Col 5) */}
          <div className="lg:col-span-5">
            <div className="border border-[#E6DED2] bg-[#FAF7F2] p-3 sm:p-4">
              
              <div className="relative aspect-[3/4] overflow-hidden bg-[#191B20]">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80"
                  alt="Ach. Dr. Mohit Shah - Vedic Astrological Advisor & Counsellor"
                  className="w-full h-full object-cover filter contrast-105 hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191B20]/90 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 inset-x-0 p-5 text-[#FAF7F2]">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#DFCA9B] font-semibold">
                    Astrological Advisor & Counsellor
                  </div>
                  <div className="font-serif text-xl sm:text-2xl font-normal text-white mt-1">
                    {clinicInfo.practitioner}
                  </div>
                  <div className="text-xs text-[#D8CFBF] mt-0.5 font-light">
                    Vedic Jyotish Kendra · Ranchi, Jharkhand
                  </div>
                </div>
              </div>

            </div>

            {/* Formal Academic Certifications Card */}
            <div className="mt-5 bg-[#FAF7F2] border border-[#E6DED2] p-5 divide-y divide-[#EAE2D5]">
              <div className="flex items-start gap-3.5 pb-4">
                <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 text-[#5C1625]" />
                </div>
                <div>
                  <div className="font-serif text-base font-semibold text-[#1F2228]">
                    Ph.D. in Vedic Astrology
                  </div>
                  <div className="text-xs text-[#626773]">
                    MCVA, Udaypur, Rajasthan
                  </div>
                  <div className="text-[11px] text-[#B88E4B] font-semibold mt-0.5">
                    Doctoral Research in Vedic Astrological Sciences
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4">
                <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-[#5C1625]" />
                </div>
                <div>
                  <div className="font-serif text-base font-semibold text-[#1F2228]">
                    M.A. in Jyotirvigyan
                  </div>
                  <div className="text-xs text-[#626773]">
                    Ranchi University, Jharkhand
                  </div>
                  <div className="text-[11px] text-[#B88E4B] font-semibold mt-0.5">
                    Postgraduate Classical Jyotish Studies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative (Col 7) */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal leading-[1.15] mb-5">
              A Disciplined & Ethical Approach to Vedic Jyotirvigyan
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#626773] leading-relaxed font-normal mb-8">
              <p>
                At <strong className="text-[#1F2228] font-semibold">Vedic Jyotish Kendra</strong>, astrological consultation is treated not as commercial sensationalism, but as a disciplined diagnostic science rooted in classical Sanskrit treatises including the <em>Brihat Parashara Hora Shastra</em>, <em>Jaimini Upadesha Sutras</em>, and foundational <em>Vastu Vidya</em>.
              </p>
              <p>
                With postgraduate studies in Jyotirvigyan from Ranchi University and a Ph.D. in Vedic Astrology from MCVA (Udaipur, Rajasthan), <strong className="text-[#1F2228] font-semibold">Ach. Dr. Mohit Shah</strong> combines rigorous astronomical calculations (Ganita) with compassionate and practical counseling (Phalita).
              </p>
              <p>
                Every session is conducted with strict confidentiality, empathy, and intellectual honesty. Consultations are focused on empowering individuals with timing, self-knowledge, and actionable traditional remedies rather than inducing fear.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-6 mb-6 border-b border-[#E6DED2]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E4B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#1F2228]">Mathematical Precision</div>
                  <div className="text-xs text-[#626773]">Exact planetary degree balance, Shadbala, and divisional charts.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E4B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#1F2228]">Ethical Counselling</div>
                  <div className="text-xs text-[#626773]">No fear-mongering; guidance focused on remedies and clarity.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E4B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#1F2228]">Authentic Remedies</div>
                  <div className="text-xs text-[#626773]">Prescriptions based strictly on functional benefic ascendant rules.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E4B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#1F2228]">Personal Direct Attention</div>
                  <div className="text-xs text-[#626773]">All consultations are conducted one-on-one by Ach. Dr. Mohit Shah.</div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#5C1625] text-[#FAF7F2] text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
              >
                <span>Schedule Consultation with Acharya Ji</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFCA9B]" />
              </button>

              <span className="text-xs text-[#626773] text-center sm:text-left">
                Available in-person in Ranchi & via online video
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

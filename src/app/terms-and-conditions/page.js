"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Scale, AlertCircle, FileCheck, CheckCircle2, HelpCircle } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function TermsAndConditionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-[11px] font-semibold text-[#6E3B1E] uppercase tracking-wider block">
              Legal Agreement
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Effective Date: January 1, 2024 · Last Updated: September 2026
            </p>
          </div>

          {/* Document Content */}
          <div className="bg-white border border-[#E6DDCE] p-6 sm:p-10 rounded-xl shadow-2xs space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            
            {/* 1. Agreement */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Scale className="w-5 h-5 text-[#6E3B1E]" />
                <span>1. Legal Binding Agreement</span>
              </h2>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding electronic agreement between you (&quot;Client,&quot; &quot;User,&quot; or &quot;You&quot;) and <strong>{clinicInfo.name}</strong> (&quot;Kendra,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), represented by <strong>{clinicInfo.practitioner}</strong> (AstroforU.com).
              </p>
              <p>
                By accessing <strong>vedicjyotishkendra.com</strong>, scheduling an astrological consultation, making online payments via <strong>Razorpay</strong>, or purchasing gemstones/remedies, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these Terms, please refrain from using our services.
              </p>
            </section>

            {/* 2. Services Offered */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <FileCheck className="w-5 h-5 text-[#6E3B1E]" />
                <span>2. Scope of Services &amp; Consultation Disciplines</span>
              </h2>
              <p>
                {clinicInfo.name} provides classical Vedic astrological advisories, horoscope interpretations, planetary timing diagnostics, and remedial guidance, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li><strong>Birth Chart (Janam Kundali) Analysis:</strong> 16 Divisional charts (Vargas), Dasha progressions, and planetary strengths (Shadbala).</li>
                <li><strong>Career, Business &amp; Financial Guidance:</strong> D-10 Dashamsha analysis for profession, partnerships, and investments.</li>
                <li><strong>Matchmaking &amp; Compatibility (Kundali Milan):</strong> 36-Guna Ashtakoota and comprehensive D-9 Navamsha synastry.</li>
                <li><strong>Scientific Vastu Shastra:</strong> Residential and commercial energy alignments without structural demolition.</li>
                <li><strong>Prashna Kundali (Horary Astrology):</strong> Instant mathematical query analysis for urgent specific dilemmas.</li>
                <li><strong>Remedial Gemstone &amp; Rudraksha Guidance:</strong> Recommendation and supply of authentic, natural, and energized planetary gemstones.</li>
              </ul>
            </section>

            {/* 3. User Obligations */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <CheckCircle2 className="w-5 h-5 text-[#6E3B1E]" />
                <span>3. Client Obligations &amp; Data Accuracy</span>
              </h2>
              <p>
                You agree to provide accurate, true, and complete birth information (Date, Time, and Place of Birth). Since Vedic astrological calculations depend directly upon astronomical ephemeris coordinates, any inaccurate or approximate birth data will affect the accuracy of the astrological findings. The Kendra is not liable for outcomes arising from false or erroneous client inputs.
              </p>
            </section>

            {/* 4. Astrological Disclaimer */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2 text-[#6E3B1E]">
                <AlertCircle className="w-5 h-5 text-[#6E3B1E]" />
                <span>4. Astrological Advice Disclaimer &amp; Free Will</span>
              </h2>
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md space-y-2 text-xs text-neutral-700">
                <p className="font-semibold text-neutral-900">Statutory Advisory &amp; Legal Disclaimer:</p>
                <p>
                  Vedic astrology is an ancient empirical and spiritual science of probabilities and planetary cycles. Astrological consultations, horary interpretations, and remedial recommendations offered by Acharya Dr. Mohit Shah are based strictly on classical scriptural literature and intended for self-reflection, spiritual insight, and guidance.
                </p>
                <p>
                  <strong>Astrological advice is NEVER a substitute for professional legal, medical, psychiatric, financial, or engineering counsel.</strong> You retain complete free will and personal responsibility for all decisions and actions made in your personal and professional life.
                </p>
              </div>
            </section>

            {/* 5. Payments, Fees & Pricing */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Scale className="w-5 h-5 text-[#6E3B1E]" />
                <span>5. Consultation Fees &amp; Payment Gateway (Razorpay)</span>
              </h2>
              <p>
                Consultation charges and gemstone prices are clearly communicated prior to booking. Payments must be completed in advance through our integrated Razorpay payment gateway using UPI, Credit/Debit Cards, or Net Banking. All transactions are billed in Indian Rupees (INR) or equivalent international currencies where applicable.
              </p>
            </section>

            {/* 6. Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <FileCheck className="w-5 h-5 text-[#6E3B1E]" />
                <span>6. Intellectual Property Rights</span>
              </h2>
              <p>
                All content on this website—including articles, astrological research papers, branding logos, site designs, graphics, audio, and written horoscope reports—is the intellectual property of {clinicInfo.name} and {clinicInfo.practitioner}, protected under Indian and International Copyright and Trademark laws. Unauthorized reproduction or commercial distribution is prohibited.
              </p>
            </section>

            {/* 7. Governing Law & Jurisdiction */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <HelpCircle className="w-5 h-5 text-[#6E3B1E]" />
                <span>7. Governing Law &amp; Dispute Resolution</span>
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any legal dispute, claim, or controversy arising out of or relating to your use of this website or consultation services shall be subject to the exclusive jurisdiction of the competent courts in <strong>Ranchi, Jharkhand, India</strong>.
              </p>
            </section>

            {/* 8. Kendra Contact Info */}
            <section className="space-y-2 border-t border-[#E6DDCE] pt-6 text-xs text-neutral-600">
              <h3 className="font-semibold text-neutral-900 text-sm font-serif">Kendra Contact Address</h3>
              <p>{clinicInfo.name} (AstroforU.com) · {clinicInfo.address.line1}, {clinicInfo.address.landmark}, {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}, India</p>
              <p>Phone: {clinicInfo.formattedPhone} · Email: {clinicInfo.email}</p>
            </section>

          </div>
        </div>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

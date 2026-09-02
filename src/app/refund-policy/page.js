"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { RotateCcw, Clock, AlertTriangle, CheckCircle2, DollarSign, Calendar } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function RefundPolicyPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-[11px] font-semibold text-[#6E3B1E] uppercase tracking-wider block">
              Customer Protection &amp; Assurance
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Effective Date: January 1, 2024 · Last Updated: September 2026
            </p>
          </div>

          {/* Document Content */}
          <div className="bg-white border border-[#E6DDCE] p-6 sm:p-10 rounded-xl shadow-2xs space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <RotateCcw className="w-5 h-5 text-[#6E3B1E]" />
                <span>1. Overview &amp; Commitment to Fairness</span>
              </h2>
              <p>
                At <strong>{clinicInfo.name}</strong>, we strive to deliver deeply researched, ethical, and authentic Vedic astrological guidance. We understand that unforeseen emergencies, schedule conflicts, or technical difficulties may arise. This Cancellation and Refund Policy outlines the terms governing cancellations, rescheduling, and refund requests for consultation bookings and physical merchandise processed via <strong>Razorpay</strong>.
              </p>
            </section>

            {/* Consultation Appointments: Cancellation & Rescheduling */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Calendar className="w-5 h-5 text-[#6E3B1E]" />
                <span>2. Consultation Appointments: Cancellation &amp; Rescheduling</span>
              </h2>
              
              <div className="space-y-3">
                <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md space-y-2 text-xs">
                  <h3 className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#6E3B1E]" />
                    <span>Free Slot Rescheduling (Recommended)</span>
                  </h3>
                  <p className="text-neutral-600">
                    If you cannot attend your scheduled consultation, you may request a <strong>free 1-time rescheduling</strong> up to <strong>4 hours before</strong> your booked time slot. Please contact our desk coordinator at <strong>+91 70044 33677</strong> or via WhatsApp to select an alternate convenient date.
                  </p>
                </div>

                <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                  <li>
                    <strong>Full Refund on Advance Cancellation:</strong> If you cancel your consultation appointment at least <strong>24 hours prior</strong> to the scheduled time, you are eligible for a <strong>100% full refund</strong> (less nominal payment gateway processing charges if applicable).
                  </li>
                  <li>
                    <strong>Partial / No Refund on Short-Notice Cancellation:</strong> If cancellation is requested within <strong>less than 4 hours</strong> of the appointment, a 50% cancellation charge applies to cover the dedicated chart preparation and mathematical research already conducted by Acharya Ji.
                  </li>
                  <li>
                    <strong>Client No-Show:</strong> In the event of a complete client no-show without prior notification, the session fee is non-refundable. However, we will allow one courtesy reschedule within 7 calendar days.
                  </li>
                </ul>
              </div>
            </section>

            {/* Post-Consultation Policy */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <AlertTriangle className="w-5 h-5 text-[#6E3B1E]" />
                <span>3. Completed Consultations &amp; Horoscope Reports</span>
              </h2>
              <p>
                Once an astrological consultation has been conducted (in-person, online video, or telephonic) or a customized written horoscope report has been generated and delivered, <strong>fees are non-refundable</strong>. Vedic astrology services constitute intellectual, diagnostic, and time-intensive professional counsel. Dissatisfaction with planetary transits or astrological predictions that do not align with subjective desires does not constitute valid grounds for a refund.
              </p>
            </section>

            {/* Gemstones & Physical Items Return Policy */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <CheckCircle2 className="w-5 h-5 text-[#6E3B1E]" />
                <span>4. Physical Gemstones &amp; Rudraksha Return Policy</span>
              </h2>
              <p>For energized gemstones, certified Rudraksha, and Vedic Yantras purchased from our center:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>
                  <strong>7-Day Replacement Guarantee:</strong> If the physical gemstone received is damaged in transit, defective, or differs from the government-lab certification provided, you may request a replacement or full refund within <strong>7 days of delivery</strong>.
                </li>
                <li>
                  <strong>Condition:</strong> The item must be unused, in its original tamper-proof packaging, and accompanied by the original Gemological Laboratory Certificate and purchase invoice.
                </li>
                <li>
                  <strong>Custom Rings / Pendants:</strong> Gemstones that have been customized, soldered, or set into gold/silver jewelry per specific client finger sizes are subject to labor deduction upon return.
                </li>
              </ul>
            </section>

            {/* Refund Processing Timeline & Method */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <DollarSign className="w-5 h-5 text-[#6E3B1E]" />
                <span>5. Refund Processing Timeline &amp; Mode</span>
              </h2>
              <div className="space-y-2">
                <p>
                  Approved refunds are processed automatically through our <strong>Razorpay payment gateway</strong> and credited back to the original source payment method (Credit/Debit Card, UPI handle, or Net Banking account).
                </p>
                <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-3.5 rounded-md text-xs font-medium text-neutral-800">
                  ⏱️ <strong>Processing Timeline:</strong> Refunds are initiated by our team within <strong>24-48 business hours</strong> of approval. Depending on your banking institution, the refunded amount typically reflects in your bank account within <strong>5 to 7 business days</strong>.
                </div>
              </div>
            </section>

            {/* How to Request a Refund */}
            <section className="space-y-3 border-t border-[#E6DDCE] pt-6">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif">
                6. How to Request a Refund or Cancellation
              </h2>
              <p>To request a cancellation or refund, please share your booking ID, client name, and payment receipt via any of the official channels below:</p>
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md text-xs space-y-1 text-neutral-800 font-medium">
                <div><strong>Helpdesk Email:</strong> {clinicInfo.email} (Subject: &quot;Refund Request - [Booking ID]&quot;)</div>
                <div><strong>WhatsApp / Call:</strong> +91 70044 33677 / +91 93347 03333</div>
                <div><strong>Operational Hours:</strong> Monday – Saturday (10:00 AM – 7:30 PM IST)</div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

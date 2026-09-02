"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Truck, Package, Clock, ShieldCheck, MapPin, Mail } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function ShippingPolicyPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-[11px] font-semibold text-[#6E3B1E] uppercase tracking-wider block">
              Fulfillment &amp; Dispatch Standards
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Shipping &amp; Delivery Policy
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
                <Truck className="w-5 h-5 text-[#6E3B1E]" />
                <span>1. Overview &amp; Fulfillment Scope</span>
              </h2>
              <p>
                <strong>{clinicInfo.name}</strong> provides both <strong>Digital Consultation Services</strong> (Online Consultations &amp; PDF Horoscopes) and <strong>Physical Tangible Products</strong> (Govt-Lab Certified Gemstones, Energized Rudraksha Beads, and Vedic Yantras). This Shipping and Delivery Policy specifies the timelines and delivery methods for each category.
              </p>
            </section>

            {/* Digital Consultations & Report Delivery */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Clock className="w-5 h-5 text-[#6E3B1E]" />
                <span>2. Digital Services &amp; Online Consultation Delivery</span>
              </h2>
              <div className="space-y-2">
                <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md space-y-2 text-xs">
                  <div className="font-semibold text-neutral-900">Digital Consultation Delivery Timelines:</div>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                    <li><strong>Online Video Consultations (Google Meet / WhatsApp Video):</strong> Delivered live at your scheduled confirmed appointment time. Booking confirmation and private meeting links are sent instantly via Email and WhatsApp upon payment.</li>
                    <li><strong>Telephonic Consultations:</strong> Conducted live at the appointed time slot with Acharya Dr. Mohit Shah.</li>
                    <li><strong>Personalized Written Horoscope Reports (PDF):</strong> Prepared mathematically and delivered directly to your registered email address / WhatsApp within <strong>24 to 48 hours</strong> of consultation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Physical Products Shipping */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Package className="w-5 h-5 text-[#6E3B1E]" />
                <span>3. Physical Products (Gemstones &amp; Rudraksha) Shipping</span>
              </h2>
              <p>For certified natural planetary gemstones, custom jewelry rings/pendants, and energized sacred beads:</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600">
                <li>
                  <strong>Pran-Pratishtha &amp; Vedic Energization:</strong> Prior to dispatch, each gemstone or Rudraksha undergoes authentic Vedic energization and cleansing rituals as per your birth chart Nakshatra. This preparation takes <strong>1 to 2 business days</strong>.
                </li>
                <li>
                  <strong>Dispatch Timeline:</strong> Orders are dispatched from our Ranchi Kendra within <strong>2 to 4 business days</strong> of payment confirmation.
                </li>
                <li>
                  <strong>Domestic Delivery Timelines (Across India):</strong>
                  <ul className="list-circle pl-5 mt-1 space-y-1 text-neutral-500 text-xs">
                    <li>Metro Cities: <strong>3 to 5 business days</strong> from dispatch.</li>
                    <li>Rest of India &amp; Remote Districts: <strong>5 to 7 business days</strong> from dispatch.</li>
                  </ul>
                </li>
                <li>
                  <strong>International Shipments:</strong> Delivered via DHL / FedEx International within <strong>7 to 12 business days</strong> (customs clearance and import duties subject to destination country regulations).
                </li>
              </ul>
            </section>

            {/* Courier Partners & Tracking */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <ShieldCheck className="w-5 h-5 text-[#6E3B1E]" />
                <span>4. Courier Partners, Packaging &amp; Live Tracking</span>
              </h2>
              <p>
                We partner with India&apos;s leading insured express courier networks including <strong>BlueDart, DTDC, Delhivery, and India Post Speed Post</strong>. All gemstones are dispatched in secure, tamper-evident, water-resistant packaging accompanied by:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600 text-xs">
                <li>Original Government-Recognized Gemological Laboratory Authenticity Certificate.</li>
                <li>Detailed Vedic Wearing Instructions (Auspicious Day, Hora, Metal, and Mantra).</li>
                <li>Tax Invoice for statutory compliance.</li>
              </ul>
              <p className="text-xs text-neutral-600">
                A live tracking number (AWB) is shared with you via SMS/WhatsApp immediately upon dispatch so you can monitor transit progress.
              </p>
            </section>

            {/* Shipping Charges */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <MapPin className="w-5 h-5 text-[#6E3B1E]" />
                <span>5. Shipping Charges</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li><strong>Standard Domestic Shipping (India):</strong> <strong>FREE / Complimentary</strong> for all orders above ₹2,500. A flat fee of ₹100 applies to smaller shipments.</li>
                <li><strong>Express Urgent Courier:</strong> Available upon request at actual carrier rates.</li>
              </ul>
            </section>

            {/* Contact for Delivery Queries */}
            <section className="space-y-3 border-t border-[#E6DDCE] pt-6">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#6E3B1E]" />
                <span>6. Delivery Assistance &amp; Helpdesk</span>
              </h2>
              <p>For any inquiries regarding consultation slot links or shipment tracking, please reach our dispatch coordination team:</p>
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md text-xs space-y-1 text-neutral-800 font-medium">
                <div><strong>Dispatch Office:</strong> Vedic Jyotish Kendra, Opp. Harmu Ground, Ranchi - 834002, Jharkhand</div>
                <div><strong>Tracking Coordinator:</strong> {clinicInfo.coordinator.name} ({clinicInfo.coordinator.formattedPhone})</div>
                <div><strong>Direct Helpline:</strong> {clinicInfo.formattedPhone}</div>
                <div><strong>Email:</strong> {clinicInfo.email}</div>
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

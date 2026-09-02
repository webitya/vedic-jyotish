"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { ShieldCheck, Lock, Eye, FileText, Database, Server, RefreshCw } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function PrivacyPolicyPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-[11px] font-semibold text-[#6E3B1E] uppercase tracking-wider block">
              Legal &amp; Data Protection
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-normal">
              Effective Date: January 1, 2024 · Last Updated: September 2026
            </p>
          </div>

          {/* Policy Document Content */}
          <div className="bg-white border border-[#E6DDCE] p-6 sm:p-10 rounded-xl shadow-2xs space-y-8 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            
            {/* Introduction */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <ShieldCheck className="w-5 h-5 text-[#6E3B1E]" />
                <span>1. Introduction &amp; Scope</span>
              </h2>
              <p>
                Welcome to <strong>{clinicInfo.name}</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), operated under the scholarly stewardship of <strong>{clinicInfo.practitioner}</strong> (AstroforU.com, registered under the GST Act and Indian regulatory framework). We are committed to protecting your personal privacy and safeguarding all confidential birth chart information entrusted to us.
              </p>
              <p>
                This Privacy Policy outlines the types of information we collect, how it is processed, stored, and protected when you visit our website (<strong>vedicjyotishkendra.com</strong>), schedule an in-person or online astrological consultation, purchase energized gemstones/rudraksha, or make payments via our verified payment gateway partner (<strong>Razorpay</strong>).
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Database className="w-5 h-5 text-[#6E3B1E]" />
                <span>2. Information We Collect</span>
              </h2>
              <div className="space-y-2">
                <p>To prepare mathematically precise astronomical ephemeris charts (Kundali / Horary / Varshaphala) and process consultation bookings, we collect the following information:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                  <li><strong>Personal Identifiers:</strong> Full Name, Email Address, Phone / WhatsApp Number, Gender.</li>
                  <li><strong>Astrological Birth Coordinates:</strong> Exact Date of Birth, Time of Birth (Hours, Minutes, AM/PM), and City/State/Country of Birth.</li>
                  <li><strong>Consultation Queries:</strong> Specific questions, life areas of concern, or background context provided voluntarily in booking forms.</li>
                  <li><strong>Physical Shipping Details:</strong> Full postal address, pincode, and contact number (only when purchasing physical energized gemstones or certified rudraksha).</li>
                  <li><strong>Technical &amp; Log Data:</strong> IP address, browser type, operating system, and anonymous analytics data to ensure site stability.</li>
                </ul>
              </div>
            </section>

            {/* Payment Information & Razorpay Compliance */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Lock className="w-5 h-5 text-[#6E3B1E]" />
                <span>3. Payment Gateway &amp; Financial Data Security</span>
              </h2>
              <p>
                All online consultation fee payments and gemstone orders are processed securely through <strong>Razorpay Software Private Limited</strong>, an RBI-authorized Payment Aggregator complying with the highest level of <strong>PCI-DSS Level 1</strong> compliance.
              </p>
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md space-y-2 text-xs text-neutral-700">
                <p className="font-semibold text-neutral-900">Important Financial Data Protection Notice:</p>
                <p>
                  {clinicInfo.name} <strong>DOES NOT store, process, capture, or have access to</strong> your sensitive card numbers, CVV codes, UPI MPINs, or Net Banking credentials on our servers. All transaction details are encrypted end-to-end directly between your banking provider and the Razorpay gateway.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <FileText className="w-5 h-5 text-[#6E3B1E]" />
                <span>4. Purpose of Data Processing</span>
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
                <li>Generating accurate Vedic natal horoscopes, planetary dasha tables, and transit assessments.</li>
                <li>Conducting 1-on-1 private astrological consultations (in-person at Ranchi Kendra or via Online Video / Telephonic sessions).</li>
                <li>Sending consultation slot confirmations, calendar invites, and reminder alerts via WhatsApp/SMS/Email.</li>
                <li>Fulfilling certified gemstone dispatch and courier tracking updates.</li>
                <li>Responding to customer inquiries, support requests, and grievance redressals.</li>
                <li>Complying with statutory accounting and GST taxation mandates under Indian law.</li>
              </ul>
            </section>

            {/* Data Confidentiality & Non-Disclosure */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Eye className="w-5 h-5 text-[#6E3B1E]" />
                <span>5. Confidentiality &amp; Non-Disclosure Guarantee</span>
              </h2>
              <p>
                We adhere to strict academic and spiritual ethics. <strong>We NEVER sell, rent, monetize, trade, or share your personal details, birth charts, or consultation recordings with any third-party marketing companies, advertisers, or lead brokers.</strong>
              </p>
              <p>
                Your horoscope discussions remain strictly confidential between you and Acharya Dr. Mohit Shah.
              </p>
            </section>

            {/* Data Storage & Retention */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <Server className="w-5 h-5 text-[#6E3B1E]" />
                <span>6. Data Storage, Retention &amp; Security</span>
              </h2>
              <p>
                Your inquiry data is stored on secure cloud database clusters with SSL/TLS 256-bit encryption in transit and at rest. We retain client astrological records to facilitate follow-up queries and yearly Varshaphala annual reviews upon client request. Clients may request permanent erasure of their data at any time.
              </p>
            </section>

            {/* Client Rights */}
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif flex items-center gap-2 border-b border-[#E6DDCE] pb-2">
                <RefreshCw className="w-5 h-5 text-[#6E3B1E]" />
                <span>7. Your Legal Rights</span>
              </h2>
              <p>Under applicable Indian data protection laws and Information Technology (IT) Rules, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li>Access the personal information we hold about you.</li>
                <li>Request corrections or updates to inaccurate birth information.</li>
                <li>Request deletion of your contact records from our active CRM.</li>
                <li>Opt-out of non-transactional communications.</li>
              </ul>
            </section>

            {/* Grievance Redressal & Contact Info */}
            <section className="space-y-3 border-t border-[#E6DDCE] pt-6">
              <h2 className="text-base sm:text-lg font-semibold text-neutral-900 font-serif">
                8. Grievance Redressal Officer &amp; Contact Information
              </h2>
              <p>
                In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of the Grievance Officer are provided below:
              </p>
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-4 rounded-md text-xs space-y-1.5 text-neutral-800 font-medium">
                <div><strong>Entity Name:</strong> Vedic Jyotish Kendra (AstroforU.com)</div>
                <div><strong>Grievance Officer:</strong> {clinicInfo.practitioner}</div>
                <div><strong>Physical Chamber Address:</strong> {clinicInfo.address.line1}, {clinicInfo.address.landmark}, {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}, India</div>
                <div><strong>Official Phone:</strong> {clinicInfo.formattedPhone} / {clinicInfo.coordinator.formattedPhone}</div>
                <div><strong>Official Email:</strong> {clinicInfo.email}</div>
                <div><strong>Turnaround Time:</strong> Grievances are acknowledged within 24 hours and resolved within 7 business days.</div>
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

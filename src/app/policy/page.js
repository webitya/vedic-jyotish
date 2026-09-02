"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  ShieldCheck, Scale, RotateCcw, Truck, Award,
  CheckCircle2, ArrowUpRight, Lock, ExternalLink
} from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

const POLICY_SECTIONS = [
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: ShieldCheck,
    href: "/privacy-policy",
    description: "Protection of personal birth data, zero third-party disclosure, and PCI-DSS Level 1 payment safety via Razorpay.",
    highlights: [
      "Strict data confidentiality for birth chart and planetary coordinates.",
      "Zero commercial sale or marketing monetization of client records.",
      "Payment processing handled securely via RBI-authorized Razorpay gateway without saving CVVs or PINs.",
      "Right to access, modify, or permanently delete personal records upon request.",
    ],
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    icon: Scale,
    href: "/terms-and-conditions",
    description: "Legal terms governing consultation bookings, client obligations, and classical astrological purview.",
    highlights: [
      "Binding agreement between client and Vedic Jyotish Kendra (AstroforU.com).",
      "Astrological advice is intended for spiritual guidance and does not replace medical or legal counsel.",
      "Clients retain full free will and personal responsibility for decisions.",
      "Governing jurisdiction under the courts of Ranchi, Jharkhand, India.",
    ],
  },
  {
    id: "refund",
    title: "Cancellation & Refund",
    icon: RotateCcw,
    href: "/refund-policy",
    description: "Transparent slot cancellation, free 1-time rescheduling, and automated gateway refund timelines.",
    highlights: [
      "Free 1-time consultation rescheduling up to 4 hours prior to slot time.",
      "100% full refund on appointment cancellations made at least 24 hours in advance.",
      "Approved refunds credited to original source payment method within 5–7 business days via Razorpay.",
      "7-day replacement guarantee on certified natural gemstones and energized rudraksha.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
    href: "/shipping-policy",
    description: "Digital consultation delivery times and insured nationwide gemstone express courier shipping.",
    highlights: [
      "Online Video / Telephonic slot links and reminders delivered instantly via WhatsApp and Email.",
      "Personalized PDF horoscope reports delivered within 24 to 48 hours.",
      "Physical gemstones/Rudraksha energized and dispatched via insured courier within 2–4 business days.",
      "Live tracking ID (AWB) provided via SMS/WhatsApp with delivery in 3–7 business days across India.",
    ],
  },
  {
    id: "ethics",
    title: "Code of Ethics",
    icon: Award,
    href: "/about",
    description: "Scholarly Parashari adherence, non-fatalistic interpretations, and laboratory gemstone authenticity.",
    highlights: [
      "No fatalistic fear-mongering or unethical commercial pressure.",
      "Strict adherence to Sanskrit scriptures (BPHS, Jaimini Sutras, Vastu Vidya).",
      "100% natural, untreated, government-lab certified gemstones only.",
      "Confidential 1-on-1 private consultations with Acharya Dr. Mohit Shah.",
    ],
  },
];

function PolicyContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "privacy");
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (tabParam && POLICY_SECTIONS.some((p) => p.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const activePolicy = POLICY_SECTIONS.find((p) => p.id === activeTab) || POLICY_SECTIONS[0];
  const IconComponent = activePolicy.icon;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <span className="text-[11px] font-semibold text-[#6E3B1E] uppercase tracking-wider block">
              Governance &amp; Payment Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Policy &amp; Legal Compliance Portal
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Official governance policies, data privacy safeguards, refund commitments, and terms for payment gateway authorization.
            </p>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Policy Navigation Tabs (Col 4) */}
            <div className="lg:col-span-4 space-y-2 sticky top-20">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2 px-1">
                Compliance Modules
              </div>

              {POLICY_SECTIONS.map((sec) => {
                const SecIcon = sec.icon;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveTab(sec.id)}
                    className={`w-full text-left p-3 text-xs transition-all rounded-lg cursor-pointer border flex items-center justify-between gap-2 shadow-2xs ${
                      isActive
                        ? "bg-[#6E3B1E] text-white border-[#6E3B1E] shadow-sm"
                        : "bg-white text-neutral-700 border-[#E6DDCE] hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <SecIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#6E3B1E]"}`} />
                      <span className="font-semibold font-serif">{sec.title}</span>
                    </div>
                    <span className={`text-[10px] font-normal ${isActive ? "text-white/80" : "text-neutral-400"}`}>
                      View
                    </span>
                  </button>
                );
              })}

              {/* Quick Grievance Contact Card */}
              <div className="bg-white border border-[#E6DDCE] p-4 rounded-lg shadow-2xs mt-4 space-y-2 text-xs">
                <div className="font-semibold text-neutral-900 font-serif flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#6E3B1E]" />
                  <span>Razorpay Verified Merchant</span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Transactions on {clinicInfo.name} are 100% encrypted via 256-bit SSL and processed under RBI payment standards.
                </p>
                <div className="pt-1 text-[11px] text-neutral-500 border-t border-neutral-100">
                  Grievances: <strong>{clinicInfo.email}</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Active Policy Summary & Standalone Link (Col 8) */}
            <div className="lg:col-span-8 bg-white border border-[#E6DDCE] p-6 sm:p-8 rounded-xl shadow-2xs space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E6DDCE] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5 text-[#6E3B1E]" />
                    <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 font-serif">
                      {activePolicy.title}
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-600 font-normal max-w-lg">
                    {activePolicy.description}
                  </p>
                </div>

                <Link
                  href={activePolicy.href}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#6E3B1E] text-[#6E3B1E] hover:text-white border border-[#E6DDCE] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-2xs shrink-0"
                >
                  <span>Full Legal Text</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              {/* Key Compliance Points */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Key Principles &amp; Guarantees
                </h3>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {activePolicy.highlights.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 border border-[#E6DDCE] rounded-lg text-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#6E3B1E] mt-0.5 shrink-0" />
                      <span className="text-neutral-700 leading-relaxed font-normal">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-[#E6DDCE] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-500 text-[11px]">
                  Last reviewed under the academic governance of {clinicInfo.practitioner}.
                </span>

                <Link
                  href={activePolicy.href}
                  className="text-[#6E3B1E] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Read complete {activePolicy.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

export default function PolicyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <PolicyContent />
    </Suspense>
  );
}

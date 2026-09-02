"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function GemstonesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-50 text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* ── Centered Main Body ─────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white border border-neutral-200 p-6 sm:p-8 rounded-xl shadow-xs text-center space-y-4">
          
          {/* Top Pill (No star icon) */}
          <div className="inline-flex items-center px-3 py-1 bg-neutral-100 border border-neutral-200 text-[10px] uppercase tracking-wider text-neutral-800 font-semibold rounded-full mx-auto">
            <span>Sacred Minerals & Rudraksha Store</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-black tracking-tight uppercase">
              Gemstones & Rudraksha
            </h1>
            <div className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight">
              Coming Soon
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-sm mx-auto">
            We are curating an authenticated digital vault for 100% natural, untreated Navratna gemstones and Himalayan Mukhi Rudrakshas, complete with government-approved gemological test certificates.
          </p>

          {/* Quality Badges */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px] text-neutral-700">
            <div className="flex items-center justify-center gap-1.5 bg-neutral-50 border border-neutral-200 p-2.5 rounded-lg font-medium">
              <ShieldCheck className="w-4 h-4 text-black shrink-0" />
              <span>Lab Certified Minerals</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-neutral-50 border border-neutral-200 p-2.5 rounded-lg font-medium">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
              <span>Chart Prescribed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs uppercase tracking-wider font-medium transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
            >
              <span>Enquire for Prescription</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-neutral-300 text-black hover:bg-neutral-50 text-xs uppercase tracking-wider font-medium transition-all rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

        </div>
      </main>

      {/* ── Standard Full Footer ────────────────────────────────────────────── */}
      <Footer onOpenBooking={() => setBookingOpen(true)} />

      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService="Gem Stone Therapy"
      />
    </div>
  );
}

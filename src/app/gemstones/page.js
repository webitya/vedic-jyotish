"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { ShoppingBag, ArrowLeft, ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function GemstonesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Centered Full Screen Height Section */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-6 bg-white border border-neutral-200 p-8 sm:p-10 rounded-md shadow-sm">
          
          {/* Basket Icon Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-black stroke-[1.5]" />
          </div>

          {/* Heading & Coming Soon */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-medium text-black tracking-tight">
              Gemstones & Rudraksha
            </h1>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 tracking-tight">
              Coming Soon
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-md mx-auto">
            We are currently preparing an authenticated digital store for 100% natural, unheated Navratna gemstones and sacred Himalayan Mukhi Rudrakshas, all backed by government-approved gemological test certificates.
          </p>

          {/* Quality Guarantees */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 font-normal">
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-md shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Lab Certified Minerals</span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-md shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Prescribed by Natal Chart</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-sm hover:shadow-md cursor-pointer"
            >
              <span>Enquire for Prescription</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 text-black hover:bg-neutral-50 text-xs uppercase tracking-wider font-normal transition-all rounded-md shadow-xs hover:shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService="Gem Stone Therapy"
      />
    </div>
  );
}

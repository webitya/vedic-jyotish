"use client";

import Link from "next/link";
import { Phone, ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function ConsultationCTA({ onOpenBooking }) {
  return (
    <section className="w-full bg-neutral-900 text-white border-t border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Block */}
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-medium text-white leading-tight">
              Begin Your Astrological Journey with Clarity
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Schedule a 1-on-1 private consultation with <strong className="text-white font-medium">Ach. Dr. Mohit Shah</strong> at our Ranchi Kendra or online via confidential video.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-neutral-400 font-normal">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Strict Client Confidentiality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>Opp. Harmu Ground, Ranchi</span>
              </div>
            </div>
          </div>

          {/* Right Action Block */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : window.location.href = "/contact#book"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black text-xs uppercase tracking-wider font-normal hover:bg-neutral-200 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
            >
              <span>Schedule Session</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>

            <a
              href={`tel:${clinicInfo.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-500 text-white hover:bg-white hover:text-black text-xs uppercase tracking-wider font-normal transition-all rounded-md"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {clinicInfo.formattedPhone}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

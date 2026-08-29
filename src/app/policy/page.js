"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { CheckCircle2 } from "lucide-react";
import { policies } from "@/data/siteContent";

export default function PolicyPage() {
  const [activeTab, setActiveTab] = useState(policies[0]?.id || "consultation");
  const [bookingOpen, setBookingOpen] = useState(false);

  const activePolicy = policies.find((p) => p.id === activeTab) || policies[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Page Hero */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                Our Policy & Code of Ethics
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Clear governance, client privacy commitments, professional disclaimer, and gemstone authenticity standards governing Vedic Jyotish Kendra.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content Body */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Policy Nav Sidebar (Col 4) */}
              <div className="lg:col-span-4 space-y-1.5 sticky top-20">
                <div className="text-[11px] font-medium uppercase tracking-wider text-black mb-2 px-1">
                  Policy Sections
                </div>
                {policies.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-normal uppercase tracking-wider transition-all rounded-md cursor-pointer border ${
                      activeTab === sec.id
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>

              {/* Policy Text Display (Col 8) */}
              <div className="lg:col-span-8 bg-neutral-50 border border-neutral-200 p-5 sm:p-8 rounded-md shadow-xs">
                <div className="mb-4 pb-3 border-b border-neutral-200">
                  <h2 className="text-xl sm:text-2xl font-medium text-black">
                    {activePolicy.title}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                    {activePolicy.description}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {activePolicy.points?.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-white p-3.5 border border-neutral-200 text-xs rounded-md shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-black mt-0.5 shrink-0" />
                      <span className="text-neutral-700 leading-relaxed font-normal">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 font-normal">
                  Last reviewed under the academic governance of Ach. Dr. Mohit Shah.
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

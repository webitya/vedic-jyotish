"use client";

import { MapPin, Phone, Mail, Navigation, ArrowUpRight } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function LocationSection({ onOpenBooking }) {
  return (
    <section id="location" className="w-full py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E6DED2]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Visiting Details
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-2 leading-tight">
              Consultation Center in Ranchi
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#626773] max-w-lg font-normal leading-relaxed">
            Conveniently situated on Harmu Main Road between Harmu Chowk and Sahjanand Chowk, directly opposite Harmu Ground.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address, Coordinator, and Contacts (Col 5) */}
          <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#E6DED2] p-6 sm:p-8 space-y-5">
            
            {/* Address */}
            <div className="flex items-start gap-3.5 pb-5 border-b border-[#EAE2D5]">
              <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#5C1625]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#5C1625] mb-1">
                  Kendra Address
                </div>
                <div className="font-serif text-lg text-[#1F2228] leading-snug">
                  {clinicInfo.address.line1}
                </div>
                <div className="text-xs text-[#626773] mt-0.5">
                  {clinicInfo.address.landmark}
                </div>
                <div className="text-xs text-[#626773]">
                  {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}
                </div>
              </div>
            </div>

            {/* Direct Line */}
            <div className="flex items-start gap-3.5 pb-5 border-b border-[#EAE2D5]">
              <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#5C1625]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#5C1625] mb-1">
                  Direct Practitioner Line
                </div>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="font-serif text-xl font-normal text-[#1F2228] hover:text-[#5C1625] transition-colors"
                >
                  {clinicInfo.formattedPhone}
                </a>
                <div className="text-xs text-[#626773] mt-0.5">
                  Ach. Dr. Mohit Shah (Consultation by appointment)
                </div>
              </div>
            </div>

            {/* Coordinator */}
            <div className="flex items-start gap-3.5 pb-5 border-b border-[#EAE2D5]">
              <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                <Navigation className="w-4 h-4 text-[#5C1625]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#5C1625] mb-1">
                  Appointment Coordinator
                </div>
                <a
                  href={`tel:${clinicInfo.coordinator.phone}`}
                  className="text-sm font-semibold text-[#1F2228] hover:text-[#5C1625] transition-colors"
                >
                  {clinicInfo.coordinator.name} ({clinicInfo.coordinator.formattedPhone})
                </a>
                <div className="text-xs text-[#626773] mt-0.5">
                  Slot scheduling, directions & visitor coordination
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3.5 pb-5 border-b border-[#EAE2D5]">
              <div className="w-9 h-9 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#5C1625]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#5C1625] mb-1">
                  Email Communications
                </div>
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="text-xs sm:text-sm font-medium text-[#1F2228] hover:text-[#5C1625] transition-colors break-all"
                >
                  {clinicInfo.email}
                </a>
              </div>
            </div>

            {/* Action */}
            <div className="pt-1">
              <button
                onClick={() => onOpenBooking()}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#5C1625] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
              >
                <span>Reserve Consultation Slot</span>
                <ArrowUpRight className="w-4 h-4 text-[#DFCA9B]" />
              </button>
            </div>

          </div>

          {/* Right Column: Map Frame (Col 7) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E6DED2] p-4 flex flex-col justify-between">
            <div className="aspect-[16/10] w-full overflow-hidden border border-[#E6DED2] bg-[#191B20]">
              <iframe
                title="Vedic Jyotish Kendra Ranchi Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.042638868263!2d85.30105647643629!3d23.3585848494275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1328c6e22d1%3A0x45b235eca8e42559!2sVedic%20Jyotish%20Kendra!5e1!3m2!1sen!2sin!4v1787998227549!5m2!1sen!2sin"
                className="w-full h-full border-0 filter grayscale-15 contrast-105"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>

            <div className="mt-4 px-1 py-1 text-xs text-[#626773] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <strong className="text-[#1F2228] font-semibold">Landmark:</strong> Opp. Harmu Ground, between Harmu Chowk & Shajanand Chowk.
              </div>
              <a
                href="https://maps.google.com/?q=Vedic+Jyotish+Kendra+Ranchi"
                target="_blank"
                rel="noreferrer"
                className="text-[#5C1625] font-semibold uppercase tracking-wider hover:underline"
              >
                Open Google Maps →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

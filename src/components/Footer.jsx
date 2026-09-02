"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { clinicInfo, serviceCategories } from "@/data/siteContent";

export default function Footer({ onOpenBooking }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#6E3B1E] text-white border-t border-[#854825] font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/15 text-xs">
          
          {/* Column 1: Brand & Purview (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Vedic Jyotish Kendra Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/30 shadow-xs shrink-0"
              />
              <div>
                <span className="text-base font-semibold text-white tracking-tight uppercase block font-serif">
                  {clinicInfo.name}
                </span>
                <span className="block text-[11px] text-white/80 font-normal mt-0.5">
                  {clinicInfo.practitioner} · {clinicInfo.role}
                </span>
              </div>
            </Link>

            <p className="text-white/85 text-xs leading-relaxed max-w-sm font-normal">
              A private astrological practice rooted in classical Parashari synthesis, Jaimini dasha timings, and authentic Sthapatya Veda architectural alignment in Ranchi.
            </p>

            <div className="pt-1 text-[11px] text-white/70 space-y-0.5 font-normal">
              <div>• M.A. in Jyotish Acharya (Ranchi University)</div>
              <div>• AstroforU.com (Registered under GST Act)</div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-1.5 text-white/80 font-normal">
              <li>
                <Link href="/" className="hover:text-white transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors cursor-pointer">
                  About Acharya Ji
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors cursor-pointer">
                  15 Disciplines Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors cursor-pointer">
                  Visual Heritage Archive
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors cursor-pointer">
                  Vedic Insights
                </Link>
              </li>
              <li>
                <Link href="/gemstones" className="hover:text-white transition-colors cursor-pointer">
                  Gemstones &amp; Rudraksha
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Consultation Disciplines (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Primary Disciplines
            </div>
            <ul className="space-y-1.5 text-white/80 font-normal">
              {serviceCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/policy" className="hover:text-white transition-colors cursor-pointer">
                  Consultation Ethics &amp; Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Appointments (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Direct Contact
            </div>

            <div className="space-y-2 text-white/85 font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/80 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">{clinicInfo.address.line1}</span>
                  <div className="text-white/80 text-[11px]">{clinicInfo.address.landmark}</div>
                  <div className="text-white/80 text-[11px]">{clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="text-white hover:underline transition-colors font-medium cursor-pointer"
                >
                  {clinicInfo.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <span className="text-[11px] text-white/80">
                  Coordinator: {clinicInfo.coordinator.name} ({clinicInfo.coordinator.formattedPhone})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/80 shrink-0" />
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="hover:text-white transition-colors cursor-pointer break-all"
                >
                  {clinicInfo.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution Bar with Webitya Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/75 font-normal">
          <div className="text-center sm:text-left text-white/80">
            © {currentYear} Vedic Jyotish Kendra. All rights reserved under academic copyright.
          </div>

          <div className="flex items-center gap-4 text-white/80">
            <Link href="/policy" className="hover:text-white transition-colors cursor-pointer">
              Privacy &amp; Disclaimer
            </Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white transition-colors cursor-pointer">
              Ranchi Center
            </Link>
          </div>
        </div>

        {/* Webitya Attribution — centered below HR */}
        <hr className="border-white/15 mt-4" />
        <div className="pt-3 pb-1 text-center text-[11px] text-white/75 font-normal">
          Crafted &amp; Maintained with precision by{" "}
          <a
            href="https://webitya.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline underline-offset-2 transition-colors cursor-pointer font-medium"
          >
            Webitya
          </a>
        </div>

      </div>
    </footer>
  );
}


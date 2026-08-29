"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  Compass,
  Heart,
  CircleUser,
  Shield,
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart3,
  Scale,
  Home,
  Flame,
  Hash,
  Eye,
  Gem,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Phone,
} from "lucide-react";
import { allServices, clinicInfo } from "@/data/siteContent";

export default function ServiceDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const [bookingOpen, setBookingOpen] = useState(false);

  const iconMap = {
    Compass,
    Heart,
    CircleUser,
    Shield,
    BookOpen,
    GraduationCap,
    Briefcase,
    TrendingUp,
    BarChart3,
    Scale,
    Home,
    Flame,
    Hash,
    Eye,
    Gem,
  };

  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Compass;
  const relatedServices = allServices.filter(
    (s) => s.categoryId === service.categoryId && s.slug !== service.slug
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1F2228]">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1">
        {/* Breadcrumb & Hero Header */}
        <section className="w-full py-12 sm:py-16 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#626773] mb-6">
              <Link href="/" className="hover:text-[#5C1625]">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#5C1625]">Services</Link>
              <span>/</span>
              <span className="text-[#5C1625] font-semibold">{service.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-[#B88E4B]"></span>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5C1625]">
                    {service.categoryTitle}
                  </span>
                </div>
                
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1F2228] font-normal leading-tight mb-3">
                  {service.name}
                </h1>
                
                {service.subtitle && (
                  <div className="text-sm sm:text-base italic text-[#626773]">
                    Traditional Classification: {service.subtitle}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-4">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#5C1625] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* In-Depth Service Analysis Section */}
        <section className="w-full py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E6DED2] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Deep Dive Narrative (Col 8) */}
              <div className="lg:col-span-8 space-y-10">
                
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#5C1625] uppercase">
                    Diagnostic Overview
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2228] font-normal mt-1 mb-4">
                    Astrological Synthesis & Scope
                  </h2>
                  <p className="text-base text-[#626773] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Key Astrological Parameters Matrix */}
                <div className="bg-[#F4EFE6] border border-[#E6DED2] p-6 sm:p-8 space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F2228] font-normal">
                    Key Astrological Factors Analyzed in Session
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
                    <div className="space-y-1.5">
                      <div className="font-semibold text-[#1F2228] uppercase tracking-wider text-xs">
                        Bhavas (Houses) Evaluated
                      </div>
                      <p className="text-[#626773] leading-relaxed">
                        {service.bhavasAnalyzed}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="font-semibold text-[#1F2228] uppercase tracking-wider text-xs">
                        Karaka (Significator) Planets
                      </div>
                      <p className="text-[#626773] leading-relaxed">
                        {service.karakaPlanets}
                      </p>
                    </div>

                    <div className="sm:col-span-2 space-y-1.5 pt-4 border-t border-[#EAE2D5]">
                      <div className="font-semibold text-[#1F2228] uppercase tracking-wider text-xs">
                        Classical Methodology
                      </div>
                      <p className="text-[#626773] leading-relaxed">
                        {service.methodology}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consultation Inclusions */}
                <div>
                  <h3 className="font-serif text-2xl text-[#1F2228] font-normal mb-5">
                    What is Included in Your Consultation
                  </h3>
                  <div className="space-y-3">
                    {service.inclusions?.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 bg-white border border-[#E6DED2] p-4">
                        <CheckCircle2 className="w-4 h-4 text-[#B88E4B] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#2F333B] leading-relaxed font-normal">
                          {inc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Advice Note */}
                <div className="p-6 border border-[#E6DED2] bg-[#FAF7F2] text-xs text-[#626773] space-y-2">
                  <strong className="text-[#1F2228] font-semibold block uppercase tracking-wider">
                    Preparation for your session:
                  </strong>
                  <p>
                    Please ensure accurate birth date, exact time of birth (from birth certificate or hospital record), and city of birth are ready. For Vastu consultations, floor plans and cardinal directions are helpful.
                  </p>
                </div>

              </div>

              {/* Right Column: Appointment Concierge Card (Col 4) */}
              <div className="lg:col-span-4 sticky top-28 space-y-6">
                <div className="bg-[#FAF7F2] border border-[#B88E4B]/40 p-6 sm:p-8 shadow-xs">
                  <div className="w-12 h-12 border border-[#E6DED2] bg-[#F4EFE6] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#5C1625]" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.2em] text-[#5C1625] font-semibold">
                    1-on-1 Session
                  </span>
                  <h3 className="font-serif text-2xl text-[#1F2228] font-normal mt-1 mb-3">
                    Consult with Acharya Ji
                  </h3>
                  <p className="text-xs text-[#626773] leading-relaxed mb-6 font-normal">
                    Direct personal consultation with Ach. Dr. Mohit Shah (Ph.D., M.A. Jyotirvigyan). Available in Ranchi Kendra and worldwide via online video.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#5C1625] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#DFCA9B]" />
                      <span>Book for {service.name}</span>
                    </button>

                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className="w-full flex items-center justify-center gap-2 py-3 border border-[#B88E4B] text-[#1F2228] hover:bg-[#F4EFE6] text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#5C1625]" />
                      <span>Direct: {clinicInfo.formattedPhone}</span>
                    </a>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EAE2D5] text-[11px] text-[#626773] text-center">
                    Coordinator: {clinicInfo.coordinator.name} ({clinicInfo.coordinator.formattedPhone})
                  </div>
                </div>

                {/* Related Disciplines in Category */}
                {relatedServices.length > 0 && (
                  <div className="bg-[#F4EFE6] border border-[#E6DED2] p-6 space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#5C1625]">
                      Related in {service.categoryTitle}
                    </div>
                    <div className="divide-y divide-[#EAE2D5]">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/services/${rel.slug}`}
                          className="py-2.5 flex items-center justify-between text-xs text-[#2F333B] hover:text-[#5C1625] group font-medium"
                        >
                          <span>{rel.name}</span>
                          <ArrowRight className="w-3 h-3 text-[#B88E4B] group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={service.name}
      />
    </div>
  );
}

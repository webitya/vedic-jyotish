"use client";

import { use, useState, useEffect } from "react";
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
  Clock,
  Loader2,
  ShieldCheck,
  Check
} from "lucide-react";
import { allServices, clinicInfo } from "@/data/siteContent";

export default function ServiceDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const [bookingOpen, setBookingOpen] = useState(false);
  const [service, setService] = useState(null);
  const [otherServices, setOtherServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    ShieldCheck,
  };

  useEffect(() => {
    // Fetch current service
    fetch(`/api/services/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setService(data);
        } else {
          // Fallback to static data
          const fallback = allServices.find(
            (s) => s.slug === slug || s.slug === slug.replace(/_/g, "-") || s.slug === slug.replace(/-/g, "_")
          );
          if (fallback) setService(fallback);
        }
      })
      .catch(() => {
        const fallback = allServices.find(
          (s) => s.slug === slug || s.slug === slug.replace(/_/g, "-") || s.slug === slug.replace(/-/g, "_")
        );
        if (fallback) setService(fallback);
      })
      .finally(() => setLoading(false));

    // Fetch other services for suggestions
    fetch("/api/services")
      .then((r) => r.json())
      .then((all) => {
        if (Array.isArray(all)) {
          setOtherServices(all.filter((s) => s.slug !== slug).slice(0, 3));
        }
      })
      .catch(() => {});
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-neutral-800 font-sans">
        <Navbar onOpenBooking={() => setBookingOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center py-24 space-y-3">
          <div className="w-10 h-10 border-2 border-neutral-300 border-t-black rounded-full animate-spin"></div>
          <p className="text-xs text-neutral-500 uppercase tracking-wider">Loading consultation details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Compass;
  const imageUrl = service.image?.url || service.image || service.coverImage;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full bg-white">
        {/* Breadcrumb & Hero Overview Header */}
        <section className="w-full pt-6 sm:pt-8 pb-10 sm:pb-12 bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-5">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-black transition-colors">Services</Link>
              <span>/</span>
              <span className="text-black font-medium truncate max-w-xs">{service.name}</span>
            </div>

            {/* 2-Column Hero: Left Information & Right Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-[10px] uppercase tracking-wider font-semibold text-neutral-800 rounded-sm">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{service.category || service.categoryTitle || "Astrology Consultation"}</span>
                  </span>

                  {service.isPopular && (
                    <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm">
                      Popular ★
                    </span>
                  )}
                </div>

                {/* Service Heading */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black uppercase tracking-tight leading-tight">
                    {service.name}
                  </h1>

                  {service.subtitle && (
                    <p className="text-sm sm:text-base text-[#7C2D37] font-serif italic mt-1 font-medium">
                      {service.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {service.description || service.shortSummary}
                </p>

                {/* Consultation Details: Fee & Duration */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-neutral-100 text-xs">
                  {service.price && (
                    <div className="bg-neutral-100 border border-neutral-200 px-3 py-1 font-semibold text-black rounded-md">
                      Fee: {service.price}
                    </div>
                  )}
                  {service.duration && (
                    <div className="flex items-center gap-1.5 text-neutral-600 bg-neutral-50 border border-neutral-200 px-3 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Duration: {service.duration}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="px-5 py-2.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs uppercase tracking-wider font-medium rounded-md shadow-xs hover:shadow-sm cursor-pointer transition-all flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Session Now</span>
                  </button>

                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="px-4 py-2.5 bg-white border border-neutral-300 hover:border-black text-black text-xs font-medium rounded-md transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Call {clinicInfo.formattedPhone}</span>
                  </a>
                </div>

              </div>

              {/* Right Column: High Quality Service Image */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 shadow-sm group">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={service.image?.alt || service.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-6 text-center text-white space-y-2">
                      <Icon className="w-12 h-12 text-neutral-400" />
                      <span className="text-xs uppercase tracking-wider text-neutral-300 font-medium">
                        {service.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Content Section: Parameters & Deliverables */}
        <section className="w-full py-10 sm:py-14 bg-neutral-50/50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              
              {/* Left Column: Analysis & Diagnostic Framework */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Astrological Parameters */}
                {(service.bhavasAnalyzed || service.karakaPlanets || service.methodology) && (
                  <div className="bg-white border border-neutral-200 p-5 sm:p-6 rounded-lg shadow-2xs space-y-4">
                    <h2 className="text-base sm:text-lg font-semibold text-black uppercase tracking-tight border-b border-neutral-100 pb-3">
                      Classical Astrological Parameters
                    </h2>

                    <div className="space-y-4">
                      {service.bhavasAnalyzed && (
                        <div className="space-y-1">
                          <h3 className="text-[11px] uppercase tracking-wider text-[#7C2D37] font-semibold">
                            Bhavas (Houses) Evaluated
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                            {service.bhavasAnalyzed}
                          </p>
                        </div>
                      )}

                      {service.karakaPlanets && (
                        <div className="space-y-1">
                          <h3 className="text-[11px] uppercase tracking-wider text-[#7C2D37] font-semibold">
                            Primary Karaka Planets
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                            {service.karakaPlanets}
                          </p>
                        </div>
                      )}

                      {service.methodology && (
                        <div className="space-y-1">
                          <h3 className="text-[11px] uppercase tracking-wider text-[#7C2D37] font-semibold">
                            Methodology & Calculations
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                            {service.methodology}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Key Deliverables */}
                {service.inclusions && service.inclusions.length > 0 && (
                  <div className="bg-white border border-neutral-200 p-5 sm:p-6 rounded-lg shadow-2xs space-y-3">
                    <h2 className="text-base sm:text-lg font-semibold text-black uppercase tracking-tight border-b border-neutral-100 pb-3">
                      Key Deliverables & Inclusions
                    </h2>

                    <ul className="space-y-2.5 pt-1">
                      {service.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                          <CheckCircle2 className="w-4 h-4 text-[#7C2D37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Right Column: Sticky Booking Card */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-neutral-200 p-5 rounded-lg sticky top-24 space-y-5 shadow-2xs">
                  <div>
                    <h3 className="text-sm font-semibold text-black uppercase tracking-wider mb-1">
                      Reserve Session
                    </h3>
                    <p className="text-xs text-neutral-500 font-normal">
                      Direct 1-on-1 personalized advisory session with Ach. Dr. Mohit Shah.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-neutral-100">
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="w-full py-2.5 bg-[#A86121] hover:bg-[#91521a] text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-md cursor-pointer transition-colors shadow-2xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Online Session</span>
                    </button>

                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className="w-full py-2 bg-neutral-50 border border-neutral-200 hover:border-black text-black font-medium text-xs flex items-center justify-center gap-2 rounded-md transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Direct Call ({clinicInfo.formattedPhone})</span>
                    </a>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-neutral-700" />
                      <span>Complete Kundali & Dasha Review</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-neutral-700" />
                      <span>100% Confidential & Authentic Guidance</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Other Consultations / Related Services */}
        {otherServices.length > 0 && (
          <section className="w-full py-10 sm:py-14 bg-white border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-black uppercase tracking-tight">
                  Explore Other Consultations
                </h2>
                <Link
                  href="/services"
                  className="text-xs font-medium text-black hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {otherServices.map((srv) => {
                  const srvImg = srv.image?.url || srv.image || srv.coverImage;
                  return (
                    <Link
                      key={srv._id || srv.id || srv.slug}
                      href={`/services/${srv.slug}`}
                      className="group bg-white border border-[#E6DDCE] hover:border-[#7C2D37] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(92,22,37,0.08)] transition-all flex flex-col justify-between overflow-hidden"
                    >
                      {/* Image Banner */}
                      {srvImg ? (
                        <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden border-b border-[#E6DDCE]">
                          <img
                            src={srvImg}
                            alt={srv.image?.alt || srv.name}
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          />
                          <span className="absolute top-2 left-2 bg-black/85 text-white text-[9px] px-2 py-0.5 font-medium uppercase tracking-wider rounded-sm">
                            {srv.category}
                          </span>
                          {srv.isPopular && (
                            <span className="absolute top-2 right-2 bg-amber-600 text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-sm">
                              Popular ★
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="px-4 pt-3">
                          <span className="text-[9px] uppercase font-semibold text-neutral-500 block mb-1">
                            {srv.category}
                          </span>
                        </div>
                      )}

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold text-black group-hover:text-[#5C1625] transition-colors mb-0.5 leading-snug">
                            {srv.name}
                          </h3>
                          {srv.subtitle && (
                            <p className="text-[10px] sm:text-[11px] text-[#7C2D37] italic font-serif mb-1.5 font-medium">
                              {srv.subtitle}
                            </p>
                          )}
                          <p className="text-[11px] sm:text-xs text-neutral-700 line-clamp-2 leading-relaxed font-normal">
                            {srv.shortSummary || srv.description}
                          </p>
                        </div>

                        <div className="pt-2.5 border-t border-[#E6DDCE] flex items-center justify-between text-xs">
                          {srv.price ? (
                            <span className="font-semibold text-black bg-[#EFE7D8] px-2 py-0.5 rounded-sm border border-[#DCD1BF] text-[11px]">
                              {srv.price}
                            </span>
                          ) : <span />}
                          <span className="text-black font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-[11px]">
                            Details <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={service.name}
      />
    </div>
  );
}

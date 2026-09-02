"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  Compass,
  TrendingUp,
  Home,
  Flame,
  Clock,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Loader2,
  Search
} from "lucide-react";
import { serviceCategories } from "@/data/siteContent";

export default function ServicesDirectoryPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const iconMap = {
    Compass: Compass,
    TrendingUp: TrendingUp,
    Home: Home,
    Flame: Flame,
    Clock: Clock,
    ShieldCheck: ShieldCheck,
  };

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          // Flatten fallback
          const flattened = serviceCategories.flatMap((c) =>
            c.services.map((s) => ({ ...s, category: c.title }))
          );
          setServices(flattened);
        }
      })
      .catch(() => {
        const flattened = serviceCategories.flatMap((c) =>
          c.services.map((s) => ({ ...s, category: c.title }))
        );
        setServices(flattened);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBookService = (name) => {
    setSelectedService(name || "Birth Chart Analysis");
    setBookingOpen(true);
  };

  // Filter services by search query
  const displayedServices = services.filter((s) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.name?.toLowerCase().includes(query) ||
      s.subtitle?.toLowerCase().includes(query) ||
      s.description?.toLowerCase().includes(query) ||
      s.shortSummary?.toLowerCase().includes(query) ||
      s.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => handleBookService()} />

      <main className="flex-1 w-full bg-[#FAF7F2]">
        {/* Unified Services Section with warm cream background */}
        <section className="w-full pt-6 sm:pt-7 pb-12 sm:pb-16 border-b border-[#E6DDCE]">
          <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Header: Heading on Left & Search Bar on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-black uppercase tracking-tight">
                  Services & Consultations
                </h1>
              </div>

              {/* Search Bar in Right Side */}
              <div className="w-full sm:w-80 flex items-center">
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    className="w-full text-xs border border-[#D5C9B6] pr-20 pl-3 py-2 bg-white text-black focus:outline-none focus:border-black rounded-md transition-colors"
                  />
                  <button
                    type="button"
                    className="absolute right-1 px-3 py-1.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs font-medium rounded-sm cursor-pointer flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Unified Continuous Services Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-2xs animate-pulse"
                  >
                    <div className="aspect-[16/9] bg-neutral-200/90 w-full"></div>
                    <div className="p-4 space-y-2.5">
                      <div className="h-4 bg-neutral-200/90 rounded-xs w-3/4"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-neutral-200/70 rounded-xs w-full"></div>
                        <div className="h-3 bg-neutral-200/70 rounded-xs w-5/6"></div>
                      </div>
                      <div className="pt-2.5 border-t border-neutral-100 flex gap-2">
                        <div className="h-7 bg-neutral-200/60 rounded-md w-16"></div>
                        <div className="h-7 bg-neutral-200/80 rounded-md flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedServices.length === 0 ? (
              <div className="text-center py-16 bg-neutral-50/50 border border-dashed border-neutral-300 rounded-lg space-y-2.5 max-w-md mx-auto">
                <Compass className="w-8 h-8 text-neutral-300 mx-auto" />
                <h3 className="text-sm font-semibold text-black uppercase tracking-wider">No Services Found</h3>
                <p className="text-xs text-neutral-500">
                  {searchQuery
                    ? "No consultation services matched your search query."
                    : "No services available in the catalog."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-2 px-3.5 py-1.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs font-medium rounded-md cursor-pointer transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                {displayedServices.map((srv) => {
                  const Icon = iconMap[srv.icon] || Compass;
                  return (
                    <div
                      key={srv._id || srv.id || srv.slug}
                      className="bg-white border border-[#E6DDCE] flex flex-col justify-between hover:border-[#7C2D37] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(92,22,37,0.08)] transition-all duration-200 group overflow-hidden cursor-pointer"
                    >
                      {/* Card Image Banner */}
                      <Link href={`/services/${srv.slug}`} className="block">
                        {srv.image?.url ? (
                          <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden border-b border-[#E6DDCE]">
                            <img
                              src={srv.image.url}
                              alt={srv.image.alt || srv.name}
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
                        ) : null}
                      </Link>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <Link href={`/services/${srv.slug}`} className="block space-y-2">
                          {/* Top Card Bar (If no cover image) */}
                          {!srv.image?.url && (
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E6DDCE]">
                              <div className="w-7 h-7 border border-[#E2D8C7] bg-[#F3ECE0] flex items-center justify-center rounded-md">
                                <Icon className="w-3.5 h-3.5 text-black" />
                              </div>
                              <span className="text-[9px] bg-[#EFE7D8] text-neutral-800 px-2 py-0.5 rounded-sm font-medium uppercase">
                                {srv.category}
                              </span>
                            </div>
                          )}

                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-black mb-0.5 leading-snug group-hover:text-[#5C1625] transition-colors">
                              {srv.name}
                            </h3>

                            {srv.subtitle && (
                              <span className="text-[10px] sm:text-[11px] text-[#7C2D37] font-medium italic block mb-1.5">
                                {srv.subtitle}
                              </span>
                            )}

                            <p className="text-[11px] sm:text-xs text-neutral-700 leading-relaxed mb-2.5 font-normal line-clamp-2">
                              {srv.shortSummary || srv.description}
                            </p>
                          </div>

                          {/* Price & Duration */}
                          {(srv.price || srv.duration) && (
                            <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] text-neutral-700">
                              {srv.price && (
                                <span className="font-semibold text-black bg-[#EFE7D8] px-1.5 py-0.5 border border-[#DCD1BF] rounded-sm">
                                  {srv.price}
                                </span>
                              )}
                              {srv.duration && (
                                <span className="flex items-center gap-1 text-neutral-600">
                                  <Clock className="w-3 h-3 text-neutral-500" />
                                  <span>{srv.duration}</span>
                                </span>
                              )}
                            </div>
                          )}

                          {/* Diagnostic Inclusions Box */}
                          {(srv.bhavasAnalyzed || srv.karakaPlanets) && (
                            <div className="bg-[#F3ECE0] p-2 border border-[#E2D8C7] mb-2 space-y-0.5 text-[10px] sm:text-[11px] rounded-md">
                              <div className="font-medium text-black uppercase tracking-wider text-[9px]">
                                Parameters Evaluated:
                              </div>
                              <div className="text-neutral-700 space-y-0.5">
                                {srv.bhavasAnalyzed && <div>• <strong>Houses:</strong> {srv.bhavasAnalyzed}</div>}
                                {srv.karakaPlanets && <div>• <strong>Karakas:</strong> {srv.karakaPlanets}</div>}
                              </div>
                            </div>
                          )}
                        </Link>

                        {/* Booking Action */}
                        <div className="pt-2.5 border-t border-[#E6DDCE] flex items-center justify-between gap-2">
                          <Link
                            href={`/services/${srv.slug}`}
                            className="px-3 py-1.5 bg-[#FAF6EE] border border-[#D5C9B6] hover:border-black text-[11px] font-medium text-neutral-800 transition-all rounded-md"
                          >
                            Details
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookService(srv.name);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[#A86121] hover:bg-[#91521a] text-white text-[11px] uppercase tracking-wider font-medium transition-all rounded-md shadow-2xs hover:shadow-xs cursor-pointer"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Book Session</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

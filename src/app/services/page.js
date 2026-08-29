"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
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
  Calendar,
} from "lucide-react";
import { serviceCategories, allServices } from "@/data/siteContent";

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Birth Chart Analysis");
  const [activeTab, setActiveTab] = useState("all");

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

  const handleBookService = (name) => {
    setSelectedService(name || "Birth Chart Analysis");
    setBookingOpen(true);
  };

  const filteredCategories =
    activeTab === "all"
      ? serviceCategories
      : serviceCategories.filter((c) => c.id === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => handleBookService()} />

      <main className="flex-1 w-full">
        {/* Page Hero */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                Services & Consultations
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                All 15 authentic astrological, spatial Vastu, and remedial disciplines personally conducted by Ach. Dr. Mohit Shah. Every session includes rigorous mathematical chart calculation.
              </p>
            </div>
          </div>
        </section>

        {/* Directory Section */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 pb-4 border-b border-neutral-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-normal transition-all rounded-md cursor-pointer ${
                  activeTab === "all"
                    ? "bg-black text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                All 15 Disciplines
              </button>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-normal transition-all rounded-md cursor-pointer ${
                    activeTab === cat.id
                      ? "bg-black text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Categorized Services List */}
            {filteredCategories.map((category) => (
              <div key={category.id} className="space-y-4">
                
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-neutral-200">
                  <h2 className="text-lg sm:text-xl font-medium text-black">
                    {category.title}
                  </h2>
                  <span className="text-xs text-neutral-500 font-normal">
                    {category.shortDescription}
                  </span>
                </div>

                {/* Service Cards Grid with small rounded corners & shadows */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                  {category.services.map((srv) => {
                    const Icon = iconMap[srv.icon] || Compass;
                    return (
                      <div
                        key={srv.id}
                        className="bg-white border border-neutral-200 p-4 sm:p-5 flex flex-col justify-between hover:border-black rounded-md shadow-xs hover:shadow-md transition-all duration-200 group"
                      >
                        <div>
                          {/* Top Card Bar */}
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-100">
                            <div className="w-7 h-7 border border-neutral-200 bg-neutral-50 flex items-center justify-center rounded-md">
                              <Icon className="w-3.5 h-3.5 text-black" />
                            </div>
                            {srv.subtitle && (
                              <span className="text-[11px] text-neutral-500 font-normal">
                                {srv.subtitle}
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-medium text-black mb-1.5 leading-snug">
                            {srv.name}
                          </h3>

                          <p className="text-xs text-neutral-600 leading-relaxed mb-3 font-normal">
                            {srv.description}
                          </p>

                          {/* Diagnostic Inclusions Box */}
                          <div className="bg-neutral-50 p-2.5 border border-neutral-200 mb-4 space-y-1 text-[11px] rounded-md shadow-2xs">
                            <div className="font-medium text-black uppercase tracking-wider text-[10px]">
                              Parameters Evaluated:
                            </div>
                            <div className="text-neutral-600 space-y-0.5">
                              <div>• <strong>Houses:</strong> {srv.bhavasAnalyzed}</div>
                              <div>• <strong>Karakas:</strong> {srv.karakaPlanets}</div>
                            </div>
                          </div>
                        </div>

                        {/* Booking Action */}
                        <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between">
                          <button
                            onClick={() => handleBookService(srv.name)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
                          >
                            <Calendar className="w-3 h-3" />
                            <span>Book Consultation</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}

          </div>
        </section>

        <ConsultationCTA onOpenBooking={() => handleBookService()} />
      </main>

      <Footer onOpenBooking={() => handleBookService()} />
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

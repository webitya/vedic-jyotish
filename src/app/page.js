"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import AboutUsSection from "@/components/AboutUsSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import HomeGallerySection from "@/components/HomeGallerySection";
import ConsultationModal from "@/components/ConsultationModal";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = (name) => {
    setSelectedService(name || "Birth Chart Analysis");
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-clip">
      <Navbar onOpenBooking={() => handleBookService()} />

      <main className="flex-1 w-full">
        {/* 1. Carousel — Hero Showcase */}
        <section className="w-full bg-neutral-900">
          <HeroCarousel onOpenBooking={() => handleBookService()} />
        </section>

        {/* 2. About Us Section with Left Content & Right Rotating Vedic Image */}
        <AboutUsSection onOpenBooking={() => handleBookService()} />

        {/* 3. Services Section with Extracted Text & Infinite Carousel */}
        <HomeServicesSection onOpenBooking={(name) => handleBookService(name)} />

        {/* 4. Gallery Section with Extracted Text & 2-Row Grid */}
        <HomeGallerySection />
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

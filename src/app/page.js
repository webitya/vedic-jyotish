"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import AboutUsSection from "@/components/AboutUsSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import HomeGallerySection from "@/components/HomeGallerySection";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar />

      <main className="flex-1 w-full">
        {/* 1. Carousel — Hero Showcase */}
        <section className="w-full bg-neutral-900">
          <HeroCarousel />
        </section>

        {/* 2. About Us Section with Left Content & Right Rotating Vedic Image */}
        <AboutUsSection />

        {/* 3. Services Section with Extracted Text & Infinite Carousel */}
        <HomeServicesSection />

        {/* 4. Gallery Section with Extracted Text & 2-Row Grid */}
        <HomeGallerySection />
      </main>

      <Footer />
    </div>
  );
}

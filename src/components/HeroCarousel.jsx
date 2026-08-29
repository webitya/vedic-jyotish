"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroCarousel() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=2400&q=85",
      alt: "Vedic Astrology — Kundali and Dasha Chart",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
      alt: "Vastu Shastra — Residential Architecture",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=2400&q=85",
      alt: "Navratna Gemstones and Rudraksha",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=2400&q=85",
      alt: "Ach. Dr. Mohit Shah — Vedic Astrologer",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Vedic Jyotish Kendra Hero Carousel"
    >
      {/* Slides — 6000:1875 ratio with responsive min/max heights */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2.4/1] lg:aspect-[6000/1875] min-h-[240px] sm:min-h-[340px] lg:min-h-[400px] max-h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Arrow Controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all rounded-md opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/80 text-white border border-white/20 backdrop-blur-sm flex items-center justify-center transition-all rounded-md opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                currentIndex === idx
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sub-component for individual device carousel track (Desktop or Mobile)
function CarouselTrack({ slides, isMobile = false }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isInteracting = useRef(false);

  // Reset track index whenever slides change
  useEffect(() => {
    setCurrentIndex(1);
    setIsTransitioning(false);
  }, [slides]);

  // Cloned buffer for true seamless infinite loop: [Last, ...Slides, First]
  const extendedSlides = slides.length > 1
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : slides;

  const nextSlide = useCallback(() => {
    if (slides.length <= 1 || isInteracting.current) return;
    isInteracting.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length <= 1 || isInteracting.current) return;
    isInteracting.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [slides.length]);

  const goToSlide = (targetIndex) => {
    if (isInteracting.current) return;
    setIsTransitioning(true);
    setCurrentIndex(targetIndex + 1);
  };

  // Seamless jump without animation when landing on clone boundary
  const handleTransitionEnd = () => {
    isInteracting.current = false;
    if (slides.length <= 1) return;

    if (currentIndex >= extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length);
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, slides.length]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      touchEndX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Active dot index calculation
  const activeDotIndex = slides.length <= 1
    ? 0
    : currentIndex === 0
    ? slides.length - 1
    : currentIndex === extendedSlides.length - 1
    ? 0
    : currentIndex - 1;

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-900 group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio Container: Mobile is strict 16:9, Desktop is 1920x640 */}
      <div
        className={`relative w-full overflow-hidden ${
          isMobile
            ? "aspect-[16/9] w-full"
            : "aspect-[1920/640] sm:aspect-[2.4/1] lg:aspect-[1920/640] min-h-[320px] lg:min-h-[400px] max-h-[640px] w-full"
        }`}
      >
        {/* Sliding Track */}
        <div
          className={`flex w-full h-full will-change-transform ${
            isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"
          }`}
          style={{
            transform: `translateX(-${slides.length > 1 ? currentIndex * 100 : 0}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={`${slide._id || slide.id || index}-${index}`}
              className="w-full h-full flex-shrink-0 relative overflow-hidden"
            >
              <img
                src={slide.url || slide.image}
                alt={slide.alt || "Vedic Jyotish Kendra"}
                className="w-full h-full object-cover"
                loading={index <= 2 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className={`absolute top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/85 text-white border border-white/30 backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isMobile
                  ? "left-2 w-7 h-7"
                  : "left-3 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 hover:scale-105"
              }`}
            >
              <ChevronLeft className={isMobile ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className={`absolute top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/85 text-white border border-white/30 backdrop-blur-sm flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isMobile
                  ? "right-2 w-7 h-7"
                  : "right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 hover:scale-105"
              }`}
            >
              <ChevronRight className={isMobile ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} />
            </button>

            {/* Indicator Dots Bar */}
            <div className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 ${
              isMobile ? "bottom-2" : "bottom-3 sm:bottom-4"
            }`}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-none cursor-pointer ${
                    activeDotIndex === idx
                      ? isMobile ? "w-4 h-1 bg-white" : "w-6 h-1 bg-white shadow-sm"
                      : isMobile ? "w-1.5 h-1 bg-white/50" : "w-2 h-1 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSlides = () => {
    fetch(`/api/carousel?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSlides();
  }, []);

  // Skeleton Loader on initial fetch
  if (loading) {
    return (
      <div className="relative w-full overflow-hidden bg-neutral-100 select-none">
        {/* Desktop Skeleton */}
        <div className="hidden md:block relative w-full aspect-[1920/640] min-h-[320px] lg:min-h-[400px] max-h-[640px] bg-neutral-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200/80 to-neutral-100 animate-pulse" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/70 border border-neutral-200/80 shadow-xs flex items-center justify-center">
            <div className="w-2.5 h-2.5 border-l-2 border-b-2 border-neutral-400/50 rotate-45 ml-1" />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/70 border border-neutral-200/80 shadow-xs flex items-center justify-center">
            <div className="w-2.5 h-2.5 border-r-2 border-t-2 border-neutral-400/50 rotate-45 mr-1" />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            <div className="w-6 h-1 bg-neutral-400/60" />
            <div className="w-2 h-1 bg-neutral-300/80" />
            <div className="w-2 h-1 bg-neutral-300/80" />
          </div>
        </div>

        {/* Mobile Skeleton (16:9) */}
        <div className="block md:hidden relative w-full aspect-[16/9] min-h-[190px] bg-neutral-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200/80 to-neutral-100 animate-pulse" />
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
            <div className="w-4 h-1 bg-neutral-400/60" />
            <div className="w-1.5 h-1 bg-neutral-300/80" />
            <div className="w-1.5 h-1 bg-neutral-300/80" />
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  // Strictly filter desktop and mobile slides
  // Desktop slides: device === "desktop" or device === "all" or undefined/null.
  const desktopSlides = slides.filter(
    (s) => s.device === "desktop" || s.device === "all" || !s.device
  );

  // Mobile slides: device === "mobile" or device === "all".
  // If no mobile-specific slides exist, fallback to shared/all slides
  const mobileSlides = slides.filter(
    (s) => s.device === "mobile" || s.device === "all"
  );

  // If user has not created mobile-specific slides yet, show desktop slides as graceful fallback on mobile
  const effectiveMobileSlides = mobileSlides.length > 0 ? mobileSlides : desktopSlides;

  return (
    <div className="w-full">
      {/* ── Desktop Track: Shows strictly on Desktop screens (md and above) ──────── */}
      {desktopSlides.length > 0 && (
        <div className="hidden md:block w-full">
          <CarouselTrack slides={desktopSlides} isMobile={false} />
        </div>
      )}

      {/* ── Mobile Track: Shows strictly on Mobile screens in 16:9 ratio ─ */}
      {effectiveMobileSlides.length > 0 && (
        <div className="block md:hidden w-full">
          <CarouselTrack slides={effectiveMobileSlides} isMobile={true} />
        </div>
      )}
    </div>
  );
}

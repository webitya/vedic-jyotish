"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function NotificationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      if (typeof window !== "undefined") {
        const dismissed = sessionStorage.getItem("vedic_popup_dismissed");
        if (dismissed === "1") return;
      }
    } catch {}

    // Fetch popup status & active banner images
    fetch("/api/popup")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.enabled && Array.isArray(data.images) && data.images.length > 0) {
          const activeList = data.images.filter((img) => img.active !== false && !!img.url);
          if (activeList.length > 0) {
            setImages(activeList);
            // Slight delay so the page settles smoothly before showing the popup
            setTimeout(() => {
              setIsOpen(true);
            }, 1200);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("vedic_popup_dismissed", "1");
      }
    } catch {}
  };

  const nextSlide = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Auto-play timer if multiple slides
  useEffect(() => {
    if (!isOpen || isPaused || images.length <= 1) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isOpen, nextSlide, isPaused, images.length]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!isOpen || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Important Announcement"
    >
      {/* 600px by 400px Popup Container (3:2 Aspect Ratio) */}
      <div
        className="relative w-full max-w-[600px] aspect-[600/400] bg-neutral-900 shadow-2xl overflow-hidden border border-white/20 rounded-lg group animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close notification"
          className="absolute top-2.5 right-2.5 z-40 w-8 h-8 sm:w-9 sm:h-9 bg-black/80 hover:bg-black text-white border border-white/40 flex items-center justify-center cursor-pointer transition-all rounded-full shadow-lg hover:scale-105"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Carousel / Banner Image Display */}
        <div className="relative w-full h-full overflow-hidden">
          {images.map((img, idx) => {
            const isCurrent = idx === currentIndex;
            const content = (
              <img
                src={img.url}
                alt="Important Notice Banner"
                className="w-full h-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );

            return (
              <div
                key={img._id || img.id || idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {img.link ? (
                  <Link
                    href={img.link}
                    onClick={handleClose}
                    className="block w-full h-full cursor-pointer"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>

        {/* Previous & Next Arrow Controls (Multiple Images only) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center cursor-pointer transition-all rounded-full shadow-md hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 bg-black/60 hover:bg-black/90 text-white border border-white/30 flex items-center justify-center cursor-pointer transition-all rounded-full shadow-md hover:scale-105"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Bottom Indicator Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? "w-6 h-1.5 bg-white shadow-sm"
                      : "w-2 h-1.5 bg-white/50 hover:bg-white/80"
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

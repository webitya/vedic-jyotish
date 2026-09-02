"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Compass, Clock, Star } from "lucide-react";
import { serviceCategories } from "@/data/siteContent";

export default function HomeServicesSection({ onOpenBooking }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          // Fallback from static definitions
          const all = serviceCategories.flatMap((cat) =>
            cat.services.map((srv) => ({
              ...srv,
              category: cat.title,
            }))
          );
          setServices(all);
        }
      })
      .catch(() => {
        const all = serviceCategories.flatMap((cat) =>
          cat.services.map((srv) => ({
            ...srv,
            category: cat.title,
          }))
        );
        setServices(all);
      })
      .finally(() => setLoading(false));
  }, []);

  // Duplicate the array to ensure seamless infinite looping
  const marqueeList = services.length > 0 ? [...services, ...services] : [];

  return (
    <section className="w-full py-10 sm:py-14 bg-white border-b border-[#E6DDCE] overflow-hidden font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Block: Full width paragraphs without Explore button */}
        <div className="w-full mb-8">
          <div className="w-full space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-black tracking-tight uppercase">
              Services
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              Welcome to our astrology consultation website, where we offer Vedic remedies to solve any problem you may be facing. Our expert, Dr. Acharya Mohit, provides thorough analysis of your birth chart to personalized solutions. We provide professional and reliable guidance for all your astrological needs.
            </p>

            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              One-roof solution for all your Astrological needs. Our expert team offers a wide range of services including Ratna, Rudraksh &amp; Yantra therapy. Various Vedic poojas and rituals such as Grah Shanti Pooja, Pitri Dosh, and Kaalsarp Dosh Pooja is also offered. Trust us to provide you with professional and authentic Vedic solutions for a better life.
            </p>
          </div>
        </div>

        {/* Horizontal Marquee Carousel aligned within max-w-7xl container */}
        <div className="w-full relative overflow-hidden pt-2 pb-4">
          {loading ? (
            <div className="flex gap-4 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-[280px] sm:w-[295px] md:w-[310px] shrink-0 bg-neutral-100 rounded-lg h-72 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="animate-marquee-smooth flex gap-4 sm:gap-5">
              {marqueeList.map((srv, idx) => {
                const srvImg = srv.image?.url || srv.image || srv.coverImage;
                return (
                  <div
                    key={`${srv._id || srv.slug}-${idx}`}
                    className="w-[270px] sm:w-[285px] md:w-[305px] shrink-0 bg-[#FAF7F2] border border-[#E6DDCE] hover:border-[#7C2D37] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_18px_rgba(168,97,33,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                  >
                    {/* Card Cover Image */}
                    <Link href={`/services/${srv.slug}`} className="block">
                      {srvImg ? (
                        <div className="relative aspect-[16/9] bg-neutral-900 overflow-hidden border-b border-[#E6DDCE]">
                          <img
                            src={srvImg}
                            alt={srv.image?.alt || srv.name}
                            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 opacity-95"
                            loading="lazy"
                          />
                          <span className="absolute top-2 left-2 bg-black/85 text-white text-[9px] px-2 py-0.5 font-medium uppercase tracking-wider rounded-xs">
                            {srv.category}
                          </span>
                          {srv.isPopular && (
                            <span className="absolute top-2 right-2 bg-amber-600 text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider rounded-xs flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" /> Popular
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="p-3.5 pb-0 flex items-center justify-between border-b border-[#E6DDCE] pb-2">
                          <span className="text-[9px] bg-[#EFE7D8] text-neutral-800 px-2 py-0.5 rounded-xs font-semibold uppercase">
                            {srv.category}
                          </span>
                          <div className="w-6 h-6 rounded-md bg-white border border-[#E2D8C7] flex items-center justify-center">
                            <Compass className="w-3.5 h-3.5 text-black" />
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Card Body */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
                      <Link href={`/services/${srv.slug}`} className="block space-y-1">
                        <h3 className="text-sm font-semibold text-black group-hover:text-[#A86121] transition-colors leading-snug line-clamp-1">
                          {srv.name}
                        </h3>
                        {srv.subtitle && (
                          <p className="text-[10px] text-[#7C2D37] italic font-serif line-clamp-1 font-medium">
                            {srv.subtitle}
                          </p>
                        )}
                        <p className="text-[11px] text-neutral-600 line-clamp-2 leading-relaxed font-normal">
                          {srv.shortDescription || srv.description}
                        </p>
                      </Link>

                      {/* Card Footer: Price & Booking Trigger */}
                      <div className="pt-2 border-t border-[#E6DDCE] flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-neutral-400 block uppercase font-medium">Consultation Fee</span>
                          <span className="text-xs font-semibold text-[#191B20] font-sans">
                            {srv.price ? `₹${srv.price}` : "₹1,500"}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenBooking) onOpenBooking(srv.name);
                            else window.location.href = "/contact#book";
                          }}
                          className="px-3 py-1 bg-[#A86121] hover:bg-[#91521a] text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-medium rounded-md shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

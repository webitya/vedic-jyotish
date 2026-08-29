"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight } from "lucide-react";
import { blogArticles } from "@/data/siteContent";

export default function BlogsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const blogImages = {
    "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Header */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                Insights & Vedic Wisdom
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Educational essays authored under the academic purview of Ach. Dr. Mohit Shah explaining the mechanics of natal charts, spatial Vastu, and dasha timings.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {blogArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white border border-neutral-200 flex flex-col justify-between hover:border-black rounded-md shadow-xs hover:shadow-md transition-all duration-200 group overflow-hidden"
                >
                  <div>
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-neutral-900">
                      <img
                        src={blogImages[article.id] || blogImages["navamsha-marriage"]}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-400"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-2">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-black" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-lg font-medium text-black leading-snug mb-2 group-hover:underline">
                        <Link href={`/blogs/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 font-normal">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="px-4 sm:p-5 pb-4 pt-1.5 border-t border-neutral-100">
                    <Link
                      href={`/blogs/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-black group-hover:underline"
                    >
                      <span>Read Full Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ConsultationCTA onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { blogArticles } from "@/data/siteContent";

const FALLBACK_IMAGES = {
  "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
  "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
};

const DEFAULT_IMG = "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80";

function BlogCard({ article }) {
  const image = article.image?.url || FALLBACK_IMAGES[article.id] || FALLBACK_IMAGES[article.slug] || DEFAULT_IMG;
  const href = `/blogs/${article.slug}`;

  return (
    <article className="bg-white border border-neutral-200 flex flex-col justify-between hover:border-black rounded-md shadow-xs hover:shadow-md transition-all duration-200 group overflow-hidden cursor-pointer">
      <Link href={href} className="block">
        <div className="relative overflow-hidden aspect-[16/10] bg-neutral-900">
          <img
            src={image}
            alt={article.image?.alt || article.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          {article.category && (
            <span className="absolute top-2 left-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-normal">
              {article.category}
            </span>
          )}
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-2">
            {article.date && <span>{article.date}</span>}
            {article.date && <span>·</span>}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-black" />
              <span>{article.readTime}</span>
            </span>
          </div>
          <h2 className="text-base font-medium text-black leading-snug mb-2 group-hover:underline line-clamp-2">
            {article.title}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 font-normal">
            {article.excerpt}
          </p>
        </div>
      </Link>
      <div className="px-4 sm:px-5 pb-4 pt-1.5 border-t border-neutral-100">
        <Link href={href} className="inline-flex items-center gap-1.5 text-xs font-medium text-black group-hover:underline">
          <span>Read Full Essay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        } else {
          // Fallback to static data if MongoDB is empty or not configured
          setArticles(blogArticles);
        }
      })
      .catch(() => {
        setArticles(blogArticles); // graceful fallback
      })
      .finally(() => setLoading(false));
  }, []);

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

        {/* Blog Grid */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {articles.map((article) => (
                  <BlogCard key={article._id || article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>

        <ConsultationCTA onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight } from "lucide-react";
import { blogArticles, clinicInfo } from "@/data/siteContent";

export default function BlogDetailPage({ params }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  const [bookingOpen, setBookingOpen] = useState(false);

  const article = blogArticles.find((b) => b.slug === slug);

  if (!article) {
    notFound();
  }

  const otherArticles = blogArticles.filter((b) => b.slug !== slug);

  const blogImages = {
    "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
    "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Breadcrumb & Article Header */}
        <section className="w-full py-8 sm:py-10 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3 font-normal">
              <Link href="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-black">Blogs</Link>
              <span>/</span>
              <span className="text-black font-medium truncate max-w-xs sm:max-w-md">{article.title}</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black tracking-tight leading-tight mt-1 mb-3">
                {article.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-neutral-500 pb-2 border-b border-neutral-200">
                <span>{article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-black" />
                  <span>{article.readTime}</span>
                </span>
                <span>·</span>
                <span>Authored by {clinicInfo.practitioner}</span>
              </div>
            </div>

          </div>
        </section>

        {/* Article Body */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Featured Image */}
            <div className="border border-neutral-200 bg-neutral-900 aspect-[16/9] max-h-[360px] overflow-hidden mb-8 rounded-md shadow-xs">
              <img
                src={blogImages[article.id] || blogImages["navamsha-marriage"]}
                alt={article.title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Excerpt Lead */}
            <div className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed mb-6 pb-4 border-b border-neutral-200">
              "{article.excerpt}"
            </div>

            {/* Full Essay Content */}
            <div className="text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal whitespace-pre-line">
              {article.content}
            </div>

            {/* Author Footer Card */}
            <div className="mt-10 p-5 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md shadow-xs">
              <div>
                <div className="text-base font-medium text-black">
                  {clinicInfo.practitioner}
                </div>
                <div className="text-xs text-neutral-500">
                  Ph.D. Vedic Astrology (MCVA) · M.A. Jyotirvigyan (Ranchi University)
                </div>
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer shrink-0"
              >
                Book Astrological Session
              </button>
            </div>

            {/* Other Essays */}
            {otherArticles.length > 0 && (
              <div className="mt-10 pt-6 border-t border-neutral-200 space-y-4">
                <div className="text-xs font-medium uppercase tracking-wider text-black">
                  Further Reading in Vedic Insights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherArticles.map((oth) => (
                    <Link
                      key={oth.id}
                      href={`/blogs/${oth.slug}`}
                      className="p-4 border border-neutral-200 bg-white hover:border-black rounded-md shadow-xs hover:shadow-md transition-all group block"
                    >
                      <h3 className="text-sm font-medium text-black group-hover:underline leading-snug">
                        {oth.title}
                      </h3>
                      <div className="text-[11px] text-neutral-500 mt-1.5 flex items-center gap-1 font-normal">
                        <span>Read Essay</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
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

"use client";

import { useState } from "react";
import { ArrowUpRight, Clock, X } from "lucide-react";
import { blogArticles } from "@/data/siteContent";

export default function BlogSection() {
  const [readingArticle, setReadingArticle] = useState(null);

  const blogImages = {
    "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <section id="blogs" className="w-full py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#E6DED2]">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Scholarly Perspectives
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-2 leading-tight">
              Insights & Vedic Wisdom
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#626773] max-w-lg font-normal leading-relaxed">
            Educational essays authored under the academic purview of Ach. Dr. Mohit Shah explaining natal charts, spatial Vastu, and dasha timings.
          </p>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {blogArticles.map((article) => (
            <article
              key={article.id}
              className="bg-[#FAF7F2] border border-[#E6DED2] flex flex-col justify-between hover:border-[#B88E4B] transition-all duration-300 group"
            >
              <div>
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10] bg-[#191B20]">
                  <img
                    src={blogImages[article.id] || blogImages["navamsha-marriage"]}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-[#5C1625] uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#626773] mb-2.5">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B88E4B]" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F2228] font-normal leading-snug mb-2.5 group-hover:text-[#5C1625] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#626773] leading-relaxed line-clamp-3 font-normal">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2 border-t border-[#EAE2D5]">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C1625] group-hover:text-[#3E0C17] transition-colors cursor-pointer"
                >
                  <span>Read Full Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div
          className="fixed inset-0 z-50 bg-[#191B20]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setReadingArticle(null)}
        >
          <div
            className="relative bg-[#FAF7F2] border border-[#B88E4B] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setReadingArticle(null)}
              aria-label="Close essay reader"
              className="absolute top-5 right-5 w-8 h-8 bg-[#191B20] text-white flex items-center justify-center hover:bg-[#5C1625] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold tracking-widest text-[#5C1625] uppercase">
                {readingArticle.category} · {readingArticle.readTime}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1F2228] font-normal mt-2 mb-2 leading-tight">
                {readingArticle.title}
              </h2>
              <div className="text-xs text-[#626773] pb-3 border-b border-[#E6DED2]">
                Published in Vedic Jyotish Kendra Editorial Archive · {readingArticle.date}
              </div>
            </div>

            {/* Essay Body */}
            <div className="text-[#2F333B] text-sm sm:text-base leading-relaxed space-y-4 font-normal whitespace-pre-line">
              {readingArticle.content}
            </div>

            <div className="mt-8 pt-5 border-t border-[#E6DED2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs text-[#626773]">
                Authored under the academic supervision of Ach. Dr. Mohit Shah
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="px-5 py-2.5 bg-[#5C1625] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3E0C17] cursor-pointer"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

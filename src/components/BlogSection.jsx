"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, Loader2 } from "lucide-react";

export default function BlogSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data.slice(0, 3));
        }
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && articles.length === 0) {
    return null; // Gracefully hidden if no blogs published in database
  }

  return (
    <section id="blogs" className="w-full py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E6DED2] overflow-hidden font-sans">
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
            Educational treatises authored under the academic purview of Ach. Dr. Mohit Shah explaining natal charts, spatial Vastu harmonics, and dasha timings.
          </p>
        </div>

        {/* Article Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {articles.map((article) => (
              <article
                key={article._id}
                className="bg-[#FAF7F2] border border-[#E6DED2] flex flex-col justify-between hover:border-[#B88E4B] transition-all duration-300 group rounded-none"
              >
                <Link href={`/blogs/${article.slug}`} className="block">
                  <div>
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-[#191B20]">
                      <img
                        src={article.image?.url || "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80"}
                        alt={article.image?.alt || article.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-500"
                      />
                      {article.category && (
                        <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-[#5C1625] uppercase tracking-wider">
                          {article.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-[#626773] mb-2.5">
                        <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#B88E4B]" />
                          <span>{article.readTime || "5 min read"}</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl text-[#1F2228] font-normal leading-snug mb-2.5 group-hover:text-[#5C1625] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#626773] leading-relaxed line-clamp-3 font-normal">
                        {article.excerpt || article.metaDescription}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Action */}
                <div className="px-6 pb-6 pt-2 border-t border-[#EAE2D5]">
                  <Link
                    href={`/blogs/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C1625] group-hover:text-[#3E0C17] transition-colors cursor-pointer"
                  >
                    <span>Read Full Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

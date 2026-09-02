"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight, Loader2, Calendar, User, Tag, Share2, Sparkles, BookOpen } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Fetch directly from MongoDB
    fetch(`/api/blogs/${slug}`)
      .then(async (r) => {
        if (r.status === 404) throw new Error("not_found");
        if (!r.ok) throw new Error("api_error");
        return r.json();
      })
      .then((data) => {
        setArticle(data);
        // Load other published articles from MongoDB
        return fetch("/api/blogs");
      })
      .then((r) => r.json())
      .then((all) => {
        if (Array.isArray(all)) {
          setOtherArticles(all.filter((b) => b.slug !== slug).slice(0, 3));
        }
      })
      .catch((err) => {
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-neutral-500 animate-spin" />
        <span className="text-xs text-neutral-500 font-medium">Loading astrological treatise...</span>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar onOpenBooking={() => setBookingOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-neutral-300" />
          <h1 className="text-xl font-semibold text-black">Article Not Found</h1>
          <p className="text-xs text-neutral-500 max-w-md">
            The requested astrological article could not be located in the MongoDB database archive or may have been unpublished.
          </p>
          <Link
            href="/blogs"
            className="px-4 py-2 bg-black text-white text-xs font-medium rounded-none hover:bg-neutral-800"
          >
            ← Return to All Articles
          </Link>
        </div>
        <Footer onOpenBooking={() => setBookingOpen(true)} />
      </div>
    );
  }

  const coverImage = article.image?.url || "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80";
  const coverAlt = article.image?.alt || article.title;

  // JSON-LD Schema
  let schemaJson = article.schemaMarkup;
  if (!schemaJson || !schemaJson.trim()) {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://vedicjyotishkendra.in";
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.metaTitle || article.title,
      "description": article.metaDescription || article.excerpt,
      "image": [coverImage],
      "author": {
        "@type": "Person",
        "name": article.author?.name || clinicInfo.practitioner,
        "jobTitle": article.author?.role || "Vedic Astrologer & Vastu Consultant",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Vedic Jyotish Kendra",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
        },
      },
      "datePublished": article.createdAt || new Date().toISOString(),
      "dateModified": article.updatedAt || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteUrl}/blogs/${article.slug}`,
      },
      "keywords": article.metaKeywords?.join(", ") || "Vedic Astrology, Jyotish",
    };
    schemaJson = JSON.stringify(defaultSchema);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-clip font-sans">
      {/* Dynamic Schema.org JSON-LD structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Article Masthead */}
        <section className="w-full py-10 sm:py-14 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Breadcrumb path */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4 font-normal">
              <Link href="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <Link href="/blogs" className="hover:text-black">Blogs</Link>
              <span>/</span>
              <span className="text-black font-medium truncate max-w-xs sm:max-w-md">{article.title}</span>
            </div>

            {/* Category & Badges */}
            <div className="flex items-center gap-2 mb-3">
              {article.category && (
                <span className="text-[10px] bg-black text-white px-2.5 py-0.5 rounded-none font-semibold uppercase tracking-wider">
                  {article.category}
                </span>
              )}
              {article.isFeatured && (
                <span className="text-[10px] bg-amber-600 text-white px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 pt-3 border-t border-neutral-200">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-medium text-black">{article.author?.name || clinicInfo.practitioner}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>
                  {article.createdAt
                    ? new Date(article.createdAt).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })
                    : "Recently Published"}
                </span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>{article.readTime || "5 min read"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="w-full py-10 sm:py-16 bg-white border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            {/* Cover Image */}
            <div className="border border-neutral-300 bg-neutral-900 aspect-[16/9] max-h-[460px] overflow-hidden mb-8 rounded-none shadow-xs">
              <img
                src={coverImage}
                alt={coverAlt}
                className="w-full h-full object-cover opacity-95"
              />
            </div>

            {/* Excerpt */}
            {article.excerpt && (
              <div className="text-base sm:text-lg text-neutral-800 font-serif italic leading-relaxed mb-8 p-5 bg-neutral-50 border-l-4 border-[#5C1625]">
                "{article.excerpt}"
              </div>
            )}

            {/* Full Rich Article Body */}
            {article.content ? (
              <div
                className="prose prose-base max-w-none text-[#2F333B] leading-relaxed font-serif selection:bg-neutral-200"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-neutral-500 text-sm font-normal italic py-6">
                Full treatise content coming soon.
              </div>
            )}

            {/* Keyword Badges & Tags */}
            {article.metaKeywords && article.metaKeywords.length > 0 && (
              <div className="mt-10 pt-6 border-t border-neutral-200">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-2">
                  Astrological Indexing Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {article.metaKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2.5 py-1 border border-neutral-300 transition-colors"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Attribution Card */}
            <div className="mt-10 p-6 bg-neutral-50 border border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-none shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#5C1625] font-semibold">
                  Authored by
                </span>
                <div className="text-base font-semibold text-black">
                  {article.author?.name || clinicInfo.practitioner}
                </div>
                <div className="text-xs text-neutral-500 font-normal">
                  {article.author?.role || "Ph.D. Vedic Astrology (MCVA) · M.A. Jyotirvigyan (Ranchi University)"}
                </div>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-all rounded-none cursor-pointer shrink-0"
              >
                Book Astrological Session
              </button>
            </div>

            {/* Further Reading from MongoDB */}
            {otherArticles.length > 0 && (
              <div className="mt-12 pt-8 border-t border-neutral-300 space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-black">
                  Further Reading in Vedic Insights
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherArticles.map((oth) => (
                    <Link
                      key={oth._id}
                      href={`/blogs/${oth.slug}`}
                      className="p-4 border border-neutral-300 bg-white hover:border-black rounded-none shadow-xs hover:shadow-md transition-all group block"
                    >
                      {oth.image?.url && (
                        <div className="aspect-[16/10] overflow-hidden mb-2.5 bg-neutral-100 border border-neutral-200">
                          <img
                            src={oth.image.url}
                            alt={oth.image.alt || oth.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h3 className="text-xs font-semibold text-black group-hover:text-[#5C1625] group-hover:underline leading-snug line-clamp-2">
                        {oth.title}
                      </h3>
                      <div className="text-[10px] text-neutral-500 mt-2 flex items-center gap-1">
                        <span>Read Treatise</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import { blogArticles, clinicInfo } from "@/data/siteContent";

const FALLBACK_IMAGES = {
  "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
  "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80",
};
const DEFAULT_IMG = "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80";

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Try MongoDB first, fall back to static data
    fetch(`/api/blogs/${slug}`)
      .then(async (r) => {
        if (r.status === 404) throw new Error("not_found");
        if (!r.ok) throw new Error("api_error");
        return r.json();
      })
      .then((data) => {
        setArticle(data);
        // Load other articles for further reading
        return fetch("/api/blogs");
      })
      .then((r) => r.json())
      .then((all) => {
        if (Array.isArray(all)) {
          setOtherArticles(all.filter((b) => b.slug !== slug).slice(0, 2));
        }
      })
      .catch((err) => {
        // Fallback to static data
        const staticArticle = blogArticles.find((b) => b.slug === slug);
        if (!staticArticle) {
          setNotFound(true);
        } else {
          setArticle(staticArticle);
          setOtherArticles(blogArticles.filter((b) => b.slug !== slug).slice(0, 2));
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-neutral-500 font-normal">Article not found.</p>
        <Link href="/blogs" className="text-xs text-black underline">← Back to all articles</Link>
      </div>
    );
  }

  const coverImage = article.image?.url || FALLBACK_IMAGES[article.id] || FALLBACK_IMAGES[article.slug] || DEFAULT_IMG;
  const coverAlt = article.image?.alt || article.title;

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Header */}
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
              {article.category && (
                <span className="inline-block text-[10px] bg-black text-white px-2.5 py-0.5 rounded font-normal mb-2">
                  {article.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black tracking-tight leading-tight mt-1 mb-3">
                {article.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-neutral-500 pb-2 border-b border-neutral-200">
                {article.date && <span>{article.date}</span>}
                {article.date && <span>·</span>}
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
            {/* Featured Image — from Cloudinary if available */}
            <div className="border border-neutral-200 bg-neutral-900 aspect-[16/9] max-h-[420px] overflow-hidden mb-8 rounded-md shadow-xs">
              <img
                src={coverImage}
                alt={coverAlt}
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Excerpt Lead */}
            {article.excerpt && (
              <div className="text-base sm:text-lg text-neutral-800 font-medium leading-relaxed mb-6 pb-4 border-b border-neutral-200">
                "{article.excerpt}"
              </div>
            )}

            {/* Full Content — supports HTML from MongoDB */}
            {article.content ? (
              <div
                className="prose prose-sm sm:prose max-w-none text-neutral-700 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <div className="text-neutral-500 text-sm font-normal italic">
                Full article content coming soon.
              </div>
            )}

            {/* Author Footer Card */}
            <div className="mt-10 p-5 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md shadow-xs">
              <div>
                <div className="text-base font-medium text-black">{clinicInfo.practitioner}</div>
                <div className="text-xs text-neutral-500">Ph.D. Vedic Astrology (MCVA) · M.A. Jyotirvigyan (Ranchi University)</div>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer shrink-0"
              >
                Book Astrological Session
              </button>
            </div>

            {/* Further Reading */}
            {otherArticles.length > 0 && (
              <div className="mt-10 pt-6 border-t border-neutral-200 space-y-4">
                <div className="text-xs font-medium uppercase tracking-wider text-black">Further Reading in Vedic Insights</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherArticles.map((oth) => (
                    <Link
                      key={oth._id || oth.id}
                      href={`/blogs/${oth.slug}`}
                      className="p-4 border border-neutral-200 bg-white hover:border-black rounded-md shadow-xs hover:shadow-md transition-all group block"
                    >
                      {oth.image?.url && (
                        <div className="aspect-[16/9] overflow-hidden rounded mb-2 bg-neutral-100">
                          <img src={oth.image.url} alt={oth.image.alt || oth.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <h3 className="text-sm font-medium text-black group-hover:underline leading-snug">{oth.title}</h3>
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

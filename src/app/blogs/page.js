"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { Clock, ArrowRight, Loader2, Search, BookOpen, Tag } from "lucide-react";

const CATEGORIES = ["All", "Jyotish", "Vastu Shastra", "Planetary Transits", "Gemology", "Muhurat", "Spiritual Remedies", "Panchang"];

function BlogCard({ article }) {
  const image = article.image?.url || "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80";
  const href = `/blogs/${article.slug}`;

  return (
    <article className="bg-white border border-neutral-200 flex flex-col justify-between hover:border-black rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 group overflow-hidden cursor-pointer">
      <Link href={href} className="block">
        <div className="relative overflow-hidden aspect-[16/10] bg-neutral-900 border-b border-neutral-100">
          <img
            src={image}
            alt={article.image?.alt || article.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          {article.category && (
            <span className="absolute top-2.5 left-2.5 text-[10px] bg-black text-white px-2.5 py-0.5 rounded-md font-medium uppercase tracking-wider">
              {article.category}
            </span>
          )}
          {article.isFeatured && (
            <span className="absolute top-2.5 right-2.5 text-[10px] bg-amber-600 text-white px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-2">
            <span>
              {article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-600" />
              <span>{article.readTime || "5 min read"}</span>
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-medium text-black leading-snug mb-2 group-hover:text-[#5C1625] transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 font-normal">
            {article.excerpt || article.metaDescription}
          </p>

          {/* Keyword Badges */}
          {Array.isArray(article.keywords) && article.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-neutral-100">
              {article.keywords.slice(0, 3).map((kw, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md font-normal"
                >
                  #{kw.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
      
      <div className="px-5 sm:px-6 pb-5 pt-0 mt-auto">
        <Link
          href={href}
          className="text-xs font-semibold text-black group-hover:underline flex items-center gap-1 cursor-pointer pt-2 border-t border-neutral-100"
        >
          <span>Read Full Article</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(CATEGORIES);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Fetch dynamic categories from MongoDB
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const names = ["All", ...data.map((c) => c.name)];
          setCategories(names);
        }
      })
      .catch(() => {});
  }, []);

  const fetchArticles = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All") {
      params.append("category", selectedCategory);
    }
    if (search.trim()) {
      params.append("search", search.trim());
    }

    fetch(`/api/blogs?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/50 text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Compact Clean Header with Heading on Left and Search on Right */}
        <section className="w-full py-6 sm:py-8 bg-white border-b border-neutral-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Small Heading in Left Side */}
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-black uppercase tracking-tight">
                  Blogs & Articles
                </h1>
                <p className="text-xs text-neutral-500 font-normal">
                  Astrological treatises, transits, and Vedic wisdom by Ach. Dr. Mohit Shah.
                </p>
              </div>

              {/* Search Bar in Right Side Only */}
              <form onSubmit={handleSearchSubmit} className="w-full sm:w-80 flex items-center">
                <div className="relative w-full flex items-center">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full text-xs border border-neutral-300 pr-20 pl-3 py-2 bg-neutral-50 text-black focus:outline-none focus:border-black focus:bg-white rounded-lg transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-3 py-1.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs font-medium rounded-md cursor-pointer flex items-center gap-1 shrink-0 transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Compact Category Navigation Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-4 border-t border-neutral-100 mt-4 pb-0.5 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium border rounded-md cursor-pointer transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#A86121] text-white border-[#A86121]"
                      : "bg-white text-neutral-600 border-neutral-200 hover:border-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs animate-pulse"
                  >
                    <div className="aspect-[16/10] bg-neutral-200/90 w-full"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-3 bg-neutral-200/60 rounded-xs w-1/3"></div>
                      <div className="h-4.5 bg-neutral-200/90 rounded-xs w-4/5"></div>
                      <div className="space-y-1.5 pt-1">
                        <div className="h-3 bg-neutral-200/70 rounded-xs w-full"></div>
                        <div className="h-3 bg-neutral-200/70 rounded-xs w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="bg-neutral-50 border border-dashed border-neutral-300 p-12 text-center max-w-xl mx-auto space-y-2.5 rounded-xl">
                <BookOpen className="w-8 h-8 text-neutral-300 mx-auto" />
                <h3 className="text-sm font-semibold text-black uppercase tracking-wider">No Published Articles Found</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  {search || selectedCategory !== "All"
                    ? "No articles matched your selected search criteria or category filter."
                    : "No blog articles published in database yet."}
                </p>
                {(search || selectedCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All");
                    }}
                    className="mt-2 px-3.5 py-1.5 bg-black text-white text-xs font-medium rounded-md hover:bg-neutral-800 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {articles.map((article) => (
                  <BlogCard key={article._id} article={article} />
                ))}
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

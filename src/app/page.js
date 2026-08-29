"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ConsultationCTA from "@/components/ConsultationCTA";
import ConsultationModal from "@/components/ConsultationModal";
import {
  Compass,
  TrendingUp,
  Home,
  Flame,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { serviceCategories, blogArticles, clinicInfo } from "@/data/siteContent";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = (name) => {
    setSelectedService(name || "Birth Chart Analysis");
    setBookingOpen(true);
  };

  const domainIcons = {
    astrology: Compass,
    "finance-career": TrendingUp,
    vastu: Home,
    "spiritual-practices": Flame,
  };

  const romanNumerals = ["01", "02", "03", "04"];

  const blogImages = {
    "navamsha-marriage": "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    "vastu-residential-principles": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "vimshottari-dasha-timing": "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => handleBookService()} />

      <main className="flex-1 w-full">

        {/* 1. Carousel — Full Width, Immediately After Navbar */}
        <section className="w-full bg-neutral-900">
          <HeroCarousel onOpenBooking={() => handleBookService()} />
        </section>

        {/* 2. Hero Intro — Heading, Description & CTAs */}
        <section className="w-full bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black tracking-tight leading-tight mb-3">
                  Ancient Wisdom. <br />
                  <span className="text-neutral-500 font-normal">Meaningful Guidance.</span>
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  A private astrological advisory and counselling practice in Ranchi by{" "}
                  <strong className="text-black font-medium">Ach. Dr. Mohit Shah</strong>. Classical Sanskrit mathematics, divisional chart synthesis, residential & commercial Vastu, and personalized remedial counselling without fatalistic fear.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => handleBookService()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-sm hover:shadow-md cursor-pointer"
                >
                  <span>Reserve Consultation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-300 text-black hover:bg-neutral-50 text-xs uppercase tracking-wider font-normal transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <span>All 15 Disciplines</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Academic Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs mt-6 pt-6 border-t border-neutral-200">
              <Link href="/about" className="flex items-center gap-2.5 bg-neutral-50 border border-neutral-200 p-3 rounded-md shadow-xs hover:border-black transition-all cursor-pointer group">
                <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md">
                  <GraduationCap className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <div className="font-medium text-black group-hover:underline">Ph.D. in Vedic Astrology</div>
                  <div className="text-[11px] text-neutral-500">MCVA, Udaypur, Rajasthan</div>
                </div>
              </Link>

              <Link href="/about" className="flex items-center gap-2.5 bg-neutral-50 border border-neutral-200 p-3 rounded-md shadow-xs hover:border-black transition-all cursor-pointer group">
                <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md">
                  <BookOpen className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <div className="font-medium text-black group-hover:underline">M.A. in Jyotirvigyan</div>
                  <div className="text-[11px] text-neutral-500">Ranchi University, Jharkhand</div>
                </div>
              </Link>

              <Link href="/contact" className="flex items-center gap-2.5 bg-neutral-50 border border-neutral-200 p-3 rounded-md shadow-xs hover:border-black transition-all cursor-pointer group sm:col-span-2 lg:col-span-1">
                <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                </div>
                <div>
                  <div className="font-medium text-black group-hover:underline">In-Person & Worldwide Online</div>
                  <div className="text-[11px] text-neutral-500">Opp. Harmu Ground, Ranchi Center</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Four Primary Consultation Domains */}
        <section className="w-full py-10 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-neutral-200">
              <h2 className="text-xl sm:text-2xl font-medium text-black">
                Guidance Rooted in Classical Jyotish
              </h2>
              <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-medium text-black hover:underline cursor-pointer">
                <span>View All 15 Services Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceCategories.map((category, index) => {
                const Icon = domainIcons[category.id] || Compass;
                return (
                  <div
                    key={category.id}
                    className="bg-white border border-neutral-200 p-4 sm:p-5 flex flex-col justify-between hover:border-black rounded-md shadow-xs hover:shadow-md transition-all duration-200 group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-neutral-100">
                        <span className="text-xs font-medium text-neutral-400">{romanNumerals[index]}</span>
                        <div className="w-7 h-7 border border-neutral-200 bg-neutral-50 flex items-center justify-center rounded-md">
                          <Icon className="w-3.5 h-3.5 text-black" />
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-medium text-black mb-1.5 leading-snug">
                        <Link href="/services" className="hover:underline cursor-pointer">{category.title}</Link>
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed mb-4 font-normal">
                        {category.shortDescription}
                      </p>

                      <div className="space-y-1.5 mb-4 pt-2.5 border-t border-neutral-100">
                        {category.services.slice(0, 3).map((srv) => (
                          <Link key={srv.id} href="/services" className="flex items-center gap-2 text-xs text-neutral-700 hover:text-black font-normal cursor-pointer group/link">
                            <span className="w-1 h-1 rounded-full bg-black shrink-0"></span>
                            <span className="group-hover/link:underline">{srv.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <Link href="/services" className="inline-flex items-center gap-1 text-xs font-medium text-black group-hover:underline cursor-pointer">
                        <span>Explore</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                      <button onClick={() => handleBookService()} className="text-xs text-neutral-500 hover:text-black cursor-pointer font-normal">
                        Book Slot
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Practitioner Spotlight */}
        <section className="w-full py-10 sm:py-14 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-4">
                <Link href="/about" className="block border border-neutral-200 bg-neutral-50 p-2.5 rounded-md shadow-sm hover:border-black transition-all cursor-pointer group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 rounded-md">
                    <img
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                      alt="Ach. Dr. Mohit Shah"
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                      <div className="text-base font-medium text-white mt-0.5 group-hover:underline">{clinicInfo.practitioner}</div>
                      <div className="text-[11px] text-neutral-300">Ph.D. Vedic Astrology · M.A. Jyotirvigyan</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-medium text-black leading-snug">
                  A Disciplined, Non-Fatalistic Approach to Vedic Jyotish
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  Astrological guidance at Vedic Jyotish Kendra is conducted not as commercial fortune-telling, but as a disciplined diagnostic consultation rooted in the <em>Brihat Parashara Hora Shastra</em>, <em>Jaimini Upadesha Sutras</em>, and classical <em>Sthapatya Veda</em>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200 p-3 rounded-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-black mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-black">Mathematical Exactitude</div>
                      <div className="text-neutral-500">Planetary degree balance & dasha periods.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-neutral-50 border border-neutral-200 p-3 rounded-md shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-black mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-black">Strict Confidentiality</div>
                      <div className="text-neutral-500">Private one-on-one sessions for personal clarity.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link href="/about" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-sm hover:shadow-md cursor-pointer">
                    <span>Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-300 text-black hover:bg-neutral-50 text-xs uppercase tracking-wider font-normal transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer">
                    <span>Center Location</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Latest Insights & Essays */}
        <section className="w-full py-10 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-neutral-200">
              <h2 className="text-xl sm:text-2xl font-medium text-black">Insights & Vedic Wisdom</h2>
              <Link href="/blogs" className="inline-flex items-center gap-1.5 text-xs font-medium text-black hover:underline cursor-pointer">
                <span>Read All Essays Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogArticles.map((article) => (
                <article key={article.id} className="bg-white border border-neutral-200 flex flex-col justify-between hover:border-black rounded-md shadow-xs hover:shadow-md transition-all duration-200 group overflow-hidden cursor-pointer">
                  <Link href={`/blogs/${article.slug}`} className="block">
                    <div className="relative overflow-hidden aspect-[16/10] bg-neutral-900">
                      <img
                        src={blogImages[article.id] || blogImages["navamsha-marriage"]}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-400"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1.5">
                        <Clock className="w-3 h-3 text-black" />
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="text-base font-medium text-black leading-snug mb-1.5 group-hover:underline">{article.title}</h3>
                      <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 font-normal">{article.excerpt}</p>
                    </div>
                  </Link>
                  <div className="px-4 sm:p-5 pb-4 pt-1.5 border-t border-neutral-100">
                    <Link href={`/blogs/${article.slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-black group-hover:underline cursor-pointer">
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Gemstones & Rudraksha Teaser */}
        <section className="w-full py-10 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="border border-neutral-200 bg-neutral-50 p-5 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 rounded-md shadow-xs">
              <div className="max-w-2xl">
                <h2 className="text-lg sm:text-xl font-medium text-black mb-2">
                  Laboratory-Certified Precious Gemstones & Sacred Rudraksha
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Natural, unheated Navratna gems and Himalayan Mukhi Rudrakshas evaluated for optical clarity and planetary resonance. Prescribed strictly per your Lagna chart.
                </p>
              </div>
              <Link href="/gemstones" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-sm hover:shadow-md cursor-pointer shrink-0">
                <span>Mineral Science</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Conversion CTA */}
        <ConsultationCTA onOpenBooking={() => handleBookService()} />
      </main>

      <Footer onOpenBooking={() => handleBookService()} />
      <ConsultationModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}

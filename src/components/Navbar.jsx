"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";
import { clinicInfo } from "@/data/siteContent";

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blogs" },
    { name: "Gemstones & Rudraksha", href: "/gemstones", hasBasket: true },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Header — sticky at top */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-neutral-300 ${
          isScrolled
            ? "shadow-[0_4px_16px_rgba(0,0,0,0.12)] bg-white/98"
            : "shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark with Rounded Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 cursor-pointer">
            <img
              src="/logo.jpeg"
              alt="Vedic Jyotish Kendra Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#D9CDBF] shadow-xs"
            />
            <span className="text-base sm:text-lg font-semibold tracking-tight text-black uppercase leading-tight font-serif">
              {clinicInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs text-neutral-600 font-normal">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 transition-colors py-1 whitespace-nowrap cursor-pointer ${
                    active
                      ? "text-black font-medium border-b border-black"
                      : "hover:text-black"
                  }`}
                >
                  {link.hasBasket && (
                    <ShoppingBag className="w-3.5 h-3.5 text-black" />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenBooking ? onOpenBooking() : window.location.href = "/contact#book"}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#A86121] hover:bg-[#91521a] text-white text-xs font-medium uppercase tracking-wider transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button - Borderless & larger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-1 text-black hover:text-[#A86121] transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay with smooth backdrop fade & slide-in drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.jpeg"
                  alt="Vedic Jyotish Kendra Logo"
                  className="w-7 h-7 rounded-full object-cover border border-[#D9CDBF]"
                />
                <div className="text-sm font-semibold text-black uppercase tracking-tight font-serif">
                  {clinicInfo.name}
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-md cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 text-xs py-2.5 px-2 rounded-md transition-colors cursor-pointer ${
                      active
                        ? "bg-[#A86121]/10 text-[#A86121] font-semibold"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-black font-medium"
                    }`}
                  >
                    {link.hasBasket && (
                      <ShoppingBag className="w-3.5 h-3.5 text-[#A86121] shrink-0" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              <Link
                href="/policy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-xs font-normal text-neutral-600 hover:text-black py-2 px-2 border-t border-neutral-100 mt-2 cursor-pointer"
              >
                Our Policy
              </Link>
            </nav>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenBooking) onOpenBooking();
                else window.location.href = "/contact#book";
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#A86121] hover:bg-[#91521a] text-white text-xs uppercase tracking-wider font-medium rounded-md shadow-xs cursor-pointer transition-all"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={`tel:${clinicInfo.phone}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-neutral-300 text-black text-xs uppercase tracking-wider font-normal hover:bg-neutral-50 rounded-md cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {clinicInfo.formattedPhone}</span>
            </a>
            <div className="text-[11px] text-center text-neutral-500 mt-1">
              H1-208, Opp. Harmu Ground, Ranchi
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
        className={`w-full sticky top-0 z-40 transition-all duration-200 bg-white border-b ${
          isScrolled
            ? "shadow-md border-neutral-200"
            : "shadow-none border-neutral-200"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Brand Wordmark */}
          <Link href="/" className="group flex flex-col shrink-0 cursor-pointer">
            <span className="text-base sm:text-lg font-medium tracking-tight text-black uppercase leading-tight">
              {clinicInfo.name}
            </span>
            <span className="text-[10px] text-neutral-500 font-normal tracking-wide">
              {clinicInfo.practitioner} · {clinicInfo.role}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs text-neutral-600 font-normal">
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
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-normal uppercase tracking-wider hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-1.5 text-black hover:bg-neutral-100 border border-neutral-200 rounded-md cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <div className="text-base font-medium text-black uppercase">
                    {clinicInfo.name}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {clinicInfo.practitioner}
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-1 text-black hover:bg-neutral-100 rounded-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1.5 mt-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 text-xs py-2 border-b border-neutral-100 cursor-pointer ${
                        active ? "text-black font-medium" : "text-neutral-600 hover:text-black font-normal"
                      }`}
                    >
                      {link.hasBasket && (
                        <ShoppingBag className="w-3.5 h-3.5 text-black shrink-0" />
                      )}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/policy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-xs font-normal text-neutral-600 hover:text-black py-2 border-b border-neutral-100 cursor-pointer"
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
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal rounded-md shadow-xs cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={`tel:${clinicInfo.phone}`}
                className="w-full flex items-center justify-center gap-1.5 py-2 border border-neutral-300 text-black text-xs uppercase tracking-wider font-normal hover:bg-neutral-50 rounded-md cursor-pointer"
              >
                <Phone className="w-3" />
                <span>Call {clinicInfo.formattedPhone}</span>
              </a>
              <div className="text-[11px] text-center text-neutral-500 mt-1">
                H1-208, Opp. Harmu Ground, Ranchi
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  BellRing,
  LayoutGrid,
  Inbox,
  FileText,
  Image,
  ShoppingBag,
  BarChart2,
  Search,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const navItems = [
  { label: "Hero Carousel", href: "/admin/carousel", icon: Images },
  { label: "Popup Banner", href: "/admin/popup", icon: BellRing },
  { label: "Services", href: "/admin/services", icon: LayoutGrid },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Enquiry Leads", href: "/admin/enquiries", icon: Inbox },
  { label: "Shop", href: "/admin/shop", icon: ShoppingBag, soon: true },
  { label: "Traffic", href: "/admin/traffic", icon: BarChart2, soon: true },
  { label: "SEO", href: "/admin/seo", icon: Search, soon: true },
];


export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin-login");
  };

  const handleNavClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ── Mobile Backdrop Overlay ────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar (Desktop Sticky + Mobile Drawer) ───────────────────────── */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 md:z-40 w-48 sm:w-50 shrink-0 bg-neutral-950 border-r border-neutral-800 flex flex-col h-screen overflow-y-auto transition-transform duration-200 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & Mobile Close Button */}
        <div className="px-3.5 py-3.5 border-b border-neutral-800 flex items-center justify-center relative">
          <Link href="/admin/carousel" onClick={handleNavClick} className="block text-center w-full">
            <div className="text-white text-[11px] font-semibold uppercase tracking-wider text-center">
              ADMIN PANEL
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items (Compact) */}
        <nav className="flex-1 px-1.5 py-2.5 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`flex items-center justify-between gap-1.5 px-2 py-1.5 text-[11px] transition-all cursor-pointer font-normal rounded-none ${
                  active
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.soon && (
                  <span className="text-[8px] bg-neutral-800 text-neutral-500 px-1 py-0.2 rounded-none font-mono">
                    Soon
                  </span>
                )}
                {active && !item.soon && (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-1.5 py-2 border-t border-neutral-800 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-2 py-1.5 text-[11px] text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-normal rounded-none"
          >
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            <span>View Website</span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-[11px] text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all cursor-pointer font-normal rounded-none text-left"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

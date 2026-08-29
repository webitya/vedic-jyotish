"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  LayoutGrid,
  Inbox,
  FileText,
  Image,
  ShoppingBag,
  BarChart2,
  Search,
  LogOut,
  Star,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    section: "Content",
    items: [
      { label: "Hero Carousel", href: "/admin/carousel", icon: Images },
      { label: "Services", href: "/admin/services", icon: LayoutGrid },
      { label: "Blogs", href: "/admin/blogs", icon: FileText },
      { label: "Gallery", href: "/admin/gallery", icon: Image },
    ],
  },
  {
    section: "CRM",
    items: [
      { label: "Enquiry Leads", href: "/admin/enquiries", icon: Inbox },
    ],
  },
  {
    section: "Coming Soon",
    items: [
      { label: "Shop", href: "/admin/shop", icon: ShoppingBag, soon: true },
      { label: "Traffic", href: "/admin/traffic", icon: BarChart2, soon: true },
      { label: "SEO", href: "/admin/seo", icon: Search, soon: true },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin-login");
  };

  return (
    <aside className="w-56 shrink-0 bg-neutral-950 border-r border-neutral-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-neutral-800">
        <Link href="/admin/carousel" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-white/5 border border-white/10 rounded-md flex items-center justify-center shrink-0">
            <Star className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-white text-xs font-medium leading-tight">VJK Admin</div>
            <div className="text-neutral-600 text-[10px] font-normal">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-4">
        {navItems.map((group) => (
          <div key={group.section}>
            <div className="text-[10px] font-normal text-neutral-600 uppercase tracking-widest px-2 mb-1.5">
              {group.section}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-xs transition-all cursor-pointer font-normal ${
                      active
                        ? "bg-white text-black"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.soon && (
                      <span className="text-[9px] bg-neutral-800 text-neutral-500 px-1.5 py-0.5 rounded font-normal">
                        Soon
                      </span>
                    )}
                    {active && !item.soon && (
                      <ChevronRight className="w-3 h-3 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-neutral-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-neutral-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-normal"
        >
          <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
          <span>View Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-red-500 hover:bg-red-950/40 transition-all cursor-pointer font-normal"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

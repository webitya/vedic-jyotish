"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((r) => {
        if (!r.ok) router.replace("/admin-login");
        else setChecking(false);
      })
      .catch(() => router.replace("/admin-login"));
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-neutral-950">
      
      {/* Mobile Top App Bar (Only visible on small screens) */}
      <header className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between z-30 shrink-0">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="p-1.5 text-neutral-300 hover:text-white cursor-pointer -ml-1.5"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-white text-xs font-semibold uppercase tracking-wider">
          ADMIN PANEL
        </span>
        <div className="w-5" /> {/* spacer */}
      </header>

      {/* Responsive Compact Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <main className="flex-1 bg-neutral-100 overflow-y-auto h-[calc(100vh-45px)] md:h-screen w-full">
        {children}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

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
    <div className="flex min-h-screen bg-neutral-950">
      <AdminSidebar />
      <main className="flex-1 bg-neutral-50 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}

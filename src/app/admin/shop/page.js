"use client";
import { ShoppingBag } from "lucide-react";

export default function ShopAdmin() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <h1 className="text-base font-medium text-black">Shop Dashboard</h1>
        <p className="text-xs text-neutral-500 font-normal mt-0.5">Manage gemstone and rudraksha product listings.</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-14 h-14 bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-neutral-400" />
          </div>
          <h2 className="text-sm font-medium text-black mb-1">Coming Soon</h2>
          <p className="text-xs text-neutral-500 font-normal max-w-xs">The shop management dashboard is under development. Product listings, inventory, and order management will be available here.</p>
        </div>
      </div>
    </div>
  );
}

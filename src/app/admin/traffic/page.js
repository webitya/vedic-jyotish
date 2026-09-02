"use client";

import { BarChart2, TrendingUp, Sparkles } from "lucide-react";

export default function TrafficAdminPage() {
  return (
    <div className="h-full min-h-[calc(100vh-50px)] flex flex-col justify-between font-sans text-neutral-900 w-full bg-neutral-100">
      
      {/* Header */}
      <div className="bg-white border-b border-neutral-300 px-6 py-3.5 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
            Traffic & Visitor Analytics
          </h1>
          <p className="text-[11px] text-neutral-500 font-normal">
            Website visitors, referral channels, page views, and appointment conversion metrics.
          </p>
        </div>
        <span className="text-[10px] bg-neutral-100 text-neutral-600 border border-neutral-300 px-2 py-0.5 font-mono uppercase font-semibold">
          Analytics Pipeline
        </span>
      </div>

      {/* Centered Coming Soon Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-neutral-300 p-8 max-w-md w-full text-center space-y-3.5 shadow-xs rounded-none">
          <div className="w-12 h-12 bg-neutral-100 border border-neutral-300 flex items-center justify-center mx-auto text-black rounded-none">
            <BarChart2 className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-black uppercase tracking-wider">
              Analytics Module In Integration
            </h2>
            <p className="text-xs text-neutral-500 font-normal leading-relaxed">
              Google Analytics 4 & privacy-focused visitor telemetry tracking will stream real-time consultation traffic directly onto this dashboard.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-50 border border-neutral-200 text-[10px] text-neutral-600 font-mono">
            <TrendingUp className="w-3 h-3 text-black" />
            <span>Telemetry Dashboard In Progress</span>
          </div>
        </div>
      </div>

    </div>
  );
}

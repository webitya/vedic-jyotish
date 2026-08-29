"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { policies } from "@/data/siteContent";

export default function PolicyModal({ isOpen, onClose, initialTab = "consultation" }) {
  const [activeTab, setActiveTab] = useState(initialTab || "consultation");

  if (!isOpen) return null;

  const currentPolicy = policies.find((p) => p.id === activeTab) || policies[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#191B20]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] border border-[#B88E4B] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 my-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close policies modal"
          className="absolute top-6 right-6 w-8 h-8 bg-[#191B20] text-white flex items-center justify-center hover:bg-[#5C1625] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          {/* Header */}
          <div className="mb-6 pb-5 border-b border-[#E6DED2]">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#5C1625] uppercase">
              Vedic Jyotish Kendra · Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2228] font-normal mt-1 leading-tight">
              Policies & Ethical Framework
            </h2>
            <p className="text-xs sm:text-sm text-[#626773] mt-1">
              Transparent terms governing consultations, client confidentiality, and remedial counsel under Ach. Dr. Mohit Shah.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E6DED2] mb-6">
            {policies.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === p.id
                    ? "bg-[#5C1625] text-white"
                    : "bg-[#F4EFE6] text-[#1F2228] hover:bg-[#EAE2D5]"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Active Content */}
          <div className="space-y-4">
            <div>
              <h3 className="font-serif text-2xl text-[#1F2228] font-normal">
                {currentPolicy.title}
              </h3>
              <p className="text-xs text-[#626773] mt-0.5">
                {currentPolicy.description}
              </p>
            </div>

            <div className="bg-[#F4EFE6] border border-[#E6DED2] p-6 space-y-3.5">
              {currentPolicy.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#5C1625] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#2F333B] leading-relaxed font-normal">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#E6DED2] flex items-center justify-between text-xs text-[#626773]">
          <div>Practice Location: Harmu, Ranchi, Jharkhand</div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#191B20] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#5C1625] cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}

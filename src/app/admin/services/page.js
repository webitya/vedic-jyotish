"use client";

import { useState } from "react";
import { serviceCategories } from "@/data/siteContent";
import { ChevronDown, ChevronRight } from "lucide-react";

function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-white border-b border-neutral-200 px-6 py-4">
      <h1 className="text-base font-medium text-black">{title}</h1>
      <p className="text-xs text-neutral-500 font-normal mt-0.5">{subtitle}</p>
    </div>
  );
}

export default function ServicesAdmin() {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Services Directory"
        subtitle="Overview of all 15 consultation disciplines across 4 categories. Edit services in siteContent.js to update the website."
      />

      <div className="flex-1 p-6 space-y-3">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-3 rounded-md font-normal">
          <strong className="font-medium">Note:</strong> Services are defined in <code className="bg-amber-100 px-1 rounded font-mono text-[11px]">src/data/siteContent.js</code>. Edit that file to update service names, descriptions, and pricing.
        </div>

        {serviceCategories.map((cat) => (
          <div key={cat.id} className="bg-white border border-neutral-200 rounded-md shadow-xs overflow-hidden">
            <button
              onClick={() => setOpenCategory(openCategory === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-black">{cat.title}</span>
                <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded font-normal">
                  {cat.services.length} services
                </span>
              </div>
              {openCategory === cat.id
                ? <ChevronDown className="w-4 h-4 text-neutral-400" />
                : <ChevronRight className="w-4 h-4 text-neutral-400" />
              }
            </button>

            {openCategory === cat.id && (
              <div className="border-t border-neutral-100">
                <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100">
                  <p className="text-xs text-neutral-600 font-normal">{cat.shortDescription}</p>
                </div>
                <div className="divide-y divide-neutral-100">
                  {cat.services.map((srv) => (
                    <div key={srv.id} className="px-4 py-2.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-medium text-black">{srv.name}</div>
                        {srv.description && (
                          <div className="text-[11px] text-neutral-500 font-normal mt-0.5 line-clamp-1">{srv.description}</div>
                        )}
                      </div>
                      <div className="shrink-0 text-xs text-neutral-600 font-normal">
                        {srv.duration && <span className="bg-neutral-100 px-2 py-0.5 rounded text-[11px]">{srv.duration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Inbox, Trash2, Phone, Calendar, User, MessageSquare, X } from "lucide-react";

function PageHeader({ title, subtitle, count }) {
  return (
    <div className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-base font-medium text-black">{title}</h1>
        <p className="text-xs text-neutral-500 font-normal mt-0.5">{subtitle}</p>
      </div>
      {count > 0 && (
        <span className="text-xs bg-black text-white px-2.5 py-1 rounded-md font-normal">
          {count} lead{count !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

function LeadModal({ lead, onClose }) {
  if (!lead) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-md shadow-xl max-w-md w-full p-5 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-400 hover:text-black cursor-pointer p-1 rounded">
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-medium text-black mb-4">Lead Details</h2>
        <div className="space-y-2.5 text-xs">
          {[
            ["Name", lead.name],
            ["Phone", lead.phone],
            ["Service", lead.service],
            ["Mode", lead.mode],
            ["Date of Birth", lead.dob || "—"],
            ["Time of Birth", lead.tob || "—"],
            ["Place of Birth", lead.pob || "—"],
            ["Notes", lead.notes || "—"],
            ["Submitted", new Date(lead.timestamp).toLocaleString("en-IN")],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-3 border-b border-neutral-100 pb-2">
              <span className="w-28 shrink-0 text-neutral-500 font-normal">{label}</span>
              <span className="text-black font-normal">{value}</span>
            </div>
          ))}
        </div>
        <a
          href={`tel:${lead.phone}`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-xs uppercase tracking-wider rounded-md cursor-pointer hover:bg-neutral-800 transition-colors font-normal"
        >
          <Phone className="w-3.5 h-3.5" /> Call Client
        </a>
      </div>
    </div>
  );
}

export default function EnquiriesAdmin() {
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_enquiries");
    if (stored) {
      try { setLeads(JSON.parse(stored).reverse()); } catch {}
    }
  }, []);

  const deleteLead = (index) => {
    const all = [...leads];
    all.splice(index, 1);
    setLeads(all);
    const reversed = [...all].reverse();
    localStorage.setItem("admin_enquiries", JSON.stringify(reversed));
  };

  const clearAll = () => {
    setLeads([]);
    localStorage.removeItem("admin_enquiries");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader
        title="Enquiry Leads"
        subtitle="Consultation requests submitted via the booking form on the website."
        count={leads.length}
      />

      <div className="flex-1 p-6">
        {leads.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 rounded-md p-12 text-center">
            <Inbox className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-400 font-normal">No enquiries yet.</p>
            <p className="text-xs text-neutral-400 font-normal mt-1">Submissions from the booking form will appear here.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-3">
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-md transition-colors cursor-pointer font-normal"
              >
                Clear All Leads
              </button>
            </div>
            <div className="space-y-2">
              {leads.map((lead, i) => (
                <div
                  key={i}
                  className="bg-white border border-neutral-200 rounded-md shadow-xs px-4 py-3 flex items-center justify-between gap-4 hover:border-neutral-300 transition-all"
                >
                  <div
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => setSelected(lead)}
                  >
                    <div className="w-7 h-7 bg-neutral-100 rounded-md flex items-center justify-center shrink-0">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-medium text-black">{lead.name}</span>
                        <span className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-normal">{lead.service}</span>
                        <span className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-normal">{lead.mode}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-neutral-500 font-normal">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(lead.timestamp).toLocaleDateString("en-IN")}</span>
                        {lead.notes && <span className="flex items-center gap-1 truncate max-w-xs"><MessageSquare className="w-3 h-3 shrink-0" />{lead.notes}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${lead.phone}`}
                      className="p-1.5 text-neutral-400 hover:text-black border border-neutral-200 hover:border-neutral-400 rounded-md transition-all cursor-pointer"
                      aria-label="Call"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => deleteLead(i)}
                      className="p-1.5 text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 rounded-md transition-all cursor-pointer"
                      aria-label="Delete lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <LeadModal lead={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

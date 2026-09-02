"use client";

import { useState, useEffect } from "react";
import {
  Inbox, Trash2, Phone, Calendar, User, MessageSquare, X,
  Copy, Check, Send, AlertTriangle, CheckCircle2, Search,
  Plus, Edit3, Clock, MapPin, Sparkles, Filter, ChevronDown,
  Loader2, ShieldAlert, ArrowUpRight, ExternalLink, FileText,
  UserCheck, AlertCircle
} from "lucide-react";

const STATUS_CONFIG = {
  new: {
    label: "New",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  converted: {
    label: "Converted",
    badge: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-600",
  },
  completed: {
    label: "Completed",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
  },
  fraud: {
    label: "Fraud / Spam",
    badge: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  archived: {
    label: "Archived",
    badge: "bg-neutral-100 text-neutral-600 border-neutral-200",
    dot: "bg-neutral-400",
  },
};

export default function EnquiriesAdminPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    service: "Birth Chart Analysis",
    mode: "In-Person (Ranchi Kendra)",
    dob: "",
    tob: "",
    pob: "",
    notes: "",
    priority: "normal",
    internalNotes: "",
  });
  const [savingLead, setSavingLead] = useState(false);

  // ── Fetch Leads from MongoDB ───────────────────────────────────────────────
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // ── Format Lead for WhatsApp & Copy ───────────────────────────────────────
  const getWhatsAppText = (lead) => {
    return `📋 *VEDIC JYOTISH KENDRA - CONSULTATION LEAD*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${lead.name}
📞 *Phone:* ${lead.phone}
${lead.email ? `📧 *Email:* ${lead.email}\n` : ""}${lead.gender ? `⚧ *Gender:* ${lead.gender}\n` : ""}📿 *Service:* ${lead.service || "General Consultation"}
📍 *Mode:* ${lead.mode || "In-Person"}
🌐 *Source Page:* ${lead.sourcePage || "/"}
${lead.sourceCard ? `📇 *Trigger Card:* ${lead.sourceCard}\n` : ""}${lead.dob ? `📅 *Date of Birth:* ${lead.dob}\n` : ""}${lead.tob ? `⏰ *Time of Birth:* ${lead.tob}\n` : ""}${lead.pob ? `🗺️ *Place of Birth:* ${lead.pob}\n` : ""}${lead.notes ? `📝 *Client Query:* ${lead.notes}\n` : ""}━━━━━━━━━━━━━━━━━━━━
*Status:* ${STATUS_CONFIG[lead.status]?.label || lead.status}`;
  };


  const copyLeadDetails = (lead) => {
    const text = getWhatsAppText(lead);
    navigator.clipboard.writeText(text);
    setCopiedId(lead._id);
    showToast("Lead details copied to clipboard ✓");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const openWhatsAppClient = (lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const text = `Namaste ${lead.name} ji,
This is regarding your consultation request at Vedic Jyotish Kendra with Ach. Dr. Mohit Shah for ${lead.service || "Vedic Consultation"}.

We would like to confirm your preferred time slot.`;
    const url = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // ── Update Lead Status / Internal Notes ────────────────────────────────────
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchLeads();
      showToast(`Status updated to ${STATUS_CONFIG[status]?.label || status} ✓`);
      if (selectedLead && selectedLead._id === id) {
        setSelectedLead((prev) => ({ ...prev, status }));
      }
    } catch {
      showToast("Failed to update status");
    }
  };

  const updateInternalNotes = async (id, internalNotes) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internalNotes }),
      });
      fetchLeads();
      showToast("Notes saved ✓");
    } catch {
      showToast("Failed to save notes");
    }
  };

  // ── Delete Lead ───────────────────────────────────────────────────────────
  const deleteLead = async (id, name) => {
    if (!confirm(`Are you sure you want to delete lead for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Lead deleted ✓");
      if (selectedLead?._id === id) setSelectedLead(null);
      fetchLeads();
    } catch {
      showToast("Failed to delete lead");
    }
  };

  // ── Create Lead Manually ──────────────────────────────────────────────────
  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLead.name.trim() || !newLead.phone.trim()) {
      alert("Name and Phone are required.");
      return;
    }

    setSavingLead(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
      if (!res.ok) throw new Error("Creation failed");
      setIsAddOpen(false);
      setNewLead({
        name: "",
        phone: "",
        service: "Birth Chart Analysis",
        mode: "In-Person (Ranchi Kendra)",
        dob: "",
        tob: "",
        pob: "",
        notes: "",
        priority: "normal",
        internalNotes: "",
      });
      showToast("New lead added ✓");
      fetchLeads();
    } catch (err) {
      alert("Failed to create lead: " + err.message);
    } finally {
      setSavingLead(false);
    }
  };

  // ── Stats Counters ────────────────────────────────────────────────────────
  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
    completed: leads.filter((l) => l.status === "completed").length,
    fraud: leads.filter((l) => l.status === "fraud").length,
  };

  // ── Filtered Leads ────────────────────────────────────────────────────────
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = filterStatus === "all" || l.status === filterStatus;
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.service && l.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.pob && l.pob.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.notes && l.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col font-sans text-neutral-900 w-full">
      
      {/* ── Compact Header & Pipeline Counters ──────────────────────────────── */}
      <div className="bg-white border-b border-neutral-300 px-4 sm:px-6 py-3.5 space-y-3 sticky top-0 z-30 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-black uppercase tracking-wider">
                Enquiry Leads & CRM
              </h1>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 font-mono">
                {counts.all} Total
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-normal">
              Manage client appointments, lead pipeline, follow-ups, and WhatsApp communications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* Pipeline Status Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {[
            { id: "all", label: "All Leads", count: counts.all },
            { id: "new", label: "New (Unread)", count: counts.new, color: "text-blue-700 bg-blue-50 border-blue-200" },
            { id: "contacted", label: "Contacted", count: counts.contacted, color: "text-amber-700 bg-amber-50 border-amber-200" },
            { id: "converted", label: "Converted", count: counts.converted, color: "text-green-700 bg-green-50 border-green-200" },
            { id: "completed", label: "Completed", count: counts.completed, color: "text-purple-700 bg-purple-50 border-purple-200" },
            { id: "fraud", label: "Fraud / Spam", count: counts.fraud, color: "text-red-700 bg-red-50 border-red-200" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterStatus(tab.id)}
              className={`px-2.5 py-1 text-[11px] font-medium border rounded-none cursor-pointer transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[9px] px-1 py-0.2 rounded-none font-semibold ${
                  filterStatus === tab.id
                    ? "bg-neutral-800 text-white"
                    : tab.color || "bg-neutral-100 text-neutral-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Workspace Body ───────────────────────────────────────────────── */}
      <div className="flex-1 p-4 sm:p-5 space-y-3.5 w-full">
        
        {/* Search Bar */}
        <div className="bg-white border border-neutral-300 p-2.5 shadow-xs rounded-none flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by client name, phone number, consultation service, city, or query notes..."
            className="w-full text-xs focus:outline-none text-black font-normal placeholder-neutral-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs text-neutral-400 hover:text-black cursor-pointer px-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="bg-white border border-neutral-300 p-16 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
            <span className="text-xs text-neutral-500 font-medium">Loading consultation leads...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 p-16 text-center space-y-2.5">
            <Inbox className="w-8 h-8 text-neutral-300 mx-auto" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black">No Leads Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No consultation requests matching the selected filter.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredLeads.map((lead) => {
              const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
              return (
                <div
                  key={lead._id}
                  className={`bg-white border shadow-xs rounded-none p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 transition-all ${
                    lead.status === "new"
                      ? "border-blue-300 hover:border-blue-500 bg-blue-50/20"
                      : lead.status === "fraud"
                      ? "border-red-200 bg-red-50/20 opacity-80"
                      : "border-neutral-300 hover:border-black"
                  }`}
                >
                  {/* Left: Client Info & Birth Details */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-black hover:underline">
                        {lead.name}
                      </span>

                      {/* Status Badge */}
                      <span
                        className={`text-[9px] px-1.5 py-0.2 border font-medium uppercase tracking-wider ${statusInfo.badge}`}
                      >
                        {statusInfo.label}
                      </span>

                      {/* Service Tag */}
                      <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.2 border border-neutral-200 font-medium">
                        {lead.service}
                      </span>

                      {/* Mode */}
                      <span className="text-[10px] text-neutral-500 font-normal">
                        ({lead.mode})
                      </span>

                      {lead.priority === "high" && (
                        <span className="text-[9px] bg-red-100 text-red-700 px-1 py-0.2 font-semibold">
                          HIGH PRIORITY
                        </span>
                      )}
                    </div>

                    {/* Contact, Source Page & Date Info */}
                    <div className="flex items-center gap-3 text-[11px] text-neutral-600 flex-wrap">
                      <span className="font-mono font-medium text-black flex items-center gap-1">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        {lead.phone}
                      </span>

                      {/* Source Page & Card Trigger */}
                      <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.2 border border-neutral-200 font-mono flex items-center gap-1">
                        <span>From:</span>
                        <span className="font-semibold text-black">{lead.sourcePage || "/"}</span>
                        {lead.sourceCard && <span className="text-neutral-500">({lead.sourceCard})</span>}
                      </span>

                      {(lead.dob || lead.tob || lead.pob) && (
                        <span className="text-neutral-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          <span>
                            Kundali: {[lead.dob, lead.tob, lead.pob].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                      )}

                      <span className="text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(lead.createdAt || Date.now()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
                      </span>
                    </div>

                    {/* Client Notes Preview */}
                    {lead.notes && (
                      <p className="text-[11px] text-neutral-600 line-clamp-1 italic mt-1 bg-neutral-50 p-1 border border-neutral-200">
                        &ldquo;{lead.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Right: Quick Action Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100 flex-wrap">
                    
                    {/* Status Dropdown Selector */}
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                      className="text-xs border border-neutral-300 p-1 rounded-none bg-white focus:outline-none focus:border-black text-black font-medium"
                    >
                      <option value="new">Mark New</option>
                      <option value="contacted">Mark Contacted</option>
                      <option value="converted">Mark Converted ✓</option>
                      <option value="completed">Mark Completed</option>
                      <option value="fraud">Mark Fraud / Spam ✕</option>
                      <option value="archived">Archive</option>
                    </select>

                    {/* Copy Lead Button for WhatsApp */}
                    <button
                      type="button"
                      onClick={() => copyLeadDetails(lead)}
                      title="Copy formatted lead details"
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-neutral-300 hover:border-black bg-white text-neutral-800 rounded-none cursor-pointer font-medium transition-colors"
                    >
                      {copiedId === lead._id ? (
                        <>
                          <Check className="w-3 h-3 text-green-600" />
                          <span className="text-green-600 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-neutral-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    {/* WhatsApp Button */}
                    <button
                      type="button"
                      onClick={() => openWhatsAppClient(lead)}
                      title="Message client on WhatsApp"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-green-700 hover:bg-green-800 text-white rounded-none cursor-pointer font-medium shadow-xs transition-colors"
                    >
                      <Send className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </button>

                    {/* Call Button */}
                    <a
                      href={`tel:${lead.phone}`}
                      title="Direct phone call"
                      className="p-1 text-neutral-600 hover:text-black border border-neutral-300 hover:border-black rounded-none transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>

                    {/* View Details Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedLead(lead)}
                      title="View full lead record"
                      className="p-1 text-neutral-600 hover:text-black border border-neutral-300 hover:border-black rounded-none cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Lead */}
                    <button
                      type="button"
                      onClick={() => deleteLead(lead._id, lead.name)}
                      title="Delete lead"
                      className="p-1 text-red-500 hover:text-red-700 border border-neutral-300 hover:border-red-500 rounded-none cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ── Lead Detail / Astrological Record Drawer Modal ───────────────────── */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white border border-neutral-300 w-full max-w-lg shadow-2xl rounded-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-black">
                  Lead Record & Kundali Details
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 border font-medium ${
                    STATUS_CONFIG[selectedLead.status]?.badge || ""
                  }`}
                >
                  {STATUS_CONFIG[selectedLead.status]?.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3.5 max-h-[80vh] overflow-y-auto">
              
              {/* Client Core Information */}
              <div className="bg-neutral-50 border border-neutral-200 p-3 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Client Name</span>
                    <span className="font-semibold text-black">{selectedLead.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Phone Number</span>
                    <span className="font-mono font-medium text-black">{selectedLead.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Email Address</span>
                    <span className="font-mono text-neutral-700">{selectedLead.email || "—"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Gender</span>
                    <span className="font-medium text-black">{selectedLead.gender || "—"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Consultation Service</span>
                    <span className="font-medium text-neutral-800">{selectedLead.service}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Consultation Mode</span>
                    <span className="font-medium text-neutral-800">{selectedLead.mode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Enquiry Source Page</span>
                    <a
                      href={selectedLead.sourcePage || "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>{selectedLead.sourcePage || "/"}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Trigger Card / Origin</span>
                    <span className="text-[11px] text-neutral-700 font-medium">{selectedLead.sourceCard || "Direct Booking Modal"}</span>
                  </div>
                </div>
              </div>

              {/* Astrological Parameters */}
              <div className="border border-neutral-200 p-3 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#7C2D37] font-semibold block border-b border-neutral-200 pb-1">
                  Astrological Kundali Birth Parameters
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Date of Birth</span>
                    <span className="font-medium text-black">{selectedLead.dob || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Time of Birth</span>
                    <span className="font-medium text-black">{selectedLead.tob || "Not Provided"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Place of Birth</span>
                    <span className="font-medium text-black">{selectedLead.pob || "Not Provided"}</span>
                  </div>
                </div>
              </div>


              {/* Client Query Notes */}
              {selectedLead.notes && (
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                    Client Initial Query
                  </label>
                  <p className="text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 p-2.5 leading-relaxed">
                    {selectedLead.notes}
                  </p>
                </div>
              )}

              {/* Status Update Quick Bar */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                  Update Lead Status
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateStatus(selectedLead._id, key)}
                      className={`px-2 py-1 text-[11px] font-medium border rounded-none cursor-pointer transition-colors ${
                        selectedLead.status === key
                          ? "bg-black text-white border-black"
                          : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100"
                      }`}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                  Internal Staff Notes & Slot Time
                </label>
                <textarea
                  defaultValue={selectedLead.internalNotes || ""}
                  onBlur={(e) => updateInternalNotes(selectedLead._id, e.target.value)}
                  placeholder="e.g. Paid via UPI. Booked slot for 12th Aug 4:00 PM..."
                  rows={2}
                  className="w-full text-xs border border-neutral-300 p-2 rounded-none focus:outline-none focus:border-black text-black resize-none"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => copyLeadDetails(selectedLead)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs border border-neutral-300 hover:border-black bg-white text-neutral-800 rounded-none cursor-pointer font-medium"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy for WhatsApp</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openWhatsAppClient(selectedLead)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-green-700 hover:bg-green-800 text-white rounded-none cursor-pointer font-medium"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs bg-black hover:bg-neutral-800 text-white rounded-none cursor-pointer font-medium"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── Add New Lead Manually Modal ─────────────────────────────────────── */}
      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsAddOpen(false)}
        >
          <div
            className="bg-white border border-neutral-300 w-full max-w-md shadow-2xl rounded-none overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <span className="text-xs font-semibold uppercase tracking-wider text-black">
                Add New Consultation Lead
              </span>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Service
                  </label>
                  <input
                    type="text"
                    value={newLead.service}
                    onChange={(e) => setNewLead({ ...newLead, service: e.target.value })}
                    placeholder="Birth Chart Analysis"
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Mode
                  </label>
                  <select
                    value={newLead.mode}
                    onChange={(e) => setNewLead({ ...newLead, mode: e.target.value })}
                    className="w-full text-xs border border-neutral-300 p-1.5 rounded-none bg-white focus:outline-none focus:border-black text-black"
                  >
                    <option value="In-Person (Ranchi Kendra)">In-Person (Ranchi Kendra)</option>
                    <option value="Online Video Session">Online Video Session</option>
                    <option value="Phone Consultation">Phone Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={newLead.dob}
                    onChange={(e) => setNewLead({ ...newLead, dob: e.target.value })}
                    placeholder="DD-MM-YYYY"
                    className="w-full text-xs border border-neutral-300 p-1 rounded-none text-black"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Time of Birth
                  </label>
                  <input
                    type="text"
                    value={newLead.tob}
                    onChange={(e) => setNewLead({ ...newLead, tob: e.target.value })}
                    placeholder="HH:MM AM"
                    className="w-full text-xs border border-neutral-300 p-1 rounded-none text-black"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    value={newLead.pob}
                    onChange={(e) => setNewLead({ ...newLead, pob: e.target.value })}
                    placeholder="City"
                    className="w-full text-xs border border-neutral-300 p-1 rounded-none text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium block mb-1">
                  Client Notes / Query
                </label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Queries or notes..."
                  rows={2}
                  className="w-full text-xs border border-neutral-300 p-1.5 rounded-none focus:outline-none focus:border-black text-black resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-1 text-xs border border-neutral-300 hover:bg-neutral-100 rounded-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLead}
                  className="px-4 py-1 text-xs bg-black text-white hover:bg-neutral-800 rounded-none cursor-pointer font-medium disabled:opacity-50"
                >
                  {savingLead ? "Saving..." : "Create Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Toast Notification ────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] bg-black text-white text-xs px-3.5 py-2 rounded-none shadow-2xl flex items-center gap-1.5 font-medium border border-neutral-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

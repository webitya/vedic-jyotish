"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  User,
  ChevronDown,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { allServices, clinicInfo } from "@/data/siteContent";

export default function ConsultationModal({ isOpen, onClose, initialService = "Birth Chart Analysis" }) {
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    service: initialService,
    mode: "In-Person (Ranchi Kendra)",
    sourcePage: "",
    sourceCard: "",
    dob: "",
    tobHours: "10",
    tobMinutes: "30",
    tobAmPm: "AM",
    pob: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: initialService || prev.service || "Birth Chart Analysis",
        sourcePage: pathname || (typeof window !== "undefined" ? window.location.pathname : "/"),
        sourceCard: initialService ? `${initialService} Card / Modal` : "Header Booking Trigger",
      }));
    }
  }, [isOpen, initialService, pathname]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleAmPmSelect = (amPm) => {
    setFormData((prev) => ({ ...prev, tobAmPm: amPm }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formattedTob = `${formData.tobHours || "10"}:${formData.tobMinutes || "30"} ${formData.tobAmPm}`;

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      gender: formData.gender,
      service: formData.service,
      mode: formData.mode,
      dob: formData.dob,
      tob: formattedTob,
      pob: formData.pob,
      notes: formData.notes,
      sourcePage: pathname || (typeof window !== "undefined" ? window.location.pathname : "/"),
      sourceCard: formData.sourceCard || `${formData.service} Card`,
    };

    // Save lead to MongoDB Atlas
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to post lead to database:", err);
    } finally {
      setSubmitting(false);
    }

    const text = `Namaste Ach. Dr. Mohit Shah ji,
I would like to book a consultation at Vedic Jyotish Kendra.

*Client Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}
${formData.email ? `- Email: ${formData.email}\n` : ""}- Gender: ${formData.gender}
- Service Focus: ${formData.service}
- Preferred Mode: ${formData.mode}
${formData.dob ? `- Date of Birth: ${formData.dob}\n` : ""}- Time of Birth: ${formattedTob}
${formData.pob ? `- Place of Birth: ${formData.pob}\n` : ""}${formData.notes ? `- Queries / Notes: ${formData.notes}\n` : ""}
Please let me know the available consultation slot.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-[#D9CDBF] max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl rounded-lg overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header: Warm Brown with clean white typography */}
        <div className="px-5 py-3 bg-[#6E3B1E] text-white flex items-center justify-between border-b border-[#854825] shrink-0">
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase text-white font-serif">
              Book Vedic Consultation
            </h2>
            <p className="text-[11px] text-[#F3ECE4] font-normal">
              Ach. Dr. Mohit Shah · Ph.D. Vedic Astrology (MCVA)
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="w-7 h-7 bg-white/15 hover:bg-white/30 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-4.5 overflow-y-auto flex-1 space-y-3.5">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 font-serif">
                Appointment Request Submitted
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-normal">
                Your birth details have been recorded and sent to our official booking desk (<strong>+91 70044 33677</strong>). We will confirm your consultation slot shortly.
              </p>
              <div className="pt-3 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 bg-[#6E3B1E] text-white text-xs font-medium rounded-md hover:bg-[#582f17] cursor-pointer shadow-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {/* Row 1: Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Gender Pill Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-0.5 border border-neutral-300 rounded-md">
                    {["Male", "Female", "Other"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => handleGenderSelect(g)}
                        className={`py-1 text-[11px] font-medium transition-colors cursor-pointer rounded-sm text-center ${
                          formData.gender === g
                            ? "bg-[#6E3B1E] text-white shadow-xs"
                            : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/70"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 3: Custom Dropdowns for Discipline & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Consultation Discipline
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full appearance-none px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
                    >
                      {allServices.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="General Vedic Guidance">General Vedic Guidance</option>
                      <option value="Gemstone Recommendation">Gemstone Recommendation</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Consultation Mode
                  </label>
                  <div className="relative">
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleChange}
                      className="w-full appearance-none px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
                    >
                      <option value="In-Person (Ranchi Kendra)">
                        In-Person (Ranchi Kendra)
                      </option>
                      <option value="Online Video Consultation">
                        Online Video (Meet / WhatsApp)
                      </option>
                      <option value="Telephonic Consultation">
                        Telephonic Consultation
                      </option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Birth Chart Details Panel */}
              <div className="bg-[#FAF7F2] p-2.5 sm:p-3 border border-[#E6DDCE] rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E3B1E]">
                    Birth Details (For Kundali &amp; Horary)
                  </span>
                  <span className="text-[9px] text-neutral-500">Optional if unknown</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Date of Birth */}
                  <div>
                    <label className="block text-[10px] font-medium text-neutral-700 mb-0.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md cursor-pointer"
                    />
                  </div>

                  {/* Time of Birth + AM/PM Tab */}
                  <div>
                    <label className="block text-[10px] font-medium text-neutral-700 mb-0.5">
                      Time of Birth &amp; Period
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        name="tobHours"
                        placeholder="HH"
                        maxLength={2}
                        value={formData.tobHours}
                        onChange={handleChange}
                        className="w-10 px-1 py-1 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                      />
                      <span className="self-center font-bold text-neutral-400">:</span>
                      <input
                        type="text"
                        name="tobMinutes"
                        placeholder="MM"
                        maxLength={2}
                        value={formData.tobMinutes}
                        onChange={handleChange}
                        className="w-10 px-1 py-1 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                      />
                      <div className="flex bg-neutral-200/90 p-0.5 border border-neutral-300 rounded-md shrink-0">
                        {["AM", "PM"].map((period) => (
                          <button
                            key={period}
                            type="button"
                            onClick={() => handleAmPmSelect(period)}
                            className={`px-1.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer rounded-xs ${
                              formData.tobAmPm === period
                                ? "bg-[#6E3B1E] text-white"
                                : "text-neutral-700 hover:text-black"
                            }`}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label className="block text-[10px] font-medium text-neutral-700 mb-0.5">
                      Place of Birth
                    </label>
                    <div className="relative">
                      <MapPin className="w-3 h-3 text-neutral-400 absolute left-2 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="pob"
                        value={formData.pob}
                        onChange={handleChange}
                        placeholder="City, State"
                        className="w-full pl-6 pr-2 py-1 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific Questions / Notes */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Specific Query / Concern (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Consultation topic, specific questions or life areas to focus on..."
                  className="w-full px-3 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md resize-none"
                />
              </div>


              {/* Modal Action Buttons: Submit & Bottom Close */}
              <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:flex-1 py-2.5 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-md shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50 text-center"
                >
                  Book Now
                </button>

                {/* Bottom Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-medium cursor-pointer rounded-md transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Direct helpline footer note */}
              <div className="text-[10px] text-center text-neutral-500 pt-0.5">
                Chamber Helpline: <strong className="text-neutral-800">+91 70044 33677</strong> · Coordinator: <strong className="text-neutral-800">+91 88603 59754</strong>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


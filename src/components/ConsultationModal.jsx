"use client";

import { useState } from "react";
import { X, MessageSquare, CheckCircle } from "lucide-react";
import { clinicInfo, allServices } from "@/data/siteContent";

export default function ConsultationModal({ isOpen, onClose, initialService = "Birth Chart Analysis" }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: initialService,
    mode: "In-Person (Ranchi Kendra)",
    dob: "",
    tob: "",
    pob: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Namaste Ach. Dr. Mohit Shah ji,
I would like to book a consultation at Vedic Jyotish Kendra.

*Client Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}
- Service Focus: ${formData.service}
- Preferred Mode: ${formData.mode}
${formData.dob ? `- Date of Birth: ${formData.dob}` : ""}
${formData.tob ? `- Time of Birth: ${formData.tob}` : ""}
${formData.pob ? `- Place of Birth: ${formData.pob}` : ""}
${formData.notes ? `- Queries / Notes: ${formData.notes}` : ""}

Please let me know the available time slots.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white border border-neutral-200 max-w-lg w-full p-5 sm:p-6 shadow-xl overflow-hidden rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close booking modal"
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer rounded-md"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-black mx-auto" />
            <h3 className="text-xl font-medium text-black">
              Appointment Request Sent
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-normal">
              Your details have been forwarded to our official WhatsApp line (+91 70044 33677). Coordinator Aditya Sinha or Acharya Ji will confirm your consultation slot shortly.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 rounded-md shadow-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header - Compact */}
            <div className="mb-4 pb-3 border-b border-neutral-200">
              <h2 className="text-xl font-medium text-black">
                Consult with Ach. Dr. Mohit Shah
              </h2>
              <p className="text-xs text-neutral-500 font-normal">
                Ph.D. Vedic Astrology (MCVA) · M.A. Jyotirvigyan (Ranchi University)
              </p>
            </div>

            {/* Form - Compact */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-black mb-1">
                    Your Full Name <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-1.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-black mb-1">
                    Phone Number <span className="text-neutral-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-1.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-black mb-1">
                    Consultation Discipline
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                  >
                    {allServices.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="General Vedic Guidance">General Vedic Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-black mb-1">
                    Consultation Mode
                  </label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
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
                </div>
              </div>

              {/* Birth Details Box - Compact */}
              <div className="bg-neutral-50 p-2.5 border border-neutral-200 space-y-1.5 rounded-md shadow-2xs">
                <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-600">
                  Kundali Details (Optional if known)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Time of Birth</label>
                    <input
                      type="time"
                      name="tob"
                      value={formData.tob}
                      onChange={handleChange}
                      className="w-full px-2 py-1 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 mb-0.5">Place of Birth</label>
                    <input
                      type="text"
                      name="pob"
                      value={formData.pob}
                      onChange={handleChange}
                      placeholder="e.g. Ranchi"
                      className="w-full px-2 py-1 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-black mb-1">
                  Specific Questions / Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Mention any specific areas you wish to focus on..."
                  className="w-full px-3 py-1.5 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                ></textarea>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp Booking Line</span>
                </button>
              </div>

              <div className="text-[10px] text-center text-neutral-500">
                Direct: <strong>+91 70044 33677</strong> · Coordinator: <strong>+91 88603 59754</strong>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

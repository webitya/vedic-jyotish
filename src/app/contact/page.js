"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import { MapPin, Phone, Mail, Navigation, MessageSquare, CheckCircle } from "lucide-react";
import { clinicInfo, allServices } from "@/data/siteContent";

export default function LocationPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Birth Chart Analysis",
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
I would like to book an appointment at Vedic Jyotish Kendra.

*Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}
- Consultation Focus: ${formData.service}
- Mode: ${formData.mode}
${formData.dob ? `- Date of Birth: ${formData.dob}` : ""}
${formData.tob ? `- Time of Birth: ${formData.tob}` : ""}
${formData.pob ? `- Place of Birth: ${formData.pob}` : ""}
${formData.notes ? `- Notes / Questions: ${formData.notes}` : ""}

Kindly confirm slot availability.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800 w-full overflow-x-hidden">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full">
        {/* Header */}
        <section className="w-full py-8 sm:py-12 bg-neutral-50 border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-tight mb-3">
                Visit Vedic Jyotish Kendra in Ranchi
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Located on Harmu Main Road opposite Harmu Ground, between Harmu Chowk and Shajanand Chowk. Consultations are available in-person by appointment and worldwide online.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Appointment Suite */}
        <section id="book" className="w-full py-8 sm:py-12 bg-white border-b border-neutral-200">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Direct Address & Map (Col 6) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Contact Box */}
                <div className="bg-neutral-50 border border-neutral-200 p-5 sm:p-6 space-y-4 rounded-md shadow-xs">
                  <h2 className="text-xl font-medium text-black">
                    Kendra Contact & Address
                  </h2>

                  <div className="space-y-3.5 text-xs">
                    {/* Address */}
                    <div className="flex items-start gap-3 pb-3 border-b border-neutral-200">
                      <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                        <MapPin className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-black">
                          {clinicInfo.address.line1}
                        </div>
                        <div className="text-neutral-500">
                          {clinicInfo.address.landmark}
                        </div>
                        <div className="text-neutral-500">
                          {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}
                        </div>
                      </div>
                    </div>

                    {/* Direct Line */}
                    <div className="flex items-start gap-3 pb-3 border-b border-neutral-200">
                      <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                        <Phone className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <a
                          href={`tel:${clinicInfo.phone}`}
                          className="text-lg font-medium text-black hover:underline transition-colors"
                        >
                          {clinicInfo.formattedPhone}
                        </a>
                        <div className="text-[11px] text-neutral-500">
                          Consultations by prior reservation
                        </div>
                      </div>
                    </div>

                    {/* Coordinator */}
                    <div className="flex items-start gap-3 pb-3 border-b border-neutral-200">
                      <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                        <Navigation className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <a
                          href={`tel:${clinicInfo.coordinator.phone}`}
                          className="text-xs font-medium text-black hover:underline"
                        >
                          {clinicInfo.coordinator.name} ({clinicInfo.coordinator.formattedPhone})
                        </a>
                        <div className="text-[11px] text-neutral-500">
                          Directions & scheduling confirmation
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 border border-neutral-200 bg-white flex items-center justify-center shrink-0 rounded-md shadow-2xs">
                        <Mail className="w-3.5 h-3.5 text-black" />
                      </div>
                      <div>
                        <a
                          href={`mailto:${clinicInfo.email}`}
                          className="text-xs font-normal text-black hover:underline break-all"
                        >
                          {clinicInfo.email}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Map Frame */}
                <div className="border border-neutral-200 bg-white p-3 rounded-md shadow-xs">
                  <div className="aspect-[16/10] max-h-[260px] w-full overflow-hidden border border-neutral-200 bg-neutral-900 rounded-md">
                    <iframe
                      title="Vedic Jyotish Kendra Ranchi Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.042638868263!2d85.30105647643629!3d23.3585848494275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1328c6e22d1%3A0x45b235eca8e42559!2sVedic%20Jyotish%20Kendra!5e1!3m2!1sen!2sin!4v1787998227549!5m2!1sen!2sin"
                      className="w-full h-full border-0 filter grayscale-15 contrast-105"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                  <div className="mt-2.5 px-1 text-xs text-neutral-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 font-normal">
                    <span>Harmu Road between Harmu Chowk & Shajanand Chowk</span>
                    <a
                      href="https://maps.google.com/?q=Vedic+Jyotish+Kendra+Ranchi"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black font-medium uppercase tracking-wider hover:underline"
                    >
                      Open Maps →
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: In-Page Appointment Form (Col 6) */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-neutral-200 p-5 sm:p-7 rounded-md shadow-sm">
                  
                  <div className="mb-4 pb-3 border-b border-neutral-200">
                    <h2 className="text-xl sm:text-2xl font-medium text-black">
                      Schedule an Appointment
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                      Direct consultation with Ach. Dr. Mohit Shah.
                    </p>
                  </div>

                  {submitted ? (
                    <div className="py-8 text-center space-y-3">
                      <CheckCircle className="w-10 h-10 text-black mx-auto" />
                      <h3 className="text-xl font-medium text-black">
                        Appointment Request Formatted
                      </h3>
                      <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-normal">
                        Your consultation details have been sent to our official WhatsApp line (+91 70044 33677).
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-black mb-1">
                            Full Name <span className="text-neutral-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
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
                            className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                          />
                        </div>
                      </div>

                      {/* Service & Mode */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-black mb-1">
                            Consultation Focus
                          </label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-2.5 py-2 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                          >
                            {allServices.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name} ({s.categoryTitle})
                              </option>
                            ))}
                            <option value="General Vedic Life Guidance">
                              General Vedic Life Guidance
                            </option>
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
                            className="w-full px-2.5 py-2 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
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

                      {/* Birth Details */}
                      <div className="bg-neutral-50 p-3 border border-neutral-200 space-y-1.5 rounded-md shadow-2xs">
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

                      {/* Notes */}
                      <div>
                        <label className="block text-[11px] font-medium text-black mb-1">
                          Questions / Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          rows={2}
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Briefly state your consultation focus..."
                          className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-black focus:outline-none focus:border-black rounded-md"
                        ></textarea>
                      </div>

                      {/* Action */}
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white text-xs uppercase tracking-wider font-normal hover:bg-neutral-800 transition-all rounded-md shadow-xs hover:shadow-sm cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Submit & Connect on WhatsApp</span>
                      </button>
                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

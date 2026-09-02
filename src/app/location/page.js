"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  MapPin, Phone, Mail, Navigation,
  CheckCircle, ArrowUpRight, User, ChevronDown
} from "lucide-react";
import { clinicInfo, allServices } from "@/data/siteContent";

export default function LocationPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    service: "Birth Chart Analysis",
    mode: "In-Person (Ranchi Kendra)",
    dob: "",
    tobHours: "10",
    tobMinutes: "30",
    tobAmPm: "AM",
    pob: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      sourcePage: "/location",
      sourceCard: "Location Page Booking Form",
    };

    // Save lead to MongoDB
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to post enquiry:", err);
    } finally {
      setSubmitting(false);
    }

    const text = `Namaste Ach. Dr. Mohit Shah ji,
I would like to book a consultation at Vedic Jyotish Kendra (Ranchi).

*Client Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}
${formData.email ? `- Email: ${formData.email}\n` : ""}- Gender: ${formData.gender}
- Service Focus: ${formData.service}
- Preferred Mode: ${formData.mode}
${formData.dob ? `- Date of Birth: ${formData.dob}\n` : ""}- Time of Birth: ${formattedTob}
${formData.pob ? `- Place of Birth: ${formData.pob}\n` : ""}${formData.notes ? `- Queries / Notes: ${formData.notes}\n` : ""}
Kindly confirm slot availability.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 w-full py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 tracking-tight font-serif">
              Visit Vedic Jyotish Kendra in Ranchi
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Located on Harmu Main Road opposite Harmu Ground, between Harmu Chowk and Shajanand Chowk. Consultations are available in-person by appointment and worldwide online.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Direct Address & Map (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Contact Box */}
              <div className="bg-white border border-[#E6DDCE] p-4 sm:p-5 rounded-lg shadow-2xs space-y-3.5">
                <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider border-b border-[#E6DDCE] pb-2 font-serif">
                  Kendra Contact &amp; Address
                </h2>

                <div className="space-y-3 text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 rounded-md text-[#6E3B1E] mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {clinicInfo.address.line1}
                      </div>
                      <div className="text-neutral-600">
                        {clinicInfo.address.landmark}
                      </div>
                      <div className="text-neutral-500 text-[11px]">
                        {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-2.5 pt-1 border-t border-neutral-100">
                    <div className="w-7 h-7 bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 rounded-md text-[#6E3B1E]">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <a
                        href={`tel:${clinicInfo.phone}`}
                        className="font-semibold text-neutral-900 hover:text-[#6E3B1E] transition-colors"
                      >
                        {clinicInfo.formattedPhone}
                      </a>
                      <div className="text-neutral-500 text-[11px]">
                        Prior booking recommended
                      </div>
                    </div>
                  </div>

                  {/* Coordinator */}
                  <div className="flex items-start gap-2.5 pt-1 border-t border-neutral-100">
                    <div className="w-7 h-7 bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 rounded-md text-[#6E3B1E]">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <a
                        href={`tel:${clinicInfo.coordinator.phone}`}
                        className="font-medium text-neutral-900 hover:text-[#6E3B1E] transition-colors"
                      >
                        {clinicInfo.coordinator.name}: {clinicInfo.coordinator.formattedPhone}
                      </a>
                      <div className="text-neutral-500 text-[11px]">
                        Directions &amp; Kendra navigation
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-2.5 pt-1 border-t border-neutral-100">
                    <div className="w-7 h-7 bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 rounded-md text-[#6E3B1E]">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <a
                        href={`mailto:${clinicInfo.email}`}
                        className="font-normal text-neutral-900 hover:text-[#6E3B1E] transition-colors break-all"
                      >
                        {clinicInfo.email}
                      </a>
                      <div className="text-neutral-500 text-[11px]">
                        Official Kendra correspondence
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white border border-[#E6DDCE] p-3 rounded-lg shadow-2xs">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-md border border-[#E6DDCE]">
                  <iframe
                    title="Vedic Jyotish Kendra Ranchi Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.042638868263!2d85.30105647643629!3d23.3585848494275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1328c6e22d1%3A0x45b235eca8e42559!2sVedic%20Jyotish%20Kendra!5e1!3m2!1sen!2sin!4v1787998227549!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="mt-2 px-1 flex items-center justify-between text-[11px] text-neutral-600">
                  <span>Opp. Harmu Ground, Ranchi</span>
                  <a
                    href="https://maps.google.com/?q=Vedic+Jyotish+Kendra+Ranchi"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#6E3B1E] font-semibold hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Appointment Form (Col 7) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E6DDCE] p-5 sm:p-6 rounded-lg shadow-2xs">
                
                <div className="mb-4 pb-3 border-b border-[#E6DDCE]">
                  <h2 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight font-serif">
                    Schedule an Appointment
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                    Private 1-on-1 consultation with Ach. Dr. Mohit Shah.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 font-serif">
                      Appointment Request Submitted
                    </h3>
                    <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-normal">
                      Your consultation details have been recorded and transferred to our official WhatsApp booking desk (<strong>+91 70044 33677</strong>). We will confirm your consultation slot shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs font-medium uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                    
                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                          Email Address (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-normal"
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
                              className={`py-1.5 text-[11px] font-semibold transition-colors cursor-pointer text-center rounded-sm ${
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

                    {/* Row 3: Discipline & Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                          Consultation Focus
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
                          >
                            {allServices.map((s) => (
                              <option key={s.id} value={s.name}>
                                {s.name} ({s.categoryTitle})
                              </option>
                            ))}
                            <option value="General Vedic Life Guidance">
                              General Vedic Life Guidance
                            </option>
                            <option value="Gemstone Recommendation">
                              Gemstone Recommendation
                            </option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                            className="w-full appearance-none px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
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
                          <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Birth Details Box */}
                    <div className="bg-[#FAF7F2] p-3.5 border border-[#E6DDCE] rounded-md space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E3B1E]">
                          Birth Details (For Kundali &amp; Horary)
                        </span>
                        <span className="text-[10px] text-neutral-500">Optional if unknown</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
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
                              className="w-11 px-1 py-1.5 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                            />
                            <span className="self-center font-bold text-neutral-400">:</span>
                            <input
                              type="text"
                              name="tobMinutes"
                              placeholder="MM"
                              maxLength={2}
                              value={formData.tobMinutes}
                              onChange={handleChange}
                              className="w-11 px-1 py-1.5 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                            />
                            <div className="flex bg-neutral-200/90 p-0.5 border border-neutral-300 rounded-md shrink-0">
                              {["AM", "PM"].map((period) => (
                                <button
                                  key={period}
                                  type="button"
                                  onClick={() => handleAmPmSelect(period)}
                                  className={`px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer rounded-xs ${
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

                        <div>
                          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                            Place of Birth
                          </label>
                          <div className="relative">
                            <MapPin className="w-3 h-3 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              name="pob"
                              value={formData.pob}
                              onChange={handleChange}
                              placeholder="City, State"
                              className="w-full pl-7 pr-2.5 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md"
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
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Consultation topic, specific questions or life areas to focus on..."
                        className="w-full px-3 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-md shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50 text-center"
                      >
                        Book Now
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />
      <ConsultationModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

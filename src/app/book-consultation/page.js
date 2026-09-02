"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  User,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  Lock,
  Bell,
  Headphones,
  Sun,
  Flower2,
  Star,
  Info,
  ArrowLeft,
} from "lucide-react";
import { allServices, clinicInfo } from "@/data/siteContent";

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialServiceParam = searchParams.get("service") || "Birth Chart Analysis";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "Male",
    service: initialServiceParam,
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

  useEffect(() => {
    if (initialServiceParam) {
      setFormData((prev) => ({ ...prev, service: initialServiceParam }));
    }
  }, [initialServiceParam]);

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
      sourcePage: "/book-consultation",
      sourceCard: "Online Consultation Booking Page",
    };

    // Save lead to MongoDB Atlas CRM
    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to save lead:", err);
    } finally {
      setSubmitting(false);
    }

    const text = `Namaste Ach. Dr. Mohit Shah ji,
I would like to book an astrological consultation at Vedic Jyotish Kendra.

*Client Details:*
- Name: ${formData.name}
- Phone: ${formData.phone}
${formData.email ? `- Email: ${formData.email}\n` : ""}- Gender: ${formData.gender}
- Service Focus: ${formData.service}
- Preferred Mode: ${formData.mode}
${formData.dob ? `- Date of Birth: ${formData.dob}\n` : ""}- Time of Birth: ${formattedTob}
${formData.pob ? `- Place of Birth: ${formData.pob}\n` : ""}${formData.notes ? `- Queries / Notes: ${formData.notes}\n` : ""}
Kindly confirm the consultation slot availability.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-neutral-800 w-full overflow-x-clip font-sans">
      <Navbar />

      <main className="flex-1 w-full py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* ── TOP HERO HEADER SECTION ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
            
            {/* Left Title & Tagline */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="/logo.jpeg"
                  alt="Vedic Jyotish Kendra Logo"
                  className="w-8 h-8 rounded-full object-cover border border-[#D9CDBF]"
                />
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 block font-serif">
                    {clinicInfo.name}
                  </span>
                  <span className="text-[10px] text-[#8C4A20] font-medium block">
                    Ancient Wisdom. Modern Guidance.
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 font-serif leading-[1.15] tracking-tight">
                Book Your{" "}
                <span className="text-[#6E3B1E] font-medium">Vedic Consultation</span>
                <br className="hidden sm:inline" /> with Confidence
              </h1>

              {/* Decorative Diamond & Subtitle */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[#8C4A20]">
                  <div className="w-8 h-px bg-[#D9CDBF]"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#6E3B1E]"></div>
                  <div className="w-8 h-px bg-[#D9CDBF]"></div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal max-w-lg">
                  Take the first step towards clarity, guidance and a better tomorrow.
                </p>
              </div>
            </div>

            {/* Right Acharya Ji Chamber Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#EEDDC8] to-[#FAF7F2] p-2 border border-[#E6DDCE] shadow-sm flex items-center justify-center">
                {/* Background Rotating Vedic Ring */}
                <div className="absolute w-[280px] h-[280px] rounded-full overflow-hidden opacity-40 pointer-events-none -z-0">
                  <img
                    src="/vedicrounded.webp"
                    alt="Vedic Astrology Chakra"
                    className="w-full h-full object-contain animate-[spin_90s_linear_infinite]"
                  />
                </div>
                <img
                  src="/aacharyajii.png"
                  alt="Acharya Dr. Mohit Shah - Vedic Astrological Advisor"
                  className="relative z-10 w-auto max-h-[260px] sm:max-h-[300px] object-contain object-top drop-shadow-md select-none"
                />
              </div>
            </div>

          </div>

          {/* ── 2-COLUMN MAIN INTERACTION GRID ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Why Consult + Need Help (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card 1: Why Consult Benefits */}
              <div className="bg-white border border-[#E6DDCE] p-6 rounded-2xl shadow-2xs space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#6E3B1E] font-serif border-b border-[#E6DDCE] pb-2.5">
                  WHY CONSULT?
                </h2>

                <div className="space-y-4">
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 text-[#6E3B1E]">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold text-neutral-900 font-serif">
                        Accurate Guidance
                      </h3>
                      <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                        Solutions rooted in authentic Vedic knowledge and mathematical calculations.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 text-[#6E3B1E]">
                      <Flower2 className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold text-neutral-900 font-serif">
                        Personalized Approach
                      </h3>
                      <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                        Every chart is unique, every solution is personalized to your planetary dasha.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 text-[#6E3B1E]">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold text-neutral-900 font-serif">
                        Trusted Expertise
                      </h3>
                      <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                        Learn from 15+ years of study, doctoral research, practice &amp; experience.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 4 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center shrink-0 text-[#6E3B1E]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-xs font-semibold text-neutral-900 font-serif">
                        Confidential &amp; Secure
                      </h3>
                      <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                        Your privacy, birth coordinates and personal trust are our priority.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Need Help */}
              <div className="bg-white border border-[#E6DDCE] p-6 rounded-2xl shadow-2xs space-y-3.5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#6E3B1E] font-serif border-b border-[#E6DDCE] pb-2.5">
                  NEED HELP?
                </h2>
                <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                  Our coordinator team is here to assist you with your booking.
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#6E3B1E] shrink-0" />
                    <a
                      href={`tel:${clinicInfo.phone}`}
                      className="font-semibold text-neutral-900 hover:text-[#6E3B1E] transition-colors"
                    >
                      +91 70044 33677
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-[#6E3B1E] shrink-0" />
                    <a
                      href={`mailto:${clinicInfo.email}`}
                      className="text-neutral-700 hover:text-[#6E3B1E] transition-colors break-all"
                    >
                      {clinicInfo.email}
                    </a>
                  </div>
                </div>

                {/* Security Encrypted Tag */}
                <div className="mt-4 bg-[#FAF7F2] border border-[#E6DDCE] p-3 rounded-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-green-700 border border-[#E6DDCE] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-700">
                    Your information is safe and encrypted
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Main Booking Form Container (Col 8) */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-[#E6DDCE] p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm">
                
                {/* Form Header */}
                <div className="flex items-start gap-3.5 pb-6 mb-6 border-b border-[#E6DDCE]">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center text-[#6E3B1E] shrink-0 shadow-2xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900 font-serif">
                      BOOK VEDIC CONSULTATION
                    </h2>
                    <p className="text-xs text-neutral-500 font-normal">
                      Ach. Dr. Mohit Shah · Ph.D. Vedic Astrology (MCVA)
                    </p>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-neutral-900 font-serif">
                        Consultation Request Submitted!
                      </h3>
                      <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                        Your consultation details have been recorded and transferred to our official WhatsApp booking desk (<strong>+91 70044 33677</strong>). Our team will connect with you shortly to confirm your appointment slot.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer shadow-xs"
                      >
                        Submit Another Booking
                      </button>
                      <Link
                        href="/"
                        className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer border border-neutral-300"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    
                    {/* Row 1: Full Name & Phone Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          FULL NAME <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium placeholder:text-neutral-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          PHONE NUMBER <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium placeholder:text-neutral-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          EMAIL ADDRESS (OPTIONAL)
                        </label>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                            className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-normal placeholder:text-neutral-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          GENDER
                        </label>
                        <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-0.5 border border-neutral-300 rounded-md">
                          {["Male", "Female", "Other"].map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => handleGenderSelect(g)}
                              className={`py-2 text-[11px] font-semibold transition-all cursor-pointer text-center rounded-sm ${
                                formData.gender === g
                                  ? "bg-[#6E3B1E] text-white shadow-xs"
                                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60"
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Discipline & Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          CONSULTATION DISCIPLINE <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full appearance-none px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
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
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                          CONSULTATION MODE <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="w-full appearance-none px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md pr-8 cursor-pointer font-medium"
                          >
                            <option value="In-Person (Ranchi Kendra)">
                              In-Person (Ranchi Kendra)
                            </option>
                            <option value="Online Video Consultation">
                              Online Video (Google Meet / WhatsApp)
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
                    <div className="bg-[#FAF7F2] p-4 border border-[#E6DDCE] rounded-xl space-y-3">
                      <div className="flex items-center justify-between border-b border-[#E6DDCE] pb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E3B1E] font-serif">
                          BIRTH DETAILS (FOR KUNDALI &amp; HORARY)
                        </span>
                        <span className="text-[10px] text-neutral-500 font-normal">Optional if unknown</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            DATE OF BIRTH
                          </label>
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full px-2.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md cursor-pointer font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            TIME OF BIRTH &amp; PERIOD
                          </label>
                          <div className="flex gap-1 items-center">
                            <input
                              type="text"
                              name="tobHours"
                              placeholder="10"
                              maxLength={2}
                              value={formData.tobHours}
                              onChange={handleChange}
                              className="w-12 px-1 py-2 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                            />
                            <span className="self-center font-bold text-neutral-400">:</span>
                            <input
                              type="text"
                              name="tobMinutes"
                              placeholder="30"
                              maxLength={2}
                              value={formData.tobMinutes}
                              onChange={handleChange}
                              className="w-12 px-1 py-2 text-center bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md font-medium"
                            />
                            <div className="flex bg-neutral-200/90 p-0.5 border border-neutral-300 rounded-md shrink-0">
                              {["AM", "PM"].map((period) => (
                                <button
                                  key={period}
                                  type="button"
                                  onClick={() => handleAmPmSelect(period)}
                                  className={`px-2 py-1.5 text-[10px] font-bold transition-colors cursor-pointer rounded-xs ${
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
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                            PLACE OF BIRTH
                          </label>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              name="pob"
                              value={formData.pob}
                              onChange={handleChange}
                              placeholder="City, State"
                              className="w-full pl-8 pr-2.5 py-2 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md placeholder:text-neutral-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specific Questions / Notes */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                        SPECIFIC QUERY / CONCERN (OPTIONAL)
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Consultation topic, specific questions or life areas to focus on..."
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:border-[#6E3B1E] rounded-md resize-none placeholder:text-neutral-400"
                      />
                    </div>

                    {/* Form Bottom Action Row */}
                    <div className="pt-3 border-t border-[#E6DDCE] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-2 text-[11px] text-neutral-600 max-w-xs sm:max-w-sm">
                        <Info className="w-4 h-4 text-[#6E3B1E] shrink-0 mt-0.5" />
                        <span>After booking, our team will connect with you to confirm your appointment details.</span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 sm:flex-initial px-6 py-3 bg-[#6E3B1E] hover:bg-[#582f17] text-white text-xs uppercase tracking-wider font-semibold transition-all rounded-md shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50 text-center flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => router.push("/")}
                          className="px-4 py-3 bg-white border border-neutral-300 hover:border-black text-neutral-700 hover:text-black text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* ── BOTTOM VALUE CARDS STRIP ────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#E6DDCE]">
            
            {/* Feature 1 */}
            <div className="bg-white border border-[#E6DDCE] p-4 rounded-xl flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center text-[#6E3B1E] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900 font-serif">Easy Scheduling</h3>
                <p className="text-[11px] text-neutral-600 mt-0.5 font-normal">Choose your preferred date &amp; time.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-[#E6DDCE] p-4 rounded-xl flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center text-[#6E3B1E] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900 font-serif">Secure Booking</h3>
                <p className="text-[11px] text-neutral-600 mt-0.5 font-normal">Your data is protected with top security.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-[#E6DDCE] p-4 rounded-xl flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center text-[#6E3B1E] shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900 font-serif">Timely Reminders</h3>
                <p className="text-[11px] text-neutral-600 mt-0.5 font-normal">Get reminders for your upcoming session.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-[#E6DDCE] p-4 rounded-xl flex items-start gap-3.5 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#E6DDCE] flex items-center justify-center text-[#6E3B1E] shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-900 font-serif">Dedicated Support</h3>
                <p className="text-[11px] text-neutral-600 mt-0.5 font-normal">We&apos;re here to help you at every step.</p>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookConsultationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2]" />}>
      <BookingForm />
    </Suspense>
  );
}

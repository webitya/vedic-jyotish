"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  User,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Award,
  Scroll,
  BookOpen
} from "lucide-react";
import { allServices, clinicInfo } from "@/data/siteContent";

export default function BookConsultationPage() {
  const [modalOpen, setModalOpen] = useState(false);
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
      sourcePage: "/book-consultation",
      sourceCard: "Dedicated Booking Page Form",
    };

    // Save lead to MongoDB Atlas
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
Please confirm the appointment schedule.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/917004433677?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-neutral-900 flex flex-col font-sans">
      <Navbar onOpenBooking={() => setModalOpen(true)} />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Breadcrumb & Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#6E3B1E] uppercase inline-block">
              Authentic Vedic Consultation
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900 tracking-tight font-serif">
              Book Your Astrological Consultation
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Direct astrological counsel with <strong>Ach. Dr. Mohit Shah</strong> (Ph.D. Vedic Astrology, M.A. Jyotirvigyan). Accurate natal chart calculations, Parashari dasha evaluation &amp; customized remedial gemstones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#E6DDCE] p-5 sm:p-7 shadow-xs rounded-lg">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-xs">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 font-serif">
                    Appointment Request Dispatched!
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-normal">
                    Your details have been recorded in our Kendra database and forwarded to our official WhatsApp booking line. Our team will verify planetary ephemeris data and confirm your consultation slot shortly.
                  </p>
                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-[#6E3B1E] text-white text-xs uppercase tracking-wider font-semibold rounded-md hover:bg-[#582f17] cursor-pointer shadow-xs transition-colors"
                    >
                      Book Another Consultation
                    </button>
                    <Link
                      href="/"
                      className="px-6 py-2.5 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs uppercase tracking-wider font-semibold rounded-md cursor-pointer transition-colors"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div className="border-b border-neutral-200 pb-2.5">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 font-serif">
                      Client &amp; Astrological Details
                    </h2>
                    <p className="text-[11px] text-neutral-500 font-normal">
                      Provide accurate birth information for precision horary and Kundali calculations.
                    </p>
                  </div>

                  {/* Row 1: Name & Phone */}
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

                  {/* Row 2: Email & Gender Pill Select */}
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
                        Consultation Discipline
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
                              {s.name}
                            </option>
                          ))}
                          <option value="General Vedic Guidance">General Vedic Guidance</option>
                          <option value="Gemstone Recommendation">Gemstone Recommendation</option>
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
                        Birth Chart Particulars (Kundali &amp; Prashna)
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
                          Time of Birth
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

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      Specific Areas of Focus / Query (Optional)
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


            {/* Right Column: Trust & Information (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Profile Card */}
              <div className="bg-white border border-[#E6DDCE] p-6 rounded-none space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A86121] block">
                  Lead Astrological Advisor
                </span>
                <h3 className="text-lg font-semibold text-black font-serif">
                  Ach. Dr. Mohit Shah
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  Ph.D. in Vedic Astrology (MCVA) &amp; M.A. in Jyotirvigyan (Ranchi University). Dedicated to mathematical rigor, Parashari dasha calculations, and non-superstitious gemstone therapies.
                </p>

                <div className="pt-2 border-t border-neutral-200 space-y-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#A86121] shrink-0" />
                    <span>20+ Years Rigorous Vedic Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#A86121] shrink-0" />
                    <span>Certified Lab Tested Gemstone Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#A86121] shrink-0" />
                    <span>Classical Sanskrit Siddhanta Ephemeris</span>
                  </div>
                </div>
              </div>

              {/* Consultation Modes Box */}
              <div className="bg-[#FAF7F2] border border-[#E6DDCE] p-5 rounded-none space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black">
                  Consultation Formats
                </h4>
                
                <div className="space-y-2 text-xs text-neutral-700">
                  <div className="p-2.5 bg-white border border-[#E6DDCE]">
                    <div className="font-semibold text-black">1. Chamber Consultation (In-Person)</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Vedic Jyotish Kendra, Harmu Housing Colony, Ranchi.
                    </div>
                  </div>

                  <div className="p-2.5 bg-white border border-[#E6DDCE]">
                    <div className="font-semibold text-black">2. Online Video Session</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      HD Google Meet / WhatsApp Video for global devotees &amp; NRI clients.
                    </div>
                  </div>

                  <div className="p-2.5 bg-white border border-[#E6DDCE]">
                    <div className="font-semibold text-black">3. Telephonic Consultation</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Direct voice call with recorded planetary findings and prescribed remedies.
                    </div>
                  </div>
                </div>
              </div>

              {/* Kendra Contact Strip */}
              <div className="p-4 bg-neutral-900 text-white rounded-none space-y-2 text-xs">
                <div className="font-semibold uppercase tracking-wider text-amber-400 text-[11px]">
                  Direct Chamber Helplines
                </div>
                <div>
                  Acharya Ji Direct: <strong className="text-white">+91 70044 33677</strong>
                </div>
                <div>
                  Coordinator Aditya: <strong className="text-white">+91 88603 59754</strong>
                </div>
                <div className="text-[10px] text-neutral-400 pt-1 border-t border-neutral-800">
                  Chamber Hours: 10:00 AM – 07:00 PM (Monday – Saturday)
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer onOpenBooking={() => setModalOpen(true)} />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

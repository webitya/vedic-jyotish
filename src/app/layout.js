import { Inter } from "next/font/google";
import "./globals.css";
import StickyContact from "@/components/StickyContact";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  title: "Vedic Jyotish Kendra | Ach. Dr. Mohit Shah — Astrological Advisor & Counsellor",
  description: "Authentic Vedic Astrology, Vastu Shastra, Birth Chart Analysis & Spiritual Counselling by Ach. Dr. Mohit Shah (M.A. Jyotirvigyan, Ph.D. Vedic Astrology) in Ranchi, Jharkhand.",
  keywords: [
    "Vedic Jyotish Kendra",
    "Acharya Dr Mohit Shah",
    "Astrological Advisor Ranchi",
    "Vedic Astrology Ranchi",
    "Vastu Consultant Jharkhand",
    "Birth Chart Analysis",
    "Gemstone Therapy",
    "Kundali Consultation Ranchi"
  ],
  authors: [{ name: "Ach. Dr. Mohit Shah" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth overflow-x-hidden`} suppressHydrationWarning>
      <body className="font-sans antialiased text-neutral-900 bg-white selection:bg-neutral-900 selection:text-white overflow-x-hidden max-w-full min-h-screen">
        {children}
        <StickyContact />
      </body>
    </html>
  );
}

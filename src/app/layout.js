import "./globals.css";
import StickyContact from "@/components/StickyContact";
import NotificationPopup from "@/components/NotificationPopup";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="en" className="overflow-x-clip" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Climate+Crisis:YEAR@1979&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-neutral-900 bg-white selection:bg-neutral-900 selection:text-white overflow-x-clip max-w-full min-h-screen">
        <SmoothScroll>
          {children}
          <StickyContact />
          <NotificationPopup />
        </SmoothScroll>
      </body>
    </html>
  );
}



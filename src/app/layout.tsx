import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const displayFont = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const monoFont = Geist_Mono({ variable: "--font-code", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://astrocode.studio"),
  title: {
    default: "AstroCodes — Website Redesign & Custom Business Systems",
    template: "%s | AstroCodes",
  },
  description:
    "AstroCodes redesigns underperforming business websites and builds tailored internal web systems for companies in Jamaica and beyond.",
  keywords: [
    "website redesign Jamaica",
    "business website design",
    "custom business systems",
    "internal web apps",
    "website care",
  ],
  authors: [{ name: "AstroCodes" }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_JM",
    url: "/",
    siteName: "AstroCodes",
    title: "AstroCodes — Digital infrastructure for growing businesses",
    description: "Website redesign and custom business systems, built around measurable business outcomes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroCodes — Website Redesign & Business Systems",
    description: "Modern websites and tailored private web apps for growing businesses.",
  },
  icons: [{ rel: "icon", url: "/A.png" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090d",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AstroCodes",
  description: "Website redesign and custom business systems for growing businesses.",
  url: "https://astrocode.studio",
  areaServed: ["Jamaica", "Caribbean", "Remote"],
  availableLanguage: "English",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          id="astrocodes-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

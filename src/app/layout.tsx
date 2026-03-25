import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstroCode Studio — Web Design for Small Businesses",
  description:
    "Premium websites for small businesses. Fast, animated, SEO-optimized. Starting at $299.",
  keywords: ["web design", "small business websites", "affordable web design", "animated websites", "SEO services"],
  authors: [{ name: "AstroCode Studio" }],
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://astrocode.studio",
    title: "AstroCode Studio — Web Design for Small Businesses",
    description:
      "Premium websites for small businesses. Fast, animated, SEO-optimized. Starting at $299.",
    images: [
      {
        url: "https://astrocode.studio/og-image.png",
        width: 1200,
        height: 630,
        alt: "AstroCode Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroCode Studio — Web Design for Small Businesses",
    description:
      "Premium websites for small businesses. Fast, animated, SEO-optimized. Starting at $299.",
    images: ["https://astrocode.studio/twitter-image.png"],
  },
  alternates: {
    canonical: "https://astrocode.studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AstroCode Studio",
    description: "Premium web design agency for small businesses",
    url: "https://astrocode.studio",
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    priceRange: "$299-$10000",
    areaServed: ["US", "CA"],
    availableLanguage: "en",
    sameAs: [
      "https://twitter.com/astrocode",
      "https://instagram.com/astrocode",
      "https://linkedin.com/company/astrocode",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

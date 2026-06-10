import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shree Radhe Shyam Bhakti Sarover Trust",
    template: "%s | Shree Radhe Shyam Bhakti Sarover Trust",
  },
  description:
    "Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of Devotion. A non-profit spiritual and charitable trust dedicated to Gau Seva, Bhakti, and Spiritual Enlightenment in Howrah, Kolkata.",
  keywords: [
    "Shree Radhe Shyam Bhakti Sarover Trust",
    "Gau Seva",
    "Naam Sankirtan",
    "Radha Krishna",
    "Spiritual Trust",
    "Howrah Kolkata",
    "Bhakti",
    "Sanatan Dharma",
  ],
  openGraph: {
    title: "Shree Radhe Shyam Bhakti Sarover Trust",
    description:
      "Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of Devotion.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}

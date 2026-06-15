import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Inter,
  Noto_Serif_Devanagari,
  Yatra_One,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/data";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

const yatraOne = Yatra_One({
  variable: "--font-yatra",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://shreeradheshyambhaktisarovertrust.com'),
  title: {
    default: "Shree Radhe Shyam Bhakti Sarover Trust | Gau Seva & Spiritual Organization in Kolkata",
    template: "%s | Shree Radhe Shyam Bhakti Sarover Trust",
  },
  description:
    "A non-profit spiritual and charitable trust dedicated to Gau Mata Seva, Shri Radha Krishna Bhakti, Naam Sankirtan, and Sanatan Dharma in Howrah, Kolkata.",
  keywords: [
    "Gau Seva Trust",
    "Gau Mata Seva",
    "Cow Protection Trust India",
    "Shri Radha Krishna Bhakti",
    "Naam Sankirtan",
    "Sanatan Dharma Trust",
    "Spiritual Trust West Bengal",
    "Spiritual Organization Kolkata",
    "Bhajan Kirtan Programs",
    "Radha Krishna Devotion",
    "Gau Daan",
    "Spiritual NGO India",
    "Religious Charitable Trust",
    "Trust in Howrah",
  ],
  authors: [{ name: "Shree Radhe Shyam Bhakti Sarover Trust" }],
  creator: "Shree Radhe Shyam Bhakti Sarover Trust",
  publisher: "Shree Radhe Shyam Bhakti Sarover Trust",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shree Radhe Shyam Bhakti Sarover Trust",
    description:
      "Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of Devotion. Join us in our spiritual and charitable initiatives in Howrah, Kolkata.",
    url: 'https://shreeradheshyambhaktisarovertrust.com',
    siteName: 'Shree Radhe Shyam Bhakti Sarover Trust',
    images: [
      {
        url: '/Logo.png',
        width: 800,
        height: 600,
        alt: 'Shree Radhe Shyam Bhakti Sarover Trust Logo',
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shree Radhe Shyam Bhakti Sarover Trust",
    description: "Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of Devotion in Kolkata.",
    images: ['/Logo.png'],
  },
  icons: {
    icon: "/logoicon.png",
    shortcut: "/logoicon.png",
    apple: "/logoicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${cormorant.variable} ${inter.variable} ${notoDevanagari.variable} ${yatraOne.variable} ${marcellus.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            ${settings.themeBackground ? `--background: ${settings.themeBackground};` : ""}
            ${settings.themeSurface ? `--surface: ${settings.themeSurface};` : ""}
            ${settings.themePrimary ? `--maroon: ${settings.themePrimary};` : ""}
            ${settings.themeAccent ? `--gold: ${settings.themeAccent};` : ""}
            ${settings.themeText ? `--charcoal: ${settings.themeText};` : ""}
          }
          html {
            font-size: ${settings.baseFontSize || 16}px !important;
          }
        `}} />
      </head>
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}

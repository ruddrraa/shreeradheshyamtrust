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

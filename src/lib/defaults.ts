import type { SiteSettings, Testimonial } from "@/types";
import { siteImages } from "@/lib/images";

export const defaultSettings: Omit<SiteSettings, "_id"> = {
  heroTitle: "Shree Radhe Shyam Bhakti Sarover Trust",
  heroSubtitle:
    "Preserving the sacred traditions of Gau Seva, Bhakti, and Spiritual Enlightenment.",
  heroImage: siteImages.hero,
  aboutTitle: "A Sanctuary of Devotion & Compassion",
  aboutSubtitle: "Our Story",
  aboutDescription: "Shree Radhe Shyam Bhakti Sarover Trust is dedicated to serving society through devotion, compassion, and righteous living — promoting the timeless teachings of Sanatan Dharma.",
  aboutImage: siteImages.about,
  pillars: [
    {
      title: "Gau Mata Seva",
      subtitle: "Sacred Protection & Welfare",
      description: "Through compassionate seva, we preserve and promote the sacred tradition of cow protection — honoring Gau Mata's spiritual and cultural significance in our heritage.",
      image: siteImages.pillars.gauSeva,
    },
    {
      title: "Spiritual Teachings",
      subtitle: "Value-Based Living",
      description: "Inspired by Shri Radha Krishna and the scriptures, we guide seekers toward devotion, humility, compassion, and a balanced, ethical life.",
      image: siteImages.pillars.spiritualTeachings,
    },
    {
      title: "Shri Radha Krishna Naam Sankirtan",
      subtitle: "Divine Love Through Chanting",
      description: "Regular Shri Radha Krishna Naam Sankirtan, bhajans, and satsang programs foster spiritual harmony, inner peace, and devotion among all ages.",
      image: siteImages.pillars.naamSankirtan,
    },
  ],
  visionSanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर।",
  visionSubtitle: "Selfless service performed with devotion leads to the highest good. — Bhagavad Gita 3.19",
  visionImage: siteImages.vision,
  contactEmail: "contact@shreeradheshyamtrust.org",
  contactPhone: "+91 98765 43210",
  address: "Howrah, Kolkata, West Bengal, India",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://whatsapp.com",
  },
  themeBackground: "#f5f0e8",
  themeSurface: "#faf7f2",
  themePrimary: "#6a3024",
  themeAccent: "#c2a15e",
  themeText: "#1c1a18",
  baseFontSize: 16,
  typography: {
    global: {},
    hero: {},
    about: {},
    pillars: {},
    vision: {},
    contact: {},
    videos: {},
    events: {},
  },
  impactStats: {
    gauSeva: 150,
    spiritualPrograms: 48,
    sankirtanGatherings: 120,
    devoteesReached: 5000,
  },
};

export const testimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Priya Sharma",
    role: "Devotee, Kolkata",
    quote:
      "The seva and devotion at this trust is truly transformative. Every sankirtan gathering fills the heart with divine love and peace.",
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Rajesh Verma",
    role: "Volunteer",
    quote:
      "Being part of Gau Mata seva here has deepened my understanding of compassion and selfless service. A truly sacred experience.",
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Ananya Das",
    role: "Spiritual Seeker",
    quote:
      "The spiritual discourses and value-based teachings have guided my family toward a more meaningful, devotional life.",
    isApproved: true,
    createdAt: new Date().toISOString(),
  },
];

export const pillarData = [
  {
    id: "gau-seva",
    title: "Gau Mata Seva",
    subtitle: "Sacred Protection & Welfare",
    description:
      "Through compassionate seva, we preserve and promote the sacred tradition of cow protection — honoring Gau Mata's spiritual and cultural significance in our heritage.",
    image: siteImages.pillars.gauSeva,
  },
  {
    id: "spiritual-teachings",
    title: "Spiritual Teachings",
    subtitle: "Value-Based Living",
    description:
      "Inspired by Shri Radha Krishna and the scriptures, we guide seekers toward devotion, humility, compassion, and a balanced, ethical life.",
    image: siteImages.pillars.spiritualTeachings,
  },
  {
    id: "naam-sankirtan",
    title: "Shri Radha Krishna Naam Sankirtan",
    subtitle: "Divine Love Through Chanting",
    description:
      "Regular Shri Radha Krishna Naam Sankirtan, bhajans, and satsang programs foster spiritual harmony, inner peace, and devotion among all ages.",
    image: siteImages.pillars.naamSankirtan,
  },
];

export const demoGalleryImages = siteImages.gallery.map((img) => ({
  ...img,
  createdAt: new Date().toISOString(),
}));

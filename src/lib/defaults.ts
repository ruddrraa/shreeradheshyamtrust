import type { SiteSettings, Testimonial } from "@/types";

export const defaultSettings: Omit<SiteSettings, "_id"> = {
  heroTitle: "Shree Radhe Shyam Bhakti Sarover Trust",
  heroSubtitle:
    "Preserving the sacred traditions of Gau Seva, Bhakti, and Spiritual Enlightenment.",
  heroImage:
    "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1920&q=80",
  contactEmail: "contact@shreeradheshyamtrust.org",
  contactPhone: "+91 98765 43210",
  address: "Howrah, Kolkata, West Bengal, India",
  socialLinks: {},
  impactStats: {
    gauSeva: 150,
    spiritualPrograms: 48,
    sankirtanGatherings: 120,
    devoteesReached: 5000,
  },
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Devotee, Kolkata",
    quote:
      "The seva and devotion at this trust is truly transformative. Every sankirtan gathering fills the heart with divine love and peace.",
  },
  {
    id: "2",
    name: "Rajesh Verma",
    role: "Volunteer",
    quote:
      "Being part of Gau Mata seva here has deepened my understanding of compassion and selfless service. A truly sacred experience.",
  },
  {
    id: "3",
    name: "Ananya Das",
    role: "Spiritual Seeker",
    quote:
      "The spiritual discourses and value-based teachings have guided my family toward a more meaningful, devotional life.",
  },
];

export const pillarData = [
  {
    id: "gau-seva",
    title: "Gau Mata Seva",
    subtitle: "Sacred Protection & Welfare",
    description:
      "Through compassionate seva, we preserve and promote the sacred tradition of cow protection — honoring Gau Mata's spiritual and cultural significance in our heritage.",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
  },
  {
    id: "spiritual-teachings",
    title: "Spiritual Teachings",
    subtitle: "Value-Based Living",
    description:
      "Inspired by Shri Radha Krishna and the scriptures, we guide seekers toward devotion, humility, compassion, and a balanced, ethical life.",
    image:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
  },
  {
    id: "naam-sankirtan",
    title: "Naam Sankirtan",
    subtitle: "Divine Love Through Chanting",
    description:
      "Regular Shri Radha Krishna Naam Sankirtan, bhajans, and satsang programs foster spiritual harmony, inner peace, and devotion among all ages.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
];

export const demoGalleryImages = [
  {
    _id: "demo-1",
    url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80",
    publicId: "demo",
    category: "gau-seva" as const,
    caption: "Gau Mata Seva",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-2",
    url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80",
    publicId: "demo",
    category: "sankirtan" as const,
    caption: "Sankirtan Gathering",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-3",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    publicId: "demo",
    category: "bhajan" as const,
    caption: "Bhajan Program",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-4",
    url: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=600&q=80",
    publicId: "demo",
    category: "events" as const,
    caption: "Spiritual Event",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-5",
    url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80",
    publicId: "demo",
    category: "gau-seva" as const,
    caption: "Cow Protection",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-6",
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&q=80",
    publicId: "demo",
    category: "sankirtan" as const,
    caption: "Divine Gathering",
    createdAt: new Date().toISOString(),
  },
];

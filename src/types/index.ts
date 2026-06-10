export type GalleryCategory =
  | "gau-seva"
  | "sankirtan"
  | "bhajan"
  | "events";

export interface GalleryImage {
  _id: string;
  url: string;
  publicId: string;
  category: GalleryCategory;
  caption?: string;
  createdAt: string;
}

export interface Video {
  _id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: string;
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  banner: string;
  bannerPublicId?: string;
  date: string;
  lumaLink?: string;
  createdAt: string;
}

export type DonationPurpose =
  | "gau-seva"
  | "general"
  | "event-sponsorship"
  | "custom";

export interface Donation {
  _id: string;
  amount: number;
  purpose: DonationPurpose;
  donorName: string;
  donorEmail?: string;
  isAnonymous: boolean;
  currency: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface SiteSettings {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  impactStats: {
    gauSeva: number;
    spiritualPrograms: number;
    sankirtanGatherings: number;
    devoteesReached: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

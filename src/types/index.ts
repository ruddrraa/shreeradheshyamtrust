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
  originalAmount?: number;
  originalCurrency?: string;
  razorpayPaymentId?: string;
  createdAt: string;
}

export type TypographySetting = {
  fontSize?: number;
  color?: string;
  fontFamily?: string;
};

export type SectionTypography = {
  overhead?: TypographySetting;
  heading?: TypographySetting;
  subheading?: TypographySetting;
  body?: TypographySetting;
};

export interface SiteSettings {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImagePublicId?: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutDescription: string;
  aboutImage: string;
  aboutImagePublicId?: string;
  pillars: {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    imagePublicId?: string;
  }[];
  visionSanskrit: string;
  visionSubtitle: string;
  visionImage: string;
  visionImagePublicId?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  themeBackground: string;
  themeSurface: string;
  themePrimary: string;
  themeAccent: string;
  themeText: string;
  baseFontSize: number;
  typography?: {
    global?: SectionTypography;
    hero?: SectionTypography;
    about?: SectionTypography;
    pillars?: SectionTypography;
    vision?: SectionTypography;
    contact?: SectionTypography;
    videos?: SectionTypography;
    events?: SectionTypography;
  };
  guidance?: {
    guru?: {
      name: string;
      details: string;
      image: string;
      imagePublicId?: string;
    };
    parents?: {
      name: string;
      details: string;
      image: string;
      imagePublicId?: string;
    };
    mentor?: {
      name: string;
      title: string;
      details: string;
      image: string;
      imagePublicId?: string;
    };
    sevaHighlights?: {
      title: string;
      subtitle: string;
      image: string;
      imagePublicId?: string;
    }[];
  };
  colorHistory?: {
    themeBackground?: string;
    themeSurface?: string;
    themePrimary?: string;
    themeAccent?: string;
    themeText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typography?: any;
    savedAt: string;
  }[];
  impactStats?: {
    gauSeva: number;
    spiritualPrograms: number;
    sankirtanGatherings: number;
    devoteesReached: number;
  };
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  isApproved: boolean;
  createdAt: string;
}

import mongoose, { Schema, models } from "mongoose";

const TypographyElementSchema = new Schema(
  {
    fontSize: Number,
    color: String,
  },
  { _id: false }
);

const SectionTypographySchema = new Schema(
  {
    overhead: TypographyElementSchema,
    heading: TypographyElementSchema,
    subheading: TypographyElementSchema,
    body: TypographyElementSchema,
  },
  { _id: false }
);

const SettingsSchema = new Schema(
  {
    heroTitle: {
      type: String,
      default: "Shree Radhe Shyam Bhakti Sarover Trust",
    },
    heroSubtitle: {
      type: String,
      default:
        "Preserving the sacred traditions of Gau Seva, Bhakti, and Spiritual Enlightenment.",
    },
    heroImage: {
      type: String,
      default: "/images/hero.png",
    },
    heroImagePublicId: String,
    aboutTitle: { type: String, default: "A Sanctuary of Devotion & Compassion" },
    aboutSubtitle: { type: String, default: "Our Story" },
    aboutDescription: { type: String, default: "Shree Radhe Shyam Bhakti Sarover Trust is dedicated to serving society through devotion, compassion, and righteous living — promoting the timeless teachings of Sanatan Dharma." },
    aboutImage: { type: String, default: "/images/about.jpg" },
    aboutImagePublicId: String,
    pillars: {
      type: [
        {
          title: String,
          subtitle: String,
          description: String,
          image: String,
          imagePublicId: String,
        },
      ],
      default: [],
    },
    visionSanskrit: {
      type: String,
      default: "तस्मादसक्तः सततं कार्यं कर्म समाचर।",
    },
    visionSubtitle: {
      type: String,
      default: "Selfless service performed with devotion leads to the highest good. — Bhagavad Gita 3.19",
    },
    visionImage: { type: String, default: "/images/vision.jpg" },
    visionImagePublicId: String,
    contactEmail: { type: String, default: "contact@shreeradheshyamtrust.org" },
    contactPhone: { type: String, default: "+91 98765 43210" },
    address: {
      type: String,
      default: "Howrah, Kolkata, West Bengal, India",
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String,
      whatsapp: String,
    },
    themeBackground: { type: String, default: "#f5f0e8" },
    themeSurface: { type: String, default: "#faf7f2" },
    themePrimary: { type: String, default: "#6a3024" },
    themeAccent: { type: String, default: "#c2a15e" },
    themeText: { type: String, default: "#1c1a18" },
    baseFontSize: { type: Number, default: 16 },
    typography: {
      global: SectionTypographySchema,
      hero: SectionTypographySchema,
      about: SectionTypographySchema,
      pillars: SectionTypographySchema,
      vision: SectionTypographySchema,
      contact: SectionTypographySchema,
    },
    colorHistory: {
      type: [
        {
          themeBackground: String,
          themeSurface: String,
          themePrimary: String,
          themeAccent: String,
          themeText: String,
          typography: Schema.Types.Mixed,
          savedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    impactStats: {
      gauSeva: { type: Number, default: 150 },
      spiritualPrograms: { type: Number, default: 48 },
      sankirtanGatherings: { type: Number, default: 120 },
      devoteesReached: { type: Number, default: 5000 },
    },
  },
  { timestamps: true }
);

export default models.Settings || mongoose.model("Settings", SettingsSchema);

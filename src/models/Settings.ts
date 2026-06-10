import mongoose, { Schema, models } from "mongoose";

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
      default:
        "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=1920&q=80",
    },
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

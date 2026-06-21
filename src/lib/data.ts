import { connectDB } from "@/lib/mongodb";
import { unstable_noStore as noStore } from "next/cache";
import { defaultSettings, demoGalleryImages } from "@/lib/defaults";
import { siteImages } from "@/lib/images";
import Gallery from "@/models/Gallery";
import Video from "@/models/Video";
import Event from "@/models/Event";
import Donation from "@/models/Donation";
import Settings from "@/models/Settings";
import type {
  GalleryImage,
  Video as VideoType,
  Event as EventType,
  Donation as DonationType,
  SiteSettings,
} from "@/types";

async function safeConnect() {
  try {
    await connectDB();
    return true;
  } catch {
    return false;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  noStore();
  const connected = await safeConnect();
  if (!connected) {
    return { _id: "default", ...defaultSettings };
  }

  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = await Settings.create(defaultSettings);
    settings = settings.toObject();
  }

  const parsed = JSON.parse(JSON.stringify(settings)) as SiteSettings;

  if (!parsed.pillars || parsed.pillars.length === 0) {
    parsed.pillars = defaultSettings.pillars;
  }
  if (!parsed.aboutTitle) {
    parsed.aboutTitle = defaultSettings.aboutTitle;
    parsed.aboutSubtitle = defaultSettings.aboutSubtitle;
    parsed.aboutDescription = defaultSettings.aboutDescription;
    parsed.aboutImage = defaultSettings.aboutImage;
  }
  if (!parsed.visionSanskrit) {
    parsed.visionSanskrit = defaultSettings.visionSanskrit;
    parsed.visionSubtitle = defaultSettings.visionSubtitle;
    parsed.visionImage = defaultSettings.visionImage;
  }
  if (!parsed.themeBackground) {
    parsed.themeBackground = defaultSettings.themeBackground;
    parsed.themeSurface = defaultSettings.themeSurface;
    parsed.themePrimary = defaultSettings.themePrimary;
    parsed.themeAccent = defaultSettings.themeAccent;
    parsed.themeText = defaultSettings.themeText;
    parsed.baseFontSize = defaultSettings.baseFontSize;
  }
  if (!parsed.typography) {
    parsed.typography = defaultSettings.typography;
  } else {
    // Merge typography sections
    parsed.typography.global = { ...defaultSettings.typography?.global, ...parsed.typography.global };
    parsed.typography.hero = { ...defaultSettings.typography?.hero, ...parsed.typography.hero };
    parsed.typography.about = { ...defaultSettings.typography?.about, ...parsed.typography.about };
    parsed.typography.pillars = { ...defaultSettings.typography?.pillars, ...parsed.typography.pillars };
    parsed.typography.vision = { ...defaultSettings.typography?.vision, ...parsed.typography.vision };
    parsed.typography.contact = { ...defaultSettings.typography?.contact, ...parsed.typography.contact };
  }
  
  if (!parsed.guidance) {
    parsed.guidance = defaultSettings.guidance;
  } else {
    if (!parsed.guidance.guru) parsed.guidance.guru = defaultSettings.guidance?.guru;
    if (!parsed.guidance.parents) parsed.guidance.parents = defaultSettings.guidance?.parents;
    if (!parsed.guidance.mentor) parsed.guidance.mentor = defaultSettings.guidance?.mentor;
    if (!parsed.guidance.sevaHighlights || parsed.guidance.sevaHighlights.length === 0) {
      parsed.guidance.sevaHighlights = defaultSettings.guidance?.sevaHighlights;
    }
  }

  return parsed;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const connected = await safeConnect();
  if (!connected) return [];

  const images = await Gallery.find().sort({ createdAt: -1 }).lean();
  const parsed = JSON.parse(JSON.stringify(images)) as GalleryImage[];
  
  return parsed.filter(
    (img) => img.url?.startsWith("/images/") || img.url?.startsWith("http") || img.url?.startsWith("data:")
  );
}

export async function getVideos(): Promise<VideoType[]> {
  const connected = await safeConnect();
  if (!connected) return [];

  const videos = await Video.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(videos));
}

export async function getEvents(): Promise<EventType[]> {
  const connected = await safeConnect();
  if (!connected) return [];

  const events = await Event.find().sort({ date: 1 }).lean();
  return JSON.parse(JSON.stringify(events));
}

export async function getDonations(): Promise<{
  donations: DonationType[];
  totalAmount: number;
}> {
  const connected = await safeConnect();
  if (!connected) return { donations: [], totalAmount: 0 };

  const donations = await Donation.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const total = await Donation.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  return {
    donations: JSON.parse(JSON.stringify(donations)),
    totalAmount: total[0]?.total ?? 0,
  };
}

import { connectDB } from "@/lib/mongodb";
import { defaultSettings, demoGalleryImages } from "@/lib/defaults";
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
  const connected = await safeConnect();
  if (!connected) {
    return { _id: "default", ...defaultSettings };
  }

  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = await Settings.create(defaultSettings);
  }

  return JSON.parse(JSON.stringify(settings));
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const connected = await safeConnect();
  if (!connected) return demoGalleryImages;

  const images = await Gallery.find().sort({ createdAt: -1 }).lean();
  if (images.length === 0) return demoGalleryImages;
  return JSON.parse(JSON.stringify(images));
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

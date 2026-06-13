import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { defaultSettings } from "@/lib/defaults";
import Settings from "@/models/Settings";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(defaultSettings);
    } else {
      let changed = false;
      if (!settings.pillars || settings.pillars.length === 0) {
        settings.pillars = defaultSettings.pillars;
        changed = true;
      }
      if (!settings.aboutTitle) {
        settings.aboutTitle = defaultSettings.aboutTitle;
        settings.aboutSubtitle = defaultSettings.aboutSubtitle;
        settings.aboutDescription = defaultSettings.aboutDescription;
        settings.aboutImage = defaultSettings.aboutImage;
        changed = true;
      }
      if (!settings.visionSanskrit) {
        settings.visionSanskrit = defaultSettings.visionSanskrit;
        settings.visionSubtitle = defaultSettings.visionSubtitle;
        settings.visionImage = defaultSettings.visionImage;
        changed = true;
      }
      if (!settings.themeBackground) {
        settings.themeBackground = defaultSettings.themeBackground;
        settings.themeSurface = defaultSettings.themeSurface;
        settings.themePrimary = defaultSettings.themePrimary;
        settings.themeAccent = defaultSettings.themeAccent;
        settings.themeText = defaultSettings.themeText;
        settings.baseFontSize = defaultSettings.baseFontSize;
        changed = true;
      }
      if (!settings.typography) {
        settings.typography = defaultSettings.typography;
        changed = true;
      }
      if (changed) {
        await settings.save();
      }
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ _id: "default", ...defaultSettings });
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const currentSettings = await Settings.findOne();

    if (body.heroImage && body.heroImage.startsWith("data:")) {
      if (currentSettings?.heroImagePublicId) {
        await deleteImage(currentSettings.heroImagePublicId).catch(() => {});
      }
      const { url, publicId } = await uploadImage(body.heroImage, "settings");
      body.heroImage = url;
      body.heroImagePublicId = publicId;
    }

    if (body.aboutImage && body.aboutImage.startsWith("data:")) {
      if (currentSettings?.aboutImagePublicId) {
        await deleteImage(currentSettings.aboutImagePublicId).catch(() => {});
      }
      const { url, publicId } = await uploadImage(body.aboutImage, "settings");
      body.aboutImage = url;
      body.aboutImagePublicId = publicId;
    }

    if (body.pillars && Array.isArray(body.pillars)) {
      for (let i = 0; i < body.pillars.length; i++) {
        const pillar = body.pillars[i];
        if (pillar.image && pillar.image.startsWith("data:")) {
          const oldPillar = currentSettings?.pillars?.[i];
          if (oldPillar?.imagePublicId) {
            await deleteImage(oldPillar.imagePublicId).catch(() => {});
          }
          const { url, publicId } = await uploadImage(pillar.image, "settings");
          pillar.image = url;
          pillar.imagePublicId = publicId;
        }
      }
    }

    if (body.visionImage && body.visionImage.startsWith("data:")) {
      if (currentSettings?.visionImagePublicId) {
        await deleteImage(currentSettings.visionImagePublicId).catch(() => {});
      }
      const { url, publicId } = await uploadImage(body.visionImage, "settings");
      body.visionImage = url;
      body.visionImagePublicId = publicId;
    }

    if (!currentSettings) {
      const newSettings = await Settings.create(body);
      return NextResponse.json(newSettings);
    }

    // Save current color state to history
    const historyEntry = {
      themeBackground: currentSettings.themeBackground,
      themeSurface: currentSettings.themeSurface,
      themePrimary: currentSettings.themePrimary,
      themeAccent: currentSettings.themeAccent,
      themeText: currentSettings.themeText,
      typography: JSON.parse(JSON.stringify(currentSettings.typography || {})),
      savedAt: new Date(),
    };

    if (!currentSettings.colorHistory) {
      currentSettings.colorHistory = [];
    }
    
    // Add to beginning and keep only last 20
    currentSettings.colorHistory.unshift(historyEntry);
    if (currentSettings.colorHistory.length > 20) {
      currentSettings.colorHistory = currentSettings.colorHistory.slice(0, 20);
    }

    // Use findOneAndUpdate to explicitly replace everything in the database
    // bypassing Mongoose's unreliable document .set() diffing for Mixed types.
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { 
        $set: { 
          ...body,
          colorHistory: currentSettings.colorHistory 
        } 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      { $set: { colorHistory: [] } },
      { new: true }
    );
    return NextResponse.json(updatedSettings);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}

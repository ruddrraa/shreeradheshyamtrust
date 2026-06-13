import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import Event from "@/models/Event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { title, description, date, lumaLink, banner } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Title, description, and date required" },
        { status: 400 }
      );
    }

    let bannerUrl = banner;
    let bannerPublicId;

    if (banner?.startsWith("data:")) {
      const uploaded = await uploadImage(banner, "events");
      bannerUrl = uploaded.url;
      bannerPublicId = uploaded.publicId;
    }

    const event = await Event.create({
      title,
      description,
      date,
      lumaLink,
      banner: bannerUrl,
      bannerPublicId,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Create failed" },
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
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const event = await Event.findById(id);

    if (event?.bannerPublicId) {
      await deleteImage(event.bannerPublicId);
    }

    await Event.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id, title, description, date, lumaLink, banner } = await req.json();

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const event = await Event.findById(id);
    if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let bannerUrl = event.banner;
    let bannerPublicId = event.bannerPublicId;

    if (banner && banner.startsWith("data:")) {
      const uploaded = await uploadImage(banner, "events");
      bannerUrl = uploaded.url;
      bannerPublicId = uploaded.publicId;

      if (event.bannerPublicId) {
        await deleteImage(event.bannerPublicId).catch(() => {});
      }
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    if (lumaLink !== undefined) event.lumaLink = lumaLink;
    event.banner = bannerUrl;
    event.bannerPublicId = bannerPublicId;

    await event.save();
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}

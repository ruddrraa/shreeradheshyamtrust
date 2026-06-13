import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import Video from "@/models/Video";

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 });
    return NextResponse.json(videos);
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
    const { title, youtubeUrl, thumbnail } = await req.json();

    if (!title || !youtubeUrl) {
      return NextResponse.json(
        { error: "Title and YouTube URL required" },
        { status: 400 }
      );
    }

    const video = await Video.create({ title, youtubeUrl, thumbnail });
    return NextResponse.json(video, { status: 201 });
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

    await Video.findByIdAndDelete(id);
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
    const { id, title, youtubeUrl, thumbnail } = await req.json();

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const video = await Video.findById(id);
    if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

    video.title = title || video.title;
    video.youtubeUrl = youtubeUrl || video.youtubeUrl;
    if (thumbnail !== undefined) video.thumbnail = thumbnail;

    await video.save();
    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}

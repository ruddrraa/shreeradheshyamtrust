import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
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
    const body = await req.json();
    const { image, category, caption } = body;

    if (!image || !category) {
      return NextResponse.json(
        { error: "Image and category required" },
        { status: 400 }
      );
    }

    const { url, publicId } = await uploadImage(image, "gallery");
    const galleryImage = await Gallery.create({
      url,
      publicId,
      category,
      caption,
    });

    return NextResponse.json(galleryImage, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
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
    const { id } = await req.json();
    const image = await Gallery.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteImage(image.publicId);
    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}

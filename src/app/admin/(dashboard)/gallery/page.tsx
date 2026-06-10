"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { GalleryImage, GalleryCategory } from "@/types";
import { Trash2 } from "lucide-react";

const categories: { value: GalleryCategory; label: string }[] = [
  { value: "gau-seva", label: "Gau Seva" },
  { value: "sankirtan", label: "Sankirtan" },
  { value: "bhajan", label: "Bhajan Programs" },
  { value: "events", label: "Spiritual Events" },
];

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [category, setCategory] = useState<GalleryCategory>("gau-seva");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchImages() {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: reader.result,
            category,
            caption,
          }),
        });

        if (!res.ok) throw new Error("Upload failed");
        setCaption("");
        setMessage("Image uploaded successfully");
        fetchImages();
      } catch {
        setMessage("Failed to upload image");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image?")) return;
    await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchImages();
  }

  return (
    <div>
      <AdminHeader
        title="Gallery Management"
        description="Upload and categorize gallery images"
      />

      <div className="p-6 bg-white border border-charcoal/5 mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              placeholder="Image caption"
            />
          </div>
        </div>

        <label className="inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={loading}
          />
          <span className="inline-flex items-center px-6 py-3 text-sm bg-charcoal text-ivory cursor-pointer hover:bg-charcoal/90 transition-colors">
            {loading ? "Uploading..." : "Upload Image"}
          </span>
        </label>

        {message && (
          <p className="mt-4 text-sm text-charcoal/60">{message}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group border border-charcoal/5 bg-white"
          >
            <div className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.caption || "Gallery"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal/40">
                  {img.category}
                </p>
                {img.caption && (
                  <p className="text-sm text-charcoal/70 mt-1">{img.caption}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(img._id)}
                className="p-2 text-charcoal/40 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

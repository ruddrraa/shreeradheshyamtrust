"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { GalleryImage, GalleryCategory } from "@/types";
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

const categories: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filters & Pagination state
  const [filterCategory, setFilterCategory] = useState<GalleryCategory | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

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
    if (!file && !editingId) return;

    setLoading(true);
    setMessage("");

    const processUpload = async (base64Image?: string) => {
      try {
        const url = "/api/gallery";
        const method = editingId ? "PUT" : "POST";
        const body = {
          category,
          caption,
          ...(base64Image && { image: base64Image }),
          ...(editingId && { id: editingId }),
        };

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Upload failed");
        resetForm();
        setMessage(`Image ${editingId ? "updated" : "uploaded"} successfully`);
        fetchImages();
      } catch {
        setMessage(`Failed to ${editingId ? "update" : "upload"} image`);
      } finally {
        setLoading(false);
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => processUpload(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      processUpload();
    }
  }

  function handleEdit(img: GalleryImage) {
    setEditingId(img._id);
    setCategory(img.category as GalleryCategory);
    setCaption(img.caption || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setCategory("gau-seva");
    setCaption("");
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    await fetch(`/api/gallery?id=${deleteId}`, {
      method: "DELETE",
    });
    setDeleteId(null);
    fetchImages();
  }

  // Derived state
  const filteredAndSortedImages = useMemo(() => {
    let result = [...images];
    if (filterCategory !== "all") {
      result = result.filter((img) => img.category === filterCategory);
    }
    result.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return result;
  }, [images, filterCategory, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedImages.length / itemsPerPage);
  const currentImages = filteredAndSortedImages.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filterCategory, sortOrder]);

  return (
    <div>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Media"
        message="Are you sure you want to delete this media item? It will be permanently removed from the gallery."
      />
      
      <AdminHeader
        title="Gallery Management"
        description="Upload and categorize gallery images"
      />

      <div className="p-6 bg-white border border-charcoal/5 mb-8">
        <h2 className="text-sm font-medium text-charcoal mb-4">
          {editingId ? "Edit Media" : "Upload New Media"}
        </h2>
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
              {categories.filter(c => c.value !== "all").map((c) => (
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

        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-block">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              className="hidden"
              disabled={loading}
            />
            <span className="inline-flex items-center px-6 py-3 text-sm bg-charcoal text-ivory cursor-pointer hover:bg-charcoal/90 transition-colors">
              {loading ? "Processing..." : (editingId ? "Update File" : "Upload Media")}
            </span>
          </label>
          
          {editingId && (
            <>
              <button
                onClick={() => handleUpload({ target: { files: null } } as any)}
                disabled={loading}
                className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
              >
                Save Details Only
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 text-sm border border-charcoal/15 text-charcoal hover:bg-charcoal/5 transition-colors"
              >
                Cancel Edit
              </button>
            </>
          )}
        </div>

        {message && (
          <p className="mt-4 text-sm text-charcoal/60">{message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-4 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {currentImages.map((img) => (
          <div
            key={img._id}
            className="relative group border border-charcoal/5 bg-white break-inside-avoid"
          >
            <div className="relative w-full overflow-hidden">
              {img.url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                <video
                  src={img.url}
                  className="w-full h-auto object-cover"
                  controls
                  preload="metadata"
                />
              ) : (
                <img
                  src={img.url}
                  alt={img.caption || "Gallery media"}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              )}
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal/40">
                  {img.category}
                </p>
                {img.caption && (
                  <p className="text-sm text-charcoal/70 mt-1">{img.caption}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(img)}
                  className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                  title="Edit image details"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setDeleteId(img._id)}
                  className="p-2 text-charcoal/40 hover:text-red-600 transition-colors"
                  title="Delete image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border border-charcoal/15 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-charcoal/60">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border border-charcoal/15 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

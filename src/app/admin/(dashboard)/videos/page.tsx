"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getYouTubeThumbnail } from "@/lib/utils";
import type { Video } from "@/types";
import { Trash2, Edit } from "lucide-react";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function fetchVideos() {
    const res = await fetch("/api/videos");
    setVideos(await res.json());
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVideos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = "/api/videos";
      const method = editingId ? "PUT" : "POST";
      const body = {
        title,
        youtubeUrl,
        ...(editingId && { id: editingId }),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");
      resetForm();
      setMessage(`Video ${editingId ? "updated" : "added"} successfully`);
      fetchVideos();
    } catch {
      setMessage(`Failed to ${editingId ? "update" : "add"} video`);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setYoutubeUrl("");
    setEditingId(null);
  }

  function handleEdit(video: Video) {
    setEditingId(video._id);
    setTitle(video.title);
    setYoutubeUrl(video.youtubeUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    await fetch(`/api/videos?id=${deleteId}`, {
      method: "DELETE",
    });
    setDeleteId(null);
    fetchVideos();
  }

  return (
    <div>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone and it will be permanently removed from the website."
      />
      
      <AdminHeader
        title="Video Management"
        description="Add YouTube videos to display on the website"
      />

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white border border-charcoal/5 mb-8 space-y-4"
      >
        <div>
          <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
            YouTube URL
          </label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
            placeholder="https://youtube.com/watch?v=..."
            className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Video" : "Add Video")}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 text-sm border border-charcoal/15 text-charcoal hover:bg-charcoal/5 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
        {message && <p className="text-sm text-charcoal/60">{message}</p>}
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="border border-charcoal/5 bg-white">
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail || getYouTubeThumbnail(video.youtubeUrl)}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-start gap-4">
              <div>
                <p className="text-sm font-medium text-charcoal">{video.title}</p>
                <p className="text-xs text-charcoal/40 mt-1 truncate">
                  {video.youtubeUrl}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(video)}
                  className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                  title="Edit video"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setDeleteId(video._id)}
                  className="p-2 text-charcoal/40 hover:text-red-600 transition-colors"
                  title="Delete video"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

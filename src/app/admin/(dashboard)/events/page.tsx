"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";
import { Trash2, Edit } from "lucide-react";

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [lumaLink, setLumaLink] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchEvents() {
    const res = await fetch("/api/events");
    setEvents(await res.json());
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBanner(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = "/api/events";
      const method = editingId ? "PUT" : "POST";
      const body = {
        title,
        description,
        date,
        lumaLink,
        banner,
        ...(editingId && { id: editingId }),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed");
      resetForm();
      setMessage(`Event ${editingId ? "updated" : "created"} successfully`);
      fetchEvents();
    } catch {
      setMessage(`Failed to ${editingId ? "update" : "create"} event`);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setDate("");
    setLumaLink("");
    setBanner(null);
    setEditingId(null);
  }

  function handleEdit(event: Event) {
    setEditingId(event._id);
    setTitle(event.title);
    setDescription(event.description);
    // Format date for datetime-local input (YYYY-MM-DDTHH:mm)
    const d = new Date(event.date);
    const tzOffset = d.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
    setDate(localISOTime);
    setLumaLink(event.lumaLink || "");
    setBanner(null); // Keep null to not re-upload unless changed
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events?id=${id}`, {
      method: "DELETE",
    });
    fetchEvents();
  }

  return (
    <div>
      <AdminHeader
        title="Event Management"
        description="Create and manage upcoming events and webinars"
      />

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white border border-charcoal/5 mb-8 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
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
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Luma Registration Link
            </label>
            <input
              type="url"
              value={lumaLink}
              onChange={(e) => setLumaLink(e.target.value)}
              placeholder="https://lu.ma/..."
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
          >
            {loading ? (editingId ? "Updating..." : "Creating...") : (editingId ? "Update Event" : "Create Event")}
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

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex gap-6 p-4 bg-white border border-charcoal/5"
          >
            {event.banner && (
              <div className="relative w-40 h-24 shrink-0">
                <Image
                  src={event.banner}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs text-charcoal/40">{formatDate(event.date)}</p>
              <p className="font-medium text-charcoal mt-1">{event.title}</p>
              <p className="text-sm text-charcoal/60 mt-1 line-clamp-2">
                {event.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0 self-start">
              <button
                onClick={() => handleEdit(event)}
                className="p-2 text-charcoal/40 hover:text-charcoal transition-colors"
                title="Edit event"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="p-2 text-charcoal/40 hover:text-red-600 transition-colors"
                title="Delete event"
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

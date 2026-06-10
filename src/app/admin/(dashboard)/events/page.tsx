"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";
import { Trash2 } from "lucide-react";

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [lumaLink, setLumaLink] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          lumaLink,
          banner,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setTitle("");
      setDescription("");
      setDate("");
      setLumaLink("");
      setBanner(null);
      setMessage("Event created successfully");
      fetchEvents();
    } catch {
      setMessage("Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
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

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
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
            <button
              onClick={() => handleDelete(event._id)}
              className="p-2 text-charcoal/40 hover:text-red-600 shrink-0 self-start"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

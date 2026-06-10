"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { SiteSettings } from "@/types";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then(setSettings);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed");
      setMessage("Settings saved successfully");
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  if (!settings) {
    return (
      <div>
        <AdminHeader title="Website Settings" />
        <p className="text-charcoal/50">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Website Settings"
        description="Manage hero content, contact info, and impact statistics"
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-8 max-w-2xl"
      >
        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Hero Section</h2>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Title
            </label>
            <input
              type="text"
              value={settings.heroTitle}
              onChange={(e) =>
                setSettings({ ...settings, heroTitle: e.target.value })
              }
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Subtitle
            </label>
            <textarea
              value={settings.heroSubtitle}
              onChange={(e) =>
                setSettings({ ...settings, heroSubtitle: e.target.value })
              }
              rows={2}
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
              Hero Image URL
            </label>
            <input
              type="url"
              value={settings.heroImage}
              onChange={(e) =>
                setSettings({ ...settings, heroImage: e.target.value })
              }
              className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
            />
          </div>
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Contact</h2>
          {(
            [
              ["contactEmail", "Email"],
              ["contactPhone", "Phone"],
              ["address", "Address"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                {label}
              </label>
              <input
                type="text"
                value={settings[key]}
                onChange={(e) =>
                  setSettings({ ...settings, [key]: e.target.value })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
          ))}
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Social Links</h2>
          {(
            [
              ["facebook", "Facebook"],
              ["instagram", "Instagram"],
              ["youtube", "YouTube"],
              ["whatsapp", "WhatsApp"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                {label}
              </label>
              <input
                type="url"
                value={settings.socialLinks[key] ?? ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: {
                      ...settings.socialLinks,
                      [key]: e.target.value,
                    },
                  })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
          ))}
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Impact Statistics</h2>
          {(
            [
              ["gauSeva", "Gau Seva Initiatives"],
              ["spiritualPrograms", "Spiritual Programs"],
              ["sankirtanGatherings", "Sankirtan Gatherings"],
              ["devoteesReached", "Devotees Reached"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                {label}
              </label>
              <input
                type="number"
                value={settings.impactStats[key]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    impactStats: {
                      ...settings.impactStats,
                      [key]: Number(e.target.value),
                    },
                  })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
          ))}
        </section>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
        {message && <p className="text-sm text-charcoal/60">{message}</p>}
      </form>
    </div>
  );
}

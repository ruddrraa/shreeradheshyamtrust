"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TypographyControl } from "@/components/admin/TypographyControl";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import type { SiteSettings, SectionTypography } from "@/types";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((res) => res.json())
      .then(setSettings);
  }, []);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldPath: (val: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => fieldPath(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setLoading(true);
    setMessage("Saving to Cloudinary...");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setSettings(updated);
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setLoading(false);
    }
  }

  async function handleClearHistory() {
    if (!settings) return;
    
    setLoading(true);
    setMessage("Clearing history...");
    
    try {
      const res = await fetch("/api/settings", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setSettings(updated);
      setMessage("History cleared successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to clear history");
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

  // Helper to extract typography colors for the history view
  const extractTypographyColors = (typography: any) => {
    if (!typography) return [];
    const colors = new Set<string>();
    const traverse = (obj: any) => {
      if (!obj) return;
      if (typeof obj === "object") {
        if (obj.color && typeof obj.color === "string") {
          colors.add(obj.color);
        }
        Object.values(obj).forEach(traverse);
      }
    };
    traverse(typography);
    return Array.from(colors);
  };

  return (
    <div>
      <ConfirmModal
        isOpen={showClearHistoryConfirm}
        onClose={() => setShowClearHistoryConfirm(false)}
        onConfirm={handleClearHistory}
        title="Clear Color History"
        message="Are you sure you want to clear the color revision history? This will permanently delete all previously saved color palettes and cannot be undone."
      />

      <AdminHeader
        title="Website Settings"
        description="Manage hero content, about section, pillars, contact info, and impact statistics"
      />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-28">
        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Theme & Styling (Global)</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themeBackground || "#f5f0e8"}
                  onChange={(e) => setSettings({ ...settings, themeBackground: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-charcoal/60">{settings.themeBackground}</span>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Surface Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themeSurface || "#faf7f2"}
                  onChange={(e) => setSettings({ ...settings, themeSurface: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-charcoal/60">{settings.themeSurface}</span>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Primary Color (Maroon)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themePrimary || "#6a3024"}
                  onChange={(e) => setSettings({ ...settings, themePrimary: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-charcoal/60">{settings.themePrimary}</span>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Accent Color (Gold)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themeAccent || "#c2a15e"}
                  onChange={(e) => setSettings({ ...settings, themeAccent: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-charcoal/60">{settings.themeAccent}</span>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Text Color (Charcoal)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.themeText || "#1c1a18"}
                  onChange={(e) => setSettings({ ...settings, themeText: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                />
                <span className="text-sm text-charcoal/60">{settings.themeText}</span>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Base Font Size (px)
              </label>
              <input
                type="number"
                min={12}
                max={24}
                value={settings.baseFontSize || 16}
                onChange={(e) => setSettings({ ...settings, baseFontSize: parseInt(e.target.value) || 16 })}
                className="w-full border border-charcoal/15 px-3 py-1.5 text-sm bg-transparent"
              />
            </div>
          </div>
          <TypographyControl
            label="Global Theme"
            value={settings.typography?.global}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), global: val },
              })
            }
          />
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Hero Section</h2>
          <div className="grid sm:grid-cols-2 gap-4">
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
                Hero Image
              </label>
              <div className="flex items-center gap-4">
                {settings.heroImage && (
                  <img src={settings.heroImage} alt="hero" className="h-10 w-16 object-cover" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (val) => setSettings({ ...settings, heroImage: val }))
                  }
                  className="text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
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
          </div>
          <TypographyControl
            label="Hero"
            value={settings.typography?.hero}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), hero: val },
              })
            }
          />
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Our Story (About)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                About Title
              </label>
              <input
                type="text"
                value={settings.aboutTitle}
                onChange={(e) =>
                  setSettings({ ...settings, aboutTitle: e.target.value })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                About Subtitle
              </label>
              <input
                type="text"
                value={settings.aboutSubtitle}
                onChange={(e) =>
                  setSettings({ ...settings, aboutSubtitle: e.target.value })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                About Image
              </label>
              <div className="flex items-center gap-4">
                {settings.aboutImage && (
                  <img src={settings.aboutImage} alt="about" className="h-10 w-16 object-cover" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (val) => setSettings({ ...settings, aboutImage: val }))
                  }
                  className="text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                About Description
              </label>
              <textarea
                value={settings.aboutDescription}
                onChange={(e) =>
                  setSettings({ ...settings, aboutDescription: e.target.value })
                }
                rows={4}
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none"
              />
            </div>
          </div>
          <TypographyControl
            label="About"
            value={settings.typography?.about}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), about: val },
              })
            }
          />
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-8">
          <h2 className="font-heading text-lg text-charcoal">Three Pillars of Devotion</h2>
          {settings.pillars?.map((pillar, index) => (
            <div key={index} className="space-y-4 border-b border-charcoal/10 pb-6 last:border-0 last:pb-0">
              <h3 className="text-sm font-medium text-charcoal">Pillar {index + 1}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const newPillars = [...settings.pillars];
                      newPillars[index].title = e.target.value;
                      setSettings({ ...settings, pillars: newPillars });
                    }}
                    className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => {
                      const newPillars = [...settings.pillars];
                      newPillars[index].subtitle = e.target.value;
                      setSettings({ ...settings, pillars: newPillars });
                    }}
                    className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">Pillar Image</label>
                  <div className="flex items-center gap-4">
                    {pillar.image && (
                      <img src={pillar.image} alt="pillar" className="h-10 w-10 object-cover" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, (val) => {
                          const newPillars = [...settings.pillars];
                          newPillars[index].image = val;
                          setSettings({ ...settings, pillars: newPillars });
                        })
                      }
                      className="text-sm max-w-[200px]"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">Description</label>
                  <textarea
                    value={pillar.description}
                    onChange={(e) => {
                      const newPillars = [...settings.pillars];
                      newPillars[index].description = e.target.value;
                      setSettings({ ...settings, pillars: newPillars });
                    }}
                    rows={2}
                    className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
          <TypographyControl
            label="Pillars"
            value={settings.typography?.pillars}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), pillars: val },
              })
            }
          />
        </section>

        <section className="p-6 bg-white border border-charcoal/5 space-y-4">
          <h2 className="font-heading text-lg text-charcoal">Our Vision</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Vision Sanskrit Quote
              </label>
              <textarea
                value={settings.visionSanskrit || ""}
                onChange={(e) =>
                  setSettings({ ...settings, visionSanskrit: e.target.value })
                }
                rows={2}
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none font-devanagari"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Vision Subtitle / Translation
              </label>
              <textarea
                value={settings.visionSubtitle || ""}
                onChange={(e) =>
                  setSettings({ ...settings, visionSubtitle: e.target.value })
                }
                rows={2}
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent resize-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                Vision Background Image
              </label>
              <div className="flex items-center gap-4">
                {settings.visionImage && (
                  <img src={settings.visionImage} alt="vision" className="h-10 w-16 object-cover" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (val) => setSettings({ ...settings, visionImage: val }))
                  }
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          <TypographyControl
            label="Vision"
            value={settings.typography?.vision}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), vision: val },
              })
            }
          />
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
                value={settings[key as keyof SiteSettings] as string}
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
                value={settings.socialLinks?.[key as keyof typeof settings.socialLinks] ?? ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: {
                      ...(settings.socialLinks || {}),
                      [key]: e.target.value,
                    },
                  })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
          ))}
          <TypographyControl
            label="Contact & Social"
            value={settings.typography?.contact}
            onChange={(val) =>
              setSettings({
                ...settings,
                typography: { ...(settings.typography || {}), contact: val },
              })
            }
          />
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
                value={settings.impactStats?.[key as keyof typeof settings.impactStats] ?? 0}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    impactStats: {
                      ...(settings.impactStats || {}),
                      [key]: Number(e.target.value),
                    },
                  })
                }
                className="w-full border border-charcoal/15 px-3 py-2 text-sm bg-transparent"
              />
            </div>
          ))}
        </section>

        {settings.colorHistory && settings.colorHistory.length > 0 && (
          <section className="p-6 bg-white border border-charcoal/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg text-charcoal">Color Revision History</h2>
                <p className="text-xs text-charcoal/60 mt-1">
                  A log of previous theme colors saved to the database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowClearHistoryConfirm(true)}
                disabled={loading}
                className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition-colors"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-3 mt-4">
              {settings.colorHistory.map((history, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-charcoal/10 pb-3 last:border-0 last:pb-0 gap-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {new Date(history.savedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2 pr-3 border-r border-charcoal/10">
                      {history.themeBackground && (
                        <div className="w-6 h-6 rounded-full border border-charcoal/10" style={{ backgroundColor: history.themeBackground }} title={`Background: ${history.themeBackground}`} />
                      )}
                      {history.themeSurface && (
                        <div className="w-6 h-6 rounded-full border border-charcoal/10" style={{ backgroundColor: history.themeSurface }} title={`Surface: ${history.themeSurface}`} />
                      )}
                      {history.themePrimary && (
                        <div className="w-6 h-6 rounded-full border border-charcoal/10" style={{ backgroundColor: history.themePrimary }} title={`Primary: ${history.themePrimary}`} />
                      )}
                      {history.themeAccent && (
                        <div className="w-6 h-6 rounded-full border border-charcoal/10" style={{ backgroundColor: history.themeAccent }} title={`Accent: ${history.themeAccent}`} />
                      )}
                      {history.themeText && (
                        <div className="w-6 h-6 rounded-full border border-charcoal/10" style={{ backgroundColor: history.themeText }} title={`Text: ${history.themeText}`} />
                      )}
                    </div>
                    {extractTypographyColors(history.typography).length > 0 && (
                      <div className="flex gap-1.5 flex-wrap max-w-[120px]">
                        {extractTypographyColors(history.typography).map((color, i) => (
                          <div key={i} className="w-4 h-4 rounded-full border border-charcoal/10" style={{ backgroundColor: color }} title={`Typography Color: ${color}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </form>

      <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white border-t border-charcoal/10 p-4 md:px-8 flex flex-col sm:flex-row items-center justify-between z-30">
        <p className="text-sm font-medium text-green-700 mb-2 sm:mb-0">{message}</p>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Processing Uploads..." : "Save All Settings"}
        </button>
      </div>
    </div>
  );
}

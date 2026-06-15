import React from "react";
import type { SectionTypography } from "@/types";

type Props = {
  label: string;
  value: SectionTypography | undefined;
  onChange: (val: SectionTypography) => void;
};

const FONT_OPTIONS = [
  { label: "Default Theme", value: "" },
  { label: "Inter (Body)", value: "var(--font-inter), sans-serif" },
  { label: "Bodoni Moda (Display)", value: "var(--font-bodoni), serif" },
  { label: "Cormorant Garamond (Heading)", value: "var(--font-cormorant), serif" },
  { label: "Yatra One (Decorative)", value: "var(--font-yatra), cursive" },
  { label: "Marcellus (Elegant)", value: "var(--font-marcellus), serif" },
];

export const TypographyControl = React.memo(function TypographyControl({ label, value, onChange }: Props) {
  const updateField = (
    element: "overhead" | "heading" | "subheading" | "body",
    field: "fontSize" | "color" | "fontFamily",
    newVal: string | number
  ) => {
    onChange({
      ...value,
      [element]: {
        ...(value?.[element] || {}),
        [field]: newVal,
      },
    });
  };

  return (
    <div className="mt-6 border border-charcoal/10 rounded p-4 bg-charcoal/5 space-y-4">
      <h3 className="text-sm font-medium text-charcoal">{label} Typography</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Overhead */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-charcoal/60 block">
            Overhead / Caption
          </label>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Font Family</label>
            <select
              value={value?.overhead?.fontFamily || ""}
              onChange={(e) => updateField("overhead", "fontFamily", e.target.value)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value?.overhead?.color || "#000000"}
                onChange={(e) => updateField("overhead", "color", e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-xs text-charcoal/60">
                {value?.overhead?.color || "Default"}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Size (px)</label>
            <input
              type="number"
              placeholder="Default"
              value={value?.overhead?.fontSize || ""}
              onChange={(e) => updateField("overhead", "fontSize", parseInt(e.target.value) || 0)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-charcoal/60 block">
            Heading
          </label>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Font Family</label>
            <select
              value={value?.heading?.fontFamily || ""}
              onChange={(e) => updateField("heading", "fontFamily", e.target.value)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value?.heading?.color || "#000000"}
                onChange={(e) => updateField("heading", "color", e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-xs text-charcoal/60">
                {value?.heading?.color || "Default"}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Size (px)</label>
            <input
              type="number"
              placeholder="Default"
              value={value?.heading?.fontSize || ""}
              onChange={(e) => updateField("heading", "fontSize", parseInt(e.target.value) || 0)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            />
          </div>
        </div>

        {/* Subheading */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-charcoal/60 block">
            Subtitle / Subheading
          </label>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Font Family</label>
            <select
              value={value?.subheading?.fontFamily || ""}
              onChange={(e) => updateField("subheading", "fontFamily", e.target.value)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value?.subheading?.color || "#000000"}
                onChange={(e) => updateField("subheading", "color", e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-xs text-charcoal/60">
                {value?.subheading?.color || "Default"}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Size (px)</label>
            <input
              type="number"
              placeholder="Default"
              value={value?.subheading?.fontSize || ""}
              onChange={(e) => updateField("subheading", "fontSize", parseInt(e.target.value) || 0)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            />
          </div>
        </div>

        {/* Body */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-charcoal/60 block">
            Body
          </label>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Font Family</label>
            <select
              value={value?.body?.fontFamily || ""}
              onChange={(e) => updateField("body", "fontFamily", e.target.value)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            >
              {FONT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value?.body?.color || "#000000"}
                onChange={(e) => updateField("body", "color", e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-xs text-charcoal/60">
                {value?.body?.color || "Default"}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-charcoal/40 block mb-1">Size (px)</label>
            <input
              type="number"
              placeholder="Default"
              value={value?.body?.fontSize || ""}
              onChange={(e) => updateField("body", "fontSize", parseInt(e.target.value) || 0)}
              className="w-full border border-charcoal/15 px-2 py-1 text-xs bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value) && prevProps.label === nextProps.label;
});

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SacredImage } from "@/components/ui/SacredImage";
import { cn } from "@/lib/utils";
import type { GalleryImage, GalleryCategory } from "@/types";

const categories: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gau-seva", label: "Gau Seva" },
  { value: "sankirtan", label: "Sankirtan" },
  { value: "bhajan", label: "Bhajan" },
  { value: "events", label: "Events" },
];

interface GalleryProps {
  images: GalleryImage[];
  typography?: import("@/types").SectionTypography;
}

export function Gallery({ images, typography }: GalleryProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const filtered =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="py-32 lg:py-52 bg-background">
      <Container wide>
        <SectionHeader
          label="Moments of Grace"
          title="Gallery"
          subtitle="Sacred glimpses from our seva, sankirtan, and spiritual gatherings."
          typography={typography}
        />

        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={cn(
                "px-7 py-3 text-[10px] uppercase tracking-[0.22em] transition-all duration-500 rounded-full font-medium",
                filter === cat.value
                  ? "bg-gold text-white shadow-gold-glow"
                  : "text-muted hover:text-gold border border-deep-brown/8 hover:border-gold/40"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-20 columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((image, i) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelected(image)}
              >
                <div className="museum-frame relative overflow-hidden">
                  {image.url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                    <video
                      src={image.url}
                      className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      style={{ width: "100%", height: "auto" }}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  ) : (
                    <SacredImage
                      src={image.url}
                      alt={image.caption || "Gallery image"}
                      width={720}
                      height={i % 3 === 0 ? 960 : i % 3 === 1 ? 600 : 780}
                      className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                  <div className="absolute inset-0 z-[4] bg-charcoal/0 group-hover:bg-charcoal/12 transition-colors duration-700" />
                  {image.caption && (
                    <p className="absolute bottom-0 left-0 right-0 z-[5] p-7 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-charcoal/75 to-transparent font-light tracking-wide">
                      {image.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[70] bg-charcoal/94 backdrop-blur-2xl flex items-center justify-center p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.url.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                <video
                  src={selected.url}
                  className="w-full h-auto max-h-[90vh] object-contain sacred-image rounded-sm"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={selected.url}
                  alt={selected.caption || "Gallery image"}
                  width={1600}
                  height={1000}
                  className="w-full h-auto max-h-[90vh] object-contain sacred-image rounded-sm"
                />
              )}
              {selected.caption && (
                <p className="mt-6 text-center text-white/75 text-sm font-light tracking-[0.12em] uppercase">
                  {selected.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

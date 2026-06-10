"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import type { GalleryImage, GalleryCategory } from "@/types";

const categories: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "gau-seva", label: "Gau Seva" },
  { value: "sankirtan", label: "Sankirtan" },
  { value: "bhajan", label: "Bhajan Programs" },
  { value: "events", label: "Spiritual Events" },
];

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const filtered =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="py-24 lg:py-40 bg-ivory">
      <Container>
        <SectionHeader
          label="Moments of Grace"
          title="Gallery"
          subtitle="Sacred glimpses from our seva, sankirtan, and spiritual gatherings."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={cn(
                "px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all duration-300 border",
                filter === cat.value
                  ? "bg-charcoal text-ivory border-charcoal"
                  : "bg-transparent text-charcoal/60 border-charcoal/15 hover:border-charcoal/30"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((image, i) => (
              <motion.div
                key={image._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelected(image)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.caption || "Gallery image"}
                    width={600}
                    height={i % 3 === 0 ? 800 : i % 3 === 1 ? 500 : 650}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
                  {image.caption && (
                    <p className="absolute bottom-0 left-0 right-0 p-4 text-sm text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-charcoal/60">
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
            className="fixed inset-0 z-[70] bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.url}
                alt={selected.caption || "Gallery image"}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              {selected.caption && (
                <p className="mt-4 text-center text-ivory/80 text-sm">
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

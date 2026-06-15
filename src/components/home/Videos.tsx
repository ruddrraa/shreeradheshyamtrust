"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils";
import type { Video } from "@/types";

interface VideosProps {
  videos: Video[];
  typography?: import("@/types").SectionTypography;
}

export function Videos({ videos, typography }: VideosProps) {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  if (videos.length === 0) return null;

  return (
    <section className="py-32 lg:py-52 bg-white">
      <Container wide>
        <SectionHeader
          label="Watch & Reflect"
          title="Spiritual Videos"
          subtitle="Satsang recordings, bhajans, and divine discourses from our gatherings."
          typography={typography}
        />

        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {videos.map((video, i) => {
            const videoId = getYouTubeId(video.youtubeUrl);
            const thumbnail =
              video.thumbnail || getYouTubeThumbnail(video.youtubeUrl);

            return (
              <FadeIn key={video._id} delay={i * 0.12}>
                <button
                  onClick={() => {
                    if (videoId) setSelectedVideoId(videoId);
                    else window.open(video.youtubeUrl, "_blank");
                  }}
                  className="group block w-full text-left"
                >
                  <div className="museum-frame relative aspect-video overflow-hidden">
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover sacred-image transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 z-[3] bg-charcoal/18 group-hover:bg-charcoal/32 transition-colors duration-700" />
                    <div className="absolute inset-0 z-[4] flex items-center justify-center">
                      <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-white/15 backdrop-blur-lg border border-gold-light/40 flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:border-gold-light/70">
                        <Play
                          size={20}
                          className="text-white ml-0.5"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 
                    className="mt-7 font-heading text-2xl text-deep-brown font-light group-hover:text-gold transition-colors duration-500"
                    style={{
                      fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
                      color: typography?.heading?.color || undefined,
                      fontFamily: typography?.heading?.fontFamily || undefined,
                    }}
                  >
                    {video.title}
                  </h3>
                  {videoId && (
                    <p 
                      className="mt-2 text-[10px] text-muted uppercase tracking-[0.22em] font-medium"
                      style={{
                        fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
                        color: typography?.subheading?.color || undefined,
                        fontFamily: typography?.subheading?.fontFamily || undefined,
                      }}
                    >
                      Watch Now
                    </p>
                  )}
                </button>
              </FadeIn>
            );
          })}
        </div>
      </Container>

      <AnimatePresence>
        {selectedVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-charcoal/94 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedVideoId(null)}
          >
            <button
              onClick={() => setSelectedVideoId(null)}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

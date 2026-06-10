"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/utils";
import type { Video } from "@/types";

interface VideosProps {
  videos: Video[];
}

export function Videos({ videos }: VideosProps) {
  if (videos.length === 0) return null;

  return (
    <section className="py-24 lg:py-40 bg-charcoal">
      <Container>
        <SectionHeader
          label="Watch & Reflect"
          title="Spiritual Videos"
          subtitle="Satsang recordings, bhajans, and divine discourses from our gatherings."
          dark
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => {
            const videoId = getYouTubeId(video.youtubeUrl);
            const thumbnail =
              video.thumbnail || getYouTubeThumbnail(video.youtubeUrl);

            return (
              <FadeIn key={video._id} delay={i * 0.1}>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden bg-charcoal/50">
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-500" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-ivory/20 backdrop-blur-md border border-ivory/30 flex items-center justify-center">
                        <Play
                          size={20}
                          className="text-ivory ml-1"
                          fill="currentColor"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <h3 className="mt-4 font-heading text-xl text-ivory font-light group-hover:text-gold transition-colors">
                    {video.title}
                  </h3>
                  {videoId && (
                    <p className="mt-1 text-xs text-ivory/40 uppercase tracking-wider">
                      Watch on YouTube
                    </p>
                  )}
                </a>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

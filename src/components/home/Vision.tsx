"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SacredImage } from "@/components/ui/SacredImage";
import { siteImages } from "@/lib/images";

import type { SectionTypography } from "@/types";

interface VisionProps {
  sanskrit: string;
  subtitle: string;
  image: string;
  typography?: SectionTypography;
}

export function Vision({ sanskrit, subtitle, image, typography }: VisionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.35, 0.65, 0.65, 0.35]
  );

  return (
    <section
      ref={ref}
      className="relative py-40 lg:py-64 overflow-hidden bg-maroon"
    >
      <motion.div
        style={{ y, opacity, willChange: "transform, opacity" }}
        className="absolute inset-0"
      >
        <SacredImage
          src={image}
          alt="Our vision of devotion - Shree Radhe Shyam Bhakti Sarover Trust"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 z-[3] bg-maroon/88" />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 50%, rgb(194 161 94 / 0.14), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-[11px] uppercase tracking-[0.42em] text-gold-light mb-14"
        >
          Our Vision
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-devanagari text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.3] text-white tracking-wide"
          style={{
            fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
            color: typography?.heading?.color || undefined,
            fontFamily: typography?.heading?.fontFamily || undefined,
          }}
        >
          {sanskrit}
        </motion.blockquote>

        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 text-lg sm:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed"
            style={{
              fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
              color: typography?.subheading?.color || undefined,
              fontFamily: typography?.subheading?.fontFamily || undefined,
            }}
          >
            {subtitle}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="luxe-divider" aria-hidden />
          <p className="font-devanagari text-lg text-gold-light/90 tracking-wide">
            Serving Gau Mata · Spreading Divine Love · Inspiring Devotion
          </p>
        </motion.div>
      </div>
    </section>
  );
}

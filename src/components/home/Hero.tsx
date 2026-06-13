"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SacredImage } from "@/components/ui/SacredImage";

import type { SectionTypography } from "@/types";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  typography?: SectionTypography;
}

export function Hero({ image, title, subtitle, typography }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[100dvh] overflow-hidden hero-grain"
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <SacredImage
          src={image}
          alt="Sacred devotion — Gau Seva, Bhakti, and spiritual gathering"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Cinematic Vrindavan overlays */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-charcoal/50 via-deep-brown/25 to-deep-brown/70" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 42%, rgb(245 240 232 / 0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 z-[3] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 100%, rgb(194 161 94 / 0.15), transparent 55%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-[11px] uppercase tracking-[0.42em] font-medium"
          style={{
            color: typography?.overhead?.color || "#c2a15e", // gold-light
            fontSize: typography?.overhead?.fontSize ? `${typography.overhead.fontSize}px` : undefined,
          }}
        >
          Dedicated to Seva, Bhakti & Spiritual Enlightenment
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-white font-normal leading-[1.02] tracking-[-0.02em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.75rem] 2xl:text-[7.5rem] max-w-5xl mx-auto drop-shadow-lg"
          style={{
            fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
            color: typography?.heading?.color || undefined,
          }}
        >
          {title.includes("Bhakti Sarover Trust") ? (
            <>
              <span className="block">{title.replace("Bhakti Sarover Trust", "").trim()}</span>
              <span className="block text-gold-light mt-3 lg:mt-4 text-[0.8em]">Bhakti Sarover Trust</span>
            </>
          ) : (
            title
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 max-w-3xl text-base md:text-lg lg:text-xl font-light leading-[1.8] text-white/90 drop-shadow-md mx-auto"
          style={{
            fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
            color: typography?.subheading?.color || undefined,
          }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Button href="#donate" variant="primary" size="lg">
            Join Seva
          </Button>
          <Button href="#donate" variant="outline" size="lg">
            Support Our Mission
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.35 }}
          className="mt-14 font-devanagari text-base md:text-lg text-gold-light tracking-wide"
        >
          🙏 जय श्री राधे श्याम 🙏
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-white/35">
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-gold-light/70 to-transparent" />
      </motion.div>
    </section>
  );
}

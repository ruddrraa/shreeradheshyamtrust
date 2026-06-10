"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={ref}
      className="relative py-32 lg:py-48 overflow-hidden bg-maroon"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-10"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #C8A95A 0%, transparent 50%)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs uppercase tracking-[0.3em] text-gold mb-10"
        >
          Our Vision
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-snug text-ivory"
        >
          &ldquo;To create a spiritually awakened and compassionate society
          through Gau Seva, Bhakti, and the divine message of Shri Radha
          Krishna.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 font-devanagari text-gold/80"
        >
          Serving Gau Mata, Spreading Divine Love, Inspiring a Life of Devotion.
        </motion.p>
      </div>
    </section>
  );
}

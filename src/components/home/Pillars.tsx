"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SacredImage } from "@/components/ui/SacredImage";
import type { SectionTypography } from "@/types";

interface PillarProps {
  pillars: {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }[];
  typography?: SectionTypography;
}

export function Pillars({ pillars, typography }: PillarProps) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section id="pillars" className="py-32 lg:py-52 bg-surface">
      <Container wide>
        <SectionHeader
          label="Our Sacred Work"
          title="Three Pillars of Devotion"
          subtitle="Every initiative flows from our commitment to Gau Seva, spiritual wisdom, and the divine names of Shri Radha Krishna."
          typography={typography}
        />

        <div className="mt-24 grid md:grid-cols-3 gap-10 lg:gap-12">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar._id || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group luxury-card overflow-hidden transition-all duration-700 hover:-translate-y-3"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <SacredImage
                  src={pillar.image}
                  alt={`${pillar.title} - Shree Radhe Shyam Bhakti Sarover Trust Seva Pillar`}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 z-[4] bg-gradient-to-t from-charcoal/92 via-deep-brown/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 z-[5] p-9 lg:p-11">
                  <p 
                    className="text-[10px] uppercase tracking-[0.32em] text-gold-light mb-3"
                    style={{
                      fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
                      color: typography?.subheading?.color || undefined,
                      fontFamily: typography?.subheading?.fontFamily || undefined,
                    }}
                  >
                    {pillar.subtitle}
                  </p>
                  <h3 
                    className="font-heading text-3xl lg:text-[2.125rem] text-white font-light leading-[1.15]"
                    style={{
                      fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
                      color: typography?.heading?.color || undefined,
                      fontFamily: typography?.heading?.fontFamily || undefined,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p 
                    className="mt-5 text-sm leading-[1.75] text-white/72 font-light max-h-0 opacity-0 overflow-hidden group-hover:max-h-52 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      fontSize: typography?.body?.fontSize ? `${typography.body.fontSize}px` : undefined,
                      color: typography?.body?.color || undefined,
                      fontFamily: typography?.body?.fontFamily || undefined,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

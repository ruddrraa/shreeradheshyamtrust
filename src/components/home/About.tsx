"use client";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SacredImage } from "@/components/ui/SacredImage";
import { siteImages } from "@/lib/images";

import type { SectionTypography } from "@/types";

interface AboutProps {
  about: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  typography?: SectionTypography;
}

export function About({ about, typography }: AboutProps) {
  return (
    <section id="about" className="py-32 lg:py-52 bg-white">
      <Container wide>
        <div className="grid lg:grid-cols-12 gap-20 lg:gap-28 items-start">
          <FadeIn className="lg:col-span-5 lg:sticky lg:top-36">
            <p 
              className="text-[11px] uppercase tracking-[0.38em] text-gold mb-6"
              style={{
                fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
                color: typography?.subheading?.color || undefined,
                fontFamily: typography?.subheading?.fontFamily || undefined,
              }}
            >
              {about.subtitle}
            </p>
            <div className="luxe-divider mb-10" aria-hidden />
            <h2 
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-normal text-deep-brown leading-[1.04] tracking-[-0.02em]"
              style={{
                fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
                color: typography?.heading?.color || undefined,
                fontFamily: typography?.heading?.fontFamily || undefined,
              }}
            >
              {about.title}
            </h2>
          </FadeIn>

          <div className="lg:col-span-7 space-y-20">
            <FadeIn delay={0.1}>
              <div className="museum-frame relative aspect-[16/11] overflow-hidden">
                <SacredImage
                  src={about.image}
                  alt={`${about.title} - Shree Radhe Shyam Bhakti Sarover Trust`}
                  fill
                  className="object-cover transition-transform duration-[1.4s] hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6 max-w-2xl">
                {(about?.description || "").split("\n").map((para, i) => {
                  if (!para.trim()) return null;
                  if (i === 0) {
                    return (
                      <p 
                        key={i} 
                        className="font-heading text-2xl md:text-3xl leading-[1.55] text-charcoal font-light italic"
                        style={{
                          fontSize: typography?.body?.fontSize ? `${typography.body.fontSize}px` : undefined,
                          color: typography?.body?.color || undefined,
                          fontFamily: typography?.body?.fontFamily || undefined,
                        }}
                      >
                        {para}
                      </p>
                    );
                  }
                  return (
                    <p 
                      key={i} 
                      className="text-lg leading-[1.85] text-muted font-light"
                      style={{
                        fontSize: typography?.body?.fontSize ? `${typography.body.fontSize}px` : undefined,
                        color: typography?.body?.color || undefined,
                        fontFamily: typography?.body?.fontFamily || undefined,
                      }}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-2 gap-12 pt-8 border-t border-deep-brown/6">
                {[
                  { value: "Seva", desc: "Selfless service to Gau Mata" },
                  { value: "Bhakti", desc: "Devotion through sankirtan" },
                  { value: "Dharma", desc: "Value-based living" },
                  { value: "Karuna", desc: "Compassion for all beings" },
                ].map((item) => (
                  <div key={item.value}>
                    <p className="font-display text-3xl md:text-4xl text-maroon font-normal">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm text-muted tracking-wide font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

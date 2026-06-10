"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { testimonials } from "@/lib/defaults";

export function Testimonials() {
  return (
    <section className="py-24 lg:py-40 bg-ivory">
      <Container>
        <SectionHeader
          label="Voices of Devotion"
          title="What Devotees Say"
          subtitle="Stories of transformation through seva, bhakti, and spiritual fellowship."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.15}>
              <div className="h-full p-8 bg-white/60 backdrop-blur-md border border-charcoal/5 shadow-sm">
                <p className="font-heading text-5xl text-gold/30 leading-none">
                  &ldquo;
                </p>
                <p className="mt-4 text-charcoal/70 leading-relaxed font-light">
                  {t.quote}
                </p>
                <div className="mt-8 pt-6 border-t border-charcoal/5">
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal/40 mt-1">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

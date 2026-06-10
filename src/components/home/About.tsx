"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";

export function About() {
  return (
    <section id="about" className="py-24 lg:py-40 bg-ivory">
      <Container>
        <SectionHeader
          label="Our Story"
          title="A Sanctuary of Devotion & Compassion"
          subtitle="Shree Radhe Shyam Bhakti Sarover Trust is dedicated to serving society through devotion, compassion, and righteous living — promoting the timeless teachings of Sanatan Dharma."
        />

        <div className="mt-20 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                alt="Spiritual gathering"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10" />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-charcoal/70 font-light">
                Founded with a sacred vision, our Trust works tirelessly to
                preserve Gau Mata, spread the divine message of Shri Radha
                Krishna, and inspire people to lead peaceful, moral, and
                spiritually enriched lives.
              </p>
              <p className="text-lg leading-relaxed text-charcoal/70 font-light">
                Through seva, satsang, and spiritual discourses, we create
                spaces where devotion flourishes and compassion becomes action —
                uplifting humanity one soul at a time.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-4">
                {[
                  { value: "Seva", desc: "Selfless service to Gau Mata" },
                  { value: "Bhakti", desc: "Devotion through sankirtan" },
                  { value: "Dharma", desc: "Value-based living" },
                  { value: "Karuna", desc: "Compassion for all beings" },
                ].map((item) => (
                  <div key={item.value}>
                    <p className="font-heading text-2xl text-maroon">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-charcoal/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

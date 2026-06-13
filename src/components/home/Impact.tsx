"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FadeIn } from "@/components/ui/FadeIn";

interface ImpactProps {
  stats: {
    gauSeva: number;
    spiritualPrograms: number;
    sankirtanGatherings: number;
    devoteesReached: number;
  };
}

const statLabels = [
  { key: "gauSeva" as const, label: "Gau Seva Initiatives", suffix: "+" },
  {
    key: "spiritualPrograms" as const,
    label: "Spiritual Programs",
    suffix: "+",
  },
  {
    key: "sankirtanGatherings" as const,
    label: "Sankirtan Gatherings",
    suffix: "+",
  },
  {
    key: "devoteesReached" as const,
    label: "Devotees Reached",
    suffix: "+",
  },
];

export function Impact({ stats }: ImpactProps) {
  return (
    <section className="py-24 lg:py-36 bg-background">
      <Container wide>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {statLabels.map((stat, i) => (
            <FadeIn key={stat.key} delay={i * 0.1}>
              <div className="text-center lg:text-left relative">
                {i > 0 && (
                  <div
                    className="hidden lg:block absolute -left-10 top-1/2 -translate-y-1/2 w-px h-16 bg-deep-brown/8"
                    aria-hidden
                  />
                )}
                <p className="font-display text-5xl md:text-6xl lg:text-7xl font-normal text-deep-brown tracking-[-0.02em]">
                  <AnimatedCounter
                    value={stats[stat.key]}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-muted font-medium">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

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
    <section className="py-24 lg:py-32 bg-ivory border-y border-charcoal/5">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {statLabels.map((stat, i) => (
            <FadeIn key={stat.key} delay={i * 0.1}>
              <div className="text-center">
                <p className="font-heading text-5xl md:text-6xl font-light text-charcoal">
                  <AnimatedCounter
                    value={stats[stat.key]}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-3 text-sm text-charcoal/50 tracking-wide">
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

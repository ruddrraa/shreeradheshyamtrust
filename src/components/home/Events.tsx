"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { EventCountdown } from "@/components/home/EventCountdown";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

interface EventsProps {
  events: Event[];
}

export function Events({ events }: EventsProps) {
  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  return (
    <section id="events" className="py-24 lg:py-40 bg-ivory">
      <Container>
        <SectionHeader
          label="Join Us"
          title="Events & Gatherings"
          subtitle="Upcoming satsangs, sankirtan programs, and spiritual events."
        />

        <div className="mt-16 space-y-12">
          {upcoming.map((event, i) => {
            const isUpcoming = new Date(event.date) > new Date();

            return (
              <FadeIn key={event._id} delay={i * 0.15}>
                <article className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center group">
                  <div className="relative aspect-[16/10] overflow-hidden order-2 lg:order-1">
                    <Image
                      src={event.banner}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="order-1 lg:order-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-gold">
                      {formatDate(event.date)}
                    </p>
                    <h3 className="mt-3 font-heading text-3xl md:text-4xl font-light text-charcoal">
                      {event.title}
                    </h3>
                    <p className="mt-4 text-charcoal/60 leading-relaxed">
                      {event.description}
                    </p>

                    {isUpcoming && <EventCountdown targetDate={event.date} />}

                    {event.lumaLink && (
                      <div className="mt-8">
                        <Button href={event.lumaLink} variant="primary">
                          Register Now
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

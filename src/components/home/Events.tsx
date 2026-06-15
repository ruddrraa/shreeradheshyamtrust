"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { SacredImage } from "@/components/ui/SacredImage";
import { EventCountdown } from "@/components/home/EventCountdown";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";
import { StructuredData } from "@/components/seo/StructuredData";

interface EventsProps {
  events: Event[];
  typography?: import("@/types").SectionTypography;
}

export function Events({ events, typography }: EventsProps) {
  const upcoming = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  return (
    <section id="events" className="py-32 lg:py-52 bg-surface">
      <Container wide>
        <SectionHeader
          label="Join Us"
          title="Events & Gatherings"
          subtitle="Upcoming satsangs, sankirtan programs, and spiritual events."
          typography={typography}
        />

        <div className="mt-24 space-y-20 lg:space-y-28">
          {upcoming.map((event, i) => {
            const isUpcoming = new Date(event.date) > new Date();

            return (
              <FadeIn key={event._id} delay={i * 0.14}>
                <StructuredData data={{
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: event.title,
                  startDate: event.date,
                  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                  eventStatus: "https://schema.org/EventScheduled",
                  location: {
                    "@type": "Place",
                    name: "Shree Radhe Shyam Bhakti Sarover Trust",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Howrah",
                      addressRegion: "West Bengal",
                      addressCountry: "IN"
                    }
                  },
                  image: event.banner,
                  description: event.description,
                  url: event.lumaLink || "https://shreeradheshyambhaktisarovertrust.com/#events",
                  organizer: {
                    "@type": "NGO",
                    name: "Shree Radhe Shyam Bhakti Sarover Trust",
                    url: "https://shreeradheshyambhaktisarovertrust.com"
                  }
                }} />
                <article className="luxury-card overflow-hidden grid lg:grid-cols-2 group">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden">
                    <SacredImage
                      src={event.banner}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  <div className="p-11 lg:p-16 flex flex-col justify-center">
                    <time 
                      className="text-[10px] uppercase tracking-[0.32em] text-gold font-medium"
                      style={{
                        fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
                        color: typography?.subheading?.color || undefined,
                        fontFamily: typography?.subheading?.fontFamily || undefined,
                      }}
                    >
                      {formatDate(event.date)}
                    </time>
                    <h3 
                      className="mt-5 font-display text-3xl md:text-4xl lg:text-5xl font-normal text-deep-brown leading-[1.1] tracking-[-0.02em]"
                      style={{
                        fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
                        color: typography?.heading?.color || undefined,
                        fontFamily: typography?.heading?.fontFamily || undefined,
                      }}
                    >
                      {event.title}
                    </h3>
                    <p 
                      className="mt-7 text-muted leading-[1.8] font-light text-lg"
                      style={{
                        fontSize: typography?.body?.fontSize ? `${typography.body.fontSize}px` : undefined,
                        color: typography?.body?.color || undefined,
                        fontFamily: typography?.body?.fontFamily || undefined,
                      }}
                    >
                      {event.description}
                    </p>

                    {isUpcoming && <EventCountdown targetDate={event.date} />}

                    {event.lumaLink && (
                      <div className="mt-12">
                        <Button href={event.lumaLink} variant="primary">
                          Register on Luma
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

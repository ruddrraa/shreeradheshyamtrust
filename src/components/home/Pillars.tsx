"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pillarData } from "@/lib/defaults";
import { cn } from "@/lib/utils";

export function Pillars() {
  const [active, setActive] = useState(0);

  return (
    <section id="pillars" className="py-24 lg:py-40 bg-charcoal">
      <Container>
        <SectionHeader
          label="Our Sacred Work"
          title="Three Pillars of Devotion"
          subtitle="Every initiative flows from our commitment to Gau Seva, spiritual wisdom, and the divine names of Shri Radha Krishna."
          dark
        />

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {pillarData.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "group relative overflow-hidden cursor-default transition-all duration-700",
                active === i ? "lg:col-span-1" : ""
              )}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">
                    {pillar.subtitle}
                  </p>
                  <h3 className="font-heading text-3xl text-ivory font-light">
                    {pillar.title}
                  </h3>

                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 text-sm leading-relaxed text-ivory/70 overflow-hidden"
                      >
                        {pillar.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

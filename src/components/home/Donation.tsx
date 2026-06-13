"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { DonationForm } from "@/components/home/DonationForm";
import { formatCurrency } from "@/lib/utils";
import type { Donation } from "@/types";

interface DonationSectionProps {
  donations: Donation[];
  totalAmount: number;
}

export function DonationSection({
  donations,
  totalAmount,
}: DonationSectionProps) {
  const recentDonations = donations.slice(0, 5);

  return (
    <section id="donate" className="py-32 lg:py-52 bg-white">
      <Container wide>
        <SectionHeader
          label="Support Our Mission"
          title="Offer Your Seva"
          subtitle="Your contribution sustains Gau Mata protection, spiritual programs, and sankirtan gatherings. Every offering is an act of sacred devotion — not merely a transaction."
        />

        <div className="mt-24 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <DonationForm />
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-5 space-y-8">
            <div className="luxury-card p-10 lg:p-12">
              <p className="text-[10px] uppercase tracking-[0.32em] text-muted font-medium">
                Collective Impact
              </p>
              <p className="mt-5 font-display text-5xl text-deep-brown font-normal tracking-[-0.02em]">
                {formatCurrency(totalAmount)}
              </p>
              <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                Generous devotees sustaining our sacred mission of Gau Seva,
                Bhakti, and spiritual upliftment.
              </p>
            </div>

            {recentDonations.length > 0 && (
              <div className="luxury-card p-10 lg:p-12">
                <p className="text-[10px] uppercase tracking-[0.32em] text-muted mb-8 font-medium">
                  Recent Offerings
                </p>
                <ul className="space-y-5">
                  {recentDonations.map((d) => (
                    <li
                      key={d._id}
                      className="flex justify-between items-center text-sm border-b border-deep-brown/6 pb-5 last:border-0 last:pb-0"
                    >
                      <span className="text-charcoal font-light">
                        {d.isAnonymous ? "Anonymous Devotee" : d.donorName}
                      </span>
                      <span className="text-gold font-medium">
                        {formatCurrency(d.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-10 rounded-2xl bg-surface border border-gold/15">
              <p className="font-devanagari text-gold-light text-center text-lg">
                जय श्री राधे श्याम
              </p>
              <p className="mt-3 text-center text-xs text-muted tracking-wide leading-relaxed">
                Every contribution flows directly into seva — Gau Mata care,
                spiritual programs, and sankirtan gatherings.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

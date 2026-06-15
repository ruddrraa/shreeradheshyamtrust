"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Testimonial } from "@/types";

export function Testimonials({ typography }: { typography?: import("@/types").SectionTypography }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, quote }),
      });

      if (!res.ok) throw new Error("Failed");
      
      setName("");
      setRole("");
      setQuote("");
      setMessage("Thank you! Your words have been submitted and are pending review.");
    } catch {
      setMessage("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) return null;

  return (
    <section className="py-32 lg:py-52 bg-background">
      <Container wide>
        <SectionHeader
          label="Voices of Devotion"
          title="What Devotees Say"
          subtitle="Stories of transformation through seva, bhakti, and spiritual fellowship."
          typography={typography}
        />

        {testimonials.length > 0 && (
          <div className="mt-24 grid md:grid-cols-3 gap-10 lg:gap-12 mb-32">
            {testimonials.map((t, i) => (
              <FadeIn key={t._id} delay={i * 0.14}>
                <div className="h-full luxury-card p-11 lg:p-14 transition-all duration-700 hover:-translate-y-2">
                  <p className="font-display text-7xl text-gold/20 leading-none select-none">
                    &ldquo;
                  </p>
                  <p className="mt-8 text-charcoal/75 leading-[1.85] font-light text-lg">
                    {t.quote}
                  </p>
                  <div className="mt-12 pt-8 border-t border-deep-brown/6">
                    <p className="font-heading text-2xl text-deep-brown font-light">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-muted mt-3 tracking-[0.2em] uppercase font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Submission Form */}
        <div className="max-w-2xl mx-auto mt-20">
          <div className="luxury-card p-10 sm:p-14 text-center">
            <h3 className="font-heading text-3xl text-deep-brown font-light mb-2">Share Your Experience</h3>
            <p className="text-sm text-muted mb-10 font-light">
              We invite you to share your spiritual journey or experience with the Trust.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-charcoal/15 px-4 py-3 text-sm bg-transparent focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                    Role / City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Devotee, Kolkata"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-charcoal/15 px-4 py-3 text-sm bg-transparent focus:border-gold/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-charcoal/40 block mb-2">
                  Your Words
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full border border-charcoal/15 px-4 py-3 text-sm bg-transparent focus:border-gold/50 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-sm bg-charcoal text-ivory hover:bg-charcoal/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Experience"}
              </button>
              {message && (
                <p className="text-sm text-center text-charcoal mt-4 font-medium">{message}</p>
              )}
            </form>
          </div>
        </div>

      </Container>
    </section>
  );
}

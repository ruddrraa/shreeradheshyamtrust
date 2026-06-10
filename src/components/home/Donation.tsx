"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { formatCurrency } from "@/lib/utils";
import type { Donation, DonationPurpose } from "@/types";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const purposes: { value: DonationPurpose; label: string; desc: string }[] = [
  {
    value: "gau-seva",
    label: "Gau Seva",
    desc: "Support cow protection and welfare",
  },
  {
    value: "general",
    label: "General Donation",
    desc: "Contribute to our ongoing seva",
  },
  {
    value: "event-sponsorship",
    label: "Event Sponsorship",
    desc: "Sponsor spiritual gatherings",
  },
  { value: "custom", label: "Custom Amount", desc: "Give any amount you wish" },
];

const presetAmounts = [501, 1100, 2100, 5100, 11000];

interface DonationSectionProps {
  donations: Donation[];
  totalAmount: number;
}

export function DonationSection({
  donations,
  totalAmount,
}: DonationSectionProps) {
  const [purpose, setPurpose] = useState<DonationPurpose>("gau-seva");
  const [amount, setAmount] = useState(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const finalAmount =
    purpose === "custom" ? Number(customAmount) || 0 : amount;

  async function handleDonate() {
    if (!donorName.trim() || finalAmount < 1) {
      setMessage("Please enter your name and a valid amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          purpose,
          donorName,
          donorEmail,
          isAnonymous,
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error || "Failed to create order");
      }

      const { orderId, keyId } = await orderRes.json();

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      await new Promise<void>((resolve) => {
        script.onload = () => resolve();
      });

      const options = {
        key: keyId,
        amount: finalAmount * 100,
        currency: "INR",
        name: "Shree Radhe Shyam Bhakti Sarover Trust",
        description: `Donation for ${purpose.replace("-", " ")}`,
        order_id: orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              amount: finalAmount,
              purpose,
              donorName,
              donorEmail,
              isAnonymous,
            }),
          });

          if (verifyRes.ok) {
            setMessage("Thank you for your generous seva. Radhe Radhe!");
            setDonorName("");
            setDonorEmail("");
          } else {
            setMessage("Payment verification failed. Please contact us.");
          }
        },
        prefill: { name: donorName, email: donorEmail },
        theme: { color: "#111111" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unable to process donation."
      );
    } finally {
      setLoading(false);
    }
  }

  const recentDonations = donations.slice(0, 5);

  return (
    <section id="donate" className="py-24 lg:py-40 bg-charcoal">
      <Container>
        <SectionHeader
          label="Support Our Seva"
          title="Contribute with Devotion"
          subtitle="Your generous support enables Gau Mata seva, spiritual programs, and sankirtan gatherings. Every contribution is an act of sacred service."
          dark
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          <FadeIn className="lg:col-span-3">
            <div className="bg-ivory/5 backdrop-blur-sm border border-ivory/10 p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-4">
                {purposes.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setPurpose(p.value)}
                    className={cn(
                      "p-4 text-left border transition-all duration-300",
                      purpose === p.value
                        ? "border-gold bg-gold/10"
                        : "border-ivory/10 hover:border-ivory/20"
                    )}
                  >
                    <p className="text-sm text-ivory font-medium">{p.label}</p>
                    <p className="mt-1 text-xs text-ivory/50">{p.desc}</p>
                  </button>
                ))}
              </div>

              {purpose !== "custom" ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {presetAmounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={cn(
                        "px-5 py-2.5 text-sm border transition-all duration-300",
                        amount === a
                          ? "border-gold text-gold bg-gold/10"
                          : "border-ivory/15 text-ivory/70 hover:border-ivory/30"
                      )}
                    >
                      {formatCurrency(a)}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-8">
                  <input
                    type="number"
                    placeholder="Enter amount (INR)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-transparent border border-ivory/15 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              )}

              <div className="mt-8 space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-transparent border border-ivory/15 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full bg-transparent border border-ivory/15 px-4 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
                />
                <label className="flex items-center gap-3 text-sm text-ivory/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-gold"
                  />
                  Donate anonymously
                </label>
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleDonate}
                  variant="secondary"
                  size="lg"
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading
                    ? "Processing..."
                    : `Donate ${formatCurrency(finalAmount)}`}
                </Button>
              </div>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-gold"
                >
                  {message}
                </motion.p>
              )}

              <p className="mt-6 text-xs text-ivory/30">
                International donations accepted via Razorpay. For other payment
                methods, please contact us directly.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2 space-y-8">
            <div className="bg-ivory/5 backdrop-blur-sm border border-ivory/10 p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-ivory/40">
                Total Contributions
              </p>
              <p className="mt-2 font-heading text-4xl text-gold font-light">
                {formatCurrency(totalAmount)}
              </p>
            </div>

            {recentDonations.length > 0 && (
              <div className="bg-ivory/5 backdrop-blur-sm border border-ivory/10 p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6">
                  Recent Seva
                </p>
                <ul className="space-y-4">
                  {recentDonations.map((d) => (
                    <li
                      key={d._id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-ivory/70">
                        {d.isAnonymous ? "Anonymous Devotee" : d.donorName}
                      </span>
                      <span className="text-gold">
                        {formatCurrency(d.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

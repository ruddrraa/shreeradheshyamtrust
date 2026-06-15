"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { DonationPurpose } from "@/types";
import { cn } from "@/lib/utils";

const purposes: { value: DonationPurpose; label: string; desc: string }[] = [
  {
    value: "gau-seva",
    label: "Gau Seva",
    desc: "Support cow protection and welfare",
  },
  {
    value: "general",
    label: "General Seva",
    desc: "Contribute to our ongoing mission",
  },
  {
    value: "event-sponsorship",
    label: "Event Sponsorship",
    desc: "Sponsor spiritual gatherings",
  },
  { value: "custom", label: "Custom Amount", desc: "Give any amount you wish" },
];

const presetAmounts = [501, 1100, 2100, 5100, 11000];

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export function DonationForm() {
  const [mounted, setMounted] = useState(false);
  const [purpose, setPurpose] = useState<DonationPurpose>("gau-seva");
  const [amount, setAmount] = useState(1100);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
        theme: { color: "#C2A15E" },
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

  if (!mounted) {
    return (
      <div
        className="luxury-card p-10 lg:p-14 min-h-[520px]"
        aria-hidden
      />
    );
  }

  return (
    <div className="luxury-card p-10 lg:p-14">
      <p className="text-[10px] uppercase tracking-[0.32em] text-gold mb-10 font-medium">
        Choose Your Seva
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {purposes.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPurpose(p.value)}
            className={cn(
              "p-6 text-left rounded-2xl border transition-all duration-500",
              purpose === p.value
                ? "border-gold/60 bg-gold/6 shadow-sm"
                : "border-deep-brown/6 hover:border-gold/35 bg-surface/80"
            )}
          >
            <p className="text-sm text-deep-brown font-medium">{p.label}</p>
            <p className="mt-1.5 text-xs text-muted leading-relaxed">{p.desc}</p>
          </button>
        ))}
      </div>

      {purpose !== "custom" ? (
        <div className="mt-10 flex flex-wrap gap-3">
          {presetAmounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={cn(
                "px-6 py-3 text-sm rounded-full border transition-all duration-400",
                amount === a
                  ? "border-gold text-deep-brown bg-gold/10"
                  : "border-deep-brown/10 text-muted hover:border-gold/50"
              )}
            >
              {formatCurrency(a)}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <input
            type="number"
            placeholder="Enter amount (INR)"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full bg-surface border border-deep-brown/10 rounded-xl px-5 py-4 text-charcoal placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      )}

      <form
        className="mt-10 space-y-4"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="on"
        data-lpignore="true"
        data-1p-ignore="true"
      >
        <input
          type="text"
          name="donor-name"
          placeholder="Your name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          autoComplete="name"
          className="w-full bg-surface border border-deep-brown/10 rounded-xl px-5 py-4 text-charcoal placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
        />
        <input
          type="email"
          name="donor-email"
          placeholder="Email (optional)"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          autoComplete="email"
          className="w-full bg-surface border border-deep-brown/10 rounded-xl px-5 py-4 text-charcoal placeholder:text-muted/60 focus:outline-none focus:border-gold transition-colors"
        />
        <label className="flex items-center gap-3 text-sm text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="accent-gold rounded"
          />
          Offer seva anonymously
        </label>
      </form>

      <div className="mt-10">
        <Button
          onClick={handleDonate}
          variant="primary"
          size="lg"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Offer Seva · ${formatCurrency(finalAmount)}`}
        </Button>
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 text-sm text-maroon font-light"
        >
          {message}
        </motion.p>
      )}

      <p className="mt-8 text-xs text-muted/80 leading-relaxed">
        International contributions accepted via Razorpay. For alternative
        payment methods, please reach out to us directly.
      </p>
    </div>
  );
}

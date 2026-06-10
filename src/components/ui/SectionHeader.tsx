"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {label && (
        <p
          className={cn(
            "text-xs uppercase tracking-[0.25em] mb-4 font-medium",
            dark ? "text-gold" : "text-gold"
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight",
          dark ? "text-ivory" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed font-light",
            dark ? "text-ivory/70" : "text-charcoal/60"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

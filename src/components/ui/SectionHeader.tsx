"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { SectionTypography } from "@/types";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  typography?: SectionTypography;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
  typography,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        align === "center" && "text-center mx-auto max-w-4xl",
        align === "left" && "max-w-3xl",
        className
      )}
    >
      {label && (
        <>
          <p 
            className="text-[11px] uppercase tracking-[0.38em] mb-5 font-medium text-gold"
            style={{
              fontSize: typography?.overhead?.fontSize ? `${typography.overhead.fontSize}px` : undefined,
              color: typography?.overhead?.color || undefined,
              fontFamily: typography?.overhead?.fontFamily || undefined,
            }}
          >
            {label}
          </p>
          {align === "center" && (
            <div className="luxe-divider mx-auto mb-8" aria-hidden />
          )}
        </>
      )}
      <h2
        className={cn(
          "font-display text-[2.75rem] md:text-5xl lg:text-6xl xl:text-[4.5rem] font-normal leading-[1.06] tracking-[-0.02em]",
          light ? "text-white" : "text-deep-brown"
        )}
        style={{
          fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
          color: typography?.heading?.color || undefined,
          fontFamily: typography?.heading?.fontFamily || undefined,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-8 text-lg md:text-xl leading-[1.75] font-light max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/72" : "text-muted"
          )}
          style={{
            fontSize: typography?.subheading?.fontSize ? `${typography.subheading.fontSize}px` : undefined,
            color: typography?.subheading?.color || undefined,
            fontFamily: typography?.subheading?.fontFamily || undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variants = {
  primary:
    "bg-gold text-white border border-gold/80 btn-gold-glow hover:bg-gold-light hover:border-gold-light",
  secondary:
    "bg-transparent text-deep-brown border border-deep-brown/15 hover:border-gold hover:text-gold",
  ghost: "text-deep-brown hover:text-gold",
  outline:
    "border border-white/45 text-white hover:bg-white/8 hover:border-gold-light/60 backdrop-blur-md",
};

const sizes = {
  sm: "px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase",
  md: "px-7 py-3.5 text-sm tracking-[0.06em]",
  lg: "px-10 py-4 text-[12px] tracking-[0.14em] uppercase",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-500 rounded-full",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

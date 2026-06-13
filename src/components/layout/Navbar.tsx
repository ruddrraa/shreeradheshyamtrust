"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#pillars", label: "Our Seva" },
  { href: "#gallery", label: "Gallery" },
  { href: "#events", label: "Events" },
  { href: "#donate", label: "Support" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-deep-brown/6 py-3"
            : "bg-gradient-to-b from-charcoal/30 to-transparent py-7"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link href="/" className="group flex items-center">
            <img 
              src="/Logo.png" 
              alt="Shree Radhe Shyam Bhakti Sarover Trust" 
              className={cn(
                "h-12 w-auto object-contain transition-all duration-500",
                !scrolled && "brightness-0 invert opacity-90 hover:opacity-100"
              )} 
            />
          </Link>

          <nav className="hidden items-center gap-11 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[13px] tracking-[0.04em] transition-colors duration-400 group font-light",
                  scrolled
                    ? "text-charcoal/65 hover:text-gold"
                    : "text-white/70 hover:text-gold-light"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-gold transition-all duration-400 group-hover:w-full" />
              </Link>
            ))}
            <Button href="#donate" variant="primary" size="sm">
              Join Seva
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-deep-brown" : "text-white"
            )}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-charcoal/55 backdrop-blur-md lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[min(360px,90vw)] bg-surface p-10 shadow-2xl"
            >
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-deep-brown"
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.25} />
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-deep-brown hover:text-gold transition-colors duration-400"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button href="#donate" variant="primary" className="mt-8 w-fit">
                  Join Seva
                </Button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

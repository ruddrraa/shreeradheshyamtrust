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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ivory/80 backdrop-blur-xl border-b border-charcoal/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="group flex flex-col">
            <span
              className={cn(
                "font-heading text-lg md:text-xl font-medium tracking-wide transition-colors",
                scrolled ? "text-charcoal" : "text-ivory"
              )}
            >
              Shree Radhe Shyam
            </span>
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] transition-colors",
                scrolled ? "text-charcoal/50" : "text-ivory/60"
              )}
            >
              Bhakti Sarover Trust
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-wide transition-colors duration-300 hover:opacity-70",
                  scrolled ? "text-charcoal/70" : "text-ivory/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="#donate"
              variant={scrolled ? "primary" : "outline"}
              size="sm"
            >
              Join Seva
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              scrolled ? "text-charcoal" : "text-ivory"
            )}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-ivory p-8 shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-charcoal"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-2xl text-charcoal"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  href="#donate"
                  variant="primary"
                  className="mt-4"
                  onClick={() => setMobileOpen(false)}
                >
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

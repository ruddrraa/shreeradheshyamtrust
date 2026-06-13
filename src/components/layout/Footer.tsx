import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  typography?: import("@/types").SectionTypography;
}

function TempleSilhouette() {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg mx-auto opacity-[0.07]"
      aria-hidden
    >
      <path
        d="M200 8 L215 35 H185 Z M170 35 H230 L245 65 H155 Z M140 65 H260 L275 95 H125 Z M110 95 H290 V110 H110 Z"
        fill="currentColor"
        className="text-gold"
      />
      <path
        d="M60 95 H90 L100 75 H50 Z M310 95 H340 L350 75 H300 Z"
        fill="currentColor"
        className="text-gold"
      />
    </svg>
  );
}

export function Footer({
  contactEmail = "contact@shreeradheshyamtrust.org",
  contactPhone = "+91 98765 43210",
  address = "Howrah, Kolkata, West Bengal, India",
  socialLinks = {},
  typography,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgb(194 161 94 / 0.5), transparent)",
        }}
        aria-hidden
      />

      <Container wide className="relative py-28 lg:py-36">
        <TempleSilhouette />

        <div className="grid gap-16 lg:grid-cols-12 mt-12">
          <div className="lg:col-span-4">
            <p 
              className="font-display text-4xl lg:text-5xl font-normal leading-[1.1] tracking-tight"
              style={{
                fontSize: typography?.heading?.fontSize ? `${typography.heading.fontSize}px` : undefined,
                color: typography?.heading?.color || undefined,
              }}
            >
              Shree Radhe Shyam
              <br />
              <span className="text-gold">Bhakti Sarover Trust</span>
            </p>
            <p 
              className="mt-8 max-w-md text-sm leading-[1.85] text-white/55 font-light"
              style={{
                fontSize: typography?.body?.fontSize ? `${typography.body.fontSize}px` : undefined,
                color: typography?.body?.color || undefined,
              }}
            >
              Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of
              Devotion and Values.
            </p>
            <p className="mt-8 font-devanagari text-lg text-gold-light/90">
              जय श्री राधे श्याम
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.32em] text-gold/50 mb-8">
              Navigate
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              {[
                { href: "#about", label: "About" },
                { href: "#pillars", label: "Our Seva" },
                { href: "#gallery", label: "Gallery" },
                { href: "#events", label: "Events" },
                { href: "#donate", label: "Support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-400 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.32em] text-gold/50 mb-8">
              Legal
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/refund", label: "Refund Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-400 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.32em] text-gold/50 mb-8">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li>{address}</li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors duration-400 hover:text-gold-light"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="transition-colors duration-400 hover:text-gold-light"
                >
                  {contactPhone}
                </a>
              </li>
            </ul>

            {(socialLinks.facebook ||
              socialLinks.instagram ||
              socialLinks.youtube ||
              socialLinks.whatsapp) && (
              <div className="mt-10 flex flex-wrap gap-6">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.22em] text-white/35 hover:text-gold-light transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.22em] text-white/35 hover:text-gold-light transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.22em] text-white/35 hover:text-gold-light transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.22em] text-white/35 hover:text-gold-light transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/8 flex flex-col md:flex-row justify-between gap-6 text-[11px] text-white/30 font-light tracking-wide">
          <div className="space-y-1.5">
            <p>
              Reg. No. WB/2022/032510300209546/2022 | PAN: ABETS6991H
            </p>
            <p>
              Trustees: Mrs. Neha Rai, Mrs. Hira Rai, Mr. Rajiv Kumar Upadhyay
            </p>
          </div>
          <p className="md:text-right">© {currentYear} Shree Radhe Shyam Bhakti Sarover Trust</p>
        </div>
      </Container>
    </footer>
  );
}

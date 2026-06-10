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
}

export function Footer({
  contactEmail = "contact@shreeradheshyamtrust.org",
  contactPhone = "+91 98765 43210",
  address = "Howrah, Kolkata, West Bengal, India",
  socialLinks = {},
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-heading text-3xl font-light leading-snug">
              Shree Radhe Shyam
              <br />
              <span className="text-gold">Bhakti Sarover Trust</span>
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60">
              Serving Gau Mata, Spreading Divine Love, and Inspiring a Life of
              Devotion and Values.
            </p>
            <p className="mt-4 font-devanagari text-sm text-gold/80">
              जय श्री राधे श्याम
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-ivory/70">
              {[
                { href: "#about", label: "About Us" },
                { href: "#pillars", label: "Our Seva" },
                { href: "#gallery", label: "Gallery" },
                { href: "#events", label: "Events" },
                { href: "#donate", label: "Support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>{address}</li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-colors hover:text-gold"
                >
                  {contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactPhone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-gold"
                >
                  {contactPhone}
                </a>
              </li>
            </ul>

            {(socialLinks.facebook ||
              socialLinks.instagram ||
              socialLinks.youtube ||
              socialLinks.whatsapp) && (
              <div className="mt-8 flex gap-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-ivory/50 hover:text-gold transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-ivory/50 hover:text-gold transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-ivory/50 hover:text-gold transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-wider text-ivory/50 hover:text-gold transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-ivory/40">
          <p>
            Reg. No. WB/2022/032510300209546/2022 · Dedicated to Seva, Bhakti,
            and Spiritual Enlightenment
          </p>
          <p>© {currentYear} Shree Radhe Shyam Bhakti Sarover Trust</p>
        </div>
      </Container>
    </footer>
  );
}

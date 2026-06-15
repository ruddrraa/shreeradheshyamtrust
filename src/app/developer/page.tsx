import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, Code2 } from "lucide-react";

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const metadata = {
  title: "Developer Contact | Shree Radhe Shyam Bhakti Sarover Trust",
};

export default function DeveloperPage() {
  return (
    <div className="pt-40 pb-32 bg-surface min-h-screen">
      <Container className="max-w-3xl">
        <div className="luxury-card p-10 md:p-16 text-center shadow-xl shadow-black/5 bg-white">
          <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-8">
            <Code2 size={32} className="text-gold" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-charcoal font-normal tracking-tight mb-4">
            Want a website like this?
          </h1>
          <p className="text-charcoal/60 font-light mb-12 max-w-lg mx-auto leading-relaxed">
            Built to scale, designed to convert. I help businesses build fast, dynamic, and modern web solutions. Ready to upgrade your digital presence? Drop a message.
          </p>

          <div className="space-y-5 max-w-md mx-auto text-left">
            <a
              href="mailto:rudrraaa@proton.me"
              className="flex items-center gap-6 p-5 rounded-xl border border-charcoal/10 hover:border-gold/40 hover:bg-surface transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-charcoal/5 rounded-lg flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                <Mail size={20} className="text-charcoal group-hover:text-gold-light transition-colors" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold mb-1">Email</p>
                <p className="text-charcoal font-medium text-sm">rudrraaa@proton.me</p>
              </div>
            </a>

            <a
              href="tel:+918240005142"
              className="flex items-center gap-6 p-5 rounded-xl border border-charcoal/10 hover:border-gold/40 hover:bg-surface transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-charcoal/5 rounded-lg flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                <Phone size={20} className="text-charcoal group-hover:text-gold-light transition-colors" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold mb-1">Phone</p>
                <p className="text-charcoal font-medium text-sm">+91 8240005142</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/rudrraaa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-5 rounded-xl border border-charcoal/10 hover:border-gold/40 hover:bg-surface transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-charcoal/5 rounded-lg flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                <LinkedinIcon size={20} className="text-charcoal group-hover:text-gold-light transition-colors" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40 font-semibold mb-1">LinkedIn</p>
                <p className="text-charcoal font-medium text-sm">linkedin.com/in/rudrraaa</p>
              </div>
            </a>
          </div>

          <div className="mt-16 pt-8 border-t border-charcoal/10">
            <p className="text-xs text-charcoal/40 font-light tracking-wide uppercase">
              Designed & Developed by Rudra Pratap Singh
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/" variant="secondary">
            &larr; Back to Website
          </Button>
        </div>
      </Container>
    </div>
  );
}

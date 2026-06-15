"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Calendar,
  Heart,
  Settings,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}) {
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    if (setMobileOpen) setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  // Prevent scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      <div className="mb-10 flex justify-between items-start">
        <div>
          <Link href="/" className="flex items-center mb-2 group">
            <Image 
              src="/Logo.png" 
              alt="Shree Radhe Shyam Bhakti Sarover Trust Logo" 
              width={200}
              height={48}
              priority
              className="h-12 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          </Link>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/30 mt-4 border-t border-ivory/10 pt-4">
            Management Portal
          </p>
        </div>
        
        {/* Mobile Close Button */}
        {setMobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 text-ivory/60 hover:text-ivory"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors",
                active
                  ? "bg-gold/15 text-gold"
                  : "text-ivory/60 hover:text-ivory hover:bg-ivory/5"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 px-3 py-2.5 text-sm text-ivory/60 hover:text-ivory transition-colors mt-8"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      {/* Sidebar Element */}
      <aside
        className={cn(
          "bg-charcoal text-ivory h-[100dvh] flex flex-col overflow-y-auto p-6 transition-transform duration-300 ease-in-out z-50",
          "fixed top-0 left-0 w-64 lg:sticky lg:translate-x-0",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

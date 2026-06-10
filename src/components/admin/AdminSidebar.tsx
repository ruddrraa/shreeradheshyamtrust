"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Image,
  Video,
  Calendar,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/donations", label: "Donations", icon: Heart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal text-ivory min-h-screen p-6 flex flex-col">
      <div className="mb-10">
        <Link href="/" className="font-heading text-lg text-gold">
          Trust Admin
        </Link>
        <p className="text-xs text-ivory/40 mt-1">Management Portal</p>
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
    </aside>
  );
}

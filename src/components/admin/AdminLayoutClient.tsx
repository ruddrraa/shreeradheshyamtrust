"use client";

import { useState } from "react";
import Image from "next/image";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ivory">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-charcoal z-40 flex items-center justify-between px-4 shadow-md">
        <div className="flex items-center gap-3">
          <Image 
            src="/Logo.png" 
            alt="Logo" 
            width={120}
            height={32}
            className="h-8 w-auto object-contain brightness-0 invert" 
          />
          <span className="text-ivory font-sans tracking-tight font-medium">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-ivory/80 hover:text-ivory transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      {/* Main Content Area - Push down on mobile to account for the fixed top bar */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden pt-16 lg:pt-0 p-4 sm:p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}

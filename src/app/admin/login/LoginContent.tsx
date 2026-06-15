"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        <img 
          src="/Logo.png" 
          alt="Shree Radhe Shyam Bhakti Sarover Trust" 
          className="h-20 w-auto object-contain mb-6 brightness-0 invert opacity-90" 
        />
        <p className="font-sans tracking-tight text-3xl text-ivory font-light">
          Admin Portal
        </p>

        {error && (
          <p className="mt-6 text-sm text-red-400">
            Access denied. Only authorized administrators may sign in.
          </p>
        )}

        <div className="mt-10">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Sign in with Google
          </Button>
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-xs text-ivory/40 hover:text-gold transition-colors"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

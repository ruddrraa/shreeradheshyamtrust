"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <p className="font-heading text-3xl text-ivory font-light">
          Admin Portal
        </p>
        <p className="mt-3 text-ivory/50 text-sm">
          Shree Radhe Shyam Bhakti Sarover Trust
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

        <a
          href="/"
          className="inline-block mt-8 text-xs text-ivory/40 hover:text-gold transition-colors"
        >
          ← Back to website
        </a>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

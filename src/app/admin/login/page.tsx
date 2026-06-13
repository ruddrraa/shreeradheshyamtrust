import { redirect } from "next/navigation";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { LoginContent } from "./LoginContent";

export default async function AdminLoginPage() {
  const session = await requireAdmin();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

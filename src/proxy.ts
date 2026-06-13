import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export default async function proxy(req: NextRequest) {
  const session = await auth();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (!isAdminRoute || isLoginPage) return NextResponse.next();

  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (!adminEmails.includes(session.user.email.toLowerCase())) {
    return NextResponse.redirect(new URL("/admin/login?error=unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

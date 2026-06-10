import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return adminEmails.includes(user.email.toLowerCase());
    },
    async session({ session }) {
      return session;
    },
  },
});

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) return null;
  if (!adminEmails.includes(session.user.email.toLowerCase())) return null;
  return session;
}

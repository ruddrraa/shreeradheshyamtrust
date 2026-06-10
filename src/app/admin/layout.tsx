import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Admin | Shree Radhe Shyam Bhakti Sarover Trust",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-ivory">
      <AdminSidebar />
      <main className="flex-1 p-8 lg:p-12 overflow-auto">{children}</main>
    </div>
  );
}

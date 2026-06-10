import { AdminHeader } from "@/components/admin/AdminHeader";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import Video from "@/models/Video";
import Event from "@/models/Event";
import Donation from "@/models/Donation";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

async function getStats() {
  try {
    await connectDB();
    const [gallery, videos, events, donations, total] = await Promise.all([
      Gallery.countDocuments(),
      Video.countDocuments(),
      Event.countDocuments(),
      Donation.countDocuments(),
      Donation.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
    ]);

    return {
      gallery,
      videos,
      events,
      donations,
      totalAmount: total[0]?.total ?? 0,
    };
  } catch {
    return { gallery: 0, videos: 0, events: 0, donations: 0, totalAmount: 0 };
  }
}

export default async function AdminDashboard() {
  const session = await auth();
  const stats = await getStats();

  const cards = [
    { label: "Gallery Images", value: stats.gallery, href: "/admin/gallery" },
    { label: "Videos", value: stats.videos, href: "/admin/videos" },
    { label: "Events", value: stats.events, href: "/admin/events" },
    {
      label: "Total Donations",
      value: formatCurrency(stats.totalAmount),
      href: "/admin/donations",
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description={`Welcome back, ${session?.user?.name ?? "Admin"}`}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="p-6 bg-white border border-charcoal/5 hover:border-gold/30 transition-colors"
          >
            <p className="text-xs uppercase tracking-wider text-charcoal/40">
              {card.label}
            </p>
            <p className="mt-2 font-heading text-3xl text-charcoal font-light">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white border border-charcoal/5">
        <h2 className="font-heading text-xl text-charcoal mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/gallery", label: "Upload Image" },
            { href: "/admin/videos", label: "Add Video" },
            { href: "/admin/events", label: "Create Event" },
            { href: "/admin/settings", label: "Edit Settings" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="px-4 py-2 text-sm border border-charcoal/15 hover:border-charcoal/30 transition-colors"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

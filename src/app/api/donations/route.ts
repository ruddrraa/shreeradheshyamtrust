import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";
import Donation from "@/models/Donation";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 });
    const total = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const byPurpose = await Donation.aggregate([
      { $group: { _id: "$purpose", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      donations,
      totalAmount: total[0]?.total ?? 0,
      byPurpose,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Fetch failed" },
      { status: 500 }
    );
  }
}

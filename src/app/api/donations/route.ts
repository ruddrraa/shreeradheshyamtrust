import { NextResponse, NextRequest } from "next/server";
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

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { amount, purpose, donorName, donorEmail, isAnonymous, currency } = await req.json();

    if (!amount || !purpose || !donorName) {
      return NextResponse.json(
        { error: "Amount, purpose, and donor name required" },
        { status: 400 }
      );
    }

    const donation = await Donation.create({
      amount: Number(amount),
      purpose,
      donorName,
      donorEmail,
      isAnonymous: !!isAnonymous,
      currency: currency || "INR",
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Create failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id, amount, purpose, donorName, donorEmail, isAnonymous, currency } = await req.json();

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const donation = await Donation.findById(id);
    if (!donation) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (amount !== undefined) donation.amount = Number(amount);
    if (purpose) donation.purpose = purpose;
    if (donorName) donation.donorName = donorName;
    if (donorEmail !== undefined) donation.donorEmail = donorEmail;
    if (isAnonymous !== undefined) donation.isAnonymous = !!isAnonymous;
    if (currency) donation.currency = currency;

    await donation.save();
    return NextResponse.json(donation);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Donation.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}

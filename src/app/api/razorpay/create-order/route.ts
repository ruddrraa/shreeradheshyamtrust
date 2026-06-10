import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getRazorpayInstance } from "@/lib/razorpay";
import Donation from "@/models/Donation";

export async function POST(req: NextRequest) {
  try {
    const { amount, purpose, donorName, donorEmail, isAnonymous } =
      await req.json();

    if (!amount || amount < 1 || !donorName || !purpose) {
      return NextResponse.json(
        { error: "Invalid donation details" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `donation_${Date.now()}`,
    });

    await connectDB();
    await Donation.create({
      amount,
      purpose,
      donorName,
      donorEmail,
      isAnonymous: isAnonymous ?? false,
      razorpayOrderId: order.id,
      currency: "INR",
    });

    return NextResponse.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Payment service unavailable",
      },
      { status: 500 }
    );
  }
}

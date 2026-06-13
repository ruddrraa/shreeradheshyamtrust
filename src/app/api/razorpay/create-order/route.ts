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

    let order;
    try {
      const razorpay = getRazorpayInstance();
      order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `donation_${Date.now()}`,
      });
    } catch (rzpError: any) {
      console.error("Razorpay Error:", rzpError);
      return NextResponse.json(
        { error: rzpError?.error?.description || rzpError?.message || "Invalid API key or Razorpay service error." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: "Payment service unavailable" },
      { status: 500 }
    );
  }
}

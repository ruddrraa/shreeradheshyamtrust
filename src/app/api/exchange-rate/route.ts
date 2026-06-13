import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const base = searchParams.get("base")?.toUpperCase();

    if (!base || base === "INR") {
      return NextResponse.json({ rate: 1, converted: true });
    }

    const appId = process.env.OPEN_EXCHANGE_APP_ID || process.env.NEXT_PUBLIC_OPEN_EXCHANGE_APP_ID;
    if (!appId) {
      throw new Error("Open Exchange API key is missing");
    }

    // Open Exchange Rates free tier uses USD as the base currency.
    const res = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch exchange rates");
    }

    const data = await res.json();
    const rates = data.rates;

    // Convert from requested base currency to INR
    // formula: (1 / base_to_usd) * usd_to_inr
    // Since rates are relative to USD:
    // USD -> INR is just rates.INR
    // EUR -> INR is (1 / rates.EUR) * rates.INR
    const baseToUsd = rates[base];
    const usdToInr = rates["INR"];

    if (!baseToUsd || !usdToInr) {
      throw new Error("Currency not supported");
    }

    const rateToInr = (1 / baseToUsd) * usdToInr;

    return NextResponse.json({
      rate: Number(rateToInr.toFixed(4)),
      currency: base,
      target: "INR"
    });
  } catch (error) {
    console.error("Exchange Rate API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Conversion failed" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/auth";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan } = body;

    const { userId } = await getOrCreateUser();

    if (!["pro", "lifetime"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = plan === "pro" ? PLANS.pro.priceId : PLANS.lifetime.priceId;

    if (!priceId) {
      // Demo mode when Stripe is not configured
      return NextResponse.json({
        url: `/dashboard?demo=true&plan=${plan}`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: plan === "pro" ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.get("origin")}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: { userId, plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}

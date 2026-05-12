import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { setPro } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (userId && plan) {
        await setPro(userId);
        console.log(`User ${userId} upgraded to ${plan}`);
      }
      break;
    }
    case "customer.subscription.deleted": {
      // Handle subscription cancellation if needed
      break;
    }
  }

  return NextResponse.json({ received: true });
}

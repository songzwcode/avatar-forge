export const PLANS = {
  pro: {
    name: "Pro",
    price: 999, // $9.99/month
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
    features: [
      "Unlimited avatar generations",
      "High-res 1024x1024 output",
      "No watermarks",
      "Priority generation",
      "Discord community access",
    ],
  },
  lifetime: {
    name: "Lifetime Deal",
    price: 4999, // $49.99 one-time
    priceId: process.env.STRIPE_LIFETIME_PRICE_ID ?? "",
    features: [
      "Everything in Pro",
      "One-time payment, forever",
      "Early access to new features",
      "Lifetime updates included",
    ],
  },
} as const;

import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeInstance = new Stripe(key, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return stripeInstance;
}

export const stripe = {
  get checkout() {
    return getStripe().checkout;
  },
  get webhooks() {
    return getStripe().webhooks;
  },
};

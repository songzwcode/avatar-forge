"use client";

import { clsx } from "clsx";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/stripe";

interface PricingCardProps {
  onUpgradePro?: () => void;
  onLifetime?: () => void;
}

export function PricingCard({ onUpgradePro, onLifetime }: PricingCardProps) {
  const freeFeatures = [
    "3 avatar generations/day",
    "512x512 standard resolution",
    "8 game styles",
    "Community support",
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {/* Free */}
      <div className="card p-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">Free</h3>
          <p className="text-3xl font-bold">$0</p>
          <span className="text-sm text-[--text-muted]">Forever</span>
        </div>
        <ul className="space-y-2 mb-6 flex-1">
          {freeFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <button className="btn w-full bg-[--bg-elevated] hover:bg-[--border] text-[--text-primary]">
          Get Started
        </button>
      </div>

      {/* Pro */}
      <div className="card p-6 flex flex-col relative border-violet-500/50 glow-violet">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold">
          Most Popular
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">{PLANS.pro.name}</h3>
          <p className="text-3xl font-bold">$9.99</p>
          <span className="text-sm text-[--text-muted]">/month</span>
        </div>
        <ul className="space-y-2 mb-6 flex-1">
          {PLANS.pro.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-violet-400 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onUpgradePro}
          className="btn btn-primary w-full"
        >
          Upgrade to Pro
        </button>

        {/* Lifetime deal */}
        <button
          onClick={onLifetime}
          className="mt-3 text-sm text-[--text-muted] hover:text-cyan-400 transition-colors"
        >
          Or get Lifetime Deal for $49.99
        </button>
      </div>
    </div>
  );
}

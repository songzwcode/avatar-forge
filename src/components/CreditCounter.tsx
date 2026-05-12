"use client";

import { clsx } from "clsx";
import { Coins } from "lucide-react";

interface CreditCounterProps {
  credits: number;
  isPro: boolean;
}

export function CreditCounter({ credits, isPro }: CreditCounterProps) {
  const isLow = credits <= 1 && !isPro;

  if (isPro) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30">
        <Coins className="w-4 h-4 text-violet-400" />
        <span className="text-sm font-bold text-violet-300">PRO</span>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300",
        isLow
          ? "bg-pink-500/10 border-pink-500/30 animate-pulse"
          : "bg-cyan-500/10 border-cyan-500/30"
      )}
    >
      <Coins
        className={clsx("w-4 h-4", isLow ? "text-pink-400" : "text-cyan-400")}
      />
      <span
        className={clsx(
          "text-sm font-bold tabular-nums",
          isLow ? "text-pink-300" : "text-cyan-300"
        )}
      >
        {credits} credit{credits !== 1 ? "s" : ""} left
      </span>
    </div>
  );
}

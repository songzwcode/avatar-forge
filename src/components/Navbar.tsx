"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { CreditCounter } from "./CreditCounter";

interface NavbarProps {
  credits?: number;
  isPro?: boolean;
  showCredits?: boolean;
}

export function Navbar({ credits = 0, isPro = false, showCredits = true }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[--bg-deep]/80 backdrop-blur-md border-b border-[--border]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center glow-violet">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Avatar<span className="gradient-text">Forge</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {showCredits && <CreditCounter credits={credits} isPro={isPro} />}
          <Link
            href="/dashboard"
            className="btn btn-primary text-sm py-2 px-4"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

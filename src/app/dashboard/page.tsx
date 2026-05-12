"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Crown, Download, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GenerationCard } from "@/components/GenerationCard";
import { PricingCard } from "@/components/PricingCard";

interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [credits, setCredits] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and generations
    Promise.all([fetch("/api/credits").then((r) => r.json())])
      .then(([userData]) => {
        setCredits(userData.credits ?? 0);
        setIsPro(userData.isPro ?? false);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // For now, load from localStorage (in production this would be from DB)
    const saved = localStorage.getItem("avatar_generations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGenerations(
          parsed.map((g: Generation) => ({
            ...g,
            createdAt: new Date(g.createdAt).toISOString(),
          }))
        );
      } catch {}
    }
  }, []);

  const handleUpgradePro = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Checkout not available. Please configure Stripe keys.");
    }
  };

  const handleLifetime = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "lifetime" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert("Checkout not available. Please configure Stripe keys.");
    }
  };

  return (
    <main className="min-h-full pt-16">
      <Navbar credits={credits} isPro={isPro} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">
              Welcome back, <span className="gradient-text">Forger</span>
            </h1>
            <p className="text-[--text-muted]">
              Manage your avatars and subscription
            </p>
          </div>
          <Link href="/generate" className="btn btn-primary">
            <Zap className="w-4 h-4" />
            Generate New Avatar
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{generations.length}</div>
            <div className="text-xs text-[--text-muted]">Total Generated</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {isPro ? "∞" : credits}
            </div>
            <div className="text-xs text-[--text-muted]">
              {isPro ? "Pro — Unlimited" : "Credits Remaining"}
            </div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-bold text-violet-400">
              {isPro ? (
                <Crown className="w-6 h-6 inline" />
              ) : (
                "Free"
              )}
            </div>
            <div className="text-xs text-[--text-muted]">Plan</div>
          </div>
        </div>

        {/* Gallery */}
        {generations.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-4">Your Avatar Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generations.map((gen) => (
                <GenerationCard
                  key={gen.id}
                  id={gen.id}
                  imageUrl={gen.imageUrl}
                  prompt={gen.prompt}
                  style={gen.style}
                  createdAt={new Date(gen.createdAt)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center mb-12">
            <div className="w-24 h-24 rounded-full bg-[--bg-elevated] flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10 text-[--border]" />
            </div>
            <h3 className="text-lg font-bold mb-2">No avatars yet</h3>
            <p className="text-[--text-muted] mb-4">
              Start generating your first AI avatar
            </p>
            <Link href="/generate" className="btn btn-primary">
              <Zap className="w-4 h-4" />
              Go to Forge
            </Link>
          </div>
        )}

        {/* Pro Upgrade CTA (if not pro) */}
        {!isPro && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Unlock Unlimited Power</h2>
              <p className="text-[--text-muted]">
                Upgrade to Pro for unlimited generations and premium features
              </p>
            </div>
            <PricingCard
              onUpgradePro={handleUpgradePro}
              onLifetime={handleLifetime}
            />
          </div>
        )}

        {/* Pro Benefits (if pro) */}
        {isPro && (
          <div className="card p-6 mb-8 border-violet-500/30 glow-violet">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold">You&apos;re a Pro Forger</h2>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Download className="w-4 h-4 text-violet-400" />
                Unlimited avatar generations
              </li>
              <li className="flex items-center gap-2 text-sm">
                <ExternalLink className="w-4 h-4 text-violet-400" />
                High-res 1024x1024 output
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Crown className="w-4 h-4 text-violet-400" />
                Priority generation queue
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Sparkles,
  Download,
  Clock,
  Shield,
  ArrowRight,
  Gamepad2,
  Wand2,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";

const EXAMPLE_AVATARS = [
  { style: "Sci-Fi", prompt: "Cyberpunk warrior with neon visor", img: "https://images.unsplash.com/photo-1620641788421-f9d8c8c0b4b5?w=300&h=300&fit=crop" },
  { style: "Fantasy", prompt: "Elf ranger with glowing bow", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=300&fit=crop" },
  { style: "Cyberpunk", prompt: "Neon tattooed street samurai", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop" },
  { style: "Anime", prompt: "Vibrant-haired mage with staff", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=300&fit=crop" },
  { style: "Pixel", prompt: "8-bit knight hero", img: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=300&h=300&fit=crop" },
  { style: "Horror", prompt: "Shadow demon lord", img: "https://images.unsplash.com/photo-1509248961725-aec71c5d2806?w=300&h=300&fit=crop" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    desc: "State-of-the-art AI generates unique, high-quality avatars from your text prompts",
    color: "#7c3aed",
  },
  {
    icon: Gamepad2,
    title: "Game-Ready",
    desc: "Output optimized for gaming: 512x512 PNG, perfect for Steam, Discord, or any game",
    color: "#06b6d4",
  },
  {
    icon: Layers,
    title: "8 Unique Styles",
    desc: "From Cyberpunk to Pixel Art, find the perfect aesthetic for your character",
    color: "#ec4899",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Generate your avatar in seconds. No artistic skills required",
    color: "#f59e0b",
  },
  {
    icon: Download,
    title: "Free to Start",
    desc: "Get 3 free avatar generations every day. No credit card required",
    color: "#22c55e",
  },
  {
    icon: Shield,
    title: "Commercial Use",
    desc: "Full commercial rights to your generated avatars. Use them anywhere",
    color: "#8b5cf6",
  },
];

export default function HomePage() {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

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
    <main className="min-h-full">
      <Navbar showCredits={false} />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[--bg-deep] via-[--bg-deep] to-[--bg-card]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] float float-delay-2" />
        </div>

        {/* Floating avatar previews */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {EXAMPLE_AVATARS.map((avatar, i) => (
            <div
              key={i}
              className={`absolute w-40 h-40 rounded-xl overflow-hidden border border-[--border] float`}
              style={{
                top: `${15 + (i * 12)}%`,
                left: `${5 + (i * 15)}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.3,
                transform: `rotate(${(i % 3) * 8 - 8}deg)`,
              }}
            >
              <img src={avatar.img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 fade-up">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">Powered by Flux AI</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 fade-up fade-up-delay-1">
            <span className="gradient-text">Forge Your Legend</span>
            <br />
            <span className="text-[--text-primary]">with AI Avatars</span>
          </h1>

          {/* Sub */}
          <p className="text-xl text-[--text-muted] max-w-2xl mx-auto mb-10 fade-up fade-up-delay-2">
            Transform your ideas into stunning game-ready character avatars.
            8 unique styles. Instant results. Free to start.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-up fade-up-delay-3">
            <Link
              href="/generate"
              className="btn btn-primary text-lg px-8 py-4 glow-violet"
            >
              <Zap className="w-5 h-5" />
              Generate Now — It&apos;s Free
            </Link>
            <Link
              href="#how-it-works"
              className="btn text-[--text-muted] hover:text-[--text-primary]"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center mt-12 fade-up fade-up-delay-4">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">10K+</div>
              <div className="text-xs text-[--text-muted]">Avatars Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">8</div>
              <div className="text-xs text-[--text-muted]">Game Styles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">2 sec</div>
              <div className="text-xs text-[--text-muted]">Avg. Generation</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-[--border] flex justify-center pt-2">
            <div className="w-1 h-2 bg-violet-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Style Showcase */}
      <section className="py-24 px-4 bg-[--bg-card]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              8 Epic Game Styles
            </h2>
            <p className="text-[--text-muted]">
              From cyberpunk street warriors to pixel art heroes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {EXAMPLE_AVATARS.map((avatar, i) => (
              <div
                key={i}
                className="card p-3 text-center cursor-pointer"
                onMouseEnter={() => setHoveredAvatar(i)}
                onMouseLeave={() => setHoveredAvatar(null)}
              >
                <div
                  className="aspect-square rounded-lg overflow-hidden mb-3 transition-all duration-300"
                  style={{
                    transform: hoveredAvatar === i ? "scale(1.05)" : "scale(1)",
                    boxShadow: hoveredAvatar === i ? "0 0 20px var(--glow-violet)" : "none",
                  }}
                >
                  <img
                    src={avatar.img}
                    alt={avatar.style}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-[--accent-primary]">
                  {avatar.style}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-[--text-muted] max-w-xl mx-auto">
              A powerful avatar forge built for gamers, creators, and indie developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="card p-6 fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${f.color}20`, boxShadow: `0 0 20px ${f.color}20` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[--text-muted] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-[--bg-card]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-[--text-muted]">Three steps to your perfect avatar</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Wand2,
                title: "Describe Your Character",
                desc: "Type a text prompt describing your avatar. Be as creative as you want — AI handles the rest.",
              },
              {
                step: "02",
                icon: Layers,
                title: "Pick Your Style",
                desc: "Choose from 8 game styles: Sci-Fi, Fantasy, Cyberpunk, Anime, Pixel, Horror, Steampunk, Western.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download & Use",
                desc: "Get your avatar instantly as a high-quality PNG. Use it anywhere — Discord, Steam, games, content.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="text-6xl font-black text-[--border] mb-4">{item.step}</div>
                <div className="w-16 h-16 rounded-full bg-violet-600/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[--text-muted]">{item.desc}</p>

                {i < 2 && (
                  <div className="hidden md:block absolute top-20 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-[--border]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-[--text-muted]">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <PricingCard
            onUpgradePro={handleUpgradePro}
            onLifetime={handleLifetime}
          />
        </div>
      </section>

      {/* FAQ / Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-t from-[--bg-card] to-[--bg-deep]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Forge?
          </h2>
          <p className="text-[--text-muted] mb-8">
            Join thousands of gamers and creators generating unique avatars every day.
          </p>
          <Link
            href="/generate"
            className="btn btn-primary text-lg px-8 py-4 glow-violet"
          >
            <Zap className="w-5 h-5" />
            Start Generating Free
          </Link>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-[--text-muted]">
            <Clock className="w-4 h-4" />
            <span>3 free generations every day</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[--border]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">
              Avatar<span className="gradient-text">Forge</span>
            </span>
          </div>
          <p className="text-xs text-[--text-muted]">
            © 2025 AvatarForge. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

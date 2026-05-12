"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StylePicker } from "@/components/StyleCard";
import { ForgeButton } from "@/components/ForgeButton";
import { GenerationCard } from "@/components/GenerationCard";
import { Toast, showToast } from "@/components/Toast";
import { GAME_STYLES, type GameStyleId } from "@/lib/styles";

interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: Date;
  isNew?: boolean;
}

export default function GeneratePage() {
  const router = useRouter();
  const [selectedStyle, setSelectedStyle] = useState<GameStyleId>("cyberpunk");
  const [prompt, setPrompt] = useState("");
  const [refImage, setRefImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [credits, setCredits] = useState(3);
  const [isPro, setIsPro] = useState(false);
  const [promptError, setPromptError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user credits on mount
  useState(() => {
    fetch("/api/credits")
      .then((r) => r.json())
      .then((d) => {
        setCredits(d.credits ?? 3);
        setIsPro(d.isPro ?? false);
      })
      .catch(() => {});
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        showToast("Image must be under 5MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        setRefImage(base64);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleForge = async () => {
    if (!prompt.trim()) {
      setPromptError(true);
      setTimeout(() => setPromptError(false), 400);
      showToast("Please enter a prompt", "error");
      return;
    }

    setLoading(true);
    setPromptError(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
          refImageBase64: refImage ?? undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      // Add to generations
      const newGen: Generation = {
        id: data.id,
        imageUrl: data.imageUrl,
        prompt: prompt.trim(),
        style: selectedStyle,
        createdAt: new Date(),
        isNew: true,
      };

      setGenerations((prev) => [newGen, ...prev]);
      setCredits(data.creditsRemaining);
      setPrompt("");
      setRefImage(null);

      showToast("Avatar forged successfully!", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Generation failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      showToast("Checkout not available", "error");
    }
  };

  return (
    <main className="min-h-full pt-16">
      <Navbar credits={credits} isPro={isPro} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2">
            Forge Your <span className="gradient-text">Avatar</span>
          </h1>
          <p className="text-[--text-muted]">
            Describe your character and pick a style. AI does the rest.
          </p>
        </div>

        {/* Generation Interface */}
        <div className="card p-6 mb-8">
          {/* Style Picker */}
          <div className="mb-6">
            <label className="text-sm font-bold text-[--text-muted] uppercase tracking-wider mb-3 block">
              Choose Style
            </label>
            <StylePicker selected={selectedStyle} onSelect={setSelectedStyle} />
          </div>

          {/* Prompt */}
          <div className="mb-6">
            <label className="text-sm font-bold text-[--text-muted] uppercase tracking-wider mb-3 block">
              Describe Your Character
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`e.g. A battle-scarred dwarf warrior with a massive axe and a fiery beard`}
              className={`w-full h-28 px-4 py-3 bg-[--bg-elevated] border rounded-lg text-[--text-primary] placeholder:text-[--text-muted]/50 resize-none focus:outline-none focus:border-violet-500 transition-colors ${
                promptError ? "border-red-500 shake" : "border-[--border]"
              }`}
            />
          </div>

          {/* Reference Image */}
          <div className="mb-6">
            <label className="text-sm font-bold text-[--text-muted] uppercase tracking-wider mb-3 block">
              Reference Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              {refImage ? (
                <div className="relative">
                  <img
                    src={refImage}
                    alt="Reference"
                    className="w-24 h-24 rounded-lg object-cover border border-[--border]"
                  />
                  <button
                    onClick={() => setRefImage(null)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-[--border] flex flex-col items-center justify-center gap-1 hover:border-violet-500 hover:bg-violet-500/5 transition-colors"
                >
                  <Upload className="w-6 h-6 text-[--text-muted]" />
                  <span className="text-xs text-[--text-muted]">Upload</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {refImage ? (
                <p className="text-sm text-[--text-muted]">
                  AI will blend this reference with your prompt
                </p>
              ) : (
                <p className="text-sm text-[--text-muted]">
                  Upload a photo or sketch for consistent character features
                </p>
              )}
            </div>
          </div>

          {/* Forge Button */}
          <div className="flex flex-col items-center gap-3">
            {credits === 0 && !isPro && (
              <div className="text-center mb-2">
                <p className="text-pink-400 text-sm mb-2">
                  You've used all your free credits today.
                </p>
                <button onClick={handleUpgrade} className="btn btn-primary text-sm">
                  Upgrade to Pro — Unlimited Generations
                </button>
              </div>
            )}
            <ForgeButton loading={loading} onClick={handleForge} />
          </div>
        </div>

        {/* Recent Generations */}
        {generations.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-violet-400" />
              Your Avatars
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generations.map((gen) => (
                <GenerationCard
                  key={gen.id}
                  {...gen}
                  createdAt={gen.createdAt}
                  isNew={gen.isNew}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {generations.length === 0 && (
          <div className="text-center py-16 text-[--text-muted]">
            <div className="w-24 h-24 rounded-full bg-[--bg-card] flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-[--border]" />
            </div>
            <p className="text-lg font-medium mb-1">Your forge awaits</p>
            <p className="text-sm">Generate your first avatar above</p>
          </div>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer />
    </main>
  );
}

// Toast container component
function ToastContainer() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; type: "success" | "error" | "info" }>
  >([]);

  // Global toast handler
  if (typeof window !== "undefined") {
    (window as unknown as { __toastHandler?: (msg: string, type: string) => void }).__toastHandler = (
      message: string,
      type: string
    ) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type: type as "success" | "error" | "info" }]);
    };
  }

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        />
      ))}
    </>
  );
}

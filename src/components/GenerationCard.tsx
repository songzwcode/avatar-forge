"use client";

import { clsx } from "clsx";
import { Download, Share2, Sparkles } from "lucide-react";
import { GAME_STYLES } from "@/lib/styles";

interface GenerationCardProps {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: Date;
  isNew?: boolean;
}

export function GenerationCard({
  imageUrl,
  prompt,
  style,
  createdAt,
  isNew = false,
}: GenerationCardProps) {
  const styleInfo = GAME_STYLES.find((s) => s.id === style);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `avatar-${style}-${Date.now()}.png`;
    link.target = "_blank";
    window.open(link.href, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Avatar from AvatarForge",
        text: `Check out my ${styleInfo?.name || style} avatar!`,
        url: imageUrl,
      });
    } else {
      await navigator.clipboard.writeText(imageUrl);
      alert("Image URL copied to clipboard!");
    }
  };

  return (
    <div
      className={clsx(
        "card overflow-hidden group relative",
        isNew && "reveal neon-border"
      )}
    >
      {/* Image */}
      <div className="aspect-square relative overflow-hidden bg-[--bg-elevated]">
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={handleShare}
            className="btn bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* New badge */}
        {isNew && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-violet-600 text-white text-xs font-bold">
            <Sparkles className="w-3 h-3" />
            NEW
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div
          className="text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: styleInfo?.color || "var(--accent-primary)" }}
        >
          {styleInfo?.name || style}
        </div>
        <p className="text-xs text-[--text-muted] line-clamp-2">{prompt}</p>
        <span className="text-[10px] text-[--text-muted]/60 mt-1 block">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

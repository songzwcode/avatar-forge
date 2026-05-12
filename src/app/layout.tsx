import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AvatarForge — AI Game Character Avatar Generator",
  description:
    "Generate stunning game-ready character avatars with AI. Choose from 8 game styles including Sci-Fi, Fantasy, Cyberpunk, and Anime. Free to start.",
  keywords: ["AI avatar generator", "game character", "RPG avatar", "AI art", "character creator"],
  openGraph: {
    title: "AvatarForge — Forge Your Legend",
    description: "AI-powered game character avatar generator. Create unique avatars in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}

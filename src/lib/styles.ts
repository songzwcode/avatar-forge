export const GAME_STYLES = [
  {
    id: "sci-fi",
    name: "Sci-Fi",
    description: "Futuristic warriors with neon tech",
    color: "#06b6d4",
    preview:
      "https://images.unsplash.com/photo-1620641788421-f9d8c8c0b4b5?w=200&h=200&fit=crop",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Medieval heroes with magic",
    color: "#8b5cf6",
    preview:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=200&fit=crop",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon-soaked street warriors",
    color: "#ec4899",
    preview:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Vibrant Japanese-style characters",
    color: "#f43f5e",
    preview:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=200&fit=crop",
  },
  {
    id: "pixel",
    name: "Pixel Art",
    description: "Retro 8-bit RPG style",
    color: "#22c55e",
    preview:
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=200&h=200&fit=crop",
  },
  {
    id: "horror",
    name: "Horror",
    description: "Dark creatures and monsters",
    color: "#a855f7",
    preview:
      "https://images.unsplash.com/photo-1509248961725-aec71c5d2806?w=200&h=200&fit=crop",
  },
  {
    id: "steampunk",
    name: "Steampunk",
    description: "Victorian mechanical warriors",
    color: "#f59e0b",
    preview:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop",
  },
  {
    id: "western",
    name: "Western",
    description: "Rugged gunslingers",
    color: "#d97706",
    preview:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&h=200&fit=crop",
  },
] as const;

export type GameStyleId = (typeof GAME_STYLES)[number]["id"];

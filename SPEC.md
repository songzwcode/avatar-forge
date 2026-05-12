# AvatarForge — AI Game Character Avatar Generator

## 1. Concept & Vision

AvatarForge is a sleek, cyberpunk-inspired AI tool that transforms simple inputs (text prompts, selfies, or rough sketches) into stunning game-ready character avatars. It speaks directly to gamers, indie game devs, and RPG enthusiasts who want unique, personalized avatars without artistic skills. The vibe: a high-tech forge where digital identities are weaponized.

**Slogan**: "Forge Your Legend."

---

## 2. Design Language

### Aesthetic Direction
Dark cyberpunk / neon forge — think Cyberpunk 2077 UI meets Steam workshop. Deep blacks, electric neon accents, glowing borders, and a sense of power.

### Color Palette
```
--bg-deep:        #0a0a0f      (near-black background)
--bg-card:        #12121a      (card surfaces)
--bg-elevated:    #1a1a26      (elevated elements)
--border:         #2a2a3a      (subtle borders)
--accent-primary: #7c3aed      (violet — primary CTA)
--accent-cyan:    #06b6d4      (cyan — secondary accent)
--accent-pink:    #ec4899      (pink — highlights)
--text-primary:   #f1f5f9      (main text)
--text-muted:     #94a3b8      (secondary text)
--glow-violet:    rgba(124, 58, 237, 0.4)
--glow-cyan:      rgba(6, 182, 212, 0.3)
```

### Typography
- **Headings**: `Orbitron` (Google Fonts) — futuristic, techy
- **Body**: `Inter` (Google Fonts) — clean readability
- **Code/mono**: `JetBrains Mono` — for technical details

### Motion Philosophy
- **Page load**: Staggered fade-up (opacity 0→1, translateY 20px→0, 400ms ease-out, 80ms stagger)
- **Hover**: Scale 1.02 + glow intensify, 200ms
- **Button press**: Scale 0.97 + brightness drop, 150ms
- **Generation**: Pulsing neon border animation while AI works
- **Result reveal**: Dramatic scale-up from center with glow burst

### Icon Library
Lucide React — consistent 24px stroke icons, 1.5px stroke weight

---

## 3. Layout & Structure

### Pages

#### Landing Page (`/`)
- **Hero**: Full-viewport, centered. Headline + sub + "Generate Now" CTA. Animated background with floating avatar previews.
- **Style Showcase**: Horizontal scroll of 6-8 example avatars in neon cards
- **Features**: 3-column grid — "AI-Powered", "Game-Ready", "Instant Download"
- **How It Works**: 3-step visual flow (Upload → Forge → Download)
- **Pricing**: 2 tiers — Free (3 avatars/day) + Pro ($9.99/month unlimited)
- **Footer**: Minimal — logo, links, social icons

#### Dashboard (`/dashboard`)
- **Top**: User credits display (glowing counter)
- **Main**: Generation interface — style selector + prompt input + generate button
- **Gallery**: Grid of user's previously generated avatars with download buttons

#### Generate Page (`/generate`)
- Style picker (horizontal scroll of 8 game styles: Sci-Fi, Fantasy, Cyberpunk, Anime, Pixel Art, Horror, Steampunk, Western)
- Prompt textarea
- Optional: Upload reference image
- "FORGE" button with pulsing animation
- Result display with download/share options

### Responsive Strategy
- Mobile-first, breakpoints at 640px / 1024px / 1280px
- On mobile: single column, sticky bottom CTA bar
- Dashboard gallery: 2-col mobile → 3-col tablet → 4-col desktop

---

## 4. Features & Interactions

### Core Features

#### F1: Avatar Generation (Text-to-Avatar)
- User selects a game style
- Types a text prompt (e.g., "elf ranger with glowing bow")
- Clicks "FORGE" → loading state (pulsing border) → result reveal with glow burst
- 512x512 PNG output, game-friendly aspect ratio

#### F2: Style Presets
8 built-in game styles with curated prompt modifiers:
1. **Sci-Fi** — "futuristic armor, neon highlights, holographic visor"
2. **Fantasy** — "medieval armor, enchanted weapons, magical aura"
3. **Cyberpunk** — "neon tattoos, chrome implants, leather jacket"
4. **Anime** — "large expressive eyes, vibrant hair, dynamic pose"
5. **Pixel Art** — "retro 16-bit RPG sprite, limited color palette"
6. **Horror** — "dark creature, glowing eyes, corrupted armor"
7. **Steampunk** — "brass goggles, mechanical limbs, gear ornaments"
8. **Western** — "cowboy hat, bandolier, weathered leather"

#### F3: Reference Image Upload
- User can upload a selfie or sketch
- AI extracts features + style → generates consistent character
- Max 5MB, JPG/PNG/WebP

#### F4: Credits System
- Free tier: 3 generations/day (IP-based tracking)
- Pro: unlimited + 1024x1024 high-res + no watermark

#### F5: Download & Share
- Instant PNG download
- "Share to Community" — generates a shareable link
- Social share buttons (Twitter/X, Reddit)

### Interaction Details

**FORGE button states:**
- Default: Solid violet, subtle glow
- Hover: Intensified glow, scale 1.03
- Loading: Animated pulsing border, spinner icon, disabled
- Success: Brief green flash, then returns

**Error handling:**
- API failure: Toast notification "Forge temporarily unavailable — try again"
- Invalid prompt (empty): Shake animation + red border on textarea
- Rate limit: "You've reached today's limit — upgrade to Pro"

**Empty states:**
- Dashboard with 0 generations: Illustrated avatar silhouette + "Your forge awaits. Generate your first avatar."

---

## 5. Component Inventory

### `<HeroSection>`
- Full viewport height, centered content
- Animated floating avatar cards in background (CSS animation)
- Headline: `Orbitron` 56px bold, gradient text (violet → cyan)
- States: Default only

### `<StyleCard>`
- 120x160px card with style name + small preview image
- States: Default (subtle border), Hover (glow + scale), Selected (violet border + glow)

### `<ForgeButton>`
- Large pill button, violet gradient
- States: Default, Hover, Loading (pulse animation), Disabled (50% opacity)
- Icon: Anvil/hammer SVG on left

### `<GenerationCard>`
- Avatar image + style badge + timestamp
- Hover: Overlay with download + share buttons
- States: Loading (skeleton shimmer), Loaded, Error

### `<CreditCounter>`
- Displays remaining credits with animated number
- Glows when credits are low (≤1)
- States: Has-credits (cyan), Low-credits (pink pulse), Depleted (grayed)

### `<PricingCard>`
- Two cards side by side: Free vs Pro
- Pro card: highlighted with violet border + "Most Popular" badge
- CTA buttons: "Get Started Free" / "Upgrade to Pro"

### `<Toast>`
- Slides in from bottom-right
- Auto-dismiss after 4 seconds
- Types: Success (green), Error (red), Info (cyan)

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS v3 + custom CSS variables
- **AI**: Replicate API — `stability-ai/sdxl` or `black-forest-labs/flux-schnell` for fast generation
- **Database**: SQLite via Prisma (simple, no external DB needed for MVP)
- **Auth**: Simple token-based (email magic link or just IP tracking for v1)
- **Payments**: Stripe (subscriptions + one-time Lifetime Deals)
- **Hosting**: Vercel (frontend + serverless functions)

### API Design

#### `POST /api/generate`
Request:
```json
{
  "prompt": "string",
  "style": "sci-fi|fantasy|cyberpunk|anime|pixel|horror|steampunk|western",
  "refImageBase64?: "string (optional)"
}
```
Response:
```json
{
  "id": "string (generation ID)",
  "imageUrl": "string (presigned URL or base64)",
  "creditsRemaining": "number"
}
```

#### `POST /api/create-checkout`
Creates Stripe checkout session for Pro subscription or Lifetime Deal

#### `GET /api/credits?token=<user_token>`
Returns remaining credits for user

#### `POST /api/webhook/stripe`
Handles Stripe webhook events (payment success, subscription cancellation)

### Data Model

```prisma
model User {
  id        String   @id @default(cuid())
  email     String?  @unique
  token     String   @unique
  credits   Int      @default(3)
  isPro     Boolean  @default(false)
  createdAt DateTime @default(now())
  generations Generation[]
}

model Generation {
  id        String   @id @default(cuid())
  userId    String
  prompt    String
  style     String
  imageUrl  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

### Environment Variables
```
REPLICATE_API_TOKEN=  # Replicate API key
STRIPE_SECRET_KEY=    # Stripe secret key
STRIPE_WEBHOOK_SECRET= # Stripe webhook secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
DATABASE_URL=         # SQLite file path
```

### Image Generation Flow
1. User submits prompt + style
2. Server validates credits
3. Server calls Replicate API with style-tuned prompt
4. Replicate returns image URL
5. Image cached/saved to disk or R2
6. Response sent to client with image URL
7. Generation record saved to DB

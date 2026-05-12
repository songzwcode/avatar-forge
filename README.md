# AvatarForge

AI-powered game character avatar generator. Transform text prompts into stunning game-ready avatars in 8 unique styles.

## Features

- **8 Game Styles**: Sci-Fi, Fantasy, Cyberpunk, Anime, Pixel Art, Horror, Steampunk, Western
- **Text-to-Avatar**: Describe your character, AI generates it
- **Reference Image**: Upload a photo for consistent character features
- **Credits System**: Free tier (3/day) + Pro unlimited
- **Stripe Integration**: Subscription and Lifetime Deal payment

## Tech Stack

- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **AI**: Replicate API (Flux Schnell model)
- **Database**: SQLite via Prisma 5
- **Payments**: Stripe
- **Hosting**: Vercel-ready

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
REPLICATE_API_TOKEN="your_replicate_token"
STRIPE_SECRET_KEY="your_stripe_secret"
STRIPE_WEBHOOK_SECRET="your_webhook_secret"
STRIPE_PRO_PRICE_ID="your_pro_price_id"
STRIPE_LIFETIME_PRICE_ID="your_lifetime_price_id"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_publishable_key"
```

### 3. Set Up Database

```bash
pnpm prisma migrate dev
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
pnpm build
pnpm start
```

## API Keys Required

### Replicate
1. Sign up at [replicate.com](https://replicate.com)
2. Get your API token from the dashboard
3. The app uses `black-forest-labs/flux-schnell` model (fast generation, ~2-4 seconds)

### Stripe
1. Sign up at [stripe.com](https://stripe.com)
2. Create a product for Pro subscription ($9.99/month)
3. Create a product for Lifetime Deal ($49.99 one-time)
4. Get your webhook secret after setting up a webhook endpoint

## Project Structure

```
avatar-forge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/       # Avatar generation endpoint
│   │   │   ├── credits/        # Credits check endpoint
│   │   │   ├── create-checkout/ # Stripe checkout
│   │   │   └── webhook/stripe/ # Stripe webhooks
│   │   ├── dashboard/          # User dashboard
│   │   ├── generate/            # Avatar generation UI
│   │   ├── page.tsx             # Landing page
│   │   └── globals.css           # Design system
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── StyleCard.tsx
│   │   ├── ForgeButton.tsx
│   │   ├── GenerationCard.tsx
│   │   ├── CreditCounter.tsx
│   │   ├── PricingCard.tsx
│   │   └── Toast.tsx
│   └── lib/
│       ├── prisma.ts            # Prisma client
│       ├── replicate.ts         # AI image generation
│       ├── stripe.ts            # Stripe client
│       ├── auth.ts              # User auth & credits
│       └── styles.ts            # Game style configs
├── prisma/
│   └── schema.prisma            # Database schema
├── SPEC.md                      # Design specification
└── README.md
```

## Design System

- **Colors**: Dark cyberpunk theme (near-black + violet/cyan neon accents)
- **Typography**: Orbitron (headings), Inter (body), JetBrains Mono (code)
- **Animations**: Float, fade-up, pulse-glow, reveal-burst

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t avatar-forge .
docker run -p 3000:3000 --env-file .env avatar-forge
```

## License

MIT

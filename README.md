# Mitologi Clothing - Next.js Frontend

Frontend Next.js untuk Mitologi Clothing, platform e-commerce clothing brand.

## Tech Stack

- **Next.js 16** - App Router, React Server Components
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Sonner** - Toast notifications

## Architecture

Frontend ini terintegrasi dengan:

- **Laravel Backend API** (port 8000) - Products, orders, users, cart, checkout
- **Python Recommendation Service** (port 8001) - ML-based product recommendations
- **Midtrans** - Payment gateway

## Running Locally

### Prerequisites

- Node.js 18+
- pnpm

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Update environment variables di `.env`:

```env
COMPANY_NAME="Mitologi Clothing"
SITE_NAME="Mitologi"
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-client-key"
NEXT_PUBLIC_MIDTRANS_SNAP_URL="https://app.sandbox.midtrans.com/snap/snap.js"
NEXT_PUBLIC_AI_SERVICE_URL="http://localhost:8001"
```

4. Start development server:

```bash
pnpm dev
```

App akan berjalan di [http://localhost:3000](http://localhost:3000/).

## Development Commands

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm dev`            | Start Next.js dev server (Turbopack) |
| `pnpm build`          | Build for production                 |
| `pnpm start`          | Start production server              |
| `pnpm prettier`       | Format code                          |
| `pnpm prettier:check` | Check code formatting                |

## Project Structure

```
nextjs-commerce/
├── app/
│   ├── (landing)/        # Landing page
│   ├── (shop)/           # Shop routes
│   ├── [page]/           # Dynamic CMS pages
│   ├── api/              # API routes
│   ├── search/           # Search
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── landing/          # Landing page components
│   ├── shop/             # Shop components
│   └── shared/           # Shared components
├── lib/
│   ├── api/              # API client functions
│   ├── hooks/            # React hooks
│   ├── utils/            # Utilities
│   ├── constants.ts      # App constants
│   └── notifier.ts       # Toast notifications
├── public/               # Static assets
└── e2e/                  # Playwright e2e tests
```

## Key Features

- **Product Catalog** - Products, categories, collections, variants
- **User Authentication** - Login, register, profile management
- **Shopping Cart** - Session-based cart for guest and authenticated users
- **Checkout** - Midtrans payment integration
- **Orders** - Order history and tracking
- **Wishlist** - Save favorite products
- **Recommendations** - AI-powered product recommendations
- **Chatbot** - AI-powered customer support

## API Integration

Frontend memanggil Laravel Backend API di `/api/*` endpoints:

- `/api/products` - Product listing
- `/api/auth/*` - Authentication
- `/api/cart/*` - Cart operations
- `/api/checkout` - Checkout process
- `/api/orders` - Order management
- `/api/recommendations` - Product recommendations

## Payment Integration

Menggunakan **Midtrans Snap** untuk payment processing:

- Sandbox: `https://app.sandbox.midtrans.com`
- Production: `https://app.midtrans.com`

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables (Production)

```env
NEXT_PUBLIC_API_URL="https://api.mitologi.id/api"
NEXT_PUBLIC_SITE_URL="https://mitologi.id"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-production-client-key"
NEXT_PUBLIC_MIDTRANS_SNAP_URL="https://app.midtrans.com/snap/snap.js"
```

## Testing

### E2E Tests (Playwright)

```bash
pnpm exec playwright test
```

Test configuration di `playwright.config.ts`.

## Code Style

- **Prettier** - Code formatting
- **TypeScript** - Type safety
- **ESLint** - Code quality (via Next.js)

Format code:

```bash
pnpm prettier
```

## Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Midtrans Docs](https://docs.midtrans.com/)
# FE_Mitologi_Clothing

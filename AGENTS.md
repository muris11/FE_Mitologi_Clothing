# nextjs-commerce

## Identity

- Next.js 16 frontend with Turbopack, React 19, TypeScript, and Tailwind CSS 4.
- Uses App Router with route groups: `(landing)`, `(shop)`, `[page]`, `api/`.
- Centralized API contracts in `lib/api/` for Laravel backend communication.

## Entry Points

- `app/layout.tsx` - Root layout with fonts, metadata, global providers
- `app/(landing)/page.tsx` - Landing page
- `app/(shop)/` - Shop route group with product listings
- `app/[page]/page.tsx` - Dynamic CMS pages
- `app/api/revalidate/route.ts` - Cache revalidation from Laravel
- `lib/api/` - API client wrappers and endpoint definitions

## Commands

```bash
pnpm install
pnpm dev          # Dev server with Turbopack on port 3011
pnpm build        # Production build
pnpm start        # Production server
pnpm test         # Run all tests (Vitest)
pnpm test -- path/to/file.test.ts    # Single test file
pnpm test:watch   # Watch mode
pnpm test:coverage # Coverage report
pnpm test:e2e     # Playwright E2E tests
pnpm lint         # ESLint + endpoint-lint + tsc --noEmit
pnpm prettier:check
pnpm prettier     # Format all files
pnpm lint:endpoints      # Custom endpoint validation
pnpm audit:endpoints     # Endpoint coverage audit
```

## Where To Look

| Task         | Location          | Notes                                  |
| ------------ | ----------------- | -------------------------------------- |
| API wrappers | `lib/api/`        | All Laravel API calls centralized here |
| Components   | `app/components/` | React components                       |
| Hooks        | `app/hooks/`      | Custom React hooks                     |
| Styles       | `app/globals.css` | Tailwind CSS imports                   |
| Config       | `next.config.ts`  | Rewrites, CSP, image domains           |
| Types        | `app/types/`      | TypeScript interfaces                  |
| Tests        | `*.test.ts`       | Colocated with source                  |
| E2E Tests    | `e2e/`            | Playwright tests                       |

## Conventions

- Import via `@/` path alias: `import { Button } from '@/app/components'`
- TypeScript: Strict mode, no implicit any
- Use `noUncheckedIndexedAccess` for safe array/object access
- API paths flow through `lib/api/endpoints.ts` and wrappers, not literal strings
- Component props: explicit interfaces, no `any`
- Error handling: Always check response status, throw on errors

## Code Style

- **Imports**: Absolute imports via `@/` for project files
- **Formatting**: Prettier 3.8.1 with `prettier-plugin-tailwindcss`
- **Types**: Explicit return types on exported functions
- **Naming**: PascalCase components, camelCase functions/variables
- **Error Handling**: Try/catch with specific error messages
- **Testing**: Vitest with jsdom, colocated test files

## Anti-Patterns

- Do not use raw `fetch()` for API calls; use `lib/api/` wrappers
- Do not hardcode API endpoints; use `endpoints.ts`
- Do not infer patterns from `.next/` build output
- Do not skip TypeScript strict checks

## Single Test Command

```bash
pnpm test -- app/components/Button.test.tsx
pnpm test:watch -- app/components/Button.test.tsx
```

## Pre-PR Checks

```bash
pnpm lint && pnpm test && pnpm prettier:check
```

## Cross-Service Notes

- Frontend cache invalidation triggered by Laravel via `app/api/revalidate/route.ts`
- API base URL: `NEXT_PUBLIC_API_URL` env var, defaults to `http://localhost:8011/api`
- Midtrans client key: `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` for payment UI

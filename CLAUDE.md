# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev               # dev server (Turbopack) on :3000
pnpm build             # production build (also runs tsc)
pnpm start             # serve the production build
pnpm lint              # ESLint (flat config, eslint-config-next)
pnpm typecheck         # tsc --noEmit
pnpm hash-password -- "plaintext"   # print ADMIN_PASSWORD_HASH (bcrypt)
```

No test framework is configured. `next build` runs TypeScript but **not** ESLint — run `lint` and `typecheck` separately before considering a change done.

## Stack

Next.js 16 (App Router, React 19, Turbopack) · TypeScript · Tailwind v4 + shadcn/ui · Mongoose/MongoDB · Cloudflare R2 (S3 API) · `jose` JWT + `bcryptjs` auth · `zod` validation. Package manager: pnpm.

## Architecture

All app code lives under `src/`. The `@/*` path alias maps to `src/*` (see `tsconfig.json`).

### Routing
- `src/app/(public)/` — marketing site. The route-group `layout.tsx` wraps children in `PublicLayout` (nav + footer); **pages must not re-wrap** in `PublicLayout`.
- `src/app/admin/login/` — public login page (outside the dashboard group so it is reachable while logged out).
- `src/app/admin/(dashboard)/` — gated admin. `layout.tsx` is a **server** component that calls `getSession()` and `redirect`s to login; it renders the client UI `dashboard-shell.tsx`. Put auth-sensitive logic in the server layout, interactive UI in the shell.
- `src/app/api/` — route handlers.

### Auth (three layers — keep all three when adding protected surfaces)
1. `src/proxy.ts` — **Edge gate** (Next 16's `proxy.ts` replaces `middleware.ts`; do not recreate `middleware.ts`). `config.matcher` covers `/admin/:path*` and `/api/:path*`; it redirects unauthenticated admin pages and 401s mutating/privileged API calls. Treat it as an optimistic check only.
2. Server `(dashboard)/layout.tsx` — authoritative page guard.
3. In-route `isAdmin()` from `src/lib/auth/guard.ts` — every mutating handler plus `/api/upload`, `/api/seed`, and the PII-bearing `GET /api/orders` calls it. Public reads (`GET /api/products[...]`) do not.

Sessions are HS256 JWTs (`src/lib/auth/session.ts`) in an `httpOnly` cookie named `r2r_session`. Credentials come only from env: `ADMIN_USERNAME` + `ADMIN_PASSWORD_HASH` (bcrypt). `getSession()` fails closed (errors → `null` → 401), so never let it throw.

### Data access
- `src/lib/services/products.ts` / `orders.ts` are the only place pages/routes read domain data. `getProducts`/`getProductById` **fall back to bundled mock data** (`src/lib/mock-data.ts`) when MongoDB is unreachable — the public site must never hard-fail. Orders are admin-only and read fresh (no fallback).
- The two DB-reading public pages (home, product detail) are `export const dynamic = "force-dynamic"`. There is no app-level cache layer (Redis was removed); rely on the pooled Mongoose connection in `src/lib/db/mongodb.ts`.
- Serializers (`serializeProduct`/`serializeOrder`) convert Mongo docs to the flat client types in `src/lib/types.ts` and are reused by both services and routes.

### Storage (Cloudflare R2)
`src/lib/storage/r2.ts` is `server-only`. `uploadProductImage` validates type/size, resizes to 800×600 WebP with `sharp`, and stores under `products/<uuid>.webp`. The public URL is `${R2_PUBLIC_URL}/${key}` — this construction is the source of truth, so `keyFromPublicUrl`/`deleteProductImageByUrl` derive the key back from the URL (no separate key column). Product PUT/DELETE call `deleteProductImageByUrl` to avoid orphans (best-effort, never throws). `/api/upload` must stay on `runtime = "nodejs"` (sharp is native).

### Environment (`src/lib/env.ts`)
Validation is **lazy and grouped** (`getDbEnv`/`getR2Env`/`getAuthEnv`) so a missing R2 secret never breaks DB features and the build never crashes for absent runtime secrets. Every `process.env.X` is referenced literally in the `raw` object so Next can inline values into the Edge proxy bundle — preserve that pattern when adding vars. Required vars are documented in `.env.example`.

### Validation & responses
Zod schemas in `src/lib/validation/` validate every write. Route handlers use the helpers in `src/lib/api/http.ts` (`ok`/`created`/`badRequest`/`unauthorized`/`notFound`/`serverError`/`fromZodError`/`readJson`) for consistent JSON shapes.

### Components
`src/components/ui/` is shadcn-generated — prefer the CLI/registry over hand-editing. `components.json` points `css` at `src/app/globals.css`. Other components are grouped by domain: `layout/`, `marketing/`, `product/`, `brand/`. The logo is a static import from `src/assets/logo.png`. Product `<Image>` uses `unoptimized`; the optimizer's allowed R2 host is derived from `R2_PUBLIC_URL` in `next.config.ts`.

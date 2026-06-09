# R2R Doors & Windows

Production storefront + admin dashboard for a custom doors & windows
manufacturer. Built with the Next.js App Router, MongoDB, and Cloudflare R2 for
image storage.

## Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, React 19)                   |
| Language       | TypeScript                                          |
| Styling        | Tailwind CSS v4 + shadcn/ui                         |
| Database       | MongoDB via Mongoose                                |
| Data access    | Pooled Mongoose connection, graceful mock-data fallback |
| Image storage  | Cloudflare R2 (S3-compatible), resized with `sharp` |
| Auth           | JWT session cookie (`jose`) + bcrypt, edge middleware |
| Validation     | Zod                                                 |

## Project structure

```
src/
├── app/
│   ├── (public)/            # Marketing site (shared PublicLayout)
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   └── products/
│   ├── admin/
│   │   ├── login/           # Public login page
│   │   └── (dashboard)/     # Auth-gated admin (dashboard, products, orders)
│   ├── api/
│   │   ├── auth/            # login / logout
│   │   ├── products/        # CRUD
│   │   ├── orders/          # list / create / status update
│   │   ├── upload/          # image upload → R2
│   │   └── seed/            # one-time data seed
│   ├── layout.tsx           # Root layout
│   └── globals.css
├── components/
│   ├── ui/                  # shadcn primitives
│   ├── layout/              # navbar, footer, public-layout
│   ├── product/             # product-card
│   ├── marketing/           # interactive-door
│   └── brand/               # logo
├── lib/
│   ├── api/                 # HTTP response helpers
│   ├── auth/                # session (jose) + password (bcrypt)
│   ├── db/                  # mongoose connection + models
│   ├── services/            # cached data access (products, orders)
│   ├── storage/             # Cloudflare R2 client
│   ├── validation/          # Zod schemas
│   ├── env.ts               # validated env access
│   ├── types.ts
│   └── utils.ts
├── hooks/
├── assets/                  # static imports (logo)
└── middleware.ts            # admin + mutating-API auth gate
```

## Getting started

### 1. Prerequisites

- Node.js 20+
- A MongoDB database (local or Atlas)
- A Cloudflare R2 bucket with a public URL (r2.dev or custom domain)

### 2. Install

```bash
npm install
```

### 3. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Generate the auth secret and admin password hash:

```bash
# AUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ADMIN_PASSWORD_HASH
npm run hash-password -- "your-strong-password"
```

### 4. Run

```bash
npm run dev
```

Open <http://localhost:3000>. The admin portal lives at `/admin` (you'll be
redirected to `/admin/login`).

### 5. Seed sample data (optional)

The seed endpoint is auth-protected. Log in to the admin first, then trigger it
from the browser/devtools or with an authenticated request:

```bash
curl -X POST http://localhost:3000/api/seed --cookie "r2r_session=<your-cookie>"
```

If the database is unreachable, the public site falls back to bundled mock data
so it never hard-fails.

## Cloudflare R2 setup

1. Create a bucket in the Cloudflare dashboard (R2).
2. Enable a **public** URL — either the bucket's `r2.dev` URL or connect a
   custom domain — and put it in `R2_PUBLIC_URL`.
3. Create an **R2 API token** with *Object Read & Write* and copy the Access
   Key ID / Secret into the env vars. `R2_ACCOUNT_ID` is your Cloudflare
   account id.

Uploads (`POST /api/upload`, admin-only) are resized to 800×600 WebP with
`sharp` before being stored, and served with a 1-year immutable cache header.

## Scripts

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start the dev server                 |
| `npm run build`         | Production build                     |
| `npm run start`         | Run the production build             |
| `npm run lint`          | ESLint                               |
| `npm run typecheck`     | TypeScript type checking (no emit)   |
| `npm run hash-password` | Generate a bcrypt admin password hash |

## Security notes

- All mutating API routes (`POST`/`PUT`/`PATCH`/`DELETE`) plus `/api/upload` and
  `/api/seed` require a valid admin session; enforced in `middleware.ts`.
- Sessions are signed JWTs stored in an `httpOnly`, `SameSite=Lax` cookie
  (`Secure` in production).
- Admin credentials live in env vars only; the password is stored as a bcrypt
  hash, never in plaintext.

# Hyrefast API Documentation

Interactive API documentation site for external developers integrating with the Hyrefast REST API.

## Tech Stack

- **[Nextra 4](https://nextra.site)** — MDX-powered docs framework on Next.js 15
- **[Scalar](https://scalar.com)** — Open-source interactive API reference from OpenAPI 3.1
- **[Next.js 15](https://nextjs.org)** — App Router

## Structure

```
app/
├── layout.tsx              # Nextra root layout (navbar, banner, footer)
├── _meta.json              # Top-level sidebar navigation
├── page.mdx                # Introduction page
├── quickstart/
│   └── page.mdx            # Quickstart guide
├── guides/
│   ├── _meta.json          # Guides sidebar config
│   ├── authentication/
│   │   └── page.mdx        # Authentication guide
│   ├── rate-limits/
│   │   └── page.mdx        # Rate limits guide
│   ├── error-handling/
│   │   └── page.mdx        # Error handling guide
│   └── best-practices/
│       └── page.mdx        # Best practices guide
└── reference/
    └── route.ts            # Scalar API Reference (interactive, full-page)

public/
└── openapi.yaml            # OpenAPI 3.1 spec (consumed by Scalar)

scripts/
└── patch-nextra.js         # Postinstall fix for Nextra 4.6.1 Zod bug
```

## Getting Started

```bash
npm install      # installs deps + auto-patches Nextra Zod bug
npm run dev     # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## How It Works

### Guide Pages (Nextra)

MDX files at `app/*/page.mdx` are rendered by Nextra with the docs theme — sidebar, TOC, search, dark mode. Edit these for guides, quickstart, and concept docs.

### API Reference (Scalar)

The route at `/reference` (`app/reference/route.ts`) uses `@scalar/nextjs-api-reference` to render a full-page interactive API reference from `public/openapi.yaml`.

**Developers can:**
1. Click the **Authentication** panel → paste their `X-API-Key`
2. Select environment (Production / Staging) from the server dropdown
3. Browse endpoints, fill in request bodies, click **Send**
4. See the live response inline — no Postman or curl needed
5. Copy auto-generated code snippets (cURL, JavaScript, Python)

### Updating the API Spec

Edit `public/openapi.yaml` directly. The Scalar reference auto-reloads on next page visit.

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Point a custom domain (`developers.hyrefast.ai`) in the Vercel dashboard.

### Self-hosted

```bash
npm run build
npm run start -- --port 3000
```

Put behind nginx/caddy with SSL for `developers.hyrefast.ai`.

## Nextra 4.6.1 Patch

There's a known bug in Nextra 4.6.1 where `LayoutPropsSchema` requires `children` as non-optional, but the Layout component destructures it out before Zod validation — causing a build/runtime error on every page.

The `postinstall` script (`scripts/patch-nextra.js`) automatically patches `node_modules/nextra-theme-docs/dist/schemas.js` to make `children: reactNode.optional()`. This runs after every `npm install`.

## Customization

- **Theme color**: Edit `--nextra-primary-hue` in `app/layout.tsx` (currently 212deg = blue)
- **Navbar logo**: Edit the `navbar` const in `app/layout.tsx`
- **Banner**: Edit the `banner` const in `app/layout.tsx`
- **Sidebar order**: Edit `_meta.json` files
- **Scalar theme**: Edit `theme` in `app/reference/route.ts` (options: `alternate`, `default`, `moon`, `purple`, `bluePlanet`, `deepSpace`, `saturn`, `kepler`, `mars`)
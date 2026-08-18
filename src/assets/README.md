# Bundled assets (`src/assets`)

Files here are **imported in code** and processed by the bundler (cache-busted filenames, tree-shaking).

Use this for images tied to a specific component when you do **not** need a stable public URL.

## Layout

| Path | Purpose |
|------|---------|
| `fonts/` | Self-hosted woff2 files (loaded via `next/font/local` in `src/lib/fonts/`) |
| `images/` | Component-specific raster/SVG imports |
| `icons/` | Small inline SVGs (if not using `@ant-design/icons`) |

## When to use `src/assets` vs `public/`

| Use `public/` | Use `src/assets/` |
|---------------|-------------------|
| Favicon, `robots.txt`, OG images | Image only one feature uses |
| Logo URL in emails or external docs | Imported in a single component |
| Files users download by URL | SVG imported as a module |
| Large files shared across many pages via same URL | Assets that must go through build pipeline |

## Code usage

```tsx
import Image from "next/image";
import authBackground from "@/assets/images/auth-background.webp";

<Image src={authBackground} alt="" fill priority />;
```

## Conventions

- Same naming rules as `public/`: `kebab-case`
- Colocate under feature when used once: `src/features/auth/assets/` is also valid
- Promote to `src/assets/` when shared by 2+ features; promote to `public/images/` when a stable URL is required

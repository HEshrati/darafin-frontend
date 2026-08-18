# Public static files

Served from the site root. Reference with absolute paths: `/images/brand/logo.svg`.

Do **not** put secrets or environment-specific config here — everything in `public/` is publicly accessible.

## Layout

| Path | Purpose | Example URL |
|------|---------|-------------|
| `images/brand/` | Logos, wordmarks, favicon sources | `/images/brand/logo.svg` |
| `images/illustrations/` | Marketing, auth hero, empty-state art | `/images/illustrations/auth-hero.webp` |
| `images/og/` | Open Graph / social preview images | `/images/og/default.png` |
| `files/` | User-downloadable static files (PDF samples, CSV templates) | `/files/sample-invoice.csv` |
| `fonts/` | Self-hosted fonts (only if not using `next/font`) | `/fonts/custom.woff2` |

## Conventions

- **File names:** `kebab-case` — `logo-dark.svg`, `auth-hero.webp`
- **Formats:** `svg` for logos/icons, `webp` or `png` for photos/illustrations, `ico`/`png` for favicons
- **Size:** optimize before commit; prefer WebP for raster images
- **RTL:** provide mirrored illustrations only when design requires it

## Code usage

Prefer path constants from `@/lib/constants/assets` instead of hard-coded strings.

```tsx
import Image from "next/image";
import { publicAssets } from "@/lib/constants/assets";

<Image src={publicAssets.images.brand.logo} alt="دارافین" width={120} height={40} />;
```

For metadata (`openGraph.images`), use the same constants.

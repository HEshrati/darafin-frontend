# IRANSansWeb (self-hosted)

Font files for the app primary typeface. Loaded via **`next/font/local`** in `src/lib/fonts/iran-sans.ts` — **not** via `public/fonts/` or manual `@font-face` in CSS.

## Setup

1. Copy your downloaded `.woff2` files into this folder.
2. Rename them to match the names below (kebab-case).

| Typical download name | Save as |
|-----------------------|---------|
| `IRANSansWeb_UltraLight.woff2` | `iran-sans-web-ultralight.woff2` |
| `IRANSansWeb_Light.woff2` | `iran-sans-web-light.woff2` |
| `IRANSansWeb.woff2` | `iran-sans-web-regular.woff2` |
| `IRANSansWeb_Medium.woff2` | `iran-sans-web-medium.woff2` |
| `IRANSansWeb_Bold.woff2` | `iran-sans-web-bold.woff2` |

If you use the **FaNum** variant, rename the same way (e.g. `IRANSansWeb(FaNum).woff2` → `iran-sans-web-regular.woff2`).

You may omit weights you do not need — remove the matching entry from `src/lib/fonts/iran-sans.ts`.

## Usage

The CSS variable `--font-iran-sans` is set on `<html>` in the root layout. Theme tokens reference it:

```ts
fontFamily: "var(--font-iran-sans), Tahoma, sans-serif"
```

Do not reference font files by URL in components.

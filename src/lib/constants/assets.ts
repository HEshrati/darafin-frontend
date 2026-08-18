/**
 * Central registry for public static asset paths under /public.
 * Add entries when new files are placed in public/images, public/files, etc.
 */
export const publicAssets = {
  images: {
    brand: {
      authBackground: "/images/brand/auth-background.png",
      logo: "/images/brand/logo.svg",
      logoDark: "/images/brand/logo-dark.svg",
      favicon: "/favicon.ico",
    },
    illustrations: {
      authHero: "/images/illustrations/auth-hero.webp",
    },
    og: {
      default: "/images/og/default.png",
    },
  },
  files: {
    // sampleInvoiceCsv: "/files/sample-invoice.csv",
  },
} as const;

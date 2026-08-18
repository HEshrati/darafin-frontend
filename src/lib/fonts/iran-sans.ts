import localFont from "next/font/local";

/**
 * IRANSansWeb — self-hosted via next/font/local (optimized, no layout shift).
 * Place woff2 files in src/assets/fonts/ — see src/assets/fonts/README.md.
 */
export const iranSans = localFont({
  src: [
    {
      path: "../../assets/fonts/iran-sans-web-ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iran-sans-web-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iran-sans-web-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iran-sans-web-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/iran-sans-web-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans",
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

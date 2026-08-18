/**
 * Design tokens sourced from Figma variables.
 * Update values here when designers publish new tokens — antd-theme.ts maps these automatically.
 *
 * Figma variable naming convention (recommended):
 *   color/brand/primary, color/text/primary, spacing/md, radius/lg, …
 */
export const figmaTokens = {
  colors: {
    /** Figma: color/brand/primary */
    primary: "#257A75",
    /** Figma: color/brand/primary-hover */
    primaryHover: "#4096FF",
    /** Figma: color/brand/primary-active */
    primaryActive: "#0958D9",
    /** Figma: color/background/page */
    backgroundPage: "#F5F7FA",
    /** Figma: color/background/elevated */
    backgroundElevated: "#FFFFFF",
    /** Figma: color/background/brand-panel */
    backgroundBrandPanel: "#0B1F3A",
    /** Figma: color/text/primary */
    textPrimary: "#1F2937",
    /** Figma: color/text/secondary */
    textSecondary: "#6B7280",
    /** Figma: color/text/inverse */
    textInverse: "#FFFFFF",
    /** Figma: color/border/default */
    borderDefault: "#E5E7EB",
    /** Figma: color/status/error */
    error: "#FF4D4F",
    /** Figma: color/status/success */
    success: "#52C41A",
  },
  typography: {
    /** Figma: font/family/primary */
    fontFamily: "var(--font-vazirmatn), Tahoma, sans-serif",
    fontSizeBase: 14,
    fontSizeHeading1: 30,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    lineHeightBase: 1.5715,
  },
  spacing: {
    /** Figma: spacing/xs … spacing/2xl */
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    /** Figma: radius/sm, radius/md, radius/lg */
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
  layout: {
    /** Figma: layout/auth-card-width */
    authCardMaxWidth: 420,
    /** Figma: layout/content-max-width */
    contentMaxWidth: 1200,
  },
} as const;

export type FigmaTokens = typeof figmaTokens;

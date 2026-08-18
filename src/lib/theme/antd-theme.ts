import type { ThemeConfig } from "antd";

import { figmaTokens } from "./figma-tokens";

const { colors, typography, radius, spacing } = figmaTokens;

/**
 * Ant Design theme derived from Figma tokens.
 * @see https://ant.design/docs/react/customize-theme
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorPrimaryHover: colors.primaryHover,
    colorPrimaryActive: colors.primaryActive,
    colorBgContainer: colors.backgroundElevated,
    colorBgLayout: colors.backgroundPage,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorBorder: colors.borderDefault,
    colorError: colors.error,
    colorSuccess: colors.success,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizeBase,
    lineHeight: typography.lineHeightBase,
    borderRadius: radius.md,
    borderRadiusLG: radius.lg,
    borderRadiusSM: radius.sm,
    controlHeight: 44,
    controlHeightLG: 48,
    paddingContentHorizontal: spacing.lg,
    paddingContentVertical: spacing.md,
  },
  components: {
    Button: {
      primaryShadow: "none",
      defaultShadow: "none",
      fontWeight: 500,
      controlHeight: 44,
      borderRadius: radius.md,
    },
    Input: {
      controlHeight: 44,
      borderRadius: radius.md,
      paddingInline: spacing.md,
    },
    Card: {
      borderRadiusLG: radius.lg,
      paddingLG: spacing.lg,
    },
    Form: {
      labelFontSize: typography.fontSizeBase,
      verticalLabelPadding: `0 0 ${spacing.sm}px`,
    },
    Layout: {
      bodyBg: colors.backgroundPage,
      headerBg: colors.backgroundElevated,
      siderBg: colors.backgroundBrandPanel,
    },
    Menu: {
      darkItemBg: colors.backgroundBrandPanel,
      darkSubMenuItemBg: colors.backgroundBrandPanel,
    },
  },
};

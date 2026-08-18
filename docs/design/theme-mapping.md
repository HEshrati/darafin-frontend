# Mapping Figma variables to Ant Design theme

Update **`src/lib/theme/figma-tokens.ts`** when designers change tokens in Figma.  
**`src/lib/theme/antd-theme.ts`** maps those values to Ant Design `ThemeConfig` — do not edit colors there directly.

## Workflow

1. Export or copy token values from Figma (Variables panel).
2. Paste into `figma-tokens.ts` under the matching key.
3. Run `yarn dev` and check `/login` plus the Ant Design dev preview if needed.
4. If a token has no antd equivalent, add a CSS override in `globals.css` and document it here.

## Common mappings

| Figma variable (example) | `figma-tokens` key | Ant Design token |
|--------------------------|-------------------|------------------|
| `color/brand/primary` | `colors.primary` | `token.colorPrimary` |
| `color/background/page` | `colors.backgroundPage` | `token.colorBgLayout` |
| `color/background/surface` | `colors.backgroundElevated` | `token.colorBgContainer` |
| `color/text/primary` | `colors.textPrimary` | `token.colorText` |
| `color/text/secondary` | `colors.textSecondary` | `token.colorTextSecondary` |
| `radius/md` | `radius.md` | `token.borderRadius` |
| `font/family/primary` | `typography.fontFamily` | `token.fontFamily` |
| `spacing/*` | `spacing.*` | padding / component tokens |

## Component-level tokens

Use `theme.components` in `antd-theme.ts` for per-component tweaks (Button height, Input radius, Card padding).  
See [Ant Design customize theme](https://ant.design/docs/react/customize-theme).

## Notes

- Project uses **antd v6** (native React 19 support — no v5 patch required).
- RTL and Persian locale are set in `AppProviders`.
- UI copy is Persian; code and comments are English.

"use client";

/**
 * Ant Design layout components as named exports.
 * Do not use Layout.Content / Layout.Sider dot notation in JSX.
 */
export { default as Layout } from "antd/es/layout";
export { Content as LayoutContent } from "antd/es/layout/layout";
export { default as LayoutSider } from "antd/es/layout/Sider";

export type { LayoutProps, SiderProps as LayoutSiderProps } from "antd/es/layout";

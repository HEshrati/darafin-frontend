"use client";

/**
 * Ant Design typography subcomponents as named exports.
 * Do not use Typography.Title dot notation — it breaks across the Next.js server/client boundary.
 * @see https://ant.design/docs/react/use-with-next/
 */
export { default as Title } from "antd/es/typography/Title";
export { default as Paragraph } from "antd/es/typography/Paragraph";
export { default as Text } from "antd/es/typography/Text";
export { default as Link } from "antd/es/typography/Link";

export type { TitleProps } from "antd/es/typography/Title";
export type { ParagraphProps } from "antd/es/typography/Paragraph";
export type { TextProps } from "antd/es/typography/Text";
export type { LinkProps } from "antd/es/typography/Link";

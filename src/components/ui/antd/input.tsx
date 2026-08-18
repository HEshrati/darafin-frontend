"use client";

/**
 * Ant Design input components as named exports.
 * Do not use Input.Password dot notation — it breaks across the Next.js server/client boundary.
 * @see https://ant.design/docs/react/use-with-next/
 */
export { default as Input } from "antd/es/input/Input";
export { default as PasswordInput } from "antd/es/input/Password";
export { default as TextArea } from "antd/es/input/TextArea";
export { default as SearchInput } from "antd/es/input/Search";

export type { InputProps, InputRef } from "antd/es/input/Input";
export type { PasswordProps } from "antd/es/input/Password";

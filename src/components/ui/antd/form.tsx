"use client";

/**
 * Ant Design form components as named exports.
 * Do not use Form.Item dot notation — it breaks across the Next.js server/client boundary.
 * @see https://ant.design/docs/react/use-with-next/
 */
export { default as Form } from "antd/es/form";
export { default as FormItem } from "antd/es/form/FormItem";
export { default as FormList } from "antd/es/form/FormList";

export type { FormProps, FormInstance } from "antd/es/form";
export type { FormItemProps } from "antd/es/form/FormItem";
export type { FormListProps } from "antd/es/form/FormList";

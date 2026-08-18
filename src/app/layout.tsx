import type { Metadata } from "next";

import { AppProviders } from "@/components/providers";
import { iranSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "دارافین",
  description: "سامانه تأمین مالی زنجیره تأمین دارویی",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

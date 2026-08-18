"use client";

import Image from "next/image";

import { Title, Paragraph } from "@/components/ui/antd";
import { publicAssets } from "@/lib/constants";
import { figmaTokens } from "@/lib/theme";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AuthLayout({
  children,
  title = "دارافین",
  subtitle = "سامانه تأمین مالی زنجیره تأمین دارویی",
}: AuthLayoutProps) {
  const { colors, spacing, layout } = figmaTokens;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.lg,
        }}
      >
        <div style={{ width: "100%", maxWidth: layout.authCardMaxWidth }}>{children}</div>
      </main>
      <aside
        style={{
          flex: 1,
          display: "none",
          color: colors.textInverse,
        }}
        className="auth-brand-panel"
      >
        <Image
          src={publicAssets.images.brand.authBackground}
          alt=""
          fill
          priority
          sizes="50vw"
          aria-hidden
          className="auth-brand-panel__image"
        />
        <div style={{ position: "relative", zIndex: 1, padding: spacing.xxl, maxWidth: 480 }}>
          <Title level={2} style={{ color: colors.textInverse, marginTop: 0 }}>
            {title}
          </Title>
          <Paragraph style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, marginBottom: 0 }}>
            {subtitle}
          </Paragraph>
        </div>
      </aside>
    </div>
  );
}

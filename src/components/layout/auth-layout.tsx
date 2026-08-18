"use client";

import Image from "next/image";

import { Flex, LayoutContent, LayoutSider, Title } from "@/components/ui/antd";
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
    <Flex style={{ minHeight: "100vh" }}>
      <LayoutContent
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: spacing.lg,
        }}
      >
        <Flex vertical style={{ width: "100%", maxWidth: layout.authCardMaxWidth }}>
          {children}
        </Flex>
      </LayoutContent>

      <LayoutSider
        className="auth-brand-panel"
        width="50%"
        theme="light"
        aria-label={`${title} — ${subtitle}`}
        style={{
          color: colors.textInverse,
          position: "relative",
          background: "transparent",
        }}
      >
        <Image
          src={publicAssets.images.brand.authBackground}
          alt=""
          fill
          priority
          aria-hidden
          className="auth-brand-panel__image"
        />
        <Flex
          vertical
          style={{ position: "relative", zIndex: 1, padding: spacing.xxl, maxWidth: 480 }}
        >
          <Title level={2} style={{ color: colors.textInverse, marginTop: 0 }}>
            {title}
          </Title>
        </Flex>
      </LayoutSider>
    </Flex>
  );
}

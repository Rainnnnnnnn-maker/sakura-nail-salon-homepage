import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const seoTitle =
  "名古屋市北区のネイルサロン｜桜ネイルサロン（上飯田駅徒歩2分）";
const seoDescription =
  "名古屋市北区でネイルサロンをお探しなら、上飯田駅徒歩2分の桜ネイルサロンへ。1200色以上のカラーと丁寧なケアで、ワンカラー・マグネットネイル・持ち込みデザインまで対応。駐車場あり。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seoTitle,
    template: "%s｜桜ネイルサロン",
  },
  description: seoDescription,
  applicationName: "桜ネイルサロン",
  keywords: [
    "名古屋市北区 ネイル",
    "名古屋市北区 ネイルサロン",
    "上飯田 ネイルサロン",
    "上飯田 ネイル",
    "桜ネイルサロン",
  ],
  authors: [{ name: "桜ネイルサロン" }],
  creator: "桜ネイルサロン",
  publisher: "桜ネイルサロン",
  category: "ネイルサロン",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "桜ネイルサロン",
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "桜ネイルサロンの上品なジェルネイル",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: "/images/og-image.jpg",
        alt: "桜ネイルサロンの上品なジェルネイル",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fff1f5",
  width: "device-width",
  initialScale: 1,
};

// Cloudflare Web Analytics。トークンはビルド時に .env.production から焼き込まれる
// （未設定ならスクリプト自体を出力しない）
const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
      {cfBeaconToken && (
        <Script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
        />
      )}
    </html>
  );
}

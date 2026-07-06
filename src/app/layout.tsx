import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "名古屋市北区のネイルサロン｜桜ネイルサロン 上飯田駅徒歩2分",
    template: "%s｜桜ネイルサロン",
  },
  description:
    "名古屋市北区でネイルサロンをお探しなら、上飯田駅徒歩2分の桜ネイルサロンへ。700色のカラー、豊富なパーツ、丁寧なケアでシンプルネイルから持ち込みデザインまで対応。駐車場あり。",
  keywords: [
    "名古屋 北区 ネイル",
    "名古屋市北区 ネイル",
    "名古屋市北区 ネイルサロン",
    "北区 ネイル",
    "上飯田 ネイルサロン",
    "上飯田 ネイル",
    "桜ネイルサロン",
    "シンプルネイル 名古屋市北区",
    "マグネットネイル 名古屋",
    "持ち込みネイル 名古屋",
    "韓国ネイル 名古屋",
    "駐車場あり ネイルサロン",
  ],
  authors: [{ name: "桜ネイルサロン" }],
  creator: "桜ネイルサロン",
  publisher: "桜ネイルサロン",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "桜ネイルサロン",
    title: "名古屋市北区のネイルサロン｜桜ネイルサロン 上飯田駅徒歩2分",
    description:
      "名古屋市北区・上飯田駅徒歩2分。700色から選べるカラーと丁寧なケアで、シンプルから持ち込みデザインまで理想のネイルをご提案します。",
    images: [
      {
        url: "/images/hero-sakura-nail.png",
        width: 1717,
        height: 916,
        alt: "桜ネイルサロンの上品なジェルネイル",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "名古屋市北区のネイルサロン｜桜ネイルサロン 上飯田駅徒歩2分",
    description:
      "名古屋市北区・上飯田駅徒歩2分。丁寧なケアと美しいフォルムが魅力のネイルサロン。",
    images: ["/images/hero-sakura-nail.png"],
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
  themeColor: "#f6f0e9",
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
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${cfBeaconToken}"}`}
        />
      )}
    </html>
  );
}

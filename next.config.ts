import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // 画像の最適化を無効化する,Cloudflare Workersでの画像最適化の問題を回避するため
  },
};

export default nextConfig;

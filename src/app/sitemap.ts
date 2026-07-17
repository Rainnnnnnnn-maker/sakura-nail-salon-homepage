import type { MetadataRoute } from "next";

// output: "export" ではルートハンドラに静的生成の明示が必須
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/images/hero-sakura-nail.webp`,
        `${siteUrl}/images/magnetic-nail.webp`,
        `${siteUrl}/images/micro-french-nail.webp`,
      ],
    },
  ];
}

import type { MetadataRoute } from "next";

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
        `${siteUrl}/images/hero-sakura-nail.png`,
        `${siteUrl}/images/magnetic-nail.png`,
        `${siteUrl}/images/micro-french-nail.png`,
      ],
    },
  ];
}

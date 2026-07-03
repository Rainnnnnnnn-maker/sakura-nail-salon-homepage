import type { MetadataRoute } from "next";

// output: "export" ではルートハンドラに静的生成の明示が必須
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "桜ネイルサロン",
    short_name: "桜ネイル",
    description: "名古屋市北区・上飯田駅徒歩2分のネイルサロン",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f4",
    theme_color: "#6e1f2b",
    lang: "ja",
  };
}

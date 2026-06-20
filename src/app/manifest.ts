import type { MetadataRoute } from "next";

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

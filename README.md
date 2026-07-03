# 桜ネイルサロン Website

名古屋市北区・上飯田の「桜ネイルサロン」公式サイトです。
Next.js App Router、TypeScript、Tailwind CSS v4で構築しています。

## 開発

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` の `NEXT_PUBLIC_SITE_URL` を実際の公開URLに変更してください。
この値は canonical URL、OGP、JSON-LD、sitemap、robots.txt に使用されます。

## 検証

```bash
npm run lint
npm run build
npm run preview  # ビルド結果を http://localhost:8787 で確認（wrangler dev）
```

`output: "export"`（静的エクスポート）のため `next start` は使えません。

## デプロイ

Cloudflare Workers（Static Assets）へデプロイします。手順の詳細は
[__docs__/cloudflare-deploy.md](__docs__/cloudflare-deploy.md) を参照してください。

```bash
npm run deploy
```

本番URL（`https://sakura-nail-salon.paulowniarain.workers.dev`）は `.env.production` の
`NEXT_PUBLIC_SITE_URL` に設定済みで、ビルド時に自動で使用されます。
カスタムドメインへ移行する際は `.env.production` を更新して再デプロイしてください。

## 予約・店舗情報

予約リンクはHOT PEPPER Beautyの桜ネイルサロン予約ページへ接続しています。
料金・営業時間・店舗情報を変更した場合は、`src/app/page.tsx` 内の表示情報と
構造化データをあわせて更新してください。

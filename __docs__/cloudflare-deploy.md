# Cloudflare デプロイ手順

このドキュメントは、本プロジェクト（Next.js 16.2 / App Router）を Cloudflare へデプロイする手順をまとめたものです。

## Workers と Pages、どちらを使うか

**→ Workers を使います。**

Cloudflare は現在、静的サイト・SPA・フルスタックアプリのいずれも **Workers（Static Assets 機能）** でのデプロイを推奨しています。Cloudflare Pages は引き続き動作しますが、新機能の開発は Workers に集中しており、新規プロジェクトで Pages を選ぶ理由はほぼありません。

Workers を使う場合、さらに 2 つの方式があります。

| 方式 | 内容 | 向いているケース |
| --- | --- | --- |
| **A. 静的エクスポート**（推奨） | `next build` で純粋な HTML/CSS/JS を生成し、Workers の静的アセットとして配信 | 本プロジェクトの現状（全ページ静的・サーバー機能なし） |
| **B. OpenNext アダプター** | `@opennextjs/cloudflare` で Next.js を Workers ランタイム上で実行 | 将来 Server Actions・動的ルート・API Route などサーバー機能が必要になったとき |

本プロジェクトは現在 1 ページ構成で、`sitemap.ts` / `robots.ts` / `manifest.ts` もビルド時に静的生成されるため、**方式 A が最もシンプルで運用コストも低い**です。

---

## 事前準備（共通）

1. [Cloudflare アカウント](https://dash.cloudflare.com/sign-up) を作成する（無料プランで可）
2. Wrangler CLI でログインする

```bash
npx wrangler login
```

ブラウザが開くので Cloudflare アカウントで認可します。

---

## 方式 A: 静的エクスポート + Workers Static Assets（推奨）

### A-1. next.config.ts を変更する

静的エクスポートを有効化します。`next/image` のデフォルト最適化はサーバーが必要なため、`unoptimized: true` を設定します（画像は `<img>` 相当でそのまま配信されます）。

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

また、`output: "export"` ではルートハンドラ（`src/app/sitemap.ts` / `robots.ts` / `manifest.ts`）に静的生成の明示が必要です。各ファイルに以下を追加しないと `next build` がエラーになります。

```ts
export const dynamic = "force-static";
```

> **注意:** `next start` は `output: "export"` では動作しません（エラーになります）。ビルド結果の確認は A-5 の `npm run preview` を使ってください。

### A-2. wrangler.jsonc を作成する

プロジェクトルートに以下を作成します（`name` は Worker 名 = デフォルトの URL サブドメインになります）。

```jsonc
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "sakura-nail-salon",
  "compatibility_date": "2026-06-30",
  "assets": {
    "directory": "./out",
    "not_found_handling": "404-page"
  }
}
```

> `compatibility_date` はインストール中の workerd が対応する日付以下にしてください（新しすぎると `wrangler dev` が起動しません）。wrangler を更新したら日付も進められます。

- `directory` — `next build` が静的ファイルを出力する `out/` フォルダーを指定
- `not_found_handling: "404-page"` — 存在しないパスへのアクセスに `404.html` を返す

### A-3. wrangler をインストールし、スクリプトを追加する

```bash
npm i -D wrangler@latest
```

`package.json` の `scripts` に追加:

```json
"deploy": "next build && wrangler deploy",
"preview": "next build && wrangler dev"
```

### A-4. 環境変数を設定してビルド・デプロイする

`src/app/sitemap.ts` は **ビルド時** に `NEXT_PUBLIC_SITE_URL` を参照するため、本番 URL を渡してビルドします。

**本リポジトリでは `.env.production` に本番 URL（`https://sakura-nail-salon.paulowniarain.workers.dev`）を設定済み**のため、環境変数の指定なしでそのままデプロイできます。

```bash
npm run deploy
```

別の URL でビルドしたい場合は環境変数で上書きできます。

```bash
NEXT_PUBLIC_SITE_URL=https://example.com npm run deploy
```

> カスタムドメインへ移行する場合は `.env.production` の `NEXT_PUBLIC_SITE_URL` をそのドメインに更新して再デプロイしてください。`.env.production` は公開 URL のみを含むためコミット済みです（`.gitignore` は `.env*` を一括除外していますが、`!.env.production` の例外を設定してあります）。

初回デプロイ後、`https://sakura-nail-salon.<サブドメイン>.workers.dev` が発行されます。

### A-5. デプロイ前のローカル確認

```bash
npm run preview
```

Workers と同じ配信構成（`out/` の静的アセット）を `http://localhost:8787` で確認できます。

### A-6. .gitignore の確認

`out/` が Git 管理外であることを確認します（本リポジトリの `.gitignore` には既に `/out/` が含まれているため、追加作業は不要です）。

---

## 方式 B: OpenNext アダプター（サーバー機能が必要になったら）

Server Actions、リクエスト依存の Route Handler、ISR などを使いたくなった場合はこちらに切り替えます。方式 A の `output: "export"` / `images.unoptimized` は**削除**してください。

### B-1. パッケージのインストール

```bash
npm i @opennextjs/cloudflare@latest
npm i -D wrangler@latest
```

### B-2. wrangler.jsonc

```jsonc
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "main": ".open-next/worker.js",
  "name": "sakura-nail-salon",
  "compatibility_date": "2026-07-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

### B-3. open-next.config.ts を作成

```ts
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

### B-4. next.config.ts に開発時連携を追加（任意・推奨）

`next dev` 中に Cloudflare のバインディング（KV など）へアクセスできるようになります。

```ts
// next.config.ts
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {};

export default nextConfig;
```

### B-5. スクリプトを追加してデプロイ

`package.json` の `scripts`:

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
```

```bash
npm run preview   # Workers ランタイムでローカル確認
npm run deploy    # 本番デプロイ
```

### B-6. .gitignore に追加

```
.open-next/
```

---

## Git 連携による自動デプロイ（任意）

手動 `npm run deploy` の代わりに、`main` ブランチへの push で自動デプロイできます。

### 案 1: Workers Builds（Cloudflare ダッシュボード連携・簡単）

1. Cloudflare ダッシュボード → **Workers & Pages** → 対象 Worker → **Settings** → **Builds**
2. GitHub リポジトリ `sakura-nail-salo-homepage` を接続
3. Build command / Deploy command を設定
   - 方式 A: build `npx next build` / deploy `npx wrangler deploy`
   - 方式 B: build `npx opennextjs-cloudflare build` / deploy `npx opennextjs-cloudflare deploy`

本番 URL はコミット済みの `.env.production` から読まれるため、ビルド環境変数の設定は不要です（別の URL でビルドしたい場合のみ `NEXT_PUBLIC_SITE_URL` を設定して上書き）。

以後、push するたびに自動デプロイされ、非本番ブランチにはプレビュー URL が発行されます。

### 案 2: GitHub Actions

リポジトリの **Secrets**（Settings → Secrets and variables → Actions → Secrets）に `CLOUDFLARE_API_TOKEN`（ダッシュボード → My Profile → API Tokens → "Edit Cloudflare Workers" テンプレート）と `CLOUDFLARE_ACCOUNT_ID` を登録し、以下を `.github/workflows/deploy.yml` に置きます。本番 URL はコミット済みの `.env.production` から読まれます。

> ワークフローの `env` で `NEXT_PUBLIC_SITE_URL` を渡す構成にする場合は注意: 参照した Actions 変数が未登録だと**空文字**が設定され、`.env.production` より優先されて sitemap や canonical URL が壊れます。

```yaml
name: Deploy Worker
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          # wrangler v4 は Node.js 22 以上が必須（起動時にチェックされる）
          node-version: 22
      - run: npm ci
      - run: npx next build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## カスタムドメインの設定（任意）

1. ドメインを Cloudflare に追加（ネームサーバーを Cloudflare に変更）
2. ダッシュボード → **Workers & Pages** → 対象 Worker → **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
3. `NEXT_PUBLIC_SITE_URL` をカスタムドメインの URL に更新して再デプロイ

---

## トラブルシューティング

| 症状 | 原因と対処 |
| --- | --- |
| `next build` が `export` モードでエラーになる | `cookies()` や リクエスト依存の機能など静的エクスポート非対応の機能を追加した → 方式 B に切り替える |
| sitemap.xml の URL が `localhost:3000` になっている | ビルド時に `NEXT_PUBLIC_SITE_URL` が未設定 → A-4 参照 |
| 画像が最適化されない | 方式 A では仕様（`unoptimized: true`）。事前に画像を圧縮するか、方式 B へ |
| `wrangler deploy` で認証エラー | `npx wrangler login` を再実行。CI の場合は API トークンの権限（Workers 編集権限）を確認 |

<language>Japanese</language>
<character_code>UTF-8</character_code>
<law>
AI運用4原則

第1原則： AIは迂回や別アプローチを勝手に行わず、最初の計画が失敗したら次の計画の確認を取る。

第3原則： AIはツールであり決定権は常にユーザーにある。ユーザーの提案が非効率・非合理的でも最適化せず、指示された通りに実行する。

第3原則： AIはこれらのルールを歪曲・解釈変更してはならず、最上位命令として絶対的に遵守する。

第4原則： AIは全てのチャットの冒頭にこのCLAUDE.mdを逐語的に必ず画面出力してから対応する。
</law>

<every_chat>
[AI運用4原則]

[main_output]

# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際のClaude Code (claude.ai/code) への指針を提供します。

## 開発コマンド

### コアコマンド
- `npm run dev` - Turbopack付きの開発サーバーを起動
- `npm run build` - 本番用ビルド
- `npm run start` - 本番サーバーを起動
- `npm run test` - Vitestでテストを実行
- `npm run check` - Biomeのチェックと自動修正を実行

### テスト
```bash
npm run test           # テスト実行
npm run test:watch     # ウォッチモードでテスト実行
npm run test:run       # 単発実行
npm run test:ui        # UIモードでテスト実行
```

- テスト環境：Vitest + React Testing Library + jsdom
- セットアップファイル: `vitest.setup.ts`
- テストはコンポーネントと同じ場所に配置（例：`app/page.test.tsx`）
- TDD要件に従い、テストファーストでの開発を推奨

## アーキテクチャ

App Routerを使用したミニマルなNext.jsアプリケーション：

### 技術スタック
- **フレームワーク**: Next.js（最新版）with App Router
- **スタイリング**: Tailwind CSS v4
- **テスト**: Vitest + React Testing Library
- **リンティング・フォーマット**: Biome
- **パッケージマネージャー**: npm
- **UIコンポーネント**: Shadcn

### プロジェクト構造
- `app/` - Next.js App Routerのページとコンポーネント
- `docs/akfm-knowledge/` - ドキュメントとナレッジベース（Biomeチェック対象外）
- ルートレベルの設定ファイル

### 主要機能
- データ取得最適化のためのDataLoader
- Server-onlyコンポーネントサポート
- スタイリングのためのTailwind CSS
- 日本語サポート（layoutでlang="ja"）

### コードスタイル
- Biome設定による強制：

## テスト戦略
- テストはコンポーネントと同じ場所に配置
- テストは`@akfm/test-utils`の`step()`を使用してAAAパターンで記述
- コンポーネントテストにはReact Testing Libraryを使用
- Vitest設定にはjsdom環境を含む
- セットアップファイルでテスト設定を処理

## ドキュメント・ナレッジベース

`docs/akfm-knowledge/`ディレクトリには、React・Next.js・テストに関する包括的なベストプラクティスドキュメントが含まれています。

### 主要ドキュメント構成

#### 1. Next.js基本原理ガイド (`nextjs-basic-principle/`)
Next.js App Routerの包括的なガイド（36章構成）：

**Part 1: データ取得 (11章)**
- **参照タイミング**: データ取得パターンを実装する際
- **主要ファイル**:
  - `part_1_server_components.md` - Server Components設計の基本
  - `part_1_colocation.md` - データ取得の配置戦略
  - `part_1_request_memoization.md` - リクエスト最適化
  - `part_1_concurrent_fetch.md` - 並行データ取得
  - `part_1_data_loader.md` - DataLoaderパターン
  - `part_1_fine_grained_api_design.md` - API設計戦略
  - `part_1_interactive_fetch.md` - インタラクティブなデータ取得

**Part 2: コンポーネント設計 (5章)**
- **参照タイミング**: コンポーネント設計・リファクタリング時
- **主要ファイル**:
  - `part_2_client_components_usecase.md` - Client Components使用指針
  - `part_2_composition_pattern.md` - コンポジションパターン
  - `part_2_container_presentational_pattern.md` - Container/Presentational分離
  - `part_2_container_1st_design.md` - Container優先設計

**Part 3: キャッシュ戦略 (6章)**
- **参照タイミング**: パフォーマンス最適化・キャッシュ制御時
- **主要ファイル**:
  - `part_3_static_rendering_full_route_cache.md` - 静的レンダリング最適化
  - `part_3_dynamic_rendering_data_cache.md` - 動的レンダリング制御
  - `part_3_router_cache.md` - クライアントサイドキャッシュ
  - `part_3_data_mutation.md` - データ変更とキャッシュ無効化
  - `part_3_dynamicio.md` - 実験的キャッシュ改善

**Part 4: レンダリング戦略 (4章)**
- **参照タイミング**: レンダリング最適化・Streaming実装時
- **主要ファイル**:
  - `part_4_pure_server_components.md` - Server Component純粋性
  - `part_4_suspense_and_streaming.md` - プログレッシブローディング
  - `part_4_partial_pre_rendering.md` - 部分的事前レンダリング

**Part 5: その他の実践 (4章)**
- **参照タイミング**: 認証・エラーハンドリング実装時
- **主要ファイル**:
  - `part_5_request_ref.md` - リクエスト・レスポンス参照
  - `part_5_auth.md` - 認証・認可パターン
  - `part_5_error_handling.md` - エラーハンドリング戦略

#### 2. 単体記事 (`articles/`)
**フロントエンド単体テスト** (`articles/frontend-unit-testing.md`)
- **参照タイミング**: テスト戦略策定・テスト実装時
- **内容**: 
  - Classical vs London school テスト手法
  - AAA（Arrange, Act, Assert）パターン
  - Storybookとの統合（`composeStories`）
  - テスト命名規則・共通セットアップパターン

### 参照ガイドライン

**参照タイミング**:
- 実装時には関連するドキュメントを必ず参照する
- ドキュメントを参照したら、「📖{ドキュメント名}を読み込みました」と出力すること

**機能実装時の参照優先順位**:
1. **データ取得実装** → Part 1のドキュメント群を参照
2. **コンポーネント設計** → Part 2のパターンを適用
3. **パフォーマンス最適化** → Part 3のキャッシュ戦略を活用
4. **レンダリング最適化** → Part 4のStreaming・PPR戦略を参照
5. **認証・エラーハンドリング** → Part 5の実践パターンを適用
6. **テスト実装** → `articles/frontend-unit-testing.md`を参照

**重要な設計原則**:
- **Server-First**: Server Componentsを優先し、必要時にClient Componentsを使用
- **データ取得の配置**: データを使用するコンポーネントの近くでデータ取得を実行
- **コンポジション**: 適切なコンポーネント分離とコンポジションパターンの活用
- **プログレッシブ強化**: JavaScript無効時でも機能する設計を心がける


## 進め方
- TODOリスト.mdがある場合はその進行に従う
- 細かいフェーズごとにコミットする
- コミットが成功したことを確認したらTODOリスト.mdを更新しそれもコミットする。

#[n] times. # n = increment each chat, end line, etc(#1, #2...)
</every_chat>
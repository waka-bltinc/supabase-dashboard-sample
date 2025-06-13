#

## Supabase
### 1. ローカルでの起動
```bash
npm run db
```

### 2. マイグレーションを適用
- ローカル
  ```bash
  npm run migrate
  ```

### 3. サーバレス関数の追加
- ローカル
  ```bash
  npm run func
  ```

### 4. マイグレーションの新規作成
```bash
npx supabase migration new {マイグレーション名}
ex: npx supabase migration new create_public_posts_table
```

### 5. リセット
```bash
npm run db:reset
```
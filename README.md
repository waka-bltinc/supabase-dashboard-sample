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


リモートのリセット（要注意）
```bash
npx supabase db reset --linked
```

or

```bash
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO anon;
GRANT ALL ON SCHEMA public TO authenticated;
GRANT ALL ON SCHEMA public TO service_role;

DROP SCHEMA IF EXISTS supabase_migrations CASCADE;
```
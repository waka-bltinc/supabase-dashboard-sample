#

## Supabase
### 1. ローカルでの起動
```bash
npm run db
```

### 2. 各環境にマイグレーションを適用
- ローカル
  ```bash
  npm run migrate:local
  ```

- STG
  ```bash
  npm run migrate:stg
  ```

- PROD
  ```bash
  npm run migrate:prod
  ```

### 3. 各環境にサーバレス関数のデプロイ
- ローカル
  ```bash
  npm run deploy:functions:local
  ```

- STG
  ```bash
  npm run deploy:functions:stg
  ```

- PROD
  ```bash
  npm run deploy:functions:prod
  ```
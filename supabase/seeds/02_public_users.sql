-- public.usersテーブルにダミーデータを挿入
INSERT INTO public.users (id, email, first_name, last_name, role) VALUES
  -- 管理者ユーザー（2人）
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', '管理', '太郎', 'admin'),
  ('00000000-0000-0000-0000-000000000002', 'admin2@example.com', '管理', '花子', 'admin'),
  
  -- モデレーターユーザー（3人）
  ('00000000-0000-0000-0000-000000000003', 'moderator1@example.com', 'モデレーター', '次郎', 'moderator'),
  ('00000000-0000-0000-0000-000000000004', 'moderator2@example.com', 'モデレーター', '三郎', 'moderator'),
  ('00000000-0000-0000-0000-000000000005', 'moderator3@example.com', 'モデレーター', '四郎', 'moderator'),
  
  -- 一般ユーザー（15人）
  ('00000000-0000-0000-0000-000000000006', 'user1@example.com', '田中', '一郎', 'user'),
  ('00000000-0000-0000-0000-000000000007', 'user2@example.com', '佐藤', '二郎', 'user'),
  ('00000000-0000-0000-0000-000000000008', 'user3@example.com', '鈴木', '三郎', 'user'),
  ('00000000-0000-0000-0000-000000000009', 'user4@example.com', '高橋', '四郎', 'user'),
  ('00000000-0000-0000-0000-000000000010', 'user5@example.com', '伊藤', '五郎', 'user'),
  ('00000000-0000-0000-0000-000000000011', 'user6@example.com', '山田', '六郎', 'user'),
  ('00000000-0000-0000-0000-000000000012', 'user7@example.com', '渡辺', '七郎', 'user'),
  ('00000000-0000-0000-0000-000000000013', 'user8@example.com', '中村', '八郎', 'user'),
  ('00000000-0000-0000-0000-000000000014', 'user9@example.com', '小林', '九郎', 'user'),
  ('00000000-0000-0000-0000-000000000015', 'user10@example.com', '加藤', '十郎', 'user'),
  ('00000000-0000-0000-0000-000000000016', 'user11@example.com', '吉田', '花子', 'user'),
  ('00000000-0000-0000-0000-000000000017', 'user12@example.com', '山本', '美咲', 'user'),
  ('00000000-0000-0000-0000-000000000018', 'user13@example.com', '松本', '愛子', 'user'),
  ('00000000-0000-0000-0000-000000000019', 'user14@example.com', '井上', '由美', 'user'),
  ('00000000-0000-0000-0000-000000000020', 'user15@example.com', '木村', '真理', 'user')
ON CONFLICT (id) DO NOTHING;

-- トリガーを再作成
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
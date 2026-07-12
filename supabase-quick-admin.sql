-- Chạy file này trong Supabase Dashboard → SQL Editor
-- Tạo bảng admin_users và tài khoản login

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor', 'author')),
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Xóa tài khoản cũ nếu có (để tránh conflict)
DELETE FROM admin_users WHERE email = 'hoangcd@astri.vn';

-- Tạo tài khoản admin (mật khẩu: Astri@2026!)
INSERT INTO admin_users (email, name, role, password_hash, is_active)
VALUES (
  'hoangcd@astri.vn',
  'Hoàng Công Danh',
  'super_admin',
  '$2b$12$7lRnlTa3QSsj.Hi9Qz9g4.qdK1S97sX2rlGoH/zPFQUA4l8HU1uw6',
  true
);

-- Bật Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: service_role được đọc toàn bộ (cho API login)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'admin_users' AND policyname = 'service_role_all'
  ) THEN
    CREATE POLICY service_role_all ON admin_users FOR ALL TO service_role USING (true);
  END IF;
END $$;

-- Kiểm tra kết quả
SELECT id, email, name, role, is_active FROM admin_users;

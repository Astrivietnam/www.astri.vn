-- ASTRI Website Database Migration v2
-- Date: 2026-07-09
-- Description: Add categories, tags, admin_users, staff, site_settings; extend posts and media

-- ============================================================
-- 1. ALTER posts table — add new columns (IF NOT EXISTS)
-- ============================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='seo_title') THEN
    ALTER TABLE posts ADD COLUMN seo_title text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='seo_description') THEN
    ALTER TABLE posts ADD COLUMN seo_description text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='og_image_url') THEN
    ALTER TABLE posts ADD COLUMN og_image_url text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='view_count') THEN
    ALTER TABLE posts ADD COLUMN view_count integer DEFAULT 0;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='author_id') THEN
    ALTER TABLE posts ADD COLUMN author_id uuid;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='tags_cache') THEN
    ALTER TABLE posts ADD COLUMN tags_cache text[];
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='category_id') THEN
    ALTER TABLE posts ADD COLUMN category_id uuid;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='allow_comments') THEN
    ALTER TABLE posts ADD COLUMN allow_comments boolean DEFAULT false;
  END IF;
END $$;

-- ============================================================
-- 2. CREATE TABLE categories
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_vi         text NOT NULL,
  name_en         text,
  slug            text UNIQUE NOT NULL,
  description_vi  text,
  description_en  text,
  parent_id       uuid REFERENCES categories(id) ON DELETE SET NULL,
  post_type       text DEFAULT 'post',
  sort_order      integer DEFAULT 0,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_public_read" ON categories;
CREATE POLICY "categories_public_read"
  ON categories FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "categories_service_manage" ON categories;
CREATE POLICY "categories_service_manage"
  ON categories FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 3. CREATE TABLE tags
-- ============================================================

CREATE TABLE IF NOT EXISTS tags (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_vi    text NOT NULL,
  name_en    text,
  slug       text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "tags_public_read" ON tags;
CREATE POLICY "tags_public_read"
  ON tags FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "tags_service_manage" ON tags;
CREATE POLICY "tags_service_manage"
  ON tags FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 4. CREATE TABLE post_tags (junction)
-- ============================================================

CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "post_tags_public_read" ON post_tags;
CREATE POLICY "post_tags_public_read"
  ON post_tags FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "post_tags_service_manage" ON post_tags;
CREATE POLICY "post_tags_service_manage"
  ON post_tags FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 5. CREATE TABLE admin_users
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id            uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         text UNIQUE NOT NULL,
  name          text NOT NULL,
  role          text DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor', 'author')),
  password_hash text NOT NULL,
  avatar_url    text,
  is_active     boolean DEFAULT true,
  last_login_at timestamptz,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users_service_only" ON admin_users;
CREATE POLICY "admin_users_service_only"
  ON admin_users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 6. CREATE TABLE staff
-- ============================================================

CREATE TABLE IF NOT EXISTS staff (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_vi         text NOT NULL,
  name_en         text,
  title_vi        text,
  title_en        text,
  department_vi   text,
  department_en   text,
  bio_vi          text,
  bio_en          text,
  photo_url       text,
  email           text,
  sort_order      integer DEFAULT 0,
  is_leadership   boolean DEFAULT false,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "staff_public_read_active" ON staff;
CREATE POLICY "staff_public_read_active"
  ON staff FOR SELECT
  TO public
  USING (is_active = true);

DROP POLICY IF EXISTS "staff_service_manage" ON staff;
CREATE POLICY "staff_service_manage"
  ON staff FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 7. CREATE TABLE site_settings
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
  key         text PRIMARY KEY,
  value       jsonb NOT NULL DEFAULT '{}',
  description text,
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings_public_read" ON site_settings;
CREATE POLICY "site_settings_public_read"
  ON site_settings FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "site_settings_service_manage" ON site_settings;
CREATE POLICY "site_settings_service_manage"
  ON site_settings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 8. ALTER media table — add new columns (IF NOT EXISTS)
-- ============================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='media' AND column_name='alt_vi') THEN
    ALTER TABLE media ADD COLUMN alt_vi text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='media' AND column_name='alt_en') THEN
    ALTER TABLE media ADD COLUMN alt_en text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='media' AND column_name='uploaded_by_id') THEN
    ALTER TABLE media ADD COLUMN uploaded_by_id uuid;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='media' AND column_name='width') THEN
    ALTER TABLE media ADD COLUMN width integer;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='media' AND column_name='height') THEN
    ALTER TABLE media ADD COLUMN height integer;
  END IF;
END $$;

-- ============================================================
-- 9. INSERT default site_settings
-- ============================================================

INSERT INTO site_settings (key, value, description) VALUES
  (
    'site_info',
    '{"name_vi":"Viện ASTRI","name_en":"ASTRI Institute","tagline_vi":"Nghiên cứu · Ứng dụng · Chuyển giao công nghệ nông nghiệp","tagline_en":"Research · Application · Agricultural Technology Transfer","address":"Số 56 Du Nội, Xã Đồng Tháp, Huyện Đan Phượng, Hà Nội","phone":"","email":"contact@astri.vn","founded":"2020"}',
    'General site information'
  ),
  (
    'social_links',
    '{"facebook":"","youtube":"","linkedin":"","zalo":""}',
    'Social media links'
  ),
  (
    'analytics',
    '{"ga_id":"","gtm_id":""}',
    'Analytics and tag manager IDs'
  )
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- 10. INSERT sample categories
-- ============================================================

INSERT INTO categories (name_vi, name_en, slug, post_type, sort_order) VALUES
  ('Tin tức',    'News',         'news',        'post', 1),
  ('Nghiên cứu', 'Research',     'research',    'post', 2),
  ('Công nghệ',  'Technology',   'technology',  'post', 3),
  ('Thương mại', 'Trade',        'trade',       'post', 4),
  ('Đào tạo',    'Training',     'training',    'post', 5),
  ('Hợp tác',    'Cooperation',  'cooperation', 'post', 6),
  ('Sản phẩm',   'Products',     'products',    'post', 7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 11. INSERT default admin user
-- ============================================================

INSERT INTO admin_users (email, name, role, password_hash) VALUES
  (
    'hoangcd@astri.vn',
    'Hoàng Công Danh',
    'super_admin',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCMc8bsWUFkNnnrW8JtVcFW'
  )
ON CONFLICT (email) DO NOTHING;

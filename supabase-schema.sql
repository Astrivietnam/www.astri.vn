-- ============================================================
-- ASTRI Website — Supabase Schema
-- Chạy file này trong Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── POSTS (Tin tức / Bài viết) ───────────────────────────
create table if not exists public.posts (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  category        text not null check (category in (
                    'research', 'technology', 'trade',
                    'training', 'farm', 'product', 'news'
                  )),
  title_vi        text not null,
  title_en        text,
  excerpt_vi      text,
  excerpt_en      text,
  content_vi      text,
  content_en      text,
  cover_image_url text,
  author          text default 'Ban Biên tập ASTRI',
  is_published    boolean default false,
  is_featured     boolean default false,
  published_at    timestamptz,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- ─── PAGES (Nội dung trang tĩnh) ──────────────────────────
create table if not exists public.pages (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title_vi    text not null,
  title_en    text,
  content_vi  text,
  content_en  text,
  updated_at  timestamptz default now()
);

-- ─── CONTACTS (Form liên hệ) ──────────────────────────────
create table if not exists public.contacts (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

-- ─── MEDIA (Quản lý file R2) ──────────────────────────────
create table if not exists public.media (
  id          uuid primary key default uuid_generate_v4(),
  file_name   text not null,
  r2_key      text not null unique,
  url         text not null,
  mime_type   text,
  size_bytes  bigint,
  uploaded_by text,
  created_at  timestamptz default now()
);

-- ─── Auto-update updated_at ───────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

create trigger pages_updated_at
  before update on public.pages
  for each row execute function public.handle_updated_at();

-- ─── Row Level Security ───────────────────────────────────
alter table public.posts    enable row level security;
alter table public.pages    enable row level security;
alter table public.contacts enable row level security;
alter table public.media    enable row level security;

-- Public: chỉ đọc bài đã publish
create policy "Public can read published posts"
  on public.posts for select
  using (is_published = true);

create policy "Public can read pages"
  on public.pages for select
  using (true);

-- Contact: ai cũng insert được (form liên hệ)
create policy "Anyone can submit contact"
  on public.contacts for insert
  with check (true);

-- Admin: service_role bypass tất cả (mặc định trong Supabase)

-- ─── Sample data ──────────────────────────────────────────
insert into public.posts (slug, category, title_vi, title_en, excerpt_vi, excerpt_en, is_published, is_featured, published_at)
values
  (
    'astri-futaba-nhat-ban-ky-ket-hop-tac',
    'trade',
    'Viện ASTRI và Công ty Futaba Nhật Bản ký kết hợp tác phát triển phân bón hữu cơ vi sinh công nghệ cao',
    'ASTRI and Japan''s Futaba Sankyo Sign MOU for High-Tech Organic Microbial Fertilizer Development',
    'Ngày 12/11/2025 tại Hà Nội, Viện ASTRI và Công ty Futaba Sankyo Nhật Bản đã ký kết Biên bản ghi nhớ hợp tác về nghiên cứu, phát triển và thương mại hóa các dòng phân bón hữu cơ vi sinh.',
    'On November 12, 2025 in Hanoi, ASTRI and Japan''s Futaba Sankyo signed an MOU to research, develop, and commercialize high-quality organic microbial fertilizers.',
    true, true, '2025-11-12 09:00:00+07'
  ),
  (
    'astri-ra-mat-phan-vien-tay-nam-bo',
    'news',
    'Viện ASTRI ra mắt phân viện tại Tây Nam Bộ và khởi động hệ sinh thái nông nghiệp carbon thấp quy mô lớn',
    'ASTRI Launches Mekong Delta Sub-Institute and Initiates Large-Scale Low-Carbon Agricultural Ecosystem',
    'Ngày 07/7/2025, Viện ASTRI đã chính thức tổ chức Lễ ra mắt Phân viện tại khu vực Tây Nam Bộ.',
    'On July 7, 2025, ASTRI officially launched its Mekong Delta Sub-Institute.',
    true, true, '2025-07-07 09:00:00+07'
  ),
  (
    'astri-ca-mau-he-sinh-thai-nong-nghiep',
    'technology',
    'Viện ASTRI phối hợp xây dựng hệ sinh thái nông nghiệp thông minh và bền vững tại tỉnh Cà Mau',
    'ASTRI Collaborates to Build Smart and Sustainable Agricultural Ecosystem in Ca Mau Province',
    'Ngày 28/7/2025 tại trụ sở Sở Nông nghiệp và Môi trường tỉnh Cà Mau, đại diện Viện ASTRI đã ký kết hợp tác chiến lược.',
    'On July 28, 2025, ASTRI signed a strategic cooperation agreement at Ca Mau''s Department of Agriculture.',
    true, false, '2025-07-28 09:00:00+07'
  );

insert into public.pages (slug, title_vi, title_en)
values
  ('about', 'Giới thiệu về Viện ASTRI', 'About ASTRI Institute'),
  ('research', 'Nghiên cứu Khoa học', 'Scientific Research'),
  ('technology', 'Ứng dụng Công nghệ', 'Technology Application'),
  ('trade', 'Xúc tiến Thương mại', 'Trade Promotion'),
  ('training', 'Đào tạo', 'Training'),
  ('farm', 'Trang trại Bình Dương', 'Binh Duong Farm'),
  ('oresoi', 'Tinh dầu hữu cơ Oresoi', 'Oresoi Organic Essential Oils');

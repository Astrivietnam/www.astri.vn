import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser/client-side client (anon key, respects RLS)
export const supabase = createClient(url, anon)

// Server-side admin client (service_role, bypasses RLS)
// Only available server-side via SUPABASE_SERVICE_ROLE_KEY
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}

export type Post = {
  id: string
  slug: string
  category: string
  title_vi: string
  title_en: string | null
  excerpt_vi: string | null
  excerpt_en: string | null
  content_vi: string | null
  content_en: string | null
  cover_image_url: string | null
  author: string
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  created_at: string
  // Extended SEO / meta fields
  seo_title?: string | null
  seo_description?: string | null
  og_image_url?: string | null
  view_count?: number | null
  allow_comments?: boolean | null
  author_id?: string | null
  category_id?: string | null
  tags_cache?: string[] | null
}

// ---------------------------------------------------------------------------
// CMS entity types
// ---------------------------------------------------------------------------

export type Category = {
  id: string
  name_vi: string
  name_en: string
  slug: string
  description_vi?: string | null
  description_en?: string | null
  parent_id?: string | null
  post_type: string
  sort_order: number
}

export type Tag = {
  id: string
  name_vi: string
  name_en: string
  slug: string
}

export type AdminUser = {
  id: string
  email: string
  name: string
  role: string
  avatar_url?: string | null
  is_active: boolean
  last_login_at?: string | null
  created_at: string
}

export type Staff = {
  id: string
  name_vi: string
  name_en: string
  title_vi?: string | null
  title_en?: string | null
  department_vi?: string | null
  department_en?: string | null
  bio_vi?: string | null
  bio_en?: string | null
  photo_url?: string | null
  email?: string | null
  sort_order: number
  is_leadership: boolean
  is_active: boolean
}

export type MediaFile = {
  id: string
  file_name: string
  r2_key: string
  url: string
  mime_type?: string | null
  size_bytes?: number | null
  alt_vi?: string | null
  alt_en?: string | null
  width?: number | null
  height?: number | null
  created_at: string
}

export type Page = {
  id: string
  slug: string
  title_vi: string
  title_en: string | null
  content_vi: string | null
  content_en: string | null
  updated_at: string
}

export type Contact = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}

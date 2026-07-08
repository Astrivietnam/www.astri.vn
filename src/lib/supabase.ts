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

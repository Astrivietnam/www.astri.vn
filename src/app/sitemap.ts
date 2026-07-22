import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE = 'https://www.astri.vn'

const STATIC_PATHS = [
  '', '/about', '/about/staff', '/about/organization', '/about/functions',
  '/about/facilities', '/research', '/research/projects', '/research/results',
  '/research/publications', '/journal', '/technology', '/technology/transfer',
  '/technology/services', '/training', '/training/technical', '/training/workshops',
  '/cooperation', '/cooperation/partners', '/trade', '/products',
  '/products/fertilizer', '/farm', '/oresoi', '/news', '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of ['vi', 'en']) {
    for (const p of STATIC_PATHS) {
      entries.push({
        url: `${BASE}/${locale}${p}`,
        changeFrequency: p === '/news' || p === '' ? 'daily' : 'weekly',
        priority: p === '' ? 1 : p === '/news' ? 0.9 : 0.7,
      })
    }
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, published_at, updated_at')
    .eq('is_published', true)

  for (const post of posts ?? []) {
    for (const locale of ['vi', 'en']) {
      entries.push({
        url: `${BASE}/${locale}/news/${post.slug}`,
        lastModified: post.updated_at ?? post.published_at ?? undefined,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}

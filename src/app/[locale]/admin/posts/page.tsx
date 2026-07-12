import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase'
import PostsListClient from './PostsListClient'
import type { Category } from '@/lib/supabase'

export default async function AdminPostsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  const [{ data: posts }, { data: categories }] = await Promise.all([
    supabase
      .from('posts')
      .select(`
        id, slug, title_vi, title_en, cover_image_url,
        is_published, is_featured, published_at, created_at, category
      `)
      .order('created_at', { ascending: false }),
    supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true }),
  ])

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)' }}>Quản lý bài viết</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
              {posts?.length ?? 0} bài viết
            </p>
          </div>
          <Link
            href={`/${locale}/admin/posts/new`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '9px',
              background: 'var(--green-800)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <PlusCircle size={15} />
            Thêm bài viết
          </Link>
        </div>

        <PostsListClient
          initialPosts={(posts ?? []) as unknown as Parameters<typeof PostsListClient>[0]['initialPosts']}
          categories={(categories ?? []) as Category[]}
          locale={locale}
        />
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PostEditor, { type PostFormData } from '@/components/admin/PostEditor'
import type { Post, Category } from '@/lib/supabase'

export default function EditPostPage() {
  const router = useRouter()
  const { locale, id } = useParams<{ locale: string; id: string }>()

  const [post, setPost] = useState<Post | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/posts/${id}`).then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json()),
    ]).then(([postData, catData]) => {
      if (postData.success) {
        const p = postData.data
        // Normalize tags_cache from post_tags join
        setPost({
          ...p,
          tags_cache: p.tags ?? p.tags_cache ?? [],
        })
      } else {
        setNotFound(true)
      }
      if (catData.success) {
        setCategories(catData.categories ?? catData.data ?? [])
      }
    }).catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSave(data: PostFormData) {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: data.slug || undefined,
        category_id: data.category_id || undefined,
        title_vi: data.title_vi,
        title_en: data.title_en || undefined,
        excerpt_vi: data.excerpt_vi || undefined,
        excerpt_en: data.excerpt_en || undefined,
        content_vi: data.content_vi || undefined,
        content_en: data.content_en || undefined,
        cover_image_url: data.cover_image_url || undefined,
        seo_title: data.seo_title || undefined,
        seo_description: data.seo_description || undefined,
        og_image_url: data.og_image_url || undefined,
        is_published: data.is_published,
        is_featured: data.is_featured,
        published_at: data.published_at,
        tags: data.tags_cache,
      }),
    })

    const json = await res.json()
    if (!res.ok || !json.success) {
      throw new Error(json.error ?? 'Không thể cập nhật bài viết')
    }
    // Update local state so UI reflects changes without full reload
    setPost(prev => prev ? { ...prev, ...json.data } : prev)
  }

  async function handleSaveAsDraft(data: PostFormData) {
    await handleSave({ ...data, is_published: false })
  }

  if (loading) {
    return (
      <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div style={{ color: 'var(--text-3)', padding: '3rem', textAlign: 'center' }}>Đang tải...</div>
        </div>
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div style={{ color: '#dc2626', padding: '3rem', textAlign: 'center' }}>
            Không tìm thấy bài viết.{' '}
            <button
              onClick={() => router.push(`/${locale}/admin/posts`)}
              style={{ textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', color: 'inherit' }}
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)' }}>Chỉnh sửa bài viết</h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem', fontFamily: 'monospace' }}>
              ID: {id}
            </p>
          </div>
          <button
            onClick={() => router.push(`/${locale}/admin/posts`)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-2)',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            ← Quay lại
          </button>
        </div>
        <PostEditor
          post={post}
          locale={locale}
          categories={categories}
          onSave={handleSave}
          onSaveAsDraft={handleSaveAsDraft}
        />
      </div>
    </main>
  )
}

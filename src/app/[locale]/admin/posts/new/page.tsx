'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PostEditor, { type PostFormData } from '@/components/admin/PostEditor'
import type { Category } from '@/lib/supabase'

export default function NewPostPage() {
  const router = useRouter()
  const { locale } = useParams<{ locale: string }>()

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(d => { if (d.success) setCategories(d.categories ?? d.data ?? []) })
      .catch(() => {})
  }, [])

  async function handleSave(data: PostFormData) {
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
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
      throw new Error(json.error ?? 'Không thể tạo bài viết')
    }

    const id = json.data?.id
    if (id) {
      router.push(`/${locale}/admin/posts/${id}`)
    } else {
      router.push(`/${locale}/admin/posts`)
    }
  }

  async function handleSaveAsDraft(data: PostFormData) {
    await handleSave({ ...data, is_published: false })
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)' }}>Thêm bài viết mới</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
            Tạo bài viết mới cho website ASTRI
          </p>
        </div>
        <PostEditor
          locale={locale}
          categories={categories}
          onSave={handleSave}
          onSaveAsDraft={handleSaveAsDraft}
        />
      </div>
    </main>
  )
}

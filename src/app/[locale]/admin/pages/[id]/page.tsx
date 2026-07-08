'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PostEditor, { type PostFormData } from '@/components/admin/PostEditor'
import type { Post } from '@/lib/supabase'

export default function EditPagePage() {
  const router = useRouter()
  const { locale, id } = useParams<{ locale: string; id: string }>()

  const [page, setPage] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (id === 'new') {
      // Blank page for creation
      setPage({
        id: '',
        slug: '',
        category: '',
        title_vi: '',
        title_en: null,
        excerpt_vi: null,
        excerpt_en: null,
        content_vi: null,
        content_en: null,
        cover_image_url: null,
        author: '',
        is_published: false,
        is_featured: false,
        published_at: null,
        created_at: new Date().toISOString(),
      })
      setLoading(false)
      return
    }

    fetch(`/api/admin/pages/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPage(data.data)
        } else {
          setNotFound(true)
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSave(data: PostFormData) {
    const body = {
      slug: data.slug || undefined,
      title_vi: data.title_vi,
      title_en: data.title_en || undefined,
      content_vi: data.content_vi || undefined,
      content_en: data.content_en || undefined,
      excerpt_vi: data.excerpt_vi || undefined,
      excerpt_en: data.excerpt_en || undefined,
      cover_image_url: data.cover_image_url || undefined,
      seo_title: data.seo_title || undefined,
      seo_description: data.seo_description || undefined,
    }

    let res: Response
    if (id === 'new') {
      res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } else {
      res = await fetch(`/api/admin/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }

    const json = await res.json()
    if (!res.ok || !json.success) {
      throw new Error(json.error ?? 'Không thể lưu trang')
    }

    if (id === 'new' && json.data?.id) {
      router.replace(`/${locale}/admin/pages/${json.data.id}`)
    } else {
      setPage(prev => prev ? { ...prev, ...json.data } : prev)
    }
  }

  async function handleSaveAsDraft(data: PostFormData) {
    await handleSave(data)
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

  if (notFound || !page) {
    return (
      <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div style={{ color: '#dc2626', padding: '3rem', textAlign: 'center' }}>
            Không tìm thấy trang.{' '}
            <button
              onClick={() => router.push(`/${locale}/admin/pages`)}
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)' }}>
              {id === 'new' ? 'Tạo trang mới' : 'Chỉnh sửa trang'}
            </h1>
            {id !== 'new' && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                ID: {id}
              </p>
            )}
          </div>
          <button
            onClick={() => router.push(`/${locale}/admin/pages`)}
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
          post={page}
          locale={locale}
          categories={[]}
          onSave={handleSave}
          onSaveAsDraft={handleSaveAsDraft}
        />
      </div>
    </main>
  )
}

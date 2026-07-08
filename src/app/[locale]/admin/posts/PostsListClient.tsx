'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import type { Post, Category } from '@/lib/supabase'

type PostWithCategory = Post & {
  categories?: { slug: string; name_vi: string; name_en: string } | null
}

type Props = {
  initialPosts: PostWithCategory[]
  categories: Category[]
  locale: string
}

export default function PostsListClient({ initialPosts, categories, locale }: Props) {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name_vi]))

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id))
      } else {
        alert('Không thể xóa bài viết')
      }
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = posts.filter(post => {
    if (filter === 'published' && !post.is_published) return false
    if (filter === 'draft' && post.is_published) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        post.title_vi.toLowerCase().includes(q) ||
        (post.title_en ?? '').toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q)
      )
    }
    return true
  })

  const filterTabs: { label: string; value: 'all' | 'published' | 'draft' }[] = [
    { label: `Tất cả (${posts.length})`, value: 'all' },
    { label: `Đã xuất bản (${posts.filter(p => p.is_published).length})`, value: 'published' },
    { label: `Bản nháp (${posts.filter(p => !p.is_published).length})`, value: 'draft' },
  ]

  return (
    <div>
      {/* Search + filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm kiếm bài viết..."
          style={{
            flex: 1, minWidth: '200px',
            padding: '0.55rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text-1)',
            fontSize: '0.875rem',
          }}
        />
        <div style={{
          display: 'flex', gap: '2px',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '9px', padding: '3px',
        }}>
          {filterTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              style={{
                padding: '0.3rem 0.85rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: filter === tab.value ? 'var(--green-800)' : 'transparent',
                color: filter === tab.value ? 'white' : 'var(--text-3)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                {['', 'Tiêu đề', 'Chuyên mục', 'Trạng thái', 'Ngày xuất bản', 'Hành động'].map(h => (
                  <th
                    key={h}
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: 'var(--text-3)',
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr
                  key={post.id}
                  style={{
                    background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)',
                    borderTop: '1px solid var(--border-light, var(--border))',
                  }}
                >
                  {/* Cover thumbnail */}
                  <td style={{ padding: '0.75rem 0.75rem 0.75rem 1rem', width: '56px' }}>
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt=""
                        style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '5px', display: 'block' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    ) : (
                      <div style={{
                        width: '48px', height: '36px', borderRadius: '5px',
                        background: 'var(--surface-2)', border: '1px solid var(--border)',
                      }} />
                    )}
                  </td>

                  {/* Title */}
                  <td style={{ padding: '0.75rem 1rem', maxWidth: '300px' }}>
                    <p className="font-medium" style={{ color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {post.title_vi}
                    </p>
                    <p style={{ color: 'var(--text-3)', fontSize: '0.75rem', marginTop: '2px' }}>/{post.slug}</p>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                    <span style={{
                      fontSize: '0.75rem', padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      background: 'var(--green-50, #f0fdf4)',
                      color: 'var(--green-700, #15803d)',
                    }}>
                      {post.category_id ? (categoryMap[post.category_id] ?? '—') : (post.categories?.name_vi ?? post.category ?? '—')}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      fontSize: '0.75rem', padding: '0.2rem 0.55rem',
                      borderRadius: '999px', fontWeight: 600,
                      ...(post.is_published
                        ? { background: '#dcfce7', color: '#15803d' }
                        : { background: '#fef9c3', color: '#854d0e' }),
                    }}>
                      {post.is_published ? 'Đã xuất bản' : 'Nháp'}
                    </span>
                  </td>

                  {/* Published date */}
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-3)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('vi-VN')
                      : '—'}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                      <Link
                        href={`/${locale}/admin/posts/${post.id}`}
                        style={{
                          padding: '0.35rem',
                          borderRadius: '6px',
                          background: 'var(--surface-2)',
                          color: 'var(--text-2)',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        title="Chỉnh sửa"
                      >
                        <Pencil size={14} />
                      </Link>
                      {post.is_published && (
                        <Link
                          href={`/${locale}/news/${post.slug}`}
                          target="_blank"
                          style={{
                            padding: '0.35rem',
                            borderRadius: '6px',
                            background: 'var(--surface-2)',
                            color: 'var(--text-3)',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="Xem trên website"
                        >
                          <ExternalLink size={14} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        title="Xóa"
                        style={{
                          padding: '0.35rem',
                          borderRadius: '6px',
                          background: 'var(--surface-2)',
                          color: deletingId === post.id ? 'var(--text-3)' : '#dc2626',
                          border: 'none',
                          cursor: deletingId === post.id ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>
            {search ? `Không tìm thấy bài viết khớp với "${search}"` : 'Chưa có bài viết nào'}
          </div>
        )}
      </div>
    </div>
  )
}

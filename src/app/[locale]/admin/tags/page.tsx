'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Loader2, Tag } from 'lucide-react'

type TagItem = {
  id: string
  name: string
  slug: string
  post_count?: number
}

const inp: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderRadius: '7px', border: '1px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
}

export default function TagsPage() {
  const [tags, setTags] = useState<TagItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newName, setNewName] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [adding, setAdding] = useState(false)
  const [addErr, setAddErr] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/tags')
      const data = await res.json()
      setTags(data.tags ?? data ?? [])
    } catch {
      setError('Không thể tải danh sách thẻ')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!newName.trim()) { setAddErr('Nhập tên thẻ'); return }
    setAdding(true)
    setAddErr('')
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), slug: newSlug || slugify(newName) }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setNewName('')
      setNewSlug('')
      await load()
    } catch (e: unknown) {
      setAddErr((e as Error).message)
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa thẻ "${name}"?`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/tags/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setTags(t => t.filter(x => x.id !== id))
    } catch (e: unknown) {
      alert((e as Error).message)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Thẻ (Tags)</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{tags.length} thẻ</p>
        </div>

        {/* Add form */}
        <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-1)' }}>Thêm thẻ mới</h3>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1" style={{ minWidth: 160 }}>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Tên thẻ *</label>
              <input
                style={{ ...inp, width: '100%' }}
                placeholder="Ví dụ: Lúa gạo"
                value={newName}
                onChange={e => {
                  setNewName(e.target.value)
                  setNewSlug(slugify(e.target.value))
                }}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <div className="flex-1" style={{ minWidth: 160 }}>
              <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Slug</label>
              <input
                style={{ ...inp, width: '100%', fontFamily: 'monospace', fontSize: '0.8rem' }}
                value={newSlug}
                onChange={e => setNewSlug(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
              />
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={handleAdd}
                disabled={adding}
                className="flex items-center gap-1.5 px-4 py-[0.5rem] rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)', opacity: adding ? 0.6 : 1 }}>
                {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Thêm
              </button>
            </div>
          </div>
          {addErr && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{addErr}</p>}
        </div>

        {/* Tags list */}
        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-16" style={{ color: 'var(--text-3)' }}>
            <Loader2 size={20} className="animate-spin mr-2" /> Đang tải...
          </div>
        ) : tags.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--text-3)' }}>
            <Tag size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Chưa có thẻ nào</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)' }}>
                  {['Tên thẻ', 'Slug', 'Bài viết', ''].map((h, i) => (
                    <th key={i} style={{ padding: '0.75rem 1rem', textAlign: i === 2 ? 'center' : 'left', fontWeight: 600, color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tags.map((tag, i) => (
                  <tr key={tag.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderTop: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.7rem 1rem' }}>
                      <div className="flex items-center gap-2">
                        <Tag size={13} style={{ color: 'var(--green-600)' }} />
                        <span className="font-medium" style={{ color: 'var(--text-1)' }}>{tag.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.7rem 1rem' }}>
                      <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>{tag.slug}</code>
                    </td>
                    <td style={{ padding: '0.7rem 1rem', textAlign: 'center', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                      {tag.post_count ?? 0}
                    </td>
                    <td style={{ padding: '0.7rem 1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(tag.id, tag.name)}
                        disabled={deleting === tag.id || (tag.post_count ?? 0) > 0}
                        className="p-1.5 rounded-md"
                        style={{
                          background: 'var(--surface-2)',
                          color: (tag.post_count ?? 0) > 0 ? 'var(--border)' : '#dc2626',
                          cursor: (tag.post_count ?? 0) > 0 ? 'not-allowed' : 'pointer',
                        }}
                        title={(tag.post_count ?? 0) > 0 ? 'Còn bài viết dùng thẻ này' : 'Xóa thẻ'}>
                        {deleting === tag.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronRight, ChevronDown, Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react'

type Category = {
  id: string
  name_vi: string
  name_en: string
  slug: string
  parent_id: string | null
  post_type: string
  post_count?: number
  children?: Category[]
}

const POST_TYPES = [
  { value: 'news', label: 'Tin tức' },
  { value: 'research', label: 'Nghiên cứu' },
  { value: 'technology', label: 'Công nghệ' },
  { value: 'trade', label: 'Hợp tác' },
  { value: 'training', label: 'Đào tạo' },
  { value: 'farm', label: 'Trang trại' },
  { value: 'product', label: 'Sản phẩm' },
]

const inp: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem',
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

function buildTree(cats: Category[]): Category[] {
  const map: Record<string, Category> = {}
  cats.forEach(c => { map[c.id] = { ...c, children: [] } })
  const roots: Category[] = []
  cats.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children!.push(map[c.id])
    } else {
      roots.push(map[c.id])
    }
  })
  return roots
}

type EditState = { id: string; name_vi: string; name_en: string; slug: string; post_type: string }

function CategoryRow({
  cat, depth, allFlat, onEdit, onDelete, editState, setEditState, saving,
}: {
  cat: Category; depth: number; allFlat: Category[]
  onEdit: (s: EditState) => void; onDelete: (id: string, name: string) => void
  editState: EditState | null; setEditState: (s: EditState | null) => void; saving: boolean
}) {
  const [open, setOpen] = useState(true)
  const isEditing = editState?.id === cat.id
  const hasChildren = (cat.children?.length ?? 0) > 0

  return (
    <>
      <tr style={{ borderTop: '1px solid var(--border-light)' }}>
        <td style={{ padding: '0.6rem 1rem' }}>
          <div className="flex items-center gap-1" style={{ paddingLeft: `${depth * 20}px` }}>
            {hasChildren ? (
              <button onClick={() => setOpen(o => !o)} style={{ color: 'var(--text-3)', lineHeight: 0 }}>
                {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            ) : <span style={{ width: 14, display: 'inline-block' }} />}
            {isEditing ? (
              <input
                style={{ ...inp, maxWidth: 180 }}
                value={editState.name_vi}
                onChange={e => setEditState({ ...editState, name_vi: e.target.value })}
                autoFocus
              />
            ) : (
              <span className="font-medium text-sm" style={{ color: 'var(--text-1)' }}>{cat.name_vi}</span>
            )}
          </div>
        </td>
        <td style={{ padding: '0.6rem 1rem' }}>
          {isEditing ? (
            <input style={{ ...inp, maxWidth: 180 }} value={editState.name_en}
              onChange={e => setEditState({ ...editState, name_en: e.target.value })} />
          ) : (
            <span className="text-sm" style={{ color: 'var(--text-2)' }}>{cat.name_en}</span>
          )}
        </td>
        <td style={{ padding: '0.6rem 1rem' }}>
          {isEditing ? (
            <input style={{ ...inp, maxWidth: 160, fontFamily: 'monospace', fontSize: '0.8rem' }}
              value={editState.slug}
              onChange={e => setEditState({ ...editState, slug: e.target.value })} />
          ) : (
            <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>{cat.slug}</code>
          )}
        </td>
        <td style={{ padding: '0.6rem 1rem' }}>
          {isEditing ? (
            <select style={{ ...inp, maxWidth: 140 }} value={editState.post_type}
              onChange={e => setEditState({ ...editState, post_type: e.target.value })}>
              {POST_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
              {POST_TYPES.find(t => t.value === cat.post_type)?.label ?? cat.post_type}
            </span>
          )}
        </td>
        <td style={{ padding: '0.6rem 1rem', color: 'var(--text-3)', fontSize: '0.8rem', textAlign: 'center' }}>
          {cat.post_count ?? 0}
        </td>
        <td style={{ padding: '0.6rem 1rem' }}>
          <div className="flex gap-1.5">
            {isEditing ? (
              <>
                <button onClick={() => onEdit(editState)} disabled={saving}
                  className="p-1.5 rounded-md" style={{ background: 'var(--green-800)', color: 'white' }}>
                  {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                </button>
                <button onClick={() => setEditState(null)}
                  className="p-1.5 rounded-md" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                  <X size={13} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setEditState({ id: cat.id, name_vi: cat.name_vi, name_en: cat.name_en, slug: cat.slug, post_type: cat.post_type })}
                  className="p-1.5 rounded-md" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                  <Pencil size={13} />
                </button>
                <button onClick={() => onDelete(cat.id, cat.name_vi)} disabled={(cat.post_count ?? 0) > 0}
                  className="p-1.5 rounded-md"
                  style={{ background: 'var(--surface-2)', color: (cat.post_count ?? 0) > 0 ? 'var(--border)' : '#dc2626', cursor: (cat.post_count ?? 0) > 0 ? 'not-allowed' : 'pointer' }}
                  title={(cat.post_count ?? 0) > 0 ? 'Còn bài viết dùng chuyên mục này' : 'Xóa'}>
                  <Trash2 size={13} />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
      {open && cat.children?.map(child => (
        <CategoryRow key={child.id} cat={child} depth={depth + 1} allFlat={allFlat}
          onEdit={onEdit} onDelete={onDelete} editState={editState} setEditState={setEditState} saving={saving} />
      ))}
    </>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editState, setEditState] = useState<EditState | null>(null)
  const [saving, setSaving] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newForm, setNewForm] = useState({ name_vi: '', name_en: '', slug: '', parent_id: '', post_type: 'news' })
  const [addErr, setAddErr] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      setCategories(data.data ?? data.categories ?? [])
    } catch {
      setError('Không thể tải danh mục')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleEdit(s: EditState) {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/categories/${s.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name_vi: s.name_vi, name_en: s.name_en, slug: s.slug, post_type: s.post_type }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setEditState(null)
      await load()
    } catch (e: unknown) {
      alert((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa danh mục "${name}"?`)) return
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      await load()
    } catch (e: unknown) {
      alert((e as Error).message)
    }
  }

  async function handleAdd() {
    if (!newForm.name_vi || !newForm.slug) { setAddErr('Cần nhập tên và slug'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newForm, parent_id: newForm.parent_id || null }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setNewForm({ name_vi: '', name_en: '', slug: '', parent_id: '', post_type: 'news' })
      setShowAdd(false)
      setAddErr('')
      await load()
    } catch (e: unknown) {
      setAddErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  const tree = buildTree(categories)

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Danh mục</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{categories.length} danh mục</p>
          </div>
          <button
            onClick={() => setShowAdd(s => !s)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--green-800)' }}>
            <Plus size={15} /> Thêm danh mục
          </button>
        </div>

        {showAdd && (
          <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--surface)', border: '2px solid var(--green-300)' }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: 'var(--text-1)' }}>Danh mục mới</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Tên (VI) *</label>
                <input style={inp} value={newForm.name_vi}
                  onChange={e => setNewForm(p => ({ ...p, name_vi: e.target.value, slug: slugify(e.target.value) }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Name (EN)</label>
                <input style={inp} value={newForm.name_en}
                  onChange={e => setNewForm(p => ({ ...p, name_en: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Slug *</label>
                <input style={{ ...inp, fontFamily: 'monospace' }} value={newForm.slug}
                  onChange={e => setNewForm(p => ({ ...p, slug: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Loại bài viết</label>
                <select style={inp} value={newForm.post_type}
                  onChange={e => setNewForm(p => ({ ...p, post_type: e.target.value }))}>
                  {POST_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Danh mục cha</label>
                <select style={inp} value={newForm.parent_id}
                  onChange={e => setNewForm(p => ({ ...p, parent_id: e.target.value }))}>
                  <option value="">— Không có —</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name_vi}</option>
                  ))}
                </select>
              </div>
            </div>
            {addErr && <p className="text-xs mb-2" style={{ color: '#dc2626' }}>{addErr}</p>}
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setShowAdd(false); setAddErr('') }}
                className="px-3 py-1.5 rounded-lg text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Hủy</button>
              <button onClick={handleAdd} disabled={saving}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}

        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {loading ? (
            <div className="flex items-center justify-center py-16" style={{ color: 'var(--text-3)' }}>
              <Loader2 size={20} className="animate-spin mr-2" /> Đang tải...
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    {['Tên (VI)', 'Name (EN)', 'Slug', 'Loại', 'Bài viết', 'Hành động'].map((h, i) => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: i === 4 ? 'center' : 'left', fontWeight: 600, color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tree.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>Chưa có danh mục nào</td></tr>
                  ) : tree.map(cat => (
                    <CategoryRow key={cat.id} cat={cat} depth={0} allFlat={categories}
                      onEdit={handleEdit} onDelete={handleDelete}
                      editState={editState} setEditState={setEditState} saving={saving} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

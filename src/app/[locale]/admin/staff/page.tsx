'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, X, Loader2, Eye, EyeOff, GripVertical, UserCircle } from 'lucide-react'

type StaffMember = {
  id: string
  name_vi: string
  name_en: string
  title_vi: string
  title_en: string
  photo_url: string | null
  department: string
  is_leader: boolean
  is_active: boolean
  sort_order: number
  bio_vi: string | null
  bio_en: string | null
}

const EMPTY_FORM: Omit<StaffMember, 'id'> = {
  name_vi: '', name_en: '', title_vi: '', title_en: '',
  photo_url: '', department: '', is_leader: false, is_active: true,
  sort_order: 0, bio_vi: '', bio_en: '',
}

const inp: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem',
  borderRadius: '7px', border: '1px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
}

type Filter = 'all' | 'leader' | 'staff'

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<StaffMember | null>(null)
  const [form, setForm] = useState<Omit<StaffMember, 'id'>>(EMPTY_FORM)
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/staff')
      const data = await res.json()
      const list: StaffMember[] = data.staff ?? data ?? []
      list.sort((a, b) => a.sort_order - b.sort_order)
      setStaff(list)
    } catch {
      setError('Không thể tải danh sách nhân sự')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function openAdd() {
    setEditTarget(null)
    setForm({ ...EMPTY_FORM, sort_order: staff.length + 1 })
    setFormErr('')
    setShowModal(true)
  }

  function openEdit(member: StaffMember) {
    setEditTarget(member)
    const { id: _id, ...rest } = member
    void _id
    setForm(rest)
    setFormErr('')
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name_vi || !form.title_vi) { setFormErr('Cần nhập tên và chức danh (VI)'); return }
    setSaving(true)
    setFormErr('')
    try {
      const url = editTarget ? `/api/admin/staff/${editTarget.id}` : '/api/admin/staff'
      const method = editTarget ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setShowModal(false)
      await load()
    } catch (e: unknown) {
      setFormErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleActive(member: StaffMember) {
    setToggling(member.id)
    try {
      const res = await fetch(`/api/admin/staff/${member.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !member.is_active }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setStaff(s => s.map(x => x.id === member.id ? { ...x, is_active: !x.is_active } : x))
    } catch (e: unknown) {
      alert((e as Error).message)
    } finally {
      setToggling(null)
    }
  }

  const filtered = staff.filter(m => {
    if (filter === 'leader') return m.is_leader
    if (filter === 'staff') return !m.is_leader
    return true
  })

  const filterBtns: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'leader', label: 'Lãnh đạo' },
    { key: 'staff', label: 'Nhân viên' },
  ]

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Nhân sự</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{staff.length} thành viên</p>
          </div>
          <button onClick={openAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--green-800)' }}>
            <Plus size={15} /> Thêm nhân sự
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {filterBtns.map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                background: filter === key ? 'var(--green-800)' : 'transparent',
                color: filter === key ? 'white' : 'var(--text-2)',
              }}>
              {label}
            </button>
          ))}
        </div>

        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-20" style={{ color: 'var(--text-3)' }}>
            <Loader2 size={20} className="animate-spin mr-2" /> Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--text-3)' }}>
            <UserCircle size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Chưa có nhân sự</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(member => (
              <div key={member.id} className="rounded-xl overflow-hidden flex flex-col"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  opacity: member.is_active ? 1 : 0.55,
                }}>
                {/* Photo */}
                <div className="relative" style={{ paddingTop: '75%', background: 'var(--surface-2)' }}>
                  {member.photo_url ? (
                    <img src={member.photo_url} alt={member.name_vi}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ color: 'var(--border)' }}>
                      <UserCircle size={48} />
                    </div>
                  )}
                  {/* Leader badge */}
                  {member.is_leader && (
                    <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'var(--green-800)', color: 'white' }}>
                      Lãnh đạo
                    </span>
                  )}
                  {/* Sort order indicator */}
                  <span className="absolute top-2 right-2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    style={{ background: 'rgba(0,0,0,0.4)', color: 'white' }}>
                    {member.sort_order}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3 flex-1 flex flex-col">
                  <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-1)' }}>{member.name_vi}</p>
                  <p className="text-xs mt-0.5 mb-3" style={{ color: 'var(--text-3)' }}>{member.title_vi}</p>
                  {member.department && (
                    <p className="text-xs px-2 py-0.5 rounded-full w-fit mb-3"
                      style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>
                      {member.department}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => openEdit(member)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                      <Pencil size={11} /> Sửa
                    </button>
                    <button onClick={() => handleToggleActive(member)} disabled={toggling === member.id}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold"
                      style={member.is_active
                        ? { background: '#fef9c3', color: '#92400e' }
                        : { background: '#dcfce7', color: '#15803d' }}>
                      {toggling === member.id
                        ? <Loader2 size={11} className="animate-spin" />
                        : member.is_active ? <EyeOff size={11} /> : <Eye size={11} />}
                      {member.is_active ? 'Ẩn' : 'Hiện'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="w-full max-w-lg rounded-2xl p-6 my-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>
                {editTarget ? 'Chỉnh sửa nhân sự' : 'Thêm nhân sự mới'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-3)' }}><X size={18} /></button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Họ tên (VI) *</label>
                <input style={inp} value={form.name_vi} onChange={e => setForm(p => ({ ...p, name_vi: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Name (EN)</label>
                <input style={inp} value={form.name_en} onChange={e => setForm(p => ({ ...p, name_en: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Chức danh (VI) *</label>
                <input style={inp} value={form.title_vi} onChange={e => setForm(p => ({ ...p, title_vi: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Title (EN)</label>
                <input style={inp} value={form.title_en} onChange={e => setForm(p => ({ ...p, title_en: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>URL ảnh</label>
                <input style={inp} placeholder="https://..." value={form.photo_url ?? ''}
                  onChange={e => setForm(p => ({ ...p, photo_url: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Phòng / Ban</label>
                <input style={inp} value={form.department} onChange={e => setForm(p => ({ ...p, department: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Thứ tự sắp xếp</label>
                <input type="number" style={inp} value={form.sort_order}
                  onChange={e => setForm(p => ({ ...p, sort_order: Number(e.target.value) }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Giới thiệu (VI)</label>
                <textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={form.bio_vi ?? ''}
                  onChange={e => setForm(p => ({ ...p, bio_vi: e.target.value }))} />
              </div>
              <div className="sm:col-span-2 flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-2)' }}>
                  <input type="checkbox" checked={form.is_leader}
                    onChange={e => setForm(p => ({ ...p, is_leader: e.target.checked }))} />
                  Lãnh đạo viện
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-2)' }}>
                  <input type="checkbox" checked={form.is_active}
                    onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} />
                  Hiển thị
                </label>
              </div>
            </div>

            {formErr && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{formErr}</p>}

            <div className="flex gap-2 justify-end mt-5">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Hủy</button>
              <button onClick={handleSave} disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Đang lưu...' : editTarget ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

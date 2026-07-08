'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Loader2, ShieldAlert, Shield, Edit3, UserCheck, UserX, Users } from 'lucide-react'

type Role = 'super_admin' | 'admin' | 'editor' | 'author'

type User = {
  id: string
  name: string
  email: string
  role: Role
  is_active: boolean
  last_login: string | null
  created_at: string
}

const ROLE_CONFIG: Record<Role, { label: string; bg: string; color: string; icon: React.ElementType }> = {
  super_admin: { label: 'Super Admin', bg: '#fee2e2', color: '#b91c1c', icon: ShieldAlert },
  admin:       { label: 'Admin',       bg: '#ffedd5', color: '#c2410c', icon: Shield },
  editor:      { label: 'Biên tập',    bg: '#dbeafe', color: '#1d4ed8', icon: Edit3 },
  author:      { label: 'Tác giả',     bg: '#dcfce7', color: '#15803d', icon: Users },
}

const inp: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem',
  borderRadius: '7px', border: '1px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
}

const EMPTY_FORM = { email: '', name: '', role: 'editor' as Role, password: '' }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  // In a real app you'd get this from session context
  const [currentUserId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data.users ?? data ?? [])
    } catch {
      setError('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleAddUser() {
    if (!form.email || !form.name || !form.password) { setFormErr('Điền đầy đủ thông tin'); return }
    setSaving(true)
    setFormErr('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setShowModal(false)
      setForm(EMPTY_FORM)
      await load()
    } catch (e: unknown) {
      setFormErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleActive(user: User) {
    if (user.id === currentUserId) return
    setToggling(user.id)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !user.is_active }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setUsers(u => u.map(x => x.id === user.id ? { ...x, is_active: !x.is_active } : x))
    } catch (e: unknown) {
      alert((e as Error).message)
    } finally {
      setToggling(null)
    }
  }

  function fmtDate(s: string | null) {
    if (!s) return '—'
    return new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Người dùng</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{users.length} tài khoản</p>
          </div>
          <button
            onClick={() => { setShowModal(true); setFormErr('') }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--green-800)' }}>
            <Plus size={15} /> Thêm người dùng
          </button>
        </div>

        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}

        {/* Role legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.entries(ROLE_CONFIG) as [Role, typeof ROLE_CONFIG[Role]][]).map(([key, cfg]) => (
            <span key={key} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: cfg.bg, color: cfg.color }}>
              <cfg.icon size={11} /> {cfg.label}
            </span>
          ))}
        </div>

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
                    {['Tên', 'Email', 'Vai trò', 'Trạng thái', 'Đăng nhập lần cuối', 'Hành động'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>Chưa có người dùng nào</td></tr>
                  ) : users.map((user, i) => {
                    const roleCfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.author
                    const RoleIcon = roleCfg.icon
                    const isSelf = user.id === currentUserId
                    return (
                      <tr key={user.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderTop: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{ background: 'var(--green-100)', color: 'var(--green-800)' }}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium" style={{ color: 'var(--text-1)' }}>{user.name}</span>
                            {isSelf && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>Bạn</span>}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-2)', fontSize: '0.8rem' }}>{user.email}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold w-fit"
                            style={{ background: roleCfg.bg, color: roleCfg.color }}>
                            <RoleIcon size={11} /> {roleCfg.label}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={user.is_active
                              ? { background: '#dcfce7', color: '#15803d' }
                              : { background: '#f3f4f6', color: '#6b7280' }}>
                            {user.is_active ? 'Hoạt động' : 'Tạm khóa'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                          {fmtDate(user.last_login)}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {!isSelf && (
                            <button
                              onClick={() => handleToggleActive(user)}
                              disabled={toggling === user.id}
                              className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold"
                              style={user.is_active
                                ? { background: '#fef9c3', color: '#92400e' }
                                : { background: '#dcfce7', color: '#15803d' }}
                              title={user.is_active ? 'Khóa tài khoản' : 'Mở tài khoản'}>
                              {toggling === user.id
                                ? <Loader2 size={12} className="animate-spin" />
                                : user.is_active ? <UserX size={12} /> : <UserCheck size={12} />}
                              {user.is_active ? 'Khóa' : 'Mở khóa'}
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add user modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Thêm người dùng</h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-3)' }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Họ tên *</label>
                <input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Email *</label>
                <input type="email" style={inp} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Vai trò *</label>
                <select style={inp} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as Role }))}>
                  {(Object.entries(ROLE_CONFIG) as [Role, typeof ROLE_CONFIG[Role]][]).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Mật khẩu *</label>
                <input type="password" style={inp} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              </div>
            </div>
            {formErr && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{formErr}</p>}
            <div className="flex gap-2 justify-end mt-5">
              <button onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Hủy</button>
              <button onClick={handleAddUser} disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Đang lưu...' : 'Tạo tài khoản'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

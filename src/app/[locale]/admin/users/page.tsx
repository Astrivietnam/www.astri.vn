'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, X, Loader2, ShieldAlert, Shield, Edit3, UserCheck, UserX, Users, Pencil, Trash2, Lock } from 'lucide-react'

type Role = 'super_admin' | 'admin' | 'editor' | 'author'

type User = {
  id: string
  name: string
  email: string
  role: Role
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

type CurrentUser = { id: string; role: Role; name: string; email: string }

const ROLE_CONFIG: Record<Role, { label: string; bg: string; color: string; icon: React.ElementType }> = {
  super_admin: { label: 'Super Admin', bg: '#fee2e2', color: '#b91c1c', icon: ShieldAlert },
  admin:       { label: 'Admin',       bg: '#ffedd5', color: '#c2410c', icon: Shield },
  editor:      { label: 'Biên tập',    bg: '#dbeafe', color: '#1d4ed8', icon: Edit3 },
  author:      { label: 'Tác giả',     bg: '#dcfce7', color: '#15803d', icon: Users },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inp: React.CSSProperties = {
  width: '100%', padding: '0.5rem 0.75rem',
  borderRadius: '7px', border: '1px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
}

const EMPTY_FORM = { email: '', name: '', role: 'editor' as Role, password: '', passwordConfirm: '' }
const EMPTY_EDIT = { id: '', name: '', role: 'editor' as Role, password: '' }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [meLoaded, setMeLoaded] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErr, setFormErr] = useState('')
  const [saving, setSaving] = useState(false)

  const [showEdit, setShowEdit] = useState(false)
  const [editForm, setEditForm] = useState(EMPTY_EDIT)
  const [editErr, setEditErr] = useState('')
  const [editSaving, setEditSaving] = useState(false)

  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const isSuper = currentUser?.role === 'super_admin'
  const canManage = currentUser?.role === 'super_admin' || currentUser?.role === 'admin'

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUsers(data.users ?? [])
    } catch {
      setError('Không thể tải danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch('/api/admin/auth/me')
      .then(r => r.json())
      .then(d => { if (d.success) setCurrentUser(d.user) })
      .catch(() => {})
      .finally(() => setMeLoaded(true))
  }, [])

  useEffect(() => { if (canManage) load() }, [canManage, load])

  function flash(msg: string) {
    setNotice(msg)
    setTimeout(() => setNotice(''), 3000)
  }

  // Roles the current user may assign
  const assignableRoles = (Object.entries(ROLE_CONFIG) as [Role, typeof ROLE_CONFIG[Role]][])
    .filter(([key]) => isSuper || (key !== 'super_admin' && key !== 'admin'))

  async function handleAddUser() {
    if (!form.email || !form.name || !form.password) { setFormErr('Điền đầy đủ thông tin'); return }
    if (!EMAIL_RE.test(form.email)) { setFormErr('Email không hợp lệ'); return }
    if (form.password.length < 8) { setFormErr('Mật khẩu phải có ít nhất 8 ký tự'); return }
    if (form.password !== form.passwordConfirm) { setFormErr('Mật khẩu xác nhận không khớp'); return }
    setSaving(true)
    setFormErr('')
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, role: form.role, password: form.password }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setShowModal(false)
      setForm(EMPTY_FORM)
      flash('Đã tạo tài khoản mới')
      await load()
    } catch (e: unknown) {
      setFormErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  function openEdit(user: User) {
    setEditForm({ id: user.id, name: user.name, role: user.role, password: '' })
    setEditErr('')
    setShowEdit(true)
  }

  async function handleEditUser() {
    if (!editForm.name.trim()) { setEditErr('Họ tên không được để trống'); return }
    if (editForm.password && editForm.password.length < 8) { setEditErr('Mật khẩu mới phải có ít nhất 8 ký tự'); return }
    setEditSaving(true)
    setEditErr('')
    try {
      const payload: Record<string, unknown> = { name: editForm.name, role: editForm.role }
      if (editForm.password) payload.password = editForm.password
      const res = await fetch(`/api/admin/users/${editForm.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setShowEdit(false)
      flash('Đã cập nhật người dùng')
      await load()
    } catch (e: unknown) {
      setEditErr((e as Error).message)
    } finally {
      setEditSaving(false)
    }
  }

  async function handleToggleActive(user: User) {
    if (user.id === currentUser?.id) return
    setToggling(user.id)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !user.is_active }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setUsers(u => u.map(x => x.id === user.id ? { ...x, is_active: !x.is_active } : x))
      flash(user.is_active ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản')
    } catch (e: unknown) {
      setError((e as Error).message)
      setTimeout(() => setError(''), 3000)
    } finally {
      setToggling(null)
    }
  }

  async function handleDelete(user: User) {
    if (user.id === currentUser?.id) return
    if (!confirm(`Xóa vĩnh viễn tài khoản "${user.name}" (${user.email})?`)) return
    setDeleting(user.id)
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error((await res.json()).error)
      setUsers(u => u.filter(x => x.id !== user.id))
      flash('Đã xóa người dùng')
    } catch (e: unknown) {
      setError((e as Error).message)
      setTimeout(() => setError(''), 3000)
    } finally {
      setDeleting(null)
    }
  }

  function fmtDate(s: string | null) {
    if (!s) return '—'
    return new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  if (!meLoaded) {
    return (
      <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
        <div className="flex items-center justify-center py-24" style={{ color: 'var(--text-3)' }}>
          <Loader2 size={20} className="animate-spin mr-2" /> Đang tải...
        </div>
      </main>
    )
  }

  if (!canManage) {
    return (
      <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="rounded-xl p-8 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <Lock size={32} className="mx-auto mb-3" style={{ color: 'var(--text-3)' }} />
            <h1 className="text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>Bạn không có quyền truy cập</h1>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              Trang quản lý người dùng chỉ dành cho Admin và Super Admin.
            </p>
          </div>
        </div>
      </main>
    )
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
            onClick={() => { setShowModal(true); setFormErr(''); setForm(EMPTY_FORM) }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--green-800)' }}>
            <Plus size={15} /> Thêm người dùng
          </button>
        </div>

        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}
        {notice && (
          <p className="text-sm mb-4 px-3 py-2 rounded-lg w-fit" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
            {notice}
          </p>
        )}

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
                    {['Người dùng', 'Vai trò', 'Trạng thái', 'Đăng nhập cuối', 'Hành động'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>Chưa có người dùng nào</td></tr>
                  ) : users.map((user, i) => {
                    const roleCfg = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.author
                    const RoleIcon = roleCfg.icon
                    const isSelf = user.id === currentUser?.id
                    // Admins cannot manage super_admin/admin rows
                    const canTouch = isSuper || (user.role !== 'super_admin' && user.role !== 'admin')
                    const selfTip = 'Không thể thao tác trên chính mình'
                    return (
                      <tr key={user.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderTop: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{ background: 'var(--green-100)', color: 'var(--green-800)' }}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium" style={{ color: 'var(--text-1)' }}>{user.name}</span>
                                {isSelf && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>Bạn</span>}
                              </div>
                              <div style={{ color: 'var(--text-3)', fontSize: '0.75rem' }}>{user.email}</div>
                            </div>
                          </div>
                        </td>
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
                            {user.is_active ? 'Hoạt động' : 'Đã khóa'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                          {fmtDate(user.last_login_at)}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEdit(user)}
                              disabled={isSelf || !canTouch}
                              className="p-1.5 rounded-lg"
                              style={{ background: 'var(--surface-2)', color: 'var(--text-2)', opacity: isSelf || !canTouch ? 0.4 : 1, cursor: isSelf || !canTouch ? 'not-allowed' : 'pointer' }}
                              title={isSelf ? selfTip : !canTouch ? 'Không có quyền' : 'Chỉnh sửa'}>
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => handleToggleActive(user)}
                              disabled={isSelf || !canTouch || toggling === user.id}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
                              style={{
                                ...(user.is_active
                                  ? { background: '#fef9c3', color: '#92400e' }
                                  : { background: '#dcfce7', color: '#15803d' }),
                                opacity: isSelf || !canTouch ? 0.4 : 1,
                                cursor: isSelf || !canTouch ? 'not-allowed' : 'pointer',
                              }}
                              title={isSelf ? selfTip : !canTouch ? 'Không có quyền' : user.is_active ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}>
                              {toggling === user.id
                                ? <Loader2 size={12} className="animate-spin" />
                                : user.is_active ? <UserX size={12} /> : <UserCheck size={12} />}
                              {user.is_active ? 'Khóa' : 'Mở khóa'}
                            </button>
                            {isSuper && (
                              <button
                                onClick={() => handleDelete(user)}
                                disabled={isSelf || deleting === user.id}
                                className="p-1.5 rounded-lg"
                                style={{ background: '#fee2e2', color: '#b91c1c', opacity: isSelf ? 0.4 : 1, cursor: isSelf ? 'not-allowed' : 'pointer' }}
                                title={isSelf ? selfTip : 'Xóa người dùng'}>
                                {deleting === user.id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                              </button>
                            )}
                          </div>
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
                  {assignableRoles.map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Mật khẩu * (tối thiểu 8 ký tự)</label>
                <input type="password" style={inp} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Xác nhận mật khẩu *</label>
                <input type="password" style={inp} value={form.passwordConfirm} onChange={e => setForm(p => ({ ...p, passwordConfirm: e.target.value }))} />
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

      {/* Edit user modal */}
      {showEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={e => e.target === e.currentTarget && setShowEdit(false)}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>Chỉnh sửa người dùng</h2>
              <button onClick={() => setShowEdit(false)} style={{ color: 'var(--text-3)' }}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Họ tên *</label>
                <input style={inp} value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Vai trò *</label>
                <select style={inp} value={editForm.role} onChange={e => setEditForm(p => ({ ...p, role: e.target.value as Role }))}>
                  {assignableRoles.map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Mật khẩu mới</label>
                <input type="password" style={inp} placeholder="Để trống nếu không đổi"
                  value={editForm.password} onChange={e => setEditForm(p => ({ ...p, password: e.target.value }))} />
              </div>
            </div>
            {editErr && <p className="text-xs mt-2" style={{ color: '#dc2626' }}>{editErr}</p>}
            <div className="flex gap-2 justify-end mt-5">
              <button onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Hủy</button>
              <button onClick={handleEditUser} disabled={editSaving}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)', opacity: editSaving ? 0.6 : 1 }}>
                {editSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

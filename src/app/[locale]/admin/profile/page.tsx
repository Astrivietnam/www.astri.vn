'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, ShieldAlert, Shield, Edit3, Users, Save, KeyRound } from 'lucide-react'

type Role = 'super_admin' | 'admin' | 'editor' | 'author'

type Profile = {
  id: string
  name: string
  email: string
  role: Role
  last_login_at: string | null
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

const inpReadOnly: React.CSSProperties = {
  ...inp,
  background: 'var(--surface-2)', color: 'var(--text-3)', cursor: 'not-allowed',
}

function Msg({ text, ok }: { text: string; ok?: boolean }) {
  if (!text) return null
  return (
    <p className="text-xs mt-2" style={{ color: ok ? '#15803d' : '#dc2626' }}>{text}</p>
  )
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Account info form
  const [name, setName] = useState('')
  const [savingInfo, setSavingInfo] = useState(false)
  const [infoMsg, setInfoMsg] = useState('')
  const [infoOk, setInfoOk] = useState(false)

  // Password form
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPass, setSavingPass] = useState(false)
  const [passMsg, setPassMsg] = useState('')
  const [passOk, setPassOk] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/profile')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfile(data.user)
      setName(data.user?.name ?? '')
    } catch {
      setError('Không thể tải thông tin tài khoản')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSaveInfo() {
    const trimmed = name.trim()
    if (trimmed.length < 2 || trimmed.length > 80) {
      setInfoOk(false)
      setInfoMsg('Họ tên phải từ 2 đến 80 ký tự')
      return
    }
    setSavingInfo(true)
    setInfoMsg('')
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProfile(data.user)
      setName(data.user?.name ?? trimmed)
      setInfoOk(true)
      setInfoMsg('Đã lưu thay đổi')
    } catch (e: unknown) {
      setInfoOk(false)
      setInfoMsg((e as Error).message || 'Không thể lưu thay đổi')
    } finally {
      setSavingInfo(false)
    }
  }

  async function handleChangePassword() {
    setPassOk(false)
    if (!currentPassword) { setPassMsg('Vui lòng nhập mật khẩu hiện tại'); return }
    if (newPassword.length < 8) { setPassMsg('Mật khẩu mới phải có ít nhất 8 ký tự'); return }
    if (newPassword !== confirmPassword) { setPassMsg('Xác nhận mật khẩu không khớp'); return }
    setSavingPass(true)
    setPassMsg('')
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPassOk(true)
      setPassMsg('Đổi mật khẩu thành công')
    } catch (e: unknown) {
      setPassOk(false)
      setPassMsg((e as Error).message || 'Không thể đổi mật khẩu')
    } finally {
      setSavingPass(false)
    }
  }

  function fmtDate(s: string | null) {
    if (!s) return '—'
    return new Date(s).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  const roleCfg = profile ? (ROLE_CONFIG[profile.role] ?? ROLE_CONFIG.author) : null
  const RoleIcon = roleCfg?.icon

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Hồ sơ cá nhân</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Quản lý thông tin tài khoản và mật khẩu của bạn</p>
        </div>

        {error && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-16" style={{ color: 'var(--text-3)' }}>
            <Loader2 size={20} className="animate-spin mr-2" /> Đang tải...
          </div>
        ) : profile && (
          <div className="flex flex-col gap-6">
            {/* Account info card */}
            <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--text-1)' }}>Thông tin tài khoản</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{ background: 'var(--green-50)', color: 'var(--green-800)', border: '1px solid var(--green-300)' }}>
                  {(profile.name || profile.email).charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-1)' }}>{profile.name}</div>
                  {roleCfg && RoleIcon && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-semibold w-fit mt-1"
                      style={{ background: roleCfg.bg, color: roleCfg.color }}>
                      <RoleIcon size={11} /> {roleCfg.label}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Họ tên</label>
                  <input style={inp} value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Email</label>
                  <input style={inpReadOnly} value={profile.email} readOnly />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Ngày tạo</label>
                    <div className="text-sm" style={{ color: 'var(--text-2)' }}>{fmtDate(profile.created_at)}</div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Đăng nhập cuối</label>
                    <div className="text-sm" style={{ color: 'var(--text-2)' }}>{fmtDate(profile.last_login_at)}</div>
                  </div>
                </div>
              </div>

              <Msg text={infoMsg} ok={infoOk} />

              <div className="flex justify-end mt-5">
                <button onClick={handleSaveInfo} disabled={savingInfo}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: 'var(--green-800)', opacity: savingInfo ? 0.6 : 1 }}>
                  {savingInfo ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {savingInfo ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </div>

            {/* Change password card */}
            <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--text-1)' }}>Đổi mật khẩu</h2>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Mật khẩu hiện tại</label>
                  <input type="password" style={inp} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} autoComplete="current-password" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Mật khẩu mới</label>
                  <input type="password" style={inp} value={newPassword} onChange={e => setNewPassword(e.target.value)} autoComplete="new-password" />
                  <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>Tối thiểu 8 ký tự</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Xác nhận mật khẩu mới</label>
                  <input type="password" style={inp} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                </div>
              </div>

              <Msg text={passMsg} ok={passOk} />

              <div className="flex justify-end mt-5">
                <button onClick={handleChangePassword} disabled={savingPass}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: 'var(--green-800)', opacity: savingPass ? 0.6 : 1 }}>
                  {savingPass ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
                  {savingPass ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Save, Check, Building2, Share2, BarChart3, Lock } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type SiteInfo = {
  name_vi: string; name_en: string; tagline_vi: string; tagline_en: string
  address: string; phone: string; email: string; logo_url: string
}

type SocialLinks = {
  facebook: string; youtube: string; linkedin: string; zalo: string
}

type Analytics = { ga_id: string }

type PasswordForm = { current: string; new_password: string; confirm: string }

type Tab = 'info' | 'social' | 'analytics' | 'security'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inp: React.CSSProperties = {
  width: '100%', padding: '0.55rem 0.75rem',
  borderRadius: '7px', border: '1px solid var(--border)',
  background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>
      {children}
    </label>
  )
}

function SaveBtn({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white"
      style={{ background: saved ? '#15803d' : 'var(--green-800)', opacity: saving ? 0.7 : 1, transition: 'background 0.3s' }}>
      {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
      {saving ? 'Đang lưu...' : saved ? 'Đã lưu' : 'Lưu thay đổi'}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const EMPTY_SITE: SiteInfo = { name_vi: '', name_en: '', tagline_vi: '', tagline_en: '', address: '', phone: '', email: '', logo_url: '' }
const EMPTY_SOCIAL: SocialLinks = { facebook: '', youtube: '', linkedin: '', zalo: '' }
const EMPTY_ANALYTICS: Analytics = { ga_id: '' }
const EMPTY_PW: PasswordForm = { current: '', new_password: '', confirm: '' }

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('info')
  const [loading, setLoading] = useState(true)
  const [fetchErr, setFetchErr] = useState('')

  const [siteInfo, setSiteInfo] = useState<SiteInfo>(EMPTY_SITE)
  const [social, setSocial] = useState<SocialLinks>(EMPTY_SOCIAL)
  const [analytics, setAnalytics] = useState<Analytics>(EMPTY_ANALYTICS)
  const [pw, setPw] = useState<PasswordForm>(EMPTY_PW)

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<Tab | null>(null)
  const [err, setErr] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      const s = data.settings ?? data ?? {}
      setSiteInfo({ ...EMPTY_SITE, ...s.site_info })
      setSocial({ ...EMPTY_SOCIAL, ...s.social_links })
      setAnalytics({ ...EMPTY_ANALYTICS, ...s.analytics })
    } catch {
      setFetchErr('Không thể tải cài đặt')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  async function saveSection(section: Tab, payload: unknown) {
    setSaving(true)
    setErr('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: payload }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setSaved(section)
      setTimeout(() => setSaved(null), 2500)
    } catch (e: unknown) {
      setErr((e as Error).message)
    } finally {
      setSaving(false)
    }
  }

  async function savePassword() {
    if (!pw.current || !pw.new_password) { setErr('Nhập mật khẩu hiện tại và mật khẩu mới'); return }
    if (pw.new_password !== pw.confirm) { setErr('Mật khẩu xác nhận không khớp'); return }
    if (pw.new_password.length < 8) { setErr('Mật khẩu mới cần ít nhất 8 ký tự'); return }
    await saveSection('security', { current: pw.current, new_password: pw.new_password })
    if (!err) setPw(EMPTY_PW)
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'info',      label: 'Thông tin viện', icon: Building2 },
    { key: 'social',    label: 'Mạng xã hội',    icon: Share2 },
    { key: 'analytics', label: 'Phân tích',       icon: BarChart3 },
    { key: 'security',  label: 'Bảo mật',         icon: Lock },
  ]

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Cài đặt</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Cấu hình website ASTRI</p>
        </div>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { setTab(key); setErr('') }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === key ? 'var(--green-800)' : 'transparent',
                color: tab === key ? 'white' : 'var(--text-2)',
              }}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {fetchErr && <p className="text-sm mb-4" style={{ color: '#dc2626' }}>{fetchErr}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-16" style={{ color: 'var(--text-3)' }}>
            <Loader2 size={20} className="animate-spin mr-2" /> Đang tải cài đặt...
          </div>
        ) : (
          <div className="rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {err && <p className="text-sm mb-4 px-3 py-2 rounded-lg" style={{ background: '#fee2e2', color: '#b91c1c' }}>{err}</p>}

            {/* ── Tab: Thông tin viện ──────────────────────────────────────── */}
            {tab === 'info' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: 'var(--text-1)' }}>Thông tin viện</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label>Tên viện (VI)</Label>
                    <input style={inp} value={siteInfo.name_vi}
                      onChange={e => setSiteInfo(p => ({ ...p, name_vi: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Institute Name (EN)</Label>
                    <input style={inp} value={siteInfo.name_en}
                      onChange={e => setSiteInfo(p => ({ ...p, name_en: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Slogan (VI)</Label>
                    <input style={inp} value={siteInfo.tagline_vi}
                      onChange={e => setSiteInfo(p => ({ ...p, tagline_vi: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Tagline (EN)</Label>
                    <input style={inp} value={siteInfo.tagline_en}
                      onChange={e => setSiteInfo(p => ({ ...p, tagline_en: e.target.value }))} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Địa chỉ</Label>
                    <input style={inp} value={siteInfo.address}
                      onChange={e => setSiteInfo(p => ({ ...p, address: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Số điện thoại</Label>
                    <input style={inp} type="tel" value={siteInfo.phone}
                      onChange={e => setSiteInfo(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Email liên hệ</Label>
                    <input style={inp} type="email" value={siteInfo.email}
                      onChange={e => setSiteInfo(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>URL Logo</Label>
                    <input style={inp} placeholder="https://..." value={siteInfo.logo_url}
                      onChange={e => setSiteInfo(p => ({ ...p, logo_url: e.target.value }))} />
                    {siteInfo.logo_url && (
                      <img src={siteInfo.logo_url} alt="logo preview"
                        style={{ marginTop: '0.5rem', height: 48, borderRadius: 6, border: '1px solid var(--border)' }} />
                    )}
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <SaveBtn onClick={() => saveSection('info', { site_info: siteInfo })} saving={saving} saved={saved === 'info'} />
                </div>
              </div>
            )}

            {/* ── Tab: Mạng xã hội ────────────────────────────────────────── */}
            {tab === 'social' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: 'var(--text-1)' }}>Mạng xã hội</h2>
                {([
                  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
                  { key: 'youtube',  label: 'YouTube',  placeholder: 'https://youtube.com/...' },
                  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                  { key: 'zalo',     label: 'Zalo OA',  placeholder: 'https://zalo.me/...' },
                ] as const).map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <input style={inp} type="url" placeholder={placeholder} value={social[key]}
                      onChange={e => setSocial(p => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <SaveBtn onClick={() => saveSection('social', { social_links: social })} saving={saving} saved={saved === 'social'} />
                </div>
              </div>
            )}

            {/* ── Tab: Phân tích ───────────────────────────────────────────── */}
            {tab === 'analytics' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: 'var(--text-1)' }}>Phân tích & Theo dõi</h2>
                <div>
                  <Label>Google Analytics ID</Label>
                  <input style={inp} placeholder="G-XXXXXXXXXX hoặc UA-XXXXXXXX-X" value={analytics.ga_id}
                    onChange={e => setAnalytics({ ga_id: e.target.value })} />
                  <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                    Nhập Measurement ID từ Google Analytics 4 (bắt đầu bằng G-) hoặc UA tracking code.
                  </p>
                </div>
                <div className="rounded-lg p-3 text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Hướng dẫn</p>
                  <ol className="list-decimal list-inside flex flex-col gap-1 text-xs" style={{ color: 'var(--text-3)' }}>
                    <li>Đăng nhập Google Analytics → Admin</li>
                    <li>Chọn Property → Data Streams → Web stream</li>
                    <li>Sao chép Measurement ID (G-XXXXXXXXXX)</li>
                  </ol>
                </div>
                <div className="flex justify-end pt-2">
                  <SaveBtn onClick={() => saveSection('analytics', { analytics })} saving={saving} saved={saved === 'analytics'} />
                </div>
              </div>
            )}

            {/* ── Tab: Bảo mật ─────────────────────────────────────────────── */}
            {tab === 'security' && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold" style={{ color: 'var(--text-1)' }}>Đổi mật khẩu</h2>
                <div>
                  <Label>Mật khẩu hiện tại</Label>
                  <input style={inp} type="password" value={pw.current}
                    onChange={e => setPw(p => ({ ...p, current: e.target.value }))} />
                </div>
                <div>
                  <Label>Mật khẩu mới (tối thiểu 8 ký tự)</Label>
                  <input style={inp} type="password" value={pw.new_password}
                    onChange={e => setPw(p => ({ ...p, new_password: e.target.value }))} />
                </div>
                <div>
                  <Label>Xác nhận mật khẩu mới</Label>
                  <input style={inp} type="password" value={pw.confirm}
                    onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} />
                  {pw.confirm && pw.new_password !== pw.confirm && (
                    <p className="text-xs mt-1" style={{ color: '#dc2626' }}>Mật khẩu không khớp</p>
                  )}
                </div>
                <div className="rounded-lg p-3 text-xs" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>
                  Mật khẩu tốt: tối thiểu 8 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.
                </div>
                <div className="flex justify-end pt-2">
                  <SaveBtn onClick={savePassword} saving={saving} saved={saved === 'security'} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

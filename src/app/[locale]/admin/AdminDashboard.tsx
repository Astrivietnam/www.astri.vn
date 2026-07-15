'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  PenSquare, Image as ImageIcon, Users, ExternalLink,
  FileText, CheckCircle2, FileEdit, Eye, MailWarning, FolderOpen,
  ArrowRight, Inbox, BarChart3,
} from 'lucide-react'

type Post = {
  id: string; slug: string; title_vi: string; category: string
  is_published: boolean; published_at: string | null; created_at: string
}
type Contact = {
  id: string; name: string; email: string; subject: string | null
  message: string; is_read: boolean; created_at: string
}

const CATEGORY_VI: Record<string, string> = {
  research: 'Nghiên cứu', technology: 'Công nghệ', trade: 'Hợp tác',
  training: 'Đào tạo', farm: 'Trang trại', product: 'Sản phẩm', news: 'Sự kiện',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Vừa xong'
  if (mins < 60) return `${mins} phút trước`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} giờ trước`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} ngày trước`
  return new Date(dateStr).toLocaleDateString('vi-VN')
}

const card: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: '14px',
}

export default function AdminDashboard({
  locale, posts, contacts,
}: {
  locale: string; posts: Post[]; contacts: Contact[]
}) {
  const [userName, setUserName] = useState<string | null>(null)
  const [userLoading, setUserLoading] = useState(true)
  const [mediaCount, setMediaCount] = useState<number | null>(null)
  const [totalViews, setTotalViews] = useState<number | null>(null)
  const [viewsById, setViewsById] = useState<Record<string, number>>({})

  // User info — /api/admin/auth/me
  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/auth/me')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d?.success && d.user?.name) setUserName(d.user.name) })
      .catch(() => {})
      .finally(() => { if (!cancelled) setUserLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Media count — /api/admin/media
  useEffect(() => {
    let cancelled = false
    fetch('/api/admin/media?limit=1')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d && typeof d.total === 'number') setMediaCount(d.total) })
      .catch(() => { if (!cancelled) setMediaCount(0) })
    return () => { cancelled = true }
  }, [])

  // View counts — best effort, skip gracefully if column/table unavailable
  useEffect(() => {
    let cancelled = false
    supabase
      .from('posts')
      .select('id, view_count')
      .then(({ data, error }) => {
        if (cancelled || error || !data) return
        const map: Record<string, number> = {}
        let sum = 0
        for (const row of data as { id: string; view_count: number | null }[]) {
          const v = row.view_count ?? 0
          map[row.id] = v
          sum += v
        }
        setViewsById(map)
        setTotalViews(sum)
      })
    return () => { cancelled = true }
  }, [])

  const publishedCount = posts.filter(p => p.is_published).length
  const draftCount = posts.length - publishedCount
  const unreadCount = contacts.filter(c => !c.is_read).length

  const today = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  const recentPosts = posts.slice(0, 6)
  const recentContacts = contacts.slice(0, 6)

  // Top 5 categories by post count
  const topCategories = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const p of posts) {
      const key = p.category || 'khac'
      counts[key] = (counts[key] ?? 0) + 1
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [posts])
  const maxCategoryCount = topCategories.length > 0 ? topCategories[0][1] : 1

  const statCards: {
    label: string; value: number | null; desc: string
    icon: typeof FileText
  }[] = [
    { label: 'Tổng bài viết', value: posts.length, desc: 'Tất cả bài trên hệ thống', icon: FileText },
    { label: 'Đã xuất bản', value: publishedCount, desc: posts.length > 0 ? `${Math.round((publishedCount / posts.length) * 100)}% tổng số bài` : 'Chưa có bài viết', icon: CheckCircle2 },
    { label: 'Bản nháp', value: draftCount, desc: draftCount > 0 ? 'Đang chờ hoàn thiện' : 'Không có bản nháp', icon: FileEdit },
    { label: 'Lượt xem', value: totalViews, desc: 'Tổng lượt xem bài viết', icon: Eye },
    { label: 'Liên hệ chưa đọc', value: unreadCount, desc: `${contacts.length} liên hệ tổng cộng`, icon: MailWarning },
    { label: 'Media files', value: mediaCount, desc: 'Tệp trong thư viện', icon: FolderOpen },
  ]

  const quickActions = [
    { label: 'Viết bài mới', href: `/${locale}/admin/posts/new`, icon: PenSquare, primary: true },
    { label: 'Thư viện Media', href: `/${locale}/admin/media`, icon: ImageIcon, primary: false },
    { label: 'Người dùng', href: `/${locale}/admin/users`, icon: Users, primary: false },
  ]

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Greeting header ─────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              {userLoading
                ? 'Xin chào!'
                : `Xin chào, ${userName ?? 'Quản trị viên'}!`}
            </h1>
            <p className="text-sm mt-1 capitalize" style={{ color: 'var(--text-3)' }}>{today}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map(({ label, href, icon: Icon, primary }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold"
                style={primary
                  ? { background: 'var(--green-800)', color: 'white' }
                  : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
              >
                <Icon size={14} /> {label}
              </Link>
            ))}
            <a
              href={`/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
            >
              <ExternalLink size={14} /> Xem website
            </a>
          </div>
        </div>

        {/* ── Stat cards ──────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ label, value, desc, icon: Icon }) => (
            <div key={label} className="p-4" style={card}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: 'var(--green-50)' }}
              >
                <Icon size={16} style={{ color: 'var(--green-700)' }} />
              </div>
              {value === null ? (
                <div
                  className="h-7 w-14 rounded mb-1 animate-pulse"
                  style={{ background: 'var(--border)' }}
                />
              ) : (
                <div
                  className="text-2xl font-bold leading-tight"
                  style={{ color: 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {value.toLocaleString('vi-VN')}
                </div>
              )}
              <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-2)' }}>{label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-3)' }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* ── Two-column: recent posts + latest contacts ──── */}
        <div className="grid lg:grid-cols-5 gap-6 mb-8">

          {/* Recent posts */}
          <div className="lg:col-span-3 overflow-hidden" style={card}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <FileText size={15} style={{ color: 'var(--green-700)' }} /> Bài viết gần đây
              </h2>
              <Link
                href={`/${locale}/admin/posts`}
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: 'var(--green-700)' }}
              >
                Xem tất cả <ArrowRight size={12} />
              </Link>
            </div>
            {recentPosts.length === 0 ? (
              <div className="text-center py-12 text-sm" style={{ color: 'var(--text-3)' }}>
                Chưa có bài viết nào
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr>
                      {['Tiêu đề', 'Chuyên mục', 'Trạng thái', 'Ngày', 'Lượt xem'].map(h => (
                        <th
                          key={h}
                          style={{
                            padding: '0.6rem 1.25rem', textAlign: 'left', fontWeight: 600,
                            color: 'var(--text-3)', fontSize: '0.7rem',
                            textTransform: 'uppercase', letterSpacing: '0.04em',
                            borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map(post => (
                      <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '0.7rem 1.25rem', maxWidth: '260px' }}>
                          <Link
                            href={`/${locale}/admin/posts/${post.id}`}
                            className="font-medium line-clamp-1 hover:underline"
                            style={{ color: 'var(--text-1)' }}
                          >
                            {post.title_vi}
                          </Link>
                        </td>
                        <td style={{ padding: '0.7rem 1.25rem', whiteSpace: 'nowrap' }}>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                            {CATEGORY_VI[post.category] ?? post.category}
                          </span>
                        </td>
                        <td style={{ padding: '0.7rem 1.25rem', whiteSpace: 'nowrap' }}>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={post.is_published
                              ? { background: 'var(--green-50)', color: 'var(--green-700)' }
                              : { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
                          >
                            {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                          </span>
                        </td>
                        <td style={{ padding: '0.7rem 1.25rem', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                          {new Date(post.created_at).toLocaleDateString('vi-VN')}
                        </td>
                        <td style={{ padding: '0.7rem 1.25rem', color: 'var(--text-3)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                          {viewsById[post.id] !== undefined ? viewsById[post.id].toLocaleString('vi-VN') : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Latest contacts */}
          <div className="lg:col-span-2 overflow-hidden" style={card}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <h2 className="font-semibold text-sm flex items-center gap-2" style={{ color: 'var(--text-1)' }}>
                <Inbox size={15} style={{ color: 'var(--green-700)' }} /> Liên hệ mới nhất
              </h2>
              <Link
                href={`/${locale}/admin/contacts`}
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: 'var(--green-700)' }}
              >
                Xem tất cả <ArrowRight size={12} />
              </Link>
            </div>
            {recentContacts.length === 0 ? (
              <div className="text-center py-12 text-sm" style={{ color: 'var(--text-3)' }}>
                Chưa có liên hệ nào
              </div>
            ) : (
              <div>
                {recentContacts.map((c, i) => (
                  <Link
                    key={c.id}
                    href={`/${locale}/admin/contacts`}
                    className="flex items-start gap-3 px-5 py-3.5 hover:opacity-80"
                    style={{ borderBottom: i < recentContacts.length - 1 ? '1px solid var(--border)' : 'none' }}
                  >
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                      style={{ background: c.is_read ? 'var(--border)' : 'var(--green-700)' }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold truncate" style={{ color: 'var(--text-1)' }}>{c.name}</span>
                        <span className="text-[11px] shrink-0" style={{ color: 'var(--text-3)' }}>{timeAgo(c.created_at)}</span>
                      </div>
                      <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>{c.email}</p>
                      {(c.subject || c.message) && (
                        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-2)' }}>
                          {c.subject || c.message}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Category distribution ───────────────────────── */}
        <div className="p-5 mb-8" style={card}>
          <h2 className="font-semibold text-sm flex items-center gap-2 mb-4" style={{ color: 'var(--text-1)' }}>
            <BarChart3 size={15} style={{ color: 'var(--green-700)' }} /> Phân bố chuyên mục
          </h2>
          {topCategories.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: 'var(--text-3)' }}>Chưa có dữ liệu</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topCategories.map(([cat, count]) => (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-xs font-medium w-28 shrink-0 truncate" style={{ color: 'var(--text-2)' }}>
                    {CATEGORY_VI[cat] ?? cat}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(4, (count / maxCategoryCount) * 100)}%`,
                        background: 'var(--green-700)',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span
                    className="text-xs w-10 text-right shrink-0"
                    style={{ color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}
                  >
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── System info footer ──────────────────────────── */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 text-xs px-1"
          style={{ color: 'var(--text-3)' }}
        >
          <span>ASTRI CMS · Phiên bản 2.0</span>
          <span>Môi trường: {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} · Next.js + Supabase</span>
        </div>
      </div>
    </main>
  )
}

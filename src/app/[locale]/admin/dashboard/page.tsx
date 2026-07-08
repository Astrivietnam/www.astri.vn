import { cookies } from 'next/headers'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cookieStore = await cookies()
  const user = await getAdminSession(cookieStore)

  const admin = createAdminClient()

  const [
    postsRes,
    publishedRes,
    draftsRes,
    contactsRes,
    unreadRes,
    mediaRes,
    recentPostsRes,
    unreadContactsRes,
  ] = await Promise.all([
    admin.from('posts').select('id', { count: 'exact', head: true }),
    admin.from('posts').select('id', { count: 'exact', head: true }).eq('is_published', true),
    admin.from('posts').select('id', { count: 'exact', head: true }).eq('is_published', false),
    admin.from('contacts').select('id', { count: 'exact', head: true }),
    admin.from('contacts').select('id', { count: 'exact', head: true }).eq('is_read', false),
    admin.from('media_files').select('id', { count: 'exact', head: true }),
    admin
      .from('posts')
      .select('id, slug, title_vi, category, is_published, published_at, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    admin
      .from('contacts')
      .select('id, name, email, subject, created_at')
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = {
    totalPosts: postsRes.count ?? 0,
    published: publishedRes.count ?? 0,
    drafts: draftsRes.count ?? 0,
    totalContacts: contactsRes.count ?? 0,
    unreadContacts: unreadRes.count ?? 0,
    totalMedia: mediaRes.count ?? 0,
  }

  const recentPosts = recentPostsRes.data ?? []
  const unreadContacts = unreadContactsRes.data ?? []

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px 24px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.06)',
  }

  const statCards = [
    { label: 'Tổng bài viết', value: stats.totalPosts, color: '#1A6B2F', icon: '✎' },
    { label: 'Đã xuất bản', value: stats.published, color: '#2563eb', icon: '✓' },
    { label: 'Bản nháp', value: stats.drafts, color: '#d97706', icon: '○' },
    { label: 'Tổng liên hệ', value: stats.totalContacts, color: '#7c3aed', icon: '✉' },
    { label: 'Chưa đọc', value: stats.unreadContacts, color: '#dc2626', icon: '!' },
    { label: 'Tổng media', value: stats.totalMedia, color: '#0891b2', icon: '⊡' },
  ]

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Welcome */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Xin chào, {user?.name ?? 'Admin'}!
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
          Đây là tổng quan hoạt động của website ASTRI.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {statCards.map((s) => (
          <div key={s.label} style={cardStyle}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: s.color + '18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '10px',
                color: s.color,
              }}
            >
              {s.icon}
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {/* Recent posts */}
        <div style={cardStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Bài viết gần đây
            </h2>
            <Link
              href={`/${locale}/admin/posts`}
              style={{ fontSize: '13px', color: '#1A6B2F', textDecoration: 'none' }}
            >
              Xem tất cả
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '6px 8px',
                      color: '#6b7280',
                      fontWeight: '600',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    Tiêu đề
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '6px 8px',
                      color: '#6b7280',
                      fontWeight: '600',
                      borderBottom: '1px solid #f0f0f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Trạng thái
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '6px 8px',
                      color: '#6b7280',
                      fontWeight: '600',
                      borderBottom: '1px solid #f0f0f0',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Ngày tạo
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={{ padding: '16px 8px', color: '#9ca3af', textAlign: 'center' }}
                    >
                      Chưa có bài viết
                    </td>
                  </tr>
                ) : (
                  recentPosts.map((post) => (
                    <tr key={post.id}>
                      <td style={{ padding: '8px 8px', borderBottom: '1px solid #f9f9f9' }}>
                        <Link
                          href={`/${locale}/admin/posts/${post.id}`}
                          style={{
                            color: '#111827',
                            textDecoration: 'none',
                            fontWeight: '500',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.title_vi}
                        </Link>
                      </td>
                      <td
                        style={{ padding: '8px 8px', borderBottom: '1px solid #f9f9f9', whiteSpace: 'nowrap' }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: '600',
                            background: post.is_published ? '#dcfce7' : '#fef9c3',
                            color: post.is_published ? '#15803d' : '#a16207',
                          }}
                        >
                          {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '8px 8px',
                          borderBottom: '1px solid #f9f9f9',
                          color: '#6b7280',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatDate(post.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unread contacts */}
        <div style={cardStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Liên hệ chưa đọc
              {stats.unreadContacts > 0 && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#dc2626',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                    marginLeft: '8px',
                  }}
                >
                  {stats.unreadContacts}
                </span>
              )}
            </h2>
            <Link
              href={`/${locale}/admin/contacts`}
              style={{ fontSize: '13px', color: '#1A6B2F', textDecoration: 'none' }}
            >
              Xem tất cả
            </Link>
          </div>
          {unreadContacts.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '16px 0' }}>
              Không có liên hệ chưa đọc
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {unreadContacts.map((c) => (
                <div
                  key={c.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#fafafa',
                    border: '1px solid #f0f0f0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '13px', color: '#111827' }}>
                        {c.name}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '6px' }}>
                        {c.email}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                      {formatDate(c.created_at)}
                    </span>
                  </div>
                  {c.subject && (
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '12px',
                        color: '#6b7280',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.subject}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 16px' }}>
          Thao tác nhanh
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}/admin/posts/new`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#1A6B2F',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background 0.15s',
            }}
          >
            <span>✎</span> Bài viết mới
          </Link>
          <Link
            href={`/${locale}/admin/media`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#0891b2',
              color: '#ffffff',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'background 0.15s',
            }}
          >
            <span>⊡</span> Upload media
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PlusCircle, FileText, Mail, Eye, EyeOff, Trash2, ExternalLink, BarChart3 } from 'lucide-react'

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

export default function AdminDashboard({
  locale, posts: initialPosts, contacts: initialContacts,
}: {
  locale: string; posts: Post[]; contacts: Contact[]
}) {
  const [posts, setPosts] = useState(initialPosts)
  const [contacts, setContacts] = useState(initialContacts)
  const [tab, setTab] = useState<'posts' | 'contacts'>('posts')
  const [showNewPost, setShowNewPost] = useState(false)

  async function togglePublish(post: Post) {
    const { error } = await supabase
      .from('posts')
      .update({ is_published: !post.is_published })
      .eq('id', post.id)
    if (!error) setPosts(p => p.map(x => x.id === post.id ? { ...x, is_published: !x.is_published } : x))
  }

  async function markRead(contact: Contact) {
    await supabase.from('contacts').update({ is_read: true }).eq('id', contact.id)
    setContacts(c => c.map(x => x.id === contact.id ? { ...x, is_read: true } : x))
  }

  const stats = [
    { label: 'Tổng bài viết', value: posts.length, icon: FileText },
    { label: 'Đã xuất bản', value: posts.filter(p => p.is_published).length, icon: Eye },
    { label: 'Tin nhắn', value: contacts.length, icon: Mail },
    { label: 'Chưa đọc', value: contacts.filter(c => !c.is_read).length, icon: BarChart3 },
  ]

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.8rem',
    borderRadius: '7px', border: '1px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>Quản trị ASTRI</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>Quản lý nội dung website</p>
          </div>
          <Link
            href={`/${locale}`}
            className="text-sm flex items-center gap-1.5 px-3 py-2 rounded-lg"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
          >
            <ExternalLink size={13} /> Xem website
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} style={{ color: 'var(--green-600)' }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-lg w-fit" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {(['posts', 'contacts'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                background: tab === t ? 'var(--green-800)' : 'transparent',
                color: tab === t ? 'white' : 'var(--text-2)',
              }}
            >
              {t === 'posts' ? `Bài viết (${posts.length})` : `Liên hệ (${contacts.filter(c => !c.is_read).length} mới)`}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {tab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold" style={{ color: 'var(--text-1)' }}>Tất cả bài viết</h2>
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                style={{ background: 'var(--green-800)' }}
              >
                <PlusCircle size={15} /> Thêm bài mới
              </button>
            </div>

            {/* Quick new post form */}
            {showNewPost && (
              <NewPostForm locale={locale} onClose={() => setShowNewPost(false)}
                onCreated={(p) => { setPosts(prev => [p, ...prev]); setShowNewPost(false) }} />
            )}

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    {['Tiêu đề', 'Chuyên mục', 'Ngày tạo', 'Trạng thái', 'Hành động'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, i) => (
                    <tr key={post.id} style={{ background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)', borderTop: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-1)', maxWidth: '320px' }}>
                        <p className="font-medium line-clamp-1">{post.title_vi}</p>
                        <p style={{ color: 'var(--text-3)', fontSize: '0.75rem' }}>/{post.slug}</p>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                          {CATEGORY_VI[post.category] ?? post.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-3)', fontSize: '0.8rem' }}>
                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={post.is_published
                            ? { background: '#dcfce7', color: '#15803d' }
                            : { background: '#fef9c3', color: '#854d0e' }}>
                          {post.is_published ? 'Đã xuất bản' : 'Nháp'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div className="flex gap-2">
                          <button
                            onClick={() => togglePublish(post)}
                            title={post.is_published ? 'Ẩn' : 'Xuất bản'}
                            className="p-1.5 rounded-md transition-colors"
                            style={{ color: post.is_published ? 'var(--text-3)' : 'var(--green-700)', background: 'var(--surface-2)' }}
                          >
                            {post.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <Link
                            href={`/${locale}/news/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md"
                            style={{ color: 'var(--text-3)', background: 'var(--surface-2)' }}
                          >
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {posts.length === 0 && (
                <div className="text-center py-12" style={{ color: 'var(--text-3)' }}>Chưa có bài viết nào</div>
              )}
            </div>
          </div>
        )}

        {/* Contacts tab */}
        {tab === 'contacts' && (
          <div className="flex flex-col gap-4">
            {contacts.length === 0 && (
              <div className="text-center py-12" style={{ color: 'var(--text-3)' }}>Chưa có tin nhắn nào</div>
            )}
            {contacts.map(c => (
              <div
                key={c.id}
                className="rounded-xl p-5"
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${c.is_read ? 'var(--border)' : 'var(--green-300)'}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{c.name}</span>
                      {!c.is_read && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: 'var(--green-800)', color: 'white' }}>Mới</span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                      {c.email} · {new Date(c.created_at).toLocaleDateString('vi-VN')}
                    </p>
                    {c.subject && <p className="text-sm font-medium mt-2" style={{ color: 'var(--text-2)' }}>{c.subject}</p>}
                    <p className="text-sm mt-1.5" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{c.message}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {!c.is_read && (
                      <button
                        onClick={() => markRead(c)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                        style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}
                      >
                        Đánh dấu đã đọc
                      </button>
                    )}
                    <a
                      href={`mailto:${c.email}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: 'var(--green-800)' }}
                    >
                      Trả lời
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function NewPostForm({ locale, onClose, onCreated }: {
  locale: string
  onClose: () => void
  onCreated: (p: Post) => void
}) {
  const [form, setForm] = useState({
    slug: '', title_vi: '', title_en: '', category: 'news',
    excerpt_vi: '', content_vi: '', is_published: false,
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  async function save() {
    if (!form.slug || !form.title_vi) { setErr('Cần nhập slug và tiêu đề'); return }
    setSaving(true)
    const { data, error } = await supabase.from('posts').insert([{
      ...form,
      author: 'Ban Biên tập ASTRI',
      published_at: form.is_published ? new Date().toISOString() : null,
    }]).select().single()
    if (error) { setErr(error.message); setSaving(false); return }
    onCreated(data)
  }

  const inputStyle = {
    width: '100%', padding: '0.6rem 0.8rem',
    borderRadius: '7px', border: '1px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.875rem',
  }

  return (
    <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--surface)', border: '2px solid var(--green-300)' }}>
      <h3 className="font-bold mb-4" style={{ color: 'var(--text-1)' }}>Thêm bài viết mới</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Slug (URL) *</label>
          <input style={inputStyle} placeholder="ten-bai-viet" value={form.slug}
            onChange={e => setForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/\s/g, '-') }))} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Chuyên mục</label>
          <select style={inputStyle} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
            {Object.entries(CATEGORY_VI).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Tiêu đề (VI) *</label>
          <input style={inputStyle} value={form.title_vi} onChange={e => setForm(p => ({ ...p, title_vi: e.target.value }))} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Title (EN)</label>
          <input style={inputStyle} value={form.title_en} onChange={e => setForm(p => ({ ...p, title_en: e.target.value }))} />
        </div>
      </div>
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Tóm tắt</label>
        <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={form.excerpt_vi}
          onChange={e => setForm(p => ({ ...p, excerpt_vi: e.target.value }))} />
      </div>
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase tracking-wide block mb-1" style={{ color: 'var(--text-3)' }}>Nội dung</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} rows={6} value={form.content_vi}
          onChange={e => setForm(p => ({ ...p, content_vi: e.target.value }))} />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-2)' }}>
          <input type="checkbox" checked={form.is_published}
            onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))} />
          Xuất bản ngay
        </label>
        {err && <p className="text-xs" style={{ color: '#DC2626' }}>{err}</p>}
        <div className="flex gap-2 ml-auto">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm" style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}>Hủy</button>
          <button onClick={save} disabled={saving} className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'var(--green-800)', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Đang lưu...' : 'Lưu bài'}
          </button>
        </div>
      </div>
    </div>
  )
}

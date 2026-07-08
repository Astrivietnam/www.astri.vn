import Link from 'next/link'
import { FileText, PlusCircle, Pencil } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase'
import type { Page } from '@/lib/supabase'

export default async function AdminPagesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  const { data: pages } = await supabase
    .from('pages')
    .select('id, slug, title_vi, title_en, updated_at')
    .order('slug', { ascending: true })

  const list = (pages ?? []) as Page[]

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  return (
    <main style={{ flex: 1, paddingTop: '4rem', background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-1)' }}>Quản lý trang</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
              {list.length} trang tĩnh
            </p>
          </div>
          <Link
            href={`/${locale}/admin/pages/new`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '9px',
              background: 'var(--green-800)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            <PlusCircle size={15} />
            Thêm trang
          </Link>
        </div>

        {/* Table */}
        {list.length === 0 ? (
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '4rem 2rem', borderRadius: '12px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text-3)',
            }}
          >
            <FileText size={40} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <p>Chưa có trang nào. Tạo trang đầu tiên.</p>
          </div>
        ) : (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Tiêu đề
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Slug
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Cập nhật
                  </th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((page, i) => (
                  <tr
                    key={page.id}
                    style={{
                      borderBottom: i < list.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-1)' }}>
                        {page.title_vi}
                      </div>
                      {page.title_en && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '0.15rem' }}>
                          {page.title_en}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <code style={{ fontSize: '0.78rem', color: 'var(--green-700)', background: 'var(--green-50)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                        {page.slug}
                      </code>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: 'var(--text-3)' }}>
                      {formatDate(page.updated_at)}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <Link
                        href={`/${locale}/admin/pages/${page.id}`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '7px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          color: 'var(--text-2)',
                          fontSize: '0.8rem',
                          fontWeight: 500,
                          textDecoration: 'none',
                        }}
                      >
                        <Pencil size={12} />
                        Chỉnh sửa
                      </Link>
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

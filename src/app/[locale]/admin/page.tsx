import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase'
import AdminDashboard from './AdminDashboard'
import Header from '@/components/layout/Header'

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Basic server-side check — service key must exist
  let posts = []
  let contacts = []
  try {
    const admin = createAdminClient()
    const [postsRes, contactsRes] = await Promise.all([
      admin.from('posts').select('id, slug, title_vi, category, is_published, published_at, created_at').order('created_at', { ascending: false }),
      admin.from('contacts').select('id, name, email, subject, message, is_read, created_at').order('created_at', { ascending: false }),
    ])
    posts = postsRes.data ?? []
    contacts = contactsRes.data ?? []
  } catch {
    redirect(`/${locale}`)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <AdminDashboard locale={locale} posts={posts} contacts={contacts} />
    </div>
  )
}

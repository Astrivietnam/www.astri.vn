import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase'
import Header from '@/components/layout/Header'
import MediaLibraryClient from './MediaLibraryClient'

export default async function AdminMediaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  let files: Record<string, unknown>[] = []
  let total = 0

  try {
    const admin = createAdminClient()
    const { data, count, error } = await admin
      .from('media')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(0, 29)

    if (error) throw error
    files = data ?? []
    total = count ?? 0
  } catch {
    redirect(`/${locale}/admin`)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <MediaLibraryClient locale={locale} initialFiles={files} initialTotal={total} />
    </div>
  )
}

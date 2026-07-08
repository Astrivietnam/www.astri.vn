import { cookies } from 'next/headers'
import { getAdminSession } from '@/lib/auth'
import AdminLayout from '@/components/admin/AdminLayout'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cookieStore = await cookies()
  const user = await getAdminSession(cookieStore)

  return (
    <AdminLayout locale={locale} user={user}>
      {children}
    </AdminLayout>
  )
}

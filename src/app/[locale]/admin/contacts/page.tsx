import { createAdminClient } from '@/lib/supabase'
import ContactsClient from './ContactsClient'

export default async function AdminContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  const { data: contacts } = await supabase
    .from('contacts')
    .select('id, name, email, phone, subject, message, is_read, created_at')
    .order('created_at', { ascending: false })

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#111827', margin: 0 }}>Form liên hệ</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>
          {contacts?.length ?? 0} liên hệ từ khách
        </p>
      </div>
      <ContactsClient contacts={contacts ?? []} locale={locale} />
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Viện ASTRI',
    default: 'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp',
  },
  description:
    'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp (ASTRI) — nghiên cứu, ứng dụng và chuyển giao công nghệ phục vụ nông nghiệp bền vững Việt Nam.',
  metadataBase: new URL('https://www.astri.vn'),
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

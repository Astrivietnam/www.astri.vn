import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from './ContactForm'
import { MapPin, Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = {
    vi: {
      eyebrow: 'Liên hệ',
      title: 'Kết nối với Viện ASTRI',
      subtitle: 'Chúng tôi sẵn sàng lắng nghe và hợp tác. Gửi thông tin cho chúng tôi và đội ngũ sẽ phản hồi trong vòng 1–2 ngày làm việc.',
      address: 'Địa chỉ',
      email: 'Email',
    },
    en: {
      eyebrow: 'Contact',
      title: 'Connect with ASTRI',
      subtitle: 'We are ready to listen and collaborate. Send us your message and our team will respond within 1–2 business days.',
      address: 'Address',
      email: 'Email',
    },
  }[locale] ?? {
    eyebrow: 'Liên hệ', title: 'Kết nối', subtitle: '', address: 'Địa chỉ', email: 'Email',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {t.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {t.title}
            </h1>
            <p className="mt-3 max-w-xl text-base" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {t.subtitle}
            </p>
          </div>
        </div>

        <section className="py-14 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
            {/* Info column */}
            <div className="flex flex-col gap-5">
              <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>{t.address}</p>
                    <p className="text-sm" style={{ color: 'var(--text-2)' }}>{siteConfig.address}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>{t.email}</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-sm" style={{ color: 'var(--green-700)' }}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-2">
              <ContactForm locale={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

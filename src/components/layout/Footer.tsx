import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { MapPin, Mail, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const quickLinks = ['about', 'research', 'technology', 'trade', 'training', 'farm', 'oresoi', 'news', 'contact'] as const
  const hrefs: Record<string, string> = {
    about: '/about', research: '/research', technology: '/technology',
    trade: '/trade', training: '/training', farm: '/farm',
    oresoi: '/oresoi', news: '/news', contact: '/contact',
  }

  return (
    <footer style={{ background: 'var(--green-950)', color: 'var(--green-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-9 h-9 rounded flex items-center justify-center text-white font-black"
                style={{ background: 'var(--green-800)' }}
              >
                A
              </div>
              <span className="font-bold text-lg text-white">Viện ASTRI</span>
            </div>
            <p className="text-sm mb-1" style={{ color: 'var(--green-200)' }}>
              {locale === 'vi' ? siteConfig.nameFull : siteConfig.nameEn}
            </p>
            <p className="text-xs mt-3" style={{ color: 'var(--green-300)' }}>
              {t('tagline')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t('quick_links')}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${hrefs[key]}`}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--green-200)' }}
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {t('contact_info')}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-2.5 items-start">
                <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--green-300)' }} />
                <span className="text-sm" style={{ color: 'var(--green-200)' }}>
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={15} className="shrink-0" style={{ color: 'var(--green-300)' }} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm"
                  style={{ color: 'var(--green-200)' }}
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--green-900)', color: 'var(--green-300)' }}
        >
          <p>© {new Date().getFullYear()} {t('copyright')}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={`/${locale === 'vi' ? 'en' : 'vi'}`} className="hover:text-white transition-colors">
              {locale === 'vi' ? 'English' : 'Tiếng Việt'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

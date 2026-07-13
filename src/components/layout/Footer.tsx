import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/lib/config'

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const vi = locale === 'vi'

  const colActivities = [
    { vi: 'Nghiên cứu khoa học', en: 'Research', href: '/research' },
    { vi: 'Công nghệ & Chuyển giao', en: 'Technology', href: '/technology' },
    { vi: 'Đào tạo & Tập huấn', en: 'Training', href: '/training' },
    { vi: 'Hợp tác quốc tế', en: 'Cooperation', href: '/cooperation' },
    { vi: 'Xúc tiến thương mại', en: 'Trade Promotion', href: '/trade' },
    { vi: 'Tin tức & Sự kiện', en: 'News & Events', href: '/news' },
  ]
  const colInstitute = [
    { vi: 'Giới thiệu', en: 'About', href: '/about' },
    { vi: 'Ban lãnh đạo', en: 'Leadership', href: '/about/staff' },
    { vi: 'Cơ cấu tổ chức', en: 'Organization', href: '/about/organization' },
    { vi: 'Tạp chí STNN', en: 'STNN Journal', href: '/journal' },
    { vi: 'Trang trại Bình Dương', en: 'Binh Duong Farm', href: '/farm' },
    { vi: 'Liên hệ', en: 'Contact', href: '/contact' },
  ]

  const linkStyle: React.CSSProperties = { color: 'var(--green-200)', textDecoration: 'none' }

  return (
    <footer style={{ background: 'var(--green-950)', color: 'var(--green-100)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand + contact */}
          <div className="lg:col-span-2">
            <div className="mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-astri-light.svg" alt="Viện ASTRI" style={{ height: 40, width: 'auto' }} />
            </div>
            <p className="text-sm mb-1" style={{ color: 'var(--green-200)' }}>
              {vi ? siteConfig.nameFull : siteConfig.nameEn}
            </p>
            <p className="text-xs mb-4" style={{ color: 'var(--green-300)' }}>
              {vi
                ? 'Trực thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA) · QĐ số 1236/QĐ-LHHVN'
                : 'Under Vietnam Union of Science and Technology Associations (VUSTA)'}
            </p>

            <ul className="flex flex-col gap-2.5 mt-4">
              <li className="flex gap-2.5 items-start">
                <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--green-300)' }} />
                <span className="text-sm" style={{ color: 'var(--green-200)' }}>
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={15} className="shrink-0" style={{ color: 'var(--green-300)' }} />
                <a href={`mailto:${siteConfig.email}`} className="text-sm hover:text-white transition-colors" style={linkStyle}>
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.phone && (
                <li className="flex gap-2.5 items-center">
                  <Phone size={15} className="shrink-0" style={{ color: 'var(--green-300)' }} />
                  <a href={`tel:${siteConfig.phone}`} className="text-sm hover:text-white transition-colors" style={linkStyle}>
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              <li className="flex gap-2.5 items-center">
                <ExternalLink size={15} className="shrink-0" style={{ color: 'var(--green-300)' }} />
                <a
                  href="https://sinhthainongnghiep.net.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                  style={linkStyle}
                >
                  {vi ? 'Tạp chí Sinh thái Nông nghiệp' : 'Agricultural Ecology Journal'}
                </a>
              </li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {vi ? 'Hoạt động' : 'Activities'}
            </h3>
            <ul className="flex flex-col gap-2">
              {colActivities.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm hover:text-white transition-colors" style={linkStyle}>
                    {vi ? l.vi : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institute */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              {vi ? 'Về Viện' : 'Institute'}
            </h3>
            <ul className="flex flex-col gap-2">
              {colInstitute.map((l) => (
                <li key={l.href}>
                  <Link href={`/${locale}${l.href}`} className="text-sm hover:text-white transition-colors" style={linkStyle}>
                    {vi ? l.vi : l.en}
                  </Link>
                </li>
              ))}
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

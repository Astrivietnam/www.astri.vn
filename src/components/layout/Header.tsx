'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'

const NAV_ITEMS = [
  { key: 'about', href: '/about' },
  { key: 'research', href: '/research' },
  { key: 'technology', href: '/technology' },
  { key: 'trade', href: '/trade' },
  { key: 'training', href: '/training' },
  { key: 'farm', href: '/farm' },
  { key: 'oresoi', href: '/oresoi' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
] as const

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const otherLocale = locale === 'vi' ? 'en' : 'vi'
  const localeSwitchHref = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--surface)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 var(--border)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm"
            style={{ background: 'var(--green-800)' }}
          >
            A
          </div>
          <span
            className="font-bold text-base hidden sm:block"
            style={{ color: 'var(--text-1)' }}
          >
            Viện ASTRI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.slice(0, 5).map((item) => {
            const href = `/${locale}${item.href}`
            const active = pathname.startsWith(href)
            return (
              <Link
                key={item.key}
                href={href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                style={{
                  color: active ? 'var(--green-800)' : 'var(--text-2)',
                  background: active ? 'var(--green-50)' : 'transparent',
                }}
              >
                {t(item.key)}
              </Link>
            )
          })}
          <div className="relative group">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
              style={{ color: 'var(--text-2)' }}
            >
              {locale === 'vi' ? 'Thêm' : 'More'} <ChevronDown size={14} />
            </button>
            <div
              className="absolute top-full right-0 mt-1 w-52 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              {NAV_ITEMS.slice(5).map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="block px-4 py-2 text-sm transition-colors"
                  style={{ color: 'var(--text-2)' }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href={localeSwitchHref}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            style={{ color: 'var(--text-2)', border: '1px solid var(--border)' }}
          >
            <Globe size={14} />
            {otherLocale.toUpperCase()}
          </Link>
          <button
            className="lg:hidden p-2 rounded-md"
            style={{ color: 'var(--text-2)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden border-t"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const href = `/${locale}${item.href}`
              const active = pathname.startsWith(href)
              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-md text-sm font-medium"
                  style={{
                    color: active ? 'var(--green-800)' : 'var(--text-2)',
                    background: active ? 'var(--green-50)' : 'transparent',
                  }}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}

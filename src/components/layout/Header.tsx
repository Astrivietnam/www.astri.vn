'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'

type NavChild = { vi: string; en: string; href: string }
type NavItem = {
  vi: string
  en: string
  href: string
  children?: NavChild[]
}

const NAV: NavItem[] = [
  {
    vi: 'Giới thiệu', en: 'About', href: '/about',
    children: [
      { vi: 'Tổng quan về Viện', en: 'Overview', href: '/about' },
      { vi: 'Lãnh đạo & Nhân sự', en: 'Leadership & Staff', href: '/about/staff' },
      { vi: 'Cơ cấu tổ chức', en: 'Organization', href: '/about/organization' },
      { vi: 'Chức năng & Nhiệm vụ', en: 'Functions & Tasks', href: '/about/functions' },
      { vi: 'Cơ sở vật chất', en: 'Facilities', href: '/about/facilities' },
    ],
  },
  {
    vi: 'Nghiên cứu', en: 'Research', href: '/research',
    children: [
      { vi: 'Định hướng nghiên cứu', en: 'Research Directions', href: '/research' },
      { vi: 'Đề tài & Dự án', en: 'Topics & Projects', href: '/research/projects' },
      { vi: 'Kết quả nghiên cứu', en: 'Research Results', href: '/research/results' },
      { vi: 'Công bố khoa học', en: 'Publications', href: '/research/publications' },
    ],
  },
  {
    vi: 'Công nghệ', en: 'Technology', href: '/technology',
    children: [
      { vi: 'Ứng dụng IoT & Blockchain', en: 'IoT & Blockchain', href: '/technology' },
      { vi: 'Chuyển giao công nghệ', en: 'Technology Transfer', href: '/technology/transfer' },
      { vi: 'Tư vấn & Dịch vụ', en: 'Consulting & Services', href: '/technology/services' },
    ],
  },
  {
    vi: 'Đào tạo', en: 'Training', href: '/training',
    children: [
      { vi: 'Chương trình đào tạo', en: 'Programs', href: '/training' },
      { vi: 'Tập huấn kỹ thuật', en: 'Technical Training', href: '/training/technical' },
      { vi: 'Hội thảo & Sự kiện', en: 'Workshops & Events', href: '/training/workshops' },
    ],
  },
  {
    vi: 'Hợp tác', en: 'Cooperation', href: '/cooperation',
    children: [
      { vi: 'Hợp tác quốc tế', en: 'International Cooperation', href: '/cooperation' },
      { vi: 'Đối tác doanh nghiệp', en: 'Business Partners', href: '/cooperation/partners' },
      { vi: 'Xúc tiến thương mại', en: 'Trade Promotion', href: '/trade' },
    ],
  },
  {
    vi: 'Sản phẩm', en: 'Products', href: '/products',
    children: [
      { vi: 'Phân bón hữu cơ vi sinh', en: 'Organic Fertilizers', href: '/products/fertilizer' },
      { vi: 'Trang trại Bình Dương', en: 'Binh Duong Farm', href: '/farm' },
      { vi: 'Tinh dầu Oresoi', en: 'Oresoi Essential Oils', href: '/oresoi' },
    ],
  },
  { vi: 'Tin tức', en: 'News', href: '/news' },
  { vi: 'Liên hệ', en: 'Contact', href: '/contact' },
]

export default function Header({ locale }: { locale: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isVi = locale === 'vi'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  function href(path: string) {
    return `/${locale}${path}`
  }

  function isActive(item: NavItem) {
    const base = `/${locale}${item.href}`
    return pathname === base || pathname.startsWith(base + '/')
  }

  function openDropdown(key: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(key)
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  function keepDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
  }

  const bgStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s, box-shadow 0.2s',
    background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0)',
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
    boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
  }

  const logoColor = scrolled ? '#1A6B2F' : '#1A6B2F'
  const textColor = scrolled ? '#0F1F12' : '#0F1F12'
  const textMuted = scrolled ? '#3A5040' : '#3A5040'

  return (
    <>
      <header style={bgStyle}>
        <div className="max-w-7xl mx-auto px-4" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Logo */}
          <Link href={href('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '8px',
              background: '#1A6B2F', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em',
            }}>A</div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: logoColor, letterSpacing: '-0.01em' }}>
              Viện ASTRI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', flex: 1, justifyContent: 'center' }}
            className="hidden lg:flex">
            {NAV.map(item => {
              const active = isActive(item)
              const open = activeDropdown === item.href
              return (
                <div
                  key={item.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => item.children ? openDropdown(item.href) : undefined}
                  onMouseLeave={() => item.children ? closeDropdown() : undefined}
                >
                  <Link
                    href={href(item.href)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: active ? 700 : 500,
                      color: active ? '#1A6B2F' : textColor,
                      textDecoration: 'none',
                      background: active ? 'rgba(26,107,47,0.07)' : 'transparent',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isVi ? item.vi : item.en}
                    {item.children && <ChevronDown size={12} style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
                  </Link>

                  {item.children && open && (
                    <div
                      onMouseEnter={keepDropdown}
                      onMouseLeave={closeDropdown}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        minWidth: '220px',
                        background: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        border: '1px solid #D4E4D7',
                        overflow: 'hidden',
                        zIndex: 200,
                      }}
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={href(child.href)}
                          style={{
                            display: 'block',
                            padding: '0.55rem 1rem',
                            fontSize: '0.82rem',
                            color: pathname === `/${locale}${child.href}` ? '#1A6B2F' : '#3A5040',
                            fontWeight: pathname === `/${locale}${child.href}` ? 600 : 400,
                            textDecoration: 'none',
                            background: pathname === `/${locale}${child.href}` ? 'rgba(26,107,47,0.06)' : 'transparent',
                            borderBottom: '1px solid #F0F7F1',
                            transition: 'background 0.12s',
                          }}
                          onMouseEnter={e => { if (pathname !== `/${locale}${child.href}`) (e.currentTarget as HTMLElement).style.background = '#F5FAF5' }}
                          onMouseLeave={e => { if (pathname !== `/${locale}${child.href}`) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        >
                          {isVi ? child.vi : child.en}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: language + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, marginLeft: 'auto' }}>
            <Link
              href={locale === 'vi' ? pathname.replace(/^\/vi/, '/en') : pathname.replace(/^\/en/, '/vi')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.3rem 0.6rem',
                borderRadius: '6px',
                fontSize: '0.78rem', fontWeight: 600,
                color: textMuted,
                textDecoration: 'none',
                border: '1px solid #D4E4D7',
              }}
            >
              <Globe size={12} />
              {locale === 'vi' ? 'EN' : 'VI'}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.35rem', borderRadius: '6px',
                color: textColor, display: 'flex',
              }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: '#fff',
            overflowY: 'auto',
            paddingTop: '60px',
          }}
        >
          <div style={{ padding: '1rem' }}>
            {NAV.map(item => (
              <div key={item.href} style={{ borderBottom: '1px solid #EDF5EE' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Link
                    href={href(item.href)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: isActive(item) ? '#1A6B2F' : '#0F1F12',
                      textDecoration: 'none',
                      flex: 1,
                    }}
                  >
                    {isVi ? item.vi : item.en}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setMobileExpanded(v => v === item.href ? null : item.href)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
                        color: '#6B8C72', display: 'flex',
                      }}
                    >
                      <ChevronDown size={16} style={{ transform: mobileExpanded === item.href ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.href && (
                  <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={href(child.href)}
                        style={{
                          display: 'block',
                          padding: '0.5rem 0.5rem',
                          fontSize: '0.875rem',
                          color: '#3A5040',
                          textDecoration: 'none',
                        }}
                      >
                        › {isVi ? child.vi : child.en}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { AdminTokenPayload } from '@/lib/auth'

interface AdminLayoutProps {
  children: React.ReactNode
  locale: string
  user: AdminTokenPayload | null
}

const SIDEBAR_BG = '#0F1A12'
const ACTIVE_BG = '#1A6B2F'
const ACTIVE_TEXT = '#ffffff'
const INACTIVE_TEXT = 'rgba(255,255,255,0.6)'
const HOVER_BG = 'rgba(255,255,255,0.1)'
const MAIN_BG = '#F5F8F5'
const SIDEBAR_WIDTH = 240

type NavItem = {
  label: string
  href: string
  icon: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Tổng quan',
    items: [{ label: 'Dashboard', href: '/admin/dashboard', icon: '⊞' }],
  },
  {
    title: 'Nội dung',
    items: [
      { label: 'Bài viết', href: '/admin/posts', icon: '✎' },
      { label: 'Trang', href: '/admin/pages', icon: '□' },
      { label: 'Chuyên mục', href: '/admin/categories', icon: '⊟' },
      { label: 'Tags', href: '/admin/tags', icon: '#' },
    ],
  },
  {
    title: 'Tài nguyên',
    items: [
      { label: 'Thư viện Media', href: '/admin/media', icon: '⊡' },
      { label: 'Nhân sự', href: '/admin/staff', icon: '◎' },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { label: 'Người dùng', href: '/admin/users', icon: '⊙' },
      { label: 'Cài đặt', href: '/admin/settings', icon: '⚙' },
    ],
  },
]

const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  editor: 'Editor',
  author: 'Author',
}

function NavLink({
  item,
  locale,
  onClick,
}: {
  item: NavItem
  locale: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const fullHref = `/${locale}${item.href}`
  const isActive = pathname === fullHref || pathname.startsWith(fullHref + '/')

  return (
    <Link
      href={fullHref}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: isActive ? '600' : '400',
        color: isActive ? ACTIVE_TEXT : INACTIVE_TEXT,
        background: isActive ? ACTIVE_BG : 'transparent',
        transition: 'background 0.15s, color 0.15s',
        marginBottom: '2px',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          ;(e.currentTarget as HTMLAnchorElement).style.background = HOVER_BG
          ;(e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLAnchorElement).style.color = INACTIVE_TEXT
        }
      }}
    >
      <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>
        {item.icon}
      </span>
      {item.label}
    </Link>
  )
}

export default function AdminLayout({ children, locale, user }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push(`/${locale}/admin/login`)
  }

  const sidebar = (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        background: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        overflowY: 'auto',
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '20px 16px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#1A6B2F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '18px',
            color: '#ffffff',
            flexShrink: 0,
          }}
        >
          A
        </div>
        <span
          style={{
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '15px',
            letterSpacing: '0.5px',
          }}
        >
          ASTRI CMS
        </span>
      </div>

      {/* User info */}
      {user && (
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
            {user.name}
          </div>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(26,107,47,0.5)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '11px',
              fontWeight: '600',
              padding: '2px 8px',
              borderRadius: '999px',
              border: '1px solid rgba(26,107,47,0.8)',
            }}
          >
            {ROLE_LABELS[user.role] ?? user.role}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {NAV_GROUPS.map((group) => (
          <div key={group.title} style={{ marginBottom: '20px' }}>
            <div
              style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                padding: '0 8px',
                marginBottom: '6px',
              }}
            >
              {group.title}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                locale={locale}
                onClick={() => setSidebarOpen(false)}
              />
            ))}
          </div>
        ))}

        {/* Separator */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0 16px' }} />

        {/* View website */}
        <a
          href={`/${locale}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 16px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            color: INACTIVE_TEXT,
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = HOVER_BG
            ;(e.currentTarget as HTMLAnchorElement).style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLAnchorElement).style.color = INACTIVE_TEXT
          }}
        >
          <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>↗</span>
          Xem website
        </a>
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'rgba(255,120,100,0.8)',
            transition: 'background 0.15s, color 0.15s',
            textAlign: 'left',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,80,60,0.12)'
            ;(e.currentTarget as HTMLButtonElement).style.color = '#ff7b6b'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,120,100,0.8)'
          }}
        >
          <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>⏏</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  )

  return (
    <div style={{ minHeight: '100vh', background: MAIN_BG }}>
      {/* Desktop sidebar */}
      <div className="admin-sidebar-desktop">{sidebar}</div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className="admin-sidebar-mobile"
        style={{
          transform: sidebarOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: 'transform 0.25s ease',
        }}
      >
        {sidebar}
      </div>

      {/* Mobile top bar */}
      <div
        className="admin-topbar-mobile"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '52px',
          background: SIDEBAR_BG,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: '12px',
          zIndex: 98,
        }}
      >
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '22px',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '4px',
          }}
        >
          ☰
        </button>
        <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px' }}>ASTRI CMS</span>
      </div>

      {/* Main content */}
      <main
        className="admin-main"
        style={{
          background: MAIN_BG,
          minHeight: '100vh',
        }}
      >
        {children}
      </main>

      <style>{`
        @media (min-width: 768px) {
          .admin-sidebar-desktop { display: block; }
          .admin-sidebar-mobile { display: none !important; }
          .admin-topbar-mobile { display: none !important; }
          .admin-main {
            margin-left: ${SIDEBAR_WIDTH}px;
            padding: 32px;
          }
        }
        @media (max-width: 767px) {
          .admin-sidebar-desktop { display: none; }
          .admin-sidebar-mobile {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: ${SIDEBAR_WIDTH}px;
            z-index: 100;
          }
          .admin-topbar-mobile { display: flex; }
          .admin-main {
            margin-left: 0;
            padding: 16px;
            padding-top: 68px;
          }
        }
      `}</style>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Link2, Printer, Check } from 'lucide-react'

export default function ShareButtons({ locale, title }: { locale: string; title: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handlePrint() {
    window.print()
  }

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    padding: '0.45rem 0.9rem', borderRadius: '8px',
    border: '1px solid var(--border)', background: 'var(--surface)',
    color: 'var(--text-2)', fontSize: '0.82rem', fontWeight: 500,
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
        {locale === 'vi' ? 'Chia sẻ:' : 'Share:'}
      </span>
      <button onClick={handleCopy} style={btnStyle} title={locale === 'vi' ? 'Sao chép liên kết' : 'Copy link'}>
        {copied ? <Check size={13} style={{ color: 'var(--green-700)' }} /> : <Link2 size={13} />}
        {copied
          ? (locale === 'vi' ? 'Đã sao chép' : 'Copied!')
          : (locale === 'vi' ? 'Sao chép link' : 'Copy link')
        }
      </button>
      <button onClick={handlePrint} style={btnStyle} title={locale === 'vi' ? 'In trang' : 'Print'}>
        <Printer size={13} />
        {locale === 'vi' ? 'In' : 'Print'}
      </button>
    </div>
  )
}

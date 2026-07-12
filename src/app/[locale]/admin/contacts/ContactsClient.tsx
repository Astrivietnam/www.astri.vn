'use client'

import { useState } from 'react'
import { Mail, Phone, ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react'

type Contact = {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message?: string
  is_read: boolean
  created_at: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function ContactRow({ contact }: { contact: Contact }) {
  const [open, setOpen] = useState(false)
  const [read, setRead] = useState(contact.is_read)
  const [loading, setLoading] = useState(false)

  async function toggleRead() {
    setLoading(true)
    try {
      await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_read: !read }),
      })
      setRead(r => !r)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '10px',
      border: `1px solid ${read ? '#e5e7eb' : '#bfdbfe'}`,
      overflow: 'hidden',
      boxShadow: read ? 'none' : '0 0 0 3px rgba(59,130,246,0.08)',
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          cursor: 'pointer',
        }}
        onClick={() => setOpen(v => !v)}
      >
        <button
          onClick={e => { e.stopPropagation(); toggleRead() }}
          disabled={loading}
          title={read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: read ? '#9ca3af' : '#3b82f6', flexShrink: 0, display: 'flex' }}
        >
          {read ? <CheckCircle size={18} /> : <Circle size={18} />}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: read ? 500 : 700, fontSize: '14px', color: '#111827' }}>{contact.name}</span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{contact.email}</span>
            {!read && (
              <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px', background: '#dbeafe', color: '#1d4ed8' }}>Mới</span>
            )}
          </div>
          {contact.subject && (
            <div style={{ fontSize: '13px', color: '#374151', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {contact.subject}
            </div>
          )}
        </div>

        <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', flexShrink: 0 }}>{formatDate(contact.created_at)}</span>
        <span style={{ color: '#9ca3af', flexShrink: 0 }}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </div>

      {open && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px', paddingTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151' }}>
              <Mail size={14} style={{ color: '#6b7280' }} /> {contact.email}
            </span>
            {contact.phone && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#374151' }}>
                <Phone size={14} style={{ color: '#6b7280' }} /> {contact.phone}
              </span>
            )}
          </div>
          {contact.message && (
            <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>{contact.message}</p>
          )}
          <div style={{ marginTop: '12px' }}>
            <a
              href={`mailto:${contact.email}?subject=Re: ${contact.subject ?? ''}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '7px',
                background: '#1A6B2F', color: '#fff',
                fontSize: '13px', fontWeight: 600, textDecoration: 'none',
              }}
            >
              <Mail size={13} /> Trả lời email
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ContactsClient({ contacts, locale: _ }: { contacts: Contact[]; locale: string }) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filtered = contacts.filter(c =>
    filter === 'all' ? true : filter === 'unread' ? !c.is_read : c.is_read
  )

  const unreadCount = contacts.filter(c => !c.is_read).length

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {(['all', 'unread', 'read'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px', borderRadius: '7px', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: filter === f ? 700 : 400,
              background: filter === f ? '#111827' : '#f3f4f6',
              color: filter === f ? '#fff' : '#374151',
            }}
          >
            {f === 'all' ? `Tất cả (${contacts.length})` : f === 'unread' ? `Chưa đọc (${unreadCount})` : 'Đã đọc'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af', background: '#fff', borderRadius: '10px' }}>
          Không có liên hệ
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map(c => <ContactRow key={c.id} contact={c} />)}
        </div>
      )}
    </div>
  )
}

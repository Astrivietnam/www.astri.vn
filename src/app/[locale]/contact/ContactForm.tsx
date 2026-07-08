'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm({ locale }: { locale: string }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const t = locale === 'vi' ? {
    name: 'Họ và tên', email: 'Email', subject: 'Chủ đề', message: 'Nội dung',
    send: 'Gửi tin nhắn', sending: 'Đang gửi...', success: 'Đã gửi! Chúng tôi sẽ phản hồi sớm nhất.',
    error: 'Có lỗi xảy ra. Vui lòng thử lại.',
    namePh: 'Nguyễn Văn A', subjectPh: 'Hợp tác nghiên cứu', msgPh: 'Nội dung tin nhắn...',
  } : {
    name: 'Full Name', email: 'Email', subject: 'Subject', message: 'Message',
    send: 'Send Message', sending: 'Sending...', success: 'Sent! We\'ll get back to you soon.',
    error: 'Something went wrong. Please try again.',
    namePh: 'John Smith', subjectPh: 'Research Collaboration', msgPh: 'Your message...',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    const { error } = await supabase.from('contacts').insert([form])
    setStatus(error ? 'error' : 'success')
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl p-10 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--green-600)' }} />
        <p className="font-semibold text-lg" style={{ color: 'var(--text-1)' }}>{t.success}</p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem',
    borderRadius: '8px', border: '1px solid var(--border)',
    background: 'var(--bg)', color: 'var(--text-1)',
    fontSize: '0.9rem', outline: 'none',
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-7 flex flex-col gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>{t.name} *</label>
          <input
            required style={inputStyle} placeholder={t.namePh}
            value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>{t.email} *</label>
          <input
            required type="email" style={inputStyle} placeholder="email@example.com"
            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>{t.subject}</label>
        <input
          style={inputStyle} placeholder={t.subjectPh}
          value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>{t.message} *</label>
        <textarea
          required rows={6} style={{ ...inputStyle, resize: 'vertical' }} placeholder={t.msgPh}
          value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm" style={{ color: '#DC2626' }}>{t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
        style={{
          background: status === 'sending' ? 'var(--green-600)' : 'var(--green-800)',
          color: 'white', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          opacity: status === 'sending' ? 0.7 : 1,
        }}
      >
        <Send size={15} />
        {status === 'sending' ? t.sending : t.send}
      </button>
    </form>
  )
}

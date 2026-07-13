'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  locale: string;
}

export default function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || 'Email hoặc mật khẩu không đúng.');
        return;
      }

      router.push(`/${locale}/admin/dashboard`);
    } catch {
      setError('Không thể kết nối máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-astri.svg" alt="Viện ASTRI" style={{ height: 48, width: 'auto', marginBottom: '0.75rem' }} />
        <div>
          <p
            style={{
              margin: 0,
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#1A6B2F',
              letterSpacing: '0.04em',
            }}
          >
            Viện ASTRI
          </p>
          <p
            style={{
              margin: '0.2rem 0 0',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#6b7280',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            CMS Admin
          </p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div
          role="alert"
          style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            color: '#b91c1c',
            fontSize: '0.875rem',
            padding: '0.65rem 0.9rem',
            marginBottom: '1.25rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Email field */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="email"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.4rem',
          }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@astri.vn"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            border: '1.5px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            color: '#111827',
            background: loading ? '#f9fafb' : '#ffffff',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#1A6B2F')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
        />
      </div>

      {/* Password field */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label
          htmlFor="password"
          style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.4rem',
          }}
        >
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            border: '1.5px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            color: '#111827',
            background: loading ? '#f9fafb' : '#ffffff',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#1A6B2F')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: loading
            ? '#6b9e77'
            : 'linear-gradient(135deg, #1A6B2F, #24963f)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.02em',
          boxShadow: loading ? 'none' : '0 4px 14px rgba(26,107,47,0.4)',
          transition: 'opacity 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
      </button>

      <p
        style={{
          textAlign: 'center',
          marginTop: '1.25rem',
          fontSize: '0.78rem',
          color: '#9ca3af',
        }}
      >
        © {new Date().getFullYear()} Viện ASTRI
      </p>
    </form>
  );
}

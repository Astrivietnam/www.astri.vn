'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Upload, Grid3x3, List, Search, X, Copy, Trash2,
  FileText, Film, File, Check, ChevronLeft, ImageIcon,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MediaFile = {
  id: string
  name: string
  key: string
  url: string
  mime_type: string | null
  size: number | null
  width: number | null
  height: number | null
  alt_vi: string | null
  alt_en: string | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatBytes(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function isImage(mime: string | null) {
  return !!mime?.startsWith('image/')
}

function isVideo(mime: string | null) {
  return !!mime?.startsWith('video/')
}

function isPdf(mime: string | null) {
  return mime === 'application/pdf'
}

function FileIcon({ mime, size = 40 }: { mime: string | null; size?: number }) {
  if (isVideo(mime)) return <Film size={size} style={{ color: 'var(--text-2)' }} />
  if (isPdf(mime)) return <FileText size={size} style={{ color: 'var(--text-2)' }} />
  return <File size={size} style={{ color: 'var(--text-2)' }} />
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const PAGE_SIZE = 30

export default function MediaLibraryClient({
  locale,
  initialFiles,
  initialTotal,
}: {
  locale: string
  initialFiles: Record<string, unknown>[]
  initialTotal: number
}) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles as MediaFile[])
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<MediaFile | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [altText, setAltText] = useState({ vi: '', en: '' })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync alt text when selected changes
  useEffect(() => {
    if (selected) {
      setAltText({ vi: selected.alt_vi ?? '', en: selected.alt_en ?? '' })
    }
    setDeleteConfirm(false)
    setCopied(false)
  }, [selected?.id])

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 350)
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current) }
  }, [searchInput])

  // Reload when search changes
  useEffect(() => {
    loadMedia(1, search, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function loadMedia(pageNum: number, q: string, replace = false) {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(PAGE_SIZE),
        ...(q ? { search: q } : {}),
      })
      const res = await fetch(`/api/admin/media?${params}`)
      const data = await res.json()
      if (data.files) {
        setFiles(prev => replace ? data.files : [...prev, ...data.files])
        setTotal(data.total ?? 0)
        setPage(pageNum)
      }
    } finally {
      setLoading(false)
    }
  }

  function handleLoadMore() {
    loadMedia(page + 1, search)
  }

  // ---------------------------------------------------------------------------
  // Upload
  // ---------------------------------------------------------------------------

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return
    const file = fileList[0]

    const allowed = ['image/', 'video/', 'application/pdf']
    if (!allowed.some(t => file.type.startsWith(t))) {
      setUploadError('Loại file không được hỗ trợ. Chấp nhận: ảnh, video, PDF.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File vượt quá 10 MB.')
      return
    }

    setUploadError(null)
    setUploading(true)
    setUploadProgress(0)

    // Fake progress
    const interval = setInterval(() => {
      setUploadProgress(p => Math.min(p + 12, 85))
    }, 150)

    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd })
      clearInterval(interval)
      setUploadProgress(100)
      const data = await res.json()
      if (!res.ok || !data.success) {
        setUploadError(data.error ?? 'Upload thất bại.')
      } else {
        // Prepend the new file — re-fetch page 1 so we get the full record
        await loadMedia(1, search, true)
      }
    } catch {
      clearInterval(interval)
      setUploadError('Lỗi kết nối khi upload.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [search]) // eslint-disable-line react-hooks/exhaustive-deps

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  async function handleDelete() {
    if (!selected) return
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id }),
    })
    if (res.ok) {
      setFiles(prev => prev.filter(f => f.id !== selected.id))
      setTotal(t => t - 1)
      setSelected(null)
    }
    setDeleteConfirm(false)
  }

  function copyUrl() {
    if (!selected) return
    navigator.clipboard.writeText(selected.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const s = {
    main: {
      flex: 1,
      paddingTop: '4rem',
      background: 'var(--bg)',
      minHeight: '100vh',
    } as React.CSSProperties,
    wrap: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1rem 3rem',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap' as const,
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--text-1)',
      margin: 0,
      flex: 1,
    } as React.CSSProperties,
    bar: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
    },
    searchWrap: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '0.6rem',
      color: 'var(--text-3)',
      pointerEvents: 'none' as const,
    },
    searchInput: {
      padding: '0.45rem 0.75rem 0.45rem 2rem',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      background: 'var(--bg-2)',
      color: 'var(--text-1)',
      fontSize: '0.875rem',
      width: '220px',
      outline: 'none',
    } as React.CSSProperties,
    iconBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      background: 'var(--bg-2)',
      color: 'var(--text-2)',
      cursor: 'pointer',
    } as React.CSSProperties,
    iconBtnActive: {
      background: 'var(--accent, #16a34a)',
      color: '#fff',
      borderColor: 'var(--accent, #16a34a)',
    } as React.CSSProperties,
    uploadBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.45rem 1rem',
      background: 'var(--accent, #16a34a)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '0.875rem',
      cursor: 'pointer',
    } as React.CSSProperties,
    dropzone: {
      border: `2px dashed ${dragging ? 'var(--accent, #16a34a)' : 'var(--border)'}`,
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'center' as const,
      marginBottom: '1.5rem',
      background: dragging ? 'rgba(22,163,74,0.05)' : 'var(--bg-2)',
      transition: 'all 0.2s',
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '0.75rem',
    } as React.CSSProperties,
    cell: (isSelected: boolean) => ({
      position: 'relative' as const,
      borderRadius: '10px',
      overflow: 'hidden',
      border: isSelected ? '2px solid var(--accent, #16a34a)' : '2px solid transparent',
      background: 'var(--bg-2)',
      cursor: 'pointer',
      transition: 'border-color 0.15s, box-shadow 0.15s',
      boxShadow: isSelected ? '0 0 0 3px rgba(22,163,74,0.15)' : 'none',
    }),
    thumb: {
      width: '100%',
      aspectRatio: '1',
      objectFit: 'cover' as const,
      display: 'block',
    },
    cellLabel: {
      padding: '0.4rem 0.5rem',
      fontSize: '0.72rem',
      color: 'var(--text-2)',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    } as React.CSSProperties,
    iconThumb: {
      width: '100%',
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-3, var(--bg-2))',
    } as React.CSSProperties,
    // List view
    listRow: (isSelected: boolean) => ({
      display: 'grid',
      gridTemplateColumns: '48px 1fr auto auto',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.6rem 0.75rem',
      borderRadius: '8px',
      border: isSelected ? '1px solid var(--accent, #16a34a)' : '1px solid transparent',
      background: isSelected ? 'rgba(22,163,74,0.05)' : 'transparent',
      cursor: 'pointer',
      transition: 'background 0.15s',
    }),
    sidebar: {
      position: 'fixed' as const,
      top: 0,
      right: 0,
      bottom: 0,
      width: '320px',
      background: 'var(--bg)',
      borderLeft: '1px solid var(--border)',
      zIndex: 50,
      overflowY: 'auto' as const,
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    detailLabel: {
      fontSize: '0.72rem',
      color: 'var(--text-3)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      marginBottom: '0.2rem',
    },
    detailValue: {
      fontSize: '0.85rem',
      color: 'var(--text-1)',
      wordBreak: 'break-all' as const,
    } as React.CSSProperties,
    btn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: 500,
      cursor: 'pointer',
      border: '1px solid var(--border)',
      background: 'var(--bg-2)',
      color: 'var(--text-1)',
    } as React.CSSProperties,
    btnGreen: {
      background: 'var(--accent, #16a34a)',
      color: '#fff',
      borderColor: 'transparent',
    } as React.CSSProperties,
    btnRed: {
      background: '#dc2626',
      color: '#fff',
      borderColor: 'transparent',
    } as React.CSSProperties,
    altInput: {
      width: '100%',
      padding: '0.45rem 0.6rem',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      background: 'var(--bg-2)',
      color: 'var(--text-1)',
      fontSize: '0.82rem',
    } as React.CSSProperties,
  }

  const hasMore = files.length < total

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      <main style={s.main}>
        <div style={s.wrap}>
          {/* Header */}
          <div style={s.header}>
            <Link
              href={`/${locale}/admin`}
              style={{ display: 'flex', alignItems: 'center', color: 'var(--text-2)', textDecoration: 'none' }}
            >
              <ChevronLeft size={18} />
            </Link>
            <h1 style={s.title}>
              Thư viện Media
              <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--text-3)', marginLeft: '0.75rem' }}>
                {total} file
              </span>
            </h1>
            <div style={s.bar}>
              {/* Search */}
              <div style={s.searchWrap}>
                <Search size={14} style={s.searchIcon} />
                <input
                  style={s.searchInput}
                  placeholder="Tìm theo tên file..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />
              </div>
              {/* View toggle */}
              <button
                style={{ ...s.iconBtn, ...(view === 'grid' ? s.iconBtnActive : {}) }}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                <Grid3x3 size={16} />
              </button>
              <button
                style={{ ...s.iconBtn, ...(view === 'list' ? s.iconBtnActive : {}) }}
                onClick={() => setView('list')}
                title="List view"
              >
                <List size={16} />
              </button>
              {/* Upload button */}
              <button style={s.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                <Upload size={15} /> Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,application/pdf"
                style={{ display: 'none' }}
                onChange={e => handleFiles(e.target.files)}
              />
            </div>
          </div>

          {/* Drop zone */}
          <div
            style={s.dropzone}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <div>
                <p style={{ color: 'var(--text-2)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  Đang tải lên...
                </p>
                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto', background: 'var(--border)', borderRadius: '4px', height: '6px' }}>
                  <div style={{
                    height: '100%',
                    width: `${uploadProgress}%`,
                    background: 'var(--accent, #16a34a)',
                    borderRadius: '4px',
                    transition: 'width 0.2s',
                  }} />
                </div>
              </div>
            ) : (
              <>
                <ImageIcon size={32} style={{ color: 'var(--text-3)', marginBottom: '0.5rem' }} />
                <p style={{ color: 'var(--text-2)', margin: 0, fontSize: '0.9rem' }}>
                  Kéo thả file vào đây hoặc <span style={{ color: 'var(--accent, #16a34a)', fontWeight: 600 }}>chọn file</span>
                </p>
                <p style={{ color: 'var(--text-3)', margin: '0.25rem 0 0', fontSize: '0.78rem' }}>
                  Hỗ trợ: ảnh, video, PDF · Tối đa 10 MB
                </p>
              </>
            )}
          </div>

          {/* Error */}
          {uploadError && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1rem', borderRadius: '8px',
              background: 'rgba(220,38,38,0.1)', color: '#dc2626',
              marginBottom: '1rem', fontSize: '0.875rem',
            }}>
              <X size={15} />
              {uploadError}
              <button
                onClick={() => setUploadError(null)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Content area — shift left when sidebar open */}
          <div style={{ marginRight: selected ? '340px' : 0, transition: 'margin-right 0.2s' }}>
            {/* Grid view */}
            {view === 'grid' && (
              <div style={s.grid}>
                {files.map(f => (
                  <div
                    key={f.id}
                    style={s.cell(selected?.id === f.id)}
                    onClick={() => setSelected(selected?.id === f.id ? null : f)}
                    title={f.name}
                  >
                    {isImage(f.mime_type) ? (
                      <img src={f.url} alt={f.alt_vi ?? f.name} style={s.thumb} loading="lazy" />
                    ) : (
                      <div style={s.iconThumb}>
                        <FileIcon mime={f.mime_type} size={40} />
                      </div>
                    )}
                    <div style={s.cellLabel}>{f.name}</div>
                  </div>
                ))}
              </div>
            )}

            {/* List view */}
            {view === 'list' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {/* Header row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 120px 100px',
                  gap: '0.75rem',
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.72rem',
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  <span />
                  <span>Tên file</span>
                  <span>Loại</span>
                  <span>Kích thước</span>
                </div>
                {files.map(f => (
                  <div
                    key={f.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '48px 1fr 120px 100px',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      border: selected?.id === f.id ? '1px solid var(--accent, #16a34a)' : '1px solid transparent',
                      background: selected?.id === f.id ? 'rgba(22,163,74,0.05)' : 'transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => setSelected(selected?.id === f.id ? null : f)}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                      {isImage(f.mime_type) ? (
                        <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-2)' }}>
                          <FileIcon mime={f.mime_type} size={22} />
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{f.mime_type ?? '—'}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{formatBytes(f.size)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {files.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-3)' }}>
                <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.4 }} />
                <p>{search ? 'Không tìm thấy file phù hợp.' : 'Chưa có file nào. Hãy upload file đầu tiên!'}</p>
              </div>
            )}

            {/* Load more */}
            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  style={{ ...s.btn, margin: '0 auto' }}
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? 'Đang tải...' : `Tải thêm (còn ${total - files.length})`}
                </button>
              </div>
            )}

            {loading && files.length > 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-3)', marginTop: '1rem', fontSize: '0.875rem' }}>
                Đang tải...
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Detail sidebar */}
      {selected && (
        <aside style={s.sidebar}>
          {/* Close */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: '0.95rem' }}>Chi tiết</span>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', padding: '4px' }}
              onClick={() => setSelected(null)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Preview */}
          <div style={{
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'var(--bg-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '160px',
          }}>
            {isImage(selected.mime_type) ? (
              <img
                src={selected.url}
                alt={selected.alt_vi ?? selected.name}
                style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain' }}
              />
            ) : isVideo(selected.mime_type) ? (
              <video src={selected.url} controls style={{ maxWidth: '100%', maxHeight: '220px' }} />
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <FileIcon mime={selected.mime_type} size={56} />
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={s.detailLabel}>Tên file</div>
              <div style={s.detailValue}>{selected.name}</div>
            </div>
            <div>
              <div style={s.detailLabel}>Kích thước</div>
              <div style={s.detailValue}>{formatBytes(selected.size)}</div>
            </div>
            {selected.width && selected.height && (
              <div>
                <div style={s.detailLabel}>Kích thước ảnh</div>
                <div style={s.detailValue}>{selected.width} × {selected.height} px</div>
              </div>
            )}
            <div>
              <div style={s.detailLabel}>Loại</div>
              <div style={s.detailValue}>{selected.mime_type ?? '—'}</div>
            </div>
            <div>
              <div style={s.detailLabel}>Ngày tải lên</div>
              <div style={s.detailValue}>{new Date(selected.created_at).toLocaleDateString('vi-VN')}</div>
            </div>
            <div>
              <div style={s.detailLabel}>URL</div>
              <div style={{ ...s.detailValue, fontSize: '0.75rem', color: 'var(--text-3)' }}>
                {selected.url}
              </div>
            </div>
          </div>

          {/* Alt text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={s.detailLabel}>Alt text (VI)</div>
            <input
              style={s.altInput}
              placeholder="Mô tả ảnh tiếng Việt..."
              value={altText.vi}
              onChange={e => setAltText(a => ({ ...a, vi: e.target.value }))}
            />
            <div style={s.detailLabel}>Alt text (EN)</div>
            <input
              style={s.altInput}
              placeholder="Image description in English..."
              value={altText.en}
              onChange={e => setAltText(a => ({ ...a, en: e.target.value }))}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button style={{ ...s.btn, ...(copied ? s.btnGreen : {}) }} onClick={copyUrl}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Đã sao chép' : 'Sao chép URL'}
            </button>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...s.btn, textDecoration: 'none' }}
            >
              Xem file
            </a>
          </div>

          {/* Delete */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            {!deleteConfirm ? (
              <button
                style={{ ...s.btn, color: '#dc2626', borderColor: '#dc2626', width: '100%', justifyContent: 'center' }}
                onClick={() => setDeleteConfirm(true)}
              >
                <Trash2 size={14} /> Xóa file
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-2)', textAlign: 'center' }}>
                  Xác nhận xóa file này?
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ ...s.btn, flex: 1, justifyContent: 'center' }} onClick={() => setDeleteConfirm(false)}>
                    Hủy
                  </button>
                  <button style={{ ...s.btn, ...s.btnRed, flex: 1, justifyContent: 'center' }} onClick={handleDelete}>
                    Xóa
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  )
}

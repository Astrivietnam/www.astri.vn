'use client'

import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link2, ImageIcon,
  Undo2, Redo2, ChevronDown, ChevronUp, X,
} from 'lucide-react'
import type { Post, Category } from '@/lib/supabase'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PostFormData = {
  slug: string
  category_id: string
  title_vi: string
  title_en: string
  excerpt_vi: string
  excerpt_en: string
  content_vi: string
  content_en: string
  cover_image_url: string
  seo_title: string
  seo_description: string
  og_image_url: string
  is_published: boolean
  is_featured: boolean
  published_at: string | null
  tags_cache: string[]
}

type Props = {
  post?: Post
  locale: string
  categories: Category[]
  onSave: (data: PostFormData) => Promise<void>
  onSaveAsDraft?: (data: PostFormData) => Promise<void>
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--border)',
  background: 'var(--bg)',
  color: 'var(--text-1)',
  fontSize: '0.875rem',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-3)',
  marginBottom: '0.35rem',
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null

  const btn = (active: boolean) => ({
    padding: '0.3rem 0.4rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--green-800)' : 'transparent',
    color: active ? 'white' : 'var(--text-2)',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties)

  function addLink() {
    const url = window.prompt('URL liên kết:')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  function addImage() {
    const url = window.prompt('URL hình ảnh:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2px',
        padding: '0.4rem 0.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        borderRadius: '8px 8px 0 0',
      }}
    >
      <button style={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><Bold size={14} /></button>
      <button style={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><Italic size={14} /></button>
      <div style={{ width: 1, background: 'var(--border)', margin: '2px 3px' }} />
      <button style={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1"><Heading1 size={14} /></button>
      <button style={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2"><Heading2 size={14} /></button>
      <button style={btn(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="H3"><Heading3 size={14} /></button>
      <div style={{ width: 1, background: 'var(--border)', margin: '2px 3px' }} />
      <button style={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list"><List size={14} /></button>
      <button style={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered list"><ListOrdered size={14} /></button>
      <button style={btn(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote"><Quote size={14} /></button>
      <div style={{ width: 1, background: 'var(--border)', margin: '2px 3px' }} />
      <button style={btn(editor.isActive('link'))} onClick={addLink} title="Link"><Link2 size={14} /></button>
      <button style={btn(false)} onClick={addImage} title="Image"><ImageIcon size={14} /></button>
      <div style={{ width: 1, background: 'var(--border)', margin: '2px 3px' }} />
      <button style={btn(false)} onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo2 size={14} /></button>
      <button style={btn(false)} onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo2 size={14} /></button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Rich text editor instance wrapper
// ---------------------------------------------------------------------------

function RichEditor({
  content,
  onChange,
  placeholder,
}: {
  content: string
  onChange: (html: string) => void
  placeholder: string
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: content || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Sync content when it changes externally (e.g. post prop loaded)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <EditorToolbar editor={editor} />
      <EditorContent
        editor={editor}
        style={{ minHeight: '300px', padding: '1rem', background: 'var(--bg)', color: 'var(--text-1)', fontSize: '0.9375rem', lineHeight: 1.7 }}
      />
      <style>{`
        .tiptap { outline: none; }
        .tiptap p { margin: 0.5em 0; }
        .tiptap h1 { font-size: 1.75rem; font-weight: 700; margin: 1em 0 0.5em; }
        .tiptap h2 { font-size: 1.375rem; font-weight: 700; margin: 1em 0 0.5em; }
        .tiptap h3 { font-size: 1.125rem; font-weight: 700; margin: 1em 0 0.5em; }
        .tiptap ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; }
        .tiptap blockquote { border-left: 3px solid var(--green-600, #16a34a); padding-left: 1em; margin: 0.75em 0; color: var(--text-2); font-style: italic; }
        .tiptap a { color: var(--green-700, #15803d); text-decoration: underline; }
        .tiptap img { max-width: 100%; border-radius: 6px; }
        .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: var(--text-3); pointer-events: none; float: left; height: 0; }
        .tiptap code { background: var(--surface-2, #f1f5f9); padding: 0.1em 0.35em; border-radius: 4px; font-size: 0.875em; }
        .tiptap pre { background: var(--surface-2, #f1f5f9); padding: 1em; border-radius: 8px; overflow-x: auto; }
      `}</style>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tags input
// ---------------------------------------------------------------------------

function TagsInput({ tags, onChange }: { tags: string[]; onChange: (t: string[]) => void }) {
  const [input, setInput] = useState('')

  function addTag() {
    const v = input.trim()
    if (v && !tags.includes(v)) onChange([...tags, v])
    setInput('')
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.4rem' }}>
        {tags.map(t => (
          <span
            key={t}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              background: 'var(--green-50)', color: 'var(--green-700)',
              padding: '0.2rem 0.5rem', borderRadius: '999px', fontSize: '0.775rem', fontWeight: 500,
            }}
          >
            {t}
            <button
              onClick={() => onChange(tags.filter(x => x !== t))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit', display: 'flex' }}
            >
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
          placeholder="Nhập tag, Enter để thêm"
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          onClick={addTag}
          style={{
            padding: '0.5rem 0.75rem', borderRadius: '8px', border: 'none',
            background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', fontSize: '0.8rem',
          }}
        >
          Thêm
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function PostEditor({ post, locale, categories, onSave, onSaveAsDraft }: Props) {
  const [saving, setSaving] = useState(false)
  const [savingDraft, setSavingDraft] = useState(false)
  const [error, setError] = useState('')
  const [seoOpen, setSeoOpen] = useState(false)

  // Tab states
  const [contentTab, setContentTab] = useState<'vi' | 'en'>('vi')
  const [excerptTab, setExcerptTab] = useState<'vi' | 'en'>('vi')

  const [form, setForm] = useState<PostFormData>({
    slug: post?.slug ?? '',
    category_id: post?.category_id ?? '',
    title_vi: post?.title_vi ?? '',
    title_en: post?.title_en ?? '',
    excerpt_vi: post?.excerpt_vi ?? '',
    excerpt_en: post?.excerpt_en ?? '',
    content_vi: post?.content_vi ?? '',
    content_en: post?.content_en ?? '',
    cover_image_url: post?.cover_image_url ?? '',
    seo_title: post?.seo_title ?? '',
    seo_description: post?.seo_description ?? '',
    og_image_url: post?.og_image_url ?? '',
    is_published: post?.is_published ?? false,
    is_featured: post?.is_featured ?? false,
    published_at: post?.published_at ?? null,
    tags_cache: post?.tags_cache ?? [],
  })

  const set = useCallback(<K extends keyof PostFormData>(key: K, value: PostFormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  async function handleSave(asDraft = false) {
    setError('')
    if (!form.title_vi.trim()) { setError('Tiêu đề tiếng Việt là bắt buộc'); return }

    const data: PostFormData = {
      ...form,
      is_published: asDraft ? false : form.is_published,
      published_at: (!asDraft && form.is_published && !form.published_at)
        ? new Date().toISOString()
        : form.published_at,
    }

    try {
      if (asDraft && onSaveAsDraft) {
        setSavingDraft(true)
        await onSaveAsDraft(data)
      } else {
        setSaving(true)
        await onSave(data)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi không xác định')
    } finally {
      setSaving(false)
      setSavingDraft(false)
    }
  }

  // Shared tab button style
  function tabBtn(active: boolean): React.CSSProperties {
    return {
      padding: '0.3rem 0.75rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 600,
      background: active ? 'var(--green-800)' : 'transparent',
      color: active ? 'white' : 'var(--text-3)',
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      {/* ------------------------------------------------------------------ */}
      {/* LEFT COLUMN                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        {/* Titles */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label style={labelStyle}>Tiêu đề (Tiếng Việt) *</label>
            <input
              style={{ ...inputStyle, fontSize: '1rem', fontWeight: 600 }}
              value={form.title_vi}
              onChange={e => set('title_vi', e.target.value)}
              placeholder="Nhập tiêu đề bằng tiếng Việt..."
            />
          </div>
          <div>
            <label style={labelStyle}>Title (English)</label>
            <input
              style={{ ...inputStyle, fontSize: '1rem', fontWeight: 600 }}
              value={form.title_en}
              onChange={e => set('title_en', e.target.value)}
              placeholder="Enter title in English..."
            />
          </div>
          <div>
            <label style={labelStyle}>Slug (URL)</label>
            <input
              style={inputStyle}
              value={form.slug}
              onChange={e => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
              placeholder="ten-bai-viet"
            />
          </div>
        </section>

        {/* Content editor */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-1)' }}>Nội dung</span>
            <div style={{ display: 'flex', gap: '2px', background: 'var(--surface-2)', borderRadius: '7px', padding: '2px' }}>
              <button style={tabBtn(contentTab === 'vi')} onClick={() => setContentTab('vi')}>VI</button>
              <button style={tabBtn(contentTab === 'en')} onClick={() => setContentTab('en')}>EN</button>
            </div>
          </div>
          {contentTab === 'vi' ? (
            <RichEditor
              key="content-vi"
              content={form.content_vi}
              onChange={v => set('content_vi', v)}
              placeholder="Nhập nội dung bài viết bằng tiếng Việt..."
            />
          ) : (
            <RichEditor
              key="content-en"
              content={form.content_en}
              onChange={v => set('content_en', v)}
              placeholder="Enter article content in English..."
            />
          )}
        </section>

        {/* Excerpt */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-1)' }}>Tóm tắt</span>
            <div style={{ display: 'flex', gap: '2px', background: 'var(--surface-2)', borderRadius: '7px', padding: '2px' }}>
              <button style={tabBtn(excerptTab === 'vi')} onClick={() => setExcerptTab('vi')}>VI</button>
              <button style={tabBtn(excerptTab === 'en')} onClick={() => setExcerptTab('en')}>EN</button>
            </div>
          </div>
          {excerptTab === 'vi' ? (
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
              value={form.excerpt_vi}
              onChange={e => set('excerpt_vi', e.target.value)}
              placeholder="Tóm tắt ngắn gọn về bài viết (tiếng Việt)..."
            />
          ) : (
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' }}
              value={form.excerpt_en}
              onChange={e => set('excerpt_en', e.target.value)}
              placeholder="Short summary of the article (English)..."
            />
          )}
        </section>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RIGHT SIDEBAR                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Publish actions */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
              padding: '0.6rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '0.75rem',
            }}>
              {error}
            </div>
          )}

          {/* Status */}
          <div style={{ marginBottom: '0.9rem' }}>
            <label style={labelStyle}>Trạng thái</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { label: 'Đã xuất bản', value: true },
                { label: 'Bản nháp', value: false },
              ].map(opt => (
                <button
                  key={String(opt.value)}
                  onClick={() => set('is_published', opt.value)}
                  style={{
                    flex: 1, padding: '0.4rem', borderRadius: '7px',
                    border: `1px solid ${form.is_published === opt.value ? (opt.value ? '#15803d' : '#ca8a04') : 'var(--border)'}`,
                    background: form.is_published === opt.value ? (opt.value ? '#dcfce7' : '#fef9c3') : 'var(--bg)',
                    color: form.is_published === opt.value ? (opt.value ? '#15803d' : '#854d0e') : 'var(--text-2)',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={e => set('is_featured', e.target.checked)}
            />
            <span style={{ fontSize: '0.875rem', color: 'var(--text-2)' }}>Bài viết nổi bật</span>
          </label>

          {/* Published at */}
          {form.is_published && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Ngày xuất bản</label>
              <input
                type="datetime-local"
                style={inputStyle}
                value={form.published_at ? form.published_at.slice(0, 16) : ''}
                onChange={e => set('published_at', e.target.value ? new Date(e.target.value).toISOString() : null)}
              />
            </div>
          )}

          {/* Save buttons */}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            style={{
              width: '100%', padding: '0.65rem', borderRadius: '9px', border: 'none',
              background: 'var(--green-800)', color: 'white', fontWeight: 700,
              fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1, marginBottom: '0.5rem',
            }}
          >
            {saving ? 'Đang lưu...' : (form.is_published ? 'Xuất bản' : 'Lưu')}
          </button>

          {onSaveAsDraft && (
            <button
              onClick={() => handleSave(true)}
              disabled={savingDraft}
              style={{
                width: '100%', padding: '0.55rem', borderRadius: '9px',
                border: '1px solid var(--border)', background: 'var(--bg)',
                color: 'var(--text-2)', fontWeight: 600, fontSize: '0.85rem',
                cursor: savingDraft ? 'not-allowed' : 'pointer', opacity: savingDraft ? 0.7 : 1,
              }}
            >
              {savingDraft ? 'Đang lưu...' : 'Lưu nháp'}
            </button>
          )}
        </section>

        {/* Category */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <label style={labelStyle}>Chuyên mục</label>
          <select
            style={inputStyle}
            value={form.category_id}
            onChange={e => set('category_id', e.target.value)}
          >
            <option value="">-- Chọn chuyên mục --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name_vi}</option>
            ))}
          </select>
        </section>

        {/* Cover image */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <label style={labelStyle}>Ảnh bìa (URL)</label>
          <input
            style={inputStyle}
            value={form.cover_image_url}
            onChange={e => set('cover_image_url', e.target.value)}
            placeholder="https://..."
          />
          {form.cover_image_url && (
            <img
              src={form.cover_image_url}
              alt="Preview"
              style={{ width: '100%', marginTop: '0.6rem', borderRadius: '8px', objectFit: 'cover', maxHeight: '140px' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          )}
        </section>

        {/* Tags */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}
        >
          <label style={labelStyle}>Tags</label>
          <TagsInput tags={form.tags_cache} onChange={v => set('tags_cache', v)} />
        </section>

        {/* SEO — expandable */}
        <section
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem', background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-3)' }}>
              SEO & Open Graph
            </span>
            {seoOpen ? <ChevronUp size={14} color="var(--text-3)" /> : <ChevronDown size={14} color="var(--text-3)" />}
          </button>

          {seoOpen && (
            <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={labelStyle}>SEO Title</label>
                <input
                  style={inputStyle}
                  value={form.seo_title}
                  onChange={e => set('seo_title', e.target.value)}
                  placeholder="Tiêu đề cho công cụ tìm kiếm..."
                />
              </div>
              <div>
                <label style={labelStyle}>SEO Description</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
                  value={form.seo_description}
                  onChange={e => set('seo_description', e.target.value)}
                  placeholder="Mô tả ngắn cho công cụ tìm kiếm..."
                />
              </div>
              <div>
                <label style={labelStyle}>OG Image URL</label>
                <input
                  style={inputStyle}
                  value={form.og_image_url}
                  onChange={e => set('og_image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase, type Post } from '@/lib/supabase'
import { ArrowLeft, Calendar, Tag, Leaf, Eye, User, Home, ChevronRight, Printer, Link2 } from 'lucide-react'
import ShareButtons from './ShareButtons'

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      categories ( slug, name_vi, name_en )
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (data) {
    // Increment view count (fire-and-forget; ignore errors)
    void supabase
      .from('posts')
      .update({ view_count: ((data.view_count as number | null) ?? 0) + 1 })
      .eq('id', data.id)
  }

  return data as Post | null
}

async function getRelated(post: Post): Promise<Post[]> {
  // Try by category_id first, fall back to text category column
  const categoryId = (post as Post & { category_id?: string | null }).category_id
  const textCategory = post.category

  let query = supabase
    .from('posts')
    .select('id, slug, title_vi, title_en, cover_image_url, published_at, category, excerpt_vi, excerpt_en, is_published, is_featured, content_vi, content_en, created_at, author')
    .eq('is_published', true)
    .neq('id', post.id)
    .limit(3)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  } else if (textCategory) {
    query = query.eq('category', textCategory)
  }

  const { data } = await query
  return (data ?? []) as Post[]
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelated(post)

  const title = locale === 'vi' ? post.title_vi : (post.title_en ?? post.title_vi)
  const content = locale === 'vi' ? post.content_vi : (post.content_en ?? post.content_vi)

  // Category label
  const catData = (post as Post & { categories?: { name_vi: string; name_en: string; slug: string } | null }).categories
  const catLabel = catData
    ? (locale === 'vi' ? catData.name_vi : (catData.name_en || catData.name_vi))
    : (post.category ?? '')
  const catSlug = catData?.slug ?? post.category ?? ''

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        locale === 'vi' ? 'vi-VN' : 'en-US',
        { day: '2-digit', month: 'long', year: 'numeric' }
      )
    : ''

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>

        {/* Breadcrumb */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }} aria-label="Breadcrumb">
              <Link
                href={`/${locale}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-3)', fontSize: '0.8rem', textDecoration: 'none' }}
              >
                <Home size={12} />
                {locale === 'vi' ? 'Trang chủ' : 'Home'}
              </Link>
              <ChevronRight size={11} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
              <Link
                href={`/${locale}/news`}
                style={{ color: 'var(--text-3)', fontSize: '0.8rem', textDecoration: 'none' }}
              >
                {locale === 'vi' ? 'Tin tức' : 'News'}
              </Link>
              <ChevronRight size={11} style={{ color: 'var(--text-4)', flexShrink: 0 }} />
              <span
                style={{ color: 'var(--text-2)', fontSize: '0.8rem', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                title={title}
              >
                {title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article header */}
        <div style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">
            {/* Category + date row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {catLabel && (
                <Link
                  href={`/${locale}/news?category=${catSlug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    fontSize: '0.78rem', fontWeight: 700,
                    padding: '0.25rem 0.75rem', borderRadius: '999px',
                    background: 'var(--green-50)', color: 'var(--green-700)',
                    textDecoration: 'none',
                  }}
                >
                  <Tag size={10} />
                  {catLabel}
                </Link>
              )}
              {formattedDate && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-3)' }}>
                  <Calendar size={12} />
                  {formattedDate}
                </span>
              )}
              {post.view_count != null && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-3)' }}>
                  <Eye size={12} />
                  {post.view_count.toLocaleString()} {locale === 'vi' ? 'lượt xem' : 'views'}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="text-2xl sm:text-3xl font-bold leading-tight"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '1rem' }}
            >
              {title}
            </h1>

            {/* Author */}
            {post.author && (
              <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                <User size={13} />
                {locale === 'vi' ? 'Tác giả:' : 'By'} <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{post.author}</span>
              </p>
            )}
          </div>
        </div>

        {/* Cover image - full width max-4xl */}
        {post.cover_image_url && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6" style={{ marginTop: '-1px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={title}
              className="w-full rounded-b-xl object-cover"
              style={{ maxHeight: '520px', display: 'block' }}
            />
          </div>
        )}

        {/* Main layout: article + sidebar */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 py-10"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'start' }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .article-grid { grid-template-columns: minmax(0, 1fr) 320px !important; }
            }
          `}</style>
          <div className="article-grid" style={{ display: 'grid', gap: '2.5rem', alignItems: 'start' }}>

            {/* Article content */}
            <div>
              <article>
                {content ? (
                  <div
                    className="prose prose-lg"
                    style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <div
                    className="rounded-xl p-10 text-center"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  >
                    <Leaf size={32} className="mx-auto mb-3" style={{ color: 'var(--green-300)' }} />
                    <p style={{ color: 'var(--text-3)' }}>
                      {locale === 'vi' ? 'Nội dung đang được cập nhật.' : 'Content coming soon.'}
                    </p>
                  </div>
                )}
              </article>

              {/* Share + back buttons */}
              <div
                style={{
                  marginTop: '2.5rem', paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem',
                }}
              >
                <Link
                  href={`/${locale}/news`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.5rem 1rem', borderRadius: '8px',
                    border: '1px solid var(--border)', background: 'var(--surface)',
                    color: 'var(--text-2)', fontSize: '0.85rem', fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  <ArrowLeft size={14} />
                  {locale === 'vi' ? 'Quay lại tin tức' : 'Back to news'}
                </Link>

                <ShareButtons locale={locale} title={title} />
              </div>
            </div>

            {/* Sidebar */}
            {related.length > 0 && (
              <aside>
                <div
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '1.25rem', position: 'sticky', top: '5.5rem',
                  }}
                >
                  <h2
                    style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}
                  >
                    {locale === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {related.map((r) => {
                      const rTitle = locale === 'vi' ? r.title_vi : (r.title_en ?? r.title_vi)
                      const rExcerpt = locale === 'vi' ? r.excerpt_vi : (r.excerpt_en ?? r.excerpt_vi)
                      const rDate = r.published_at
                        ? new Date(r.published_at).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
                        : ''
                      return (
                        <Link
                          key={r.id}
                          href={`/${locale}/news/${r.slug}`}
                          style={{ display: 'flex', gap: '0.75rem', textDecoration: 'none', alignItems: 'flex-start' }}
                          className="group"
                        >
                          <div
                            style={{
                              width: '72px', height: '54px', borderRadius: '7px',
                              overflow: 'hidden', flexShrink: 0,
                              background: 'var(--green-50)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            {r.cover_image_url
                              // eslint-disable-next-line @next/next/no-img-element
                              ? <img src={r.cover_image_url} alt={rTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              : <Leaf size={18} style={{ color: 'var(--green-200)' }} />
                            }
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              className="line-clamp-2"
                              style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.4, marginBottom: '0.25rem' }}
                            >
                              {rTitle}
                            </p>
                            {rExcerpt && (
                              <p className="line-clamp-1" style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{rExcerpt}</p>
                            )}
                            {rDate && (
                              <p style={{ fontSize: '0.72rem', color: 'var(--text-4)', marginTop: '0.2rem' }}>{rDate}</p>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase, type Post } from '@/lib/supabase'
import { ArrowLeft, Calendar, Tag, Leaf } from 'lucide-react'

const CATEGORY_LABELS: Record<string, { vi: string; en: string }> = {
  research:   { vi: 'Nghiên cứu',       en: 'Research' },
  technology: { vi: 'Công nghệ',         en: 'Technology' },
  trade:      { vi: 'Hợp tác quốc tế',  en: 'International' },
  training:   { vi: 'Đào tạo',           en: 'Training' },
  farm:       { vi: 'Trang trại',        en: 'Farm' },
  product:    { vi: 'Sản phẩm',          en: 'Product' },
  news:       { vi: 'Sự kiện',           en: 'Events' },
}

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

async function getRelated(category: string, excludeId: string): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('id, slug, title_vi, title_en, cover_image_url, published_at, category, excerpt_vi, excerpt_en, author, is_published, is_featured, content_vi, content_en, created_at')
    .eq('is_published', true)
    .eq('category', category)
    .neq('id', excludeId)
    .limit(3)
  return data ?? []
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = await getRelated(post.category, post.id)
  const title   = locale === 'vi' ? post.title_vi   : (post.title_en   ?? post.title_vi)
  const content = locale === 'vi' ? post.content_vi : (post.content_en ?? post.content_vi)
  const catLabel = CATEGORY_LABELS[post.category]?.[locale as 'vi' | 'en'] ?? post.category

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
        {/* Hero */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <Link
              href={`/${locale}/news`}
              className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
              style={{ color: 'var(--text-3)' }}
            >
              <ArrowLeft size={14} />
              {locale === 'vi' ? 'Tất cả tin tức' : 'All news'}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                <Tag size={10} className="inline mr-1" />{catLabel}
              </span>
              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
                <Calendar size={11} />{formattedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-3)' }}>
              {locale === 'vi' ? 'Tác giả:' : 'By'} {post.author}
            </p>
          </div>
        </div>

        {/* Cover image */}
        {post.cover_image_url && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={title}
              className="w-full rounded-xl object-cover"
              style={{ maxHeight: '480px' }}
            />
          </div>
        )}

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          {content ? (
            <div
              className="prose"
              style={{ color: 'var(--text-2)', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
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

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-10 px-4" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-1)' }}>
                {locale === 'vi' ? 'Bài viết liên quan' : 'Related Articles'}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => {
                  const rTitle = locale === 'vi' ? r.title_vi : (r.title_en ?? r.title_vi)
                  return (
                    <Link
                      key={r.id}
                      href={`/${locale}/news/${r.slug}`}
                      className="rounded-lg overflow-hidden block transition-all hover:-translate-y-0.5"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <div className="aspect-video flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                        {r.cover_image_url
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={r.cover_image_url} alt={rTitle} className="w-full h-full object-cover" />
                          : <Leaf size={24} style={{ color: 'var(--green-200)' }} />
                        }
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-semibold line-clamp-3" style={{ color: 'var(--text-1)' }}>{rTitle}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  )
}

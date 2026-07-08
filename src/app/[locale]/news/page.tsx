import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase, type Post } from '@/lib/supabase'
import { Leaf, ArrowRight } from 'lucide-react'

const CATEGORIES = ['research', 'technology', 'trade', 'training', 'farm', 'product', 'news'] as const
const CATEGORY_LABELS: Record<string, { vi: string; en: string }> = {
  research:   { vi: 'Nghiên cứu',       en: 'Research' },
  technology: { vi: 'Công nghệ',         en: 'Technology' },
  trade:      { vi: 'Hợp tác quốc tế',  en: 'International' },
  training:   { vi: 'Đào tạo',           en: 'Training' },
  farm:       { vi: 'Trang trại',        en: 'Farm' },
  product:    { vi: 'Sản phẩm',          en: 'Product' },
  news:       { vi: 'Sự kiện',           en: 'Events' },
}

function formatDate(iso: string | null, locale: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return locale === 'vi'
    ? d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function getPosts(category?: string): Promise<Post[]> {
  let query = supabase
    .from('posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (category && CATEGORIES.includes(category as typeof CATEGORIES[number])) {
    query = query.eq('category', category)
  }
  const { data } = await query
  return data ?? []
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ cat?: string }>
}) {
  const { locale } = await params
  const { cat } = await searchParams
  const posts = await getPosts(cat)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        {/* Page header */}
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {locale === 'vi' ? 'Tin tức & Sự kiện' : 'News & Events'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {locale === 'vi' ? 'Hoạt động của Viện ASTRI' : 'ASTRI Activities'}
            </h1>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            <Link
              href={`/${locale}/news`}
              className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: !cat ? 'var(--green-800)' : 'var(--surface-2)',
                color: !cat ? 'white' : 'var(--text-2)',
              }}
            >
              {locale === 'vi' ? 'Tất cả' : 'All'}
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/${locale}/news?cat=${c}`}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: cat === c ? 'var(--green-800)' : 'var(--surface-2)',
                  color: cat === c ? 'white' : 'var(--text-2)',
                }}
              >
                {CATEGORY_LABELS[c][locale as 'vi' | 'en']}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        <section className="py-12 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20" style={{ color: 'var(--text-3)' }}>
                {locale === 'vi' ? 'Chưa có bài viết nào.' : 'No posts yet.'}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const title   = locale === 'vi' ? post.title_vi   : (post.title_en   ?? post.title_vi)
                  const excerpt = locale === 'vi' ? post.excerpt_vi : (post.excerpt_en ?? post.excerpt_vi)
                  const catLabel = CATEGORY_LABELS[post.category]?.[locale as 'vi' | 'en'] ?? post.category
                  return (
                    <Link
                      key={post.id}
                      href={`/${locale}/news/${post.slug}`}
                      className="group rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                    >
                      <div className="aspect-video flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                        {post.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={post.cover_image_url} alt={title} className="w-full h-full object-cover" />
                        ) : (
                          <Leaf size={36} style={{ color: 'var(--green-200)' }} />
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                            {catLabel}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                            {formatDate(post.published_at, locale)}
                          </span>
                        </div>
                        <h2 className="font-semibold text-base leading-snug mb-2 flex-1 line-clamp-3" style={{ color: 'var(--text-1)' }}>
                          {title}
                        </h2>
                        {excerpt && (
                          <p className="text-sm line-clamp-2 mt-1" style={{ color: 'var(--text-3)' }}>{excerpt}</p>
                        )}
                        <div className="flex items-center gap-1 text-xs font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--green-700)' }}>
                          {locale === 'vi' ? 'Đọc tiếp' : 'Read more'} <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

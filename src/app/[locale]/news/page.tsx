import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase, type Post, type Category } from '@/lib/supabase'
import { Leaf, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react'

const PAGE_SIZE = 12

const CATEGORY_GRADIENTS: Record<string, string> = {
  research:   'linear-gradient(135deg, #0D4A1F 0%, #1A6B2F 100%)',
  technology: 'linear-gradient(135deg, #0D2B4A 0%, #1A4A7A 100%)',
  trade:      'linear-gradient(135deg, #3D2A0D 0%, #6B4A1A 100%)',
  training:   'linear-gradient(135deg, #1A2B4A 0%, #2A4A6B 100%)',
  farm:       'linear-gradient(135deg, #2A3D0D 0%, #4A6B1A 100%)',
  oresoi:     'linear-gradient(135deg, #2D0D4A 0%, #4A1A6B 100%)',
  product:    'linear-gradient(135deg, #1A3D2A 0%, #2A6B4A 100%)',
  news:       'linear-gradient(135deg, #0D2A1A 0%, #1A4A2A 100%)',
}

function categoryGradient(cat: string): string {
  return CATEGORY_GRADIENTS[cat] ?? 'linear-gradient(135deg, #0D3320 0%, #1A6B2F 100%)'
}

function formatDate(iso: string | null, locale: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return locale === 'vi'
    ? d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name_vi, name_en, sort_order, post_type')
      .order('sort_order', { ascending: true })
    if (error) return []
    return (data ?? []) as Category[]
  } catch {
    return []
  }
}

async function getPosts(options: {
  category?: string
  search?: string
  page: number
}): Promise<{ posts: Post[]; total: number }> {
  const { category, search, page } = options
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('posts')
    .select(
      `id, slug, title_vi, title_en, excerpt_vi, excerpt_en,
       cover_image_url, published_at, created_at,
       category`,
      { count: 'exact' }
    )
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(from, to)

  if (category) {
    // Match either the old text category column or via category slug join
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(`title_vi.ilike.%${search}%,title_en.ilike.%${search}%,excerpt_vi.ilike.%${search}%`)
  }

  const { data, count } = await query
  return { posts: (data ?? []) as unknown as Post[], total: count ?? 0 }
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; q?: string; page?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  const activeCategory = sp.category ?? ''
  const searchQuery = sp.q ?? ''
  const currentPage = Math.max(1, parseInt(sp.page ?? '1', 10))

  const [categories, { posts, total }] = await Promise.all([
    getCategories(),
    getPosts({ category: activeCategory || undefined, search: searchQuery || undefined, page: currentPage }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  function buildHref(overrides: { category?: string; q?: string; page?: number }) {
    const p = new URLSearchParams()
    const cat = overrides.category !== undefined ? overrides.category : activeCategory
    const q = overrides.q !== undefined ? overrides.q : searchQuery
    const pg = overrides.page ?? 1
    if (cat) p.set('category', cat)
    if (q) p.set('q', q)
    if (pg > 1) p.set('page', String(pg))
    const qs = p.toString()
    return `/${locale}/news${qs ? `?${qs}` : ''}`
  }

  function catLabel(cat: Category) {
    return locale === 'vi' ? cat.name_vi : (cat.name_en || cat.name_vi)
  }

  // Build page range for pagination (max 7 buttons)
  function pageRange(): number[] {
    const delta = 2
    const range: number[] = []
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      range.push(i)
    }
    return range
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>

        {/* Page hero */}
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

        {/* Filter bar */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: '4rem', zIndex: 10 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '0.375rem', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
              <Link
                href={buildHref({ category: '', page: 1 })}
                className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: !activeCategory ? 'var(--green-800)' : 'var(--surface-2)',
                  color: !activeCategory ? 'white' : 'var(--text-2)',
                }}
              >
                {locale === 'vi' ? 'Tất cả' : 'All'}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={buildHref({ category: cat.slug, page: 1 })}
                  className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                  style={{
                    background: activeCategory === cat.slug ? 'var(--green-800)' : 'var(--surface-2)',
                    color: activeCategory === cat.slug ? 'white' : 'var(--text-2)',
                  }}
                >
                  {catLabel(cat)}
                </Link>
              ))}
            </div>

            {/* Search box */}
            <form
              method="get"
              action={`/${locale}/news`}
              style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder={locale === 'vi' ? 'Tìm kiếm...' : 'Search...'}
                  style={{
                    paddingLeft: '2rem', paddingRight: '0.75rem', paddingTop: '0.4rem', paddingBottom: '0.4rem',
                    border: '1px solid var(--border)', borderRadius: '8px',
                    background: 'var(--bg)', color: 'var(--text-1)',
                    fontSize: '0.85rem', width: '180px',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: '0.4rem 0.9rem', borderRadius: '8px',
                  background: 'var(--green-800)', color: 'white',
                  border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                }}
              >
                {locale === 'vi' ? 'Tìm' : 'Go'}
              </button>
            </form>
          </div>
        </div>

        {/* Posts grid */}
        <section className="py-10 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">

            {/* Result count */}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginBottom: '1.25rem' }}>
              {searchQuery
                ? (locale === 'vi' ? `Kết quả tìm kiếm cho "${searchQuery}": ` : `Results for "${searchQuery}": `) + `${total} ${locale === 'vi' ? 'bài viết' : 'posts'}`
                : `${total} ${locale === 'vi' ? 'bài viết' : 'posts'}`
              }
            </p>

            {posts.length === 0 ? (
              <div
                className="text-center py-20 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
              >
                <Leaf size={40} className="mx-auto mb-3" style={{ opacity: 0.4 }} />
                <p>{locale === 'vi' ? 'Chưa có bài viết nào.' : 'No posts found.'}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                  const title = locale === 'vi' ? post.title_vi : (post.title_en ?? post.title_vi)
                  const excerpt = locale === 'vi' ? post.excerpt_vi : (post.excerpt_en ?? post.excerpt_vi)
                  const CAT_LABELS: Record<string, { vi: string; en: string }> = {
                    research:   { vi: 'Nghiên cứu', en: 'Research' },
                    technology: { vi: 'Công nghệ', en: 'Technology' },
                    trade:      { vi: 'Hợp tác quốc tế', en: 'International' },
                    training:   { vi: 'Đào tạo', en: 'Training' },
                    farm:       { vi: 'Trang trại', en: 'Farm' },
                    product:    { vi: 'Sản phẩm', en: 'Product' },
                    news:       { vi: 'Sự kiện', en: 'Events' },
                  }
                  const catDisplayLabel = CAT_LABELS[post.category]?.[locale as 'vi' | 'en'] ?? post.category ?? ''

                  return (
                    <Link
                      key={post.id}
                      href={`/${locale}/news/${post.slug}`}
                      className="group rounded-xl overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', textDecoration: 'none' }}
                    >
                      {/* Cover image */}
                      <div
                        className="aspect-video flex items-center justify-center overflow-hidden"
                        style={{ background: categoryGradient(post.category), flexShrink: 0 }}
                      >
                        {post.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.cover_image_url}
                            alt={title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            style={{ transitionDuration: '400ms' }}
                          />
                        ) : (
                          <Leaf size={36} style={{ color: 'rgba(141,198,63,0.5)' }} />
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {catDisplayLabel && (
                            <span
                              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                              style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}
                            >
                              {catDisplayLabel}
                            </span>
                          )}
                          <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                            {formatDate(post.published_at, locale)}
                          </span>
                        </div>

                        <h2
                          className="font-semibold text-base leading-snug mb-2 flex-1 line-clamp-3"
                          style={{ color: 'var(--text-1)' }}
                        >
                          {title}
                        </h2>

                        {excerpt && (
                          <p className="text-sm line-clamp-2 mt-1" style={{ color: 'var(--text-3)' }}>
                            {excerpt}
                          </p>
                        )}

                        <div
                          className="flex items-center gap-1 text-xs font-semibold mt-4 transition-opacity opacity-0 group-hover:opacity-100"
                          style={{ color: 'var(--green-700)' }}
                        >
                          {locale === 'vi' ? 'Đọc thêm' : 'Read more'} <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginTop: '3rem' }}
                aria-label="Pagination"
              >
                {/* Prev */}
                {currentPage > 1 ? (
                  <Link
                    href={buildHref({ page: currentPage - 1 })}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.45rem 0.75rem', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      color: 'var(--text-2)', fontSize: '0.85rem', textDecoration: 'none',
                    }}
                  >
                    <ChevronLeft size={14} />
                    {locale === 'vi' ? 'Trước' : 'Prev'}
                  </Link>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.45rem 0.75rem', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      color: 'var(--text-4)', fontSize: '0.85rem', opacity: 0.4,
                    }}
                  >
                    <ChevronLeft size={14} />
                    {locale === 'vi' ? 'Trước' : 'Prev'}
                  </span>
                )}

                {/* First page if far */}
                {pageRange()[0] > 1 && (
                  <>
                    <Link
                      href={buildHref({ page: 1 })}
                      style={{
                        padding: '0.45rem 0.7rem', borderRadius: '8px',
                        border: '1px solid var(--border)', background: 'var(--surface)',
                        color: 'var(--text-2)', fontSize: '0.85rem', textDecoration: 'none', minWidth: '2.2rem', textAlign: 'center',
                      }}
                    >
                      1
                    </Link>
                    {pageRange()[0] > 2 && <span style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>…</span>}
                  </>
                )}

                {pageRange().map((p) => (
                  <Link
                    key={p}
                    href={buildHref({ page: p })}
                    style={{
                      padding: '0.45rem 0.7rem', borderRadius: '8px',
                      border: '1px solid var(--border)',
                      background: p === currentPage ? 'var(--green-800)' : 'var(--surface)',
                      color: p === currentPage ? 'white' : 'var(--text-2)',
                      fontSize: '0.85rem', fontWeight: p === currentPage ? 700 : 400,
                      textDecoration: 'none', minWidth: '2.2rem', textAlign: 'center',
                    }}
                  >
                    {p}
                  </Link>
                ))}

                {/* Last page if far */}
                {pageRange()[pageRange().length - 1] < totalPages && (
                  <>
                    {pageRange()[pageRange().length - 1] < totalPages - 1 && (
                      <span style={{ color: 'var(--text-3)', fontSize: '0.85rem' }}>…</span>
                    )}
                    <Link
                      href={buildHref({ page: totalPages })}
                      style={{
                        padding: '0.45rem 0.7rem', borderRadius: '8px',
                        border: '1px solid var(--border)', background: 'var(--surface)',
                        color: 'var(--text-2)', fontSize: '0.85rem', textDecoration: 'none', minWidth: '2.2rem', textAlign: 'center',
                      }}
                    >
                      {totalPages}
                    </Link>
                  </>
                )}

                {/* Next */}
                {currentPage < totalPages ? (
                  <Link
                    href={buildHref({ page: currentPage + 1 })}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.45rem 0.75rem', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      color: 'var(--text-2)', fontSize: '0.85rem', textDecoration: 'none',
                    }}
                  >
                    {locale === 'vi' ? 'Sau' : 'Next'}
                    <ChevronRight size={14} />
                  </Link>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      padding: '0.45rem 0.75rem', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'var(--surface)',
                      color: 'var(--text-4)', fontSize: '0.85rem', opacity: 0.4,
                    }}
                  >
                    {locale === 'vi' ? 'Sau' : 'Next'}
                    <ChevronRight size={14} />
                  </span>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

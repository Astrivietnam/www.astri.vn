import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight, FlaskConical, Cpu, Handshake, GraduationCap, Leaf } from 'lucide-react'
import { supabase, type Post } from '@/lib/supabase'

async function getFeaturedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, category, title_vi, title_en, excerpt_vi, excerpt_en, cover_image_url, published_at, author, is_featured, is_published, content_vi, content_en, created_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)
  if (error || !data) return []
  return data
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = await getFeaturedPosts()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <HomeContent locale={locale} posts={posts} />
      <Footer locale={locale} />
    </div>
  )
}

const CATEGORY_LABELS: Record<string, { vi: string; en: string }> = {
  research:   { vi: 'Nghiên cứu',        en: 'Research' },
  technology: { vi: 'Công nghệ',          en: 'Technology' },
  trade:      { vi: 'Hợp tác quốc tế',   en: 'International' },
  training:   { vi: 'Đào tạo',            en: 'Training' },
  farm:       { vi: 'Trang trại',         en: 'Farm' },
  product:    { vi: 'Sản phẩm',           en: 'Product' },
  news:       { vi: 'Sự kiện',            en: 'Events' },
}

function formatDate(iso: string | null, locale: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return locale === 'vi'
    ? d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function HomeContent({ locale, posts }: { locale: string; posts: Post[] }) {
  const t = useTranslations('home')

  const stats = [
    { value: '50+', labelKey: 'research' },
    { value: '30+', labelKey: 'partners' },
    { value: '5', labelKey: 'patents' },
    { value: '15', labelKey: 'provinces' },
  ] as const

  const areas = [
    { key: 'research', href: '/research', Icon: FlaskConical, color: '#2A9445' },
    { key: 'technology', href: '/technology', Icon: Cpu, color: '#1A6B2F' },
    { key: 'trade', href: '/trade', Icon: Handshake, color: '#8DC63F' },
    { key: 'training', href: '/training', Icon: GraduationCap, color: '#2D6A40' },
  ] as const

  return (
    <main style={{ flex: 1 }}>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-screen px-4"
        style={{
          background: 'linear-gradient(160deg, var(--green-950) 0%, var(--green-800) 60%, var(--green-600) 100%)',
          paddingTop: '5rem',
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, var(--green-300) 0%, transparent 50%), radial-gradient(circle at 75% 20%, var(--green-200) 0%, transparent 40%)`,
          }}
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'rgba(141,198,63,0.15)',
              color: 'var(--green-200)',
              border: '1px solid rgba(141,198,63,0.3)',
            }}
          >
            <Leaf size={14} />
            {t('hero.badge')}
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#FFFFFF', letterSpacing: '-0.03em', textWrap: 'balance' }}
          >
            {t('hero.title')}
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}
          >
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${locale}/research`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: '#FFFFFF', color: 'var(--green-800)' }}
            >
              {t('hero.cta_primary')} <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="absolute bottom-0 inset-x-0"
          style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.labelKey} className="px-6 py-5 text-center">
                  <div className="text-2xl font-bold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--green-200)' }}>
                    {t(`stats.${s.labelKey}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-20 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--green-600)' }}
            >
              {t('about_section.eyebrow')}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-5"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {t('about_section.title')}
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
              {t('about_section.body')}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: 'var(--green-700)' }}
            >
              {locale === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'} <ArrowRight size={14} />
            </Link>
          </div>
          {/* Visual block */}
          <div
            className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 100%)' }}
          >
            <div className="text-center px-8">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-3xl"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                A
              </div>
              <p className="text-white font-semibold text-lg">Agricultural Support</p>
              <p className="text-white font-semibold text-lg">Technology Research Institute</p>
              <p className="text-sm mt-2" style={{ color: 'var(--green-200)' }}>astri.vn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity areas */}
      <section className="py-20 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: 'var(--green-600)' }}
            >
              {t('areas.eyebrow')}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {t('areas.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map(({ key, href, Icon, color }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="group block rounded-xl p-6 transition-all"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${color}20`, color }}
                >
                  <Icon size={20} />
                </div>
                <h3
                  className="font-semibold text-base mb-2"
                  style={{ color: 'var(--text-1)' }}
                >
                  {t(`areas.${key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                  {t(`areas.${key}.desc`)}
                </p>
                <div
                  className="flex items-center gap-1 text-xs font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color }}
                >
                  {locale === 'vi' ? 'Xem thêm' : 'Learn more'} <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News section placeholder */}
      <section className="py-20 px-4" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--green-600)' }}
              >
                {t('news_section.eyebrow')}
              </p>
              <h2
                className="text-3xl font-bold"
                style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
              >
                {t('news_section.title')}
              </h2>
            </div>
            <Link
              href={`/${locale}/news`}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: 'var(--green-700)' }}
            >
              {t('news_section.view_all')} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.length > 0 ? posts.map((post) => {
              const title   = locale === 'vi' ? post.title_vi   : (post.title_en   ?? post.title_vi)
              const catLabel = (CATEGORY_LABELS[post.category]?.[locale as 'vi' | 'en']) ?? post.category
              return (
                <Link
                  key={post.id}
                  href={`/${locale}/news/${post.slug}`}
                  className="group rounded-xl overflow-hidden block transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ background: 'var(--green-50)' }}
                  >
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={post.cover_image_url} alt={title} className="w-full h-full object-cover" />
                    ) : (
                      <Leaf size={32} style={{ color: 'var(--green-300)' }} />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}
                      >
                        {catLabel}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                        {formatDate(post.published_at, locale)}
                      </span>
                    </div>
                    <h3
                      className="font-semibold text-sm leading-snug line-clamp-3"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {title}
                    </h3>
                  </div>
                </Link>
              )
            }) : (
              /* Skeleton placeholders khi chưa có data */
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="aspect-video flex items-center justify-center"
                    style={{ background: 'var(--green-50)' }}
                  >
                    <Leaf size={32} style={{ color: 'var(--green-200)' }} />
                  </div>
                  <div className="p-5">
                    <div className="h-3 w-20 rounded mb-3" style={{ background: 'var(--border)' }} />
                    <div className="h-4 w-full rounded mb-2" style={{ background: 'var(--border)' }} />
                    <div className="h-4 w-3/4 rounded" style={{ background: 'var(--border)' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        className="py-20 px-4"
        style={{
          background: 'linear-gradient(135deg, var(--green-800) 0%, var(--green-950) 100%)',
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            {t('contact_cta.title')}
          </h2>
          <p className="text-base mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {t('contact_cta.body')}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all"
            style={{ background: '#FFFFFF', color: 'var(--green-800)' }}
          >
            {t('contact_cta.cta')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}

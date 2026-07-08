import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ArrowRight,
  FlaskConical,
  Cpu,
  Leaf,
  CheckCircle2,
  Beaker,
  Sprout,
  Wifi,
  Droplets,
  MapPin,
  BookOpen,
  Users,
  CalendarDays,
} from 'lucide-react'
import { supabase, type Post } from '@/lib/supabase'

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getFeaturedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, slug, category, title_vi, title_en, excerpt_vi, excerpt_en, cover_image_url, published_at, author, is_featured, is_published, content_vi, content_en, created_at'
    )
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)
  if (error || !data) return []
  return data
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const posts = await getFeaturedPosts()
  const vi = locale === 'vi'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1 }}>

        {/* ================================================================
            1. HERO SECTION
        ================================================================ */}
        <section
          style={{
            position: 'relative',
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '6rem 1rem 8rem',
            background: 'linear-gradient(160deg, #0D3320 0%, #1A6B2F 55%, #205F30 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Decorative radial glows */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: [
                'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(141,198,63,0.12) 0%, transparent 60%)',
                'radial-gradient(ellipse 50% 40% at 80% 70%, rgba(45,106,64,0.25) 0%, transparent 55%)',
              ].join(','),
              pointerEvents: 'none',
            }}
          />
          {/* Subtle dot pattern */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'rgba(141,198,63,0.15)',
                color: '#B8E07A',
                border: '1px solid rgba(141,198,63,0.3)',
                marginBottom: '1.75rem',
              }}
            >
              <Leaf size={13} />
              {vi
                ? 'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp'
                : 'Agricultural Support & Technology Research Institute'}
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                marginBottom: '1.5rem',
              }}
            >
              {vi ? (
                <>
                  Nghiên cứu&nbsp;·&nbsp;Ứng dụng&nbsp;·&nbsp;
                  <span style={{ color: '#8DC63F' }}>Chuyển giao</span>{' '}
                  Công nghệ Nông nghiệp
                </>
              ) : (
                <>
                  Research&nbsp;·&nbsp;Application&nbsp;·&nbsp;
                  <span style={{ color: '#8DC63F' }}>Transfer</span> of
                  Agricultural Technologies
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: '620px',
                margin: '0 auto 2.5rem',
              }}
            >
              {vi
                ? 'ASTRI kết nối khoa học với thực tiễn nông nghiệp — nghiên cứu bài bản, ứng dụng hiệu quả và chuyển giao công nghệ phù hợp với điều kiện Việt Nam.'
                : 'ASTRI bridges science with agricultural practice — rigorous research, effective application, and technology transfer adapted to Vietnamese conditions.'}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: 'center',
              }}
            >
              <Link
                href={`/${locale}/about`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8125rem 1.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  background: '#8DC63F',
                  color: '#0D2B16',
                  transition: 'filter 0.15s',
                }}
              >
                {vi ? 'Về chúng tôi' : 'About ASTRI'} <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8125rem 1.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.28)',
                  transition: 'background 0.15s',
                }}
              >
                {vi ? 'Liên hệ hợp tác' : 'Partner with us'}
              </Link>
            </div>
          </div>

          {/* Stat counters bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0,0,0,0.30)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                maxWidth: '80rem',
                margin: '0 auto',
                padding: '0 1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
              }}
            >
              {[
                { value: '5+', label: vi ? 'Năm hoạt động' : 'Years active' },
                { value: '20+', label: vi ? 'Đề tài nghiên cứu' : 'Research topics' },
                { value: '3', label: vi ? 'Trang trại thực nghiệm' : 'Pilot farms' },
                { value: '50+', label: vi ? 'Đối tác chiến lược' : 'Strategic partners' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem 0.5rem',
                    textAlign: 'center',
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : undefined,
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 800,
                      color: '#8DC63F',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      color: 'rgba(255,255,255,0.65)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            2. FEATURED NEWS
        ================================================================ */}
        <section style={{ padding: '5rem 1rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--green-600)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {vi ? 'Tin tức & sự kiện' : 'News & Events'}
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 800,
                    color: 'var(--text-1)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {vi ? 'Tin tức mới nhất' : 'Latest News'}
                </h2>
              </div>
              <Link
                href={`/${locale}/news`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--green-700)',
                  whiteSpace: 'nowrap',
                }}
              >
                {vi ? 'Xem thêm tin tức' : 'All news'} <ArrowRight size={14} />
              </Link>
            </div>

            {/* Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: '1.25rem',
              }}
            >
              {posts.length > 0
                ? posts.map((post, index) => {
                    const title =
                      locale === 'vi' ? post.title_vi : (post.title_en ?? post.title_vi)
                    const excerpt =
                      locale === 'vi'
                        ? post.excerpt_vi
                        : (post.excerpt_en ?? post.excerpt_vi)
                    const catLabel =
                      (CATEGORY_LABELS[post.category]?.[locale as 'vi' | 'en']) ??
                      post.category
                    const isFeatured = index === 0

                    return (
                      <Link
                        key={post.id}
                        href={`/${locale}/news/${post.slug}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '1rem',
                          overflow: 'hidden',
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          transition: 'box-shadow 0.2s, transform 0.2s',
                          gridColumn: isFeatured ? 'span 1' : undefined,
                        }}
                      >
                        {/* Cover */}
                        <div
                          style={{
                            aspectRatio: '16/9',
                            background:
                              'linear-gradient(135deg, var(--green-900) 0%, var(--green-800) 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {post.cover_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.cover_image_url}
                              alt={title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Leaf size={36} style={{ color: 'rgba(141,198,63,0.5)' }} />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.625rem',
                              marginBottom: '0.75rem',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                                padding: '0.2rem 0.625rem',
                                borderRadius: '9999px',
                                background: 'var(--green-50)',
                                color: 'var(--green-700)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {catLabel}
                            </span>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                              }}
                            >
                              <CalendarDays size={11} />
                              {formatDate(post.published_at, locale)}
                            </span>
                          </div>

                          <h3
                            style={{
                              fontSize: '1rem',
                              fontWeight: 700,
                              color: 'var(--text-1)',
                              lineHeight: 1.45,
                              marginBottom: '0.5rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {title}
                          </h3>

                          {excerpt && (
                            <p
                              style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-2)',
                                lineHeight: 1.6,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                flex: 1,
                              }}
                            >
                              {excerpt}
                            </p>
                          )}

                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.8125rem',
                              fontWeight: 600,
                              color: 'var(--green-700)',
                              marginTop: '1rem',
                            }}
                          >
                            {vi ? 'Đọc thêm' : 'Read more'} <ArrowRight size={13} />
                          </div>
                        </div>
                      </Link>
                    )
                  })
                : /* Skeleton placeholders */
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <div
                        style={{
                          aspectRatio: '16/9',
                          background: 'var(--surface-2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Leaf size={32} style={{ color: 'var(--border)' }} />
                      </div>
                      <div style={{ padding: '1.25rem' }}>
                        <div
                          style={{
                            height: '0.75rem',
                            width: '5rem',
                            borderRadius: '4px',
                            background: 'var(--border)',
                            marginBottom: '0.75rem',
                          }}
                        />
                        <div
                          style={{
                            height: '1rem',
                            borderRadius: '4px',
                            background: 'var(--border)',
                            marginBottom: '0.5rem',
                          }}
                        />
                        <div
                          style={{
                            height: '1rem',
                            width: '75%',
                            borderRadius: '4px',
                            background: 'var(--border)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            3. RESEARCH AREAS
        ================================================================ */}
        <section style={{ padding: '5rem 1rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--green-600)',
                  marginBottom: '0.625rem',
                }}
              >
                {vi ? 'Lĩnh vực nghiên cứu' : 'Research Areas'}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--text-1)',
                  letterSpacing: '-0.03em',
                  marginBottom: '0.875rem',
                }}
              >
                {vi ? 'Các lĩnh vực trọng tâm' : 'Core Research Focus'}
              </h2>
              <p
                style={{
                  maxWidth: '540px',
                  margin: '0 auto',
                  fontSize: '1rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.7,
                }}
              >
                {vi
                  ? 'ASTRI tập trung nghiên cứu và ứng dụng công nghệ tiên tiến vào bốn lĩnh vực nông nghiệp chiến lược.'
                  : 'ASTRI focuses on researching and applying advanced technology across four strategic agricultural domains.'}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
                gap: '1.25rem',
              }}
            >
              {[
                {
                  Icon: Beaker,
                  href: '/research',
                  accentColor: '#1A6B2F',
                  title: vi ? 'Công nghệ sinh học' : 'Biotechnology',
                  desc: vi
                    ? 'Nghiên cứu vi sinh vật có lợi, chế phẩm sinh học và cải tiến giống cây trồng thích nghi với điều kiện địa phương.'
                    : 'Research on beneficial microorganisms, biological preparations, and crop variety improvement adapted to local conditions.',
                },
                {
                  Icon: Sprout,
                  href: '/research',
                  accentColor: '#2A9445',
                  title: vi ? 'Phân bón hữu cơ' : 'Organic Fertilizers',
                  desc: vi
                    ? 'Phát triển các dòng phân bón hữu cơ vi sinh từ nguyên liệu nông nghiệp địa phương, giảm thiểu tác động môi trường.'
                    : 'Developing microbial organic fertilizer lines from local agricultural materials, minimising environmental impact.',
                },
                {
                  Icon: Wifi,
                  href: '/technology',
                  accentColor: '#1F7D37',
                  title: vi ? 'IoT Nông nghiệp' : 'Agricultural IoT',
                  desc: vi
                    ? 'Hệ thống cảm biến, giám sát thông minh và tự động hoá quá trình canh tác, tối ưu sử dụng tài nguyên.'
                    : 'Sensor systems, smart monitoring, and farming automation to optimise resource use.',
                },
                {
                  Icon: Droplets,
                  href: '/oresoi',
                  accentColor: '#3AAD57',
                  title: vi ? 'Tinh dầu Oresoi' : 'Oresoi Essential Oils',
                  desc: vi
                    ? 'Nghiên cứu chiết xuất, tiêu chuẩn hoá và thương mại hoá tinh dầu từ cây dược liệu bản địa vùng Tây Nguyên.'
                    : 'Research into extraction, standardisation, and commercialisation of essential oils from indigenous highland medicinal plants.',
                },
              ].map(({ Icon, href, accentColor, title, desc }) => (
                <Link
                  key={title}
                  href={`/${locale}${href}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.75rem',
                    borderRadius: '1rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
                    textDecoration: 'none',
                  }}
                >
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      background: `${accentColor}18`,
                      color: accentColor,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: 'var(--text-1)',
                      marginBottom: '0.625rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {desc}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: accentColor,
                      marginTop: '1.25rem',
                    }}
                  >
                    {vi ? 'Tìm hiểu thêm' : 'Learn more'} <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            4. KEY STATISTICS BANNER
        ================================================================ */}
        <section
          style={{
            padding: '4rem 1rem',
            background: 'linear-gradient(135deg, #0D3320 0%, #1A6B2F 60%, #143D20 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(141,198,63,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              maxWidth: '80rem',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#8DC63F',
                  marginBottom: '0.625rem',
                }}
              >
                {vi ? 'Con số nổi bật' : 'Key Metrics'}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                }}
              >
                {vi ? 'ASTRI trong những con số' : 'ASTRI by the numbers'}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '2px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '1rem',
                overflow: 'hidden',
              }}
            >
              {[
                {
                  Icon: CalendarDays,
                  value: '2020',
                  label: vi ? 'Năm thành lập' : 'Founded',
                },
                {
                  Icon: MapPin,
                  value: '3',
                  label: vi ? 'Tỉnh thành hoạt động' : 'Provinces',
                },
                {
                  Icon: BookOpen,
                  value: '20+',
                  label: vi ? 'Đề tài nghiên cứu' : 'Research Topics',
                },
                {
                  Icon: Users,
                  value: '50+',
                  label: vi ? 'Đối tác hợp tác' : 'Partners',
                },
              ].map(({ Icon, value, label }, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2.5rem 1.5rem',
                    textAlign: 'center',
                    background: 'rgba(13,51,32,0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '0.875rem',
                      background: 'rgba(141,198,63,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8DC63F',
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.65)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            5. ABOUT PREVIEW
        ================================================================ */}
        <section style={{ padding: '5rem 1rem', background: 'var(--surface)' }}>
          <div
            style={{
              maxWidth: '80rem',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--green-600)',
                  marginBottom: '0.75rem',
                }}
              >
                {vi ? 'Về ASTRI' : 'About ASTRI'}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--text-1)',
                  letterSpacing: '-0.03em',
                  marginBottom: '1.25rem',
                  lineHeight: 1.2,
                }}
              >
                {vi
                  ? 'Sứ mệnh phát triển nông nghiệp bền vững Việt Nam'
                  : 'A mission for sustainable Vietnamese agriculture'}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                }}
              >
                {vi
                  ? 'Viện ASTRI được thành lập với sứ mệnh ứng dụng khoa học công nghệ tiên tiến vào sản xuất nông nghiệp, góp phần nâng cao giá trị nông sản và thu nhập cho nông dân Việt Nam.'
                  : 'ASTRI was established with the mission to apply advanced science and technology to agricultural production, raising the value of agricultural products and incomes for Vietnamese farmers.'}
              </p>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.75,
                  marginBottom: '2rem',
                }}
              >
                {vi
                  ? 'Với tầm nhìn trở thành trung tâm nghiên cứu nông nghiệp uy tín hàng đầu khu vực, ASTRI liên tục mở rộng hợp tác trong và ngoài nước, đưa các thành tựu nghiên cứu vào thực tiễn sản xuất.'
                  : 'With a vision of becoming a leading regional agricultural research centre, ASTRI continuously expands domestic and international partnerships, turning research achievements into production realities.'}
              </p>

              <Link
                href={`/${locale}/about`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  background: 'var(--green-800)',
                  color: '#FFFFFF',
                  transition: 'opacity 0.15s',
                }}
              >
                {vi ? 'Xem giới thiệu đầy đủ' : 'Full introduction'} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Activities checklist */}
            <div
              style={{
                padding: '2.25rem',
                borderRadius: '1.25rem',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--text-1)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {vi ? 'Hoạt động trọng tâm' : 'Key activities'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                {[
                  {
                    title: vi ? 'Nghiên cứu khoa học ứng dụng' : 'Applied scientific research',
                    desc: vi
                      ? 'Thực hiện các đề tài nghiên cứu cấp tỉnh và quốc gia trong lĩnh vực nông nghiệp.'
                      : 'Conducting provincial and national research projects in the agricultural sector.',
                  },
                  {
                    title: vi ? 'Chuyển giao & thương mại hoá' : 'Technology transfer & commercialisation',
                    desc: vi
                      ? 'Đưa kết quả nghiên cứu vào sản xuất thực tế thông qua mô hình trình diễn và đối tác doanh nghiệp.'
                      : 'Bringing research results into actual production through demonstration models and enterprise partnerships.',
                  },
                  {
                    title: vi ? 'Đào tạo & phát triển nhân lực' : 'Training & human resource development',
                    desc: vi
                      ? 'Tổ chức các khoá đào tạo chuyên sâu cho kỹ thuật viên và nông dân trên địa bàn.'
                      : 'Organising specialised training courses for technicians and farmers in the region.',
                  },
                  {
                    title: vi ? 'Hợp tác quốc tế' : 'International cooperation',
                    desc: vi
                      ? 'Kết nối với các tổ chức nghiên cứu quốc tế nhằm cập nhật và ứng dụng công nghệ mới nhất.'
                      : 'Connecting with international research organisations to access and apply the latest technologies.',
                  },
                ].map(({ title, desc }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem' }}>
                    <CheckCircle2
                      size={20}
                      strokeWidth={2}
                      style={{
                        color: 'var(--green-600)',
                        flexShrink: 0,
                        marginTop: '0.125rem',
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: 'var(--text-1)',
                          lineHeight: 1.4,
                          marginBottom: '0.25rem',
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--text-3)',
                          lineHeight: 1.6,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            6. COOPERATION / EVENTS STRIP
        ================================================================ */}
        <section style={{ padding: '5rem 1rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--green-600)',
                  marginBottom: '0.625rem',
                }}
              >
                {vi ? 'Hợp tác & kết nối' : 'Cooperation & Partnerships'}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 800,
                  color: 'var(--text-1)',
                  letterSpacing: '-0.03em',
                }}
              >
                {vi ? 'Cùng nhau phát triển' : 'Growing together'}
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.25rem',
              }}
            >
              {[
                {
                  Icon: FlaskConical,
                  title: vi ? 'Đề tài nghiên cứu cấp tỉnh' : 'Provincial research projects',
                  desc: vi
                    ? 'Chủ trì và tham gia các đề tài nghiên cứu cấp tỉnh, đóng góp vào chính sách phát triển nông nghiệp địa phương.'
                    : 'Leading and participating in provincial research projects, contributing to local agricultural development policy.',
                  link: `/${locale}/research`,
                  linkLabel: vi ? 'Xem nghiên cứu' : 'View research',
                },
                {
                  Icon: Users,
                  title: vi ? 'Hợp tác doanh nghiệp' : 'Enterprise partnerships',
                  desc: vi
                    ? 'Liên kết với doanh nghiệp để thương mại hoá sản phẩm nghiên cứu và mở rộng quy mô ứng dụng công nghệ.'
                    : 'Partnering with enterprises to commercialise research products and scale technology applications.',
                  link: `/${locale}/trade`,
                  linkLabel: vi ? 'Xem hợp tác' : 'View partnerships',
                },
                {
                  Icon: Cpu,
                  title: vi ? 'Hỗ trợ kỹ thuật' : 'Technical support',
                  desc: vi
                    ? 'Cung cấp dịch vụ tư vấn kỹ thuật, đào tạo nhân lực và chuyển giao quy trình sản xuất tiên tiến cho nông dân.'
                    : 'Providing technical consultation, workforce training, and advanced production process transfer to farmers.',
                  link: `/${locale}/training`,
                  linkLabel: vi ? 'Xem đào tạo' : 'View training',
                },
              ].map(({ Icon, title, desc, link, linkLabel }) => (
                <div
                  key={title}
                  style={{
                    padding: '2rem',
                    borderRadius: '1rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      width: '2.75rem',
                      height: '2.75rem',
                      borderRadius: '0.75rem',
                      background: 'var(--green-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--green-700)',
                      marginBottom: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: 'var(--text-1)',
                      letterSpacing: '-0.01em',
                      marginBottom: '0.625rem',
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-2)',
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {desc}
                  </p>
                  <Link
                    href={link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--green-700)',
                      marginTop: '1.25rem',
                    }}
                  >
                    {linkLabel} <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            CLOSING CTA
        ================================================================ */}
        <section
          style={{
            padding: '5rem 1rem',
            background:
              'linear-gradient(135deg, #0D3320 0%, #1A6B2F 60%, #143D20 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(141,198,63,0.1) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              maxWidth: '36rem',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}
            >
              {vi
                ? 'Cùng ASTRI kiến tạo nông nghiệp tương lai'
                : 'Build the future of agriculture with ASTRI'}
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75,
                marginBottom: '2.25rem',
              }}
            >
              {vi
                ? 'Liên hệ với chúng tôi để khám phá cơ hội hợp tác nghiên cứu, chuyển giao công nghệ hoặc đào tạo nhân lực nông nghiệp.'
                : 'Contact us to explore opportunities for research collaboration, technology transfer, or agricultural training.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <Link
                href={`/${locale}/contact`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  background: '#8DC63F',
                  color: '#0D2B16',
                  transition: 'filter 0.15s',
                }}
              >
                {vi ? 'Liên hệ ngay' : 'Get in touch'} <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/research`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  transition: 'background 0.15s',
                }}
              >
                {vi ? 'Khám phá nghiên cứu' : 'Explore research'}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </div>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ArrowRight, Sprout, Flower2, Leaf } from 'lucide-react'
import Link from 'next/link'

type ProductCategory = {
  icon: React.ElementType
  href: string
  labelBadge: { vi: string; en: string }
  title: { vi: string; en: string }
  desc: { vi: string; en: string }
  features: { vi: string[]; en: string[] }
  cta: { vi: string; en: string }
  gradient: string
}

const CATEGORIES: ProductCategory[] = [
  {
    icon: Sprout,
    href: 'farm',
    labelBadge: { vi: 'Trang trại', en: 'Farm' },
    title: { vi: 'Trang trại Bình Dương', en: 'Binh Duong Farm' },
    desc: {
      vi: 'Mô hình trang trại ứng dụng công nghệ cao kết hợp canh tác hữu cơ và năng lượng tái tạo, sản xuất nông sản sạch tiêu chuẩn cao.',
      en: "ASTRI's high-tech model farm combining organic farming and renewable energy to produce high-standard clean produce.",
    },
    features: {
      vi: ['Nông sản hữu cơ được chứng nhận', 'Rau củ quả theo mùa', 'Sản phẩm chế biến từ trang trại'],
      en: ['Certified organic produce', 'Seasonal fruits & vegetables', 'Farm-processed products'],
    },
    cta: { vi: 'Khám phá trang trại', en: 'Explore the Farm' },
    gradient: 'linear-gradient(135deg, #0a2e1a 0%, #145a2e 100%)',
  },
  {
    icon: Flower2,
    href: 'oresoi',
    labelBadge: { vi: 'Tinh dầu hữu cơ', en: 'Organic Essential Oils' },
    title: { vi: 'Oresoi', en: 'Oresoi' },
    desc: {
      vi: 'Dòng tinh dầu hữu cơ thuần khiết từ thảo mộc bản địa Việt Nam, chiết xuất bằng phương pháp chưng cất hơi nước truyền thống.',
      en: 'Pure organic essential oils from indigenous Vietnamese herbs, extracted using traditional steam distillation.',
    },
    features: {
      vi: ['Tinh dầu sả, bạch đàn, oải hương', 'Chứng nhận hữu cơ', 'Không phụ gia, không hóa chất'],
      en: ['Lemongrass, eucalyptus, lavender oils', 'Organic certified', 'No additives, no chemicals'],
    },
    cta: { vi: 'Khám phá Oresoi', en: 'Explore Oresoi' },
    gradient: 'linear-gradient(135deg, #1a1030 0%, #3d1f6b 100%)',
  },
  {
    icon: Leaf,
    href: 'research#fertilizer',
    labelBadge: { vi: 'Phân bón', en: 'Fertilizer' },
    title: { vi: 'Phân bón hữu cơ vi sinh', en: 'Organic Microbial Fertilizer' },
    desc: {
      vi: 'Dòng phân bón hữu cơ vi sinh chất lượng cao được nghiên cứu và sản xuất bởi Viện ASTRI, giúp cải tạo đất và tăng năng suất cây trồng bền vững.',
      en: 'High-quality organic microbial fertilizers researched and produced by ASTRI, improving soil health and sustainably boosting crop yields.',
    },
    features: {
      vi: ['Phân bón vi sinh đa chức năng', 'Cải tạo và phục hồi đất', 'Phù hợp tiêu chuẩn VietGAP, GlobalGAP'],
      en: ['Multi-functional microbial fertilizers', 'Soil improvement & restoration', 'VietGAP & GlobalGAP compliant'],
    },
    cta: { vi: 'Tìm hiểu thêm', en: 'Learn More' },
    gradient: 'linear-gradient(135deg, #1a2e0a 0%, #3a5c14 100%)',
  },
]

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        {/* Page header */}
        <div
          style={{
            background: 'linear-gradient(160deg, var(--green-950), var(--green-800))',
            padding: '4rem 1rem 3rem',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--green-300)' }}
            >
              {isVi ? 'Sản phẩm' : 'Products'}
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Sản phẩm & Dịch vụ' : 'Products & Services'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Các sản phẩm nông nghiệp công nghệ cao được nghiên cứu, phát triển và sản xuất bởi Viện ASTRI.'
                : 'High-tech agricultural products researched, developed, and produced by ASTRI.'}
            </p>
          </div>
        </div>

        {/* Product categories */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {CATEGORIES.map(({ icon: Icon, href, labelBadge, title, desc, features, cta, gradient }) => (
                <div
                  key={href}
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}
                >
                  {/* Image placeholder */}
                  <div
                    style={{
                      height: '200px',
                      background: gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      <Icon size={32} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {isVi ? labelBadge.vi : labelBadge.en}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-7" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
                      {isVi ? title.vi : title.en}
                    </h2>
                    <p className="text-sm mb-5" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                      {isVi ? desc.vi : desc.en}
                    </p>

                    {/* Feature list */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto 0' }}>
                      {(isVi ? features.vi : features.en).map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-sm py-1.5"
                          style={{
                            color: 'var(--text-2)',
                            borderBottom: fi < features.vi.length - 1 ? '1px solid var(--border)' : 'none',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--green-500)',
                              marginTop: '5px',
                              flexShrink: 0,
                            }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/${href}`}
                      className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm self-start"
                      style={{ background: 'var(--green-800)', color: 'white', textDecoration: 'none' }}
                    >
                      {isVi ? cta.vi : cta.en}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Quan tâm đến sản phẩm của chúng tôi?' : 'Interested in our products?'}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? 'Liên hệ với Viện ASTRI để được tư vấn và hợp tác về sản phẩm, phân phối hoặc chuyển giao công nghệ.'
                : 'Contact ASTRI for consultation and cooperation on products, distribution, or technology transfer.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm"
              style={{ background: 'var(--green-800)', color: 'white', textDecoration: 'none' }}
            >
              {isVi ? 'Liên hệ ngay' : 'Contact Us'}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

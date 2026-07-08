import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Globe, Handshake, BookOpen, Microscope, Sprout, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const COOPERATION_AREAS = {
  vi: [
    { icon: Microscope, title: 'Nghiên cứu khoa học chung', desc: 'Hợp tác nghiên cứu chung với các viện và trường đại học quốc tế trong lĩnh vực công nghệ sinh học và nông nghiệp bền vững.' },
    { icon: BookOpen, title: 'Chuyển giao công nghệ', desc: 'Tiếp nhận và chuyển giao công nghệ tiên tiến từ các đối tác nước ngoài, ứng dụng vào điều kiện nông nghiệp Việt Nam.' },
    { icon: Handshake, title: 'Hợp tác thương mại', desc: 'Kết nối doanh nghiệp nông nghiệp Việt Nam với thị trường quốc tế, xúc tiến xuất khẩu nông sản và sản phẩm chế biến.' },
    { icon: Sprout, title: 'Dự án phát triển nông thôn', desc: 'Tham gia các dự án hỗ trợ phát triển nông thôn được tài trợ bởi các tổ chức quốc tế và chính phủ nước ngoài.' },
    { icon: Globe, title: 'Hội nghị & Sự kiện', desc: 'Tổ chức và tham gia hội nghị khoa học quốc tế về nông nghiệp bền vững và đổi mới công nghệ trong lĩnh vực nông nghiệp.' },
  ],
  en: [
    { icon: Microscope, title: 'Joint Scientific Research', desc: 'Collaborative research with international institutes and universities in biotechnology and sustainable agriculture.' },
    { icon: BookOpen, title: 'Technology Transfer', desc: 'Receiving and transferring advanced technologies from foreign partners, adapting them to Vietnamese agricultural conditions.' },
    { icon: Handshake, title: 'Trade Cooperation', desc: 'Connecting Vietnamese agricultural enterprises with international markets, promoting export of produce and processed products.' },
    { icon: Sprout, title: 'Rural Development Projects', desc: 'Participating in rural development support projects funded by international organizations and foreign governments.' },
    { icon: Globe, title: 'Conferences & Events', desc: 'Organizing and participating in international scientific conferences on sustainable agriculture and agricultural technology innovation.' },
  ],
}

const PARTNER_REGIONS = {
  vi: [
    { region: 'Đông Nam Á', partners: ['Thái Lan', 'Philippines', 'Malaysia', 'Indonesia'] },
    { region: 'Đông Bắc Á', partners: ['Nhật Bản', 'Hàn Quốc', 'Đài Loan'] },
    { region: 'Châu Âu', partners: ['Hà Lan', 'Đức', 'Pháp'] },
    { region: 'Bắc Mỹ & Quốc tế', partners: ['Hoa Kỳ', 'FAO', 'UNDP'] },
  ],
  en: [
    { region: 'Southeast Asia', partners: ['Thailand', 'Philippines', 'Malaysia', 'Indonesia'] },
    { region: 'Northeast Asia', partners: ['Japan', 'South Korea', 'Taiwan'] },
    { region: 'Europe', partners: ['Netherlands', 'Germany', 'France'] },
    { region: 'North America & International', partners: ['USA', 'FAO', 'UNDP'] },
  ],
}

// Placeholder logos array (12 partner slots)
const PARTNER_SLOTS = Array.from({ length: 12 }, (_, i) => i)

export default async function CooperationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const areas = COOPERATION_AREAS[isVi ? 'vi' : 'en']
  const regions = PARTNER_REGIONS[isVi ? 'vi' : 'en']

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
              {isVi ? 'Hợp tác' : 'Cooperation'}
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Hợp tác Quốc tế' : 'International Cooperation'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'ASTRI tích cực xây dựng và mở rộng quan hệ hợp tác với các tổ chức nghiên cứu, doanh nghiệp và tổ chức quốc tế trên toàn cầu.'
                : 'ASTRI actively builds and expands cooperative relationships with research organizations, enterprises, and international bodies worldwide.'}
            </p>
          </div>
        </div>

        {/* Partners logos */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Đối tác' : 'Partners'}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--text-3)' }}>
              {isVi
                ? 'Các tổ chức và doanh nghiệp đối tác của Viện ASTRI'
                : 'ASTRI\'s partner organizations and enterprises'}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem',
              }}
            >
              {PARTNER_SLOTS.map((i) => (
                <div
                  key={i}
                  style={{
                    height: '80px',
                    borderRadius: '10px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontWeight: 500 }}>
                    {isVi ? `Đối tác ${i + 1}` : `Partner ${i + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cooperation areas */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Lĩnh vực hợp tác' : 'Areas of Cooperation'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={i}
                  className="rounded-xl p-7"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional presence */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Hiện diện khu vực' : 'Regional Presence'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {regions.map(({ region, partners }, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p
                    className="font-bold mb-3 text-sm uppercase tracking-wide"
                    style={{ color: 'var(--green-700)' }}
                  >
                    {region}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {partners.map((p, pi) => (
                      <li
                        key={pi}
                        className="text-sm py-1"
                        style={{
                          color: 'var(--text-2)',
                          borderBottom: pi < partners.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News link */}
        <section className="py-12 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: 'var(--text-1)' }}
            >
              {isVi ? 'Tin tức hợp tác' : 'Cooperation News'}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? 'Xem các tin tức và sự kiện mới nhất về hoạt động hợp tác quốc tế của Viện ASTRI.'
                : 'See the latest news and events on ASTRI\'s international cooperation activities.'}
            </p>
            <Link
              href={`/${locale}/news?category=cooperation`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
              style={{ background: 'var(--green-800)', color: 'white', textDecoration: 'none' }}
            >
              {isVi ? 'Xem tin tức hợp tác' : 'View Cooperation News'}
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

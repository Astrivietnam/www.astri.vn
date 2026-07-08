import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Globe, Handshake, TrendingUp, Package } from 'lucide-react'

const SERVICES = {
  vi: [
    { icon: Globe, title: 'Xúc tiến thương mại quốc tế', desc: 'Kết nối doanh nghiệp nông nghiệp Việt Nam với thị trường Nhật Bản, Hàn Quốc, EU và các thị trường tiềm năng khác.' },
    { icon: Handshake, title: 'Kết nối đối tác', desc: 'Cầu nối tin cậy giữa nhà sản xuất, nhà phân phối và các đối tác chiến lược trong và ngoài nước.' },
    { icon: TrendingUp, title: 'Tư vấn thị trường', desc: 'Cung cấp thông tin và phân tích thị trường, xu hướng tiêu dùng để hỗ trợ doanh nghiệp định hướng sản phẩm.' },
    { icon: Package, title: 'Hỗ trợ xuất nhập khẩu', desc: 'Hỗ trợ thủ tục chứng nhận, kiểm dịch, và các yêu cầu pháp lý cho hàng nông sản xuất khẩu.' },
  ],
  en: [
    { icon: Globe, title: 'International Trade Promotion', desc: 'Connecting Vietnamese agricultural businesses with markets in Japan, Korea, EU, and other promising regions.' },
    { icon: Handshake, title: 'Partnership Facilitation', desc: 'Serving as a trusted bridge between producers, distributors, and strategic partners domestically and internationally.' },
    { icon: TrendingUp, title: 'Market Advisory', desc: 'Providing market intelligence and consumer trend analysis to help businesses align their product strategies.' },
    { icon: Package, title: 'Import/Export Support', desc: 'Assisting with certification, quarantine procedures, and legal requirements for agricultural exports.' },
  ],
}

export default async function TradePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const services = SERVICES[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Thương mại' : 'Trade'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Xúc tiến Thương mại' : 'Trade Promotion'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Kết nối doanh nghiệp nông nghiệp Việt Nam với thị trường quốc tế, hỗ trợ xuất khẩu và phát triển thương hiệu nông sản Việt.'
                : 'Connecting Vietnamese agricultural businesses with international markets, supporting exports and building Vietnamese agricultural brands.'}
            </p>
          </div>
        </div>

        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h2>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

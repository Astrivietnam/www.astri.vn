import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import {
  Radio,
  Boxes,
  BrainCircuit,
  Sprout,
  FlaskConical,
  GitBranch,
  Handshake,
  Leaf,
  ArrowRight,
} from 'lucide-react'

const TECHS = {
  vi: [
    {
      icon: Radio,
      title: 'IoT & cảm biến môi trường',
      desc: 'Mạng lưới cảm biến thông minh giám sát đất, nước, độ mặn, nhiệt độ và độ ẩm theo thời gian thực, giúp tự động hóa và tối ưu hóa quy trình canh tác.',
    },
    {
      icon: Boxes,
      title: 'Blockchain truy xuất nguồn gốc',
      desc: 'Ứng dụng blockchain để xác thực và minh bạch hóa toàn bộ chuỗi giá trị nông sản, từ trang trại đến bàn ăn, tạo niềm tin cho người tiêu dùng và thị trường xuất khẩu.',
    },
    {
      icon: BrainCircuit,
      title: 'Trí tuệ nhân tạo (AI)',
      desc: 'Ứng dụng AI trong dự báo thời tiết, chẩn đoán sâu bệnh, phân tích dữ liệu canh tác và hỗ trợ ra quyết định chính xác nhằm giảm chi phí và tăng năng suất.',
    },
    {
      icon: Sprout,
      title: 'Nhà màng, nhà kính & tưới thông minh',
      desc: 'Hệ thống nhà màng, nhà kính kết hợp tưới tiêu tự động điều khiển theo dữ liệu, kiểm soát vi khí hậu và tiết kiệm nước cho nông nghiệp công nghệ cao.',
    },
    {
      icon: FlaskConical,
      title: 'Công nghệ vi sinh',
      desc: 'Nghiên cứu và ứng dụng vi sinh vật có lợi, công nghệ lên men tiên tiến để sản xuất phân bón hữu cơ vi sinh chất lượng cao, cải tạo đất và nâng cao độ phì nhiêu.',
    },
    {
      icon: GitBranch,
      title: 'Chuyển giao công nghệ',
      desc: 'Chuyển giao quy trình, thiết bị và giải pháp công nghệ cho hợp tác xã, doanh nghiệp và nông hộ, gắn với đào tạo và đồng hành triển khai thực tế.',
    },
  ],
  en: [
    {
      icon: Radio,
      title: 'IoT & Environmental Sensors',
      desc: 'Smart sensor networks monitor soil, water, salinity, temperature, and humidity in real time to automate and optimize farming processes.',
    },
    {
      icon: Boxes,
      title: 'Blockchain Traceability',
      desc: 'Blockchain authenticates and brings transparency to the entire agricultural value chain, from farm to table, building trust for consumers and export markets.',
    },
    {
      icon: BrainCircuit,
      title: 'Artificial Intelligence (AI)',
      desc: 'AI applied to weather forecasting, pest and disease diagnosis, farming data analytics, and precise decision support to reduce costs and raise yields.',
    },
    {
      icon: Sprout,
      title: 'Greenhouses & Smart Irrigation',
      desc: 'Net-house and greenhouse systems combined with data-driven automated irrigation to control microclimate and save water for high-tech agriculture.',
    },
    {
      icon: FlaskConical,
      title: 'Microbial Technology',
      desc: 'Research and application of beneficial microorganisms and advanced fermentation to produce high-quality organic microbial fertilizers that restore and enrich the soil.',
    },
    {
      icon: GitBranch,
      title: 'Technology Transfer',
      desc: 'Transfer of processes, equipment, and technology solutions to cooperatives, enterprises, and farming households, coupled with training and hands-on deployment.',
    },
  ],
}

const NEWS = {
  vi: [
    { slug: 'astri-futaba-nhat-ban-ky-ket-hop-tac', title: 'ASTRI ký kết hợp tác với Futaba Sankyo (Nhật Bản)' },
    { slug: 'astri-ca-mau-he-sinh-thai-nong-nghiep', title: 'ASTRI xây dựng hệ sinh thái nông nghiệp thông minh tại Cà Mau' },
    { slug: 'iot-trong-nong-nghiep-thong-minh-cam-bien', title: 'IoT và cảm biến trong nông nghiệp thông minh' },
    { slug: 'blockchain-truy-xuat-nguon-goc-nong-san', title: 'Blockchain truy xuất nguồn gốc nông sản' },
    { slug: 'ai-tri-tue-nhan-tao-trong-nong-nghiep', title: 'Trí tuệ nhân tạo (AI) trong nông nghiệp' },
  ],
  en: [
    { slug: 'astri-futaba-nhat-ban-ky-ket-hop-tac', title: 'ASTRI signs cooperation agreement with Futaba Sankyo (Japan)' },
    { slug: 'astri-ca-mau-he-sinh-thai-nong-nghiep', title: 'ASTRI builds a smart agriculture ecosystem in Ca Mau' },
    { slug: 'iot-trong-nong-nghiep-thong-minh-cam-bien', title: 'IoT and sensors in smart agriculture' },
    { slug: 'blockchain-truy-xuat-nguon-goc-nong-san', title: 'Blockchain traceability for agricultural products' },
    { slug: 'ai-tri-tue-nhan-tao-trong-nong-nghiep', title: 'Artificial intelligence (AI) in agriculture' },
  ],
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const techs = TECHS[isVi ? 'vi' : 'en']
  const news = NEWS[isVi ? 'vi' : 'en']

  const fertilizerBullets = isVi
    ? [
        'Nghiên cứu và sản xuất phân bón hữu cơ vi sinh chất lượng cao bằng công nghệ lên men tiên tiến của Nhật Bản.',
        'Khôi phục và cải tạo độ phì nhiêu của đất canh tác.',
        'Nâng cao năng suất và chất lượng nông sản.',
        'Giảm thiểu tối đa tác động tới môi trường.',
        'Thúc đẩy phát triển nông nghiệp hữu cơ và nông nghiệp tuần hoàn.',
      ]
    : [
        'Research and production of high-quality organic microbial fertilizers using advanced Japanese fermentation technology.',
        'Restoring and improving the fertility of cultivated soil.',
        'Raising crop yields and produce quality.',
        'Minimizing environmental impact.',
        'Promoting organic and circular agriculture.',
      ]

  const glorinBullets = isVi
    ? [
        'Truy xuất nguồn gốc và xác thực sản phẩm nông sản.',
        'Tính toán và quản lý tín chỉ carbon.',
        'Bảo hiểm tham số (parametric insurance) ứng phó với xâm nhập mặn.',
        'Tích hợp đồng bộ ba nền tảng Blockchain, IoT và AI trên một hệ sinh thái duy nhất.',
      ]
    : [
        'Product-origin traceability and authentication of agricultural produce.',
        'Calculation and management of carbon credits.',
        'Parametric insurance against saltwater intrusion.',
        'Integration of Blockchain, IoT, and AI on a single unified ecosystem.',
      ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Công nghệ' : 'Technology'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Ứng dụng Công nghệ' : 'Technology Application'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              {isVi
                ? 'Viện ASTRI ứng dụng đồng bộ các công nghệ tiên tiến — IoT, Blockchain, trí tuệ nhân tạo, công nghệ vi sinh và nhà kính thông minh — vào sản xuất, quản lý chuỗi giá trị và phát triển nông nghiệp bền vững, thông minh, thích ứng với biến đổi khí hậu.'
                : 'ASTRI brings together advanced technologies — IoT, Blockchain, artificial intelligence, microbial technology, and smart greenhouses — across production, value-chain management, and the development of sustainable, smart agriculture that adapts to climate change.'}
            </p>
          </div>
        </div>

        {/* Core technologies */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Năng lực công nghệ cốt lõi' : 'Core Technology Capabilities'}
            </h2>
            <p className="text-base mb-10 max-w-2xl" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {isVi
                ? 'Nền tảng công nghệ đa lĩnh vực làm nền cho các giải pháp nông nghiệp thông minh của ASTRI.'
                : 'A multi-disciplinary technology foundation underpinning ASTRI’s smart agriculture solutions.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {techs.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image figure */}
        <section className="px-4 pb-4" style={{ background: 'var(--bg)' }}>
          <figure className="max-w-7xl mx-auto m-0">
            <img
              src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=1600&q=80&auto=format&fit=crop"
              alt={isVi ? 'Ứng dụng công nghệ cao trong sản xuất nông nghiệp' : 'High-tech applications in agricultural production'}
              style={{ width: '100%', borderRadius: '12px', display: 'block' }}
            />
            <figcaption className="text-sm mt-3" style={{ color: 'var(--text-3)' }}>
              {isVi
                ? 'Ứng dụng công nghệ cao và tự động hóa trong sản xuất nông nghiệp bền vững.'
                : 'High-tech and automation applications in sustainable agricultural production.'}
            </figcaption>
          </figure>
        </section>

        {/* Featured applications */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Ứng dụng tiêu biểu' : 'Featured Applications'}
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Futaba fertilizer */}
              <article className="rounded-xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Leaf size={22} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--green-700)' }}>
                    {isVi ? 'Hợp tác Việt — Nhật' : 'Vietnam — Japan Partnership'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Phân bón hữu cơ vi sinh công nghệ cao' : 'High-tech Organic Microbial Fertilizer'}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Ngày 12/11/2025 tại Hà Nội, Viện ASTRI đã ký kết Biên bản ghi nhớ hợp tác (MOU) với Công ty Futaba Sankyo (Nhật Bản), hướng tới nghiên cứu và sản xuất phân bón hữu cơ vi sinh chất lượng cao trên nền công nghệ lên men tiên tiến của Nhật Bản.'
                    : 'On 12 November 2025 in Hà Nội, ASTRI signed a Memorandum of Understanding (MOU) with Futaba Sankyo (Japan), aiming to research and produce high-quality organic microbial fertilizers based on advanced Japanese fermentation technology.'}
                </p>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Mục tiêu hợp tác:' : 'Cooperation goals:'}
                </p>
                <ul className="space-y-2">
                  {fertilizerBullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
                      <span aria-hidden style={{ color: 'var(--green-700)', flexShrink: 0 }}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Ca Mau Glorin */}
              <article className="rounded-xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Handshake size={22} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--green-700)' }}>
                    {isVi ? 'Nền tảng Glorin — Cà Mau' : 'Glorin Platform — Cà Mau'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Hệ sinh thái nông nghiệp thông minh' : 'Smart Agriculture Ecosystem'}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Ngày 28/7/2025, ASTRI triển khai nền tảng công nghệ "Glorin" tại Cà Mau, tích hợp Blockchain, IoT và AI nhằm ứng phó với rủi ro khí hậu ở Đồng bằng sông Cửu Long — nơi biến đổi khí hậu có thể gây thiệt hại tương đương khoảng 2% GDP.'
                    : 'On 28 July 2025, ASTRI deployed the "Glorin" technology platform in Cà Mau, integrating Blockchain, IoT, and AI to address climate risk in the Mekong Delta — where climate change could cause losses equivalent to around 2% of GDP.'}
                </p>
                <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Chức năng chính:' : 'Core functions:'}
                </p>
                <ul className="space-y-2">
                  {glorinBullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
                      <span aria-hidden style={{ color: 'var(--green-700)', flexShrink: 0 }}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* Related news */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Tin tức liên quan' : 'Related News'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map(({ slug, title }, i) => (
                <Link
                  key={i}
                  href={`/${locale}/news/${slug}`}
                  className="rounded-xl p-5 flex items-center justify-between gap-3 transition-colors"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
                >
                  <span className="text-sm font-semibold" style={{ lineHeight: 1.5 }}>{title}</span>
                  <ArrowRight size={18} style={{ color: 'var(--green-700)', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

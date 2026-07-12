import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react'

const UPCOMING = {
  vi: [
    {
      title: 'Hội thảo Nông nghiệp Bền vững đồng bằng sông Cửu Long',
      date: 'Tháng 9/2026',
      quarter: 'Q3/2026',
      location: 'Cần Thơ, Việt Nam',
      type: 'Hội thảo khoa học',
      attendees: '200+ đại biểu',
      desc: 'Hội thảo quy tụ các nhà khoa học, doanh nghiệp và nông dân ĐBSCL thảo luận về giải pháp canh tác bền vững thích ứng biến đổi khí hậu, phát triển mô hình lúa-tôm và canh tác hữu cơ quy mô lớn.',
      topics: [
        'Mô hình canh tác thích ứng biến đổi khí hậu tại ĐBSCL',
        'Kinh nghiệm tín chỉ carbon trong sản xuất lúa (An Giang – 1.500ha)',
        'Nuôi tôm siêu thâm canh và xử lý nước thải',
        'Ứng dụng công nghệ số trong chuỗi giá trị nông sản',
      ],
    },
    {
      title: 'ASTRI Tech Expo 2026 – Triển lãm Công nghệ Nông nghiệp',
      date: 'Tháng 11/2026',
      quarter: 'Q4/2026',
      location: 'TP. Hồ Chí Minh, Việt Nam',
      type: 'Triển lãm & Hội nghị',
      attendees: '500+ khách tham quan',
      desc: 'Triển lãm công nghệ nông nghiệp thường niên của ASTRI, trưng bày các giải pháp IoT, phân bón vi sinh, hệ thống truy xuất nguồn gốc blockchain và kết nối hợp tác quốc tế từ Nhật Bản, Trung Quốc.',
      topics: [
        'Triển lãm sản phẩm phân bón hữu cơ vi sinh ASTRI',
        'Demo hệ thống tưới tiêu thông minh và cảm biến IoT',
        'Gian hàng đối tác Futaba (Nhật Bản) & Shannon Yunnan (Trung Quốc)',
        'Diễn đàn hợp tác đầu tư nông nghiệp công nghệ cao',
      ],
    },
    {
      title: 'Tọa đàm: Blockchain trong chuỗi giá trị nông sản Việt Nam',
      date: 'Tháng 8/2026',
      quarter: 'Q3/2026',
      location: 'Hà Nội & Trực tuyến',
      type: 'Tọa đàm chuyên đề',
      attendees: '100+ đại biểu',
      desc: 'Tọa đàm chuyên sâu về ứng dụng công nghệ blockchain trong truy xuất nguồn gốc và thương mại hóa nông sản Việt Nam, kết hợp chia sẻ kinh nghiệm thực tiễn từ hợp tác ASTRI – Shannon Yunnan Information Technology.',
      topics: [
        'Tổng quan blockchain trong nông nghiệp: thực trạng Việt Nam và thế giới',
        'Case study: Hệ thống truy xuất ASTRI – Shannon Yunnan',
        'Yêu cầu pháp lý và tiêu chuẩn kỹ thuật cho mã QR nông sản',
        'Kết nối xuất khẩu nông sản sang thị trường Trung Quốc qua nền tảng số',
      ],
    },
  ],
  en: [
    {
      title: 'Mekong Delta Sustainable Agriculture Conference',
      date: 'September 2026',
      quarter: 'Q3/2026',
      location: 'Can Tho, Vietnam',
      type: 'Scientific Conference',
      attendees: '200+ delegates',
      desc: 'A conference bringing together scientists, enterprises, and Mekong Delta farmers to discuss climate-adaptive sustainable farming solutions, rice-shrimp rotation models, and large-scale organic production.',
      topics: [
        'Climate-adaptive farming models in the Mekong Delta',
        'Carbon credit experience in rice production (An Giang – 1,500 ha)',
        'Super-intensive shrimp farming and wastewater treatment',
        'Digital technology applications in the agricultural value chain',
      ],
    },
    {
      title: 'ASTRI Tech Expo 2026 – Agricultural Technology Exhibition',
      date: 'November 2026',
      quarter: 'Q4/2026',
      location: 'Ho Chi Minh City, Vietnam',
      type: 'Exhibition & Conference',
      attendees: '500+ visitors',
      desc: 'ASTRI\'s annual agricultural technology exhibition, showcasing IoT solutions, microbial fertilizers, blockchain traceability systems, and international partnerships from Japan and China.',
      topics: [
        'ASTRI organic microbial fertilizer product display',
        'Smart irrigation and IoT sensor live demos',
        'Partner pavilions: Futaba (Japan) & Shannon Yunnan (China)',
        'High-tech agricultural investment partnership forum',
      ],
    },
    {
      title: 'Seminar: Blockchain in Vietnam\'s Agricultural Value Chain',
      date: 'August 2026',
      quarter: 'Q3/2026',
      location: 'Hanoi & Online',
      type: 'Thematic Seminar',
      attendees: '100+ delegates',
      desc: 'An in-depth seminar on applying blockchain for traceability and commercialization of Vietnamese agricultural products, with hands-on experience sharing from the ASTRI – Shannon Yunnan Information Technology partnership.',
      topics: [
        'Blockchain in agriculture overview: Vietnam and global landscape',
        'Case study: ASTRI – Shannon Yunnan traceability system',
        'Legal requirements and technical standards for agricultural QR codes',
        'Digital export connectivity to the Chinese market',
      ],
    },
  ],
}

const PAST = {
  vi: [
    {
      title: 'Lễ ký kết MOU với Futaba Co., Ltd. (Nhật Bản)',
      date: 'Tháng 11/2025',
      location: 'Hà Nội, Việt Nam',
      desc: 'ASTRI và Futaba Co., Ltd. – công ty nông nghiệp công nghệ cao Nhật Bản – ký kết biên bản ghi nhớ hợp tác về chuyển giao công nghệ sản xuất rau sạch và phát triển thị trường nông sản.',
    },
    {
      title: 'Lễ ký kết MOU với Shannon Yunnan Information Technology (Trung Quốc)',
      date: 'Tháng 11/2025',
      location: 'Hà Nội, Việt Nam',
      desc: 'ASTRI ký kết hợp tác chiến lược với Shannon Yunnan Information Technology về triển khai hệ thống truy xuất nguồn gốc blockchain và kết nối thương mại điện tử nông sản Việt – Trung.',
    },
    {
      title: 'Hội thảo Hợp tác Nông nghiệp Cà Mau',
      date: 'Tháng 7/2025',
      location: 'Cà Mau, Việt Nam',
      desc: 'ASTRI tổ chức hội thảo hợp tác với các hợp tác xã nuôi tôm tỉnh Cà Mau về triển khai mô hình nuôi tôm siêu thâm canh, ứng dụng phân vi sinh ASTRI Aqua Boost và xây dựng chuỗi truy xuất nguồn gốc thủy sản.',
    },
  ],
  en: [
    {
      title: 'MOU Signing with Futaba Co., Ltd. (Japan)',
      date: 'November 2025',
      location: 'Hanoi, Vietnam',
      desc: 'ASTRI and Futaba Co., Ltd. — a Japanese high-tech agricultural company — signed a Memorandum of Understanding on technology transfer for clean vegetable production and agricultural market development.',
    },
    {
      title: 'MOU Signing with Shannon Yunnan Information Technology (China)',
      date: 'November 2025',
      location: 'Hanoi, Vietnam',
      desc: 'ASTRI signed a strategic cooperation agreement with Shannon Yunnan Information Technology on deploying blockchain traceability systems and connecting Vietnam–China agricultural e-commerce.',
    },
    {
      title: 'Ca Mau Agricultural Cooperation Workshop',
      date: 'July 2025',
      location: 'Ca Mau, Vietnam',
      desc: 'ASTRI organized a cooperation workshop with Ca Mau province shrimp farming cooperatives on deploying super-intensive shrimp models, applying ASTRI Aqua Boost probiotics, and building seafood traceability chains.',
    },
  ],
}

export default async function WorkshopsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const upcoming = UPCOMING[isVi ? 'vi' : 'en']
  const past = PAST[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Đào tạo' : 'Training'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Hội thảo & Sự kiện' : 'Workshops & Events'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI thường xuyên tổ chức và tham gia các hội thảo, triển lãm và sự kiện kết nối nông nghiệp trong nước và quốc tế.'
                : 'ASTRI regularly organizes and participates in agricultural conferences, exhibitions, and networking events domestically and internationally.'}
            </p>
          </div>
        </div>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'var(--green-500)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Sự kiện Sắp diễn ra' : 'Upcoming Events'}
              </h2>
            </div>
            <div className="space-y-6">
              {upcoming.map((e, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'var(--green-950)', color: 'var(--green-300)' }}>
                      {e.quarter}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
                      {e.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-1)' }}>{e.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-4 text-sm" style={{ color: 'var(--text-2)' }}>
                    <span className="flex items-center gap-1"><Clock size={14} />{e.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} />{e.location}</span>
                    <span className="flex items-center gap-1"><Users size={14} />{e.attendees}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>{e.desc}</p>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--green-600)' }}>
                      {isVi ? 'Chủ đề chính' : 'Key Topics'}
                    </p>
                    <ul className="space-y-1">
                      {e.topics.map((t, j) => (
                        <li key={j} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                          <span style={{ color: 'var(--green-500)', marginTop: '0.1rem' }}>›</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Sự kiện Đã diễn ra' : 'Past Events'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {past.map((e, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-3 text-sm" style={{ color: 'var(--text-3)' }}>
                    <Calendar size={14} />
                    {e.date}
                    <span>·</span>
                    <MapPin size={14} />
                    {e.location}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{e.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--green-950)', padding: '4rem 1rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isVi ? 'Đăng ký tham dự sự kiện' : 'Register for an Event'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Liên hệ ASTRI để đăng ký tham dự hội thảo, đề xuất chủ đề hoặc trở thành đơn vị đồng tổ chức sự kiện nông nghiệp.'
                : 'Contact ASTRI to register for a workshop, propose a topic, or become a co-organizer for agricultural events.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--green-600)' }}
            >
              {isVi ? 'Liên hệ đăng ký' : 'Contact to Register'}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

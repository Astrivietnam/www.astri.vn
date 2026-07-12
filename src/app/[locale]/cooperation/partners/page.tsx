import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Globe, Building2, Handshake, ArrowRight, CalendarCheck } from 'lucide-react'

const INTERNATIONAL = {
  vi: [
    {
      name: 'Futaba Co., Ltd.',
      country: 'Nhật Bản',
      flag: '🇯🇵',
      since: 'Tháng 11/2025',
      type: 'Đối tác công nghệ',
      desc: 'Futaba Co., Ltd. là công ty nông nghiệp công nghệ cao của Nhật Bản chuyên về sản xuất rau sạch trong nhà kính, hệ thống trồng cây thủy canh và giải pháp nông nghiệp đô thị. ASTRI và Futaba hợp tác chuyển giao công nghệ sản xuất rau sạch đạt tiêu chuẩn xuất khẩu Nhật Bản tại Việt Nam.',
      areas: ['Chuyển giao công nghệ nhà kính', 'Kỹ thuật trồng rau thủy canh', 'Tiêu chuẩn chất lượng xuất khẩu Nhật Bản', 'Phát triển thị trường nông sản Việt – Nhật'],
    },
    {
      name: 'Shannon Yunnan Information Technology',
      country: 'Trung Quốc (Vân Nam)',
      flag: '🇨🇳',
      since: 'Tháng 11/2025',
      type: 'Đối tác công nghệ số',
      desc: 'Shannon Yunnan Information Technology là doanh nghiệp công nghệ tại tỉnh Vân Nam, Trung Quốc, chuyên về hệ thống truy xuất nguồn gốc blockchain và thương mại điện tử nông sản xuyên biên giới Trung Quốc – ASEAN. Hợp tác tập trung vào kết nối chuỗi cung ứng và số hóa quy trình xuất khẩu nông sản.',
      areas: ['Hệ thống blockchain truy xuất nguồn gốc', 'Thương mại điện tử nông sản Việt – Trung', 'Đào tạo truy xuất và số hóa chuỗi giá trị', 'Kết nối thị trường Vân Nam và ASEAN'],
    },
    {
      name: 'Yunnan Vocational College of Agriculture',
      country: 'Trung Quốc (Vân Nam)',
      flag: '🇨🇳',
      since: '2025',
      type: 'Đối tác đào tạo',
      desc: 'Yunnan Vocational College of Agriculture là trường cao đẳng nông nghiệp hàng đầu tỉnh Vân Nam với kinh nghiệm đào tạo nguồn nhân lực nông nghiệp nhiệt đới cho khu vực ASEAN. Hợp tác tập trung vào trao đổi chuyên gia, chương trình đào tạo liên kết và nghiên cứu chung về nông nghiệp nhiệt đới.',
      areas: ['Chương trình đào tạo liên kết Việt – Trung', 'Trao đổi giảng viên và chuyên gia', 'Nghiên cứu chung nông nghiệp nhiệt đới', 'Học bổng học viên nông nghiệp'],
    },
  ],
  en: [
    {
      name: 'Futaba Co., Ltd.',
      country: 'Japan',
      flag: '🇯🇵',
      since: 'November 2025',
      type: 'Technology Partner',
      desc: 'Futaba Co., Ltd. is a Japanese high-tech agricultural company specializing in clean vegetable production in greenhouses, hydroponic systems, and urban agriculture solutions. ASTRI and Futaba cooperate on technology transfer for clean vegetable production meeting Japanese export standards in Vietnam.',
      areas: ['Greenhouse technology transfer', 'Hydroponic cultivation techniques', 'Japanese export quality standards', 'Vietnam–Japan agricultural market development'],
    },
    {
      name: 'Shannon Yunnan Information Technology',
      country: 'China (Yunnan)',
      flag: '🇨🇳',
      since: 'November 2025',
      type: 'Digital Technology Partner',
      desc: 'Shannon Yunnan Information Technology is a technology enterprise in Yunnan Province, China, specializing in blockchain traceability systems and China–ASEAN cross-border agricultural e-commerce. The partnership focuses on supply chain connectivity and digitalization of the agricultural export process.',
      areas: ['Blockchain traceability systems', 'Vietnam–China agricultural e-commerce', 'Traceability training and value chain digitalization', 'Yunnan and ASEAN market connectivity'],
    },
    {
      name: 'Yunnan Vocational College of Agriculture',
      country: 'China (Yunnan)',
      flag: '🇨🇳',
      since: '2025',
      type: 'Education Partner',
      desc: 'Yunnan Vocational College of Agriculture is a leading agricultural college in Yunnan Province with experience training tropical agricultural talent for the ASEAN region. Cooperation focuses on expert exchange, joint training programs, and collaborative research on tropical agriculture.',
      areas: ['Vietnam–China joint training programs', 'Lecturer and expert exchanges', 'Joint tropical agriculture research', 'Agricultural student scholarships'],
    },
  ],
}

const DOMESTIC = {
  vi: [
    {
      name: 'VUSTA – Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam',
      type: 'Cơ quan chủ quản',
      desc: 'VUSTA (Vietnam Union of Science and Technology Associations) là cơ quan chủ quản của ASTRI, đảm bảo định hướng khoa học kỹ thuật và kết nối với mạng lưới hội khoa học toàn quốc.',
    },
    {
      name: 'Tạp chí Sinh thái Nông nghiệp',
      type: 'Đối tác truyền thông',
      website: 'sinhthainongnghiep.net.vn',
      desc: 'Tạp chí Sinh thái Nông nghiệp là kênh truyền thông chính thức của ASTRI, phổ biến kiến thức nông nghiệp bền vững, kết quả nghiên cứu và thông tin sự kiện đến cộng đồng nông nghiệp Việt Nam.',
    },
    {
      name: 'Hợp tác xã Nuôi trồng Thủy sản Cà Mau',
      type: 'Đối tác triển khai',
      desc: 'Đối tác triển khai mô hình nuôi tôm thẻ chân trắng siêu thâm canh trong nhà màng tại Cà Mau. ASTRI hỗ trợ kỹ thuật, cung cấp phân vi sinh Aqua Boost và xây dựng chuỗi truy xuất nguồn gốc thủy sản.',
    },
    {
      name: 'Hợp tác xã Nông nghiệp An Giang',
      type: 'Đối tác triển khai',
      desc: 'Đối tác thực hiện dự án canh tác lúa tín chỉ carbon quy mô 1.500 ha tại An Giang, ứng dụng quy trình canh tác giảm phát thải theo tiêu chuẩn quốc tế, hướng đến thị trường tín chỉ carbon nông nghiệp.',
    },
  ],
  en: [
    {
      name: 'VUSTA – Vietnam Union of Science and Technology Associations',
      type: 'Parent Organization',
      desc: 'VUSTA is ASTRI\'s parent organization, providing scientific and technical direction and connecting to the national network of science associations.',
    },
    {
      name: 'Agricultural Ecology Journal',
      type: 'Media Partner',
      website: 'sinhthainongnghiep.net.vn',
      desc: 'Agricultural Ecology Journal is ASTRI\'s official media channel, disseminating sustainable agriculture knowledge, research results, and event information to the Vietnamese agricultural community.',
    },
    {
      name: 'Ca Mau Aquaculture Cooperative',
      type: 'Implementation Partner',
      desc: 'Implementation partner for the super-intensive white-leg shrimp greenhouse farming model in Ca Mau. ASTRI provides technical support, Aqua Boost probiotics, and builds a seafood traceability chain.',
    },
    {
      name: 'An Giang Agricultural Cooperative',
      type: 'Implementation Partner',
      desc: 'Partner for the carbon credit rice farming project covering 1,500 ha in An Giang, applying emission-reducing farming processes to international standards, targeting the agricultural carbon credit market.',
    },
  ],
}

export default async function PartnersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const international = INTERNATIONAL[isVi ? 'vi' : 'en']
  const domestic = DOMESTIC[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Hợp tác' : 'Cooperation'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Đối tác Chiến lược' : 'Strategic Partners'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI xây dựng mạng lưới hợp tác bền vững với các đối tác trong nước và quốc tế, cùng thúc đẩy nông nghiệp Việt Nam phát triển theo hướng công nghệ cao và bền vững.'
                : 'ASTRI builds a sustainable cooperation network with domestic and international partners, jointly advancing Vietnamese agriculture toward high-tech and sustainable development.'}
            </p>
          </div>
        </div>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Globe size={20} style={{ color: 'var(--green-500)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đối tác Quốc tế' : 'International Partners'}
              </h2>
            </div>
            <div className="space-y-6">
              {international.map((p, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex flex-wrap gap-4 items-start mb-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                      {p.flag}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-1)' }}>{p.name}</h3>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm" style={{ color: 'var(--text-2)' }}>
                        <span>{p.country}</span>
                        <span>·</span>
                        <span style={{ color: 'var(--green-600)' }}>{p.type}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><CalendarCheck size={13} />{isVi ? 'Từ' : 'Since'} {p.since}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.areas.map((a, j) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full" style={{ background: 'var(--green-950)', color: 'var(--green-300)' }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Building2 size={20} style={{ color: 'var(--green-500)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đối tác Trong nước' : 'Domestic Partners'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {domestic.map((p, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block" style={{ background: 'var(--green-950)', color: 'var(--green-300)' }}>
                    {p.type}
                  </span>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>{p.name}</h3>
                  {p.website && (
                    <p className="text-xs mb-2" style={{ color: 'var(--green-600)' }}>{p.website}</p>
                  )}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--green-950)', padding: '4rem 1rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <Handshake size={40} className="mx-auto mb-4" style={{ color: 'var(--green-300)' }} />
            <h2 className="text-2xl font-bold text-white mb-3">
              {isVi ? 'Trở thành Đối tác của ASTRI' : 'Become an ASTRI Partner'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI luôn sẵn sàng mở rộng mạng lưới đối tác với các tổ chức, doanh nghiệp và cá nhân có cùng định hướng phát triển nông nghiệp bền vững và ứng dụng công nghệ cao.'
                : 'ASTRI is always ready to expand its partner network with organizations, enterprises, and individuals who share the vision of sustainable and high-tech agricultural development.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--green-600)' }}
            >
              {isVi ? 'Gửi đề xuất hợp tác' : 'Send Partnership Proposal'}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

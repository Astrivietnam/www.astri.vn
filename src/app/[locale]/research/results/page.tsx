import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Award,
  ShoppingBag,
  FlaskConical,
  ArrowRightLeft,
  CheckCircle2,
  TrendingDown,
  BarChart3,
  Leaf,
  Fish,
  Wheat,
  Tractor,
} from 'lucide-react'

const caseStudies = (isVi: boolean) => [
  {
    icon: Fish,
    title: isVi ? 'Trang trại tôm Cà Mau' : 'Ca Mau Shrimp Farm',
    area: '200 ha',
    year: '2024',
    result: isVi
      ? 'Áp dụng hệ thống xử lý nước thải tích hợp ba chức năng. Tỷ lệ sống của tôm tăng từ 62% lên 85%. Chi phí xử lý nước giảm 38%. Nguồn nước xả đạt QCVN 40:2011.'
      : 'Deployed tri-function integrated wastewater treatment system. Shrimp survival rate rose from 62% to 85%. Water treatment costs down 38%. Discharge water meets QCVN 40:2011.',
    tags: [isVi ? 'Xử lý nước thải' : 'Wastewater Treatment', isVi ? 'Thủy sản' : 'Aquaculture'],
  },
  {
    icon: Wheat,
    title: isVi ? 'Cánh đồng lúa An Giang' : 'An Giang Rice Fields',
    area: '1.500 ha',
    year: '2025',
    result: isVi
      ? 'Mô hình canh tác lúa phát thải thấp theo chuẩn VCS. Giảm 30% phân bón hóa học bằng cách sử dụng phân bón hữu cơ vi sinh ASTRI Organic. Năng suất lúa tăng 8% so với đối chứng.'
      : 'Low-emission rice farming model per VCS standard. Reduced chemical fertiliser by 30% using ASTRI Organic microbial fertiliser. Rice yield up 8% versus control plots.',
    tags: [isVi ? 'Carbon tín chỉ' : 'Carbon Credit', isVi ? 'Lúa gạo' : 'Rice'],
  },
  {
    icon: Tractor,
    title: isVi ? 'Trang trại tổng hợp Bình Dương' : 'Binh Duong Integrated Farm',
    area: '15 ha',
    year: '2023',
    result: isVi
      ? 'Hệ thống IoT 200 điểm cảm biến giám sát đất, nước, vi khí hậu. Phát hiện sâu bệnh sớm hơn 7 ngày. Tiết kiệm 25% nước tưới và 20% công lao động giám sát.'
      : '200-node IoT system monitoring soil, water, and microclimate. Early pest detection 7 days ahead. Saved 25% irrigation water and 20% monitoring labour.',
    tags: ['IoT', isVi ? 'Tự động hóa' : 'Automation'],
  },
]

export default async function ResultsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Nghiên cứu' : 'Research'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Kết quả Nghiên cứu' : 'Research Results'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Từ nghiên cứu cơ bản đến sản phẩm thương mại và chuyển giao công nghệ – ASTRI biến kết quả khoa học thành giá trị thực tiễn cho nông dân và doanh nghiệp.'
                : 'From fundamental research to commercial products and technology transfer – ASTRI turns scientific results into real value for farmers and enterprises.'}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <section style={{ background: 'var(--bg)', padding: '3rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Award,
                  value: '1',
                  label: isVi ? 'Sáng chế đăng ký' : 'Patent application',
                  sub: isVi ? 'Cục SHTT chấp nhận đơn' : 'Accepted by IP Office',
                },
                {
                  icon: ShoppingBag,
                  value: '3',
                  label: isVi ? 'Dòng sản phẩm thương mại hóa' : 'Commercialised product lines',
                  sub: isVi ? 'Phân bón, tinh dầu, thiết bị IoT' : 'Fertiliser, essential oil, IoT device',
                },
                {
                  icon: FlaskConical,
                  value: '5+',
                  label: isVi ? 'Mô hình thử nghiệm thực địa' : 'Field pilot models',
                  sub: isVi ? 'Trải rộng 4 tỉnh thành' : 'Across 4 provinces',
                },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="rounded-xl p-6 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: 'var(--green-50)' }}>
                      <Icon size={22} style={{ color: 'var(--green-700)' }} />
                    </div>
                    <p className="text-4xl font-bold mb-1" style={{ color: 'var(--green-700)' }}>{stat.value}</p>
                    <p className="font-semibold" style={{ color: 'var(--text-1)' }}>{stat.label}</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{stat.sub}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured: Patent */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Sáng chế Nổi bật' : 'Featured Patent'}
            </h2>
            <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, var(--green-950), var(--green-800))', border: '1px solid var(--green-700)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} style={{ color: 'var(--green-300)' }} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--green-300)' }}>
                  {isVi ? 'Đăng ký Sáng chế · 2024' : 'Patent Application · 2024'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {isVi
                  ? 'Hệ thống xử lý nước thải tích hợp ba chức năng cho ao nuôi trồng thủy sản'
                  : 'Tri-Function Integrated Wastewater Treatment System for Aquaculture Ponds'}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: '48rem' }}>
                {isVi
                  ? 'Sáng chế mô tả một hệ thống xử lý nước thải ao tôm kết hợp đồng thời ba cơ chế: (1) lọc sinh học đa lớp với màng vi sinh vật MBBR, (2) khoáng hóa hợp chất hữu cơ bằng vi khuẩn phân giải đặc hiệu, và (3) tái tuần hoàn nước đã xử lý theo chu trình khép kín. Đơn đăng ký đã được Cục Sở hữu Trí tuệ Việt Nam chấp nhận theo hệ thống PCT.'
                  : 'The patent describes a shrimp pond wastewater treatment system simultaneously combining three mechanisms: (1) multi-layer biological filtration with MBBR biofilm, (2) mineralisation of organic compounds by specialised degrading bacteria, and (3) closed-loop recirculation of treated water. The application has been accepted by the National Office of Intellectual Property of Vietnam under the PCT system.'}
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                {['MBBR', 'QCVN 40:2011', 'PCT Application', isVi ? 'Cục SHTT VN' : 'IP Office Vietnam'].map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Sản phẩm Thương mại hóa' : 'Commercialised Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Leaf,
                  name: isVi ? 'Phân bón Hữu cơ Vi sinh ASTRI Organic' : 'ASTRI Organic Microbial Fertiliser',
                  launch: 'Q1 2024',
                  desc: isVi
                    ? 'Chứa các chủng vi khuẩn cố định đạm Azospirillum brasilense, hòa tan lân Bacillus megaterium và nấm Trichoderma harzianum ức chế nấm bệnh. Đạt TCVN 9297:2012. Phân phối tại 5 tỉnh ĐBSCL.'
                    : 'Contains nitrogen-fixing Azospirillum brasilense, phosphate-solubilising Bacillus megaterium, and disease-suppressing Trichoderma harzianum. TCVN 9297:2012 certified. Distributed in 5 Mekong Delta provinces.',
                  cert: 'TCVN 9297:2012',
                },
                {
                  icon: FlaskConical,
                  name: isVi ? 'Tinh dầu Thiên nhiên Oresoi' : 'Oresoi Natural Essential Oils',
                  launch: 'Q2 2022',
                  desc: isVi
                    ? 'Dòng tinh dầu nguyên chất gồm: sả Java (Cymbopogon winterianus), tràm năm gân (Melaleuca quinquenervia), hương nhu trắng (Ocimum gratissimum). Chiết xuất bằng chưng cất hơi nước, phân tích GC-MS xác nhận thành phần.'
                    : 'Pure essential oil line including: Java citronella (Cymbopogon winterianus), broad-leaved paperbark (Melaleuca quinquenervia), and white basil (Ocimum gratissimum). Steam-distilled and GC-MS verified.',
                  cert: 'GC-MS Verified',
                },
                {
                  icon: BarChart3,
                  name: isVi ? 'Thiết bị IoT Giám sát Nông nghiệp' : 'Agricultural IoT Monitoring Device',
                  launch: 'Q4 2023',
                  desc: isVi
                    ? 'Node cảm biến đa thông số đo: độ ẩm đất, nhiệt độ, pH, EC, ánh sáng PAR và lượng mưa. Kết nối LoRaWAN + 4G, pin năng lượng mặt trời, dashboard web và app di động. Đã lắp đặt tại 3 tỉnh.'
                    : 'Multi-parameter sensor node measuring soil moisture, temperature, pH, EC, PAR light, and rainfall. LoRaWAN + 4G connectivity, solar battery, web dashboard and mobile app. Installed in 3 provinces.',
                  cert: 'LoRaWAN Certified',
                },
              ].map((prod, i) => {
                const Icon = prod.icon
                return (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <div className="p-5 flex items-center gap-3" style={{ background: 'var(--surface)' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                        <Icon size={20} style={{ color: 'var(--green-700)' }} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{prod.name}</p>
                        <p className="text-xs" style={{ color: 'var(--text-3)' }}>{isVi ? 'Ra mắt' : 'Launched'}: {prod.launch}</p>
                      </div>
                    </div>
                    <div className="p-5" style={{ background: 'var(--bg)' }}>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-2)' }}>{prod.desc}</p>
                      <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                        {prod.cert}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technology Transfer Cases */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <ArrowRightLeft size={22} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Chuyển giao Công nghệ Tiêu biểu' : 'Representative Technology Transfers'}
              </h2>
            </div>
            <div className="space-y-6">
              {caseStudies(isVi).map((cs, i) => {
                const Icon = cs.icon
                return (
                  <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                        <Icon size={22} style={{ color: 'var(--green-700)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold" style={{ color: 'var(--text-1)' }}>{cs.title}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                            {cs.area} · {cs.year}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {cs.tags.map((tag, j) => (
                            <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{cs.result}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <TrendingDown size={20} style={{ color: 'var(--green-600)' }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

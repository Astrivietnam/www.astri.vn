import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Microscope,
  Tractor,
  Factory,
  Leaf,
  Construction,
  CheckCircle2,
  FlaskConical,
  Thermometer,
  Wifi,
  DropletIcon,
} from 'lucide-react'

const facilities = (isVi: boolean) => [
  {
    icon: Microscope,
    tag: isVi ? 'Vi sinh & Phân tích' : 'Microbiology & Analysis',
    title: isVi ? 'Phòng thí nghiệm Vi sinh' : 'Microbiology Laboratory',
    location: isVi ? 'Trụ sở chính – TP. Hồ Chí Minh' : 'Headquarters – Ho Chi Minh City',
    equipment: isVi
      ? [
          'Máy PCR Real-time (Applied Biosystems)',
          'Kính hiển vi huỳnh quang Olympus BX53',
          'Tủ cấy vi sinh an toàn sinh học cấp 2',
          'Hệ thống HPLC phân tích dư lượng thuốc BVTV',
          'Máy đo quang phổ UV-Vis Shimadzu UV-1900',
          'Lò đốt vi sóng phân hủy mẫu Anton Paar',
          'Tủ ấm lắc nhiều vị trí 100–300 rpm',
          'Hệ thống lọc vô trùng quy mô pilot',
        ]
      : [
          'Real-time PCR system (Applied Biosystems)',
          'Olympus BX53 fluorescence microscope',
          'Class II biosafety laminar flow cabinet',
          'HPLC system for pesticide residue analysis',
          'Shimadzu UV-1900 UV-Vis spectrophotometer',
          'Anton Paar microwave digestion system',
          'Multi-position shaking incubator 100–300 rpm',
          'Pilot-scale sterile filtration system',
        ],
  },
  {
    icon: Tractor,
    tag: isVi ? 'Trang trại Thực nghiệm' : 'Research Farm',
    title: isVi ? 'Trang trại Bình Dương' : 'Binh Duong Farm',
    location: isVi ? 'Huyện Bàu Bàng, Bình Dương' : 'Bau Bang District, Binh Duong Province',
    equipment: isVi
      ? [
          'Diện tích: 15 ha đất nông nghiệp',
          'Khu trồng cây dược liệu & tinh dầu: 5 ha',
          'Khu mô hình canh tác tích hợp: 4 ha',
          'Ao nuôi trồng thủy sản thực nghiệm: 2 ha',
          'Nhà màng công nghệ cao 3.000 m²',
          'Hệ thống tưới nhỏ giọt Israel Netafim',
          'Trạm quan trắc thời tiết tự động Davis',
          'Hệ thống camera AI giám sát sâu bệnh',
        ]
      : [
          'Area: 15 ha of agricultural land',
          'Medicinal plant & essential oil zone: 5 ha',
          'Integrated farming model zone: 4 ha',
          'Experimental aquaculture ponds: 2 ha',
          'High-tech greenhouse: 3,000 m²',
          'Netafim (Israel) drip irrigation system',
          'Davis automatic weather station',
          'AI camera system for pest monitoring',
        ],
  },
  {
    icon: Factory,
    tag: isVi ? 'Sản xuất & Thử nghiệm' : 'Production & Pilot',
    title: isVi ? 'Xưởng Sản xuất Phân bón Hữu cơ' : 'Organic Fertiliser Production Workshop',
    location: isVi ? 'Khu công nghiệp Bàu Bàng, Bình Dương' : 'Bau Bang Industrial Zone, Binh Duong',
    equipment: isVi
      ? [
          'Công suất: 500 tấn/năm (quy mô pilot)',
          'Dây chuyền ủ phân hữu cơ vi sinh hiếu khí',
          'Máy phối trộn và đóng gói tự động',
          'Bồn lên men vi sinh thể tích 5.000 lít',
          'Hệ thống kiểm soát nhiệt độ & ẩm độ tự động',
          'Phòng KCS kiểm tra chất lượng sản phẩm',
          'Kho bảo quản điều tiết khí hậu 1.000 m²',
          'Chứng nhận TCVN 9297:2012 phân bón hữu cơ vi sinh',
        ]
      : [
          'Capacity: 500 tonnes/year (pilot scale)',
          'Aerobic composting line with microbial inoculants',
          'Automatic blending and packaging line',
          'Microbial fermentation tank: 5,000 litres',
          'Automatic temperature & humidity control system',
          'QC laboratory for product quality inspection',
          'Climate-controlled storage: 1,000 m²',
          'TCVN 9297:2012 certified organic-microbial fertiliser',
        ],
  },
  {
    icon: Leaf,
    tag: isVi ? 'R&D Tinh dầu' : 'Essential Oil R&D',
    title: isVi ? 'Phòng R&D Tinh dầu Oresoi' : 'Oresoi Essential Oil R&D Lab',
    location: isVi ? 'Trang trại Bình Dương' : 'Binh Duong Farm',
    equipment: isVi
      ? [
          'Hệ thống chưng cất hơi nước 200 lít/mẻ',
          'Thiết bị chiết xuất CO₂ siêu tới hạn SFE-CO₂',
          'GC-MS phân tích thành phần tinh dầu Agilent 8890',
          'Máy đo chỉ số khúc xạ và độ tinh khiết',
          'Tủ ổn định mẫu -20°C và kho lạnh +4°C',
          'Khu vùng trồng nguyên liệu: sả, tràm, hương nhu',
          'Quy trình đạt HACCP dự kiến cấp 2025',
        ]
      : [
          '200-litre/batch steam distillation system',
          'Supercritical CO₂ extraction unit (SFE-CO₂)',
          'Agilent 8890 GC-MS for essential oil analysis',
          'Refractive index and purity analyser',
          '-20°C sample stabiliser and +4°C cold storage',
          'Raw material cultivation: lemongrass, cajuput, basil',
          'HACCP process – certification planned 2025',
        ],
  },
]

const planned = (isVi: boolean) => [
  {
    title: isVi ? 'Phòng thí nghiệm Di truyền Phân tử' : 'Molecular Genetics Laboratory',
    desc: isVi ? 'Giải trình tự gen thế hệ mới (NGS), chọn tạo giống cây trồng chịu hạn, chịu mặn' : 'Next-generation sequencing (NGS), drought- and salinity-tolerant crop breeding',
    year: '2025–2026',
  },
  {
    title: isVi ? 'Trung tâm R&D Blockchain Nông sản' : 'Agri-Blockchain R&D Centre',
    desc: isVi ? 'Hạ tầng blockchain truy xuất nguồn gốc nông sản, tích hợp với nền tảng IoT trang trại' : 'Blockchain traceability infrastructure for agri-products, integrated with farm IoT platforms',
    year: '2026',
  },
  {
    title: isVi ? 'Trang trại Mô hình Carbon Tín chỉ' : 'Carbon Credit Model Farm',
    desc: isVi ? '1.500 ha lúa tại An Giang, đo đạc phát thải bằng thiết bị eddy covariance' : '1,500 ha rice in An Giang, emissions measured with eddy covariance equipment',
    year: '2025–2027',
  },
  {
    title: isVi ? 'Phòng thí nghiệm Chất lượng Nước' : 'Water Quality Laboratory',
    desc: isVi ? 'Phân tích AOX, kim loại nặng, vi khuẩn gây bệnh trong nước ao nuôi thủy sản' : 'Analysis of AOX, heavy metals, and pathogenic bacteria in aquaculture pond water',
    year: '2026',
  },
]

export default async function FacilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isVi ? 'Về ASTRI' : 'About ASTRI'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Cơ sở Vật chất & Trang thiết bị' : 'Facilities & Equipment'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI đầu tư hệ thống phòng thí nghiệm hiện đại, trang trại thực nghiệm và xưởng sản xuất pilot để đảm bảo năng lực nghiên cứu và chuyển giao công nghệ đạt tiêu chuẩn quốc tế.'
                : 'ASTRI invests in modern laboratories, experimental farms, and pilot production workshops to ensure research and technology transfer capabilities meeting international standards.'}
            </p>
          </div>
        </div>

        {/* Facility Cards */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {facilities(isVi).map((fac, i) => {
                const Icon = fac.icon
                return (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <div className="p-6" style={{ background: 'var(--green-950)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
                          <Icon size={20} style={{ color: 'var(--green-300)' }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--green-300)' }}>{fac.tag}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">{fac.title}</h3>
                      <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{fac.location}</p>
                    </div>
                    <div className="p-6" style={{ background: 'var(--surface)' }}>
                      <ul className="space-y-2">
                        {fac.equipment.map((eq, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                            <CheckCircle2 size={15} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                            {eq}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Under Development */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Construction size={22} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đang Đầu tư & Mở rộng' : 'Under Development & Expansion'}
              </h2>
            </div>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? 'Các hạng mục cơ sở vật chất đang được đầu tư để nâng cao năng lực giai đoạn 2025–2027'
                : 'Infrastructure items being invested to expand capacity during 2025–2027'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {planned(isVi).map((p, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold" style={{ color: 'var(--text-1)' }}>{p.title}</h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-full ml-3 flex-shrink-0" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                      {p.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section style={{ background: 'var(--bg)', padding: '3rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { icon: FlaskConical, value: '4', label: isVi ? 'Phòng thí nghiệm' : 'Laboratories' },
                { icon: Tractor, value: '15 ha', label: isVi ? 'Trang trại thực nghiệm' : 'Experimental farm' },
                { icon: Thermometer, value: '500 t/năm', label: isVi ? 'Công suất phân bón' : 'Fertiliser capacity' },
                { icon: Wifi, value: '200+', label: isVi ? 'Điểm cảm biến IoT' : 'IoT sensor nodes' },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="rounded-xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <Icon size={24} className="mx-auto mb-2" style={{ color: 'var(--green-600)' }} />
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{stat.value}</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>{stat.label}</p>
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

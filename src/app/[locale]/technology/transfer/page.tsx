import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ClipboardList,
  Lightbulb,
  Wrench,
  HeadphonesIcon,
  Wifi,
  Link2,
  Cpu,
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  Phone,
  Mail,
  MapPin,
  Fish,
} from 'lucide-react'

const steps = (isVi: boolean) => [
  {
    icon: ClipboardList,
    step: '01',
    title: isVi ? 'Đánh giá Nhu cầu' : 'Needs Assessment',
    desc: isVi
      ? 'Chuyên gia ASTRI khảo sát thực địa, phân tích hiện trạng sản xuất, xác định các điểm nghẽn kỹ thuật và tiềm năng ứng dụng công nghệ. Báo cáo đánh giá được giao trong vòng 5 ngày làm việc.'
      : 'ASTRI experts conduct field surveys, analyse current production status, identify technical bottlenecks, and assess technology application potential. Assessment report delivered within 5 business days.',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: isVi ? 'Tư vấn Giải pháp' : 'Solution Consulting',
    desc: isVi
      ? 'Đề xuất gói công nghệ phù hợp với quy mô, ngân sách và đặc thù sản xuất của khách hàng. Trình bày mô phỏng hiệu quả kinh tế, phân tích ROI và lộ trình triển khai chi tiết.'
      : 'Propose technology packages suited to the client\'s scale, budget, and production specifics. Present economic efficiency simulations, ROI analysis, and detailed implementation roadmap.',
  },
  {
    icon: Wrench,
    step: '03',
    title: isVi ? 'Triển khai & Đào tạo' : 'Deployment & Training',
    desc: isVi
      ? 'Đội kỹ sư ASTRI trực tiếp lắp đặt, cấu hình hệ thống và đào tạo vận hành cho cán bộ kỹ thuật của khách hàng. Tài liệu hướng dẫn bằng tiếng Việt. Thời gian triển khai trung bình 2–4 tuần.'
      : 'ASTRI engineers directly install, configure the system, and train client technical staff in operations. Vietnamese-language guidance materials provided. Average deployment time: 2–4 weeks.',
  },
  {
    icon: HeadphonesIcon,
    step: '04',
    title: isVi ? 'Hỗ trợ Vận hành' : 'Operational Support',
    desc: isVi
      ? 'Hỗ trợ kỹ thuật từ xa 24/7 trong 12 tháng đầu. Kiểm tra định kỳ 3 tháng/lần, cập nhật phần mềm và hiệu chỉnh cảm biến. Cam kết SLA uptime 99% cho hệ thống IoT và phần mềm quản lý.'
      : '24/7 remote technical support for the first 12 months. Quarterly periodic check-ups, software updates, and sensor calibration. SLA 99% uptime commitment for IoT systems and management software.',
  },
]

const packages = (isVi: boolean) => [
  {
    icon: Wifi,
    tier: isVi ? 'Gói Cơ bản' : 'Basic Package',
    name: isVi ? 'IoT Giám sát Môi trường' : 'Environmental IoT Monitoring',
    price: isVi ? 'Từ 45 triệu đồng' : 'From VND 45 million',
    desc: isVi
      ? 'Phù hợp trang trại, ao nuôi quy mô dưới 20 ha. Lắp đặt 10–30 node cảm biến đo độ ẩm đất, nhiệt độ, pH, EC. Dashboard web và app di động. Cảnh báo tự động qua SMS/Zalo.'
      : 'Suitable for farms and ponds under 20 ha. Install 10–30 sensor nodes measuring soil moisture, temperature, pH, EC. Web dashboard and mobile app. Automatic SMS/Zalo alerts.',
    features: isVi
      ? ['10–30 node cảm biến LoRaWAN', 'Dashboard thời gian thực', 'App di động iOS & Android', 'Cảnh báo qua SMS/Zalo', 'Lưu trữ dữ liệu 2 năm', 'Hỗ trợ kỹ thuật 12 tháng']
      : ['10–30 LoRaWAN sensor nodes', 'Real-time dashboard', 'iOS & Android mobile app', 'SMS/Zalo alerts', '2-year data storage', '12-month technical support'],
  },
  {
    icon: Link2,
    tier: isVi ? 'Gói Nâng cao' : 'Advanced Package',
    name: isVi ? 'Truy xuất Blockchain' : 'Blockchain Traceability',
    price: isVi ? 'Từ 120 triệu đồng' : 'From VND 120 million',
    desc: isVi
      ? 'Dành cho hợp tác xã, doanh nghiệp xuất khẩu cần chứng minh nguồn gốc sản phẩm. Ghi nhận toàn bộ dữ liệu sản xuất lên blockchain Hyperledger Fabric. QR Code truy xuất cho người tiêu dùng.'
      : 'For cooperatives and export enterprises needing product origin proof. Records all production data on Hyperledger Fabric blockchain. QR code traceability for consumers.',
    features: isVi
      ? ['Giao diện nhập liệu truy xuất', 'Blockchain Hyperledger Fabric', 'QR Code sản phẩm', 'Tích hợp IoT (tuỳ chọn)', 'Báo cáo xuất khẩu', 'Chứng nhận GLOBALG.A.P. hỗ trợ']
      : ['Traceability data entry interface', 'Hyperledger Fabric blockchain', 'Product QR codes', 'IoT integration (optional)', 'Export reports', 'GLOBALG.A.P. certification support'],
  },
  {
    icon: Cpu,
    tier: isVi ? 'Gói Toàn diện' : 'Comprehensive Package',
    name: isVi ? 'IoT + AI + Blockchain' : 'IoT + AI + Blockchain',
    price: isVi ? 'Từ 350 triệu đồng' : 'From VND 350 million',
    desc: isVi
      ? 'Giải pháp chuyển đổi số toàn diện cho trang trại thông minh. Kết hợp giám sát IoT thời gian thực, phân tích AI dự báo sâu bệnh và biến động thị trường, và blockchain truy xuất chuỗi cung ứng.'
      : 'Comprehensive digital transformation solution for smart farms. Combines real-time IoT monitoring, AI analysis for pest and market forecasting, and blockchain supply chain traceability.',
    features: isVi
      ? ['Tất cả tính năng Gói IoT', 'AI phát hiện sâu bệnh từ ảnh', 'Mô hình dự báo năng suất', 'Blockchain truy xuất đầy đủ', 'Tích hợp ERP/kế toán', 'Đào tạo chuyên sâu 3 ngày', 'SLA 99% uptime']
      : ['All IoT Package features', 'AI pest detection from images', 'Yield forecasting model', 'Full blockchain traceability', 'ERP/accounting integration', '3-day in-depth training', '99% uptime SLA'],
    highlight: true,
  },
]

export default async function TransferPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isVi ? 'Công nghệ' : 'Technology'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Chuyển giao Công nghệ' : 'Technology Transfer'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI đồng hành cùng doanh nghiệp và hợp tác xã nông nghiệp trong từng bước số hóa quy trình sản xuất – từ cảm biến IoT, AI phân tích dữ liệu đến blockchain truy xuất nguồn gốc.'
                : 'ASTRI partners with agricultural enterprises and cooperatives at every step of production digitalisation – from IoT sensors and AI data analysis to blockchain traceability.'}
            </p>
          </div>
        </div>

        {/* Process steps */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Quy trình Chuyển giao' : 'Transfer Process'}
            </h2>
            <p className="mb-10" style={{ color: 'var(--text-2)' }}>
              {isVi ? '4 bước đảm bảo triển khai thành công' : '4 steps to guarantee successful deployment'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps(isVi).map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="rounded-xl p-6 relative" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="text-5xl font-black mb-4 select-none" style={{ color: 'var(--green-50)', lineHeight: 1 }}>
                      {s.step}
                    </div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'var(--green-50)' }}>
                      <Icon size={20} style={{ color: 'var(--green-700)' }} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
                    {i < 3 && (
                      <ArrowRight
                        size={16}
                        style={{ color: 'var(--green-600)', position: 'absolute', right: '-8px', top: '50%', transform: 'translateY(-50%)', display: 'none' }}
                        className="lg:block"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Technology Packages */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Gói Công nghệ' : 'Technology Packages'}
            </h2>
            <p className="mb-10" style={{ color: 'var(--text-2)' }}>
              {isVi ? 'Chọn gói phù hợp với quy mô và nhu cầu của bạn' : 'Choose the package matching your scale and needs'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages(isVi).map((pkg, i) => {
                const Icon = pkg.icon
                return (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden flex flex-col"
                    style={{
                      border: pkg.highlight ? '2px solid var(--green-600)' : '1px solid var(--border)',
                      background: pkg.highlight ? 'var(--green-950)' : 'var(--bg)',
                    }}
                  >
                    {pkg.highlight && (
                      <div className="px-6 py-2 text-center text-xs font-bold uppercase tracking-widest" style={{ background: 'var(--green-600)', color: '#fff' }}>
                        {isVi ? 'Phổ biến nhất' : 'Most Popular'}
                      </div>
                    )}
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: pkg.highlight ? 'rgba(255,255,255,0.1)' : 'var(--green-50)' }}>
                          <Icon size={20} style={{ color: pkg.highlight ? 'var(--green-300)' : 'var(--green-700)' }} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: pkg.highlight ? 'var(--green-300)' : 'var(--green-600)' }}>{pkg.tier}</p>
                          <p className="font-bold text-sm" style={{ color: pkg.highlight ? '#fff' : 'var(--text-1)' }}>{pkg.name}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold mb-3" style={{ color: pkg.highlight ? 'var(--green-300)' : 'var(--green-700)' }}>{pkg.price}</p>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: pkg.highlight ? 'rgba(255,255,255,0.7)' : 'var(--text-2)' }}>{pkg.desc}</p>
                      <ul className="space-y-2">
                        {pkg.features.map((feat, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm" style={{ color: pkg.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-2)' }}>
                            <CheckCircle2 size={14} style={{ color: pkg.highlight ? 'var(--green-300)' : 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-6 pb-6">
                      <a
                        href={`mailto:chuyen.giao@astri.vn?subject=${encodeURIComponent(pkg.name)}`}
                        className="block text-center py-3 rounded-xl text-sm font-semibold"
                        style={{
                          background: pkg.highlight ? 'var(--green-500)' : 'var(--green-50)',
                          color: pkg.highlight ? '#fff' : 'var(--green-700)',
                          border: pkg.highlight ? 'none' : '1px solid var(--green-300)',
                        }}
                      >
                        {isVi ? 'Yêu cầu tư vấn' : 'Request Consultation'}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case Study: Ca Mau */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Case Study Tiêu biểu' : 'Featured Case Study'}
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <div className="p-8" style={{ background: 'var(--green-950)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Fish size={22} style={{ color: 'var(--green-300)' }} />
                  <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--green-300)' }}>
                    {isVi ? 'Trang trại Tôm · Cà Mau · 2024' : 'Shrimp Farm · Ca Mau · 2024'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isVi
                    ? 'HTX Nuôi tôm Sông Đốc – 100 ha ao tôm thẻ chân trắng'
                    : 'Song Doc Shrimp Cooperative – 100 ha Pacific White Shrimp Ponds'}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: '48rem' }}>
                  {isVi
                    ? 'HTX Sông Đốc (Cà Mau) vận hành 100 ha ao tôm thẻ chân trắng với hệ thống xử lý nước thải cũ gây ô nhiễm nguồn nước và chi phí vận hành cao. ASTRI triển khai Gói Toàn diện IoT + hệ thống xử lý nước thải tích hợp ba chức năng trong 6 tuần.'
                    : 'Song Doc Cooperative (Ca Mau) operates 100 ha of Pacific white shrimp ponds with outdated wastewater treatment causing water pollution and high operational costs. ASTRI deployed the Comprehensive IoT Package + tri-function integrated wastewater treatment system within 6 weeks.'}
                </p>
              </div>
              <div className="p-8" style={{ background: 'var(--surface)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  {[
                    {
                      icon: TrendingDown,
                      value: '30%',
                      label: isVi ? 'Giảm chi phí vận hành' : 'Operating cost reduction',
                      sub: isVi ? 'Trong 6 tháng đầu' : 'In first 6 months',
                    },
                    {
                      icon: CheckCircle2,
                      value: '85%',
                      label: isVi ? 'Tỷ lệ sống của tôm' : 'Shrimp survival rate',
                      sub: isVi ? 'Tăng từ 62%' : 'Up from 62%',
                    },
                    {
                      icon: Fish,
                      value: 'QCVN 40',
                      label: isVi ? 'Chất lượng nước xả' : 'Discharge water quality',
                      sub: isVi ? 'Đạt tiêu chuẩn quốc gia' : 'Meets national standard',
                    },
                  ].map((kpi, i) => {
                    const Icon = kpi.icon
                    return (
                      <div key={i} className="text-center rounded-xl p-5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        <Icon size={22} className="mx-auto mb-2" style={{ color: 'var(--green-600)' }} />
                        <p className="text-2xl font-bold" style={{ color: 'var(--green-700)' }}>{kpi.value}</p>
                        <p className="font-medium text-sm" style={{ color: 'var(--text-1)' }}>{kpi.label}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{kpi.sub}</p>
                      </div>
                    )
                  })}
                </div>
                <blockquote className="rounded-xl p-5" style={{ background: 'var(--bg)', borderLeft: '3px solid var(--green-600)' }}>
                  <p className="italic" style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {isVi
                      ? '"Sau 6 tháng vận hành hệ thống ASTRI, chúng tôi tiết kiệm được gần 1,2 tỷ đồng chi phí xử lý nước. Tỷ lệ hao hụt tôm giảm đáng kể và chúng tôi không còn lo ngại về các đợt thanh tra môi trường nữa."'
                      : '"After 6 months operating the ASTRI system, we saved nearly VND 1.2 billion in water treatment costs. Shrimp mortality dropped significantly and we no longer worry about environmental inspections."'}
                  </p>
                  <p className="text-sm font-semibold mt-3" style={{ color: 'var(--text-1)' }}>
                    {isVi ? '— Ông Nguyễn Thanh Phong, Giám đốc HTX Sông Đốc' : '— Mr. Nguyen Thanh Phong, Director, Song Doc Cooperative'}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Contact */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, var(--green-950), var(--green-800))', border: '1px solid var(--green-700)' }}>
              <h2 className="text-2xl font-bold text-white mb-3">
                {isVi ? 'Sẵn sàng chuyển đổi số trang trại của bạn?' : 'Ready to digitalise your farm?'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 2rem', lineHeight: 1.75 }}>
                {isVi
                  ? 'Liên hệ đội ngũ chuyên gia ASTRI để được tư vấn miễn phí và khảo sát thực địa. Chúng tôi có mặt tại TP.HCM, Bình Dương, Cà Mau và An Giang.'
                  : 'Contact the ASTRI expert team for a free consultation and field survey. We are present in Ho Chi Minh City, Binh Duong, Ca Mau, and An Giang.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                {[
                  { icon: Phone, text: '0901 234 567', href: 'tel:0901234567' },
                  { icon: Mail, text: 'chuyen.giao@astri.vn', href: 'mailto:chuyen.giao@astri.vn' },
                  { icon: MapPin, text: isVi ? 'Văn phòng TP. HCM' : 'Ho Chi Minh City Office', href: '/contact' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={i}
                      href={item.href}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
                      style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <Icon size={16} />
                      {item.text}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Sprout, FlaskConical, Droplets, Wifi, BadgeCheck, Fish, CheckCircle2, ArrowRight } from 'lucide-react'

const SERVICES = {
  vi: [
    {
      icon: Sprout,
      title: 'Tư vấn mô hình nông nghiệp thông minh',
      desc: 'Khảo sát hiện trạng, lập kế hoạch chuyển đổi và triển khai mô hình nông nghiệp công nghệ cao phù hợp với điều kiện địa phương và quy mô sản xuất.',
    },
    {
      icon: FlaskConical,
      title: 'Tư vấn quy trình sản xuất hữu cơ',
      desc: 'Xây dựng quy trình canh tác hữu cơ từ cải tạo đất, sử dụng phân bón vi sinh đến quản lý dịch hại tổng hợp, hướng đến chứng nhận hữu cơ quốc tế.',
    },
    {
      icon: FlaskConical,
      title: 'Kiểm tra & phân tích chất lượng đất/nước',
      desc: 'Lấy mẫu và phân tích tại phòng thí nghiệm được công nhận, cung cấp kết quả chi tiết về pH, dinh dưỡng, kim loại nặng và vi sinh vật có hại.',
    },
    {
      icon: Droplets,
      title: 'Thiết kế hệ thống tưới tiêu thông minh',
      desc: 'Tính toán và thiết kế hệ thống tưới nhỏ giọt, phun sương kết hợp cảm biến độ ẩm và điều khiển từ xa, tiết kiệm 40–60% lượng nước so với tưới truyền thống.',
    },
    {
      icon: BadgeCheck,
      title: 'Tư vấn chứng nhận VietGAP/Hữu cơ',
      desc: 'Hỗ trợ hồ sơ, hướng dẫn thực hành và đồng hành toàn bộ quá trình đánh giá chứng nhận VietGAP, hữu cơ Việt Nam và hữu cơ quốc tế (USDA, EU Organic).',
    },
    {
      icon: Fish,
      title: 'Xử lý môi trường nuôi trồng thủy sản',
      desc: 'Khảo sát và tư vấn giải pháp xử lý nước, kiểm soát mầm bệnh, bổ sung vi sinh có lợi trong ao nuôi tôm thâm canh và siêu thâm canh.',
    },
  ],
  en: [
    {
      icon: Sprout,
      title: 'Smart Farming Model Consulting',
      desc: 'Site assessment, transition planning, and implementation of high-tech farming models tailored to local conditions and production scale.',
    },
    {
      icon: FlaskConical,
      title: 'Organic Production Process Consulting',
      desc: 'Building organic farming procedures — from soil remediation and microbial fertilizer use to integrated pest management — targeting international organic certification.',
    },
    {
      icon: FlaskConical,
      title: 'Soil & Water Quality Testing and Analysis',
      desc: 'Sampling and analysis in accredited laboratories, delivering detailed results on pH, nutrients, heavy metals, and harmful microorganisms.',
    },
    {
      icon: Droplets,
      title: 'Smart Irrigation System Design',
      desc: 'Engineering drip and mist irrigation systems integrated with moisture sensors and remote control, saving 40–60% of water compared to conventional irrigation.',
    },
    {
      icon: BadgeCheck,
      title: 'VietGAP / Organic Certification Consulting',
      desc: 'Document support, practice guidance, and full accompaniment through VietGAP, Vietnam Organic, and international organic certification audits (USDA, EU Organic).',
    },
    {
      icon: Fish,
      title: 'Aquaculture Environment Management',
      desc: 'Site survey and advisory on water treatment, pathogen control, and beneficial microbial supplementation for intensive and super-intensive shrimp ponds.',
    },
  ],
}

const STEPS = {
  vi: [
    { step: '01', title: 'Tiếp nhận & khảo sát', desc: 'Lắng nghe nhu cầu, khảo sát thực địa và thu thập số liệu hiện trạng sản xuất.' },
    { step: '02', title: 'Đánh giá & đề xuất giải pháp', desc: 'Phân tích số liệu, xây dựng báo cáo đánh giá và đề xuất phương án tối ưu.' },
    { step: '03', title: 'Triển khai & giám sát', desc: 'Phối hợp triển khai theo kế hoạch, giám sát tiến độ và điều chỉnh kịp thời.' },
    { step: '04', title: 'Nghiệm thu & hỗ trợ sau dịch vụ', desc: 'Đánh giá kết quả, bàn giao tài liệu kỹ thuật và hỗ trợ vận hành trong 6 tháng đầu.' },
  ],
  en: [
    { step: '01', title: 'Intake & Site Survey', desc: 'Understanding your needs, conducting field surveys, and gathering baseline production data.' },
    { step: '02', title: 'Assessment & Solution Proposal', desc: 'Analyzing data, producing an assessment report, and proposing the optimal approach.' },
    { step: '03', title: 'Implementation & Monitoring', desc: 'Collaborative rollout according to plan, with progress monitoring and timely adjustments.' },
    { step: '04', title: 'Handover & After-Service Support', desc: 'Results review, technical documentation handover, and 6-month operational support.' },
  ],
}

const PRICING = {
  vi: [
    {
      tier: 'Tư vấn cơ bản',
      price: 'Miễn phí lần đầu',
      color: 'var(--green-600)',
      features: [
        'Tư vấn trực tiếp hoặc trực tuyến 60 phút',
        'Đánh giá sơ bộ hiện trạng',
        'Khuyến nghị giải pháp tổng quan',
        'Báo giá dịch vụ chi tiết nếu cần',
      ],
    },
    {
      tier: 'Gói chuẩn',
      price: 'Liên hệ báo giá',
      color: 'var(--green-700)',
      features: [
        'Khảo sát thực địa đầy đủ',
        'Phân tích đất/nước tối đa 5 mẫu',
        'Báo cáo kỹ thuật chi tiết',
        'Hỗ trợ triển khai và đào tạo nhân lực',
        'Hỗ trợ sau dịch vụ 3 tháng',
      ],
    },
    {
      tier: 'Gói doanh nghiệp',
      price: 'Theo hợp đồng',
      color: 'var(--green-800)',
      features: [
        'Toàn bộ dịch vụ Gói chuẩn',
        'Thiết kế hệ thống toàn diện',
        'Hỗ trợ chứng nhận VietGAP/Hữu cơ',
        'Đào tạo đội ngũ kỹ thuật nội bộ',
        'Hỗ trợ sau dịch vụ 12 tháng',
        'Ưu tiên phản hồi trong 24 giờ',
      ],
    },
  ],
  en: [
    {
      tier: 'Basic Consulting',
      price: 'Free first session',
      color: 'var(--green-600)',
      features: [
        '60-minute in-person or online consultation',
        'Preliminary status assessment',
        'High-level solution recommendations',
        'Detailed service quote upon request',
      ],
    },
    {
      tier: 'Standard Package',
      price: 'Contact for quote',
      color: 'var(--green-700)',
      features: [
        'Full site survey',
        'Soil/water analysis up to 5 samples',
        'Detailed technical report',
        'Implementation support and staff training',
        '3-month after-service support',
      ],
    },
    {
      tier: 'Enterprise Package',
      price: 'By contract',
      color: 'var(--green-800)',
      features: [
        'All Standard Package services',
        'Comprehensive system design',
        'VietGAP/Organic certification support',
        'Internal technical team training',
        '12-month after-service support',
        'Priority 24-hour response',
      ],
    },
  ],
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const services = SERVICES[isVi ? 'vi' : 'en']
  const steps = STEPS[isVi ? 'vi' : 'en']
  const pricing = PRICING[isVi ? 'vi' : 'en']

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
              {isVi ? 'Tư vấn & Dịch vụ Kỹ thuật' : 'Consulting & Technical Services'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI cung cấp dịch vụ tư vấn kỹ thuật nông nghiệp toàn diện, từ thiết kế mô hình canh tác thông minh đến hỗ trợ chứng nhận chất lượng quốc tế.'
                : 'ASTRI provides comprehensive agricultural technical consulting — from smart farming model design to international quality certification support.'}
            </p>
          </div>
        </div>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Danh mục Dịch vụ' : 'Service Catalog'}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi ? 'Các dịch vụ tư vấn và kỹ thuật chuyên sâu của ASTRI' : 'ASTRI\'s specialized consulting and technical services'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-950)' }}>
                      <Icon size={20} style={{ color: 'var(--green-300)' }} />
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Quy trình Thực hiện' : 'Service Process'}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi ? '4 bước từ tư vấn ban đầu đến hỗ trợ sau dịch vụ' : '4 steps from initial consultation to after-service support'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="rounded-xl p-6 relative" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <p className="text-4xl font-black mb-3" style={{ color: 'var(--green-300)', opacity: 0.4 }}>{s.step}</p>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Bảng Giá Dịch vụ' : 'Service Pricing'}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi ? 'Lựa chọn gói dịch vụ phù hợp với quy mô và nhu cầu của bạn' : 'Choose the package that fits your scale and needs'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricing.map((p, i) => (
                <div key={i} className="rounded-xl p-6 flex flex-col" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-2 h-8 rounded-full mb-4" style={{ background: p.color }} />
                  <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>{p.tier}</h3>
                  <p className="text-xl font-semibold mb-6" style={{ color: 'var(--green-600)' }}>{p.price}</p>
                  <ul className="space-y-2 flex-1">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--green-950)', padding: '4rem 1rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isVi ? 'Bắt đầu tư vấn miễn phí' : 'Start a Free Consultation'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Đội ngũ chuyên gia ASTRI sẵn sàng hỗ trợ bạn tìm ra giải pháp nông nghiệp phù hợp nhất. Liên hệ ngay để được tư vấn lần đầu hoàn toàn miễn phí.'
                : 'The ASTRI expert team is ready to help you find the most suitable agricultural solution. Contact us now for a completely free first consultation.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--green-600)' }}
            >
              {isVi ? 'Liên hệ tư vấn' : 'Contact for Consulting'}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

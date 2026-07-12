import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Leaf, Wifi, Fish, ShoppingCart, Clock, Users, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react'

const COURSES = {
  vi: [
    {
      icon: Leaf,
      title: 'Canh tác hữu cơ & Phân bón vi sinh',
      duration: '3 ngày',
      audience: 'Nông dân, Hợp tác xã nông nghiệp',
      format: 'Kết hợp lý thuyết & thực hành tại trang trại',
      content: [
        'Nguyên tắc canh tác hữu cơ và các tiêu chuẩn VietGAP, hữu cơ Việt Nam',
        'Phân loại và cách sử dụng phân bón vi sinh ASTRI',
        'Kỹ thuật ủ compost và phân xanh từ phế phụ phẩm nông nghiệp',
        'Quản lý dịch hại tổng hợp (IPM) không dùng thuốc hóa học',
        'Thực hành trực tiếp tại trang trại thực nghiệm ASTRI',
        'Lập kế hoạch chuyển đổi sang canh tác hữu cơ',
      ],
      outcome: 'Học viên được cấp chứng chỉ hoàn thành khóa học và hướng dẫn thực hành chi tiết.',
    },
    {
      icon: Wifi,
      title: 'IoT & Số hóa trang trại',
      duration: '2 ngày',
      audience: 'Doanh nghiệp nông nghiệp, Hợp tác xã',
      format: 'Lý thuyết kết hợp thực hành với thiết bị thực tế',
      content: [
        'Tổng quan về IoT trong nông nghiệp thông minh',
        'Lắp đặt và vận hành cảm biến đất, nước, khí hậu',
        'Kết nối và giám sát dữ liệu qua ứng dụng di động',
        'Hệ thống tưới tiêu thông minh điều khiển tự động',
        'Giới thiệu blockchain trong truy xuất nguồn gốc nông sản',
        'Xây dựng hệ thống số hóa trang trại theo quy mô thực tế',
      ],
      outcome: 'Học viên có thể tự vận hành hệ thống IoT cơ bản và lập kế hoạch số hóa trang trại.',
    },
    {
      icon: Fish,
      title: 'Nuôi tôm siêu thâm canh & Xử lý nước',
      duration: '2 ngày',
      audience: 'Hộ nuôi thủy sản, Doanh nghiệp thủy sản',
      format: 'Thực hành tại ao nuôi mẫu tại Cà Mau',
      content: [
        'Kỹ thuật nuôi tôm thẻ chân trắng siêu thâm canh trong nhà kính',
        'Quản lý chất lượng nước: pH, độ kiềm, oxy hòa tan, vi sinh',
        'Sử dụng vi sinh ASTRI Aqua Boost cải thiện môi trường ao nuôi',
        'Phòng ngừa và xử lý các bệnh phổ biến trên tôm',
        'Hệ thống lọc nước tuần hoàn (RAS) quy mô nhỏ và vừa',
        'Ghi chép nhật ký ao nuôi và quản lý hồ sơ truy xuất',
      ],
      outcome: 'Áp dụng trực tiếp quy trình siêu thâm canh đã được ASTRI triển khai tại Cà Mau.',
    },
    {
      icon: ShoppingCart,
      title: 'Truy xuất nguồn gốc & Thương mại điện tử nông sản',
      duration: '1 ngày',
      audience: 'HTX, Doanh nghiệp, Cán bộ nông nghiệp',
      format: 'Hội thảo kết hợp thực hành demo hệ thống',
      content: [
        'Hệ thống truy xuất nguồn gốc blockchain: nguyên lý và ứng dụng',
        'Demo nền tảng truy xuất Shannon Vân Nam – ASTRI',
        'Đóng gói, nhãn mác và mã QR cho nông sản xuất khẩu',
        'Giới thiệu các sàn thương mại điện tử nông sản trong và ngoài nước',
        'Kỹ năng chụp ảnh, viết mô tả sản phẩm nông sản cho kênh online',
        'Xây dựng hồ sơ doanh nghiệp và quản lý đơn hàng trực tuyến',
      ],
      outcome: 'Hợp tác với Shannon Yunnan Information Technology – đối tác chiến lược của ASTRI từ Trung Quốc.',
    },
  ],
  en: [
    {
      icon: Leaf,
      title: 'Organic Farming & Microbial Fertilizers',
      duration: '3 days',
      audience: 'Farmers, Agricultural cooperatives',
      format: 'Theory combined with hands-on farm practice',
      content: [
        'Organic farming principles and VietGAP / Vietnam Organic standards',
        'Classification and use of ASTRI microbial fertilizers',
        'Composting techniques using agricultural by-products',
        'Integrated Pest Management (IPM) without chemical pesticides',
        'Hands-on practice at ASTRI experimental farm',
        'Transition planning for converting to organic farming',
      ],
      outcome: 'Participants receive a completion certificate and detailed practical guide.',
    },
    {
      icon: Wifi,
      title: 'IoT & Farm Digitalization',
      duration: '2 days',
      audience: 'Agricultural enterprises, Cooperatives',
      format: 'Theory combined with real-device hands-on practice',
      content: [
        'Overview of IoT in smart agriculture',
        'Installing and operating soil, water, and climate sensors',
        'Connecting and monitoring data via mobile application',
        'Automated smart irrigation control systems',
        'Introduction to blockchain for agricultural traceability',
        'Building a farm digitalization system at real scale',
      ],
      outcome: 'Participants can independently operate basic IoT systems and plan farm digitalization.',
    },
    {
      icon: Fish,
      title: 'Super-intensive Shrimp Farming & Water Treatment',
      duration: '2 days',
      audience: 'Aquaculture households, Aquaculture enterprises',
      format: 'Hands-on at model ponds in Ca Mau',
      content: [
        'Super-intensive white-leg shrimp farming techniques in greenhouses',
        'Water quality management: pH, alkalinity, dissolved oxygen, microorganisms',
        'Using ASTRI Aqua Boost probiotics to improve pond conditions',
        'Prevention and treatment of common shrimp diseases',
        'Small and medium-scale recirculating aquaculture systems (RAS)',
        'Pond logbook recording and traceability file management',
      ],
      outcome: 'Directly applies super-intensive procedures deployed by ASTRI in Ca Mau.',
    },
    {
      icon: ShoppingCart,
      title: 'Traceability & Agricultural E-commerce',
      duration: '1 day',
      audience: 'Cooperatives, Enterprises, Agricultural officers',
      format: 'Workshop with live system demo',
      content: [
        'Blockchain traceability systems: principles and applications',
        'Shannon Yunnan – ASTRI traceability platform demo',
        'Packaging, labeling, and QR codes for export produce',
        'Introduction to domestic and international agricultural e-commerce platforms',
        'Product photography and description writing for online channels',
        'Building a business profile and managing online orders',
      ],
      outcome: 'Developed in collaboration with Shannon Yunnan Information Technology — ASTRI\'s strategic partner from China.',
    },
  ],
}

const REQUIREMENTS = {
  vi: [
    'Không yêu cầu kinh nghiệm chuyên môn trước đó',
    'Học viên tự chuẩn bị trang phục phù hợp cho thực hành ngoài trời',
    'Nhóm từ 5 người trở lên được ưu tiên đặt lịch và hỗ trợ chi phí đi lại',
    'Chứng chỉ hoàn thành được ASTRI ký xác nhận',
    'Hỗ trợ bữa ăn trưa trong suốt khóa học',
  ],
  en: [
    'No prior professional experience required',
    'Participants should prepare appropriate attire for outdoor practice',
    'Groups of 5 or more receive scheduling priority and travel support',
    'Completion certificates are signed and verified by ASTRI',
    'Lunch provided throughout the training',
  ],
}

export default async function TechnicalTrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const courses = COURSES[isVi ? 'vi' : 'en']
  const requirements = REQUIREMENTS[isVi ? 'vi' : 'en']

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
              {isVi ? 'Tập huấn Kỹ thuật Nông nghiệp' : 'Agricultural Technical Training'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Các khóa tập huấn thực tiễn do chuyên gia ASTRI trực tiếp giảng dạy, kết hợp lý thuyết hiện đại với thực hành tại trang trại và ao nuôi mẫu.'
                : 'Practical training courses taught directly by ASTRI experts, combining modern theory with hands-on practice at model farms and ponds.'}
            </p>
          </div>
        </div>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Các Khóa Tập huấn' : 'Training Courses'}
            </h2>
            {courses.map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="p-6" style={{ background: 'var(--surface)' }}>
                    <div className="flex flex-wrap items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--green-950)' }}>
                        <Icon size={20} style={{ color: 'var(--green-300)' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>{c.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1" style={{ color: 'var(--text-2)' }}>
                            <Clock size={14} /> {c.duration}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: 'var(--text-2)' }}>
                            <Users size={14} /> {c.audience}
                          </span>
                          <span className="flex items-center gap-1" style={{ color: 'var(--text-2)' }}>
                            <BookOpen size={14} /> {c.format}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--green-600)' }}>
                          {isVi ? 'Nội dung khóa học' : 'Course Content'}
                        </p>
                        <ul className="space-y-2">
                          {c.content.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                              <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--green-600)' }}>
                          {isVi ? 'Kết quả đạt được' : 'Learning Outcome'}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-1)' }}>{c.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Yêu cầu & Điều kiện tham gia' : 'Requirements & Participation Conditions'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((r, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--green-500)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-2)' }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--green-950)', padding: '4rem 1rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isVi ? 'Đăng ký Tập huấn' : 'Register for Training'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Liên hệ ASTRI để đăng ký khóa tập huấn hoặc tổ chức chương trình đặc biệt cho nhóm và tổ chức của bạn.'
                : 'Contact ASTRI to register for a training course or arrange a custom program for your group or organization.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--green-600)' }}
            >
              {isVi ? 'Đăng ký ngay' : 'Register Now'}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

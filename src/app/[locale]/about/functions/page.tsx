import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  FlaskConical,
  ArrowRightLeft,
  GraduationCap,
  Handshake,
  Globe,
  Newspaper,
  Scale,
  FileText,
  CheckCircle2,
} from 'lucide-react'

const coreFunctions = (isVi: boolean) => [
  {
    icon: FlaskConical,
    title: isVi ? 'Nghiên cứu Khoa học & Công nghệ' : 'Scientific & Technological Research',
    desc: isVi
      ? 'Triển khai các đề tài nghiên cứu ứng dụng trong nông nghiệp bền vững, xử lý môi trường, vi sinh ứng dụng và công nghệ sau thu hoạch. Hợp tác với các viện nghiên cứu trong nước và quốc tế.'
      : 'Carry out applied research in sustainable agriculture, environmental treatment, applied microbiology, and post-harvest technology. Collaborate with domestic and international research institutes.',
  },
  {
    icon: ArrowRightLeft,
    title: isVi ? 'Chuyển giao Công nghệ' : 'Technology Transfer',
    desc: isVi
      ? 'Đưa các kết quả nghiên cứu vào thực tiễn sản xuất thông qua các hợp đồng chuyển giao công nghệ, hỗ trợ triển khai mô hình và đồng hành cùng doanh nghiệp, hợp tác xã nông nghiệp.'
      : 'Translate research outcomes into production practice through technology transfer contracts, model implementation support, and partnerships with enterprises and agricultural cooperatives.',
  },
  {
    icon: GraduationCap,
    title: isVi ? 'Đào tạo & Tập huấn' : 'Training & Capacity Building',
    desc: isVi
      ? 'Tổ chức các khóa đào tạo ngắn hạn, tập huấn kỹ thuật nông nghiệp cho nông dân, kỹ sư và cán bộ quản lý. Cấp chứng chỉ nghiệp vụ được công nhận bởi Liên hiệp các Hội KH&KT Việt Nam.'
      : 'Deliver short-term training courses and agricultural technical workshops for farmers, engineers, and managers. Issue vocational certificates recognised by the Vietnam Union of Science and Technology Associations.',
  },
  {
    icon: Handshake,
    title: isVi ? 'Tư vấn & Dịch vụ Kỹ thuật' : 'Technical Advisory & Services',
    desc: isVi
      ? 'Cung cấp dịch vụ tư vấn thiết kế mô hình canh tác, phân tích đất – nước – phân bón, kiểm định chất lượng sản phẩm nông nghiệp, và thiết kế hệ thống IoT giám sát trang trại.'
      : 'Provide advisory services for farming model design, soil–water–fertiliser analysis, agricultural product quality inspection, and IoT farm monitoring system design.',
  },
  {
    icon: Globe,
    title: isVi ? 'Hợp tác Quốc tế' : 'International Cooperation',
    desc: isVi
      ? 'Thiết lập quan hệ hợp tác với các tổ chức quốc tế (FAO, CGIAR, JICA) và các trường đại học, viện nghiên cứu tại ASEAN, Nhật Bản, Hàn Quốc nhằm trao đổi chuyên gia và chia sẻ công nghệ.'
      : 'Build partnerships with international organisations (FAO, CGIAR, JICA) and universities and institutes across ASEAN, Japan, and South Korea for expert exchange and technology sharing.',
  },
  {
    icon: Newspaper,
    title: isVi ? 'Thông tin & Truyền thông KH' : 'Science Information & Communication',
    desc: isVi
      ? 'Xuất bản Tạp chí Sinh thái Nông nghiệp, phổ biến kết quả nghiên cứu tới cộng đồng khoa học và xã hội, tổ chức hội thảo, triển lãm và sự kiện kết nối ngành nông nghiệp.'
      : 'Publish the Journal of Agricultural Ecology, disseminate research results to the scientific community and the public, and organise seminars, exhibitions, and agricultural networking events.',
  },
]

const tasks = (isVi: boolean) => [
  isVi
    ? 'Xây dựng và thực hiện các chương trình nghiên cứu khoa học và phát triển công nghệ nông nghiệp, môi trường, tài nguyên phục vụ phát triển kinh tế – xã hội.'
    : 'Develop and implement research programmes in agricultural science and technology, environment, and natural resources to serve socio-economic development.',
  isVi
    ? 'Nghiên cứu ứng dụng và triển khai các giải pháp công nghệ tiên tiến trong canh tác bền vững, nuôi trồng thủy sản, và quản lý tài nguyên đất – nước.'
    : 'Research and deploy advanced technology solutions for sustainable cultivation, aquaculture, and land–water resource management.',
  isVi
    ? 'Tổ chức hội nghị, hội thảo khoa học, diễn đàn chuyên ngành nông nghiệp ở cấp quốc gia và quốc tế.'
    : 'Organise national and international scientific conferences, seminars, and agriculture-sector forums.',
  isVi
    ? 'Thực hiện dịch vụ tư vấn, giám định, kiểm định, thử nghiệm và phân tích mẫu đất, nước, phân bón, sản phẩm nông nghiệp theo tiêu chuẩn Việt Nam và quốc tế.'
    : 'Provide consulting, assessment, inspection, testing, and sample analysis services for soil, water, fertilisers, and agricultural products in accordance with Vietnamese and international standards.',
  isVi
    ? 'Tham gia xây dựng tiêu chuẩn kỹ thuật, quy trình công nghệ và chính sách phát triển nông nghiệp trình cơ quan nhà nước có thẩm quyền.'
    : 'Contribute to the development of technical standards, technological procedures, and agricultural development policies submitted to competent state agencies.',
  isVi
    ? 'Xuất bản tạp chí, sách chuyên khảo, tài liệu kỹ thuật và tổ chức truyền thông khoa học phục vụ cộng đồng nông dân và doanh nghiệp nông nghiệp.'
    : 'Publish journals, monographs, technical manuals, and conduct science communication for farming communities and agricultural enterprises.',
  isVi
    ? 'Xây dựng và quản lý các trang trại, phòng thí nghiệm, xưởng sản xuất thử nghiệm phục vụ nghiên cứu và đào tạo thực hành.'
    : 'Establish and manage demonstration farms, laboratories, and pilot production workshops for research and practical training.',
  isVi
    ? 'Huy động và quản lý các nguồn lực tài chính từ ngân sách nhà nước, dự án quốc tế, đối tác doanh nghiệp để thực hiện các chương trình KH&CN trọng điểm.'
    : 'Mobilise and manage financial resources from the state budget, international projects, and enterprise partners to implement key science and technology programmes.',
]

export default async function FunctionsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isVi ? 'Chức năng & Nhiệm vụ' : 'Functions & Responsibilities'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Được thành lập theo Quyết định số 1236/QĐ-LHHVN, ASTRI hoạt động trực thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA) với sứ mệnh nghiên cứu, phát triển và chuyển giao công nghệ nông nghiệp tiên tiến.'
                : 'Established under Decision No. 1236/QĐ-LHHVN, ASTRI operates under the Vietnam Union of Science and Technology Associations (VUSTA) with a mission to research, develop, and transfer advanced agricultural technologies.'}
            </p>
          </div>
        </div>

        {/* 6 Core Functions */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? '6 Chức năng Cốt lõi' : '6 Core Functions'}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? 'Theo điều lệ tổ chức và hoạt động được VUSTA phê duyệt'
                : 'Per the organisational charter approved by VUSTA'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFunctions(isVi).map((fn, i) => {
                const Icon = fn.icon
                return (
                  <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                        <Icon size={20} style={{ color: 'var(--green-700)' }} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--green-600)' }}>
                        {isVi ? `Chức năng ${i + 1}` : `Function ${i + 1}`}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text-1)' }}>{fn.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{fn.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 8 Specific Tasks */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Nhiệm vụ Cụ thể' : 'Specific Tasks'}
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? '8 nhiệm vụ được quy định trong điều lệ hoạt động'
                : '8 tasks stipulated in the operational charter'}
            </p>
            <div className="space-y-4">
              {tasks(isVi).map((task, i) => (
                <div key={i} className="flex gap-4 rounded-xl p-5" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--green-700)' }}>
                    {i + 1}
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--text-1)' }}>{task}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Framework */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: 'var(--green-950)', border: '1px solid var(--green-800)' }}>
              <div className="flex items-center gap-3 mb-6">
                <Scale size={24} style={{ color: 'var(--green-300)' }} />
                <h2 className="text-xl font-bold text-white">
                  {isVi ? 'Cơ sở Pháp lý' : 'Legal Framework'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: FileText,
                    label: isVi ? 'Quyết định thành lập' : 'Founding Decision',
                    value: 'Quyết định số 1236/QĐ-LHHVN',
                    sub: isVi ? 'Ban hành bởi VUSTA' : 'Issued by VUSTA',
                  },
                  {
                    icon: CheckCircle2,
                    label: isVi ? 'Luật Khoa học & Công nghệ' : 'Law on Science & Technology',
                    value: isVi ? 'Luật KH&CN 2013' : 'S&T Law 2013',
                    sub: isVi ? 'Số 29/2013/QH13' : 'No. 29/2013/QH13',
                  },
                  {
                    icon: CheckCircle2,
                    label: isVi ? 'Điều lệ tổ chức hoạt động' : 'Operational Charter',
                    value: isVi ? 'Điều lệ ASTRI' : 'ASTRI Charter',
                    sub: isVi ? 'Được VUSTA phê duyệt' : 'Approved by VUSTA',
                  },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex gap-3">
                      <Icon size={20} style={{ color: 'var(--green-300)', flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--green-300)' }}>{item.label}</p>
                        <p className="font-semibold text-white">{item.value}</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.sub}</p>
                      </div>
                    </div>
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

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  CircleDot,
  CheckCircle2,
  Lightbulb,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  ArrowRight,
} from 'lucide-react'

type Project = {
  title: string
  titleEn: string
  period: string
  budget?: string
  lead: string
  location: string
  desc: string
  descEn: string
  tags: string[]
}

const ongoingProjects: Project[] = [
  {
    title: 'Nghiên cứu hệ thống xử lý nước thải tích hợp ba chức năng cho nuôi trồng thủy sản',
    titleEn: 'Research on Tri-Function Integrated Wastewater Treatment System for Aquaculture',
    period: '2024–2026',
    budget: 'Ngân sách Nhà nước + Đối ứng doanh nghiệp',
    lead: 'TS. Nguyễn Văn Minh',
    location: 'Cà Mau, Bạc Liêu',
    desc: 'Thiết kế và thử nghiệm hệ thống xử lý nước thải ao tôm tích hợp ba chức năng: lọc sinh học, khoáng hóa và tái tuần hoàn nước. Hệ thống đã được Cục Sở hữu Trí tuệ chấp nhận đơn đăng ký sáng chế. Mục tiêu: giảm 70% tải lượng ô nhiễm, tiết kiệm 40% chi phí xử lý nước.',
    descEn: 'Design and pilot testing of an integrated tri-function shrimp pond wastewater treatment system combining biological filtration, mineralisation, and water recirculation. A patent application has been accepted by the National Office of Intellectual Property. Targets: 70% pollution load reduction and 40% water treatment cost savings.',
    tags: ['Thủy sản', 'Môi trường', 'Sáng chế'],
  },
  {
    title: 'Ứng dụng vi sinh vật có lợi trong sản xuất phân bón hữu cơ chất lượng cao',
    titleEn: 'Application of Beneficial Microorganisms in High-Quality Organic Fertiliser Production',
    period: '2023–2025',
    budget: 'Quỹ NAFOSTED + Vốn tự có ASTRI',
    lead: 'ThS. Trần Thị Lan',
    location: 'Bình Dương, An Giang',
    desc: 'Phân lập và tuyển chọn các chủng vi khuẩn cố định đạm, hòa tan lân và sinh tổng hợp IAA từ vùng rễ cây trồng tại Đồng bằng sông Cửu Long. Ứng dụng vào quy trình sản xuất phân bón hữu cơ vi sinh ASTRI Organic đạt tiêu chuẩn TCVN 9297:2012. Đã thương mại hóa sản phẩm từ Q1/2024.',
    descEn: 'Isolation and selection of nitrogen-fixing, phosphate-solubilising, and IAA-synthesising bacterial strains from the rhizosphere of crops in the Mekong Delta. Applied to the ASTRI Organic microbial fertiliser production process meeting TCVN 9297:2012 standard. Product commercialised since Q1/2024.',
    tags: ['Vi sinh', 'Phân bón', 'Thương mại hóa'],
  },
  {
    title: 'Xây dựng mô hình nông nghiệp carbon tín chỉ tại An Giang (1.500 ha lúa)',
    titleEn: 'Carbon Credit Agriculture Model in An Giang (1,500 ha Rice)',
    period: '2025–2027',
    budget: '794 tỷ đồng (hợp phần Việt Nam trong dự án quốc tế)',
    lead: 'TS. Phạm Anh Tuấn',
    location: 'Thoại Sơn, An Giang',
    desc: 'Triển khai mô hình canh tác lúa phát thải thấp trên 1.500 ha tại huyện Thoại Sơn theo tiêu chuẩn VCS (Verified Carbon Standard) và tiêu chí CCB (Climate, Community & Biodiversity). Đo đạc phát thải CH₄ và N₂O bằng hệ thống eddy covariance. Dự kiến tạo ra 30.000 tấn tín chỉ carbon/năm bán trên thị trường quốc tế.',
    descEn: 'Implement a low-emission rice farming model across 1,500 ha in Thoai Son district to VCS (Verified Carbon Standard) and CCB criteria. Measure CH₄ and N₂O emissions using eddy covariance systems. Expected to generate 30,000 tonnes of carbon credits/year for international markets.',
    tags: ['Carbon tín chỉ', 'Lúa gạo', 'Quốc tế'],
  },
]

const completedProjects = (isVi: boolean) => [
  {
    title: isVi
      ? 'Xây dựng hệ thống IoT giám sát môi trường trang trại tổng hợp Bình Dương'
      : 'IoT Environmental Monitoring System for Binh Duong Integrated Farm',
    period: '2022–2023',
    outcome: isVi
      ? 'Triển khai 200 điểm cảm biến, kết nối dashboard thời gian thực. Giảm 25% mức tiêu thụ nước tưới, phát hiện sâu bệnh sớm hơn 7 ngày so với phương pháp truyền thống.'
      : 'Deployed 200 sensor nodes with real-time dashboard. Reduced irrigation water consumption by 25%; detected pests 7 days earlier than conventional methods.',
  },
  {
    title: isVi
      ? 'Nghiên cứu chiết xuất và chuẩn hóa tinh dầu Oresoi từ các loại cây dược liệu bản địa'
      : 'Extraction and Standardisation Research for Oresoi Essential Oils from Indigenous Medicinal Plants',
    period: '2021–2022',
    outcome: isVi
      ? 'Xây dựng quy trình chiết xuất tinh dầu sả, tràm, hương nhu đạt chuẩn thành phần hoạt chất. Ra mắt dòng sản phẩm Oresoi – tinh dầu thiên nhiên ASTRI tháng 6/2022.'
      : 'Developed extraction processes for lemongrass, cajuput, and basil essential oils meeting active ingredient standards. Launched the Oresoi natural essential oil product line in June 2022.',
  },
]

const proposedProjects = (isVi: boolean) => [
  {
    title: isVi ? 'Nghiên cứu giải pháp phòng trừ bệnh đốm trắng trên tôm thẻ chân trắng bằng thực khuẩn thể' : 'Phage Therapy for White Spot Disease in Pacific White Shrimp',
    agency: isVi ? 'Đề xuất gửi Bộ KH&CN' : 'Proposal submitted to MOST',
    period: '2026–2028',
  },
  {
    title: isVi ? 'Ứng dụng trí tuệ nhân tạo nhận diện sâu bệnh qua ảnh máy bay không người lái' : 'AI-Based Pest Detection via UAV Imagery',
    agency: isVi ? 'Đề xuất hợp tác với JICA' : 'Proposed JICA collaboration',
    period: '2026–2027',
  },
  {
    title: isVi ? 'Xây dựng cơ sở dữ liệu di truyền cây lúa bản địa Đồng bằng sông Cửu Long' : 'Genetic Database for Indigenous Rice Varieties of the Mekong Delta',
    agency: isVi ? 'Đề xuất phối hợp IRRI' : 'Proposed IRRI collaboration',
    period: '2026–2028',
  },
]

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isVi ? 'Đề tài & Dự án Nghiên cứu' : 'Research Topics & Projects'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'ASTRI triển khai các đề tài nghiên cứu ứng dụng từ vi sinh đến nông nghiệp số và carbon tín chỉ – giải quyết các vấn đề thực tiễn của nền nông nghiệp Việt Nam.'
                : 'ASTRI conducts applied research projects spanning microbiology to digital agriculture and carbon credits — addressing real challenges of Vietnamese agriculture.'}
            </p>
          </div>
        </div>

        {/* Ongoing */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <CircleDot size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đang Triển khai' : 'In Progress'}
              </h2>
              <span className="text-sm font-medium px-3 py-1 rounded-full ml-2" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                3
              </span>
            </div>
            <div className="space-y-6">
              {ongoingProjects.map((proj, i) => (
                <div key={i} className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  <div className="p-6" style={{ background: 'var(--surface)' }}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.tags.map((tag, j) => (
                        <span key={j} className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-1)' }}>
                      {isVi ? proj.title : proj.titleEn}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ color: 'var(--text-3)' }}>
                      <span className="flex items-center gap-1"><Calendar size={13} /> {proj.period}</span>
                      <span className="flex items-center gap-1"><Users size={13} /> {proj.lead}</span>
                      <span className="flex items-center gap-1"><MapPin size={13} /> {proj.location}</span>
                      {proj.budget && <span className="flex items-center gap-1"><DollarSign size={13} /> {proj.budget}</span>}
                    </div>
                  </div>
                  <div className="px-6 py-4" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {isVi ? proj.desc : proj.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Completed */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <CheckCircle2 size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đã Hoàn thành' : 'Completed'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedProjects(isVi).map((proj, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>{proj.title}</h3>
                      <p className="text-xs mb-3" style={{ color: 'var(--green-600)' }}>{proj.period}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{proj.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proposed */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Lightbulb size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Đề xuất / Dự kiến' : 'Proposed / Planned'}
              </h2>
            </div>
            <div className="space-y-4">
              {proposedProjects(isVi).map((proj, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl p-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <Lightbulb size={18} style={{ color: 'var(--green-600)', flexShrink: 0 }} />
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: 'var(--text-1)' }}>{proj.title}</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-3)' }}>{proj.agency} · {proj.period}</p>
                  </div>
                  <ArrowRight size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

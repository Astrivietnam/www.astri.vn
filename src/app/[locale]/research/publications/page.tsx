import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  BookOpen,
  Globe,
  Send,
  ExternalLink,
  FileText,
  Users,
  Calendar,
  Award,
} from 'lucide-react'

type Article = {
  authors: string
  titleVi: string
  titleEn: string
  journal: string
  year: number
  volume?: string
  doi?: string
  type: 'journal' | 'conference' | 'report'
}

const publications: Article[] = [
  {
    authors: 'Nguyễn Văn Minh, Trần Thị Lan, Lê Quang Hải',
    titleVi: 'Hiệu quả của hệ thống xử lý nước thải tích hợp ba chức năng đối với chất lượng nước ao nuôi tôm thẻ chân trắng',
    titleEn: 'Effectiveness of Tri-Function Integrated Wastewater Treatment System on Water Quality in Pacific White Shrimp Ponds',
    journal: 'Tạp chí Sinh thái Nông nghiệp',
    year: 2024,
    volume: 'Vol. 3, No. 2, tr. 45–58',
    doi: '10.xxxx/stnn.2024.3.2.045',
    type: 'journal',
  },
  {
    authors: 'Trần Thị Lan, Phạm Anh Tuấn',
    titleVi: 'Phân lập và tuyển chọn vi khuẩn hòa tan lân từ vùng rễ lúa Đồng bằng sông Cửu Long',
    titleEn: 'Isolation and Selection of Phosphate-Solubilising Bacteria from the Rhizosphere of Rice in the Mekong Delta',
    journal: 'Tạp chí Sinh thái Nông nghiệp',
    year: 2023,
    volume: 'Vol. 2, No. 4, tr. 12–25',
    doi: '10.xxxx/stnn.2023.2.4.012',
    type: 'journal',
  },
  {
    authors: 'Lê Quang Hải, Nguyễn Thị Hoa, Võ Minh Đức',
    titleVi: 'Ứng dụng cảm biến IoT đa thông số trong giám sát vi khí hậu nhà màng công nghệ cao',
    titleEn: 'Multi-Parameter IoT Sensor Application for Microclimate Monitoring in High-Tech Greenhouses',
    journal: 'Tạp chí Sinh thái Nông nghiệp',
    year: 2024,
    volume: 'Vol. 3, No. 1, tr. 88–101',
    doi: '10.xxxx/stnn.2024.3.1.088',
    type: 'journal',
  },
  {
    authors: 'Phạm Anh Tuấn, Nguyễn Văn Minh',
    titleVi: 'Đánh giá tiềm năng carbon tín chỉ của mô hình canh tác lúa bền vững tại An Giang',
    titleEn: 'Assessment of Carbon Credit Potential in Sustainable Rice Farming Models in An Giang',
    journal: 'Tạp chí Sinh thái Nông nghiệp',
    year: 2025,
    volume: 'Vol. 4, No. 1, tr. 1–18',
    doi: '10.xxxx/stnn.2025.4.1.001',
    type: 'journal',
  },
  {
    authors: 'Nguyễn Thị Hoa, Trần Thị Lan',
    titleVi: 'Thành phần hóa học và hoạt tính kháng khuẩn của tinh dầu sả Java (Cymbopogon winterianus) trồng tại Bình Dương',
    titleEn: 'Chemical Composition and Antibacterial Activity of Java Citronella Essential Oil (Cymbopogon winterianus) Grown in Binh Duong',
    journal: 'Tạp chí Sinh thái Nông nghiệp',
    year: 2022,
    volume: 'Vol. 1, No. 2, tr. 30–42',
    doi: '10.xxxx/stnn.2022.1.2.030',
    type: 'journal',
  },
  {
    authors: 'Nguyễn Văn Minh, Phạm Anh Tuấn',
    titleVi: 'Hệ thống xử lý nước thải sinh học cho nuôi trồng thủy sản quy mô vừa và nhỏ vùng Đồng bằng sông Cửu Long',
    titleEn: 'Biological Wastewater Treatment Systems for Small- and Medium-Scale Aquaculture in the Mekong Delta',
    journal: 'Proceedings of the 5th ASEAN Conference on Agricultural Technology',
    year: 2024,
    volume: 'Ho Chi Minh City, tr. 215–224',
    type: 'conference',
  },
  {
    authors: 'ASTRI & FAO Vietnam',
    titleVi: 'Báo cáo thí điểm: Canh tác lúa phát thải thấp và cơ chế tín chỉ carbon tại Đồng bằng sông Cửu Long',
    titleEn: 'Pilot Report: Low-Emission Rice Cultivation and Carbon Credit Mechanisms in the Mekong Delta',
    journal: 'FAO Vietnam Country Office Technical Paper',
    year: 2025,
    volume: 'TCP/VIE/3905',
    type: 'report',
  },
]

const typeLabel = (type: string, isVi: boolean) => {
  if (type === 'journal') return isVi ? 'Tạp chí' : 'Journal'
  if (type === 'conference') return isVi ? 'Hội thảo' : 'Conference'
  return isVi ? 'Báo cáo' : 'Report'
}

const typeColor = (type: string) => {
  if (type === 'journal') return { bg: 'var(--green-50)', color: 'var(--green-700)' }
  if (type === 'conference') return { bg: 'rgba(59,130,246,0.08)', color: '#2563eb' }
  return { bg: 'rgba(245,158,11,0.08)', color: '#b45309' }
}

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
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
              {isVi ? 'Công bố Khoa học' : 'Scientific Publications'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '42rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Các bài báo khoa học, kỷ yếu hội thảo và báo cáo kỹ thuật của ASTRI. Tạp chí Sinh thái Nông nghiệp (sinhthainongnghiep.net.vn) là cơ quan ngôn luận chính thức của Viện.'
                : 'Scientific articles, conference proceedings, and technical reports from ASTRI. The Journal of Agricultural Ecology (sinhthainongnghiep.net.vn) is the Institute\'s official publication.'}
            </p>
          </div>
        </div>

        {/* Journal spotlight */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--green-50)' }}>
                  <BookOpen size={28} style={{ color: 'var(--green-700)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>
                      {isVi ? 'Tạp chí Sinh thái Nông nghiệp' : 'Journal of Agricultural Ecology'}
                    </h2>
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                      {isVi ? 'Cơ quan chủ quản: ASTRI' : 'Publisher: ASTRI'}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                    {isVi
                      ? 'Tạp chí xuất bản định kỳ 4 số/năm, đăng các bài báo khoa học về sinh thái nông nghiệp, công nghệ sinh học ứng dụng, quản lý tài nguyên và môi trường nông thôn. Phản biện kín hai chiều. ISSN dự kiến cấp 2025.'
                      : 'Quarterly journal publishing scientific articles on agricultural ecology, applied biotechnology, resource management, and rural environment. Double-blind peer review. ISSN application expected 2025.'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-3)' }}>
                    <span className="flex items-center gap-1"><Globe size={13} /> sinhthainongnghiep.net.vn</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {isVi ? 'Ra mắt 2021' : 'Founded 2021'}</span>
                    <span className="flex items-center gap-1"><FileText size={13} /> {isVi ? '4 số/năm' : '4 issues/year'}</span>
                    <span className="flex items-center gap-1"><Award size={13} /> {isVi ? 'Phản biện kín' : 'Peer-reviewed'}</span>
                  </div>
                </div>
                <a
                  href="https://sinhthainongnghiep.net.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0"
                  style={{ background: 'var(--green-700)', color: '#fff' }}
                >
                  {isVi ? 'Xem tạp chí' : 'View journal'}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Publication list */}
        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Danh mục Công bố' : 'Publication List'}
            </h2>
            <div className="space-y-4">
              {publications.map((pub, i) => {
                const tc = typeColor(pub.type)
                return (
                  <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: tc.bg, color: tc.color }}
                        >
                          {typeLabel(pub.type, isVi)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
                          {isVi ? pub.titleVi : pub.titleEn}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: 'var(--text-3)' }}>
                          <span className="flex items-center gap-1"><Users size={12} /> {pub.authors}</span>
                          <span className="flex items-center gap-1"><BookOpen size={12} /> {pub.journal}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {pub.year}</span>
                          {pub.volume && <span>{pub.volume}</span>}
                        </div>
                        {pub.doi && (
                          <p className="text-xs mt-1" style={{ color: 'var(--green-600)' }}>DOI: {pub.doi}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Submit article CTA */}
        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--green-950)', border: '1px solid var(--green-800)' }}>
              <Send size={32} className="mx-auto mb-4" style={{ color: 'var(--green-300)' }} />
              <h2 className="text-2xl font-bold text-white mb-3">
                {isVi ? 'Gửi Bài Báo' : 'Submit Your Article'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '36rem', margin: '0 auto 1.5rem', lineHeight: 1.75 }}>
                {isVi
                  ? 'Tạp chí Sinh thái Nông nghiệp chào đón các bài báo trong lĩnh vực nông nghiệp sinh thái, công nghệ sinh học, quản lý đất và nước, biến đổi khí hậu nông thôn. Định dạng Word theo mẫu tạp chí. Phản biện trong vòng 30 ngày.'
                  : 'The Journal of Agricultural Ecology welcomes articles in agricultural ecology, biotechnology, land and water management, and rural climate change. Word format following journal template. Review within 30 days.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://sinhthainongnghiep.net.vn/submit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
                  style={{ background: 'var(--green-500)', color: '#fff' }}
                >
                  <Send size={16} />
                  {isVi ? 'Nộp bài trực tuyến' : 'Submit Online'}
                </a>
                <a
                  href="mailto:tapchi@astri.vn"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold"
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  tapchi@astri.vn
                </a>
              </div>
              <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {isVi
                  ? 'Hướng dẫn cho tác giả: sinhthainongnghiep.net.vn/guide-for-authors'
                  : 'Author guidelines: sinhthainongnghiep.net.vn/guide-for-authors'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

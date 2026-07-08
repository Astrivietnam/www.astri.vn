import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react'

const PROGRAMS = {
  vi: [
    { icon: GraduationCap, title: 'Đào tạo kỹ thuật nông nghiệp', desc: 'Chương trình tập huấn thực hành cho nông dân về canh tác hữu cơ, sử dụng phân bón vi sinh và quản lý dịch hại tổng hợp.' },
    { icon: BookOpen, title: 'Chuyển giao công nghệ', desc: 'Hướng dẫn triển khai hệ thống IoT, ứng dụng blockchain và phần mềm quản lý nông trại cho doanh nghiệp.' },
    { icon: Users, title: 'Hội thảo & Tọa đàm', desc: 'Tổ chức các hội thảo khoa học, tọa đàm chuyên đề kết nối nhà nghiên cứu, doanh nghiệp và nông dân.' },
    { icon: Award, title: 'Chứng nhận & Tiêu chuẩn', desc: 'Hỗ trợ doanh nghiệp và hợp tác xã đạt chứng nhận VietGAP, hữu cơ và các tiêu chuẩn quốc tế.' },
  ],
  en: [
    { icon: GraduationCap, title: 'Agricultural Technical Training', desc: 'Hands-on training programs for farmers on organic farming, microbial fertilizer use, and integrated pest management.' },
    { icon: BookOpen, title: 'Technology Transfer', desc: 'Guidance on deploying IoT systems, blockchain applications, and farm management software for businesses.' },
    { icon: Users, title: 'Workshops & Seminars', desc: 'Organizing scientific workshops and thematic seminars connecting researchers, businesses, and farmers.' },
    { icon: Award, title: 'Certification & Standards', desc: 'Supporting businesses and cooperatives in achieving VietGAP, organic, and international standard certifications.' },
  ],
}

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const programs = PROGRAMS[isVi ? 'vi' : 'en']

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
              {isVi ? 'Đào tạo & Chuyển giao Công nghệ' : 'Training & Technology Transfer'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Nâng cao năng lực cho nông dân và doanh nghiệp thông qua các chương trình đào tạo thực tiễn, chuyển giao công nghệ và hỗ trợ chứng nhận.'
                : 'Empowering farmers and businesses through practical training programs, technology transfer, and certification support.'}
            </p>
          </div>
        </div>

        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
            {programs.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h2>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

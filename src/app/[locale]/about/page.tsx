import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CheckCircle2, Target, Eye, Users } from 'lucide-react'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Giới thiệu' : 'About'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp' : 'Agricultural Support Technology Research Institute'}
            </h1>
          </div>
        </div>

        {/* Mission & Vision */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
            <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Sứ mệnh' : 'Mission'}
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                {isVi
                  ? 'Nghiên cứu, ứng dụng và chuyển giao các công nghệ tiên tiến nhằm nâng cao năng suất, chất lượng và giá trị gia tăng trong sản xuất nông nghiệp, góp phần phát triển nông nghiệp xanh, bền vững tại Việt Nam.'
                  : 'To research, apply, and transfer advanced technologies to improve productivity, quality, and added value in agricultural production, contributing to green and sustainable agricultural development in Vietnam.'}
              </p>
            </div>

            <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                  <Eye size={20} />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Tầm nhìn' : 'Vision'}
                </h2>
              </div>
              <p style={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                {isVi
                  ? 'Trở thành viện nghiên cứu hàng đầu trong lĩnh vực công nghệ nông nghiệp tại Việt Nam và khu vực Đông Nam Á, là cầu nối tin cậy giữa khoa học và thực tiễn sản xuất.'
                  : 'To become the leading research institute in agricultural technology in Vietnam and Southeast Asia, serving as a trusted bridge between science and farming practice.'}
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Lĩnh vực hoạt động' : 'Areas of Activity'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {(isVi ? [
                'Nghiên cứu và phát triển công nghệ sinh học, vi sinh vật ứng dụng trong nông nghiệp',
                'Nghiên cứu, sản xuất phân bón hữu cơ vi sinh chất lượng cao',
                'Ứng dụng công nghệ IoT, blockchain trong quản lý chuỗi giá trị nông sản',
                'Xử lý nước thải và môi trường trong nuôi trồng thủy sản',
                'Xúc tiến thương mại, kết nối doanh nghiệp nông nghiệp trong nước và quốc tế',
                'Đào tạo, tập huấn kỹ thuật nông nghiệp cho nông dân và doanh nghiệp',
                'Vận hành trang trại mô hình ứng dụng công nghệ cao tại Bình Dương',
                'Nghiên cứu và sản xuất tinh dầu hữu cơ (Oresoi)',
              ] : [
                'Research and development of biotechnology and microbiology for agriculture',
                'Research and production of high-quality organic microbial fertilizers',
                'Application of IoT and blockchain in agricultural value chain management',
                'Wastewater treatment and environmental solutions for aquaculture',
                'Trade promotion and connecting domestic and international agricultural businesses',
                'Technical training for farmers and agribusiness enterprises',
                'Operating a high-tech model farm in Binh Duong province',
                'Research and production of organic essential oils (Oresoi)',
              ]).map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--green-600)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{item}</p>
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

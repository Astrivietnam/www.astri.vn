import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FlaskConical, Microscope, Leaf, Droplets } from 'lucide-react'

const AREAS = {
  vi: [
    { icon: Microscope, title: 'Công nghệ sinh học', desc: 'Nghiên cứu vi sinh vật có lợi, enzym và chế phẩm sinh học ứng dụng trong canh tác nông nghiệp bền vững.' },
    { icon: Leaf, title: 'Phân bón hữu cơ vi sinh', desc: 'Phát triển các dòng phân bón hữu cơ vi sinh chất lượng cao, giảm thiểu hóa chất và cải thiện độ phì nhiêu đất.' },
    { icon: Droplets, title: 'Xử lý môi trường thủy sản', desc: 'Nghiên cứu giải pháp xử lý nước thải, kiểm soát dịch bệnh trong nuôi trồng thủy sản thâm canh.' },
    { icon: FlaskConical, title: 'Tinh dầu hữu cơ', desc: 'Nghiên cứu chiết xuất và ứng dụng tinh dầu thiên nhiên từ thảo mộc Việt Nam (xem thêm: Oresoi).' },
  ],
  en: [
    { icon: Microscope, title: 'Biotechnology', desc: 'Research on beneficial microorganisms, enzymes, and biological agents for sustainable agricultural practices.' },
    { icon: Leaf, title: 'Organic Microbial Fertilizers', desc: 'Development of high-quality organic microbial fertilizers to reduce chemicals and improve soil fertility.' },
    { icon: Droplets, title: 'Aquaculture & Environmental Treatment', desc: 'Research on wastewater treatment and disease control solutions for intensive aquaculture.' },
    { icon: FlaskConical, title: 'Organic Essential Oils', desc: 'Research on extraction and application of natural essential oils from Vietnamese herbs (see: Oresoi).' },
  ],
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const areas = AREAS[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Nghiên cứu' : 'Research'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Nghiên cứu & Phát triển' : 'Research & Development'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Viện ASTRI tập trung nghiên cứu ứng dụng công nghệ sinh học, vi sinh vật và các giải pháp công nghệ tiên tiến phục vụ nông nghiệp bền vững.'
                : 'ASTRI focuses on applying biotechnology, microbiology, and advanced technology solutions for sustainable agriculture.'}
            </p>
          </div>
        </div>

        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {areas.map(({ icon: Icon, title, desc }, i) => (
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

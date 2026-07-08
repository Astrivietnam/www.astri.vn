import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Cpu, Radio, BarChart3, ShieldCheck } from 'lucide-react'

const TECHS = {
  vi: [
    { icon: Cpu, title: 'IoT trong nông nghiệp', desc: 'Hệ thống cảm biến thông minh giám sát đất, nước, khí hậu theo thời gian thực, tối ưu hóa quy trình canh tác.' },
    { icon: Radio, title: 'Blockchain truy xuất nguồn gốc', desc: 'Ứng dụng công nghệ blockchain đảm bảo minh bạch chuỗi giá trị nông sản từ trang trại đến bàn ăn.' },
    { icon: BarChart3, title: 'Phân tích dữ liệu nông nghiệp', desc: 'Thu thập và phân tích dữ liệu canh tác giúp nông dân đưa ra quyết định chính xác, giảm chi phí, tăng năng suất.' },
    { icon: ShieldCheck, title: 'Kiểm soát chất lượng', desc: 'Quy trình kiểm soát chất lượng nghiêm ngặt, đáp ứng tiêu chuẩn VietGAP, GlobalGAP và xuất khẩu quốc tế.' },
  ],
  en: [
    { icon: Cpu, title: 'Agricultural IoT', desc: 'Smart sensor systems for real-time monitoring of soil, water, and climate to optimize farming processes.' },
    { icon: Radio, title: 'Blockchain Traceability', desc: 'Blockchain technology ensuring transparency in the agricultural value chain from farm to table.' },
    { icon: BarChart3, title: 'Agricultural Data Analytics', desc: 'Collecting and analyzing farming data to help farmers make precise decisions, reduce costs, and increase yield.' },
    { icon: ShieldCheck, title: 'Quality Control', desc: 'Rigorous quality control processes meeting VietGAP, GlobalGAP, and international export standards.' },
  ],
}

export default async function TechnologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const techs = TECHS[isVi ? 'vi' : 'en']

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
              {isVi ? 'Ứng dụng Công nghệ' : 'Technology Applications'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Ứng dụng các công nghệ tiên tiến như IoT, blockchain và phân tích dữ liệu vào sản xuất và quản lý chuỗi giá trị nông nghiệp.'
                : 'Applying advanced technologies such as IoT, blockchain, and data analytics to agricultural production and value chain management.'}
            </p>
          </div>
        </div>

        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
            {techs.map(({ icon: Icon, title, desc }, i) => (
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

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { MapPin, Sprout, SunMedium, Tractor } from 'lucide-react'

const FEATURES = {
  vi: [
    { icon: Sprout, title: 'Canh tác hữu cơ', desc: 'Toàn bộ diện tích canh tác theo tiêu chuẩn hữu cơ, không sử dụng hóa chất tổng hợp, bảo vệ sức khỏe người tiêu dùng.' },
    { icon: SunMedium, title: 'Năng lượng tái tạo', desc: 'Hệ thống điện mặt trời tích hợp cung cấp năng lượng cho trang trại, giảm phát thải carbon.' },
    { icon: Tractor, title: 'Cơ giới hóa hiện đại', desc: 'Trang bị máy móc và thiết bị nông nghiệp tiên tiến, giảm sức lao động thủ công và tăng hiệu quả sản xuất.' },
    { icon: MapPin, title: 'Vị trí chiến lược', desc: 'Tọa lạc tại Bình Dương — trung tâm công nghiệp phía Nam, thuận tiện kết nối với thị trường TP. Hồ Chí Minh và vùng lân cận.' },
  ],
  en: [
    { icon: Sprout, title: 'Organic Farming', desc: 'All farmland cultivated to organic standards, free from synthetic chemicals, protecting consumer health.' },
    { icon: SunMedium, title: 'Renewable Energy', desc: 'Integrated solar power systems supplying energy to the farm, reducing carbon emissions.' },
    { icon: Tractor, title: 'Modern Mechanization', desc: 'Equipped with advanced agricultural machinery to reduce manual labor and increase production efficiency.' },
    { icon: MapPin, title: 'Strategic Location', desc: 'Located in Binh Duong — southern industrial hub, conveniently connected to Ho Chi Minh City and surrounding markets.' },
  ],
}

export default async function FarmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const features = FEATURES[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Trang trại' : 'Farm'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Trang trại Bình Dương' : 'Binh Duong Farm'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Mô hình trang trại ứng dụng công nghệ cao của Viện ASTRI tại Bình Dương — nơi hội tụ nghiên cứu, sản xuất và trình diễn công nghệ nông nghiệp tiên tiến.'
                : "ASTRI's high-tech model farm in Binh Duong — a convergence of research, production, and demonstration of advanced agricultural technology."}
            </p>
          </div>
        </div>

        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Icon size={22} />
                  </div>
                  <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-8 text-center" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--text-1)' }}>
                {isVi ? 'Liên hệ tham quan trang trại' : 'Contact us to visit the farm'}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-2)' }}>
                {isVi
                  ? 'Chúng tôi chào đón các đoàn tham quan, nhà nghiên cứu và doanh nghiệp muốn tìm hiểu mô hình trang trại công nghệ cao.'
                  : 'We welcome visiting groups, researchers, and businesses interested in learning about our high-tech farm model.'}
              </p>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm"
                style={{ background: 'var(--green-800)', color: 'white', textDecoration: 'none' }}
              >
                {isVi ? 'Liên hệ ngay' : 'Contact Us'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

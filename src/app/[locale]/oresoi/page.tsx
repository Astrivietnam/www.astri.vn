import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Flower2, Leaf, Wind, Heart } from 'lucide-react'

const HIGHLIGHTS = {
  vi: [
    { icon: Leaf, title: 'Nguyên liệu hữu cơ', desc: 'Thảo mộc và thực vật được trồng theo tiêu chuẩn hữu cơ nghiêm ngặt, không thuốc trừ sâu, không hóa chất tổng hợp.' },
    { icon: Wind, title: 'Chưng cất tự nhiên', desc: 'Quy trình chưng cất hơi nước truyền thống giữ nguyên hàm lượng hoạt chất tự nhiên trong tinh dầu.' },
    { icon: Heart, title: 'Lợi ích sức khỏe', desc: 'Tinh dầu thiên nhiên nguyên chất hỗ trợ thư giãn, cải thiện giấc ngủ và chăm sóc sức khỏe toàn diện.' },
    { icon: Flower2, title: 'Đa dạng sản phẩm', desc: 'Bộ sưu tập tinh dầu từ nhiều loài thảo mộc đặc trưng của Việt Nam — sả, bạch đàn, oải hương bản địa và nhiều hơn nữa.' },
  ],
  en: [
    { icon: Leaf, title: 'Organic Raw Materials', desc: 'Herbs and plants grown to strict organic standards, free from pesticides and synthetic chemicals.' },
    { icon: Wind, title: 'Natural Distillation', desc: 'Traditional steam distillation process preserves the full natural active compound content in the essential oils.' },
    { icon: Heart, title: 'Health Benefits', desc: 'Pure natural essential oils to support relaxation, improve sleep, and promote holistic wellness.' },
    { icon: Flower2, title: 'Diverse Products', desc: 'A collection of essential oils from distinctive Vietnamese herbs — lemongrass, eucalyptus, native lavender, and more.' },
  ],
}

export default async function OresoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const highlights = HIGHLIGHTS[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(160deg, #0D3320, #1A6B2F)', padding: '5rem 1rem 4rem' }}>
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#A8D878' }}>
              {isVi ? 'Tinh dầu hữu cơ' : 'Organic Essential Oils'}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
              Oresoi
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              {isVi
                ? 'Dòng tinh dầu hữu cơ thuần khiết từ thảo mộc Việt Nam — nghiên cứu và sản xuất bởi Viện ASTRI.'
                : 'Pure organic essential oils from Vietnamese herbs — researched and produced by ASTRI.'}
            </p>
          </div>
        </div>

        {/* About */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Về Oresoi' : 'About Oresoi'}
            </h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
              {isVi
                ? 'Oresoi là nhãn hàng tinh dầu hữu cơ của Viện ASTRI, được nghiên cứu và phát triển từ nguồn thảo mộc bản địa phong phú của Việt Nam. Mỗi sản phẩm Oresoi là kết quả của quá trình nghiên cứu khoa học nghiêm túc kết hợp với phương pháp sản xuất thủ công truyền thống, đảm bảo chất lượng thuần khiết và nguyên vẹn từ thiên nhiên.'
                : 'Oresoi is ASTRI\'s organic essential oil brand, researched and developed from Vietnam\'s rich indigenous herbal resources. Each Oresoi product is the result of rigorous scientific research combined with traditional handcrafted production methods, ensuring pure and authentic natural quality.'}
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 gap-6">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Quan tâm đến Oresoi?' : 'Interested in Oresoi?'}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
              {isVi
                ? 'Liên hệ với chúng tôi để biết thêm thông tin về sản phẩm và hợp tác phân phối.'
                : 'Contact us for more information about products and distribution partnerships.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm"
              style={{ background: 'var(--green-800)', color: 'white', textDecoration: 'none' }}
            >
              {isVi ? 'Liên hệ chúng tôi' : 'Contact Us'}
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

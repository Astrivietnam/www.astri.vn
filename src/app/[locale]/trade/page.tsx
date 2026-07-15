import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Globe, ShoppingCart, CalendarCheck, Repeat, MapPin, ArrowRight } from 'lucide-react'

const SERVICES = {
  vi: [
    { icon: Globe, title: 'Kết nối thị trường quốc tế', desc: 'Đưa nông sản Việt Nam và các hợp tác xã (HTX) tiếp cận thị trường Trung Quốc, Nhật Bản và các thị trường quốc tế tiềm năng.' },
    { icon: ShoppingCart, title: 'Thương mại điện tử xuyên biên giới', desc: 'Hỗ trợ doanh nghiệp và HTX đưa sản phẩm lên các nền tảng thương mại điện tử để xuất khẩu chính ngạch và mở rộng kênh phân phối.' },
    { icon: CalendarCheck, title: 'Xúc tiến & tổ chức sự kiện', desc: 'Tổ chức hội thảo, trưng bày và kết nối giao thương, tạo cơ hội gặp gỡ trực tiếp giữa nhà sản xuất và đối tác quốc tế.' },
    { icon: Repeat, title: 'Chuyển giao công nghệ thương mại', desc: 'Đưa công nghệ canh tác và chế biến tiên tiến từ nước ngoài về Việt Nam, nâng cao giá trị và chất lượng nông sản.' },
  ],
  en: [
    { icon: Globe, title: 'International Market Access', desc: 'Bringing Vietnamese agricultural products and cooperatives (HTX) to markets in China, Japan, and other promising international regions.' },
    { icon: ShoppingCart, title: 'Cross-border E-commerce', desc: 'Helping enterprises and cooperatives list products on e-commerce platforms for official-channel exports and wider distribution.' },
    { icon: CalendarCheck, title: 'Trade Promotion & Events', desc: 'Organizing workshops, exhibitions, and business matching to create direct connections between producers and international partners.' },
    { icon: Repeat, title: 'Commercial Technology Transfer', desc: 'Bringing advanced farming and processing technology from abroad into Vietnam to raise the value and quality of agricultural products.' },
  ],
}

const EVENTS = {
  vi: [
    {
      date: '11/2025 · Côn Minh, Vân Nam (Trung Quốc)',
      title: 'Ký kết MOU với Shannon Information Technology Co.',
      desc: 'Viện ASTRI ký Biên bản ghi nhớ hợp tác với Shannon Information Technology Co. (Vân Nam) nhằm hỗ trợ doanh nghiệp và HTX Việt Nam tiếp cận thị trường Trung Quốc thông qua các nền tảng thương mại điện tử, đồng thời đưa công nghệ nông nghiệp Trung Quốc về ứng dụng tại Việt Nam.',
    },
    {
      date: '2025 · Vân Nam (Trung Quốc)',
      title: 'Tham quan nhà máy Dong Dong Food Company',
      desc: 'Đoàn ASTRI làm việc và tham quan nhà máy sản xuất mì ăn liền và thực phẩm tiện lợi tự động hóa của Dong Dong Food Company. Nhà máy đạt các chứng nhận HALAL, BRC, FDA và phân phối sản phẩm tới 28 quốc gia, bao gồm hệ thống Costco và 7-Eleven.',
    },
    {
      date: '6/2024 · Hà Nội & Kanagawa (Nhật Bản)',
      title: 'Trung tâm Xúc tiến Thương mại Nhật Bản – Việt Nam',
      desc: 'Phối hợp cùng Vincom Retail tổ chức các đợt xúc tiến thương mại tại hệ thống Vincom Plaza ở Hà Nội (31/5–2/6 và 14/6–16/6/2024), đồng thời tham gia hoạt động xúc tiến thương mại nông sản tại tỉnh Kanagawa, Nhật Bản.',
    },
    {
      date: '24/5/2024',
      title: 'Hội thảo kết nối công nghệ và thương mại nông nghiệp Việt – Nhật',
      desc: 'Hội thảo "Thúc đẩy kết nối công nghệ và thương mại nông nghiệp Việt – Nhật" bàn về cơ hội xuất khẩu nông sản Việt Nam sang thị trường Nhật Bản và thị trường quốc tế.',
    },
  ],
  en: [
    {
      date: 'Nov 2025 · Kunming, Yunnan (China)',
      title: 'MOU signed with Shannon Information Technology Co.',
      desc: 'ASTRI signed a Memorandum of Understanding with Shannon Information Technology Co. (Yunnan) to help Vietnamese enterprises and cooperatives (HTX) access the Chinese market through e-commerce platforms, while bringing Chinese agricultural technology into Vietnam.',
    },
    {
      date: '2025 · Yunnan (China)',
      title: 'Factory visit — Dong Dong Food Company',
      desc: 'The ASTRI delegation visited the automated instant-noodle and convenience-food plant of Dong Dong Food Company. The facility holds HALAL, BRC, and FDA certifications and distributes to 28 countries, including Costco and 7-Eleven.',
    },
    {
      date: 'Jun 2024 · Hanoi & Kanagawa (Japan)',
      title: 'Japan–Vietnam Trade Promotion Center',
      desc: 'In partnership with Vincom Retail, ASTRI held trade promotion events at Vincom Plaza malls in Hanoi (May 31–Jun 2 and Jun 14–16, 2024), and took part in agricultural trade promotion activities in Kanagawa, Japan.',
    },
    {
      date: 'May 24, 2024',
      title: 'Vietnam–Japan agri technology & trade workshop',
      desc: 'The workshop "Promoting technology and agricultural trade connections between Vietnam and Japan" discussed opportunities for exporting Vietnamese agricultural products to Japan and global markets.',
    },
  ],
}

const NEWS = {
  vi: [
    { slug: 'vien-astri-ky-mou-shannon-van-nam-nong-san-viet-nam', title: 'Viện ASTRI ký MOU với Shannon (Vân Nam) đưa nông sản Việt Nam ra thị trường quốc tế' },
    { slug: 'xuat-khau-nong-san-viet-nam-thi-truong', title: 'Xuất khẩu nông sản Việt Nam và cơ hội tại các thị trường trọng điểm' },
    { slug: 'ma-so-vung-trong-co-so-dong-goi', title: 'Mã số vùng trồng và cơ sở đóng gói — điều kiện xuất khẩu chính ngạch' },
    { slug: 'chi-dan-dia-ly-thuong-hieu-nong-san-viet', title: 'Chỉ dẫn địa lý và xây dựng thương hiệu nông sản Việt' },
  ],
  en: [
    { slug: 'vien-astri-ky-mou-shannon-van-nam-nong-san-viet-nam', title: 'ASTRI signs MOU with Shannon (Yunnan) to bring Vietnamese agriculture to global markets' },
    { slug: 'xuat-khau-nong-san-viet-nam-thi-truong', title: 'Vietnamese agricultural exports and opportunities in key markets' },
    { slug: 'ma-so-vung-trong-co-so-dong-goi', title: 'Growing-area and packing-facility codes — requirements for official-channel export' },
    { slug: 'chi-dan-dia-ly-thuong-hieu-nong-san-viet', title: 'Geographical indications and building Vietnamese agricultural brands' },
  ],
}

const MARKETS = {
  vi: [
    { name: 'Trung Quốc', desc: 'Thương mại điện tử xuyên biên giới & chuyển giao công nghệ' },
    { name: 'Nhật Bản', desc: 'Xúc tiến thương mại nông sản & hợp tác kỹ thuật' },
    { name: 'Thị trường quốc tế', desc: 'Mở rộng kênh phân phối và xây dựng thương hiệu' },
  ],
  en: [
    { name: 'China', desc: 'Cross-border e-commerce & technology transfer' },
    { name: 'Japan', desc: 'Agricultural trade promotion & technical cooperation' },
    { name: 'International markets', desc: 'Expanding distribution and building brands' },
  ],
}

export default async function TradePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const services = SERVICES[isVi ? 'vi' : 'en']
  const events = EVENTS[isVi ? 'vi' : 'en']
  const news = NEWS[isVi ? 'vi' : 'en']
  const markets = MARKETS[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Hợp tác · Thương mại' : 'Trade'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Xúc tiến Thương mại' : 'Trade Promotion'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Viện ASTRI là cầu nối đưa doanh nghiệp nông nghiệp và hợp tác xã Việt Nam ra thị trường quốc tế, đồng thời mang công nghệ canh tác tiên tiến của thế giới về ứng dụng tại Việt Nam.'
                : 'ASTRI connects Vietnamese agricultural enterprises and cooperatives with international markets, while bringing advanced farming technology from around the world into Vietnam.'}
            </p>
          </div>
        </div>

        {/* What we do */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
              {isVi ? 'Chúng tôi làm gì' : 'What we do'}
            </h2>
            <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {isVi
                ? 'Từ kết nối thị trường đến chuyển giao công nghệ, ASTRI đồng hành cùng doanh nghiệp trên hành trình xuất khẩu nông sản.'
                : 'From market access to technology transfer, ASTRI accompanies businesses throughout their agricultural export journey.'}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="rounded-xl p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Target markets */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
              {isVi ? 'Thị trường mục tiêu' : 'Target markets'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {markets.map(({ name, desc }, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--green-700)' }}>
                    <MapPin size={18} />
                    <h3 className="text-base font-bold" style={{ color: 'var(--text-1)' }}>{name}</h3>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured activities timeline */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
              {isVi ? 'Hoạt động nổi bật' : 'Featured activities'}
            </h2>
            <p className="text-sm mb-10 max-w-2xl" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {isVi
                ? 'Những dấu mốc hợp tác quốc tế tiêu biểu của Viện ASTRI trong hoạt động xúc tiến thương mại.'
                : "Notable milestones in ASTRI's international cooperation and trade promotion work."}
            </p>
            <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
              <div style={{ position: 'absolute', left: '7px', top: '6px', bottom: '6px', width: '2px', background: 'var(--green-300)' }} />
              <div className="flex flex-col gap-8">
                {events.map(({ date, title, desc }, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-1.75rem', top: '4px', width: '16px', height: '16px', borderRadius: '9999px', background: 'var(--green-700)', border: '3px solid var(--surface)' }} />
                    <div className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--green-700)' }}>{date}</p>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-1)' }}>{title}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Image figures */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            <figure style={{ margin: 0 }}>
              <img
                src="https://uhukszgmvvkemqipepit.supabase.co/storage/v1/object/public/media/legacy/pg_xuctien_3.jpg"
                alt={isVi ? 'Lễ ký kết MOU tại Côn Minh, Vân Nam' : 'MOU signing ceremony in Kunming, Yunnan'}
                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
              />
              <figcaption className="text-sm mt-3" style={{ color: 'var(--text-3)' }}>
                {isVi
                  ? 'Lễ ký kết Biên bản ghi nhớ (MOU) hợp tác với Shannon Information Technology Co. tại Côn Minh, Vân Nam (Trung Quốc).'
                  : 'Signing of the MOU with Shannon Information Technology Co. in Kunming, Yunnan (China).'}
              </figcaption>
            </figure>
            <figure style={{ margin: 0 }}>
              <img
                src="https://uhukszgmvvkemqipepit.supabase.co/storage/v1/object/public/media/legacy/pg_xuctien_2.jpg"
                alt={isVi ? 'Buổi làm việc với đối tác quốc tế' : 'Working session with international partners'}
                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
              />
              <figcaption className="text-sm mt-3" style={{ color: 'var(--text-3)' }}>
                {isVi
                  ? 'Buổi làm việc và kết nối giao thương giữa Viện ASTRI và các đối tác quốc tế.'
                  : 'Working session and business matching between ASTRI and international partners.'}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Related news */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
              {isVi ? 'Tin tức liên quan' : 'Related news'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {news.map(({ slug, title }, i) => (
                <Link
                  key={i}
                  href={`/${locale}/news/${slug}`}
                  className="rounded-xl p-5 flex items-center justify-between gap-4 group"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>{title}</span>
                  <ArrowRight size={18} style={{ color: 'var(--green-700)', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

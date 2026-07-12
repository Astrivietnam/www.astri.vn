import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CheckCircle2, Target, Eye, MapPin, Phone, Mail, Award, Users, Building2 } from 'lucide-react'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'

  const leadership = [
    {
      name: 'ThS. Nguyễn Thị Lương',
      title_vi: 'Viện trưởng',
      title_en: 'Director',
    },
    {
      name: 'ThS. Phạm Quyết Tiến',
      title_vi: 'Phó Viện trưởng',
      title_en: 'Deputy Director',
    },
    {
      name: 'Ls. Chử Đức Toàn',
      title_vi: 'Phó Viện trưởng',
      title_en: 'Deputy Director',
    },
    {
      name: 'Chử Thị Hồng Hải',
      title_vi: 'Kế toán trưởng',
      title_en: 'Chief Accountant',
    },
  ]

  const departments = isVi ? [
    'Phòng Nghiên cứu Công nghệ sinh học & Vi sinh vật ứng dụng',
    'Phòng Nghiên cứu & Phát triển sản phẩm (R&D)',
    'Phòng Hợp tác quốc tế & Xúc tiến thương mại',
    'Phòng Đào tạo & Tập huấn kỹ thuật',
    'Phòng Tư vấn Dịch vụ Nông nghiệp',
    'Trung tâm Ứng dụng IoT & Blockchain nông nghiệp',
    'Trung tâm Nghiên cứu & Sản xuất tinh dầu hữu cơ Oresoi',
    'Trang trại Mô hình Công nghệ cao Bình Dương',
  ] : [
    'Department of Biotechnology & Applied Microbiology',
    'Research & Product Development Department (R&D)',
    'International Cooperation & Trade Promotion Department',
    'Training & Technical Instruction Department',
    'Agricultural Consulting & Services Department',
    'Center for IoT & Blockchain Application in Agriculture',
    'Center for Organic Essential Oil Research & Production (Oresoi)',
    'Binh Duong High-Tech Model Farm',
  ]

  const branches = [
    { name: isVi ? 'Phân viện Bắc Tân Uyên, Bình Dương' : 'Bac Tan Uyen, Binh Duong Branch', province: 'Bình Dương' },
    { name: isVi ? 'Phân viện Mai Châu, Hòa Bình' : 'Mai Chau, Hoa Binh Branch', province: 'Hòa Bình' },
    { name: isVi ? 'Phân viện Ninh Thuận' : 'Ninh Thuan Branch', province: 'Ninh Thuận' },
    { name: isVi ? 'Phân viện Đồng Nai' : 'Dong Nai Branch', province: 'Đồng Nai' },
    { name: isVi ? 'Phân viện An Giang' : 'An Giang Branch', province: 'An Giang' },
    { name: isVi ? 'Văn phòng Hà Nội (951 Hồng Hà)' : 'Hanoi Office (951 Hong Ha)', province: 'Hà Nội' },
    { name: isVi ? 'Trụ sở chính (56 Du Nội, Đồng Anh)' : 'Headquarters (56 Du Noi, Dong Anh)', province: 'Hà Nội' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Giới thiệu' : 'About Us'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em', maxWidth: '48rem' }}>
              {isVi ? 'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp' : 'Agricultural Support Technology Research Institute'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Thành lập năm 2018, trực thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA). Viện ASTRI hoạt động theo quyết định số 1236/QĐ-LHHVN với sứ mệnh nghiên cứu, ứng dụng và chuyển giao công nghệ nông nghiệp.'
                : "Founded in 2018 under the Vietnam Union of Science and Technology Associations (VUSTA), Decision No. 1236/QĐ-LHHVN. ASTRI's mission is to research, apply, and transfer agricultural technology."}
            </p>
          </div>
        </div>

        {/* Stats */}
        <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '2018', label: isVi ? 'Năm thành lập' : 'Founded' },
              { num: '7+', label: isVi ? 'Phân viện & Văn phòng' : 'Branches & Offices' },
              { num: '8', label: isVi ? 'Đơn vị trực thuộc' : 'Operating Units' },
              { num: '13+', label: isVi ? 'Tin tức & Bài viết' : 'Published Articles' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1rem' }}>
                <div className="text-3xl font-bold" style={{ color: 'var(--green-700)', letterSpacing: '-0.03em' }}>{s.num}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
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

        {/* Leadership */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Users size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {isVi ? 'Ban Lãnh đạo' : 'Leadership'}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map((p, i) => (
                <div key={i} className="rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--green-800), var(--green-600))',
                    margin: '0 auto 1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '1.25rem',
                  }}>
                    {p.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div className="font-semibold" style={{ color: 'var(--text-1)', fontSize: '0.9rem' }}>{p.name}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--green-600)' }}>{isVi ? p.title_vi : p.title_en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Building2 size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {isVi ? 'Cơ cấu tổ chức' : 'Organizational Structure'}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {departments.map((d, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: 'var(--green-600)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Award size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {isVi ? 'Lĩnh vực hoạt động' : 'Areas of Activity'}
              </h2>
            </div>
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

        {/* Branches */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin size={20} style={{ color: 'var(--green-600)' }} />
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {isVi ? 'Mạng lưới hoạt động' : 'Network of Operations'}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {branches.map((b, i) => (
                <div key={i} className="flex gap-3 items-start p-4 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--green-500)' }} />
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{b.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>{b.province}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Thông tin liên hệ' : 'Contact Information'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex gap-3 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <MapPin size={20} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>
                    {isVi ? 'Trụ sở chính' : 'Headquarters'}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
                    Số 56 Du Nội, Xã Đồng Anh, Thành phố Hà Nội
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <MapPin size={20} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>
                    {isVi ? 'Văn phòng Hà Nội' : 'Hanoi Office'}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
                    951 Hồng Hà, Phường Hồng Hà, Hà Nội
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-5 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <Mail size={20} style={{ color: 'var(--green-600)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--text-3)' }}>Email</div>
                  <div className="text-sm" style={{ color: 'var(--text-2)' }}>contact@astri.vn</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </div>
  )
}

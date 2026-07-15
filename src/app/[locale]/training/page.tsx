import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  GraduationCap,
  Sprout,
  Workflow,
  Users,
  Globe2,
  BookOpen,
  MapPin,
  CalendarDays,
  UserCheck,
  School,
  ArrowRight,
} from 'lucide-react'

const PROGRAMS = {
  vi: [
    { icon: Sprout, title: 'Tập huấn kỹ thuật cho nông dân & HTX', desc: 'Các khóa tập huấn thực hành tại đồng ruộng cho nông dân và hợp tác xã về canh tác hữu cơ, sử dụng phân bón vi sinh, quản lý dịch hại tổng hợp và nâng cao năng suất bền vững.' },
    { icon: GraduationCap, title: 'Đào tạo nghề nông nghiệp công nghệ cao', desc: 'Chương trình đào tạo nghề gắn với thực tiễn sản xuất: nông nghiệp thông minh, nhà màng, tưới tiêu tự động, giám sát cây trồng bằng cảm biến và dữ liệu.' },
    { icon: Workflow, title: 'Chuyển giao quy trình canh tác', desc: 'Hướng dẫn triển khai và làm chủ các quy trình canh tác tiên tiến, từ chuẩn bị giá thể, dinh dưỡng, phòng trừ sinh học đến thu hoạch và sơ chế sau thu hoạch.' },
    { icon: Users, title: 'Hội thảo & sự kiện chuyên môn', desc: 'Tổ chức hội thảo khoa học, tọa đàm chuyên đề và diễn đàn kết nối nhà nghiên cứu, doanh nghiệp, hợp tác xã và nông dân nhằm lan tỏa tri thức và giải pháp mới.' },
    { icon: Globe2, title: 'Hợp tác đào tạo quốc tế', desc: 'Xây dựng quan hệ hợp tác với các cơ sở đào tạo trong khu vực, trao đổi giảng viên, chương trình và kinh nghiệm phát triển nguồn nhân lực nông nghiệp.' },
    { icon: BookOpen, title: 'Phát triển học liệu & giáo trình', desc: 'Biên soạn tài liệu tập huấn, cẩm nang kỹ thuật và học liệu trực quan giúp người học tiếp cận nhanh, dễ áp dụng vào điều kiện sản xuất thực tế.' },
  ],
  en: [
    { icon: Sprout, title: 'Technical Training for Farmers & Co-ops', desc: 'Hands-on field training for farmers and cooperatives on organic farming, microbial fertilizer use, integrated pest management, and sustainable yield improvement.' },
    { icon: GraduationCap, title: 'High-Tech Agricultural Vocational Training', desc: 'Practice-oriented vocational programs covering smart agriculture, greenhouses, automated irrigation, and sensor- and data-based crop monitoring.' },
    { icon: Workflow, title: 'Farming Process Transfer', desc: 'Guidance on implementing and mastering advanced cultivation processes, from substrate preparation, nutrition, and biological protection to harvest and post-harvest handling.' },
    { icon: Users, title: 'Professional Workshops & Events', desc: 'Scientific workshops, thematic seminars, and forums connecting researchers, businesses, cooperatives, and farmers to spread knowledge and new solutions.' },
    { icon: Globe2, title: 'International Training Cooperation', desc: 'Building partnerships with regional training institutions, exchanging lecturers, curricula, and experience in agricultural human-resource development.' },
    { icon: BookOpen, title: 'Learning Materials & Curriculum', desc: 'Developing training materials, technical handbooks, and visual learning resources that help learners quickly apply knowledge to real production conditions.' },
  ],
}

const COOP_AREAS = {
  vi: [
    'Chương trình đào tạo nghề gắn với sản xuất nông nghiệp thực tiễn.',
    'Đào tạo trình độ cao đẳng cho sinh viên hai bên.',
    'Các khóa đào tạo ngắn hạn cho sinh viên và cán bộ kỹ thuật nông nghiệp.',
    'Trao đổi mô hình trang trại kết hợp, phòng thí nghiệm và xưởng thực nghiệm.',
    'Phát triển nguồn nhân lực nông nghiệp công nghệ cao cho vùng biên giới Việt–Trung.',
  ],
  en: [
    'Vocational training programs linked to real agricultural production.',
    'College-level training for students from both sides.',
    'Short-term courses for students and agricultural technical staff.',
    'Exchange of combined farm models, laboratories, and experimental workshops.',
    'High-tech agricultural human-resource development for the Vietnam–China border region.',
  ],
}

const COOP_FACTS = {
  vi: [
    { icon: CalendarDays, label: 'Thời gian', value: '19/11/2025, tại Côn Minh (Kunming)' },
    { icon: MapPin, label: 'Địa điểm', value: 'Học viện Kỹ thuật nghề Nông nghiệp tỉnh Vân Nam, Trung Quốc' },
    { icon: UserCheck, label: 'Đoàn công tác', value: 'Do Phó Viện trưởng Phạm Quyết Tiến dẫn đầu' },
    { icon: School, label: 'Quy mô đối tác', value: 'Hơn 16.000 sinh viên, đào tạo thực hành mạnh' },
  ],
  en: [
    { icon: CalendarDays, label: 'Date', value: 'Nov 19, 2025, in Kunming' },
    { icon: MapPin, label: 'Location', value: 'Yunnan Agricultural Technical Academy, China' },
    { icon: UserCheck, label: 'Delegation', value: 'Led by Deputy Director Pham Quyet Tien' },
    { icon: School, label: 'Partner scale', value: 'Over 16,000 students, strong hands-on training' },
  ],
}

const RELATED = {
  vi: [
    { slug: 'vien-astri-hop-tac-giao-duc-nong-nghiep-van-nam-trung-quoc', title: 'Viện ASTRI hợp tác giáo dục nông nghiệp với tỉnh Vân Nam, Trung Quốc' },
    { slug: 'dao-tao-nghe-nong-nghiep-nguon-nhan-luc', title: 'Đào tạo nghề nông nghiệp và phát triển nguồn nhân lực' },
    { slug: 'khoi-nghiep-nong-nghiep-agritech-startup', title: 'Khởi nghiệp nông nghiệp và hệ sinh thái Agritech startup' },
    { slug: 'hop-tac-xa-nong-nghiep-kieu-moi-lien-ket', title: 'Hợp tác xã nông nghiệp kiểu mới và liên kết chuỗi giá trị' },
  ],
  en: [
    { slug: 'vien-astri-hop-tac-giao-duc-nong-nghiep-van-nam-trung-quoc', title: 'ASTRI signs agricultural education cooperation with Yunnan, China' },
    { slug: 'dao-tao-nghe-nong-nghiep-nguon-nhan-luc', title: 'Agricultural vocational training and human-resource development' },
    { slug: 'khoi-nghiep-nong-nghiep-agritech-startup', title: 'Agricultural entrepreneurship and the Agritech startup ecosystem' },
    { slug: 'hop-tac-xa-nong-nghiep-kieu-moi-lien-ket', title: 'New-model agricultural cooperatives and value-chain linkage' },
  ],
}

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const lang = isVi ? 'vi' : 'en'
  const programs = PROGRAMS[lang]
  const coopAreas = COOP_AREAS[lang]
  const coopFacts = COOP_FACTS[lang]
  const related = RELATED[lang]

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
              {isVi ? 'Đào tạo & Phát triển nguồn nhân lực' : 'Training & Human Resource Development'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Viện ASTRI phát triển nguồn nhân lực nông nghiệp thông qua tập huấn thực hành, đào tạo nghề công nghệ cao, chuyển giao quy trình canh tác và hợp tác đào tạo trong và ngoài nước.'
                : 'ASTRI develops agricultural human resources through hands-on training, high-tech vocational education, farming process transfer, and domestic and international training cooperation.'}
            </p>
          </div>
        </div>

        {/* Training programs */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Chương trình đào tạo' : 'Training Programs'}
            </h2>
            <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {isVi
                ? 'Các lĩnh vực đào tạo trọng tâm của Viện, thiết kế bám sát nhu cầu thực tế của nông dân, hợp tác xã và doanh nghiệp nông nghiệp.'
                : 'The Institute’s core training areas, designed to closely match the real needs of farmers, cooperatives, and agricultural enterprises.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map(({ icon: Icon, title, desc }, i) => (
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

        {/* Featured cooperation */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-700)' }}>
              {isVi ? 'Hợp tác nổi bật' : 'Featured Cooperation'}
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-1)', letterSpacing: '-0.01em' }}>
              {isVi
                ? 'Hợp tác giáo dục với Học viện Kỹ thuật nghề Nông nghiệp tỉnh Vân Nam, Trung Quốc'
                : 'Educational Cooperation with Yunnan Agricultural Technical Academy, China'}
            </h2>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <p className="text-base mb-4" style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
                  {isVi
                    ? 'Ngày 19/11/2025, đoàn công tác Viện ASTRI do Phó Viện trưởng Phạm Quyết Tiến dẫn đầu đã làm việc tại Côn Minh (Kunming), thúc đẩy hợp tác giáo dục với Học viện Kỹ thuật nghề Nông nghiệp tỉnh Vân Nam. Chuyến làm việc tập trung vào hợp tác đào tạo, nông nghiệp công nghệ cao và phát triển nguồn nhân lực cho vùng biên giới Việt–Trung.'
                    : 'On November 19, 2025, an ASTRI delegation led by Deputy Director Pham Quyet Tien worked in Kunming to advance educational cooperation with the Yunnan Agricultural Technical Academy. The visit focused on training cooperation, high-tech agriculture, and human-resource development for the Vietnam–China border region.'}
                </p>
                <p className="text-base mb-6" style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
                  {isVi
                    ? 'Là một trung tâm giáo dục nghề nghiệp lớn của tỉnh với hơn 16.000 sinh viên, Học viện nổi bật với đào tạo thực hành mạnh, kết hợp mô hình trang trại, hệ thống phòng thí nghiệm và các xưởng thực nghiệm. Đây là nền tảng thuận lợi để hai bên xây dựng các chương trình đào tạo gắn với sản xuất thực tế.'
                    : 'As a major provincial vocational education center with more than 16,000 students, the Academy stands out for its strong hands-on training, combining farm models, laboratory systems, and experimental workshops. This provides a solid foundation for both sides to build training programs linked to real production.'}
                </p>

                <h3 className="text-base font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Các lĩnh vực hợp tác' : 'Cooperation areas'}
                </h3>
                <ul className="space-y-3">
                  {coopAreas.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                      <span className="flex-shrink-0 mt-1 w-2 h-2 rounded-full" style={{ background: 'var(--green-700)' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
                  {isVi ? 'Thông tin nhanh' : 'At a glance'}
                </h3>
                <div className="space-y-5">
                  {coopFacts.map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-3)' }}>{label}</p>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image figure */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop"
                alt={isVi ? 'Buổi tập huấn và trao đổi kiến thức trong chương trình đào tạo nông nghiệp của ASTRI' : 'A training and knowledge-sharing session in ASTRI’s agricultural education program'}
                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
              />
              <figcaption className="mt-3 text-sm" style={{ color: 'var(--text-3)', lineHeight: 1.6 }}>
                {isVi
                  ? 'Đào tạo gắn với thực hành là trọng tâm trong các chương trình phát triển nguồn nhân lực nông nghiệp của Viện ASTRI.'
                  : 'Practice-oriented training is central to ASTRI’s agricultural human-resource development programs.'}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Related news */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Tin tức liên quan' : 'Related news'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(({ slug, title }, i) => (
                <a
                  key={i}
                  href={`/${locale}/news/${slug}`}
                  className="group rounded-xl p-6 flex items-center justify-between gap-4 transition-colors"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <span className="text-base font-semibold" style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>{title}</span>
                  <ArrowRight size={20} className="flex-shrink-0" style={{ color: 'var(--green-700)' }} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

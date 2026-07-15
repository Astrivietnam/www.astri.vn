import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  FlaskConical,
  Microscope,
  Leaf,
  Droplets,
  Sprout,
  Cloud,
  Award,
  Handshake,
  MapPin,
  ArrowRight,
} from 'lucide-react'

const AREAS = {
  vi: [
    { icon: Microscope, title: 'Công nghệ sinh học & vi sinh vật có lợi', desc: 'Phân lập, tuyển chọn và nhân nuôi các chủng vi sinh vật có lợi, enzym và chế phẩm sinh học ứng dụng trong canh tác nông nghiệp bền vững.' },
    { icon: Leaf, title: 'Phân bón hữu cơ vi sinh', desc: 'Phát triển các dòng phân bón hữu cơ vi sinh chất lượng cao, cải tạo đất bạc màu, giảm phụ thuộc hóa chất và nâng cao độ phì nhiêu của đất.' },
    { icon: Droplets, title: 'Xử lý nước thải nuôi trồng thủy sản', desc: 'Nghiên cứu công nghệ xử lý nước thải tích hợp, kiểm soát dịch bệnh và tuần hoàn nước trong nuôi trồng thủy sản thâm canh.' },
    { icon: Sprout, title: 'Nông nghiệp phát thải thấp', desc: 'Xây dựng quy trình canh tác lúa và cây trồng phát thải thấp, hướng tới nền nông nghiệp xanh và tăng trưởng bền vững.' },
    { icon: Cloud, title: 'Giảm phát thải khí nhà kính', desc: 'Nghiên cứu và chuyển giao công nghệ giảm phát thải khí nhà kính, thích ứng với biến đổi khí hậu cho vùng nông nghiệp trọng điểm.' },
    { icon: FlaskConical, title: 'Tinh dầu & chiết xuất thiên nhiên', desc: 'Nghiên cứu chiết xuất, tinh chế và ứng dụng tinh dầu thiên nhiên từ nguồn thảo mộc bản địa Việt Nam.' },
  ],
  en: [
    { icon: Microscope, title: 'Biotechnology & Beneficial Microbes', desc: 'Isolation, selection and cultivation of beneficial microbial strains, enzymes and biological agents for sustainable agricultural practices.' },
    { icon: Leaf, title: 'Organic Microbial Fertilizers', desc: 'Development of high-quality organic microbial fertilizers that rehabilitate degraded soil, cut chemical dependence and improve soil fertility.' },
    { icon: Droplets, title: 'Aquaculture Wastewater Treatment', desc: 'Research on integrated wastewater treatment, disease control and water recirculation for intensive aquaculture systems.' },
    { icon: Sprout, title: 'Low-Carbon Agriculture', desc: 'Building low-emission rice and crop cultivation processes toward a green, sustainably growing agricultural sector.' },
    { icon: Cloud, title: 'Greenhouse Gas Reduction', desc: 'Research and technology transfer to reduce greenhouse gas emissions and support climate change adaptation in key farming regions.' },
    { icon: FlaskConical, title: 'Essential Oils & Natural Extracts', desc: 'Research on extraction, refinement and application of natural essential oils from indigenous Vietnamese herbs.' },
  ],
}

const RELATED = [
  {
    slug: 'vien-astri-dang-ky-sang-che-xu-ly-nuoc-thai-nuoi-trong-thuy-san',
    vi: 'Viện ASTRI đăng ký sáng chế xử lý nước thải nuôi trồng thủy sản',
    en: 'ASTRI files patent for aquaculture wastewater treatment',
  },
  {
    slug: 'astri-ra-mat-phan-vien-tay-nam-bo',
    vi: 'ASTRI ra mắt Phân viện Tây Nam Bộ tại An Giang',
    en: 'ASTRI launches Southwest Regional Institute in An Giang',
  },
  {
    slug: 'cong-nghe-vi-sinh-cai-tao-dat-bac-mau',
    vi: 'Công nghệ vi sinh cải tạo đất bạc màu',
    en: 'Microbial technology for rehabilitating degraded soil',
  },
  {
    slug: 'che-pham-sinh-hoc-thay-the-thuoc-hoa-hoc',
    vi: 'Chế phẩm sinh học thay thế thuốc hóa học',
    en: 'Biological products replacing chemical pesticides',
  },
]

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const areas = AREAS[isVi ? 'vi' : 'en']

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
              {isVi ? 'Nghiên cứu Khoa học' : 'Scientific Research'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
              {isVi
                ? 'Viện ASTRI kết hợp công nghệ sinh học, vi sinh vật có lợi và các giải pháp công nghệ tiên tiến để tạo ra những sản phẩm và quy trình phục vụ nền nông nghiệp bền vững, phát thải thấp và thích ứng với biến đổi khí hậu.'
                : 'ASTRI combines biotechnology, beneficial microorganisms and advanced technology solutions to create products and processes for a sustainable, low-carbon agriculture that adapts to climate change.'}
            </p>
          </div>
        </div>

        {/* Research directions */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-700)' }}>
              {isVi ? 'Hướng nghiên cứu' : 'Research Directions'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Các lĩnh vực trọng tâm' : 'Core Focus Areas'}
            </h2>
            <p className="text-base max-w-2xl mb-10" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {isVi
                ? 'Hoạt động nghiên cứu của Viện trải rộng từ phòng thí nghiệm đến đồng ruộng và ao nuôi, gắn kết chặt chẽ với nhu cầu thực tiễn của người nông dân.'
                : 'The Institute’s research spans from the laboratory to the field and the pond, closely linked to the real needs of farmers.'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map(({ icon: Icon, title, desc }, i) => (
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

        {/* Featured projects */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-700)' }}>
              {isVi ? 'Dự án tiêu biểu' : 'Featured Projects'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Kết quả nghiên cứu nổi bật' : 'Highlighted Research Outcomes'}
            </h2>

            <div className="grid gap-6">
              {/* Project 1 — Patent */}
              <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
                    <Award size={14} /> {isVi ? 'Sáng chế' : 'Patent'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi
                    ? 'Hệ thống xử lý nước thải tích hợp ba chức năng cho nuôi trồng thủy sản'
                    : 'Three-function integrated wastewater treatment system for aquaculture'}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Giải pháp sáng chế của Viện ASTRI tích hợp ba chức năng xử lý nước trong một hệ thống, đã được thử nghiệm thực địa tại một trang trại nuôi tôm ở Cà Mau. Kết quả cho thấy chất lượng nước và sức khỏe vật nuôi được cải thiện rõ rệt, đồng thời rút ngắn chu kỳ nuôi và tối ưu chi phí thức ăn.'
                    : 'ASTRI’s patented solution integrates three water-treatment functions into a single system, field-tested at a shrimp farm in Ca Mau. Results showed marked improvements in water quality and livestock health, while shortening the breeding cycle and optimizing feed costs.'}
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { value: '75% → 89%', label: isVi ? 'Tỷ lệ sống của tôm' : 'Shrimp survival rate' },
                    { value: '1.45 → 1.28', label: isVi ? 'Hệ số chuyển hóa thức ăn (FCR)' : 'Feed conversion ratio (FCR)' },
                    { value: '−15 ' + (isVi ? 'ngày' : 'days'), label: isVi ? 'Rút ngắn chu kỳ nuôi' : 'Shorter breeding cycle' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg p-5 text-center" style={{ background: 'var(--green-50)', border: '1px solid var(--green-300)' }}>
                      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--green-800)' }}>{s.value}</div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project 2 — Southwest Regional Institute */}
              <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
                    <MapPin size={14} /> {isVi ? 'An Giang · 07/07/2025' : 'An Giang · Jul 7, 2025'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Phân viện Tây Nam Bộ & canh tác lúa phát thải thấp' : 'Southwest Regional Institute & low-carbon rice cultivation'}
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Ngày 07/07/2025, Viện ASTRI ra mắt Phân viện Tây Nam Bộ tại An Giang, đặt nền móng cho chương trình canh tác lúa phát thải thấp quy mô lớn tại vùng Đồng bằng sông Cửu Long.'
                    : 'On July 7, 2025, ASTRI launched its Southwest Regional Institute in An Giang, laying the foundation for a large-scale low-carbon rice cultivation program in the Mekong Delta.'}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { value: '1,500 ha', label: isVi ? 'Diện tích canh tác lúa phát thải thấp' : 'Low-carbon rice cultivation area' },
                    { value: '~794 ' + (isVi ? 'tỷ đồng' : 'billion VND'), label: isVi ? 'Tổng mức đầu tư' : 'Total investment' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-lg p-5 text-center" style={{ background: 'var(--green-50)', border: '1px solid var(--green-300)' }}>
                      <div className="text-2xl font-bold mb-1" style={{ color: 'var(--green-800)' }}>{s.value}</div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-3)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project 3 — VIGIC */}
              <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
                    <Handshake size={14} /> {isVi ? 'Hợp tác · 29/05/2024' : 'Partnership · May 29, 2024'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi
                    ? 'VIGIC — Hợp tác Đổi mới sáng tạo xanh Việt Nam'
                    : 'VIGIC — Vietnam Green Innovation Cooperation'}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Ngày 29/05/2024, Viện ASTRI ký kết Biên bản ghi nhớ (MOU) cùng 5 tổ chức đối tác trong khuôn khổ VIGIC, thúc đẩy đổi mới sáng tạo xanh và phát triển bền vững thông qua hợp tác nghiên cứu và chuyển giao công nghệ.'
                    : 'On May 29, 2024, ASTRI signed a Memorandum of Understanding (MOU) with five partner organizations under VIGIC, advancing green innovation and sustainable development through collaborative research and technology transfer.'}
                </p>
              </div>

              {/* Project 4 — GHG reduction */}
              <div className="rounded-xl p-8" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--green-50)', color: 'var(--green-800)' }}>
                    <Cloud size={14} /> {isVi ? 'Nghiên cứu & chuyển giao' : 'R&D & Transfer'}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-1)' }}>
                  {isVi
                    ? 'Giảm phát thải khí nhà kính & thích ứng biến đổi khí hậu'
                    : 'Greenhouse gas reduction & climate change adaptation'}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {isVi
                    ? 'Viện triển khai các hoạt động nghiên cứu và chuyển giao công nghệ nhằm giảm phát thải khí nhà kính trong sản xuất nông nghiệp, góp phần xây dựng năng lực thích ứng với biến đổi khí hậu cho cộng đồng nông dân.'
                    : 'The Institute carries out research and technology transfer to reduce greenhouse gas emissions in agricultural production, helping build climate change adaptation capacity for farming communities.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Image figure */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-4xl mx-auto">
            <figure>
              <img
                src="https://uhukszgmvvkemqipepit.supabase.co/storage/v1/object/public/media/legacy/pg_nghiencuu_1.jpg"
                alt={isVi ? 'Lễ ký kết hợp tác VIGIC giữa Viện ASTRI và các tổ chức đối tác' : 'VIGIC cooperation signing ceremony between ASTRI and partner organizations'}
                style={{ width: '100%', borderRadius: '12px', display: 'block' }}
              />
              <figcaption className="mt-3 text-sm text-center" style={{ color: 'var(--text-3)', lineHeight: 1.6 }}>
                {isVi
                  ? 'Lễ ký kết Biên bản ghi nhớ hợp tác Đổi mới sáng tạo xanh Việt Nam (VIGIC) giữa Viện ASTRI và các tổ chức đối tác.'
                  : 'Signing ceremony of the Vietnam Green Innovation Cooperation (VIGIC) MOU between ASTRI and its partner organizations.'}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Related news */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-700)' }}>
              {isVi ? 'Tin tức' : 'News'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10" style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
              {isVi ? 'Tin tức liên quan' : 'Related News'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {RELATED.map((item) => (
                <a
                  key={item.slug}
                  href={`/${locale}/news/${item.slug}`}
                  className="group rounded-xl p-6 flex items-start justify-between gap-4 transition-colors"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <span className="text-base font-semibold" style={{ color: 'var(--text-1)', lineHeight: 1.5 }}>
                    {isVi ? item.vi : item.en}
                  </span>
                  <ArrowRight size={20} className="shrink-0 mt-0.5" style={{ color: 'var(--green-700)' }} />
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

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Leaf, Droplets, Fish, CheckCircle2, FlaskConical, TrendingUp, ArrowRight, ShoppingBag } from 'lucide-react'

const PRODUCTS = {
  vi: [
    {
      icon: Leaf,
      name: 'ASTRI Organic Pro',
      tag: 'Dành cho rau màu & cây ăn quả',
      color: 'var(--green-600)',
      specs: [
        'Mật độ vi sinh vật hữu ích: 10⁸ CFU/g',
        'Thành phần: Bacillus subtilis, Trichoderma spp., Azotobacter',
        'Hàm lượng hữu cơ: ≥ 20%',
        'Dạng sản phẩm: Dạng hạt, bao 25kg và bao 5kg',
        'Bảo quản: Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp',
      ],
      uses: 'Thích hợp cho rau màu ngắn ngày, cây ăn quả, hoa màu. Bón lót hoặc bón thúc theo hướng dẫn. Giúp cải thiện cấu trúc đất, tăng khả năng hấp thụ dinh dưỡng và giảm tỷ lệ bệnh do nấm đất.',
      dosage: '300–500 kg/ha (bón lót) hoặc 100–200 kg/ha (bón thúc)',
    },
    {
      icon: FlaskConical,
      name: 'ASTRI Rice Formula',
      tag: 'Chuyên dụng cho canh tác lúa',
      color: 'var(--green-700)',
      specs: [
        'Mật độ vi sinh vật hữu ích: 10⁸ CFU/g',
        'Thành phần: Azospirillum lipoferum, Pseudomonas fluorescens, vi khuẩn khử sulfate',
        'Hàm lượng hữu cơ: ≥ 15%',
        'Tối ưu hóa cho đất ngập nước, chịu được điều kiện yếm khí',
        'Dạng sản phẩm: Dạng bột mịn, bao 25kg',
      ],
      uses: 'Đặc biệt thiết kế cho đất trồng lúa ngập nước, trong đó nhiều chủng vi sinh vật thông thường không hoạt động hiệu quả. Hỗ trợ dự án lúa tín chỉ carbon theo tiêu chuẩn giảm phát thải của ASTRI tại An Giang.',
      dosage: '250–400 kg/ha (bón lót trước khi cấy/gieo)',
    },
    {
      icon: Fish,
      name: 'ASTRI Aqua Boost',
      tag: 'Dành cho nuôi trồng thủy sản',
      color: 'var(--green-800)',
      specs: [
        'Mật độ vi sinh vật hữu ích: 10⁹ CFU/ml (dạng lỏng)',
        'Thành phần: Bacillus licheniformis, Lactobacillus, Nitrosomonas, Nitrobacter',
        'Không chứa kháng sinh, hóa chất độc hại',
        'pH sản phẩm: 6.5–7.5',
        'Dạng sản phẩm: Dạng lỏng, can 1 lít và 5 lít',
      ],
      uses: 'Sử dụng định kỳ trong ao nuôi tôm thẻ chân trắng và cá tra. Phân hủy chất hữu cơ lơ lửng, kiểm soát khí H₂S và NH₃, cải thiện màu nước và tăng hàm lượng oxy hòa tan. Được triển khai thực tế tại các ao nuôi siêu thâm canh Cà Mau.',
      dosage: '1–2 lít/1.000 m³ nước ao (định kỳ 5–7 ngày/lần)',
    },
  ],
  en: [
    {
      icon: Leaf,
      name: 'ASTRI Organic Pro',
      tag: 'For vegetables & fruit crops',
      color: 'var(--green-600)',
      specs: [
        'Beneficial microorganism density: 10⁸ CFU/g',
        'Ingredients: Bacillus subtilis, Trichoderma spp., Azotobacter',
        'Organic content: ≥ 20%',
        'Form: Granules, 25 kg and 5 kg bags',
        'Storage: Dry, ventilated area, away from direct sunlight',
      ],
      uses: 'Suitable for short-season vegetables, fruit trees, and field crops. Apply as basal or top-dressing fertilizer per guidance. Improves soil structure, enhances nutrient uptake, and reduces soil-borne fungal diseases.',
      dosage: '300–500 kg/ha (basal) or 100–200 kg/ha (top-dressing)',
    },
    {
      icon: FlaskConical,
      name: 'ASTRI Rice Formula',
      tag: 'Specially formulated for rice cultivation',
      color: 'var(--green-700)',
      specs: [
        'Beneficial microorganism density: 10⁸ CFU/g',
        'Ingredients: Azospirillum lipoferum, Pseudomonas fluorescens, sulfate-reducing bacteria',
        'Organic content: ≥ 15%',
        'Optimized for flooded soils, tolerates anaerobic conditions',
        'Form: Fine powder, 25 kg bags',
      ],
      uses: 'Specifically designed for flooded rice paddies where many common microbial strains do not function effectively. Supports ASTRI\'s carbon credit rice project under emission-reduction standards in An Giang.',
      dosage: '250–400 kg/ha (basal application before transplanting/seeding)',
    },
    {
      icon: Fish,
      name: 'ASTRI Aqua Boost',
      tag: 'For aquaculture',
      color: 'var(--green-800)',
      specs: [
        'Beneficial microorganism density: 10⁹ CFU/ml (liquid form)',
        'Ingredients: Bacillus licheniformis, Lactobacillus, Nitrosomonas, Nitrobacter',
        'No antibiotics or harmful chemicals',
        'Product pH: 6.5–7.5',
        'Form: Liquid, 1-liter and 5-liter canisters',
      ],
      uses: 'Applied periodically in white-leg shrimp and catfish ponds. Breaks down suspended organic matter, controls H₂S and NH₃ gases, improves water color, and raises dissolved oxygen levels. Deployed in super-intensive ponds in Ca Mau.',
      dosage: '1–2 liters per 1,000 m³ pond water (every 5–7 days)',
    },
  ],
}

const BENEFITS = {
  vi: [
    { icon: TrendingUp, value: '15–20%', label: 'Tăng năng suất cây trồng và thủy sản so với đối chứng' },
    { icon: Leaf, value: '30%', label: 'Giảm lượng phân bón hóa học cần sử dụng' },
    { icon: FlaskConical, value: '10⁸–10⁹ CFU/g', label: 'Mật độ vi sinh vật hữu ích được kiểm nghiệm' },
    { icon: CheckCircle2, value: 'Viện TNNHH', label: 'Kiểm nghiệm bởi Viện Thổ nhưỡng Nông hóa Việt Nam' },
  ],
  en: [
    { icon: TrendingUp, value: '15–20%', label: 'Increased yield for crops and aquaculture vs. control' },
    { icon: Leaf, value: '30%', label: 'Reduction in required chemical fertilizer use' },
    { icon: FlaskConical, value: '10⁸–10⁹ CFU/g', label: 'Tested beneficial microorganism density' },
    { icon: CheckCircle2, value: 'SFRI Tested', label: 'Tested by the Soil and Fertilizer Research Institute of Vietnam' },
  ],
}

export default async function FertilizerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isVi = locale === 'vi'
  const products = PRODUCTS[isVi ? 'vi' : 'en']
  const benefits = BENEFITS[isVi ? 'vi' : 'en']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '4rem' }}>
        <div style={{ background: 'linear-gradient(160deg, var(--green-950), var(--green-800))', padding: '4rem 1rem 3rem' }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--green-300)' }}>
              {isVi ? 'Sản phẩm' : 'Products'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
              {isVi ? 'Phân bón Hữu cơ Vi sinh ASTRI' : 'ASTRI Organic Microbial Fertilizers'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem', maxWidth: '40rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Được nghiên cứu từ năm 2021 và kiểm nghiệm tại Viện Thổ nhưỡng Nông hóa Việt Nam, dòng phân bón hữu cơ vi sinh ASTRI mang lại hiệu quả thiết thực cho nông nghiệp bền vững.'
                : 'Researched since 2021 and tested at the Soil and Fertilizer Research Institute of Vietnam, ASTRI\'s organic microbial fertilizer line delivers practical results for sustainable agriculture.'}
            </p>
          </div>
        </div>

        <section style={{ background: 'var(--surface)', padding: '3rem 1rem' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={i} className="rounded-xl p-5 text-center" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <Icon size={24} className="mx-auto mb-2" style={{ color: 'var(--green-500)' }} />
                  <p className="text-2xl font-black mb-1" style={{ color: 'var(--green-600)' }}>{b.value}</p>
                  <p className="text-xs leading-snug" style={{ color: 'var(--text-2)' }}>{b.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section style={{ background: 'var(--bg)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Dòng sản phẩm' : 'Product Line'}
            </h2>
            <div className="space-y-8">
              {products.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <div className="p-1" style={{ background: p.color }} />
                    <div className="p-6" style={{ background: 'var(--surface)' }}>
                      <div className="flex flex-wrap gap-4 items-start mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--green-950)' }}>
                          <Icon size={22} style={{ color: 'var(--green-300)' }} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: 'var(--text-1)' }}>{p.name}</h3>
                          <p className="text-sm" style={{ color: 'var(--green-600)' }}>{p.tag}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)' }}>
                            {isVi ? 'Thông số kỹ thuật' : 'Technical Specifications'}
                          </p>
                          <ul className="space-y-2">
                            {p.specs.map((s, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green-500)' }} />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-lg p-4" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-3)' }}>
                              {isVi ? 'Hướng dẫn sử dụng' : 'Usage Guidance'}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{p.uses}</p>
                          </div>
                          <div className="rounded-lg p-4" style={{ background: 'var(--green-950)' }}>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--green-300)' }}>
                              {isVi ? 'Liều lượng khuyến cáo' : 'Recommended Dosage'}
                            </p>
                            <p className="text-sm font-medium text-white">{p.dosage}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--surface)', padding: '4rem 1rem' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-1)' }}>
              {isVi ? 'Nơi mua & Đặt hàng số lượng lớn' : 'Where to Buy & Bulk Orders'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <ShoppingBag size={24} className="mb-3" style={{ color: 'var(--green-500)' }} />
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Mua lẻ & Đại lý cấp 1' : 'Retail & Tier-1 Distributors'}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {isVi
                    ? 'Sản phẩm hiện có tại các đại lý vật tư nông nghiệp tại Cà Mau, An Giang và Cần Thơ. Liên hệ ASTRI để được giới thiệu đại lý gần nhất hoặc đặt hàng trực tiếp qua website.'
                    : 'Products are currently available at agricultural supply agents in Ca Mau, An Giang, and Can Tho. Contact ASTRI to be referred to the nearest agent or to order directly through the website.'}
                </p>
              </div>
              <div className="rounded-xl p-6" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <FlaskConical size={24} className="mb-3" style={{ color: 'var(--green-500)' }} />
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                  {isVi ? 'Đặt hàng số lượng lớn & HTX' : 'Bulk Orders & Cooperatives'}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {isVi
                    ? 'Hợp tác xã và doanh nghiệp đặt hàng từ 1 tấn trở lên được hưởng chính sách giá đặc biệt, hỗ trợ kỹ thuật tại chỗ và tập huấn sử dụng sản phẩm miễn phí.'
                    : 'Cooperatives and enterprises ordering 1 tonne or more receive special pricing, on-site technical support, and complimentary product-use training.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--green-950)', padding: '4rem 1rem' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isVi ? 'Nhận tư vấn & Báo giá sản phẩm' : 'Get Product Advice & Pricing'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.75 }}>
              {isVi
                ? 'Chuyên gia ASTRI sẵn sàng tư vấn lựa chọn sản phẩm phù hợp và cung cấp báo giá chi tiết cho đơn hàng số lượng lớn.'
                : 'ASTRI specialists are ready to advise on the right product selection and provide detailed quotes for bulk orders.'}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--green-600)' }}
            >
              {isVi ? 'Liên hệ đặt hàng' : 'Contact to Order'}
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

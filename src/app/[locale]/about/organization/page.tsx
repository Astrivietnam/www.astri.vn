import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type Department = {
  key: string
  vi: string
  en: string
  children?: { vi: string; en: string }[]
}

const VIEN_TRUONG = { vi: 'Viện trưởng', en: 'Director General' }
const PHO_VIEN_TRUONG = [
  { vi: 'Phó Viện trưởng phụ trách Nghiên cứu', en: 'Deputy Director – Research' },
  { vi: 'Phó Viện trưởng phụ trách Kinh doanh', en: 'Deputy Director – Business' },
]

const DEPARTMENTS: Department[] = [
  {
    key: 'research',
    vi: 'Phòng Nghiên cứu & Phát triển',
    en: 'Research & Development Dept.',
    children: [
      { vi: 'Bộ phận Công nghệ sinh học', en: 'Biotechnology Unit' },
      { vi: 'Bộ phận Vi sinh vật', en: 'Microbiology Unit' },
    ],
  },
  {
    key: 'production',
    vi: 'Phòng Sản xuất',
    en: 'Production Dept.',
    children: [
      { vi: 'Xưởng Phân bón hữu cơ', en: 'Organic Fertilizer Workshop' },
      { vi: 'Xưởng Tinh dầu Oresoi', en: 'Oresoi Essential Oil Workshop' },
    ],
  },
  {
    key: 'farm',
    vi: 'Trang trại Bình Dương',
    en: 'Binh Duong Farm',
    children: [
      { vi: 'Khu thực nghiệm', en: 'Trial Area' },
      { vi: 'Khu trình diễn', en: 'Demo Area' },
    ],
  },
  {
    key: 'trade',
    vi: 'Phòng Thương mại & Hợp tác',
    en: 'Trade & Cooperation Dept.',
    children: [
      { vi: 'Bộ phận Xúc tiến thương mại', en: 'Trade Promotion Unit' },
      { vi: 'Bộ phận Hợp tác quốc tế', en: 'International Cooperation Unit' },
    ],
  },
  {
    key: 'training',
    vi: 'Phòng Đào tạo',
    en: 'Training Dept.',
  },
  {
    key: 'admin',
    vi: 'Phòng Hành chính – Tổng hợp',
    en: 'Administration Dept.',
  },
]

const BOX = {
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  textAlign: 'center' as const,
  fontSize: '0.85rem',
  fontWeight: 600,
  lineHeight: 1.4,
  display: 'inline-block',
  minWidth: '160px',
}

const LINE_V: React.CSSProperties = {
  width: '2px',
  height: '24px',
  background: 'var(--green-300)',
  margin: '0 auto',
}

const LINE_H_WRAPPER: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: 0,
}

export default async function OrganizationPage({
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
        {/* Page header */}
        <div
          style={{
            background: 'linear-gradient(160deg, var(--green-950), var(--green-800))',
            padding: '4rem 1rem 3rem',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--green-300)' }}
            >
              {isVi ? 'Giới thiệu' : 'About'}
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Cơ cấu tổ chức' : 'Organizational Structure'}
            </h1>
          </div>
        </div>

        {/* Org chart */}
        <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <div style={{ minWidth: '640px' }}>

              {/* Director */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    ...BOX,
                    background: 'var(--green-800)',
                    color: '#fff',
                    padding: '0.75rem 2rem',
                    fontSize: '0.95rem',
                  }}
                >
                  {isVi ? VIEN_TRUONG.vi : VIEN_TRUONG.en}
                </div>
              </div>

              <div style={LINE_V} />

              {/* Deputy Directors */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {PHO_VIEN_TRUONG.map((p, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        ...BOX,
                        background: 'var(--green-700)',
                        color: '#fff',
                      }}
                    >
                      {isVi ? p.vi : p.en}
                    </div>
                  </div>
                ))}
              </div>

              {/* Connector line from deputies to departments */}
              <div style={{ position: 'relative', margin: '0 auto', maxWidth: '800px' }}>
                <div
                  style={{
                    height: '24px',
                    borderLeft: '2px solid var(--green-300)',
                    borderRight: '2px solid var(--green-300)',
                    borderTop: '2px solid var(--green-300)',
                    marginTop: 0,
                    marginLeft: '10%',
                    marginRight: '10%',
                  }}
                />
              </div>

              {/* Departments */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '0',
                }}
              >
                {DEPARTMENTS.map((dept) => (
                  <div key={dept.key}>
                    {/* Vertical line up */}
                    <div style={LINE_V} />
                    <div
                      style={{
                        ...BOX,
                        background: 'var(--green-100)',
                        color: 'var(--green-900)',
                        border: '1px solid var(--green-300)',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                    >
                      {isVi ? dept.vi : dept.en}
                    </div>

                    {/* Sub-units */}
                    {dept.children && (
                      <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                        {dept.children.map((child, ci) => (
                          <div key={ci} style={{ width: '100%', textAlign: 'center' }}>
                            <div style={LINE_V} />
                            <div
                              style={{
                                ...BOX,
                                background: 'var(--surface)',
                                color: 'var(--text-2)',
                                border: '1px solid var(--border)',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                width: '100%',
                                boxSizing: 'border-box',
                              }}
                            >
                              {isVi ? child.vi : child.en}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Departments list */}
        <section className="py-16 px-4" style={{ background: 'var(--surface)' }}>
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
            >
              {isVi ? 'Các phòng ban & bộ phận' : 'Departments & Units'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.key}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ background: 'var(--green-600)' }}
                  />
                  <h3 className="font-bold mb-2" style={{ color: 'var(--text-1)' }}>
                    {isVi ? dept.vi : dept.en}
                  </h3>
                  {dept.children && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {dept.children.map((child, ci) => (
                        <li
                          key={ci}
                          className="text-sm"
                          style={{ color: 'var(--text-2)', paddingLeft: '0.75rem', borderLeft: '2px solid var(--green-200)', marginBottom: '0.35rem' }}
                        >
                          {isVi ? child.vi : child.en}
                        </li>
                      ))}
                    </ul>
                  )}
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

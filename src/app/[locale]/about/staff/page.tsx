import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { supabase, type Staff } from '@/lib/supabase'
import { Mail, Users } from 'lucide-react'
import Image from 'next/image'

export default async function StaffPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isVi = locale === 'vi'

  const { data: allStaff } = await supabase
    .from('staff')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const HARDCODED_LEADERSHIP = [
    {
      id: 'h1', is_leadership: true, is_active: true, sort_order: 1,
      name_vi: 'ThS. Nguyễn Thị Lương', name_en: 'MSc. Nguyen Thi Luong',
      title_vi: 'Viện trưởng', title_en: 'Director',
      department_vi: 'Ban lãnh đạo', department_en: 'Leadership Board',
      bio_vi: 'Thạc sĩ chuyên ngành Khoa học Cây trồng, có nhiều năm kinh nghiệm nghiên cứu ứng dụng trong lĩnh vực nông nghiệp bền vững và chuyển giao công nghệ.',
      bio_en: 'MSc in Crop Science, with extensive experience in applied research in sustainable agriculture and technology transfer.',
      email: 'luong.nguyen@astri.vn', photo_url: null,
    },
    {
      id: 'h2', is_leadership: true, is_active: true, sort_order: 2,
      name_vi: 'ThS. Phạm Quyết Tiến', name_en: 'MSc. Pham Quyet Tien',
      title_vi: 'Phó Viện trưởng', title_en: 'Deputy Director',
      department_vi: 'Ban lãnh đạo', department_en: 'Leadership Board',
      bio_vi: 'Thạc sĩ chuyên ngành Công nghệ sinh học, phụ trách mảng nghiên cứu khoa học và hợp tác quốc tế của Viện.',
      bio_en: 'MSc in Biotechnology, responsible for scientific research and international cooperation.',
      email: null, photo_url: null,
    },
    {
      id: 'h3', is_leadership: true, is_active: true, sort_order: 3,
      name_vi: 'Ls. Chử Đức Toàn', name_en: 'Atty. Chu Duc Toan',
      title_vi: 'Phó Viện trưởng', title_en: 'Deputy Director',
      department_vi: 'Ban lãnh đạo', department_en: 'Leadership Board',
      bio_vi: 'Luật sư, phụ trách công tác pháp chế, hợp tác thương mại và phát triển doanh nghiệp của Viện.',
      bio_en: 'Legal counsel, responsible for legal affairs, commercial partnerships, and business development.',
      email: null, photo_url: null,
    },
    {
      id: 'h4', is_leadership: true, is_active: true, sort_order: 4,
      name_vi: 'Chử Thị Hồng Hải', name_en: 'Chu Thi Hong Hai',
      title_vi: 'Kế toán trưởng', title_en: 'Chief Accountant',
      department_vi: 'Ban Tài chính', department_en: 'Finance Department',
      bio_vi: 'Phụ trách công tác tài chính, kế toán và quản lý ngân sách của Viện ASTRI.',
      bio_en: 'Responsible for financial management, accounting, and budget oversight at ASTRI.',
      email: null, photo_url: null,
    },
  ]

  const dbStaff: Staff[] = allStaff ?? []
  const staff = dbStaff.length > 0 ? dbStaff : (HARDCODED_LEADERSHIP as unknown as Staff[])
  const leadership = dbStaff.length > 0
    ? dbStaff.filter((s) => s.is_leadership)
    : (HARDCODED_LEADERSHIP as unknown as Staff[])
  const researchers = dbStaff.filter((s) => !s.is_leadership)

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
              {isVi ? 'Đội ngũ nhân sự' : 'Our People'}
            </h1>
            <p className="mt-3 text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {isVi
                ? 'Đội ngũ chuyên gia, nhà khoa học và cán bộ nghiên cứu giàu kinh nghiệm của Viện ASTRI.'
                : 'ASTRI\'s team of experienced experts, scientists, and research staff.'}
            </p>
          </div>
        </div>

        {/* Leadership */}
        {leadership.length > 0 && (
          <section className="py-16 px-4" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}
                >
                  <Users size={18} />
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
                >
                  {isVi ? 'Ban lãnh đạo' : 'Leadership'}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {leadership.map((person) => (
                  <div
                    key={person.id}
                    className="rounded-xl overflow-hidden"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    {/* Photo */}
                    <div
                      style={{
                        height: '220px',
                        background: 'var(--surface-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {person.photo_url ? (
                        <Image
                          src={person.photo_url}
                          alt={isVi ? person.name_vi : person.name_en}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'var(--green-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            color: 'var(--green-700)',
                            fontWeight: 700,
                          }}
                        >
                          {(isVi ? person.name_vi : person.name_en).charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ color: 'var(--text-1)' }}
                      >
                        {isVi ? person.name_vi : person.name_en}
                      </h3>
                      {(isVi ? person.title_vi : person.title_en) && (
                        <p
                          className="text-sm font-semibold mb-1"
                          style={{ color: 'var(--green-700)' }}
                        >
                          {isVi ? person.title_vi : person.title_en}
                        </p>
                      )}
                      {(isVi ? person.department_vi : person.department_en) && (
                        <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>
                          {isVi ? person.department_vi : person.department_en}
                        </p>
                      )}
                      {(isVi ? person.bio_vi : person.bio_en) && (
                        <p
                          className="text-sm"
                          style={{
                            color: 'var(--text-2)',
                            lineHeight: 1.7,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {isVi ? person.bio_vi : person.bio_en}
                        </p>
                      )}
                      {person.email && (
                        <a
                          href={`mailto:${person.email}`}
                          className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium"
                          style={{ color: 'var(--green-700)', textDecoration: 'none' }}
                        >
                          <Mail size={13} />
                          {person.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Research Staff */}
        {researchers.length > 0 && (
          <section
            className="py-16 px-4"
            style={{ background: leadership.length > 0 ? 'var(--surface)' : 'var(--bg)' }}
          >
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-2xl font-bold mb-8"
                style={{ color: 'var(--text-1)', letterSpacing: '-0.02em' }}
              >
                {isVi ? 'Cán bộ nghiên cứu' : 'Research Staff'}
              </h2>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {researchers.map((person) => (
                  <div
                    key={person.id}
                    className="rounded-xl p-5"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
                  >
                    {/* Avatar */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: person.photo_url ? 'transparent' : 'var(--green-100)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          color: 'var(--green-700)',
                          fontWeight: 700,
                          flexShrink: 0,
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        {person.photo_url ? (
                          <Image
                            src={person.photo_url}
                            alt={isVi ? person.name_vi : person.name_en}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="44px"
                          />
                        ) : (
                          (isVi ? person.name_vi : person.name_en).charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>
                          {isVi ? person.name_vi : person.name_en}
                        </p>
                        {(isVi ? person.title_vi : person.title_en) && (
                          <p className="text-xs" style={{ color: 'var(--green-700)' }}>
                            {isVi ? person.title_vi : person.title_en}
                          </p>
                        )}
                      </div>
                    </div>
                    {(isVi ? person.department_vi : person.department_en) && (
                      <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                        {isVi ? person.department_vi : person.department_en}
                      </p>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center gap-1 mt-2 text-xs"
                        style={{ color: 'var(--text-3)', textDecoration: 'none' }}
                      >
                        <Mail size={11} />
                        {person.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state — only shows when DB returns zero and hardcoded fallback is also somehow empty */}
        {staff.length === 0 && (
          <section className="py-24 px-4 text-center" style={{ background: 'var(--bg)' }}>
            <p style={{ color: 'var(--text-3)' }}>
              {isVi ? 'Thông tin đội ngũ đang được cập nhật.' : 'Staff information is being updated.'}
            </p>
          </section>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  )
}

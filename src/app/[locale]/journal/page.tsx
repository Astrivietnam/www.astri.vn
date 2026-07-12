import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { BookOpen, FileText, Send, Award, Calendar, ArrowRight, ExternalLink, Users } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'vi' ? 'Tạp chí Sinh thái Nông nghiệp' : 'Agricultural Ecology Journal',
    description: locale === 'vi'
      ? 'Tạp chí Sinh thái Nông nghiệp — cơ quan ngôn luận khoa học của Viện ASTRI, chuyên đăng tải các công trình nghiên cứu trong lĩnh vực nông nghiệp sinh thái.'
      : 'Agricultural Ecology Journal — ASTRI\'s scientific publication platform for agricultural ecology research.',
  }
}

const ISSUES = [
  {
    vol: 'Vol. 5, No. 2',
    year: '2026',
    title_vi: 'Công nghệ sinh học trong canh tác lúa hữu cơ',
    title_en: 'Biotechnology in Organic Rice Cultivation',
    articles: 8,
  },
  {
    vol: 'Vol. 5, No. 1',
    year: '2026',
    title_vi: 'Giải pháp IoT giám sát trang trại thông minh',
    title_en: 'IoT Solutions for Smart Farm Monitoring',
    articles: 7,
  },
  {
    vol: 'Vol. 4, No. 2',
    year: '2025',
    title_vi: 'Vi sinh vật có lợi trong phân bón hữu cơ vi sinh',
    title_en: 'Beneficial Microorganisms in Microbial Organic Fertilizers',
    articles: 9,
  },
  {
    vol: 'Vol. 4, No. 1',
    year: '2025',
    title_vi: 'Chuyển giao công nghệ nuôi tôm thâm canh',
    title_en: 'Technology Transfer for Intensive Shrimp Farming',
    articles: 6,
  },
]

const SCOPES_VI = [
  'Nông nghiệp sinh thái và phát triển bền vững',
  'Công nghệ sinh học ứng dụng trong nông nghiệp',
  'Phân bón hữu cơ vi sinh và cải tạo đất',
  'IoT, Blockchain và chuyển đổi số nông nghiệp',
  'Chuyển giao công nghệ và nhân rộng mô hình',
  'Biến đổi khí hậu và thích ứng trong sản xuất nông nghiệp',
  'Kinh tế nông nghiệp và chuỗi giá trị',
]

const SCOPES_EN = [
  'Ecological agriculture and sustainable development',
  'Applied biotechnology in agriculture',
  'Microbial organic fertilizers and soil improvement',
  'IoT, Blockchain and agricultural digital transformation',
  'Technology transfer and model scaling',
  'Climate change adaptation in agricultural production',
  'Agricultural economics and value chains',
]

const STEPS_VI = [
  { title: 'Nộp bản thảo', desc: 'Gửi bài qua email hoặc hệ thống nộp bài trực tuyến. Bài cần đúng định dạng template của tạp chí.' },
  { title: 'Phản biện kín', desc: 'Ban biên tập gửi bài cho 2–3 phản biện độc lập theo quy trình double-blind peer review.' },
  { title: 'Chỉnh sửa & phê duyệt', desc: 'Tác giả chỉnh sửa theo góp ý. Ban biên tập quyết định chấp nhận, yêu cầu sửa lại, hoặc từ chối.' },
  { title: 'Xuất bản', desc: 'Bài được biên tập kỹ thuật, định dạng và đăng tải trên website tạp chí. Tác giả nhận bản PDF chính thức.' },
]

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const vi = locale === 'vi'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header locale={locale} />
      <main style={{ flex: 1, paddingTop: '60px' }}>

        {/* Hero */}
        <div style={{
          background: 'linear-gradient(160deg, var(--green-950) 0%, #1A4A2A 60%, var(--green-800) 100%)',
          padding: '5rem 1rem 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(141,198,63,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '4px 14px', borderRadius: '9999px',
              background: 'rgba(141,198,63,0.12)', border: '1px solid rgba(141,198,63,0.25)',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B8E07A', marginBottom: '1.5rem',
            }}>
              <BookOpen size={12} />
              {vi ? 'Tạp chí khoa học' : 'Scientific Journal'}
            </div>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 800,
              color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              {vi ? 'Tạp chí Sinh thái Nông nghiệp' : 'Agricultural Ecology Journal'}
            </h1>
            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75, maxWidth: '600px', marginBottom: '2rem',
            }}>
              {vi
                ? 'Cơ quan ngôn luận khoa học chính thức của Viện ASTRI — chuyên đăng tải kết quả nghiên cứu trong lĩnh vực nông nghiệp sinh thái, công nghệ sinh học và chuyển giao công nghệ nông nghiệp.'
                : 'The official scientific publication of ASTRI — publishing research results in ecological agriculture, biotechnology, and agricultural technology transfer.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href="https://sinhthainongnghiep.net.vn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 22px', borderRadius: '8px',
                  background: '#8DC63F', color: '#0D2B16',
                  fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                }}
              >
                {vi ? 'Truy cập tạp chí' : 'Visit journal'} <ExternalLink size={14} />
              </a>
              <a
                href="#submit"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 22px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)', color: '#fff',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                }}
              >
                {vi ? 'Gửi bài đăng' : 'Submit article'} <Send size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ background: 'var(--green-950)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{
            maxWidth: '72rem', margin: '0 auto', padding: '0 1rem',
            display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          }}>
            {[
              { value: 'ISSN', sub: '2734-9578', label: vi ? 'Mã số' : 'ISSN' },
              { value: '2×', sub: vi ? 'mỗi năm' : 'per year', label: vi ? 'Xuất bản' : 'Published' },
              { value: '2021', sub: vi ? 'thành lập' : 'founded', label: vi ? 'Năm ra đời' : 'Founded' },
              { value: 'OA', sub: 'Open Access', label: vi ? 'Truy cập mở' : 'Access' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '1.25rem 0.75rem', textAlign: 'center',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : undefined,
              }}>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#8DC63F', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About & Scope */}
        <section style={{ padding: '5rem 1rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: '3rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-600)', marginBottom: '0.75rem' }}>
                {vi ? 'Giới thiệu' : 'About the Journal'}
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
                {vi ? 'Kết nối khoa học với thực tiễn' : 'Bridging science and practice'}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1rem' }}>
                {vi
                  ? 'Tạp chí Sinh thái Nông nghiệp là diễn đàn trao đổi học thuật giữa các nhà khoa học, kỹ sư, và chuyên gia trong và ngoài nước về các vấn đề nông nghiệp bền vững.'
                  : 'The Agricultural Ecology Journal is an academic exchange platform for scientists, engineers, and experts in Vietnam and abroad on sustainable agriculture.'}
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '2rem' }}>
                {vi
                  ? 'Tạp chí được Viện ASTRI — thuộc Liên hiệp các Hội Khoa học và Kỹ thuật Việt Nam (VUSTA) — xuất bản hai số mỗi năm, đăng các bài nghiên cứu bằng tiếng Việt và tiếng Anh.'
                  : 'Published by ASTRI — under VUSTA — twice a year, featuring research articles in both Vietnamese and English.'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', borderRadius: '10px', background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
                <Award size={18} style={{ color: 'var(--green-700)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--green-800)', fontWeight: 500 }}>
                  {vi ? 'Đã được Bộ Thông tin và Truyền thông cấp phép. Số ISSN: 2734-9578.' : 'Licensed by the Ministry of Information and Communications. ISSN: 2734-9578.'}
                </span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1rem' }}>
                {vi ? 'Phạm vi chủ đề' : 'Scope & Topics'}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(vi ? SCOPES_VI : SCOPES_EN).map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                      background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '1px',
                    }}>
                      <FileText size={11} style={{ color: 'var(--green-700)' }} />
                    </div>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Recent issues */}
        <section style={{ padding: '5rem 1rem', background: 'var(--surface)' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-600)', marginBottom: '6px' }}>
                  {vi ? 'Số gần đây' : 'Recent Issues'}
                </p>
                <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
                  {vi ? 'Các số đã xuất bản' : 'Published Issues'}
                </h2>
              </div>
              <a href="https://sinhthainongnghiep.net.vn" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--green-700)', textDecoration: 'none' }}>
                {vi ? 'Xem tất cả' : 'View all'} <ExternalLink size={13} />
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap: '1rem' }}>
              {ISSUES.map((issue, i) => (
                <a key={i} href="https://sinhthainongnghiep.net.vn" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', flexDirection: 'column',
                    padding: '1.5rem', borderRadius: '12px',
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    textDecoration: 'none',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: 'var(--green-50)', color: 'var(--green-700)' }}>
                      {issue.vol}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-3)' }}>
                      <Calendar size={11} />{issue.year}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.45, flex: 1, marginBottom: '12px' }}>
                    {vi ? issue.title_vi : issue.title_en}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{issue.articles} {vi ? 'bài báo' : 'articles'}</span>
                    <ArrowRight size={13} style={{ color: 'var(--green-600)' }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Submission guide */}
        <section id="submit" style={{ padding: '5rem 1rem', background: 'var(--bg)' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green-600)', marginBottom: '8px' }}>
                {vi ? 'Hướng dẫn' : 'Guidelines'}
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
                {vi ? 'Quy trình gửi bài' : 'Submission Process'}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '1.25rem' }}>
              {STEPS_VI.map((step, i) => (
                <div key={i} style={{ padding: '1.75rem', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--green-950)', color: '#8DC63F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '0.85rem', marginBottom: '1rem',
                  }}>{i + 1}</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '8px' }}>
                    {vi ? step.title : ['Submit manuscript','Double-blind review','Revise & approve','Publish'][i]}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                    {vi ? step.desc : [
                      'Submit via email or the online submission system. Articles must follow the journal\'s template.',
                      'The editorial board sends the article to 2–3 independent reviewers via double-blind peer review.',
                      'Authors revise based on feedback. The board decides to accept, request revisions, or reject.',
                      'Articles are technically edited, formatted, and published on the journal website. Authors receive the official PDF.',
                    ][i]}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA box */}
            <div style={{
              marginTop: '3rem', padding: '2.5rem', borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--green-950), #1A4A2A)',
              display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                  {vi ? 'Sẵn sàng gửi bài?' : 'Ready to submit?'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', maxWidth: '420px' }}>
                  {vi
                    ? 'Tải template bài báo, xem hướng dẫn chi tiết và gửi bài qua trang web chính thức của tạp chí.'
                    : 'Download the article template, view detailed guidelines, and submit your article on the journal\'s official website.'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://sinhthainongnghiep.net.vn" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '11px 22px', borderRadius: '8px',
                    background: '#8DC63F', color: '#0D2B16',
                    fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                  }}>
                  <Send size={14} />
                  {vi ? 'Nộp bài ngay' : 'Submit now'}
                </a>
                <a href={`mailto:tapchi@astri.vn`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '11px 22px', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.1)', color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                  }}>
                  {vi ? 'Email ban biên tập' : 'Email editorial board'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial board teaser */}
        <section style={{ padding: '4rem 1rem', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} style={{ color: 'var(--green-700)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '2px' }}>
                  {vi ? 'Ban Biên tập & Hội đồng Khoa học' : 'Editorial Board & Scientific Council'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-2)' }}>
                  {vi
                    ? 'Gồm các chuyên gia đầu ngành trong và ngoài nước, phản biện độc lập, đảm bảo chất lượng khoa học.'
                    : 'Composed of leading domestic and international experts, independent reviewers, ensuring scientific quality.'}
                </p>
              </div>
            </div>
            <Link href={`/${locale}/about/staff`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px', borderRadius: '8px',
                background: 'var(--green-800)', color: '#fff',
                fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
              }}>
              {vi ? 'Xem đội ngũ' : 'View team'} <ArrowRight size={13} />
            </Link>
          </div>
        </section>

      </main>
      <Footer locale={locale} />
    </div>
  )
}

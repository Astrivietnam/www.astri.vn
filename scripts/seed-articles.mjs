// Script thêm bài viết vào Supabase
// Chạy: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-articles.mjs

import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Thiếu SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY trong env')
  process.exit(1)
}

const supabase = createClient(url, key)

const articles = [
  // ── BÀI TỪ TẠPCHÍ SINH THÁI NÔNG NGHIỆP ──
  {
    slug: 'giai-ma-gia-tri-phu-pham-nong-nghiep-mo-vang-tren-dong-ruong-viet-nam',
    category: 'research',
    title_vi: 'Giải mã giá trị của những "mỏ vàng" bị lãng quên trên đồng ruộng Việt Nam',
    title_en: 'Unlocking the Value of Forgotten "Gold Mines" in Vietnamese Rice Fields',
    excerpt_vi: 'Hàng triệu tấn phụ phẩm nông nghiệp đang bị đốt bỏ hoặc lãng phí. Bốn loại nguyên liệu sinh khối chủ lực — gáo dừa, trấu, rơm rạ, vỏ cà phê — có tiềm năng kinh tế khổng lồ nếu được khai thác đúng hướng.',
    excerpt_en: 'Millions of tonnes of agricultural by-products are burned or wasted. Four key biomass materials — coconut shells, rice husks, straw, coffee hulls — hold enormous economic potential when properly harnessed.',
    content_vi: `<p>Hàng triệu tấn phụ phẩm nông nghiệp đang bị đốt bỏ hoặc lãng phí thay vì được tận dụng sản xuất hiệu quả. Bài viết phân tích bốn loại nguyên liệu sinh khối chủ lực có giá trị kinh tế cao hiện đang bị bỏ qua.</p>
<h2>Gáo dừa – Nguyên liệu sinh khối cao cấp</h2>
<p>Được định vị là nguồn sản xuất than hoạt tính chất lượng cao và than BBQ xuất khẩu. Đây là loại phụ phẩm có tiềm năng thương mại lớn nhất trong các thị trường xuất khẩu.</p>
<h2>Trấu và rơm rạ</h2>
<p>Nguồn tài nguyên dồi dào nhưng còn nhiều thách thức kỹ thuật, đặc biệt là hàm lượng silica cao ảnh hưởng đến chất lượng sản phẩm đầu ra. Cần công nghệ chuyên biệt để khai thác hiệu quả.</p>
<h2>Vỏ cà phê, bã mía, vỏ hạt cứng</h2>
<p>Những nguyên liệu đặc thù vùng miền, có giá trị cao trong các ứng dụng chuyên biệt và thị trường ngách.</p>
<h2>Chuyển tư duy từ "quản lý chất thải" sang "tạo ra nguồn lực kinh tế"</h2>
<p>Thay vì chính sách cấm đốt rơm rạ đơn thuần, cần tạo ra lợi ích kinh tế để nông dân tự nguyện chuyển hướng:</p>
<ul>
<li>Xây dựng hạ tầng chế biến quy mô vừa gắn với từng địa phương</li>
<li>Đầu tư công nghệ phù hợp với đặc tính nguyên liệu từng vùng</li>
<li>Thay đổi tư duy: phụ phẩm nông nghiệp là hàng hóa có giá trị, không phải rác thải</li>
</ul>
<p>Việt Nam đang đứng trước cơ hội lớn trong quá trình chuyển đổi sang kinh tế tuần hoàn và phát triển năng lượng sinh khối.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Chử Cương',
    published_at: '2026-07-11T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
  {
    slug: 'hue-hinh-thanh-nen-nong-nghiep-sinh-thai-hien-dai',
    category: 'technology',
    title_vi: 'Huế từng bước hình thành nền nông nghiệp sinh thái hiện đại từ sản xuất đến tiêu thụ',
    title_en: 'Hue Builds Modern Ecological Agriculture From Farm to Market',
    excerpt_vi: 'Thành phố Huế triển khai chiến lược toàn diện hiện đại hóa nông nghiệp theo hướng bền vững, áp dụng khoa học công nghệ xuyên suốt toàn chuỗi giá trị với mục tiêu Net Zero vào năm 2050.',
    excerpt_en: 'Hue City implements a comprehensive strategy to modernize agriculture sustainably, applying science and technology across the value chain with a Net Zero 2050 target.',
    content_vi: `<p>Thành phố Huế đang triển khai chiến lược toàn diện hiện đại hóa nông nghiệp theo hướng bền vững, áp dụng khoa học công nghệ xuyên suốt toàn chuỗi giá trị từ sản xuất đến tiêu thụ.</p>
<h2>Các sản phẩm chủ lực được phát triển</h2>
<ul>
<li>Rau má (sản phẩm bản địa đặc trưng)</li>
<li>Dưa lưới (canh tác công nghệ cao)</li>
<li>Lúa chất lượng cao (giảm phát thải)</li>
</ul>
<h2>Chiến lược liên kết chuỗi giá trị</h2>
<p>Huế xây dựng mô hình liên kết ba bên: nông dân – hợp tác xã – doanh nghiệp, giúp ổn định đầu ra sản phẩm và nâng cao giá trị kinh tế cho người sản xuất.</p>
<h2>Chuyển đổi số trong nông nghiệp</h2>
<p>Đưa sản phẩm lên các nền tảng thương mại điện tử để quảng bá thương hiệu, mở rộng thị trường tiêu thụ.</p>
<h2>Mục tiêu dài hạn đến 2035–2050</h2>
<ul>
<li>Phấn đấu có trên 10.000 hecta sản xuất phát thải thấp</li>
<li>Diện tích lúa phát thải thấp: khoảng 8.000 hecta</li>
<li>Mục tiêu phát thải ròng bằng 0 (Net Zero) vào năm 2050</li>
</ul>
<p>Huế được xem là mô hình điểm trong chuyển đổi nông nghiệp sinh thái cấp tỉnh, kết hợp giữa bảo tồn bản sắc vùng miền và ứng dụng công nghệ hiện đại.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Phi Hoàng – Văn Bốn',
    published_at: '2026-07-10T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
  {
    slug: 'viet-nam-khai-truong-san-giao-dich-carbon',
    category: 'trade',
    title_vi: 'Việt Nam chính thức khai trương Sàn giao dịch carbon, mở ra chương mới cho kinh tế xanh',
    title_en: 'Vietnam Officially Launches Carbon Trading Exchange, Opening New Chapter for Green Economy',
    excerpt_vi: 'Ngày 29/6/2026, Việt Nam khai trương Sàn giao dịch tín chỉ carbon trong nước — cột mốc quan trọng trong lộ trình đạt cam kết Net Zero và xây dựng kinh tế xanh quốc gia.',
    excerpt_en: 'On June 29, 2026, Vietnam launched its domestic carbon credit trading exchange — a major milestone on the path to its Net Zero commitment and green economy goals.',
    content_vi: `<p>Ngày 29/6/2026, Việt Nam chính thức khai trương Sàn giao dịch tín chỉ carbon trong nước – cột mốc quan trọng trong lộ trình đạt cam kết Net Zero và xây dựng kinh tế xanh quốc gia.</p>
<h2>Khung pháp lý</h2>
<ul>
<li>Nghị định 112/2026 về giảm phát thải khí nhà kính quốc tế</li>
<li>Quyết định 263/QĐ-TTg của Thủ tướng phân bổ hạn ngạch phát thải thí điểm (2025–2026)</li>
<li>Phân bổ hạn ngạch cho 110 cơ sở phát thải lớn trong ba lĩnh vực: nhiệt điện, thép, xi măng</li>
</ul>
<h2>Cơ cấu vận hành</h2>
<ul>
<li><strong>Đăng ký giao dịch:</strong> Sổ đăng ký quốc gia do Bộ Nông nghiệp quản lý</li>
<li><strong>Lưu ký:</strong> Trung tâm Lưu ký Chứng khoán Việt Nam (VSDC)</li>
<li><strong>Sàn giao dịch:</strong> Sở Giao dịch Chứng khoán Hà Nội (HNX)</li>
<li><strong>Ngân hàng thanh toán:</strong> BIDV (nhà cung cấp duy nhất)</li>
<li>Miễn phí giao dịch trong giai đoạn thí điểm đến hết 2028</li>
</ul>
<h2>Tác động kinh tế</h2>
<p>Sàn carbon tạo cơ hội cho doanh nghiệp mua bán hạn ngạch phát thải, đồng thời khuyến khích đổi mới công nghệ và tham gia chuỗi cung ứng phát thải thấp.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Nguyễn Long',
    published_at: '2026-06-30T08:00:00Z',
    is_published: true,
    is_featured: true,
  },
  {
    slug: 'he-thong-truy-xuat-nguon-goc-nong-san-quoc-gia',
    category: 'technology',
    title_vi: 'Nông sản Việt có "giấy thông hành" số: Hệ thống truy xuất nguồn gốc quốc gia chính thức vận hành',
    title_en: 'Vietnamese Agri-Products Get Digital Passport: National Traceability System Goes Live',
    excerpt_vi: 'Từ ngày 1/7/2026, Bộ Nông nghiệp và Môi trường đưa vào hoạt động Hệ thống truy xuất nguồn gốc nông sản quốc gia với hơn 18.500 sản phẩm từ 170 doanh nghiệp tại 24 tỉnh, thành phố.',
    excerpt_en: 'From July 1, 2026, the Ministry of Agriculture and Environment launched the National Agricultural Traceability System covering over 18,500 products from 170 enterprises across 24 provinces.',
    content_vi: `<p>Từ ngày 1/7/2026, Bộ Nông nghiệp và Môi trường chính thức đưa vào hoạt động Hệ thống truy xuất nguồn gốc nông sản quốc gia – một bước đột phá trong minh bạch hóa chuỗi cung ứng nông sản Việt Nam.</p>
<h2>Nền tảng công nghệ</h2>
<ul>
<li>Kiến trúc hiện đại, ứng dụng chữ ký số điện tử và công nghệ blockchain</li>
<li>Năng lực xử lý: khoảng 1.000 lượt tra cứu/giây</li>
<li>Công suất quét tem: hơn 85 triệu lần quét mỗi ngày</li>
</ul>
<h2>Dữ liệu hiện tại</h2>
<p>Hơn <strong>18.500 sản phẩm</strong> từ 170 doanh nghiệp tại 24 tỉnh, thành phố đã được đăng ký trên hệ thống.</p>
<h2>Kết quả thí điểm với sầu riêng</h2>
<p>Trong giai đoạn thử nghiệm, hệ thống được áp dụng cho xuất khẩu sầu riêng. Kết quả: 6 container sầu riêng của các doanh nghiệp xuất khẩu thành công sang Trung Quốc nhờ đáp ứng yêu cầu truy xuất nguồn gốc.</p>
<h2>Định hướng phát triển</h2>
<p>Phó Thủ tướng nhấn mạnh cần triển khai theo lộ trình phù hợp, ưu tiên các ngành hàng chủ lực xuất khẩu, hướng đến ba thị trường trọng điểm: Trung Quốc, EU, Hoa Kỳ.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Lưu Duy – Vũ Nhi',
    published_at: '2026-07-02T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
  {
    slug: 'diem-sang-nong-nghiep-6-thang-dau-nam-2026',
    category: 'news',
    title_vi: 'Những điểm sáng của ngành nông nghiệp 6 tháng đầu năm 2026',
    title_en: 'Agricultural Sector Highlights in the First Half of 2026',
    excerpt_vi: 'Toàn ngành nông, lâm, thủy sản đạt mức tăng trưởng 3,87%, đóng góp 5,66% vào GDP quốc gia. Xuất khẩu sầu riêng đạt 603.300 tấn, lúa đạt gần 20,5 triệu tấn, diện tích rừng bị thiệt hại giảm 59,1%.',
    excerpt_en: 'The agriculture, forestry and fishery sector grew 3.87%, contributing 5.66% to national GDP. Durian exports hit 603,300 tonnes, rice production neared 20.5 million tonnes, and forest damage fell 59.1%.',
    content_vi: `<p>Bài viết tổng kết thành tựu nổi bật của ngành nông, lâm, thủy sản Việt Nam 6 tháng đầu năm 2026. Toàn ngành đạt mức tăng trưởng <strong>3,87%</strong>, đóng góp <strong>5,66%</strong> vào tổng giá trị tăng thêm của nền kinh tế quốc dân.</p>
<h2>An ninh lương thực</h2>
<ul>
<li>Năng suất lúa đông xuân ước đạt <strong>69,8 tạ/ha</strong>, tăng 1,2 tạ/ha so với cùng kỳ</li>
<li>Sản lượng lúa ước đạt gần <strong>20,5 triệu tấn</strong></li>
<li>Chăn nuôi phát triển ổn định: sản lượng thịt lợn tăng <strong>4,8%</strong>, thịt gia cầm tăng <strong>5,6%</strong></li>
</ul>
<h2>Tăng trưởng xuất khẩu</h2>
<ul>
<li>Sầu riêng đạt <strong>603.300 tấn</strong>, tăng 12,7% so với cùng kỳ</li>
<li>Mít đạt <strong>512.000 tấn</strong>, tăng 10,3%</li>
<li>Thủy sản: tổng sản lượng đạt <strong>4.954.200 tấn</strong>, tăng 3,6%</li>
</ul>
<h2>Bảo vệ rừng</h2>
<p>Diện tích rừng bị thiệt hại chỉ còn <strong>347 ha</strong>, giảm <strong>59,1%</strong> so với cùng kỳ năm trước – kết quả ấn tượng trong công tác bảo vệ và phát triển rừng bền vững.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Vũ Nhi – Nhật Duy',
    published_at: '2026-07-07T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
  {
    slug: 'fao-ra-mat-ung-dung-cropsuit-nong-dan-chon-cay-dung-dat',
    category: 'technology',
    title_vi: 'FAO ra mắt ứng dụng CropSuit: Giúp nông dân chọn đúng cây, trồng đúng đất',
    title_en: 'FAO Launches CropSuit App to Help Farmers Choose the Right Crops for the Right Land',
    excerpt_vi: 'Ứng dụng CropSuit của FAO sử dụng dữ liệu khí hậu, thổ nhưỡng và thị trường để tư vấn nông dân lựa chọn cây trồng phù hợp nhất với điều kiện địa phương, tối ưu năng suất và giảm rủi ro.',
    excerpt_en: 'FAO\'s CropSuit application uses climate, soil and market data to advise farmers on the most suitable crops for local conditions, optimising yields and reducing risks.',
    content_vi: `<p>Tổ chức Lương thực và Nông nghiệp Liên Hợp Quốc (FAO) vừa ra mắt ứng dụng CropSuit — công cụ hỗ trợ nông dân lựa chọn cây trồng dựa trên dữ liệu khoa học.</p>
<h2>Tính năng chính</h2>
<p>CropSuit tích hợp ba nguồn dữ liệu quan trọng: khí hậu địa phương, đặc tính thổ nhưỡng và tín hiệu thị trường để đưa ra gợi ý cây trồng phù hợp nhất cho từng mảnh đất cụ thể.</p>
<h2>Ứng dụng tại Việt Nam</h2>
<p>Với đặc thù địa hình và khí hậu đa dạng, CropSuit có tiềm năng lớn trong việc hỗ trợ nông dân Việt Nam, đặc biệt tại các vùng chuyển đổi cơ cấu cây trồng như Đồng bằng sông Cửu Long và Tây Nguyên.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Ban biên tập',
    published_at: '2026-07-05T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
  {
    slug: 'khay-tai-che-nong-san-giai-phap-lang-phi-thuc-pham-rac-thai-nhua',
    category: 'technology',
    title_vi: 'Khay tái chế cho nông sản tươi: Giải pháp kép cho bài toán lãng phí thực phẩm và rác thải nhựa',
    title_en: 'Recycled Trays for Fresh Produce: A Dual Solution for Food Waste and Plastic Pollution',
    excerpt_vi: 'Công nghệ khay bao bì tái chế từ bã mía và sợi nông nghiệp đang nổi lên như giải pháp bền vững thay thế hộp xốp truyền thống, giảm đồng thời rác thải nhựa và thất thoát thực phẩm sau thu hoạch.',
    excerpt_en: 'Recycled packaging trays made from sugarcane bagasse and agricultural fibres are emerging as a sustainable alternative to traditional foam boxes, simultaneously reducing plastic waste and post-harvest food losses.',
    content_vi: `<p>Công nghệ khay bao bì tái chế từ bã mía và sợi nông nghiệp đang nổi lên như giải pháp bền vững thay thế hộp xốp truyền thống trong bảo quản và vận chuyển nông sản tươi.</p>
<h2>Ưu điểm kỹ thuật</h2>
<ul>
<li>Phân hủy sinh học hoàn toàn trong 60–90 ngày</li>
<li>Chịu ẩm tốt, bảo quản nhiệt độ thấp hiệu quả</li>
<li>Giảm 30–40% tổn thất sau thu hoạch so với bao bì thông thường</li>
</ul>
<h2>Tiềm năng tại Việt Nam</h2>
<p>Với lượng bã mía từ ngành mía đường và rơm rạ từ canh tác lúa, Việt Nam có nguồn nguyên liệu dồi dào để phát triển ngành bao bì xanh, đồng thời giải quyết bài toán phụ phẩm nông nghiệp.</p>
<p><em>Nguồn: Tạp chí Sinh thái Nông nghiệp – sinhthainongnghiep.net.vn</em></p>`,
    author: 'Ban biên tập',
    published_at: '2026-07-04T08:00:00Z',
    is_published: true,
    is_featured: false,
  },
]

async function main() {
  console.log(`Inserting ${articles.length} articles...`)

  for (const article of articles) {
    // Check if slug already exists
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', article.slug)
      .single()

    if (existing) {
      console.log(`  SKIP (exists): ${article.slug}`)
      continue
    }

    const { error } = await supabase.from('posts').insert(article)
    if (error) {
      console.error(`  ERROR: ${article.slug}:`, error.message)
    } else {
      console.log(`  OK: ${article.title_vi}`)
    }
  }

  console.log('\nDone.')

  // Show total count
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  console.log(`Total published posts: ${count}`)
}

main()

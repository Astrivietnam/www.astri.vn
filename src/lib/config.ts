export const siteConfig = {
  name: 'Viện ASTRI',
  nameFull: 'Viện Nghiên cứu Công nghệ Hỗ trợ Nông nghiệp',
  nameEn: 'Agricultural Support Technology Research Institute',
  acronym: 'ASTRI',
  url: 'https://www.astri.vn',
  email: 'contact@astri.vn',
  adminEmail: 'hoangcd@astri.vn',
  address: 'Số 56 Du Nội, Xã Đồng Tháp, Huyện Đan Phượng, Hà Nội',
  phone: '',
  locales: ['vi', 'en'] as const,
  defaultLocale: 'vi' as const,
}

export type Locale = (typeof siteConfig.locales)[number]

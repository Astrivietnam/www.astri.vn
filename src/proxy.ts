import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'astri-dev-secret-change-in-prod-2026'

function getLocaleFromPathname(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/)
  return match ? match[1] : 'vi'
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl

  // Check if pathname matches /[locale]/admin/* but NOT /[locale]/admin/login
  const adminRouteMatch = pathname.match(/^\/[a-z]{2}\/admin(\/|$)/)
  const isLoginRoute = pathname.match(/^\/[a-z]{2}\/admin\/login(\/|$)/)

  if (adminRouteMatch && !isLoginRoute) {
    const locale = getLocaleFromPathname(pathname)
    const token = request.cookies.get('astri_admin_token')?.value

    if (!token) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(token, secret)
    } catch {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

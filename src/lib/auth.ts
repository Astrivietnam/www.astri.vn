import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export type AdminTokenPayload = {
  id: string
  email: string
  role: 'super_admin' | 'admin' | 'editor' | 'author'
  name: string
}

export const ADMIN_COOKIE_NAME = 'astri_admin_token'

const DEV_SECRET = 'astri-dev-secret-do-not-use-in-production-change-this'

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET ?? DEV_SECRET
  return new TextEncoder().encode(secret)
}

export async function signAdminToken(payload: AdminTokenPayload): Promise<string> {
  const secret = getJwtSecret()
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
  return token
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const secret = getJwtSecret()
    const { payload } = await jwtVerify(token, secret)
    const { id, email, role, name } = payload as AdminTokenPayload & Record<string, unknown>
    if (
      typeof id !== 'string' ||
      typeof email !== 'string' ||
      typeof role !== 'string' ||
      typeof name !== 'string'
    ) {
      return null
    }
    return { id, email, role: role as AdminTokenPayload['role'], name }
  } catch {
    return null
  }
}

export async function getAdminSession(
  cookieStore: ReadonlyRequestCookies
): Promise<AdminTokenPayload | null> {
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)
  if (!cookie?.value) return null
  return verifyAdminToken(cookie.value)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

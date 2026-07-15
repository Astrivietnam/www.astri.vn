import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase';
import { getAdminSession, hashPassword } from '@/lib/auth';

const VALID_ROLES = ['super_admin', 'admin', 'editor', 'author'] as const;
type Role = (typeof VALID_ROLES)[number];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireManager() {
  const cookieStore = await cookies();
  const session = await getAdminSession(cookieStore);
  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }),
    };
  }
  if (session.role !== 'super_admin' && session.role !== 'admin') {
    return {
      session: null,
      response: NextResponse.json({ success: false, error: 'Không có quyền' }, { status: 403 }),
    };
  }
  return { session, response: null };
}

export async function GET() {
  try {
    const { session, response } = await requireManager();
    if (!session) return response;

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, name, role, is_active, last_login_at, created_at')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, users: data });
  } catch (err) {
    console.error('[admin/users GET] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { session, response } = await requireManager();
    if (!session) return response;

    const body = await request.json();
    const { email, name, role, password } = body as {
      email?: string;
      name?: string;
      role?: Role;
      password?: string;
    };

    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, error: 'Email không hợp lệ' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Mật khẩu phải có ít nhất 8 ký tự' },
        { status: 400 }
      );
    }
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ success: false, error: 'Vai trò không hợp lệ' }, { status: 400 });
    }
    if ((role === 'super_admin' || role === 'admin') && session.role !== 'super_admin') {
      return NextResponse.json(
        { success: false, error: 'Không có quyền tạo tài khoản với vai trò này' },
        { status: 403 }
      );
    }

    const password_hash = await hashPassword(password);

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .insert({ email, name, role, password_hash, is_active: true })
      .select('id, email, name, role, is_active, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { success: false, error: 'Email đã tồn tại' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, user: data }, { status: 201 });
  } catch (err) {
    console.error('[admin/users POST] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase';
import { getAdminSession, hashPassword } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

const VALID_ROLES = ['super_admin', 'admin', 'editor', 'author'] as const;
type Role = (typeof VALID_ROLES)[number];

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

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { session, response } = await requireManager();
    if (!session) return response;

    const { id } = await params;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, name, role, is_active, last_login_at, created_at')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy người dùng' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error('[admin/users/[id] GET] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { session, response } = await requireManager();
    if (!session) return response;

    const { id } = await params;
    const body = await request.json();
    const { name, role, is_active, password } = body as {
      name?: string;
      role?: Role;
      is_active?: boolean;
      password?: string;
    };

    const supabase = createAdminClient();

    // Fetch target user to enforce role-based rules
    const { data: target, error: targetErr } = await supabase
      .from('admin_users')
      .select('id, role')
      .eq('id', id)
      .single();

    if (targetErr || !target) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy người dùng' }, { status: 404 });
    }

    const isSelf = id === session.id;

    // Self-protection rules
    if (isSelf && is_active === false) {
      return NextResponse.json(
        { success: false, error: 'Bạn không thể khóa tài khoản của chính mình' },
        { status: 400 }
      );
    }
    if (isSelf && role !== undefined && role !== session.role) {
      return NextResponse.json(
        { success: false, error: 'Bạn không thể thay đổi vai trò của chính mình' },
        { status: 400 }
      );
    }

    // Admins cannot manage super_admin/admin accounts, nor promote to those roles
    if (session.role !== 'super_admin') {
      if (target.role === 'super_admin' || target.role === 'admin') {
        if (!isSelf) {
          return NextResponse.json(
            { success: false, error: 'Không có quyền quản lý tài khoản này' },
            { status: 403 }
          );
        }
      }
      if (role === 'super_admin' || role === 'admin') {
        return NextResponse.json(
          { success: false, error: 'Không có quyền gán vai trò này' },
          { status: 403 }
        );
      }
    }

    if (role !== undefined && !VALID_ROLES.includes(role)) {
      return NextResponse.json({ success: false, error: 'Vai trò không hợp lệ' }, { status: 400 });
    }
    if (password !== undefined && password !== '' && password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Mật khẩu phải có ít nhất 8 ký tự' },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (role !== undefined) updates.role = role;
    if (is_active !== undefined) updates.is_active = is_active;
    if (password) updates.password_hash = await hashPassword(password);

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ success: false, error: 'Không có thông tin cần cập nhật' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', id)
      .select('id, email, name, role, is_active, last_login_at, created_at')
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy người dùng' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error('[admin/users/[id] PATCH] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { session, response } = await requireManager();
    if (!session) return response;

    if (session.role !== 'super_admin') {
      return NextResponse.json({ success: false, error: 'Không có quyền' }, { status: 403 });
    }

    const { id } = await params;

    if (id === session.id) {
      return NextResponse.json(
        { success: false, error: 'Bạn không thể xóa tài khoản của chính mình' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('admin_users').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/users/[id] DELETE] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

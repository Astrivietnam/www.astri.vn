import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase';
import { getAdminSession, hashPassword, verifyPassword } from '@/lib/auth';

const PUBLIC_FIELDS = 'id, email, name, role, last_login_at, created_at';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getAdminSession(cookieStore);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select(PUBLIC_FIELDS)
      .eq('id', session.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error('[admin/profile GET] error:', err);
    return NextResponse.json({ success: false, error: 'Lỗi hệ thống, vui lòng thử lại' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const session = await getAdminSession(cookieStore);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, currentPassword, newPassword } = body as {
      name?: string;
      currentPassword?: string;
      newPassword?: string;
    };

    const updates: Record<string, string> = {};

    if (name !== undefined) {
      const trimmed = name.trim();
      if (trimmed.length < 2 || trimmed.length > 80) {
        return NextResponse.json(
          { success: false, error: 'Họ tên phải từ 2 đến 80 ký tự' },
          { status: 400 }
        );
      }
      updates.name = trimmed;
    }

    const supabase = createAdminClient();

    if (newPassword !== undefined) {
      if (!currentPassword) {
        return NextResponse.json(
          { success: false, error: 'Vui lòng nhập mật khẩu hiện tại' },
          { status: 400 }
        );
      }
      if (newPassword.length < 8) {
        return NextResponse.json(
          { success: false, error: 'Mật khẩu mới phải có ít nhất 8 ký tự' },
          { status: 400 }
        );
      }

      const { data: current, error: fetchError } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('id', session.id)
        .single();

      if (fetchError) throw fetchError;

      const valid = await verifyPassword(currentPassword, current.password_hash);
      if (!valid) {
        return NextResponse.json(
          { success: false, error: 'Mật khẩu hiện tại không đúng' },
          { status: 400 }
        );
      }

      updates.password_hash = await hashPassword(newPassword);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, error: 'Không có thông tin nào để cập nhật' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', session.id)
      .select(PUBLIC_FIELDS)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    console.error('[admin/profile PATCH] error:', err);
    return NextResponse.json({ success: false, error: 'Lỗi hệ thống, vui lòng thử lại' }, { status: 500 });
  }
}

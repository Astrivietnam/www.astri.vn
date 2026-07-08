import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase';
import { getAdminSession, hashPassword } from '@/lib/auth';

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
    const cookieStore = await cookies();
    const session = await getAdminSession(cookieStore);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, role, password } = body as {
      email: string;
      name: string;
      role: string;
      password: string;
    };

    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { success: false, error: 'email, name, role, and password are required' },
        { status: 400 }
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
          { success: false, error: 'Email already exists' },
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

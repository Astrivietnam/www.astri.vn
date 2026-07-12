import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '30', 10)));
    const type = searchParams.get('type') ?? 'all';
    const search = searchParams.get('search') ?? '';

    const supabase = createAdminClient();
    let query = supabase
      .from('media')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (type === 'image') {
      query = query.like('mime_type', 'image/%');
    }
    if (search) {
      query = query.ilike('file_name', `%${search}%`);
    }

    const { data: files, count, error } = await query;
    if (error) {
      console.error('[admin/media GET] supabase error:', error);
      return NextResponse.json({ success: false, error: 'Failed to fetch media' }, { status: 500 });
    }

    return NextResponse.json({ files: files ?? [], total: count ?? 0 });
  } catch (err) {
    console.error('[admin/media GET] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body as { id?: string };
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (error) {
      console.error('[admin/media DELETE] supabase error:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete media record' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/media DELETE] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

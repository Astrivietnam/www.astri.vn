import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = await getAdminSession(cookieStore);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase.from('settings').select('*');

    if (error) throw error;

    // Return as object keyed by setting key
    const settings = Object.fromEntries(
      (data ?? []).map((row: { key: string; value: unknown }) => [row.key, row.value])
    );

    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error('[admin/settings GET] error:', err);
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
    const { key, value } = body as { key: string; value: unknown };

    if (!key) {
      return NextResponse.json({ success: false, error: 'key is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select('key, value')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, setting: data });
  } catch (err) {
    console.error('[admin/settings POST] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

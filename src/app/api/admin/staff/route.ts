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
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, staff: data });
  } catch (err) {
    console.error('[admin/staff GET] error:', err);
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
    const {
      name_vi,
      name_en,
      title_vi,
      title_en,
      department_vi,
      department_en,
      bio_vi,
      bio_en,
      photo_url,
      email,
      sort_order,
      is_leadership,
    } = body as {
      name_vi: string;
      name_en?: string;
      title_vi?: string;
      title_en?: string;
      department_vi?: string;
      department_en?: string;
      bio_vi?: string;
      bio_en?: string;
      photo_url?: string;
      email?: string;
      sort_order?: number;
      is_leadership?: boolean;
    };

    if (!name_vi) {
      return NextResponse.json(
        { success: false, error: 'name_vi is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('staff')
      .insert({
        name_vi,
        name_en,
        title_vi,
        title_en,
        department_vi,
        department_en,
        bio_vi,
        bio_en,
        photo_url,
        email,
        sort_order: sort_order ?? 0,
        is_leadership: is_leadership ?? false,
      })
      .select('*')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, staff: data }, { status: 201 });
  } catch (err) {
    console.error('[admin/staff POST] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

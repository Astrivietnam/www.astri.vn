import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = await getAdminSession(cookieStore)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('parent_id', { ascending: true, nullsFirst: true })

    if (error) {
      console.error('[admin/categories GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/categories GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const session = await getAdminSession(cookieStore)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name_vi,
      name_en,
      slug,
      description_vi,
      description_en,
      parent_id,
      post_type,
      sort_order,
    } = body as {
      name_vi: string
      name_en?: string
      slug: string
      description_vi?: string
      description_en?: string
      parent_id?: string | null
      post_type?: string
      sort_order?: number
    }

    if (!name_vi || !slug) {
      return NextResponse.json(
        { success: false, error: 'name_vi and slug are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name_vi,
        name_en: name_en ?? null,
        slug,
        description_vi: description_vi ?? null,
        description_en: description_en ?? null,
        parent_id: parent_id ?? null,
        post_type: post_type ?? null,
        sort_order: sort_order ?? 0,
      })
      .select()
      .single()

    if (error) {
      console.error('[admin/categories POST] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error('[admin/categories POST] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

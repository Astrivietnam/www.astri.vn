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
      .from('tags')
      .select('*')
      .order('name_vi', { ascending: true })

    if (error) {
      console.error('[admin/tags GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/tags GET] error:', err)
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
    const { name_vi, name_en, slug } = body as {
      name_vi: string
      name_en?: string
      slug: string
    }

    if (!name_vi || !slug) {
      return NextResponse.json(
        { success: false, error: 'name_vi and slug are required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('tags')
      .insert({
        name_vi,
        name_en: name_en ?? null,
        slug,
      })
      .select()
      .single()

    if (error) {
      console.error('[admin/tags POST] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error('[admin/tags POST] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

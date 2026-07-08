import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const cookieStore = await cookies()
    const session = await getAdminSession(cookieStore)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/categories/[id] GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const cookieStore = await cookies()
    const session = await getAdminSession(cookieStore)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
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
      name_vi?: string
      name_en?: string
      slug?: string
      description_vi?: string
      description_en?: string
      parent_id?: string | null
      post_type?: string
      sort_order?: number
    }

    const supabase = createAdminClient()
    const updates: Record<string, unknown> = {}
    if (name_vi !== undefined) updates.name_vi = name_vi
    if (name_en !== undefined) updates.name_en = name_en
    if (slug !== undefined) updates.slug = slug
    if (description_vi !== undefined) updates.description_vi = description_vi
    if (description_en !== undefined) updates.description_en = description_en
    if (parent_id !== undefined) updates.parent_id = parent_id
    if (post_type !== undefined) updates.post_type = post_type
    if (sort_order !== undefined) updates.sort_order = sort_order

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      console.error('[admin/categories/[id] PUT] error:', error)
      return NextResponse.json(
        { success: false, error: error?.message ?? 'Category not found' },
        { status: error ? 500 : 404 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/categories/[id] PUT] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const cookieStore = await cookies()
    const session = await getAdminSession(cookieStore)
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const supabase = createAdminClient()
    const { error } = await supabase.from('categories').delete().eq('id', id)

    if (error) {
      console.error('[admin/categories/[id] DELETE] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/categories/[id] DELETE] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

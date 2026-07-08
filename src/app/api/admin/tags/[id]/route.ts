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
      .from('tags')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Tag not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/tags/[id] GET] error:', err)
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
    const { name_vi, name_en, slug } = body as {
      name_vi?: string
      name_en?: string
      slug?: string
    }

    const supabase = createAdminClient()
    const updates: Record<string, unknown> = {}
    if (name_vi !== undefined) updates.name_vi = name_vi
    if (name_en !== undefined) updates.name_en = name_en
    if (slug !== undefined) updates.slug = slug

    const { data, error } = await supabase
      .from('tags')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      console.error('[admin/tags/[id] PUT] error:', error)
      return NextResponse.json(
        { success: false, error: error?.message ?? 'Tag not found' },
        { status: error ? 500 : 404 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/tags/[id] PUT] error:', err)
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
    const { error } = await supabase.from('tags').delete().eq('id', id)

    if (error) {
      console.error('[admin/tags/[id] DELETE] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/tags/[id] DELETE] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

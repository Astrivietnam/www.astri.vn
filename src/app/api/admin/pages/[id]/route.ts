import { type NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/app/api/admin/posts/route'

type RouteContext = { params: Promise<{ id: string }> }

// ---------------------------------------------------------------------------
// GET /api/admin/pages/[id]
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 })
      }
      console.error('[admin/pages/[id] GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/pages/[id] GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/admin/pages/[id]
// ---------------------------------------------------------------------------

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const body = await request.json()
    const {
      slug,
      title_vi,
      title_en,
      excerpt_vi,
      excerpt_en,
      content_vi,
      content_en,
      cover_image_url,
      seo_title,
      seo_description,
    } = body as {
      slug?: string
      title_vi?: string
      title_en?: string
      excerpt_vi?: string
      excerpt_en?: string
      content_vi?: string
      content_en?: string
      cover_image_url?: string
      seo_title?: string
      seo_description?: string
    }

    const supabase = createAdminClient()
    const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() }

    if (slug !== undefined) updatePayload.slug = slug
    if (title_vi !== undefined) updatePayload.title_vi = title_vi
    if (title_en !== undefined) updatePayload.title_en = title_en
    if (excerpt_vi !== undefined) updatePayload.excerpt_vi = excerpt_vi
    if (excerpt_en !== undefined) updatePayload.excerpt_en = excerpt_en
    if (content_vi !== undefined) updatePayload.content_vi = content_vi
    if (content_en !== undefined) updatePayload.content_en = content_en
    if (cover_image_url !== undefined) updatePayload.cover_image_url = cover_image_url
    if (seo_title !== undefined) updatePayload.seo_title = seo_title
    if (seo_description !== undefined) updatePayload.seo_description = seo_description

    const { data, error } = await supabase
      .from('pages')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Page not found' }, { status: 404 })
      }
      console.error('[admin/pages/[id] PUT] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('[admin/pages/[id] PUT] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/admin/pages/[id]
// ---------------------------------------------------------------------------

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const supabase = createAdminClient()

    const { error } = await supabase.from('pages').delete().eq('id', id)

    if (error) {
      console.error('[admin/pages/[id] DELETE] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/pages/[id] DELETE] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

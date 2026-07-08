import { type NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/app/api/admin/posts/route'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ---------------------------------------------------------------------------
// GET /api/admin/pages
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('pages')
      .select('id, slug, title_vi, title_en, updated_at')
      .order('slug', { ascending: true })

    if (error) {
      console.error('[admin/pages GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data ?? [] })
  } catch (err) {
    console.error('[admin/pages GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// POST /api/admin/pages
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const body = await request.json()
    const {
      slug: rawSlug,
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
      title_vi: string
      title_en?: string
      excerpt_vi?: string
      excerpt_en?: string
      content_vi?: string
      content_en?: string
      cover_image_url?: string
      seo_title?: string
      seo_description?: string
    }

    if (!title_vi) {
      return NextResponse.json({ success: false, error: 'title_vi is required' }, { status: 400 })
    }

    const slug = rawSlug?.trim() ? rawSlug.trim() : slugify(title_vi)
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('pages')
      .insert({
        slug,
        title_vi,
        title_en: title_en ?? null,
        excerpt_vi: excerpt_vi ?? null,
        excerpt_en: excerpt_en ?? null,
        content_vi: content_vi ?? null,
        content_en: content_en ?? null,
        cover_image_url: cover_image_url ?? null,
        seo_title: seo_title ?? null,
        seo_description: seo_description ?? null,
      })
      .select()
      .single()

    if (error) {
      console.error('[admin/pages POST] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error('[admin/pages POST] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

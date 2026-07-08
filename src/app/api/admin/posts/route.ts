import { type NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyAdminToken, ADMIN_COOKIE_NAME, type AdminTokenPayload } from '@/lib/auth'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

export async function verifyAdminRequest(
  request: Request
): Promise<AdminTokenPayload | Response> {
  const cookieHeader = request.headers.get('cookie') ?? ''
  const match = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE_NAME}=`))
  const token = match ? match.slice(ADMIN_COOKIE_NAME.length + 1) : null

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await verifyAdminToken(token)
  if (!payload) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  return payload
}

// ---------------------------------------------------------------------------
// Simple slugify (handles basic Latin; diacritics stay, spaces become hyphens)
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ---------------------------------------------------------------------------
// GET /api/admin/posts
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { searchParams } = request.nextUrl
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
    const search = searchParams.get('search') ?? ''
    const category = searchParams.get('category') ?? ''
    const status = searchParams.get('status') ?? 'all' // 'published' | 'draft' | 'all'

    const supabase = createAdminClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('posts')
      .select(
        `
        id, slug, title_vi, title_en, excerpt_vi, excerpt_en,
        cover_image_url, is_published, is_featured, published_at, created_at,
        author_id,
        categories ( slug, name_vi, name_en )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(from, to)

    if (search) {
      query = query.or(`title_vi.ilike.%${search}%,title_en.ilike.%${search}%,slug.ilike.%${search}%`)
    }

    if (category) {
      query = query.eq('category_slug', category)
    }

    if (status === 'published') {
      query = query.eq('is_published', true)
    } else if (status === 'draft') {
      query = query.eq('is_published', false)
    }

    const { data: posts, error, count } = await query

    if (error) {
      console.error('[admin/posts GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const total = count ?? 0
    return NextResponse.json({
      success: true,
      posts: posts ?? [],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    console.error('[admin/posts GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// POST /api/admin/posts
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const body = await request.json()
    const {
      slug: rawSlug,
      category_slug,
      title_vi,
      title_en,
      excerpt_vi,
      excerpt_en,
      content_vi,
      content_en,
      cover_image_url,
      seo_title,
      seo_description,
      is_published = false,
      is_featured = false,
      published_at,
      author_id,
      tags = [],
    } = body as {
      slug?: string
      category_slug?: string
      title_vi: string
      title_en?: string
      excerpt_vi?: string
      excerpt_en?: string
      content_vi?: string
      content_en?: string
      cover_image_url?: string
      seo_title?: string
      seo_description?: string
      is_published?: boolean
      is_featured?: boolean
      published_at?: string | null
      author_id?: string
      tags?: string[]
    }

    if (!title_vi) {
      return NextResponse.json(
        { success: false, error: 'title_vi is required' },
        { status: 400 }
      )
    }

    const slug = rawSlug?.trim() ? rawSlug.trim() : slugify(title_vi)

    const supabase = createAdminClient()

    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        slug,
        category_slug: category_slug ?? null,
        title_vi,
        title_en: title_en ?? null,
        excerpt_vi: excerpt_vi ?? null,
        excerpt_en: excerpt_en ?? null,
        content_vi: content_vi ?? null,
        content_en: content_en ?? null,
        cover_image_url: cover_image_url ?? null,
        seo_title: seo_title ?? null,
        seo_description: seo_description ?? null,
        is_published,
        is_featured,
        published_at: published_at ?? null,
        author_id: author_id ?? null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[admin/posts POST] insert error:', insertError)
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    }

    // Insert tags if provided
    if (tags.length > 0) {
      const tagRows = tags.map((tag: string) => ({ post_id: post.id, tag }))
      const { error: tagError } = await supabase.from('post_tags').insert(tagRows)
      if (tagError) {
        console.error('[admin/posts POST] tag insert error:', tagError)
        // Non-fatal: return post but surface the warning
      }
    }

    return NextResponse.json({ success: true, data: { ...post, tags } }, { status: 201 })
  } catch (err) {
    console.error('[admin/posts POST] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/app/api/admin/posts/route'

type RouteContext = { params: Promise<{ id: string }> }

// ---------------------------------------------------------------------------
// GET /api/admin/posts/[id]
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const supabase = createAdminClient()

    const { data: post, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories ( slug, name_vi, name_en ),
        post_tags ( tag )
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
      }
      console.error('[admin/posts/[id] GET] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    const tags: string[] = (post.post_tags ?? []).map((t: { tag: string }) => t.tag)

    return NextResponse.json({ success: true, data: { ...post, tags } })
  } catch (err) {
    console.error('[admin/posts/[id] GET] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// PUT /api/admin/posts/[id]
// ---------------------------------------------------------------------------

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const body = await request.json()
    const {
      slug,
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
      is_published,
      is_featured,
      published_at,
      author_id,
      tags,
    } = body as {
      slug?: string
      category_slug?: string
      title_vi?: string
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

    const supabase = createAdminClient()

    // Build update payload — only include keys that were explicitly provided
    const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (slug !== undefined) updatePayload.slug = slug
    if (category_slug !== undefined) updatePayload.category_slug = category_slug
    if (title_vi !== undefined) updatePayload.title_vi = title_vi
    if (title_en !== undefined) updatePayload.title_en = title_en
    if (excerpt_vi !== undefined) updatePayload.excerpt_vi = excerpt_vi
    if (excerpt_en !== undefined) updatePayload.excerpt_en = excerpt_en
    if (content_vi !== undefined) updatePayload.content_vi = content_vi
    if (content_en !== undefined) updatePayload.content_en = content_en
    if (cover_image_url !== undefined) updatePayload.cover_image_url = cover_image_url
    if (seo_title !== undefined) updatePayload.seo_title = seo_title
    if (seo_description !== undefined) updatePayload.seo_description = seo_description
    if (is_published !== undefined) updatePayload.is_published = is_published
    if (is_featured !== undefined) updatePayload.is_featured = is_featured
    if (published_at !== undefined) updatePayload.published_at = published_at
    if (author_id !== undefined) updatePayload.author_id = author_id

    const { data: post, error: updateError } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
      }
      console.error('[admin/posts/[id] PUT] error:', updateError)
      return NextResponse.json({ success: false, error: updateError.message }, { status: 500 })
    }

    // Replace tags if provided
    let resolvedTags: string[] | undefined
    if (Array.isArray(tags)) {
      const { error: deleteError } = await supabase.from('post_tags').delete().eq('post_id', id)
      if (deleteError) {
        console.error('[admin/posts/[id] PUT] tag delete error:', deleteError)
      } else if (tags.length > 0) {
        const tagRows = tags.map((tag: string) => ({ post_id: id, tag }))
        const { error: insertError } = await supabase.from('post_tags').insert(tagRows)
        if (insertError) {
          console.error('[admin/posts/[id] PUT] tag insert error:', insertError)
        }
      }
      resolvedTags = tags
    }

    return NextResponse.json({
      success: true,
      data: resolvedTags !== undefined ? { ...post, tags: resolvedTags } : post,
    })
  } catch (err) {
    console.error('[admin/posts/[id] PUT] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// ---------------------------------------------------------------------------
// DELETE /api/admin/posts/[id]
// ---------------------------------------------------------------------------

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const supabase = createAdminClient()

    // Delete tags first (if no cascade on the FK)
    await supabase.from('post_tags').delete().eq('post_id', id)

    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      console.error('[admin/posts/[id] DELETE] error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/posts/[id] DELETE] error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { verifyAdminRequest } from '@/app/api/admin/posts/route'

type RouteContext = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const authResult = await verifyAdminRequest(request)
    if (authResult instanceof Response) return authResult

    const { id } = await params
    const body = await request.json()
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('contacts')
      .update({ is_read: body.is_read })
      .eq('id', id)

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
  }
}

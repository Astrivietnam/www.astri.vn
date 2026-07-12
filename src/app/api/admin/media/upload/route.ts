import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { createAdminClient } from '@/lib/supabase';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// R2 là kho lưu trữ chính; khi chưa cấu hình đủ key thì tự fallback sang Supabase Storage
function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
  );
}

function getR2Client(): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await verifyAdminToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'File exceeds 10 MB limit' }, { status: 413 });
    }

    const originalName = file instanceof File ? file.name : 'upload';
    const mimeType = file.type || 'application/octet-stream';
    const buffer = Buffer.from(await file.arrayBuffer());

    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const timestamp = now.getTime();
    const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `media/${year}/${month}/${timestamp}-${safeName}`;

    const supabase = createAdminClient();
    let url: string;
    let storage: 'r2' | 'supabase';

    if (isR2Configured()) {
      const bucket = process.env.R2_BUCKET_NAME ?? 'astri-media';
      const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');
      const r2 = getR2Client();
      await r2.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          ContentLength: buffer.byteLength,
        })
      );
      url = publicUrl ? `${publicUrl}/${key}` : `/${key}`;
      storage = 'r2';
    } else {
      const { error: storageError } = await supabase.storage
        .from('media')
        .upload(key, buffer, { contentType: mimeType, upsert: false });
      if (storageError) {
        console.error('[admin/media/upload POST] supabase storage error:', storageError);
        return NextResponse.json(
          { success: false, error: `Upload thất bại: ${storageError.message}` },
          { status: 500 }
        );
      }
      url = supabase.storage.from('media').getPublicUrl(key).data.publicUrl;
      storage = 'supabase';
    }
    const { data: record, error: dbError } = await supabase
      .from('media')
      .insert({
        file_name: originalName,
        r2_key: key,
        url,
        mime_type: mimeType,
        size_bytes: file.size,
        uploaded_by: String(payload.id ?? ''),
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('[admin/media/upload POST] supabase error:', dbError);
      return NextResponse.json({ success: false, error: 'Upload succeeded but failed to save record' }, { status: 500 });
    }

    return NextResponse.json({ success: true, url, key, id: record.id, name: originalName, storage });
  } catch (err) {
    console.error('[admin/media/upload POST] error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

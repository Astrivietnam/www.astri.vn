// === FILE: src/lib/r2.ts ===

import { S3Client } from '@aws-sdk/client-s3'

const accountId = process.env.R2_ACCOUNT_ID
if (!accountId) {
  throw new Error('R2_ACCOUNT_ID environment variable is not set')
}

export const r2Client = new S3Client({
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
})

/** Bucket name — defaults to 'astri-media' if not explicitly set. */
export const BUCKET_NAME: string = process.env.R2_BUCKET_NAME ?? 'astri-media'

/**
 * Public base URL for the R2 bucket (e.g. a Cloudflare custom domain or the
 * r2.dev public URL). Trailing slash is stripped for safe path joining.
 */
export const R2_PUBLIC_URL: string = (
  process.env.R2_PUBLIC_URL ?? ''
).replace(/\/$/, '')

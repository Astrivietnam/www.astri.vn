// === FILE: src/lib/slugify.ts ===

/**
 * Convert Vietnamese (or any accented) text to a URL-safe slug.
 *
 * Steps:
 *  1. Unicode NFD normalization splits base letters from combining diacritics.
 *  2. Strip all combining marks (U+0300–U+036F).
 *  3. Lowercase.
 *  4. Replace whitespace runs with a single hyphen.
 *  5. Remove any character that is not alphanumeric or a hyphen.
 *  6. Collapse consecutive hyphens.
 *  7. Trim leading/trailing hyphens.
 */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    // Vietnamese đ / Đ is not decomposed by NFD — handle explicitly
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

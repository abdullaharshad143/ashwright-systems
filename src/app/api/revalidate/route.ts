import { timingSafeEqual } from "node:crypto"
import { revalidateTag } from "next/cache"
import { SITE_CONTENT_TAG } from "@/lib/content"

const matches = (given: string, expected: string) => {
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

/**
 * Called by the admin panel after someone saves site content. The next visit
 * to each page renders the new content (no stale copy is served).
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || !matches(request.headers.get("authorization") ?? "", `Bearer ${secret}`)) {
    return Response.json({ ok: false }, { status: 401 })
  }
  revalidateTag(SITE_CONTENT_TAG, { expire: 0 })
  return Response.json({ ok: true })
}

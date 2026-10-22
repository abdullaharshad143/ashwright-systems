import "server-only"
import { cacheLife, cacheTag } from "next/cache"
import { getSupabaseAdmin } from "@/lib/supabase"
import { defaultContent } from "./defaults"
import { contentKeys, contentSchemas, type ContentKey, type SiteContent } from "./schema"

export * from "./schema"

/** Revalidated by /api/revalidate when someone saves in the admin panel. */
export const SITE_CONTENT_TAG = "site-content"

const isContentKey = (key: unknown): key is ContentKey => contentKeys.includes(key as ContentKey)

/**
 * Only photos from our own public bucket: next/image refuses other hosts, and a
 * bad URL here would break the page instead of just hiding the photo.
 */
function allowedPhoto(url: string | null) {
  const base = process.env.SUPABASE_URL?.replace(/\/$/, "")
  return url && base && url.startsWith(`${base}/storage/v1/object/public/site-assets/`) ? url : null
}

/**
 * Everything editable from the admin panel. Part of the prerendered pages;
 * refreshed on demand after a save, and hourly in case that call didn't arrive.
 * Any key that's missing, unreadable, or invalid falls back to the built-in text,
 * so the site never renders empty.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache"
  cacheTag(SITE_CONTENT_TAG)
  cacheLife("hours")

  const content: SiteContent = { ...defaultContent }
  const db = getSupabaseAdmin()
  if (!db) return content

  const { data, error } = await db.from("site_content").select("key, value")
  if (error) {
    console.error("[content] load failed; using built-in content", error)
    return content
  }

  for (const row of data ?? []) {
    if (!isContentKey(row.key)) continue
    const parsed = contentSchemas[row.key].safeParse(row.value)
    if (parsed.success) Object.assign(content, { [row.key]: parsed.data })
    else console.error(`[content] "${row.key}" is invalid; using built-in content`, parsed.error.issues[0])
  }

  content.founder = { ...content.founder, photoUrl: allowedPhoto(content.founder.photoUrl) }
  return content
}

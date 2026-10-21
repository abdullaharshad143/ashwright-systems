import "server-only"
import { createHash } from "node:crypto"
import { siteConfig } from "@/lib/config"

const GRAPH_VERSION = "v23.0"

const sha256 = (value: string) => createHash("sha256").update(value.trim().toLowerCase()).digest("hex")

export type MetaServerEvent = {
  eventName: "Lead" | "Schedule" | "ViewContent"
  /** Shared with the browser Pixel event so Meta can deduplicate. */
  eventId?: string
  sourceUrl: string
  email?: string
  firstName?: string
  clientIp?: string
  userAgent?: string
  fbp?: string | null
  fbc?: string | null
  customData?: Record<string, string | number>
}

/**
 * Sends a server-side event to the Meta Conversions API.
 * PII is SHA-256 hashed before it leaves the server. No-ops without credentials.
 */
export async function sendMetaEvent(event: MetaServerEvent) {
  const pixelId = siteConfig.tracking.metaPixelId
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !token) return { skipped: true as const }

  const userData: Record<string, string | string[]> = {}
  if (event.email) userData.em = [sha256(event.email)]
  if (event.firstName) userData.fn = [sha256(event.firstName)]
  if (event.clientIp) userData.client_ip_address = event.clientIp
  if (event.userAgent) userData.client_user_agent = event.userAgent
  if (event.fbp) userData.fbp = event.fbp
  if (event.fbc) userData.fbc = event.fbc

  const body = {
    data: [
      {
        event_name: event.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.sourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: event.customData,
      },
    ],
    ...(process.env.META_CAPI_TEST_EVENT_CODE && {
      test_event_code: process.env.META_CAPI_TEST_EVENT_CODE,
    }),
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    }
  )

  if (!res.ok) {
    console.error("[meta-capi] request failed", res.status, await res.text().catch(() => ""))
    return { ok: false as const }
  }
  return { ok: true as const }
}

/** First IP from x-forwarded-for (set by Vercel and most proxies). */
export function clientIpFrom(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || undefined
}

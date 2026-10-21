import { z } from "zod"
import { siteConfig } from "@/lib/config"
import { clientIpFrom, sendMetaEvent } from "@/lib/meta-capi"

const bodySchema = z.object({
  eventName: z.enum(["Lead", "Schedule", "ViewContent"]),
  eventId: z.string().max(64).optional(),
  sourceUrl: z.url().max(1000),
  email: z.email().optional(),
})

/**
 * Server-side Meta Conversions API endpoint for browser-originated events
 * (e.g. Schedule after a Cal.com booking). Lead events from the check form are
 * sent directly from the server action instead.
 */
export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const allowed = new URL(siteConfig.url).origin
  if (origin && origin !== allowed && process.env.NODE_ENV === "production") {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: "Invalid payload" }, { status: 400 })

  const cookieHeader = request.headers.get("cookie") ?? ""
  const cookie = (name: string) => cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]

  const result = await sendMetaEvent({
    ...parsed.data,
    clientIp: clientIpFrom(request.headers),
    userAgent: request.headers.get("user-agent") ?? undefined,
    fbp: cookie("_fbp"),
    fbc: cookie("_fbc"),
  })

  return Response.json(result, { status: "ok" in result && !result.ok ? 502 : 200 })
}

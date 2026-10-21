/**
 * Client-side attribution: captures UTM params and fbclid on landing and keeps
 * them in sessionStorage so they survive navigation to /check.
 */

const STORAGE_KEY = "sw-attribution"
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"] as const

type Param = (typeof PARAMS)[number]

export type Attribution = Partial<Record<Param, string>> & {
  referrer?: string
  landingPage?: string
  /** Epoch ms when fbclid was first seen, used to build the _fbc value. */
  fbclidAt?: number
}

function read(): Attribution {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Attribution) : {}
  } catch {
    return {}
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return
  const search = new URLSearchParams(window.location.search)
  const existing = read()
  const next: Attribution = { ...existing }

  const hasCampaignParams = PARAMS.some((p) => search.get(p))
  if (hasCampaignParams) {
    // A new campaign click replaces the previous campaign entirely.
    for (const p of PARAMS) {
      const v = search.get(p)
      if (v) next[p] = v.slice(0, 500)
      else delete next[p]
    }
    if (search.get("fbclid")) next.fbclidAt = Date.now()
  }

  if (!existing.landingPage) {
    next.landingPage = window.location.pathname
    const ref = document.referrer
    if (ref && !ref.startsWith(window.location.origin)) next.referrer = ref
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be unavailable (private mode, blocked). Attribution is best-effort.
  }
}

function readCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

/** Everything the server needs for lead attribution and Meta match quality. */
export function getAttributionPayload() {
  const a = read()
  const fbc =
    readCookie("_fbc") ?? (a.fbclid ? `fb.1.${a.fbclidAt ?? Date.now()}.${a.fbclid}` : undefined)

  let timezone: string | undefined
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    timezone = undefined
  }

  return {
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    utm_content: a.utm_content,
    fbclid: a.fbclid,
    referrer: a.referrer,
    landingPage: a.landingPage,
    timezone,
    fbp: readCookie("_fbp"),
    fbc,
  }
}

/** sessionStorage key for the just-submitted lead (name/email shown on /check/submitted). */
export const LEAD_STORAGE_KEY = "sw-lead"

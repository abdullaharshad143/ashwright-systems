import { siteConfig } from "@/lib/config"

/* ─── Consent ─── */

export type Consent = "granted" | "denied"

const CONSENT_KEY = "sw-consent"
export const CONSENT_EVENT = "sw:consent-change"

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === "granted" || v === "denied" ? v : null
  } catch {
    return null
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Ignore: the choice still applies for this page view via the event below.
  }
  if (value === "denied") {
    // Stop scripts that already loaded this session from sending further events.
    window.fbq?.("consent", "revoke")
    window.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied" })
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }))
}

export function isTrackingAllowed(consent: Consent | null) {
  if (consent === null && hasGlobalPrivacyControl()) return false
  return siteConfig.tracking.requireConsent ? consent === "granted" : consent !== "denied"
}

/** Global Privacy Control is treated as an opt-out of ads tracking (CCPA/CPRA). */
export function hasGlobalPrivacyControl() {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
}

/* ─── Event helpers ─── */

type FbqParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    fbq?: (
      method: "track" | "init" | "trackCustom" | "consent",
      eventOrId: string,
      params?: FbqParams,
      options?: { eventID?: string }
    ) => void
    gtag?: (command: "event" | "config" | "js" | "consent", ...args: unknown[]) => void
  }
}

export function newEventId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

/** Fires a standard Meta Pixel event (and the GA4 equivalent). No-ops when tracking isn't loaded. */
export function trackEvent(
  event: "ViewContent" | "Lead" | "Schedule",
  params: FbqParams = {},
  eventId?: string
) {
  if (typeof window === "undefined") return
  window.fbq?.("track", event, params, eventId ? { eventID: eventId } : undefined)

  const gaEvent = { ViewContent: "view_item", Lead: "generate_lead", Schedule: "book_call" }[event]
  window.gtag?.("event", gaEvent, params)
}

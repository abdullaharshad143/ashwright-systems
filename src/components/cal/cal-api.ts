"use client"

import { trackEvent } from "@/lib/tracking"

export const CAL_NAMESPACE = "intro"

type CalApi = Awaited<ReturnType<typeof import("@calcom/embed-react").getCalApi>>

let ready: Promise<CalApi> | null = null

function onBooked() {
  trackEvent("Schedule")
  void fetch("/api/meta/conversions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventName: "Schedule", sourceUrl: window.location.href }),
    keepalive: true,
  }).catch(() => {})
}

/**
 * Loads Cal.com's embed once (lazily, on first hover/click), themes it, and wires
 * the Schedule conversion event. Kept out of the initial bundle on purpose.
 */
export function loadCal() {
  if (!ready) {
    ready = import("@calcom/embed-react")
      .then(({ getCalApi }) => getCalApi({ namespace: CAL_NAMESPACE }))
      .then((cal) => {
        cal("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: { dark: { "cal-brand": "#FB8629" }, light: { "cal-brand": "#0A0A0A" } },
        })
        cal("on", { action: "bookingSuccessfulV2", callback: onBooked })
        return cal
      })
    // Allow a retry if the embed script failed to load.
    ready.catch(() => {
      ready = null
    })
  }
  return ready
}

/** The booking page itself, for links that work without the embed. */
export const calPublicUrl = (calLink: string) => `https://cal.com/${calLink}`

"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { Suspense, useEffect, useRef, useSyncExternalStore } from "react"
import { captureAttribution } from "@/lib/attribution"
import { siteConfig } from "@/lib/config"
import { CONSENT_EVENT, getConsent, isTrackingAllowed } from "@/lib/tracking"

const { metaPixelId, gaMeasurementId } = siteConfig.tracking

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange)
  return () => window.removeEventListener(CONSENT_EVENT, onChange)
}
const allowedSnapshot = () => isTrackingAllowed(getConsent())
const serverSnapshot = () => false

/** Fires PageView on client-side navigations. The Pixel snippet fires the first one. */
function PageViewTracker() {
  const pathname = usePathname()
  const firstPath = useRef(true)
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false
      return
    }
    window.fbq?.("track", "PageView")
  }, [pathname])
  return null
}

/**
 * Captures UTM attribution on landing and loads the Meta Pixel and GA4
 * when the visitor's consent allows it.
 */
export function Analytics() {
  const allowed = useSyncExternalStore(subscribeConsent, allowedSnapshot, serverSnapshot)

  useEffect(() => {
    captureAttribution()
  }, [])

  if (!allowed) return null

  return (
    <>
      {/* URL data must stream inside Suspense so every route keeps a static shell. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}');`}
          </Script>
        </>
      )}
    </>
  )
}

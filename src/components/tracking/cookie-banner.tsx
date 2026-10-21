"use client"

import { AnimatePresence, m } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { EASE_OUT } from "@/components/motion/ease"
import { getConsent, setConsent, type Consent } from "@/lib/tracking"

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Delay slightly so the banner never competes with the hero for first paint.
    const t = window.setTimeout(() => setOpen(getConsent() === null), 1200)
    return () => window.clearTimeout(t)
  }, [])

  const choose = (value: Consent) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="surface-card fixed inset-x-4 bottom-4 z-[60] p-4 shadow-2xl shadow-black/60 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-sm"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            We use cookies to measure our ads and improve this site. No data is sold.{" "}
            <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-white">
              Privacy policy
            </Link>
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => choose("granted")}>
              Accept
            </Button>
            <Button size="sm" variant="ghost" onClick={() => choose("denied")}>
              Decline
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

"use client"

import { m } from "framer-motion"
import { useMemo, useSyncExternalStore } from "react"
import { CalInline } from "@/components/cal/cal-inline"
import { EASE_OUT } from "@/components/motion/ease"
import { LEAD_STORAGE_KEY } from "@/lib/attribution"
import { siteConfig } from "@/lib/config"

type Lead = { name?: string; email?: string }

const noopSubscribe = () => () => {}
const readStoredLead = () => {
  try {
    return sessionStorage.getItem(LEAD_STORAGE_KEY)
  } catch {
    return null
  }
}

/** The lead saved by the check form. Null until hydrated, {} when nothing was stored. */
function useLead(): Lead | null {
  const raw = useSyncExternalStore(noopSubscribe, readStoredLead, () => undefined)
  return useMemo(() => {
    if (raw === undefined) return null
    try {
      return raw ? (JSON.parse(raw) as Lead) : {}
    } catch {
      return {}
    }
  }, [raw])
}

function SuccessMark() {
  return (
    <div className="relative grid size-16 place-items-center">
      <m.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-brand/15"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <svg viewBox="0 0 64 64" className="relative size-16" aria-hidden="true">
        <m.circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          style={{ rotate: -90, transformOrigin: "50% 50%" }}
        />
        <m.path
          d="M21 33.5l7 7 15-16"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.45 }}
        />
      </svg>
    </div>
  )
}

export function Submitted() {
  const lead = useLead()
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  })

  return (
    <section className="relative pt-28 pb-24 sm:pt-36">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <SuccessMark />
          <m.h1 {...fade(0.5)} className="mt-8 text-[2rem] leading-[1.08] font-semibold tracking-[-0.04em] sm:text-5xl">
            Your check is in progress.
          </m.h1>
          <m.p {...fade(0.6)} className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg" aria-live="polite">
            An engineer will test your app by hand. You&apos;ll get your PDF report within {siteConfig.check.turnaround} at{" "}
            {lead?.email ? (
              <span className="font-mono text-[0.95em] text-foreground">{lead.email}</span>
            ) : (
              "your email"
            )}
            . Check your inbox for a confirmation now.
          </m.p>
        </div>

        <m.div {...fade(0.75)} className="mt-14">
          <div className="mb-5 text-center">
            <h2 className="text-xl font-semibold tracking-[-0.025em]">Want to go faster?</h2>
            <p className="mt-1.5 text-[0.9375rem] text-muted-foreground">
              Book your free walkthrough call now. We&apos;ll go through the findings together.
            </p>
          </div>
          <div className="surface-card min-h-[650px] overflow-hidden p-1 sm:min-h-[658px] sm:p-2">
            {lead && <CalInline name={lead.name} email={lead.email} />}
          </div>
        </m.div>
      </div>
    </section>
  )
}

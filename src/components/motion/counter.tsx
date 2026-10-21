"use client"

import { animate, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef } from "react"
import { EASE_OUT } from "./ease"

type CounterProps = {
  to: number
  duration?: number
  delay?: number
  className?: string
  /** Start when this becomes true instead of on scroll into view. */
  start?: boolean
}

/** Counts up from 0 when scrolled into view. Writes to the DOM directly to avoid re-renders. */
export function Counter({ to, duration = 1.4, delay = 0, className, start }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const go = start ?? inView

  useEffect(() => {
    const el = ref.current
    if (!el || !go) return
    if (reduce) {
      el.textContent = String(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [go, to, duration, delay, reduce])

  return (
    <span className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span ref={ref} aria-hidden="true">
        0
      </span>
      <span className="sr-only">{to}</span>
    </span>
  )
}

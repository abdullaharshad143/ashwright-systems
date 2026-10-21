"use client"

import { m, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { EASE_OUT } from "@/components/motion/ease"
import { cn } from "@/lib/utils"

type Result = "pass" | "critical" | "warning"

/** A manual test session as the tester logs it: what they did, and what happened. */
const steps: { action: string; result?: string; status: Result }[] = [
  { action: "Sign up with a new email", status: "pass" },
  { action: "Confirm email and log in", status: "pass" },
  { action: 'Tap "Upgrade" on /pricing', result: "Nothing happens. No error.", status: "critical" },
  { action: "Reset password", result: "Email lands in spam", status: "warning" },
  { action: "Open /invoices/1042 as a second user", result: "Shows another customer's invoice", status: "critical" },
]

const SCREENSHOTS = 4
const STEP_MS = 650
/** One step per log line, then one for the evidence footer. */
const TOTAL_STEPS = steps.length + 1

const statusStyle: Record<Result, { glyph: string; color: string; tag: string }> = {
  pass: { glyph: "✓", color: "text-success", tag: "pass" },
  critical: { glyph: "✗", color: "text-danger", tag: "critical" },
  warning: { glyph: "!", color: "text-warn", tag: "warn" },
}

/** A marked-up phone screenshot: skeleton UI with the problem circled. */
function Thumb({ mark }: { mark: "button" | "row" | "none" }) {
  return (
    <span className="relative block h-14 w-9 overflow-hidden rounded-md border border-line-strong bg-background p-1.5 sm:h-16 sm:w-10">
      <span className="block h-1 w-4 rounded-sm bg-white/20" />
      <span className="mt-1.5 block h-1 w-full rounded-sm bg-white/10" />
      <span className="mt-1 block h-1 w-3/4 rounded-sm bg-white/10" />
      <span className="mt-2 block h-2.5 w-full rounded-sm bg-brand/50" />
      <span className="mt-1.5 block h-1 w-full rounded-sm bg-white/10" />
      {mark === "button" && <span className="absolute top-[22px] left-0.5 h-4 w-[calc(100%-4px)] rounded-full border border-danger sm:top-[23px]" />}
      {mark === "row" && <span className="absolute top-[32px] left-0.5 h-3 w-[calc(100%-4px)] rounded-full border border-danger sm:top-[34px]" />}
    </span>
  )
}

export function TestCard({ className, startDelay = 900 }: { className?: string; startDelay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduce = useReducedMotion()
  const [animatedStep, setStep] = useState(0)
  // Reduced motion: show the finished session immediately.
  const step = reduce ? TOTAL_STEPS : animatedStep

  useEffect(() => {
    if (!inView || reduce) return
    let current = 0
    let timer: number
    const tick = () => {
      current += 1
      setStep(current)
      if (current < TOTAL_STEPS) timer = window.setTimeout(tick, STEP_MS)
    }
    timer = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timer)
  }, [inView, reduce, startDelay])

  const done = step >= TOTAL_STEPS
  const issues = steps.filter((s) => s.status !== "pass").length

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Restrained glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 bg-[radial-gradient(50%_50%_at_50%_45%,rgb(251_134_41/0.10),transparent_70%)]"
      />
      <figure
        aria-label={`Example manual test on iPhone Safari: ${steps.map((s) => `${s.action}${s.result ? `: ${s.result}` : ", passed"}`).join("; ")}. ${issues} issues found, ${SCREENSHOTS} screenshots attached to the report.`}
        className="surface-card overflow-hidden bg-surface/90 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur-sm"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3" aria-hidden="true">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <p className="flex-1 truncate text-center font-mono text-[11px] text-subtle-foreground">manual test — your-app.com</p>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase transition-colors duration-500",
              done ? "border-line text-muted-foreground" : "border-brand/30 text-brand"
            )}
          >
            {done ? "report ready" : "testing"}
          </span>
        </div>

        <div aria-hidden="true" className="px-4 pt-4 pb-5 font-mono text-[12.5px] leading-relaxed sm:px-5 sm:text-[13px]">
          <p className="mb-3 flex flex-wrap items-center gap-x-2 text-subtle-foreground">
            <span className="text-brand">●</span>
            Tested by an engineer
            <span className="text-line-strong">/</span>
            iPhone 15 · Safari
          </p>

          <ol className="space-y-2.5">
            {steps.map((s, i) => {
              const visible = step >= i + 1
              const st = statusStyle[s.status]
              return (
                <m.li
                  key={s.action}
                  initial={false}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="flex items-start gap-2.5"
                >
                  <span className={cn("w-3.5 shrink-0 pt-px text-center leading-snug font-semibold", st.color)}>{st.glyph}</span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block leading-snug", s.status === "pass" ? "text-muted-foreground" : "text-foreground")}>{s.action}</span>
                    {s.result && <span className="mt-0.5 block text-xs leading-snug text-subtle-foreground">→ {s.result}</span>}
                  </span>
                  {s.status !== "pass" && (
                    <span
                      className={cn(
                        "mt-px hidden shrink-0 rounded border px-1.5 text-[10px] tracking-wide uppercase sm:inline",
                        s.status === "critical" ? "border-danger/30 bg-danger/10 text-danger-strong" : "border-warn/30 bg-warn/10 text-warn"
                      )}
                    >
                      {st.tag}
                    </span>
                  )}
                </m.li>
              )
            })}
          </ol>

          {/* Evidence */}
          <m.div
            initial={false}
            animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mt-5 flex items-end justify-between gap-4 border-t border-dashed border-line pt-4"
          >
            <div>
              <p className="text-[11px] tracking-[0.2em] text-subtle-foreground uppercase">Evidence</p>
              <div className="mt-2 flex gap-1.5">
                <Thumb mark="button" />
                <Thumb mark="none" />
                <Thumb mark="row" />
                <Thumb mark="none" />
              </div>
            </div>
            <div className="pb-1 text-right font-sans">
              <p className="inline-flex items-center gap-1.5 text-warn">
                <span className="size-1.5 rounded-full bg-warn" />
                {issues} issues found
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-subtle-foreground">{SCREENSHOTS} screenshots attached</p>
            </div>
          </m.div>
        </div>
      </figure>
    </div>
  )
}

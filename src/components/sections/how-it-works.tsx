"use client"

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { useRef } from "react"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"

const stepsFor = (turnaroundDays: number) => [
  { title: "Tell us about your app", body: "Your URL and what your users do in it. It takes 2 minutes.", meta: "2 min" },
  {
    title: "We test it by hand",
    body: "An engineer signs up with a test account and goes through your key flows on desktop and mobile.",
    meta: `≤ ${turnaroundDays} day${turnaroundDays === 1 ? "" : "s"}`,
  },
  {
    title: "Get your PDF report",
    body: "Every issue ranked by severity, with screenshots, steps to reproduce, and how to fix it. Yours to keep.",
    meta: "PDF",
  },
  {
    title: "Fix it yourself, or with us",
    body: "Walk through it on a free 20-minute call. If you want us to fix it, you get a fixed quote and timeline.",
    meta: "Your call",
  },
]

export function HowItWorks({ turnaroundDays }: { turnaroundDays: number }) {
  const steps = stepsFor(turnaroundDays)
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="Four steps from worried to launched."
            description="No long sales process. You see exactly what's wrong before you spend a dollar."
          />
        </div>

        <ol ref={ref} className="relative">
          {/* Track + animated fill. The fill scales on Y (transform only). */}
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-line" />
          <m.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-coral via-orange to-orange/30"
            style={{ scaleY: reduce ? 1 : progress }}
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-12 pl-16 last:pb-0">
              <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line-strong bg-surface font-mono text-sm text-foreground shadow-[0_0_0_6px_var(--background)]">
                {i + 1}
              </span>
              <Reveal>
                <div className="flex items-baseline justify-between gap-4 pt-1.5">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{s.title}</h3>
                  <span className="shrink-0 font-mono text-xs text-subtle-foreground">{s.meta}</span>
                </div>
                <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

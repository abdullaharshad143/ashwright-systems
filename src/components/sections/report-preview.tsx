"use client"

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { FindingList } from "@/components/report/finding-list"
import { ScoreRing } from "@/components/report/score-ring"
import { SectionHeading } from "@/components/section-heading"
import { mockReport } from "@/lib/mock-report"

const critical = mockReport.findings.filter((f) => f.severity === "critical")
const counts = {
  critical: critical.length,
  warning: mockReport.findings.filter((f) => f.severity === "warning").length,
  passed: mockReport.findings.filter((f) => f.severity === "passed").length,
}

export function ReportPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <section aria-labelledby="preview-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page">
        <SectionHeading
          id="preview-title"
          align="center"
          eyebrow="Sample report"
          title="Your report, in plain English."
          description="No jargon. Every issue comes with screenshots, steps to reproduce, what it means for your business, and exactly how to fix it."
        />

        <div ref={ref} className="mx-auto mt-14 max-w-4xl [perspective:1400px]">
          <m.div
            style={reduce ? undefined : { rotateX, scale, y, transformOrigin: "50% 100%" }}
            className="surface-card overflow-hidden shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_40px_120px_-30px_rgb(0_0_0/0.9)] will-change-transform"
          >
            {/* Browser chrome */}
            <div aria-hidden="true" className="flex items-center gap-3 border-b border-line px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
                <span className="size-2.5 rounded-full bg-white/10" />
              </div>
              <p className="mx-auto truncate rounded-md border border-line bg-background/60 px-3 py-1 font-mono text-[11px] text-subtle-foreground">
                tasklyn-readiness-report.pdf
              </p>
            </div>

            <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[220px_1fr] md:gap-8">
              <div className="flex items-center gap-5 md:flex-col md:items-start">
                <ScoreRing score={mockReport.score} size={112} stroke={8} className="md:hidden" />
                <ScoreRing score={mockReport.score} size={148} stroke={10} className="hidden md:inline-grid" />
                <div>
                  <p className="font-medium text-warn">{mockReport.status}</p>
                  <p className="mt-1 font-mono text-xs text-subtle-foreground">tasklyn.lovable.app</p>
                  <ul className="mt-4 flex gap-4 font-mono text-xs md:flex-col md:gap-1.5">
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-danger" aria-hidden="true" />
                      <span className="text-muted-foreground">{counts.critical} critical</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-warn" aria-hidden="true" />
                      <span className="text-muted-foreground">{counts.warning} warnings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                      <span className="text-muted-foreground">{counts.passed} passed</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="min-w-0">
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-muted-foreground">{mockReport.summary}</p>
                <FindingList findings={critical} defaultOpen={[critical[0].id]} compact />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}

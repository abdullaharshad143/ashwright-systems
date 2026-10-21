"use client"

import { m, useInView } from "framer-motion"
import { useRef } from "react"
import { Counter } from "@/components/motion/counter"
import { EASE_OUT } from "@/components/motion/ease"
import { scoreTone } from "@/lib/mock-report"
import { cn } from "@/lib/utils"

type ScoreRingProps = {
  score: number
  size?: number
  stroke?: number
  className?: string
  showLabel?: boolean
}

export function ScoreRing({ score, size = 160, stroke = 10, className, showLabel = true }: ScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const tone = scoreTone(score)
  const r = (size - stroke) / 2

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Readiness score ${score} out of 100: ${tone.label}`}
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth={stroke} />
        <m.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? score / 100 : 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.15 }}
          style={{ filter: `drop-shadow(0 0 10px color-mix(in srgb, ${tone.color} 35%, transparent))` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
        <p className="flex items-baseline leading-none" style={{ fontSize: Math.round(size * 0.28) }}>
          <Counter
            to={score}
            start={inView}
            delay={0.15}
            className={cn("font-semibold tracking-[-0.04em]", tone.className)}
          />
        </p>
        {showLabel && <p className="font-mono text-[10px] tracking-[0.2em] text-subtle-foreground uppercase">of 100</p>}
      </div>
    </div>
  )
}

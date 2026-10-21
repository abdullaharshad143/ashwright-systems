"use client"

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"

/** Loads only the DOM animation features and honors prefers-reduced-motion site-wide. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

"use client"

import { m, type HTMLMotionProps, type Variants } from "framer-motion"
import { EASE_OUT } from "./ease"

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const

type RevealProps = HTMLMotionProps<"div"> & { delay?: number }

/** Fades and lifts a single block into view once. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: item.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT, delay } },
      }}
      {...props}
    >
      {children}
    </m.div>
  )
}

/** Parent that staggers its RevealItem children. */
export function RevealGroup({
  stagger = 0.07,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </m.div>
  )
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <m.div variants={item} {...props}>
      {children}
    </m.div>
  )
}

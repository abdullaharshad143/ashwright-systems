"use client"

import { AnimatePresence, m } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { BookCall } from "@/components/cal/book-call"
import { EASE_OUT } from "@/components/motion/ease"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { navLinks } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])


  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      // Any link click inside the header (logo, menu items, CTAs) closes the mobile menu.
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) setOpen(false)
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid
          ? "border-line bg-background/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-surface px-3 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[70]"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <BookCall className={buttonVariants({ variant: "ghost", size: "sm" })}>Book a call</BookCall>
          <Link href="/check" className={buttonVariants({ size: "sm" })}>
            Free check
            <ButtonArrow />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/check" className={buttonVariants({ size: "sm" })}>
            Free check
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-11 place-items-center rounded-lg border border-line text-foreground transition-colors hover:border-line-strong"
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-(--ease-out-expo)",
                  open ? "top-[5px] rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-4 rounded bg-current transition-transform duration-300 ease-(--ease-out-expo)",
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background md:hidden"
          >
            <m.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="container-page flex flex-col pt-6"
            >
              {navLinks.map((l) => (
                <m.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } } }}
                  className="border-b border-line"
                >
                  <Link
                    href={l.href}
                    className="flex h-16 items-center text-2xl font-medium tracking-[-0.03em]"
                  >
                    {l.label}
                  </Link>
                </m.li>
              ))}
              <m.li
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } } }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link href="/check" className={buttonVariants({ size: "lg", className: "w-full" })}>
                  Get my free test
                  <ButtonArrow />
                </Link>
                <BookCall className={buttonVariants({ variant: "ghost", size: "lg", className: "w-full" })}>
                  Book a call
                </BookCall>
              </m.li>
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

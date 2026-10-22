"use client"

import { useSiteSettings } from "@/components/site-settings"
import { cn } from "@/lib/utils"
import { calPublicUrl, loadCal } from "./cal-api"

type BookCallProps = Omit<React.ComponentProps<"a">, "href"> & {
  prefill?: { name?: string; email?: string }
}

/**
 * Opens the Cal.com booking modal. Rendered as a real link so it still works
 * (in a new tab) before hydration or if the embed fails to load.
 */
export function BookCall({ className, children, prefill, onClick, ...props }: BookCallProps) {
  const { calLink } = useSiteSettings()
  const href = calPublicUrl(calLink)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("cursor-pointer", className)}
      onPointerEnter={() => void loadCal()}
      onFocus={() => void loadCal()}
      onClick={(e) => {
        onClick?.(e)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        void loadCal()
          .then((cal) =>
            cal("modal", {
              calLink,
              config: { layout: "month_view", theme: "dark", ...prefill },
            })
          )
          .catch(() => window.open(href, "_blank", "noopener"))
      }}
      {...props}
    >
      {children}
    </a>
  )
}

"use client"

import Cal from "@calcom/embed-react"
import { useEffect, useState } from "react"
import { siteConfig } from "@/lib/config"
import { CAL_NAMESPACE, loadCal } from "./cal-api"

export function CalInline({ name, email }: { name?: string; email?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    void loadCal().then(() => setMounted(true))
  }, [])

  return (
    <div className="relative min-h-[640px] w-full overflow-hidden rounded-xl">
      {!mounted && (
        <div className="absolute inset-0 grid place-items-center font-mono text-xs text-subtle-foreground">
          Loading calendar…
        </div>
      )}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={siteConfig.cal.link}
        calOrigin={siteConfig.cal.origin}
        style={{ width: "100%", height: "100%", minHeight: 640, overflow: "auto" }}
        config={{ layout: "month_view", theme: "dark", ...(name && { name }), ...(email && { email }) }}
      />
    </div>
  )
}

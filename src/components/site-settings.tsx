"use client"

import { createContext, useContext } from "react"
import { defaultContent } from "@/lib/content/defaults"
import type { SiteSettings } from "@/lib/content/schema"

const SiteSettingsContext = createContext<SiteSettings>(defaultContent.settings)

/** Hands the admin-editable settings (contact email, Cal.com link, turnaround) to client components. */
export function SiteSettingsProvider({ value, children }: { value: SiteSettings; children: React.ReactNode }) {
  return <SiteSettingsContext value={value}>{children}</SiteSettingsContext>
}

export const useSiteSettings = () => useContext(SiteSettingsContext)

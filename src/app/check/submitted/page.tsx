import type { Metadata } from "next"
import { getSiteContent, turnaroundLabel } from "@/lib/content"
import { Submitted } from "./submitted"

export const metadata: Metadata = {
  title: "Your check is in progress",
  robots: { index: false, follow: false },
}

export default async function SubmittedPage() {
  const { settings } = await getSiteContent()
  return <Submitted turnaround={turnaroundLabel(settings.turnaroundDays)} />
}

import type { Metadata } from "next"
import { Submitted } from "./submitted"

export const metadata: Metadata = {
  title: "Your check is in progress",
  robots: { index: false, follow: false },
}

export default function SubmittedPage() {
  return <Submitted />
}

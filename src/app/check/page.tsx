import type { Metadata } from "next"
import { Clock, EyeOff, PhoneCall, UserCheck } from "lucide-react"
import { CheckForm } from "@/components/check/check-form"
import { siteConfig } from "@/lib/config"
import { getSiteContent, turnaroundLabel } from "@/lib/content"

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent()
  return {
    title: "Free Production Readiness Check",
    description: `A real engineer tests your AI-built website or app by hand and sends you a PDF report with screenshots of every issue. Free, within ${turnaroundLabel(settings.turnaroundDays)}.`,
    alternates: { canonical: "/check" },
  }
}

export default async function CheckPage() {
  const { settings } = await getSiteContent()
  const assurances = [
    { icon: UserCheck, title: "Tested by hand, not a scanner", body: "An engineer goes through your app on desktop and mobile, like your users do." },
    { icon: Clock, title: `PDF report within ${turnaroundLabel(settings.turnaroundDays)}`, body: "Every issue with screenshots, steps to reproduce, and how to fix it." },
    { icon: EyeOff, title: "We never store your app's data", body: "We use our own test accounts and never touch real users' data." },
    { icon: PhoneCall, title: "No pressure", body: `A free ${siteConfig.cal.callLength} walkthrough if you want one. That's it.` },
  ]

  return (
    <section className="relative pt-28 pb-24 sm:pt-36">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:pt-4">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Free · 3 quick steps</p>
          <h1 className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">
            Production Readiness Check
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tell us about your website or app and what your users do in it. We&apos;ll test it by hand and send you everything we find.
          </p>
          <ul className="mt-8 hidden space-y-5 lg:block">
            {assurances.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-4 text-brand" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <CheckForm />
      </div>
    </section>
  )
}

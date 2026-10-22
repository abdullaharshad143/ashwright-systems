import {
  Gauge,
  KeyRound,
  Lock,
  MousePointerClick,
  Share2,
  Smartphone,
  Table2,
  Unlink,
} from "lucide-react"
import { Counter } from "@/components/motion/counter"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"

const checks = [
  { icon: MousePointerClick, title: "Sign-up, login & key flows", detail: "Forms, checkout, onboarding" },
  { icon: Smartphone, title: "Mobile & browsers", detail: "iPhone, Android, Safari" },
  { icon: Unlink, title: "Broken links & dead ends", detail: "404s, blank screens, errors" },
  { icon: Table2, title: "Users seeing others' data", detail: "Access rules, Supabase RLS" },
  { icon: KeyRound, title: "Exposed secrets & API keys", detail: "In the page code" },
  { icon: Lock, title: "Security headers & HTTPS", detail: "CSP, HSTS, TLS" },
  { icon: Gauge, title: "Speed on real devices", detail: "LCP, CLS, INP" },
  { icon: Share2, title: "SEO & social sharing", detail: "Meta, OG, sitemap" },
]

export function Checks({ turnaroundDays }: { turnaroundDays: number }) {
  const facts = [
    { value: 8, suffix: "", label: "areas tested by hand" },
    { value: turnaroundDays, suffix: turnaroundDays === 1 ? " day" : " days", label: "to your PDF report" },
    { value: 20, suffix: " min", label: "walkthrough call" },
    { value: 0, prefix: "$", suffix: "", label: "cost to you" },
  ]

  return (
    <section id="what-we-check" aria-labelledby="checks-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="checks-title"
          eyebrow="What we test"
          title="What the Production Readiness Check covers."
          description="No automated scan. A real engineer uses your app the way your customers do, on desktop and mobile, and documents every issue with screenshots and steps to reproduce."
        />

        <RevealGroup stagger={0.06} className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {checks.map(({ icon: Icon, title, detail }) => (
            <RevealItem key={title} className="surface-card surface-card-hover flex flex-col items-start gap-3 p-4 sm:gap-4 sm:p-5">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-brand" />
              <div>
                <h3 className="text-[0.9375rem] leading-snug font-medium">{title}</h3>
                <p className="mt-1 font-mono text-xs text-subtle-foreground">{detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-background px-5 py-6">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {f.prefix}
                <Counter to={f.value} />
                <span className="text-muted-foreground">{f.suffix}</span>
              </dd>
              <dd aria-hidden="true" className="mt-1 font-mono text-xs text-muted-foreground">
                {f.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

import { Code2, Globe2, Receipt, Wrench } from "lucide-react"
import Image from "next/image"
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { siteConfig } from "@/lib/config"

const points = [
  {
    icon: Wrench,
    title: "Engineers who ship production web and mobile apps",
    body: "Not prompt-only builders. We've run real systems with real users, and we know what breaks at scale.",
  },
  {
    icon: Receipt,
    title: "Fixed pricing, no surprise invoices",
    body: "You approve a fixed quote before work starts. If scope changes, we talk first.",
  },
  {
    icon: Code2,
    title: "You own all the code",
    body: "Everything lives in your repo and your accounts. No lock-in, ever.",
  },
  {
    icon: Globe2,
    title: "Async-friendly, wherever you are",
    body: "Written updates you can read on your schedule, and calls booked in your local time.",
  },
]

export function WhyUs() {
  const { founder } = siteConfig
  return (
    <section aria-labelledby="why-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="why-title" eyebrow="Why us" title="Real engineering, explained like a person." />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <RevealGroup className="grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, body }) => (
              <RevealItem key={title} className="surface-card surface-card-hover p-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 text-brand" />
                <h3 className="mt-4 text-base leading-snug font-semibold tracking-[-0.015em]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="surface-card flex flex-col p-6 sm:p-8">
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">A note from the founder</p>
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed tracking-[-0.01em] text-foreground">
              &ldquo;{founder.bio}&rdquo;
            </blockquote>
            <figure className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              {founder.photo ? (
                <Image
                  src={founder.photo}
                  alt={`Photo of ${founder.name}`}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
              ) : (
                <span
                  role="img"
                  aria-label="Founder photo placeholder"
                  className="grid size-12 place-items-center rounded-full border border-dashed border-line-strong bg-surface-2 font-mono text-[9px] text-subtle-foreground"
                >
                  PHOTO
                </span>
              )}
              <figcaption>
                <p className="font-medium">{founder.name}</p>
                <p className="text-sm text-muted-foreground">
                  {founder.role}, {siteConfig.name}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

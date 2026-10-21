import { Check } from "lucide-react"
import { BookCall } from "@/components/cal/book-call"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { services } from "@/lib/config"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="From check to launch."
          description="Websites, web apps, and mobile apps. Every project gets a fixed quote and a clear timeline after a free call."
        />

        <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {services.map((s) => (
            <RevealItem key={s.id} className="surface-card surface-card-hover flex flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{s.name}</h3>
                  <p className="mt-1 font-mono text-xs text-subtle-foreground">{s.tagline}</p>
                </div>
                {s.badge && (
                  <span className="shrink-0 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-brand uppercase">
                    {s.badge}
                  </span>
                )}
              </div>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                {s.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-snug">
                    <Check aria-hidden="true" strokeWidth={2} className="mt-px size-4 shrink-0 text-brand" />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
              <BookCall
                aria-label={`Book a call about ${s.name}`}
                className={cn(buttonVariants({ variant: "secondary" }), "mt-8 w-full")}
              >
                Book a call
                <ButtonArrow />
              </BookCall>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-6 text-sm text-muted-foreground">
          Not sure where to start? Get the free test. We&apos;ll recommend the smallest step that gets you live.
        </p>
      </div>
    </section>
  )
}

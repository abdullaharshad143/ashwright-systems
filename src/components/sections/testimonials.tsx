import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"

type Testimonial = { quote: string; name: string; role: string; app: string }

/**
 * Replace these placeholders with real, permissioned quotes only.
 * Never publish invented testimonials.
 */
const testimonials: Testimonial[] = [
  { quote: "[Testimonial pending]", name: "[Client name]", role: "[Role]", app: "[App name]" },
  { quote: "[Testimonial pending]", name: "[Client name]", role: "[Role]", app: "[App name]" },
  { quote: "[Testimonial pending]", name: "[Client name]", role: "[Role]", app: "[App name]" },
]

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="Founders we've helped" title="In their words." />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={i}>
              <figure className="surface-card flex h-full flex-col border-dashed p-6">
                <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 font-mono text-xs text-subtle-foreground">
                  {t.name} · {t.role} · {t.app}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

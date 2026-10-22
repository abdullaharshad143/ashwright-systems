import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import type { Testimonial } from "@/lib/content/schema"
import { cn } from "@/lib/utils"

/**
 * Real, permissioned quotes added in the admin panel. The section stays hidden
 * until there's at least one: an empty or invented testimonial costs trust.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="Founders we've helped" title="In their words." />
        <RevealGroup className={cn("mt-12 grid gap-4", testimonials.length === 1 ? "max-w-2xl" : testimonials.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
          {testimonials.map((t) => (
            <RevealItem key={t.id}>
              <figure className="surface-card flex h-full flex-col p-6">
                <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  {(t.role || t.app) && (
                    <p className="mt-0.5 font-mono text-xs text-subtle-foreground">{[t.role, t.app].filter(Boolean).join(" · ")}</p>
                  )}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

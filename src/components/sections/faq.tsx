import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeading } from "@/components/section-heading"
import { siteConfig } from "@/lib/config"
import { faqs } from "@/lib/faq"

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions founders ask us." />
          <p className="mt-4 text-[0.9375rem] text-muted-foreground">
            Something else?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
        <Accordion className="border-t border-line lg:border-t-0">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent hiddenUntilFound>
                <p>{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

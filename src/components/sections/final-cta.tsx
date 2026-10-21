import { BookCall } from "@/components/cal/book-call"
import { Reveal } from "@/components/motion/reveal"
import { UrlForm } from "@/components/url-form"
import { siteConfig } from "@/lib/config"

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line py-28 sm:py-36">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_20%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[420px] w-[800px] -translate-x-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,rgb(251_134_41/0.10),transparent_70%)]"
      />
      <Reveal className="container-page flex flex-col items-center text-center">
        <h2 id="cta-title" className="text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl">
          Launch with confidence.
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          Find out what&apos;s broken before your users do. A real engineer tests it by hand, for free.
        </p>
        <UrlForm size="lg" className="mt-9 max-w-xl" />
        <p className="text-sm text-muted-foreground">
          Or{" "}
          <BookCall className="text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground">
            book a {siteConfig.cal.callLength} call
          </BookCall>{" "}
          with an engineer.
        </p>
      </Reveal>
    </section>
  )
}

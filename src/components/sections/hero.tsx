import { BookCall } from "@/components/cal/book-call"
import { UrlForm } from "@/components/url-form"
import { siteConfig } from "@/lib/config"
import { TestCard } from "./test-card"

const headline = ["Your", "AI-built", "app", "works.", "Is", "it", "ready", "for", "real", "users?"]
// Words after this index render as the second sentence, in the Coral → Orange signature gradient.
const BREAK_AFTER = 3
const ACCENT_WORDS = headline.length - BREAK_AFTER - 1

/**
 * Each word is its own animated inline-block, so a single background-clip gradient
 * can't span them reliably. Instead each word gets its slice of the gradient as a solid color.
 */
function accentColor(j: number) {
  const t = ACCENT_WORDS > 1 ? Math.round((j / (ACCENT_WORDS - 1)) * 100) : 0
  return `color-mix(in oklab, var(--coral), var(--orange) ${t}%)`
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,rgb(255_255_255/0.06),transparent_70%)]"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p
            className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-[11px] text-muted-foreground sm:text-xs"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            For websites &amp; apps built with Lovable, Bolt, Replit &amp; more
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.625rem] leading-[1.02] font-bold tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          >
            {[headline.slice(0, BREAK_AFTER + 1), headline.slice(BREAK_AFTER + 1)].map((part, p) => (
              <span key={p} className="text-balance-safe block">
                {part.map((word, j) => {
                  const i = p === 0 ? j : BREAK_AFTER + 1 + j
                  return (
                    <span key={i}>
                      <span
                        className="animate-word"
                        style={{ "--i": i, color: p === 1 ? accentColor(j) : undefined } as React.CSSProperties}
                      >
                        {word}
                      </span>
                      {j < part.length - 1 ? " " : null}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ "--delay": "450ms" } as React.CSSProperties}
          >
            A real engineer tests your website or app by hand, on desktop and mobile, and sends you a PDF report of
            everything that&apos;s broken, with screenshots. Want it fixed? We can do that too.
          </p>

          <div className="animate-fade-up mt-8 max-w-xl" style={{ "--delay": "550ms" } as React.CSSProperties}>
            <UrlForm />
            <p className="font-mono text-xs text-subtle-foreground">
              Free <span aria-hidden="true">·</span> Tested by hand <span aria-hidden="true">·</span> Report within{" "}
              {siteConfig.check.turnaround}
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              Prefer to talk?{" "}
              <BookCall className="text-foreground underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-foreground">
                Book a {siteConfig.cal.callLength} call
              </BookCall>
            </p>
          </div>
        </div>

        <TestCard className="animate-fade-up [--delay:650ms] w-full max-w-xl justify-self-center lg:max-w-none" />
      </div>
    </section>
  )
}

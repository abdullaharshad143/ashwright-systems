import { siteConfig } from "@/lib/config"

/** Readable long-form layout for legal pages (no typography plugin needed). */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="container-page max-w-3xl pt-28 pb-24 sm:pt-36">
      <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">Last updated {siteConfig.legalUpdated}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h1>
      <div
        className={[
          "mt-10 text-[0.9375rem] leading-[1.75] text-muted-foreground",
          "[&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground",
          "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground",
          "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-subtle-foreground",
          "[&_strong]:font-medium [&_strong]:text-foreground",
          "[&_a]:text-foreground [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-foreground",
        ].join(" ")}
      >
        {children}
      </div>
    </article>
  )
}

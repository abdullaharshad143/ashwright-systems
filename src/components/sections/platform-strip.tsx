import { PlatformLogo } from "@/components/icons/platform-logos"
import { platforms } from "@/lib/config"

export function PlatformStrip() {
  return (
    <section aria-label="Supported tools" className="border-y border-line bg-surface/30">
      <div className="container-page flex flex-col items-center gap-5 py-8 md:flex-row md:justify-between md:gap-10">
        <p className="shrink-0 text-center text-sm text-muted-foreground md:text-left">
          We take apps from these tools to production:
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
          {platforms.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 text-lg font-semibold tracking-[-0.03em] text-white/50 transition-colors duration-200 hover:text-white/80"
            >
              <PlatformLogo name={p} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

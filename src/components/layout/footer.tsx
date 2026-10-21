import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { CurrentYear } from "./current-year"
import { Logo } from "./logo"

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo variant="lockup" />
          <p className="label-caps text-brand-gradient mt-5 w-fit text-[0.6875rem]">{siteConfig.slogan}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block font-mono text-[0.8125rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            {siteConfig.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:flex sm:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-page">
        <div className="border-t border-line py-6 font-mono text-xs text-subtle-foreground">
          <p>
            © <CurrentYear /> {siteConfig.legalEntity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

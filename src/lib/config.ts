/**
 * Public site URL. An explicit NEXT_PUBLIC_SITE_URL wins; on Vercel we fall back to the
 * project's production domain (a system env var, available at build and runtime) so
 * canonical, Open Graph, and sitemap URLs never point at localhost in production.
 * Server-only: VERCEL_* vars aren't exposed to client components.
 */
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}

/**
 * Brand, contact, and integration values that only change with a deploy.
 * Secrets live in environment variables (see .env.example). FAQs, services,
 * testimonials, the founder note, and site settings are edited in the admin
 * panel (src/lib/content).
 */

export const siteConfig = {
  name: "Ashwright Systems",
  /** Brand line from the Ashwright brand system. */
  slogan: "Ideas rebuilt. Systems that last.",
  tagline: "Production engineering for AI-built apps.",
  description:
    "A real engineer tests your AI-built website or app by hand and sends you a report of everything that's broken, with screenshots. Then we can fix it and take it to production, on the web, iOS, and Android.",
  url: siteUrl(),
  /** Default contact email; the live one is a site setting editable in the admin panel. */
  email: "hello@ashwrightsystems.com",
  locale: "en_US",
  /** Shown in the footer copyright line. */
  legalEntity: "Ashwright Systems",
  /** Last updated date for /privacy and /terms. */
  legalUpdated: "October 21, 2026",
  /** Governing law for the Terms. Have counsel confirm before launch. */
  jurisdiction: "[GOVERNING LAW JURISDICTION]",
  social: {
    twitter: "@ashwrightdev",
  },
  cal: {
    // The booking link itself is a site setting (src/lib/content), editable in the admin panel.
    origin: "https://app.cal.com",
    callLength: "20-min",
  },
  tracking: {
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    /**
     * When true, analytics and the Meta Pixel load only after the visitor
     * clicks "Accept". When false, they load unless the visitor declines.
     */
    requireConsent: false,
  },
} as const

export const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#what-we-check", label: "What we test" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
] as const

export const platforms = ["Lovable", "Bolt", "Replit", "v0", "Cursor", "Bubble"] as const
export type Platform = (typeof platforms)[number]

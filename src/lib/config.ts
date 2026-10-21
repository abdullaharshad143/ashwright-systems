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
 * Single source of truth for brand, contact, pricing, and integration values.
 * Secrets live in environment variables (see .env.example); everything
 * public-facing and editable lives here.
 */

export const siteConfig = {
  name: "Ashwright Systems",
  /** Brand line from the Ashwright brand system. */
  slogan: "Ideas rebuilt. Systems that last.",
  tagline: "Production engineering for AI-built apps.",
  description:
    "A real engineer tests your AI-built website or app by hand and sends you a report of everything that's broken, with screenshots. Then we can fix it and take it to production, on the web, iOS, and Android.",
  url: siteUrl(),
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
  founder: {
    name: "[FOUNDER NAME]",
    role: "[ROLE]",
    bio: "[1–2 sentence bio: what you've shipped, where, and why you started Ashwright.]",
    /** Path under /public, e.g. "/founder.jpg". Leave null to show the placeholder. */
    photo: null as string | null,
  },
  cal: {
    /** Cal.com event path, e.g. "ashwright/intro". Override with NEXT_PUBLIC_CAL_LINK. */
    link: process.env.NEXT_PUBLIC_CAL_LINK ?? "ashwright/intro",
    origin: "https://app.cal.com",
    callLength: "20-min",
  },
  check: {
    /** How long a manual test takes to reach the client. Used across the site and emails. */
    turnaround: "3 business days",
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

export type Service = {
  id: string
  name: string
  /** Short label under the name, e.g. who it's for. */
  tagline: string
  description: string
  features: string[]
  /** Small badge, e.g. "Start here". */
  badge?: string
}

export const services: Service[] = [
  {
    id: "audit",
    name: "Production Audit",
    tagline: "Code + infrastructure, with repo access",
    badge: "Start here",
    description:
      "Goes deeper than the free check. With read-only access to your repo, a senior engineer reviews your code and infrastructure by hand and finds the root causes.",
    features: [
      "Full manual code and database review",
      "Supabase RLS and auth policy audit",
      "Secrets and API key exposure review",
      "Hosting, backups, and monitoring review",
      "Prioritized fix list in plain English",
      "Walkthrough call with the engineer",
    ],
  },
  {
    id: "web",
    name: "Websites & Web Apps",
    tagline: "Marketing sites, SaaS, dashboards",
    description:
      "We fix the critical issues, set up proper production infrastructure, and launch your site or web app so it's ready for real traffic.",
    features: [
      "Critical security issues fixed",
      "Production hosting and custom domain",
      "Performance, SEO, and social sharing tuned",
      "Error monitoring and uptime alerts",
      "Automated backups and a staging environment",
      "CI/CD so every change ships safely",
    ],
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    tagline: "Native iOS & Android",
    description:
      "Native iOS and Android apps built on your existing product, then published to the App Store and Google Play.",
    features: [
      "Native iOS and Android apps",
      "Shares one backend with your web app",
      "Push notifications and deep links",
      "TestFlight and internal testing tracks",
      "App Store and Play Store submission",
      "We handle review feedback until approval",
    ],
  },
]

export const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#what-we-check", label: "What we test" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
] as const

export const platforms = ["Lovable", "Bolt", "Replit", "v0", "Cursor", "Bubble"] as const
export type Platform = (typeof platforms)[number]

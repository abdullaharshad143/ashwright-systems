import { Checks } from "@/components/sections/checks"
import { Faq } from "@/components/sections/faq"
import { FinalCta } from "@/components/sections/final-cta"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PlatformStrip } from "@/components/sections/platform-strip"
import { Platforms } from "@/components/sections/platforms"
import { Problem } from "@/components/sections/problem"
import { ReportPreview } from "@/components/sections/report-preview"
import { Services } from "@/components/sections/services"
import { Testimonials } from "@/components/sections/testimonials"
import { WhyUs } from "@/components/sections/why-us"
import { siteConfig } from "@/lib/config"
import { getSiteContent } from "@/lib/content"

export default async function HomePage() {
  const { faqs, services, testimonials, founder, settings } = await getSiteContent()
  const shownFaqs = faqs.filter((f) => f.visible)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/brand/ashwright-mark.png`,
      email: settings.email,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: shownFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero turnaroundDays={settings.turnaroundDays} />
      <PlatformStrip />
      <Problem />
      <Checks turnaroundDays={settings.turnaroundDays} />
      <ReportPreview />
      <Services services={services.filter((s) => s.visible)} />
      <Platforms />
      <HowItWorks turnaroundDays={settings.turnaroundDays} />
      <WhyUs founder={founder} />
      <Testimonials testimonials={testimonials.filter((t) => t.visible && t.permission)} />
      <Faq faqs={shownFaqs} email={settings.email} />
      <FinalCta />
    </>
  )
}

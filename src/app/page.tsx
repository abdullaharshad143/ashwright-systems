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
import { faqs } from "@/lib/faq"

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/ashwright-mark.png`,
    email: siteConfig.email,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so content can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <PlatformStrip />
      <Problem />
      <Checks />
      <ReportPreview />
      <Services />
      <Platforms />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}

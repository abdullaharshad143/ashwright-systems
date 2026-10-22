import type { Metadata } from "next"
import Link from "next/link"
import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/config"
import { getSiteContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use ${siteConfig.name}'s website and services.`,
  alternates: { canonical: "/terms" },
}

// Template terms. Have qualified counsel review them before launch.
export default async function TermsPage() {
  const { name, jurisdiction } = siteConfig
  const { email } = (await getSiteContent()).settings
  return (
    <LegalPage title="Terms of Service">
      <p>
        These terms apply when you use the {name} website and request our free Production Readiness Check. Paid work is
        covered by a separate written agreement or statement of work, which takes priority if it conflicts with these
        terms.
      </p>

      <h2>1. Authorization for testing</h2>
      <p>
        By submitting an app, you confirm that <strong>you own it or are authorized by its owner</strong> to have it
        tested, and that you authorize {name} to perform the check described below. Do not submit apps you are not
        authorized to have tested. We may decline any request.
      </p>

      <h2>2. What the check does</h2>
      <p>
        The check is manual and non-intrusive. An engineer uses your app the way a normal user would: creating test
        accounts we control, going through its main flows on desktop and mobile, and reviewing its public surface, such
        as its pages, bundled code, headers, and publicly reachable APIs. We do not attempt to break in, run load or
        stress tests, degrade service, or access accounts we didn&apos;t create. Where we find data that is publicly
        accessible or visible to the wrong account, we confirm access is possible and stop. We never download or store
        your app&apos;s data. Test accounts we create may remain in your app; you can delete them at any time. See our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>3. No guarantee</h2>
      <p>
        The free check is a helpful snapshot, not a complete test of every feature, a security audit, or a guarantee that
        your app is free of bugs or secure. It
        is provided &ldquo;as is&rdquo;. You remain responsible for your app, its data, and decisions you make based on
        the report.
      </p>

      <h2>4. Confidentiality</h2>
      <p>
        We treat your findings, code, and business information as confidential. We don&apos;t publish or share them
        except with service providers who help us deliver our services, or where the law requires it.
      </p>

      <h2>5. Paid services and ownership</h2>
      <p>
        Prices are quoted before work starts and are fixed for the scope described in your quote. Once paid in full,
        you own all code and deliverables we create for you. We keep the right to reuse general know-how and
        non-confidential tools that aren&apos;t specific to your project.
      </p>

      <h2>6. Acceptable use</h2>
      <p>Don&apos;t misuse this website, including by submitting false information, attempting to disrupt it, or scraping it at scale.</p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the extent the law allows, {name} is not liable for indirect, incidental, or consequential losses arising from
        the free check or this website. Our total liability for the free check is limited to US$100. Nothing in these
        terms limits rights you have under consumer protection laws that cannot be excluded.
      </p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of {jurisdiction}, without regard to conflict-of-law rules.</p>

      <h2>9. Changes</h2>
      <p>We may update these terms. The date at the top of this page shows when they last changed.</p>

      <h2>10. Contact</h2>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </LegalPage>
  )
}

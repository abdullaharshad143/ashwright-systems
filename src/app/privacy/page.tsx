import type { Metadata } from "next"
import { LegalPage } from "@/components/legal-page"
import { siteConfig } from "@/lib/config"
import { getSiteContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
}

// Template policy. Have qualified counsel review it before launch.
export default async function PrivacyPage() {
  const { name } = siteConfig
  const { email } = (await getSiteContent()).settings
  const mail = <a href={`mailto:${email}`}>{email}</a>
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information {name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this website
        and our services, how we use it, and the choices you have. It is written to meet the requirements of the
        privacy laws that apply to the people we work with, including the California Consumer Privacy Act as amended by
        the CPRA (CCPA), Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA), and the
        Australian Privacy Act 1988 and its Australian Privacy Principles (APPs).
      </p>

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Your name and email address.</li>
        <li>Your app&apos;s URL and, if you choose, a GitHub repository link.</li>
        <li>Your answers about your app: what you&apos;d like us to test, the tool you used, stage, goals, and budget range.</li>
        <li>Anything you share with us by email or on a call.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Campaign information from the link you used to reach us (UTM parameters and Meta click IDs).</li>
        <li>Your time zone, browser type, referring page, and IP address.</li>
        <li>
          Cookies and similar technologies from the Meta Pixel and, where enabled, Google Analytics, which help us measure
          our advertising. See <a href="#cookies">Cookies and advertising</a>.
        </li>
      </ul>

      <h2>About the Production Readiness Check</h2>
      <p>
        When you submit your app, an engineer tests it by hand, using test accounts we create and the same view any
        visitor has. Where we find that data is publicly accessible or visible to the wrong account, we confirm that
        access is possible and stop.{" "}
        <strong>We never download, copy, or store your app&apos;s data or your users&apos; data.</strong> We keep only
        the findings and screenshots needed to produce your report, taken from our own test accounts.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To run your check, prepare your report, and send it to you.</li>
        <li>To reply to you, schedule calls, and deliver services you buy.</li>
        <li>To understand which of our ads and pages are working.</li>
        <li>To keep our services secure and prevent abuse.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We use your information only for the purposes you&apos;d reasonably expect, or with your consent.</p>

      <h2>Who we share it with</h2>
      <p>We share information only with service providers who help us run our business, under contracts that limit how they can use it:</p>
      <ul>
        <li>Vercel (website hosting)</li>
        <li>Supabase (database storage)</li>
        <li>Resend (email delivery)</li>
        <li>Cal.com (call scheduling)</li>
        <li>Meta Platforms (advertising measurement, including the Conversions API, which receives a one-way hashed version of your email)</li>
        <li>Google (analytics, if enabled)</li>
      </ul>
      <p>
        <strong>We do not sell your personal information.</strong> Under the CCPA, using the Meta Pixel for advertising
        measurement may count as &ldquo;sharing&rdquo; for cross-context behavioral advertising. You can opt out at any
        time, as described below.
      </p>

      <h2 id="cookies">Cookies and advertising</h2>
      <p>
        A banner lets you accept or decline advertising and analytics cookies. If you decline, the Meta Pixel and Google
        Analytics won&apos;t load. We also honor the Global Privacy Control (GPC) signal as an opt-out. To change your
        choice, clear this site&apos;s data in your browser and the banner will appear again.
      </p>

      <h2>Where your information is stored</h2>
      <p>
        Our service providers store data in the United States and other countries. Depending on where you are, your
        information may be processed outside your country. We take reasonable steps, including contractual
        protections, to make sure it receives a comparable level of protection.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep lead and report information for up to 24 months after our last contact with you, unless you become a
        client (then for as long as needed to provide services and meet legal and tax obligations) or ask us to delete
        it sooner.
      </p>

      <h2>Your rights</h2>
      <h3>United States (California and similar state laws)</h3>
      <ul>
        <li>Know what personal information we collect, use, and disclose.</li>
        <li>Request deletion or correction of your personal information.</li>
        <li>Opt out of the sale or sharing of your personal information.</li>
        <li>Not be discriminated against for exercising these rights.</li>
      </ul>
      <h3>Canada (PIPEDA)</h3>
      <ul>
        <li>Access the personal information we hold about you and ask us to correct it.</li>
        <li>Withdraw your consent, subject to legal or contractual limits.</li>
        <li>Complain to the Office of the Privacy Commissioner of Canada.</li>
      </ul>
      <h3>Australia (Privacy Act 1988)</h3>
      <ul>
        <li>Access and correct the personal information we hold about you.</li>
        <li>Deal with us anonymously or under a pseudonym where practical.</li>
        <li>Complain to the Office of the Australian Information Commissioner (OAIC) if you&apos;re not satisfied with our response.</li>
      </ul>
      <p>
        To use any of these rights, email {mail}. We&apos;ll verify your request and respond within 30 days, or within the
        time your local law requires. You can use an authorized agent where your law allows it.
      </p>

      <h2>Security</h2>
      <p>
        We protect your information with encryption in transit, access controls, and least-privilege credentials. No
        system is perfectly secure, but we work hard to protect what you share with us, and we&apos;ll notify you and the
        relevant authorities of any eligible data breach as required by law.
      </p>

      <h2>Children</h2>
      <p>Our services are for businesses and are not directed to anyone under 16. We do not knowingly collect their information.</p>

      <h2>Changes</h2>
      <p>If we make material changes, we&apos;ll update the date at the top of this page and, where appropriate, let you know by email.</p>

      <h2>Contact</h2>
      <p>Questions or requests: {mail}. This address also reaches our privacy officer.</p>
    </LegalPage>
  )
}

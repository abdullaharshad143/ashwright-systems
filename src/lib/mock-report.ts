export type Severity = "critical" | "warning" | "passed"

export type Finding = {
  id: string
  severity: Severity
  title: string
  /** Technical location, shown in mono. */
  location?: string
  meaning: string
  fix: string
  /** Optional snippet shown under "How to fix". */
  code?: string
  /** Device and browser the tester saw it on. */
  testedOn?: string
  steps?: string[]
  /** Screenshot and recording file names attached in the PDF. */
  evidence?: string[]
}

export type Report = {
  id: string
  appUrl: string
  platform: string
  scannedAt: string
  score: number
  status: string
  summary: string
  findings: Finding[]
}

export const severityMeta: Record<Severity, { label: string; color: string; ring: string; bg: string }> = {
  critical: { label: "Critical", color: "text-danger-strong", ring: "border-danger/30", bg: "bg-danger/10" },
  warning: { label: "Warning", color: "text-warn", ring: "border-warn/30", bg: "bg-warn/10" },
  passed: { label: "Passed", color: "text-success", ring: "border-success/30", bg: "bg-success/10" },
}

export function scoreTone(score: number) {
  if (score >= 80) return { color: "var(--success)", label: "Production ready", className: "text-success" }
  if (score >= 50) return { color: "var(--warn)", label: "Needs work", className: "text-warn" }
  return { color: "var(--warn)", label: "Not production ready", className: "text-warn" }
}

export const mockReport: Report = {
  id: "demo",
  appUrl: "https://tasklyn.lovable.app",
  platform: "Lovable",
  scannedAt: "2026-10-06T14:20:00Z",
  score: 43,
  status: "Not production ready",
  summary:
    "Your app works well for a demo, but upgrading fails on iPhone, and three issues would let strangers read user data or run up your bills. All four are fixable in a few days.",
  findings: [
    {
      id: "upgrade-ios",
      severity: "critical",
      title: 'The "Upgrade" button does nothing on iPhone',
      location: "/pricing",
      testedOn: "iPhone 15 · Safari 18",
      meaning:
        "Visitors on iPhone can't pay you. There's no error, so they assume the app is broken and leave. On desktop it works, which is why it's easy to miss.",
      fix: "The button listens for a mouse event that Safari on iOS never fires. Switch the handler to onClick and test the full checkout on a real iPhone.",
      steps: ["Open /pricing on an iPhone in Safari", 'Tap "Upgrade" on the Pro plan', "Nothing happens. The Stripe checkout never opens"],
      evidence: ["01-pricing-iphone.png", "02-upgrade-tap.mp4"],
    },
    {
      id: "rls-profiles",
      severity: "critical",
      title: 'Supabase table "profiles" is publicly readable',
      location: "public.profiles · RLS disabled",
      steps: ["Open the site signed out", "Copy the public Supabase key from the page code", 'Request the "profiles" table: every row comes back'],
      evidence: ["03-profiles-readable.png"],
      meaning:
        "Anyone who opens your site can find your Supabase key in the page code and use it to download every row in this table. That includes names, emails, and phone numbers for all of your users.",
      fix: "Turn on Row Level Security for the table, then add a policy so each user can only read their own profile.",
      code: `alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);`,
    },
    {
      id: "openai-key",
      severity: "critical",
      title: "OpenAI API key exposed in frontend bundle",
      location: "/assets/index-8f2a1c.js · sk-proj-…Xw4Q",
      meaning:
        "Your OpenAI key is shipped to every visitor's browser. Anyone can copy it and make requests on your account. You pay for every one of them.",
      fix: "Revoke this key in the OpenAI dashboard today. Then move AI calls into a server function (for example, a Supabase Edge Function) so the new key never reaches the browser. Set a monthly usage cap as a safety net.",
    },
    {
      id: "admin-client-only",
      severity: "critical",
      title: "Admin access is checked only in the browser",
      location: "/admin · role check in AdminRoute.tsx",
      meaning:
        "The admin page hides itself from regular users, but the database behind it doesn't. Any signed-in user can call the same queries directly and see or change admin data.",
      fix: "Enforce the admin role on the server: add an is_admin check to your RLS policies or route admin actions through a server function that verifies the role.",
    },
    {
      id: "no-monitoring",
      severity: "warning",
      title: "No error monitoring detected",
      meaning: "When something breaks for a user, you won't know unless they tell you.",
      fix: "Add an error tracker such as Sentry and route alerts to email or Slack.",
    },
    {
      id: "headers",
      severity: "warning",
      title: "Missing Content-Security-Policy and HSTS headers",
      meaning: "Browsers get fewer protections against injected scripts and downgrade attacks.",
      fix: "Add security headers at your host or in your framework config.",
    },
    {
      id: "lcp",
      severity: "warning",
      title: "Slow first load on mobile (LCP 4.1s)",
      meaning: "Most visitors from ads are on phones. Slow loads cost you signups.",
      fix: "Compress the hero image, lazy-load below-the-fold content, and split the main bundle.",
    },
    {
      id: "og",
      severity: "warning",
      title: "No social sharing preview",
      meaning: "Links to your app look blank when shared on social media or in messages.",
      fix: "Add Open Graph and Twitter card tags with a 1200×630 image.",
    },
    { id: "ssl", severity: "passed", title: "SSL certificate valid", meaning: "", fix: "" },
    { id: "https", severity: "passed", title: "HTTP redirects to HTTPS", meaning: "", fix: "" },
    { id: "auth-provider", severity: "passed", title: "Passwords handled by Supabase Auth", meaning: "", fix: "" },
    { id: "robots", severity: "passed", title: "robots.txt present", meaning: "", fix: "" },
    { id: "cors", severity: "passed", title: "API CORS restricted to your domain", meaning: "", fix: "" },
    { id: "deps", severity: "passed", title: "No known vulnerable packages in bundle", meaning: "", fix: "" },
  ],
}

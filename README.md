# Ashwright Systems

Marketing site and lead funnel for Ashwright Systems: production engineering for apps built with Lovable, Bolt, Replit, v0, and Cursor.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4 · shadcn/ui (Base UI) · Framer Motion · React Hook Form + Zod · Supabase · Resend · Cal.com

## Getting started

```bash
cp .env.example .env.local   # fill in what you have; everything degrades gracefully
npm install
npm run dev                  # http://localhost:3000
```

Without Supabase or Resend credentials, form submissions still succeed: the lead is logged to the server console and the email step is skipped.

## Configuration

| What | Where |
| --- | --- |
| Brand name, email, founder note, services, nav, Cal.com link, tracking IDs | `src/lib/config.ts` |
| Secrets and per-environment values | `.env.local` (see `.env.example`) |
| FAQ copy (also feeds FAQPage structured data) | `src/lib/faq.ts` |
| Sample report data (the home page preview) | `src/lib/mock-report.ts` |
| Testimonials (placeholders until you have real, permissioned quotes) | `src/components/sections/testimonials.tsx` |
| Design tokens (colors, radii, utilities) | `src/app/globals.css` |

## Supabase

This site shares its Supabase project with the admin panel (`ashwright-admin-panel`), which owns the schema: all migrations live in that repo's `supabase/migrations/`, including the one that creates `leads`. Add new migrations there, never here, so there's a single history.

This site only inserts into `leads`. RLS is enabled with no public policies, and inserts use the service role key from the server action only.

## Lead flow

`/check` (3-step form) → `submitLead` server action (`src/app/check/actions.ts`):

1. Validates with Zod (shared schemas in `src/lib/schemas.ts`); drops honeypot submissions.
2. Inserts into `leads` with UTM params, fbclid, timezone, referrer, and user agent.
3. After the response (`after()`): sends the confirmation email (and the optional internal notification, which links to the lead in the admin panel when `ADMIN_URL` is set) and a Meta CAPI `Lead` event with a hashed email.
4. The client fires the Pixel `Lead` event with the same `eventID` (for deduplication) and redirects to `/check/submitted`.

Audits happen in the admin panel: the team scans the app, reviews the findings, and sends the report to the client personally. This site has no report pages.

## Tracking

- **Meta Pixel**: `PageView` on every route, `ViewContent` on `/check`, `Lead` on submit, and `Schedule` on Cal.com booking (`bookingSuccessfulV2`).
- **Conversions API**: `Lead` is sent from the server action; `POST /api/meta/conversions` handles browser-originated events such as `Schedule`.
- **GA4**: optional; set `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- **UTM persistence**: UTM params and fbclid are saved to sessionStorage on landing (`src/lib/attribution.ts`).
- **Consent**: the cookie banner sets consent, and Global Privacy Control is honored as an opt-out. `siteConfig.tracking.requireConsent` switches between opt-out (default) and opt-in.

## Before launch

- [ ] Replace `[FOUNDER NAME]`, `[ROLE]`, the bio, and the photo in `src/lib/config.ts`.
- [ ] Set the governing-law jurisdiction in `src/lib/config.ts`, and have counsel review `/privacy` and `/terms`.
- [ ] Set a real Cal.com event link (`NEXT_PUBLIC_CAL_LINK`).
- [ ] Verify your sending domain in Resend and set `RESEND_FROM_EMAIL`.
- [ ] Replace testimonial placeholders with real quotes, or remove `<Testimonials />` from `src/app/page.tsx`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for canonical URLs, the sitemap, and OG images).

## Scripts

```bash
npm run dev     # development server
npm run build   # production build (also type-checks)
npm run start   # serve the production build
npm run lint    # ESLint (includes React Compiler rules)
```

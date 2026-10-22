import { z } from "zod"

/*
 * Editable site content: what the admin panel's "Site content" pages save into
 * public.site_content, one row per key. The limits keep any edit from breaking
 * the layout. Mirrored in ashwright-admin-panel/src/lib/site-content/schema.ts;
 * change both together.
 */

export const contentKeys = ["faqs", "testimonials", "services", "founder", "settings"] as const
export type ContentKey = (typeof contentKeys)[number]

const required = (label: string, max: number) =>
  z.string().trim().min(1, `${label} can't be empty.`).max(max, `Keep ${label.toLowerCase()} under ${max} characters.`)
const optional = (label: string, max: number) => z.string().trim().max(max, `Keep ${label.toLowerCase()} under ${max} characters.`)
const id = z.string().min(1).max(64)

export const faqsSchema = z
  .array(
    z.object({
      id,
      question: required("The question", 120),
      answer: required("The answer", 700),
      visible: z.boolean(),
    })
  )
  .max(24, "Keep it to 24 questions or fewer.")

export const testimonialsSchema = z
  .array(
    z
      .object({
        id,
        quote: required("The quote", 320),
        name: required("The name", 60),
        role: optional("The role", 60),
        app: optional("The app name", 60),
        visible: z.boolean(),
        /** The client agreed to be quoted. Required before a testimonial can be shown. */
        permission: z.boolean(),
      })
      .refine((t) => !t.visible || t.permission, {
        message: "Confirm the client agreed to be quoted before showing it.",
        path: ["permission"],
      })
  )
  .max(6, "Show 6 testimonials at most.")

export const servicesSchema = z
  .array(
    z.object({
      id,
      name: required("The name", 40),
      tagline: required("The tagline", 50),
      badge: optional("The badge", 16),
      description: required("The description", 260),
      features: z
        .array(required("Each feature", 70))
        .min(3, "List at least 3 features.")
        .max(8, "List 8 features at most."),
      visible: z.boolean(),
    })
  )
  .min(1, "Keep at least one service.")
  .max(6, "Show 6 services at most.")
  .refine((list) => list.some((s) => s.visible), "Show at least one service.")

export const founderSchema = z.object({
  name: optional("The name", 60),
  role: optional("The role", 60),
  bio: optional("The bio", 300),
  /** Public URL in the "site-assets" bucket, or null for no photo. */
  photoUrl: z.url().max(500).nullable(),
})

export const settingsSchema = z.object({
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  calLink: z
    .string()
    .trim()
    .regex(/^[\w.-]+\/[\w.-]+$/, 'Use the part after cal.com/, like "ashwright/intro".'),
  turnaroundDays: z.number().int().min(1, "At least 1 day.").max(10, "10 days at most."),
})

export const contentSchemas = {
  faqs: faqsSchema,
  testimonials: testimonialsSchema,
  services: servicesSchema,
  founder: founderSchema,
  settings: settingsSchema,
} as const

export type SiteContent = { [K in ContentKey]: z.output<(typeof contentSchemas)[K]> }
export type Faq = SiteContent["faqs"][number]
export type Testimonial = SiteContent["testimonials"][number]
export type Service = SiteContent["services"][number]
export type Founder = SiteContent["founder"]
export type SiteSettings = SiteContent["settings"]

/** "3 business days". */
export const turnaroundLabel = (days: number) => `${days} business day${days === 1 ? "" : "s"}`

/** The founder card shows only once there's a name and a bio. */
export const hasFounder = (f: Founder) => Boolean(f.name && f.bio)

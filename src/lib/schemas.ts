import { z } from "zod"
import { normalizeUrl } from "@/lib/url"

const appUrl = z
  .string()
  .trim()
  .min(1, "Enter your website or app's URL.")
  .refine((v) => normalizeUrl(v) !== null, "That doesn't look like a URL. Try https://your-app.com")

/* ─── Option sets (value + label), shared by the form UI and validation ─── */

export const platformOptions = [
  { value: "lovable", label: "Lovable" },
  { value: "bolt", label: "Bolt" },
  { value: "replit", label: "Replit" },
  { value: "v0", label: "v0" },
  { value: "cursor", label: "Cursor" },
  { value: "other", label: "Other" },
] as const

export const projectTypeOptions = [
  { value: "website", label: "Website" },
  { value: "web-app", label: "Web app" },
  { value: "mobile-app", label: "Mobile app" },
  { value: "web-and-mobile", label: "Web + mobile" },
] as const

export const stageOptions = [
  { value: "prototype", label: "Just a prototype" },
  { value: "users", label: "Have users" },
  { value: "paying", label: "Have paying customers" },
] as const

export const goalOptions = [
  { value: "security", label: "Fix security issues" },
  { value: "launch", label: "Launch to production" },
  { value: "migrate", label: "Move off Lovable / Replit" },
  { value: "build", label: "Build new features" },
  { value: "app-stores", label: "Publish to app stores" },
  { value: "unsure", label: "Not sure yet" },
] as const

export const budgetOptions = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-5k", label: "$2k–5k" },
  { value: "5k-10k", label: "$5k–10k" },
  { value: "10k-25k", label: "$10k–25k" },
  { value: "25k-plus", label: "$25k+" },
  { value: "unsure", label: "Not sure yet" },
] as const

type Values<T extends readonly { value: string }[]> = T[number]["value"]
const oneOf = <T extends readonly { value: string }[]>(options: T, message: string) =>
  z.enum(options.map((o) => o.value) as [Values<T>, ...Values<T>[]], { error: message })

/* ─── Form steps ─── */

export const stepOneSchema = z.object({
  appUrl,
  testFocus: z
    .string()
    .trim()
    .min(10, "Tell us in a few words what users do in your app, e.g. \"sign up and book a class\".")
    .max(500, "Keep it under 500 characters. We'll ask follow-up questions by email."),
  platform: oneOf(platformOptions, "Pick the tool you used."),
  projectType: oneOf(projectTypeOptions, "Let us know what you're working on."),
})

export const stepTwoSchema = z.object({
  stage: oneOf(stageOptions, "Pick the stage that fits best."),
  goal: oneOf(goalOptions, "Pick your main goal."),
  budget: oneOf(budgetOptions, "Pick your budget range. \"Not sure yet\" is fine."),
})

export const stepThreeSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "That name is a bit long."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  githubUrl: z
    .string()
    .trim()
    .max(300)
    .refine(
      (v) => v === "" || /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+(\/[\w.-]+)?\/?$/i.test(v),
      "Use a GitHub link like github.com/you/your-app, or leave it blank."
    ),
  consent: z.boolean().refine((v) => v, "Please confirm you're authorized to have this app tested."),
})

export const leadFormSchema = stepOneSchema.extend(stepTwoSchema.shape).extend(stepThreeSchema.shape)
export type LeadFormValues = z.input<typeof leadFormSchema>

export const stepSchemas = [stepOneSchema, stepTwoSchema, stepThreeSchema] as const

/* ─── Server payload: form values + attribution ─── */

const optionalText = (max = 300) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null))

export const attributionSchema = z.object({
  utm_source: optionalText(),
  utm_medium: optionalText(),
  utm_campaign: optionalText(),
  utm_content: optionalText(),
  fbclid: optionalText(500),
  timezone: optionalText(64),
  referrer: optionalText(500),
  landingPage: optionalText(500),
  fbp: optionalText(200),
  fbc: optionalText(600),
  eventId: z.string().trim().max(64).optional(),
})

export const leadPayloadSchema = z.object({
  values: leadFormSchema,
  attribution: attributionSchema,
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().max(0).optional(),
})

export type LeadPayload = z.input<typeof leadPayloadSchema>

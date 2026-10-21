"use server"

import { randomUUID } from "node:crypto"
import { headers } from "next/headers"
import { after } from "next/server"
import { siteConfig } from "@/lib/config"
import { sendLeadEmails } from "@/lib/email"
import { clientIpFrom, sendMetaEvent } from "@/lib/meta-capi"
import {
  budgetOptions,
  goalOptions,
  leadPayloadSchema,
  platformOptions,
  projectTypeOptions,
  stageOptions,
  type LeadPayload,
} from "@/lib/schemas"
import { getSupabaseAdmin } from "@/lib/supabase"
import { normalizeUrl } from "@/lib/url"

type SubmitResult = { ok: true; leadId: string } | { ok: false; error: string }

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value

export async function submitLead(input: LeadPayload): Promise<SubmitResult> {
  const parsed = leadPayloadSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Some answers look incomplete. Go back, check each step, and try again." }
  }

  const { values, attribution, website } = parsed.data

  // Honeypot filled in: pretend success so bots learn nothing.
  if (website) return { ok: true, leadId: randomUUID() }

  const appUrl = normalizeUrl(values.appUrl)!
  const githubUrl = values.githubUrl ? normalizeUrl(values.githubUrl) : null
  const h = await headers()
  const userAgent = h.get("user-agent")?.slice(0, 500) ?? null

  const row = {
    app_url: appUrl,
    test_focus: values.testFocus,
    platform: values.platform,
    project_type: values.projectType,
    stage: values.stage,
    goal: values.goal,
    budget: values.budget,
    name: values.name,
    email: values.email.toLowerCase(),
    github_url: githubUrl,
    consent: values.consent,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    fbclid: attribution.fbclid,
    timezone: attribution.timezone,
    referrer: attribution.referrer,
    user_agent: userAgent,
  }

  let leadId: string
  const supabase = getSupabaseAdmin()
  if (supabase) {
    const { data, error } = await supabase.from("leads").insert(row).select("id").single()
    if (error || !data) {
      console.error("[lead] insert failed", error)
      return {
        ok: false,
        error: `We couldn't save your request. Please try again, or email us at ${siteConfig.email}.`,
      }
    }
    leadId = data.id as string
  } else {
    console.warn("[lead] Supabase env vars missing; lead not persisted.", { app_url: appUrl })
    leadId = randomUUID()
  }

  const summary = [
    `App: ${appUrl}`,
    `Test first: ${values.testFocus}`,
    `Built with: ${labelFor(platformOptions, values.platform)}`,
    `Project: ${labelFor(projectTypeOptions, values.projectType)}`,
    `Stage: ${labelFor(stageOptions, values.stage)}`,
    `Goal: ${labelFor(goalOptions, values.goal)}`,
    `Budget: ${labelFor(budgetOptions, values.budget)}`,
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `GitHub: ${githubUrl ?? "—"}`,
    `Timezone: ${attribution.timezone ?? "—"}`,
    `Source: ${[attribution.utm_source, attribution.utm_medium, attribution.utm_campaign].filter(Boolean).join(" / ") || "direct"}`,
  ].join("\n")

  const clientIp = clientIpFrom(h)
  const sourceUrl = `${siteConfig.url}/check`

  // Side effects run after the response so the visitor isn't kept waiting.
  after(async () => {
    const tasks = await Promise.allSettled([
      sendLeadEmails({ leadId, name: values.name, email: values.email, appUrl, summary }),
      sendMetaEvent({
        eventName: "Lead",
        eventId: attribution.eventId,
        sourceUrl,
        email: values.email,
        firstName: values.name.split(" ")[0],
        clientIp,
        userAgent: userAgent ?? undefined,
        fbp: attribution.fbp,
        fbc: attribution.fbc,
        customData: { content_name: "Production Readiness Check" },
      }),
    ])
    for (const t of tasks) if (t.status === "rejected") console.error("[lead] follow-up task failed", t.reason)
  })

  return { ok: true, leadId }
}

import "server-only"
import { Resend } from "resend"
import { siteConfig } from "@/lib/config"

type ConfirmationInput = {
  name: string
  email: string
  appUrl: string
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

function calUrl() {
  return `https://cal.com/${siteConfig.cal.link}`
}

function confirmationHtml({ name, appUrl }: ConfirmationInput) {
  const first = escape(name.split(" ")[0] ?? name)
  const url = escape(appUrl)
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e6e8ec;border-radius:12px;">
          <tr><td style="padding:28px 28px 8px;">
            <p style="margin:0 0 24px;font-size:15px;font-weight:600;letter-spacing:-0.01em;">${siteConfig.name}</p>
            <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;letter-spacing:-0.02em;">Your Production Readiness Check is in progress</h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3f4a;">Hi ${first}, thanks for sending over your app. An engineer will test it by hand, on desktop and mobile, and send the report to you personally.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:#f5f6f8;border-radius:8px;">
              <tr><td style="padding:12px 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;color:#3a3f4a;">${url}</td></tr>
            </table>
            <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#3a3f4a;"><strong style="color:#0a0a0a;">What happens next</strong></p>
            <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#3a3f4a;">1. You'll get a PDF report within ${siteConfig.check.turnaround}, with screenshots of every issue.</p>
            <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#3a3f4a;">2. We walk you through it on a free ${siteConfig.cal.callLength} call.</p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3a3f4a;">3. You decide what, if anything, to fix. No pressure.</p>
            <a href="${calUrl()}" style="display:inline-block;background:#fb8629;color:#0a0a0a;text-decoration:none;font-size:14px;font-weight:600;padding:12px 18px;border-radius:8px;">Book your walkthrough call</a>
            <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#6b7280;">We test with our own test accounts. If your app is invite-only or needs a paid plan, we'll reply to ask for a test login. We never download or store your app's data.</p>
          </td></tr>
          <tr><td style="padding:20px 28px 28px;font-size:13px;color:#6b7280;border-top:1px solid #eef0f3;">
            Reply to this email anytime. A real person reads it.<br/>${siteConfig.name} · ${siteConfig.email}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

function confirmationText({ name, appUrl }: ConfirmationInput) {
  const first = name.split(" ")[0] ?? name
  return `Hi ${first},

Thanks for sending over your app. An engineer will test it by hand, on desktop and mobile, and send the report to you personally.

App: ${appUrl}

What happens next
1. You'll get a PDF report within ${siteConfig.check.turnaround}, with screenshots of every issue.
2. We walk you through it on a free ${siteConfig.cal.callLength} call.
3. You decide what, if anything, to fix. No pressure.

Book your walkthrough call: ${calUrl()}

We test with our own test accounts. If your app is invite-only or needs a paid plan, we'll reply to ask for a test login. We never download or store your app's data.

Reply to this email anytime. A real person reads it.
${siteConfig.name} · ${siteConfig.email}`
}

export async function sendLeadEmails(input: ConfirmationInput & { leadId: string; summary: string }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    console.warn("[email] RESEND_API_KEY or RESEND_FROM_EMAIL missing; skipping confirmation email.")
    return
  }

  const resend = new Resend(apiKey)
  const sends = [
    resend.emails.send({
      from,
      to: input.email,
      replyTo: siteConfig.email,
      subject: "Your Production Readiness Check is in progress",
      html: confirmationHtml(input),
      text: confirmationText(input),
    }),
  ]

  const internal = process.env.LEAD_NOTIFICATION_EMAIL
  if (internal) {
    const adminUrl = process.env.ADMIN_URL?.replace(/\/$/, "")
    const leadLine = adminUrl ? `Open in admin: ${adminUrl}/leads/${input.leadId}` : `Lead ID: ${input.leadId}`
    sends.push(
      resend.emails.send({
        from,
        to: internal,
        replyTo: input.email,
        subject: `New check: ${input.appUrl}`,
        text: `${input.summary}\n\n${leadLine}`,
      })
    )
  }

  const results = await Promise.allSettled(sends)
  for (const r of results) {
    if (r.status === "rejected") console.error("[email] send failed", r.reason)
    else if (r.value.error) console.error("[email] send failed", r.value.error)
  }
}

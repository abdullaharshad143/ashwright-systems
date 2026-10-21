import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { siteConfig } from "@/lib/config"

export const alt = `${siteConfig.name}: Your AI-built app works. Is it ready for real users?`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Status = "pass" | "fail" | "warn"

const rows: { status: Status; text: string }[] = [
  { status: "pass", text: "SSL certificate valid" },
  { status: "fail", text: 'Supabase table "profiles" publicly readable' },
  { status: "fail", text: "OpenAI API key exposed in frontend bundle" },
  { status: "warn", text: "No error monitoring detected" },
]

// Drawn as SVG: the OG renderer's bundled font has no ✓ / ✗ glyphs.
function StatusIcon({ status }: { status: Status }) {
  const color = { pass: "#22C55E", fail: "#EF4444", warn: "#FACC15" }[status]
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      {status === "pass" && <path d="M4 10.5l4 4 8-9" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {status === "fail" && <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />}
      {status === "warn" && (
        <>
          <path d="M10 3v9" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="10" cy="16.5" r="1.6" fill={color} />
        </>
      )}
    </svg>
  )
}

async function brandAsset(name: string) {
  const data = await readFile(join(process.cwd(), "public/brand", name))
  return `data:image/png;base64,${data.toString("base64")}`
}

export default async function OpengraphImage() {
  const [mark, lockup] = await Promise.all([brandAsset("ashwright-mark.png"), brandAsset("ashwright-lockup.png")])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0A0A0A",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={mark} width={70} height={56} alt="" />
          <img src={lockup} width={218} height={38} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.045em" }}>
          <span>Your AI-built app works.</span>
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #F16375, #FB8629)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Is it ready for real users?
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "22px 26px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#121212",
            fontFamily: "monospace",
            fontSize: 22,
          }}
        >
          {rows.map((r) => (
            <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <StatusIcon status={r.status} />
              <span style={{ color: "#D4D4D4" }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}

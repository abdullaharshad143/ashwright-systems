// Kept free of dependencies: it ships in the home page bundle via UrlForm.

/** Adds https:// when missing and strips trailing slashes. Returns null if unparseable. */
export function normalizeUrl(raw: string): string | null {
  const value = raw.trim()
  if (!value) return null
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
  try {
    const url = new URL(withProtocol)
    if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null
    return url.toString().replace(/\/$/, "")
  } catch {
    return null
  }
}

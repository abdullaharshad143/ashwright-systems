import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/check`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ]
}

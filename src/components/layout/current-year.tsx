import { cacheLife } from "next/cache"

/** Cached so the prerendered footer stays static; refreshed daily so the year rolls over. */
export async function CurrentYear() {
  "use cache"
  cacheLife("days")
  return <>{new Date().getFullYear()}</>
}

import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import lockup from "../../../public/brand/ashwright-lockup.png"
import mark from "../../../public/brand/ashwright-mark.png"
import wordmark from "../../../public/brand/ashwright-wordmark.png"

type Loading = "eager" | "lazy"

/** The Ashwright "A" mark, taken from the brand system artwork. Minimum size is 24px. */
export function LogoMark({ className, loading }: { className?: string; loading?: Loading }) {
  return <Image src={mark} alt="" aria-hidden="true" loading={loading} className={cn("h-7 w-auto", className)} />
}

/**
 * `default`: mark + ASHWRIGHT wordmark, for the navbar (loads eagerly, it's above the fold).
 * `lockup`: mark + ASHWRIGHT / SYSTEMS, for roomier spots like the footer.
 */
export function Logo({ variant = "default", className }: { variant?: "default" | "lockup"; className?: string }) {
  const isLockup = variant === "lockup"
  const loading: Loading = isLockup ? "lazy" : "eager"
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("inline-flex items-center rounded-md", isLockup ? "gap-3.5" : "gap-2 sm:gap-2.5", className)}
    >
      <LogoMark loading={loading} className={isLockup ? "h-11" : "h-6 sm:h-7"} />
      <Image
        src={isLockup ? lockup : wordmark}
        alt=""
        aria-hidden="true"
        loading={loading}
        className={cn("w-auto", isLockup ? "h-[1.85rem]" : "h-[0.7rem] sm:h-[0.9rem]")}
      />
    </Link>
  )
}

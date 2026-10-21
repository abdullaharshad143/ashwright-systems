"use client"

import { Link as LinkIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useId, useState } from "react"
import { Button, ButtonArrow } from "@/components/ui/button"
import { normalizeUrl } from "@/lib/url"
import { cn } from "@/lib/utils"

/** Single-field "paste your URL" form. Sends the visitor to /check with the URL prefilled. */
export function UrlForm({ className, size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const id = useId()
  const errorId = `${id}-error`

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = normalizeUrl(value)
    if (!url) {
      setError(value.trim() ? "That doesn't look like a URL. Try https://your-app.com" : "Paste your app's URL to start.")
      return
    }
    setError(null)
    router.push(`/check?url=${encodeURIComponent(url)}`)
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:border sm:bg-surface sm:p-1.5 sm:shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_12px_40px_-12px_rgb(0_0_0/0.6)] sm:transition-[border-color,box-shadow] sm:focus-within:border-brand/50 sm:focus-within:ring-4 sm:focus-within:ring-brand/10",
          error ? "sm:border-danger/60" : "sm:border-line-strong"
        )}
      >
        <label htmlFor={id} className="sr-only">
          Your app&apos;s URL
        </label>
        <div className="relative flex-1">
          <LinkIcon
            aria-hidden="true"
            strokeWidth={1.5}
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle-foreground"
          />
          <input
            id={id}
            type="url"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="https://your-app.com"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(null)
            }}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-12 w-full rounded-lg border bg-surface pr-3 pl-10 font-mono text-base text-foreground outline-none placeholder:text-subtle-foreground focus-visible:outline-none sm:h-11 sm:border-0 sm:bg-transparent sm:text-[0.9375rem]",
              "max-sm:transition-[border-color,box-shadow] max-sm:focus-visible:border-brand/50 max-sm:focus-visible:ring-4 max-sm:focus-visible:ring-brand/10",
              error ? "border-danger/60" : "border-line-strong",
              size === "lg" && "sm:h-12"
            )}
          />
        </div>
        <Button type="submit" size={size === "lg" ? "lg" : "default"} className="h-12 w-full sm:h-11 sm:w-auto">
          Get my free test
          <ButtonArrow />
        </Button>
      </div>
      <p id={errorId} role="alert" className="min-h-5 pt-2 text-left text-sm text-danger">
        {error}
      </p>
    </form>
  )
}

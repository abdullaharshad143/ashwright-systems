import * as React from "react"
import { cn } from "@/lib/utils"

/** Multi-line twin of Input, with the same border, focus, and error styles. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // text-base on mobile prevents iOS Safari from zooming into the field
        "min-h-24 w-full min-w-0 resize-y rounded-lg border border-line-strong bg-surface px-3.5 py-3 text-base leading-relaxed text-foreground shadow-[inset_0_1px_2px_rgb(0_0_0/0.3)] transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-subtle-foreground hover:border-white/20 focus-visible:border-brand/60 focus-visible:ring-4 focus-visible:ring-brand/15 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger/70 aria-invalid:focus-visible:ring-danger/15 sm:text-[0.9375rem]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

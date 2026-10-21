import { severityMeta, type Severity } from "@/lib/mock-report"
import { cn } from "@/lib/utils"

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const meta = severityMeta[severity]
  return (
    <span
      className={cn(
        "inline-flex h-5 shrink-0 items-center gap-1.5 rounded-md border px-1.5 font-mono text-[10px] font-medium tracking-[0.2em] uppercase",
        meta.ring,
        meta.bg,
        meta.color,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

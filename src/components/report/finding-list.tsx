"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"
import type { Finding } from "@/lib/mock-report"
import { cn } from "@/lib/utils"
import { SeverityBadge } from "./severity-badge"

type FindingListProps = {
  findings: Finding[]
  defaultOpen?: string[]
  className?: string
  /** Compact rows for the marketing preview. */
  compact?: boolean
}

/** Expandable findings with "What this means" and "How to fix" in plain English. */
export function FindingList({ findings, defaultOpen = [], className, compact }: FindingListProps) {
  return (
    <AccordionPrimitive.Root
      multiple
      defaultValue={defaultOpen}
      className={cn("divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface", className)}
    >
      {findings.map((f) => (
        <AccordionPrimitive.Item key={f.id} value={f.id}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                "group/row flex w-full cursor-pointer items-start gap-3 text-left transition-colors outline-none hover:bg-white/[0.02] focus-visible:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                compact ? "px-4 py-3.5" : "px-4 py-4 sm:px-5"
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                <SeverityBadge severity={f.severity} className="mt-px w-fit" />
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] leading-snug font-medium text-foreground">{f.title}</span>
                  {(f.location || f.testedOn) && (
                    <span className="mt-1 block truncate font-mono text-xs text-subtle-foreground">
                      {[f.location, f.testedOn].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-(--ease-out-expo) group-aria-expanded/row:rotate-180"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-(--ease-out-expo) data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
            <div className={cn("grid gap-4 pb-5 sm:grid-cols-2", compact ? "px-4" : "px-4 sm:px-5")}>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase">What this means</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.meaning}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">How to fix</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.fix}</p>
              </div>
              {f.steps && (
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase">Steps to reproduce</p>
                  <ol className="mt-1.5 list-decimal space-y-0.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:font-mono marker:text-xs marker:text-subtle-foreground">
                    {f.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              {f.evidence && (
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-subtle-foreground uppercase">Evidence</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {f.evidence.map((file) => (
                      <li
                        key={file}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {f.code && (
                <pre className="overflow-x-auto rounded-lg border border-line bg-background p-3.5 font-mono text-xs leading-relaxed text-muted-foreground sm:col-span-2">
                  <code>{f.code}</code>
                </pre>
              )}
            </div>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}

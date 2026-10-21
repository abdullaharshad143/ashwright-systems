import type { UseFormRegisterReturn } from "react-hook-form"
import { cn } from "@/lib/utils"

type ChoiceGroupProps = {
  legend: string
  name: string
  options: readonly { value: string; label: string }[]
  register: UseFormRegisterReturn
  error?: string
  columns?: 2 | 3
}

/** Native radio inputs styled as large touch-friendly cards. Arrow keys work natively. */
export function ChoiceGroup({ legend, name, options, register, error, columns = 2 }: ChoiceGroupProps) {
  const errorId = `${name}-error`
  return (
    <fieldset aria-describedby={error ? errorId : undefined} aria-invalid={!!error || undefined}>
      <legend className="mb-3 text-sm font-medium">{legend}</legend>
      <div className={cn("grid gap-2", columns === 3 ? "grid-cols-3" : "grid-cols-2")}>
        {options.map((o) => (
          <label key={o.value} className="group relative cursor-pointer">
            <input type="radio" value={o.value} className="peer sr-only" {...register} />
            <span
              className={cn(
                "flex min-h-12 items-center gap-2.5 rounded-lg border bg-surface px-3.5 py-2.5 text-sm leading-tight transition-[border-color,background-color] duration-200",
                "border-line-strong group-hover:border-white/25",
                "peer-checked:border-brand/60 peer-checked:bg-brand/[0.07] peer-checked:text-foreground",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                error && "border-danger/50"
              )}
            >
              <span
                aria-hidden="true"
                className="grid size-4 shrink-0 place-items-center rounded-full border border-white/25 transition-colors group-has-checked:border-brand group-has-checked:bg-brand"
              >
                <span className="size-1.5 rounded-full bg-brand-foreground opacity-0 transition-opacity group-has-checked:opacity-100" />
              </span>
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </fieldset>
  )
}

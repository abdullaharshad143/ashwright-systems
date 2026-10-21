import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
  id?: string
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, id }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="text-balance-safe text-[2rem] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[2.75rem]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  )
}

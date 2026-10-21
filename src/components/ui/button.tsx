import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium whitespace-nowrap outline-none select-none transition-[background-color,border-color,color,transform,box-shadow] duration-200 ease-(--ease-out-expo) active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-gradient font-semibold text-brand-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_0_0_1px_rgb(241_99_117/0.35),0_8px_24px_-8px_rgb(251_134_41/0.5)] hover:brightness-110",
        secondary:
          "border-line-strong bg-surface-2 text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] hover:border-white/20 hover:bg-surface-3",
        ghost:
          "border-line bg-transparent text-foreground hover:border-line-strong hover:bg-white/[0.04]",
        link: "h-auto border-transparent px-0 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.8125rem]",
        default: "h-11 px-4",
        lg: "h-12 px-5 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** Arrow that nudges right when its parent button is hovered. */
function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-3.5 transition-transform duration-200 ease-(--ease-out-expo) group-hover/button:translate-x-0.5",
        className
      )}
    >
      <path
        d="M3 8h9.5M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { Button, ButtonArrow, buttonVariants }

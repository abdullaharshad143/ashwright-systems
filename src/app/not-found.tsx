import Link from "next/link"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-danger">✗</span> 404 · route not found
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">This page didn&apos;t ship.</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">The link may be old, or the page has moved.</p>
      <Link href="/" className={`${buttonVariants()} mt-8`}>
        Back to home
        <ButtonArrow />
      </Link>
    </section>
  )
}

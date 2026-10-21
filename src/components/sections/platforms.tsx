import { Check, Globe, Smartphone } from "lucide-react"
import { BookCall } from "@/components/cal/book-call"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"

const tracks = [
  {
    icon: Globe,
    title: "Websites & web apps",
    points: [
      "Marketing sites, landing pages, SaaS products, and dashboards",
      "Production hosting, custom domains, and CI/CD",
      "Fast loads, solid SEO, and clean social previews",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    points: [
      "Native iOS and Android apps on the same backend as your web app",
      "Push notifications, deep links, and TestFlight testing",
      "App Store and Google Play submission, handled end to end",
    ],
  },
]

function BrowserMockup() {
  return (
    <div className="surface-card overflow-hidden shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_40px_100px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <p className="mx-auto flex items-center gap-1.5 rounded-md border border-line bg-background/60 px-3 py-1 font-mono text-[11px] text-subtle-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          your-product.com
        </p>
      </div>
      <div className="aspect-[16/11] p-5 sm:p-7">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <span className="h-3 w-16 rounded bg-white/20" />
          <div className="hidden gap-3 sm:flex">
            <span className="h-2 w-10 rounded bg-white/10" />
            <span className="h-2 w-10 rounded bg-white/10" />
            <span className="h-2 w-10 rounded bg-white/10" />
          </div>
          <span className="h-5 w-14 rounded-md bg-brand/80" />
        </div>
        {/* Hero */}
        <div className="mt-8 max-w-[70%] space-y-2.5 sm:mt-10">
          <span className="block h-4 w-full rounded bg-white/25 sm:h-5" />
          <span className="block h-4 w-4/5 rounded bg-white/25 sm:h-5" />
          <span className="block h-2 w-3/5 rounded bg-white/10" />
        </div>
        {/* Cards */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:mt-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-line bg-surface-2 p-3">
              <span className="block size-4 rounded bg-white/10" />
              <span className="mt-3 block h-2 w-4/5 rounded bg-white/15" />
              <span className="mt-1.5 block h-2 w-3/5 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneMockup() {
  const tasks = [
    { title: "Review onboarding copy", meta: "Today · Design", done: true },
    { title: "Ship pricing page", meta: "Today · Web", done: true },
    { title: "Reply to beta testers", meta: "Tomorrow · Support", done: false },
    { title: "Prepare launch email", meta: "Fri · Marketing", done: false },
  ]
  return (
    <div className="relative w-[260px]">
      {/* Frame */}
      <div className="relative rounded-[3rem] border border-white/15 bg-[#0d0f14] p-[10px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04),0_50px_100px_-30px_rgb(0_0_0/0.9)]">
        <span className="absolute top-28 -left-[3px] h-10 w-[3px] rounded-l bg-white/10" />
        <span className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-white/10" />
        <span className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-white/10" />
        {/* Screen */}
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.4rem] bg-background">
          <div className="absolute top-2.5 left-1/2 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-3 rounded-[2px] border border-white/70" />
            </span>
          </div>

          <div className="px-5 pt-8">
            <p className="font-mono text-[9px] tracking-wider text-subtle-foreground uppercase">Wednesday</p>
            <p className="mt-0.5 text-[22px] font-semibold tracking-[-0.03em]">Today</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-1/2 rounded-full bg-brand" />
            </div>
            <ul className="mt-5 space-y-2">
              {tasks.map((t) => (
                <li key={t.title} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5">
                  <span
                    className={
                      t.done
                        ? "grid size-4 place-items-center rounded-full bg-brand text-brand-foreground"
                        : "size-4 rounded-full border border-white/25"
                    }
                  >
                    {t.done && <Check className="size-2.5" strokeWidth={3.5} />}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-[11.5px] font-medium ${t.done ? "text-muted-foreground line-through decoration-white/20" : ""}`}>
                      {t.title}
                    </span>
                    <span className="block font-mono text-[9px] text-subtle-foreground">{t.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Push notification */}
          <div className="absolute inset-x-3 bottom-[88px] rounded-2xl border border-white/10 bg-surface-3/90 p-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-md bg-brand text-[9px] font-bold text-brand-foreground">T</span>
              <span className="text-[10px] font-semibold">Your App</span>
              <span className="ml-auto text-[9px] text-subtle-foreground">now</span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">Reminder: beta testers are waiting on a reply.</p>
          </div>

          {/* Tab bar */}
          <div className="absolute inset-x-0 bottom-0 border-t border-line bg-surface/90 px-8 pt-3 pb-6 backdrop-blur">
            <div className="flex justify-between">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`size-5 rounded-md ${i === 0 ? "bg-brand/80" : "bg-white/10"}`} />
              ))}
            </div>
            <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Platforms() {
  return (
    <section aria-labelledby="platforms-title" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="platforms-title"
            eyebrow="Web + mobile"
            title="Website, web app, or mobile app. We ship all three."
            description="Whatever you built, we make it secure and take it live. Start on the web, add iOS and Android when you're ready, all with one team."
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {tracks.map(({ icon: Icon, title, points }) => (
              <div key={title}>
                <h3 className="flex items-center gap-2.5 text-base font-semibold tracking-[-0.015em]">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 text-brand" />
                  {title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-snug">
                      <Check aria-hidden="true" strokeWidth={2} className="mt-px size-4 shrink-0 text-brand" />
                      <span className="text-foreground/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <BookCall className={`${buttonVariants({ variant: "secondary", size: "lg" })} mt-10`}>
            Talk about your project
            <ButtonArrow />
          </BookCall>
        </div>

        {/* Browser with a phone overlapping it: web and mobile, side by side. */}
        <Reveal aria-hidden="true" className="relative pb-16 sm:pr-10 sm:pb-20">
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(50%_50%_at_60%_60%,rgb(251_134_41/0.10),transparent_70%)]" />
          <BrowserMockup />
          <div className="absolute right-0 bottom-0 origin-bottom-right scale-[0.5] sm:scale-[0.62]">
            <PhoneMockup />
          </div>
          <div className="absolute bottom-6 left-3 rounded-lg border border-line bg-surface/90 px-3 py-2 font-mono text-[10px] text-muted-foreground shadow-xl backdrop-blur sm:bottom-10 sm:left-6">
            <span className="text-brand">●</span> Web · iOS · Android
          </div>
        </Reveal>
      </div>
    </section>
  )
}

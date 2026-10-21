import { DatabaseZap, KeyRound, Smartphone } from "lucide-react"
import { RevealGroup, RevealItem } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/section-heading"

const problems = [
  {
    icon: DatabaseZap,
    title: "Your data might be public",
    body: "AI tools often skip database security rules, so anyone can read your users' data.",
    snippet: (
      <>
        <span className="text-subtle-foreground">select * from</span> profiles;
        <br />
        <span className="text-danger">→ readable by anyone</span>
      </>
    ),
  },
  {
    icon: KeyRound,
    title: "Your keys might be exposed",
    body: "API keys for OpenAI, Stripe, and others end up in code anyone can see, and someone else runs up your bill.",
    snippet: (
      <>
        <span className="text-subtle-foreground">VITE_OPENAI_KEY=</span>&quot;sk-proj-••••&quot;
        <br />
        <span className="text-danger">→ shipped to every browser</span>
      </>
    ),
  },
  {
    icon: Smartphone,
    title: "It breaks where you didn't look",
    body: "It works on your laptop. Then signup fails in Safari, or checkout freezes on Android, and users quietly leave.",
    snippet: (
      <>
        <span className="text-subtle-foreground">checkout ·</span> iPhone · Safari
        <br />
        <span className="text-warn">→ &quot;Pay&quot; button does nothing</span>
      </>
    ),
  },
]

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="problem-title"
          eyebrow="The 80% wall"
          title={
            <>
              AI gets you to demo.
              <br className="hidden sm:block" /> <span className="text-muted-foreground">Production is a different game.</span>
            </>
          }
        />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {problems.map(({ icon: Icon, title, body, snippet }) => (
            <RevealItem key={title} className="surface-card surface-card-hover flex flex-col p-6">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 text-foreground" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">{body}</p>
              <p
                aria-hidden="true"
                className="mt-6 rounded-lg border border-line bg-background/60 px-3.5 py-3 font-mono text-xs leading-relaxed text-muted-foreground"
              >
                {snippet}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

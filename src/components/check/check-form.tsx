"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, m } from "framer-motion"
import { ArrowLeft, GitBranch, LoaderCircle, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef, useState } from "react"
import { Controller, useForm, type UseFormSetValue } from "react-hook-form"
import type { z } from "zod"
import { submitLead } from "@/app/check/actions"
import { EASE_OUT } from "@/components/motion/ease"
import { Button, ButtonArrow } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAttributionPayload, LEAD_STORAGE_KEY } from "@/lib/attribution"
import {
  budgetOptions,
  goalOptions,
  leadFormSchema,
  platformOptions,
  projectTypeOptions,
  stageOptions,
} from "@/lib/schemas"
import { newEventId, trackEvent } from "@/lib/tracking"
import { normalizeUrl } from "@/lib/url"
import { cn } from "@/lib/utils"
import { ChoiceGroup } from "./choice-group"

type FormInput = z.input<typeof leadFormSchema>
type FormOutput = z.output<typeof leadFormSchema>

const steps = [
  { title: "Your project", fields: ["projectType", "appUrl", "testFocus", "platform"] },
  { title: "Goals & budget", fields: ["stage", "goal", "budget"] },
  { title: "Where to send it", fields: ["name", "email", "githubUrl", "consent"] },
] as const satisfies readonly { title: string; fields: readonly (keyof FormInput)[] }[]

/** Reads ?url= and prefills the field. Isolated in Suspense so the form itself stays prerendered. */
function PrefillFromQuery({ setValue }: { setValue: UseFormSetValue<FormInput> }) {
  const params = useSearchParams()
  useEffect(() => {
    const url = params.get("url")
    const normalized = url ? normalizeUrl(url) : null
    if (normalized) setValue("appUrl", normalized, { shouldDirty: true })
  }, [params, setValue])
  return null
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-danger">
      {message}
    </p>
  )
}

export function CheckForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [serverError, setServerError] = useState<string | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  const {
    register,
    control,
    trigger,
    handleSubmit,
    setValue,
    subscribe,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(leadFormSchema),
    mode: "onTouched",
    defaultValues: { appUrl: "", testFocus: "", name: "", email: "", githubUrl: "", consent: false },
  })

  // Re-validate a field as soon as its value changes once it shows an error, so the
  // message clears immediately instead of on blur (which would shift the layout
  // under the pointer and swallow the click on Continue).
  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: ({ name }) => {
          const field = name as keyof FormInput | undefined
          if (field && getFieldState(field).error) void trigger(field)
        },
      }),
    [subscribe, getFieldState, trigger]
  )

  useEffect(() => {
    trackEvent("ViewContent", { content_name: "Production Readiness Check" })
  }, [])

  // Move focus to the new step's heading so screen readers announce it.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  const next = async () => {
    const valid = await trigger([...steps[step].fields], { shouldFocus: true })
    if (!valid) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const back = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null)
    const eventId = newEventId()
    const honeypot = (document.getElementById("website") as HTMLInputElement | null)?.value ?? ""

    const result = await submitLead({
      values,
      attribution: { ...getAttributionPayload(), eventId },
      website: honeypot,
    })

    if (!result.ok) {
      setServerError(result.error)
      return
    }

    trackEvent("Lead", { content_name: "Production Readiness Check" }, eventId)
    try {
      sessionStorage.setItem(
        LEAD_STORAGE_KEY,
        JSON.stringify({ name: values.name, email: values.email, leadId: result.leadId })
      )
    } catch {
      // The submitted page falls back to generic copy without storage.
    }
    router.push("/check/submitted")
  })

  const isLast = step === steps.length - 1

  return (
    <form
      noValidate
      onSubmit={(e) => {
        // Enter on steps 1–2 advances instead of submitting.
        if (!isLast) {
          e.preventDefault()
          void next()
          return
        }
        void onSubmit(e)
      }}
      className="surface-card p-5 sm:p-8"
    >
      <Suspense fallback={null}>
        <PrefillFromQuery setValue={setValue} />
      </Suspense>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step].title}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Form progress"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={step + 1}
          className="mt-3 grid grid-cols-3 gap-1.5"
        >
          {steps.map((s, i) => (
            <div key={s.title} className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
              <m.div
                className="bg-brand-gradient h-full origin-left rounded-full"
                initial={false}
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <m.div
            key={step}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 24 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -24 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="space-y-7"
          >
            <h2 ref={headingRef} tabIndex={-1} className="text-xl font-semibold tracking-[-0.025em] outline-none">
              {step === 0 && "Tell us about your project"}
              {step === 1 && "What are you aiming for?"}
              {step === 2 && "Where should we send your report?"}
            </h2>

            {step === 0 && (
              <>
                <ChoiceGroup
                  legend="What are you working on?"
                  name="projectType"
                  options={projectTypeOptions}
                  register={register("projectType")}
                  error={errors.projectType?.message}
                />
                <div>
                  <Label htmlFor="appUrl">Website or app URL</Label>
                  <Input
                    id="appUrl"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="https://your-app.com"
                    className="mt-2.5 font-mono"
                    aria-invalid={!!errors.appUrl}
                    aria-describedby={errors.appUrl ? "appUrl-error" : undefined}
                    {...register("appUrl")}
                  />
                  <FieldError id="appUrl-error" message={errors.appUrl?.message} />
                </div>
                <div>
                  <Label htmlFor="testFocus">What should we test first?</Label>
                  <Textarea
                    id="testFocus"
                    rows={3}
                    maxLength={500}
                    placeholder="e.g. Sign up, create a project, and invite a teammate. Checkout feels buggy on mobile."
                    className="mt-2.5"
                    aria-invalid={!!errors.testFocus}
                    aria-describedby={errors.testFocus ? "testFocus-error" : "testFocus-hint"}
                    {...register("testFocus")}
                  />
                  <p id="testFocus-hint" className="mt-2 text-xs text-muted-foreground">
                    The main thing your users do, plus anything you&apos;re worried about. We test that flow by hand first.
                  </p>
                  <FieldError id="testFocus-error" message={errors.testFocus?.message} />
                </div>
                <ChoiceGroup
                  legend="What did you build it with?"
                  name="platform"
                  options={platformOptions}
                  register={register("platform")}
                  error={errors.platform?.message}
                  columns={3}
                />
              </>
            )}

            {step === 1 && (
              <>
                <ChoiceGroup
                  legend="What stage are you at?"
                  name="stage"
                  options={stageOptions}
                  register={register("stage")}
                  error={errors.stage?.message}
                />
                <ChoiceGroup
                  legend="What's your main goal?"
                  name="goal"
                  options={goalOptions}
                  register={register("goal")}
                  error={errors.goal?.message}
                />
                <ChoiceGroup
                  legend="Your budget"
                  name="budget"
                  options={budgetOptions}
                  register={register("budget")}
                  error={errors.budget?.message}
                />
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      className="mt-2.5"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      {...register("name")}
                    />
                    <FieldError id="name-error" message={errors.name?.message} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="you@company.com"
                      className="mt-2.5"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                    />
                    <FieldError id="email-error" message={errors.email?.message} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="githubUrl">
                    GitHub repo <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <div className="relative mt-2.5">
                    <GitBranch
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle-foreground"
                    />
                    <Input
                      id="githubUrl"
                      inputMode="url"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="github.com/you/your-app"
                      className="pl-10 font-mono"
                      aria-invalid={!!errors.githubUrl}
                      aria-describedby={errors.githubUrl ? "githubUrl-error" : "githubUrl-hint"}
                      {...register("githubUrl")}
                    />
                  </div>
                  <p id="githubUrl-hint" className="mt-2 text-xs text-muted-foreground">
                    Not needed for the free check. If you later want a code review, we&apos;ll ask for read-only access then.
                  </p>
                  <FieldError id="githubUrl-error" message={errors.githubUrl?.message} />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="consent"
                    render={({ field }) => (
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="consent"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          onBlur={field.onBlur}
                          inputRef={field.ref}
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? "consent-error" : undefined}
                          className="mt-0.5"
                        />
                        <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                          I own this app or am authorized to have it tested. I agree to the{" "}
                          <Link
                            href="/terms"
                            target="_blank"
                            className="text-foreground underline underline-offset-4 hover:decoration-foreground"
                          >
                            Terms
                          </Link>
                          .
                        </label>
                      </div>
                    )}
                  />
                  <FieldError id="consent-error" message={errors.consent?.message} />
                </div>
              </>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-foreground">
          {serverError}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
        {step > 0 && (
          <Button type="button" variant="ghost" onClick={back} disabled={isSubmitting} aria-label="Previous step">
            <ArrowLeft aria-hidden="true" />
            <span className="max-sm:sr-only">Back</span>
          </Button>
        )}
        <Button type="submit" size="lg" className="ml-auto flex-1 sm:flex-none" disabled={isSubmitting}>
          {isLast ? (
            isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Get my free report
                <ButtonArrow />
              </>
            )
          ) : (
            <>
              Continue
              <ButtonArrow />
            </>
          )}
        </Button>
      </div>

      <p className={cn("mt-5 flex items-center gap-2 text-xs text-muted-foreground")}>
        <ShieldCheck aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0 text-brand" />
        We test like a normal user, with our own test accounts. We never store your app&apos;s data.
      </p>
    </form>
  )
}

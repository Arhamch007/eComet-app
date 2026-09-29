"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Multi-step qualifier (Stackworx has a flat three-field form):
   1) service chips, 2) budget and timeline, 3) contact details.
   Inline validation per step, progress bar, and a success state that says
   what happens next. Posts to the Formspree endpoint the old site used. */
const FORM_ENDPOINT = "https://formspree.io/f/mbjvedvw";

const budgets = ["Under $1k / mo", "$1k to $3k", "$3k to $10k", "$10k+", "Not sure"];
const timelines = ["This month", "Next 1 to 3 months", "Just exploring"];

type Tone = "light" | "dark";

function Chip({
  selected,
  onClick,
  children,
  tone,
  role = "checkbox",
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone: Tone;
  role?: "checkbox" | "radio";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        tone === "light"
          ? selected
            ? "border-accent bg-accent text-white focus-visible:outline-accent"
            : "border-border-2 bg-white text-text-1 hover:border-accent/60 hover:bg-tint focus-visible:outline-accent"
          : selected
            ? "border-signal bg-signal text-night focus-visible:outline-signal"
            : "border-white/25 text-white hover:border-signal/70 focus-visible:outline-signal"
      )}
    >
      {children}
    </button>
  );
}

/** bare: drop the card chrome when the form already sits inside a card. */
export function ContactForm({
  tone = "light",
  defaultServices = [],
  bare = false,
}: {
  tone?: Tone;
  defaultServices?: string[];
  bare?: boolean;
}) {
  const [step, setStep] = React.useState(0);
  const [picked, setPicked] = React.useState<string[]>(defaultServices);
  const [budget, setBudget] = React.useState("");
  const [timeline, setTimeline] = React.useState("");
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const headingRef = React.useRef<HTMLParagraphElement>(null);

  const dark = tone === "dark";
  const label = cn("block text-sm font-medium", dark ? "text-night-muted" : "text-text-2");
  const field = cn(
    "mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-[15px] transition-colors focus:outline-none focus-visible:outline-2",
    dark
      ? "border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-signal focus-visible:outline-signal"
      : "border-border-2 bg-white text-text-1 placeholder:text-text-3 focus:border-accent focus-visible:outline-accent/60"
  );

  const next = () => {
    if (step === 0 && picked.length === 0) return setError("Pick at least one service, or choose Not sure yet.");
    setError("");
    setStep((s) => s + 1);
    requestAnimationFrame(() => headingRef.current?.focus());
  };
  const back = () => {
    setError("");
    setStep((s) => s - 1);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    if (data.get("company_website")) return;
    data.set("services", picked.join(", "));
    data.set("budget", budget);
    data.set("timeline", timeline);
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const shell = cn(
    !bare && "rounded-2xl border p-6 md:p-8",
    bare ? (dark ? "text-white" : "") : dark ? "border-white/10 bg-night-card text-white" : "border-border-1 bg-white shadow-[var(--shadow-card)]"
  );

  if (status === "sent") {
    return (
      <div role="status" className={shell}>
        <CheckCircle2 className={cn("size-9", dark ? "text-signal" : "text-success")} aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Thanks, we have it</h3>
        <p className={cn("mt-2 text-[15px]", dark ? "text-night-muted" : "text-text-2")}>
          A member of the team will reply within one business day with a time for a short call and any questions we need answered first.
        </p>
      </div>
    );
  }

  const stepNames = ["What you need", "Budget and timing", "Your details"];

  return (
    <form onSubmit={onSubmit} className={shell} noValidate>
      <div className="flex items-center justify-between gap-4">
        <p
          ref={headingRef}
          tabIndex={-1}
          className={cn("font-mono text-xs tracking-[0.14em] uppercase outline-none", dark ? "text-night-muted" : "text-text-2")}
        >
          Step {step + 1} of 3 · {stepNames[step]}
        </p>
      </div>
      <div className={cn("mt-3 h-1 overflow-hidden rounded-full", dark ? "bg-white/10" : "bg-surface-3")} aria-hidden>
        <div
          className={cn("h-full rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", dark ? "bg-signal" : "bg-accent")}
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      {step === 0 ? (
        <fieldset className="mt-6">
          <legend className="text-lg font-semibold">Which services are you interested in?</legend>
          <div className="mt-4 flex flex-wrap gap-2" role="group">
            {services.map((s) => (
              <Chip
                key={s.slug}
                tone={tone}
                selected={picked.includes(s.name)}
                onClick={() =>
                  setPicked((p) => (p.includes(s.name) ? p.filter((x) => x !== s.name) : [...p.filter((x) => x !== "Not sure yet"), s.name]))
                }
              >
                {s.name}
              </Chip>
            ))}
            <Chip tone={tone} selected={picked.includes("Not sure yet")} onClick={() => setPicked(["Not sure yet"])}>
              Not sure yet
            </Chip>
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-lg font-semibold">
              Monthly budget <span className={cn("text-sm font-normal", dark ? "text-night-muted" : "text-text-3")}>(optional)</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup">
              {budgets.map((b) => (
                <Chip key={b} tone={tone} role="radio" selected={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-lg font-semibold">
              When do you want to start? <span className={cn("text-sm font-normal", dark ? "text-night-muted" : "text-text-3")}>(optional)</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2" role="radiogroup">
              {timelines.map((t) => (
                <Chip key={t} tone={tone} role="radio" selected={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      <div className={cn("mt-6 space-y-5", step !== 2 && "hidden")}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            Name
            <input name="name" type="text" autoComplete="name" required className={field} placeholder="Your name" />
          </label>
          <label className={label}>
            Work email
            <input name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
          </label>
        </div>
        <label className={label}>
          Tell us about it
          <textarea
            name="message"
            required
            rows={4}
            className={field}
            placeholder="The goal, the tools involved and your deadline."
          />
        </label>
        <label className="hidden" aria-hidden="true">
          Company website
          <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <p className={cn("text-xs leading-relaxed", dark ? "text-night-muted" : "text-text-3")}>
          We reply within one business day and use your details only to answer this enquiry. Happy to sign an NDA first.
        </p>
      </div>

      {error ? (
        <p role="alert" className={cn("mt-4 text-sm", dark ? "text-[#ffb4b4]" : "text-error")}>
          {error}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className={cn("mt-4 text-sm", dark ? "text-[#ffb4b4]" : "text-error")}>
          Something went wrong. Please email us directly instead.
        </p>
      ) : null}

      <div className="mt-7 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant={dark ? "outline-light" : "secondary"} onClick={back}>
            <ArrowLeft className="size-4" aria-hidden /> Back
          </Button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button type="button" variant={dark ? "inverse" : "blue"} onClick={next}>
            Continue <ArrowRight className="size-4" aria-hidden />
          </Button>
        ) : (
          <Button type="submit" variant={dark ? "inverse" : "blue"} disabled={status === "sending"}>
            {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            Send message
          </Button>
        )}
      </div>
    </form>
  );
}

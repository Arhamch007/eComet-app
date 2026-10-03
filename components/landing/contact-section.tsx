"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { LandingContainer, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Contact: one split card. Left = logo-gradient panel (deep blue/indigo base
   so white text stays above 4.5:1; aqua only as a corner glow and an orbit
   line). Right = white panel with a short form that posts to Formspree. */

const FORM_ENDPOINT = "https://formspree.io/f/mbjvedvw";
const SERVICE_OPTIONS = [...site.keywords, "Not sure yet"];

type Intent = "project" | "question" | "partnership";

const INTENTS: { id: Intent; label: string; subject: string; serviceLabel: string; placeholder: string }[] = [
  {
    id: "project",
    label: "Start a project",
    subject: "New project enquiry from the eComet website",
    serviceLabel: "What do you need help with?",
    placeholder: "The goal, the tools you use today and any deadline.",
  },
  {
    id: "question",
    label: "Quick question",
    subject: "New question from the eComet website",
    serviceLabel: "What's this about?",
    placeholder: "What would you like to know?",
  },
  {
    id: "partnership",
    label: "Partnership",
    subject: "New partnership enquiry from the eComet website",
    serviceLabel: "What kind of partnership?",
    placeholder: "Tell us about your company and how you'd like to work together.",
  },
];

type FieldName = "name" | "email" | "service" | "message";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your work email.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That email address looks incomplete.";
  if (!values.service)
    errors.service = "Pick a service, or choose Not sure yet.";
  if (values.message.trim().length < 10)
    errors.message =
      "A sentence or two about the project helps us reply properly.";
  return errors;
}

function readValues(form: HTMLFormElement): Record<FieldName, string> {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    service: String(data.get("service") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}

const labelClass = "block text-[14px] font-semibold text-[#141414]";
const fieldBase =
  "mt-1.5 block w-full rounded-xl border bg-white px-3.5 text-[15px] text-[#141414] shadow-[0_1px_2px_rgba(20,20,40,0.04)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#8a8f9c] hover:border-[#b9ccf7] focus-visible:border-[#0d5df5] focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/25";
const fieldOk = "border-[#d9dde6]";
const fieldBad =
  "border-[#c0262d] hover:border-[#c0262d] focus-visible:border-[#c0262d] focus-visible:ring-[#c0262d]/20";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 text-[13px] leading-snug font-medium text-[#b42318]"
    >
      {message}
    </p>
  );
}

function ContactForm() {
  const [intent, setIntent] = React.useState<Intent>("project");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Errors>({});
  const [touched, setTouched] = React.useState(false);
  const active = INTENTS.find((i) => i.id === intent) ?? INTENTS[0];
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  // After the first submit attempt, re-check fields as the visitor fixes them.
  const recheck = () => {
    if (!touched || !formRef.current) return;
    setErrors(validate(readValues(formRef.current)));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(readValues(form));
    setTouched(true);
    setErrors(found);
    const firstBad = (
      ["name", "email", "service", "message"] as FieldName[]
    ).find((k) => found[k]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }

    const data = new FormData(form);
    if (data.get("_gotcha")) {
      setStatus("sent"); // bots get a quiet success
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setTouched(false);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex h-full flex-col justify-center">
        <CheckCircle2
          aria-hidden
          className="size-10 text-[#0d5df5]"
          strokeWidth={1.8}
        />
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-5 text-[24px] leading-tight font-bold tracking-[-0.02em] text-[#141414] outline-none"
        >
          Thanks, your message is in
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-[#555555]">
          What happens next:
        </p>
        <ul className="mt-2 space-y-2 text-[15px] leading-[1.55] text-[#555555]">
          <li>
            We read it and reply from {site.email} within one business day.
          </li>
          <li>
            If it looks like a fit, we suggest a short call at a time that suits
            your time zone.
          </li>
          <li>
            Need an NDA first? Say so in your reply and we will send one before
            you share details.
          </li>
        </ul>
        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus("idle");
          }}
          className="mt-7 self-start rounded-md text-[14px] font-semibold text-[#0d5df5] underline decoration-[#0d5df5]/30 underline-offset-4 transition-colors duration-200 hover:text-[#681bf5] hover:decoration-[#681bf5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d5df5]"
        >
          Send another message
        </button>
      </div>
    );
  }

  const describe = (name: FieldName, hint?: string) =>
    [hint, errors[name] ? `contact-${name}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <>
      <div role="radiogroup" aria-label="What are you getting in touch about?" className="flex flex-wrap gap-2">
        {INTENTS.map((i) => (
          <button
            key={i.id}
            type="button"
            role="radio"
            aria-checked={intent === i.id}
            onClick={() => setIntent(i.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors duration-200",
              intent === i.id
                ? "border-transparent bg-[#eef1f6] text-[#141414]"
                : "border-[#d9dde6] text-[#6b7080] hover:border-[#b9ccf7] hover:text-[#141414]"
            )}
          >
            {i.label}
          </button>
        ))}
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-describedby="contact-form-note"
        className="mt-5 space-y-5"
      >
      <input
        type="hidden"
        name="_subject"
        value={active.subject}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            onChange={recheck}
            className={cn(fieldBase, "h-12", errors.name ? fieldBad : fieldOk)}
          />
          <FieldError id="contact-name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Work email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            onChange={recheck}
            className={cn(fieldBase, "h-12", errors.email ? fieldBad : fieldOk)}
          />
          <FieldError id="contact-email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className={labelClass}>
          {active.serviceLabel}
        </label>
        <div className="relative">
          <select
            id="contact-service"
            name="service"
            required
            autoComplete="off"
            defaultValue=""
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describe("service")}
            onChange={recheck}
            className={cn(
              fieldBase,
              "h-12 cursor-pointer appearance-none pr-10",
              errors.service ? fieldBad : fieldOk,
            )}
          >
            <option value="" disabled>
              Choose one
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-3.5 mt-[3px] size-4 -translate-y-1/2 text-[#6b7080]"
          />
        </div>
        <FieldError id="contact-service-error" message={errors.service} />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder={active.placeholder}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
          onChange={recheck}
          className={cn(
            fieldBase,
            "min-h-[120px] resize-y py-3 leading-[1.5]",
            errors.message ? fieldBad : fieldOk,
          )}
        />
        <FieldError id="contact-message-error" message={errors.message} />
      </div>

      {/* Honeypot: Formspree drops submissions where _gotcha is filled. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="rounded-xl border border-[#f1c4c4] bg-[#fff6f6] px-4 py-3 text-[14px] leading-[1.55] text-[#8a1c1c]"
        >
          Your message did not send. Please try again, or email us at{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1c1c]"
          >
            {site.email}
          </a>
          .
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p
          id="contact-form-note"
          className="text-[13px] leading-[1.5] text-[#6b7080] sm:max-w-[260px]"
        >
          We use your details only to answer this enquiry.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="hero-cta hero-cta--primary relative isolate inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40 disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
            </>
          )}
        </button>
      </div>
      </form>
    </>
  );
}

const facts: { term: string; detail: React.ReactNode }[] = [
  {
    term: "Email",
    detail: (
      <a
        href={`mailto:${site.email}`}
        className="font-semibold break-all text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {site.email}
      </a>
    ),
  },
  {
    term: "Office",
    detail: `${site.address.street}, ${site.address.city}, ${site.address.country}`,
  },
  { term: "Reply", detail: "Within 1 business day" },
  { term: "Privacy", detail: "NDA on request" },
];

export function ContactSection() {
  return (
    <LandingSection id="contact" tone="white" labelledBy="contact-heading">
      <LandingContainer>
        <div className="overflow-hidden rounded-[28px] border border-[#e7e9ef] bg-white shadow-[0_1px_2px_rgba(20,20,40,0.04),0_24px_60px_-28px_rgba(13,40,120,0.28)] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:rounded-[32px]">
          {/* Gradient panel */}
          <div className="relative isolate overflow-hidden bg-[linear-gradient(150deg,#1590ec_0%,#0d5df5_42%,#4a2af2_74%,#681bf5_100%)] px-6 py-9 text-white sm:px-9 sm:py-11 lg:px-11 lg:py-12">
            {/* Aqua glow, mostly outside the card. */}
            <div
              aria-hidden
              className="absolute -right-24 -bottom-28 -z-10 size-[300px] rounded-full bg-[#01e2f8] opacity-40 blur-[80px]"
            />
            {/* Deepening veil keeps white text readable over the lighter ocean stop and the aqua glow. */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,16,64,0.3)_0%,rgba(8,16,64,0.16)_55%,rgba(20,8,70,0.24)_100%)]"
            />
            {/* Orbit lines: the comet's path. */}
            <svg
              aria-hidden
              viewBox="0 0 400 400"
              fill="none"
              className="pointer-events-none absolute -right-28 -bottom-32 -z-10 size-[380px] text-white opacity-[0.16] lg:size-[440px]"
            >
              <ellipse
                cx="200"
                cy="200"
                rx="190"
                ry="120"
                transform="rotate(-24 200 200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <ellipse
                cx="200"
                cy="200"
                rx="140"
                ry="84"
                transform="rotate(-24 200 200)"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>

            <h2
              id="contact-heading"
              className="text-[32px] leading-[1.08] font-bold tracking-[-0.03em] text-balance md:text-[40px]"
            >
              Need help with your digital work?
            </h2>
            <p className="mt-3 max-w-[380px] text-[16px] leading-[1.6] text-pretty text-white/90 md:text-[17px]">
              Tell us what you're working on and we'll help you find the right
              solution.
            </p>

            <dl className="mt-8 max-w-[400px] divide-y divide-white/20 border-y border-white/20 text-[15px] lg:mt-10">
              {facts.map((f) => (
                <div
                  key={f.term}
                  className="grid grid-cols-[76px_minmax(0,1fr)] items-baseline gap-3 py-3"
                >
                  <dt className="text-[12px] font-semibold tracking-[0.1em] text-white/85 uppercase">
                    {f.term}
                  </dt>
                  <dd className="leading-[1.5] text-white">{f.detail}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[13px] leading-[1.5] text-white/85">
              Working with clients in the USA, Canada and Europe.
            </p>
          </div>

          {/* Form panel */}
          <div className="relative px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <p className="text-[18px] font-semibold tracking-[-0.01em] text-[#141414]">
              Send us a short brief
            </p>
            <p className="mt-1 text-[14px] leading-[1.55] text-[#6b7080]">
              All fields are required.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

"use client";

import * as React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";

/* Posts to the Formspree endpoint the previous site already used. Replace
   FORM_ENDPOINT if the team moves to another form service or a calendar. */
const FORM_ENDPOINT = "https://formspree.io/f/mbjvedvw";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border-2 bg-bg-0/60 px-3.5 py-2.5 text-[15px] text-text-1 placeholder:text-text-3 transition-colors focus:border-accent/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent/50";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company_website")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card border border-border-1 bg-surface-1 p-6">
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-text-1">Message received</h3>
        <p className="mt-2 text-[15px] text-text-2">
          Thanks. A member of the team will reply within one business day with a short set of
          questions or a time for a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-border-1 bg-surface-1 p-6" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-text-2">
          Name
          <input name="name" type="text" autoComplete="name" required className={fieldClass} placeholder="Your name" />
        </label>
        <label className="block text-sm font-medium text-text-2">
          Work email
          <input name="email" type="email" autoComplete="email" required className={fieldClass} placeholder="you@company.com" />
        </label>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-text-2">
          What do you need?
          <select name="service" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-text-2">
          Monthly budget <span className="font-normal text-text-3">(optional)</span>
          <select name="budget" defaultValue="" className={fieldClass}>
            <option value="">Prefer not to say</option>
            <option>Under $1,000</option>
            <option>$1,000 to $3,000</option>
            <option>$3,000 to $10,000</option>
            <option>Over $10,000</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-text-2">
        Tell us about it
        <textarea name="message" required rows={5} className={fieldClass} placeholder="What is the goal, what tools are involved, and when do you need it?" />
      </label>
      <label className="hidden" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="mt-4 text-xs leading-relaxed text-text-3">
        We reply within one business day. Your details are used only to respond to this enquiry.
        Happy to sign an NDA before the first call.
      </p>
      {status === "error" ? (
        <p role="alert" className="mt-3 text-sm text-error">
          Something went wrong. Please email us directly instead.
        </p>
      ) : null}
      <Button type="submit" size="lg" className="mt-5 w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
        Send message
      </Button>
    </form>
  );
}

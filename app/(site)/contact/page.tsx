import type { Metadata } from "next";
import { Suspense } from "react";
import { Check, Clock3, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { ContactForm } from "@/components/site/contact-form";
import { ContactFormFromQuery } from "@/components/site/contact-form-query";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { Reveal } from "@/components/ui/reveal";
import { TimezoneBand } from "@/components/about/timezone-band";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Contact: book a free consultation",
  description:
    "Book a free consultation with eComet or send a brief. We reply within one business day and are happy to sign an NDA first.",
  alternates: { canonical: "/contact" },
};

/* Stackworx puts a plain centred form below a tall hero. Ours puts the
   qualifier in the first screen, next to what happens after you send it. */
const promises = [
  "A reply from a person within one business day",
  "A 20-minute call, no sales script",
  "A written plan and fixed quote within a few days",
  "Happy to sign your NDA before we talk",
];

const steps = [
  { n: "01", title: "You send the brief", text: "Three quick steps, about a minute." },
  { n: "02", title: "We book a short call", text: "Goal, tools, deadline; we say honestly if we can help." },
  { n: "03", title: "You get a plan and a price", text: "Scope, timeline and cost in writing." },
];

export default function ContactPage() {
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}` : null;
  return (
    <>
      <section className="relative overflow-hidden border-b border-border-1 bg-bg-1">
        <div aria-hidden className="grid-light pointer-events-none absolute inset-0 opacity-80" />
        <div aria-hidden className="wash-top pointer-events-none absolute inset-0" />
        <PixelBlocks className="absolute top-0 right-0 hidden md:grid" cell={36} primary="bg-white" secondary="bg-tint-2" pattern={[[0, 1, 1], [0, 0, 2]]} />
        <Container className="relative grid gap-10 pt-14 pb-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8 lg:pt-20 lg:pb-24">
          <div className="lg:col-span-5 lg:row-start-1">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display mt-5 text-[38px] leading-[1.04] font-semibold text-text-1 md:text-[56px]">Tell us what is slowing you down</h1>
            <p className="mt-5 text-lg leading-relaxed text-text-2">
              Book a free consultation or send a brief. Either way, you leave with a clear next step.
            </p>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <div className="rounded-3xl border border-border-1 bg-white p-6 shadow-[0_30px_70px_-30px_rgba(10,22,51,0.35)] md:p-9">
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="font-display text-2xl font-semibold text-text-1">Send a brief</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 text-xs font-semibold text-blue-700">
                  <ShieldCheck className="size-3.5" aria-hidden /> NDA on request
                </span>
              </div>
              <Suspense fallback={<ContactForm bare />}>
                <ContactFormFromQuery />
              </Suspense>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:row-start-2">
            <ul className="space-y-3">
              {promises.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] font-medium text-text-1">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-accent text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-3 rounded-xl border border-border-1 bg-white p-4 transition-colors hover:border-accent/50"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-tint text-blue-700">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-text-2">Email</span>
                  <span className="block truncate text-[15px] font-semibold text-text-1 group-hover:text-blue-700">{site.email}</span>
                </span>
              </a>
              {wa ? (
                <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-border-1 bg-white p-4 transition-colors hover:border-accent/50">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-tint text-blue-700">
                    <MessageCircle className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-text-2">WhatsApp</span>
                    <span className="block text-[15px] font-semibold text-text-1 group-hover:text-blue-700">Message us</span>
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-border-1 bg-white p-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-tint text-blue-700">
                    <Clock3 className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs text-text-2">Response time</span>
                    <span className="block text-[15px] font-semibold text-text-1">Within 1 business day</span>
                  </span>
                </div>
              )}
            </div>
          </div>


        </Container>
      </section>

      {/* What happens next */}
      <Section aria-labelledby="next-heading" className="py-14 md:py-20">
        <Container>
          <h2 id="next-heading" className="font-display text-[28px] font-semibold text-text-1 md:text-[36px]">
            What happens after you send it
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-border-1 bg-bg-1 p-6">
                <span className="font-display text-[44px] leading-none font-bold text-tint-2" aria-hidden>
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text-1">{s.title}</h3>
                <p className="mt-1 text-[15px] text-text-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2 text-[15px] text-text-2">
            <MapPin className="size-4 text-accent" aria-hidden />
            {site.address.street}, {site.address.city}, {site.address.country} · serving {site.markets.join(", ")}
          </p>
        </Container>
      </Section>

      <TimezoneBand />
      <Testimonials />
      <Faq tone="alt" title="Before you send" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact eComet",
          url: `${site.url}/contact`,
          mainEntity: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}

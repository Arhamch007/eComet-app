import type { Metadata } from "next";
import { Mail, MapPin, Clock3, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { PageBand } from "@/components/site/page-band";
import { ContactForm } from "@/components/site/contact-form";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Contact: book a free consultation",
  description:
    "Book a free consultation with eComet or send a message. We reply within one business day and are happy to sign an NDA first.",
  alternates: { canonical: "/contact" },
};

const steps = [
  { n: "1", title: "You write or book", text: "Send the form or pick a time. We reply within one business day." },
  { n: "2", title: "A 20-minute call", text: "We ask about the goal, the tools and the deadline, and say honestly if we can help." },
  { n: "3", title: "A written plan and quote", text: "Scope, price and timeline in writing, usually within a few days of the call." },
];

export default function ContactPage() {
  const wa = site.whatsapp ? `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}` : null;
  return (
    <>
      <PageBand
        eyebrow="Contact"
        title="Book a free consultation"
        lead="Tell us what is slowing your team down. You will hear back within one business day."
        crumbs={[{ label: "Contact", href: "/contact" }]}
      />
      <Section>
        <Container className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <Eyebrow>What happens next</Eyebrow>
            <ol className="mt-5 space-y-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-text-1 font-mono text-sm font-medium text-bg-0">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-text-1">{s.title}</h3>
                    <p className="mt-1 text-[15px] text-text-2">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Eyebrow className="mt-10">Reach us directly</Eyebrow>
            <ul className="mt-5 space-y-4 text-[15px] text-text-2">
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-text-1">{site.email}</a>
              </li>
              {wa ? (
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <a href={wa} target="_blank" rel="noreferrer" className="hover:text-text-1">WhatsApp</a>
                </li>
              ) : null}
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock3 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <span>
                  {site.markets.join(", ")}. {site.hours}.
                </span>
              </li>
            </ul>
          </Reveal>
        </Container>
      </Section>
      <Faq tone="alt" title="Before you send" />
    </>
  );
}

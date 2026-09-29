import type { Metadata } from "next";
import { Clock3, Globe2, Users, ShieldCheck, ClipboardList, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { PageBand } from "@/components/site/page-band";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { TimezoneBand } from "@/components/about/timezone-band";
import { WhyChoose } from "@/components/home/why-choose";
import { TeamSnapshot } from "@/components/home/team-snapshot";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";
import { ContactBand } from "@/components/home/contact-band";

export const metadata: Metadata = {
  title: "About eComet",
  description:
    "eComet is a 20-plus person team of AI automation experts, web developers, Shopify support agents and virtual assistants serving clients in the USA, Canada and Europe.",
  alternates: { canonical: "/about" },
};

/* DRAFT principles: confirm wording with the team before launch. */
const principles = [
  { icon: Users, title: "A named point of contact", text: "One person owns your account and answers for the whole team." },
  { icon: Clock3, title: "Hours that overlap yours", text: "Coverage windows agreed per client across North American and European business days." },
  { icon: ClipboardList, title: "Written scope, fixed price", text: "You see the plan and the number before work starts, and changes are agreed in writing." },
  { icon: ShieldCheck, title: "Your accounts, your data", text: "Everything is built in accounts you own; NDAs are welcome before the first call." },
  { icon: Globe2, title: "Weekly reporting", text: "Support, marketing and assistant engagements report every week on what was done and what is next." },
  { icon: Wrench, title: "We run what we build", text: "The people who build your automation or store stay on to operate and improve it." },
];

const numbers = [
  { value: 20, suffix: "+", label: "specialists in-house" },
  { value: services.length, suffix: "", label: "service lines" },
  { value: 3, suffix: "", label: "client markets" },
  { value: 1, suffix: "", label: "business day to reply" },
];

export default function AboutPage() {
  return (
    <>
      <PageBand
        eyebrow="About eComet"
        title="The team that keeps online businesses running"
        lead={`${site.legalName} brings AI automation experts, web developers, Shopify support agents and virtual assistants under one roof, working with clients in ${site.markets.join(", ")}.`}
        crumbs={[{ label: "About", href: "/about" }]}
      />

      {/* Why we exist: Stackworx two-column opener, with numbers */}
      <Section aria-labelledby="exist-heading">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Why we exist" titleId="exist-heading" title="Most growing brands juggle five vendors. We think one is enough." />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-text-2 lg:col-span-7">
            <p>
              Online businesses need a store that works, automations that do not break, marketing that pays for itself and people to answer
              customers. Usually that means a developer, an agency, a freelancer and a VA who never talk to each other.
            </p>
            <p>
              eComet puts those skills in one team. The developers who build your store or workflow sit next to the agents and assistants who run
              it every day, so problems get fixed by the people who understand them.
            </p>
            <dl className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {numbers.map((n) => (
                <div key={n.label} className="flex flex-col-reverse rounded-2xl border border-border-1 bg-bg-1 p-5">
                  <dt className="mt-2 text-sm text-text-2">{n.label}</dt>
                  <dd className="font-display text-[34px] leading-none font-bold text-blue-700">
                    <CountUp value={n.value} suffix={n.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Principles grid with numeral tiles */}
      <Section tone="alt" aria-labelledby="principles-heading">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="How we work"
            titleId="principles-heading"
            title="Six things you can hold us to"
            lead="Plain commitments instead of adjectives. If we miss one, tell your point of contact and it gets fixed that week."
            className="max-w-3xl"
          />
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border-1 bg-border-1 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <RevealItem key={p.title} className="h-full">
                <article className="group relative h-full bg-white p-7 transition-colors hover:bg-tint/30">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl bg-night text-signal">
                      <p.icon className="size-6" aria-hidden />
                    </span>
                    <span aria-hidden className="font-display text-[44px] leading-none font-bold text-tint-2 transition-colors group-hover:text-accent/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-text-1">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-2">{p.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <TimezoneBand />
      <WhyChoose />
      <TeamSnapshot />
      <Testimonials />
      <FinalCta />
      <ContactBand />
    </>
  );
}

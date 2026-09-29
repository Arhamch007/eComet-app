import type { Metadata } from "next";
import { Clock3, Globe2, Users, ShieldCheck, ClipboardList } from "lucide-react";
import { site } from "@/content/site";
import { PageBand } from "@/components/site/page-band";
import { Container, Section, SectionHeading, Card } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Process } from "@/components/home/process";
import { TeamSnapshot } from "@/components/home/team-snapshot";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About eComet",
  description:
    "eComet is a 20-plus person team of AI automation experts, web developers, Shopify support agents and virtual assistants serving clients in the USA, Canada and Europe.",
  alternates: { canonical: "/about" },
};

/* DRAFT commitments: confirm wording with the team before launch. */
const commitments = [
  { icon: Users, title: "A named point of contact", text: "One person owns your account and answers for the whole team." },
  { icon: Clock3, title: "Hours that overlap yours", text: "Coverage windows agreed per client across North American and European business days." },
  { icon: ClipboardList, title: "Written scope, fixed price", text: "You see the plan and the number before work starts, and changes are agreed in writing." },
  { icon: ShieldCheck, title: "Your accounts, your data", text: "Everything is built in accounts you own; NDAs are welcome before the first call." },
  { icon: Globe2, title: "Weekly reporting", text: "Support, marketing and assistant engagements report every week on what was done and what is next." },
];

export default function AboutPage() {
  return (
    <>
      <PageBand
        eyebrow="About"
        title="A 20-plus person team for the work that keeps an online business running"
        lead={`${site.legalName} brings AI automation experts, web developers, Shopify support agents and virtual assistants together under one roof, working with clients in ${site.markets.join(", ")}.`}
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <Section>
        <Container className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <SectionHeading
              eyebrow="Why eComet"
              title="Five things you can hold us to"
              lead="Plain commitments instead of adjectives. If we miss one, tell your point of contact and it gets fixed that week."
            />
          </Reveal>
          <RevealGroup className="grid gap-3 md:col-span-7">
            {commitments.map((c) => (
              <RevealItem key={c.title}>
                <Card className="flex gap-4 p-5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-1 bg-bg-0/60 text-accent">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-text-1">{c.title}</h3>
                    <p className="mt-1 text-[15px] text-text-2">{c.text}</p>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Process tone="alt" />
      <TeamSnapshot />
      <FinalCta />
    </>
  );
}

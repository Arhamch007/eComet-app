import type { Metadata } from "next";
import { team, teamGroups } from "@/content/team";
import { site } from "@/content/site";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Section } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { TeamGrid } from "@/components/team/team-grid";
import { WhyChoose } from "@/components/home/why-choose";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind eComet: leadership, engineering, growth and operations, all in-house.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageBand
        align="center"
        eyebrow="Team"
        title="The people you will actually work with"
        lead="Leadership, engineering, growth and operations, all in-house. More than twenty specialists in total; the people below lead each discipline."
        crumbs={[{ label: "Team", href: "/team" }]}
      />
      <Section>
        <Container>
          <TeamGrid team={team} groups={teamGroups} />
        </Container>
      </Section>

      {/* Dedicated assistant offer */}
      <Section tone="night" aria-labelledby="va-heading" className="py-14 md:py-20">
        <div aria-hidden className="grid-dark absolute inset-0 opacity-50" />
        <Container className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[12px] tracking-[0.14em] text-night-muted uppercase">Extend your team</p>
            <h2 id="va-heading" className="font-display mt-3 text-[30px] leading-[1.1] font-semibold text-white md:text-[42px]">
              Need hands, not another hire?
            </h2>
            <p className="mt-4 text-lg text-night-muted">
              Get a dedicated assistant or support agent, trained on your playbook and backed by a team lead.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/services/virtual-assistants" variant="inverse" size="lg">
              Virtual assistants
            </Button>
            <Button href={site.cta.href} variant="blue" size="lg" tile>
              {site.cta.label}
            </Button>
          </div>
        </Container>
      </Section>

      <WhyChoose />
      <FinalCta />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": team.map((m) => ({
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
            worksFor: { "@id": `${site.url}/#organization` },
            image: `${site.url}${m.image}`,
          })),
        }}
      />
    </>
  );
}

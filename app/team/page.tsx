import type { Metadata } from "next";
import Image from "next/image";
import { team, teamGroups } from "@/content/team";
import { site } from "@/content/site";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind eComet: leadership, engineering, growth and operations.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageBand
        eyebrow="Team"
        title="The people you will work with"
        lead="Leadership, engineering, growth and operations, all in-house. More than twenty specialists in total; the people below lead each discipline."
        crumbs={[{ label: "Team", href: "/team" }]}
      />
      {teamGroups.map((group, gi) => {
        const members = team.filter((m) => m.group === group);
        if (!members.length) return null;
        return (
          <Section key={group} tone={gi % 2 ? "alt" : "base"} className="py-12 md:py-16">
            <Container>
              <Eyebrow>{group}</Eyebrow>
              <RevealGroup className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {members.map((m) => (
                  <RevealItem key={m.name}>
                    <div className="group">
                      <div className="relative aspect-square overflow-hidden rounded-card border border-border-1 bg-surface-1">
                        <Image
                          src={m.image}
                          alt={`${m.name}, ${m.role}`}
                          fill
                          sizes="(min-width: 768px) 25vw, 45vw"
                          className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                        />
                      </div>
                      <p className="mt-3 font-medium text-text-1">{m.name}</p>
                      <p className="text-sm text-text-3">{m.role}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Container>
          </Section>
        );
      })}
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

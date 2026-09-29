import Image from "next/image";
import { team } from "@/content/team";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export function TeamSnapshot() {
  const people = team.slice(0, 6);
  return (
    <Section tone="alt" aria-labelledby="team-heading">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title={<span id="team-heading">Real people, named and reachable</span>}
              lead="More than twenty specialists across engineering, growth, support and operations, led by the founders you will actually talk to."
            />
          </Reveal>
          <Button href="/team" variant="secondary" className="shrink-0">
            Meet the team
          </Button>
        </div>
        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {people.map((m) => (
            <RevealItem key={m.name}>
              <div className="group">
                <div className="relative aspect-square overflow-hidden rounded-card border border-border-1 bg-surface-1">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 768px) 16vw, 45vw"
                    className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-text-1">{m.name}</p>
                <p className="text-xs text-text-3">{m.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

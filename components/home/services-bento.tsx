import { services } from "@/content/services";
import { BentoCard, BentoGrid } from "@/components/ui/bento";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function ServicesBento() {
  return (
    <Section id="services" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={<span id="services-heading">Eight service lines, one accountable team</span>}
            lead="Automation, development and support that fit together, so you are not managing five vendors."
          />
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <BentoGrid>
            {services.map((s) => (
              <BentoCard
                key={s.slug}
                name={s.name}
                description={s.short}
                href={`/services/${s.slug}`}
                cta="Learn more"
                Icon={s.icon}
                featured={s.featured}
                className={s.featured ? "md:col-span-2" : undefined}
              />
            ))}
          </BentoGrid>
        </Reveal>
      </Container>
    </Section>
  );
}

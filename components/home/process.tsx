import { process } from "@/content/process";
import { Container, Section, SectionHeading, IconTile } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/* Mau5tech-style numbered process: gradient icon tiles on a hairline. */
export function Process({ tone = "base" }: { tone?: "base" | "alt" }) {
  return (
    <Section tone={tone} id="process" aria-labelledby="process-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How we work"
            title={<span id="process-heading">Four steps, no surprises</span>}
            lead="Every engagement follows the same path, so you always know what happens next and what it costs."
          />
        </Reveal>
        <div className="relative mt-14">
          <div aria-hidden className="gradient-line absolute top-8 right-[12%] left-[4%] hidden md:block" />
          <RevealGroup className="grid gap-10 md:grid-cols-4 md:gap-8">
            {process.map((step) => (
              <RevealItem key={step.n}>
                <div className="relative">
                  <div className="relative inline-flex">
                    <IconTile icon={step.icon} variant="gradient" className="size-16 rounded-[20px] [&_svg]:size-7" />
                    <span className="absolute -top-2 -right-3 rounded-full border border-border-1 bg-white px-2 py-0.5 text-[11px] font-semibold text-text-1 shadow-[var(--shadow-card)]">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-text-1">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-2">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

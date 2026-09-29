import { process } from "@/content/process";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

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
        <div className="relative mt-12">
          <div aria-hidden className="gradient-line absolute top-[27px] right-0 left-0 hidden md:block" />
          <RevealGroup className="grid gap-8 md:grid-cols-4 md:gap-6">
            {process.map((step) => (
              <RevealItem key={step.n}>
                <div className="relative">
                  <div className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-border-2 bg-bg-0 text-text-1">
                    <step.icon className="size-6" aria-hidden />
                    <span className="absolute -top-2 -right-2 rounded-full bg-text-1 px-1.5 py-0.5 font-mono text-[10px] font-medium text-bg-0">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text-1">{step.title}</h3>
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

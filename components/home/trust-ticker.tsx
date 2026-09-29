import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Ticker } from "@/components/ui/ticker";

/* Until client logos are cleared for use (audit Open Question 3), the ticker
   carries the platforms the team works in every day. */

export function TrustTicker() {
  return (
    <section className="border-y border-border-1 bg-bg-1 py-8" aria-labelledby="tools-heading">
      <Container>
        <Eyebrow id="tools-heading" className="justify-center">
          Tools we work in every day
        </Eyebrow>
      </Container>
      <Ticker className="mt-5" baseVelocity={4} label="Platforms and tools">
        {site.tools.map((tool) => (
          <span key={tool} className="inline-flex items-center">
            <span className="px-6 font-display text-2xl font-semibold tracking-tight text-text-2 md:text-3xl">
              {tool}
            </span>
            <span aria-hidden className="size-1.5 rounded-full bg-accent/70" />
          </span>
        ))}
      </Ticker>
    </section>
  );
}

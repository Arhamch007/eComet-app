import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const items = testimonials.slice(0, 3);
  return (
    <Section aria-labelledby="testimonials-heading">
      <Container>
        <SectionHeading
          eyebrow="Client feedback"
          title={<span id="testimonials-heading">What clients say</span>}
        />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-[1fr_1.35fr_1fr] md:items-stretch">
          {items.map((t, i) => {
            const featured = i === 1;
            return (
              <RevealItem key={t.name} className="h-full">
                <figure
                  className={cn(
                    "flex h-full flex-col rounded-card border border-border-1 bg-surface-1 p-6 md:p-7",
                    featured && "gradient-border border-transparent bg-surface-2"
                  )}
                >
                  <Quote className="size-6 text-accent/80" aria-hidden />
                  <blockquote className={cn("mt-4 text-[15px] leading-relaxed text-text-2", featured && "text-base text-text-1/90 md:text-lg")}>
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-border-1 bg-bg-0 font-mono text-sm text-text-2">
                      {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-text-1">{t.name}</span>
                      <span className="block text-xs text-text-3">{t.role}</span>
                    </span>
                    {t.source ? (
                      <span className="ml-auto rounded-full border border-border-1 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-3">
                        {t.source}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}

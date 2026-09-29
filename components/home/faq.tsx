import { homeFaqs } from "@/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/site/json-ld";

export function Faq({
  items = homeFaqs,
  title = "Questions clients ask before they start",
  tone = "base",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  tone?: "base" | "alt";
}) {
  return (
    <Section tone={tone} aria-labelledby="faq-heading">
      <Container className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <SectionHeading
            eyebrow="FAQ"
            title={<span id="faq-heading">{title}</span>}
            lead="If yours is not here, ask on the call. We would rather answer than guess."
          />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7">
          <Accordion type="single" collapsible className="border-t border-border-1">
            {items.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </Section>
  );
}

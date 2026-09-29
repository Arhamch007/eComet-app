import type { Metadata } from "next";
import { projects } from "@/content/work";
import { PageBand } from "@/components/site/page-band";
import { Container, Section } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { WorkCard } from "@/components/home/selected-work";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Work: stores, workflows and platforms we look after",
  description:
    "Case studies from eComet's Shopify support, e-commerce operations, web development and automation engagements.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageBand
        eyebrow="Work"
        title="Engagements described exactly as they ran"
        lead="No inflated numbers. Each entry says what the client needed, what we did and which tools were involved. References are available on request."
        crumbs={[{ label: "Work", href: "/work" }]}
      />
      <Section>
        <Container>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((p, i) => (
              <RevealItem key={p.slug} className="h-full">
                <WorkCard project={p} priority={i < 3} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

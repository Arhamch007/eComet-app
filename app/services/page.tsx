import type { Metadata } from "next";
import { services } from "@/content/services";
import { PageBand } from "@/components/site/page-band";
import { BentoCard, BentoGrid } from "@/components/ui/bento";
import { Container, Section } from "@/components/ui/primitives";
import { Process } from "@/components/home/process";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Services: AI automation, web development, Shopify support and more",
  description:
    "Eight service lines under one team: AI automation, web development, Shopify pre- and post-sales support, email marketing, Meta ads, GoHighLevel, Zapier, Make and n8n automation, and virtual assistants.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBand
        eyebrow="Services"
        title="Everything a growing online business needs, from one accountable team"
        lead="Pick one service or combine several. Every engagement gets a named point of contact, a written scope and a fixed price before work starts."
        crumbs={[{ label: "Services", href: "/services" }]}
      />
      <Section>
        <Container>
          <BentoGrid>
            {services.map((s) => (
              <BentoCard
                key={s.slug}
                name={s.name}
                description={s.short}
                href={`/services/${s.slug}`}
                cta="See what is included"
                Icon={s.icon}
                featured={s.featured}
                className={s.featured ? "md:col-span-2" : undefined}
                background={s.featured ? <div className="dot-texture absolute inset-0 opacity-80" /> : undefined}
              />
            ))}
          </BentoGrid>
        </Container>
      </Section>
      <Process tone="alt" />
      <Faq />
      <FinalCta />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { services, getService } from "@/content/services";
import { projects } from "@/content/work";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Section, SectionHeading, Card, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Process } from "@/components/home/process";
import { Faq } from "@/components/home/faq";
import { CtaBand } from "@/components/home/cta-band";
import { FinalCta } from "@/components/home/final-cta";
import { WorkCard } from "@/components/home/selected-work";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} services`,
    description: s.short,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

function relatedProjects(serviceName: string) {
  const key = serviceName.split(" ")[0].toLowerCase();
  const hits = projects.filter((p) => p.services.some((x) => x.toLowerCase().includes(key)));
  return (hits.length ? hits : projects).slice(0, 2);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = relatedProjects(s.name);

  return (
    <>
      <PageBand
        eyebrow="Service"
        title={s.name}
        lead={s.short}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: s.name, href: `/services/${s.slug}` },
        ]}
      />

      <Section>
        <Container className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <Eyebrow>What it is</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed text-text-1/90 md:text-xl">{s.intro}</p>
            <Eyebrow className="mt-10">Who it is for</Eyebrow>
            <p className="mt-4 text-[15px] leading-relaxed text-text-2 md:text-base">{s.audience}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <Card featured className="p-6 hover:translate-y-0">
              <h2 className="text-lg font-semibold text-text-1">What is included</h2>
              <ul className="mt-4 space-y-3">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] text-text-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border-1 pt-5">
                <p className="text-xs font-medium tracking-wide text-text-3 uppercase">Pricing model</p>
                <p className="mt-1 text-[15px] text-text-2">{s.pricingModel}</p>
              </div>
              <div className="mt-5">
                <p className="text-xs font-medium tracking-wide text-text-3 uppercase">Tools</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <li key={t} className="rounded-full border border-border-1 bg-bg-0/60 px-2.5 py-1 font-mono text-xs text-text-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Process tone="alt" />

      <Section aria-labelledby="related-heading">
        <Container>
          <SectionHeading eyebrow="Related work" title={<span id="related-heading">Where we have done this before</span>} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((p) => (
              <WorkCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={`Talk to us about ${s.name.toLowerCase()}`} />
      <Faq items={s.faqs} title={`${s.name}: common questions`} tone="alt" />
      <FinalCta />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          serviceType: s.name,
          description: s.intro,
          url: `${site.url}/services/${s.slug}`,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: ["US", "CA", "EU"],
        }}
      />
    </>
  );
}

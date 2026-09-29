import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, FileCheck2, UserRound } from "lucide-react";
import { site } from "@/content/site";
import { services, getService } from "@/content/services";
import { projects } from "@/content/work";
import { pains } from "@/content/home";
import { heroTools } from "@/content/tools";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { ContactForm } from "@/components/site/contact-form";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Process } from "@/components/home/process";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { WorkCard } from "@/components/home/selected-work";
import { relatedProjects } from "@/components/services/service-rows";

/* Service detail template (Stackworx has no service pages; this follows the
   structure of their paid landing page, made standard for all eight):
   split hero with a prefilled qualifier, pain points, deliverables bento,
   process, tools, related work, other services, FAQ with schema, CTA. */

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} services for online brands`,
    description: `${s.short} ${s.intro}`.slice(0, 158),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

const facts = [
  { icon: FileCheck2, label: "Written scope and fixed price" },
  { icon: UserRound, label: "One named point of contact" },
  { icon: Clock3, label: "Reply within one business day" },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const hits = relatedProjects(s);
  const related = (hits.length ? hits : projects).slice(0, 3);
  const servicePains = pains.filter((p) => p.service === s.slug);
  const others = services.filter((x) => x.slug !== s.slug);
  const logos = heroTools.filter((t) =>
    s.tools.some((name) => name.toLowerCase().includes(t.label.toLowerCase()) || t.label.toLowerCase().includes(name.toLowerCase()))
  );
  const shortName = s.name.replace(" pre- and post-sales support", " support");

  return (
    <>
      <PageBand
        eyebrow={`Service · ${shortName}`}
        title={s.name}
        lead={s.intro}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: shortName, href: `/services/${s.slug}` },
        ]}
      >
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
          {facts.map((f) => (
            <li key={f.label} className="flex items-center gap-2.5 text-[15px] font-medium text-text-1">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-tint text-blue-700">
                <f.icon className="size-4" aria-hidden />
              </span>
              {f.label}
            </li>
          ))}
        </ul>
      </PageBand>

      {/* Split: who it is for + prefilled qualifier */}
      <Section aria-labelledby="fit-heading">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow="Who it is for" titleId="fit-heading" title="Is this a fit for you?" />
            <p className="mt-5 text-lg leading-relaxed text-text-2">{s.audience}</p>
            {servicePains.length ? (
              <ul className="mt-8 space-y-3">
                {servicePains.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-xl bg-night px-5 py-4 text-sm font-semibold tracking-wide text-white uppercase">
                    {p.text}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 rounded-2xl border border-border-1 bg-bg-1 p-6">
              <p className="font-mono text-[12px] font-medium tracking-[0.14em] text-text-2 uppercase">Pricing model</p>
              <p className="mt-2 text-lg text-text-1">{s.pricingModel}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="rounded-2xl border border-border-1 bg-white p-6 shadow-[0_24px_60px_-24px_rgba(10,22,51,0.25)] md:p-8">
              <p className="font-display text-2xl font-semibold text-text-1">Get a plan: {shortName}</p>
              <p className="mt-2 mb-6 text-[15px] text-text-2">Three quick steps. We reply within one business day.</p>
              <ContactForm bare defaultServices={[s.name]} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Deliverables bento */}
      <Section tone="alt" aria-labelledby="included-heading">
        <Container>
          <SectionHeading
            eyebrow="What is included"
            titleId="included-heading"
            title="Everything in the scope, written down"
            lead="These come as standard. Anything extra is agreed in writing before we start."
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-6">
            {s.deliverables.map((d, i) => (
              <RevealItem
                key={d}
                className={i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-2"}
              >
                <article
                  className={
                    i === 0
                      ? "relative h-full overflow-hidden rounded-2xl bg-night p-7 text-white"
                      : "h-full rounded-2xl border border-border-1 bg-white p-7 shadow-[var(--shadow-card)]"
                  }
                  data-theme={i === 0 ? "dark" : undefined}
                >
                  {i === 0 ? <div aria-hidden className="grid-dark absolute inset-0 opacity-50" /> : null}
                  <div className="relative">
                    <span
                      className={
                        i === 0
                          ? "font-display text-5xl font-bold text-signal"
                          : "font-display text-5xl font-bold text-tint-2"
                      }
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className={i === 0 ? "mt-6 text-xl font-semibold" : "mt-6 text-lg font-semibold text-text-1"}>{d}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Process />

      {/* Tools */}
      <Section tone="alt" aria-labelledby="tools-heading" className="py-14 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Tools" titleId="tools-heading" title="Built in the tools you already use" />
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-8">
            {s.tools.map((name) => {
              const logo = logos.find(
                (t) => name.toLowerCase().includes(t.label.toLowerCase()) || t.label.toLowerCase().includes(name.toLowerCase())
              );
              return (
                <li
                  key={name}
                  className="inline-flex h-14 items-center gap-3 rounded-xl border border-border-1 bg-white px-5 text-[15px] font-medium text-text-1 shadow-[var(--shadow-card)]"
                >
                  {logo ? <logo.Icon className="size-6" aria-hidden /> : <span aria-hidden className="size-2.5 rounded-[2px] bg-accent" />}
                  {name}
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Related work */}
      <Section aria-labelledby="related-heading">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Related work" titleId="related-heading" title="Where we have done this before" />
            <Button href="/work" variant="secondary" className="shrink-0">
              All case studies
            </Button>
          </div>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <WorkCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Faq items={s.faqs} title={`${shortName}: common questions`} tone="alt" />

      {/* Other services */}
      <Section aria-labelledby="other-heading" className="py-14 md:py-20">
        <Container>
          <SectionHeading eyebrow="Combine it" titleId="other-heading" title="Often paired with" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.slice(0, 8).map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-center gap-3 rounded-xl border border-border-1 bg-white p-4 transition-colors hover:border-accent/50 hover:bg-tint/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-tint text-blue-700">
                    <o.icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-[15px] font-medium text-text-1">
                    {o.name.replace(" pre- and post-sales support", " support")}
                  </span>
                  <ArrowUpRight className="ml-auto size-4 text-text-3 transition-colors group-hover:text-accent" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

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
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${s.name}: what is included`,
            itemListElement: s.deliverables.map((d) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: d } })),
          },
        }}
      />
    </>
  );
}

export const dynamicParams = false;


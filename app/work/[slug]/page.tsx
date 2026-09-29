import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { site } from "@/content/site";
import { projects, getProject } from "@/content/work";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { WorkCard } from "@/components/home/selected-work";
import { CtaBand } from "@/components/home/cta-band";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.client}: ${p.services.join(", ")}`,
    description: p.scope,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: "Industry", value: p.industry },
    ...(p.market ? [{ label: "Market", value: p.market }] : []),
    { label: "Services", value: p.services.join(", ") },
    { label: "Tools", value: p.tools.join(", ") },
    { label: "eComet's role", value: p.scope },
  ];

  return (
    <>
      <PageBand
        eyebrow={p.industry}
        title={p.client}
        lead={p.scope}
        crumbs={[
          { label: "Work", href: "/work" },
          { label: p.client, href: `/work/${p.slug}` },
        ]}
      >
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Visit {p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            <ExternalLink className="size-4" aria-hidden />
          </a>
        ) : null}
      </PageBand>

      <Section>
        <Container>
          <Reveal>
            <dl className="grid gap-6 rounded-card border border-border-1 bg-surface-1 p-6 sm:grid-cols-2 md:grid-cols-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">{f.label}</dt>
                  <dd className="mt-2 text-[15px] text-text-1/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {p.image ? (
            <Reveal delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-feature border border-border-1 bg-bg-1">
              <Image
                src={p.image}
                alt={p.imageAlt ?? `${p.client} website`}
                fill
                priority
                sizes="(min-width: 1200px) 1200px, 100vw"
                className="object-cover object-top"
              />
            </Reveal>
          ) : null}

          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <Eyebrow>What eComet did</Eyebrow>
              <p className="mt-4 text-lg leading-relaxed text-text-1/90">{p.summary}</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <Eyebrow>Results</Eyebrow>
              {p.results?.length ? (
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  {p.results.map((r) => (
                    <div key={r.label} className="rounded-card border border-border-1 bg-surface-1 p-4">
                      <dd className="font-mono text-3xl text-text-1">{r.value}</dd>
                      <dt className="mt-1 text-sm text-text-3">{r.label}</dt>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 text-[15px] leading-relaxed text-text-2">
                  We only publish figures the client has agreed to share. Ask us for a reference call and we
                  will connect you with the client directly.
                </p>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand title="Have a similar store or workflow?" text="Tell us what you need and we will say honestly whether it is a fit." />

      <Section tone="alt" aria-labelledby="more-heading">
        <Container>
          <SectionHeading eyebrow="More work" title={<span id="more-heading">Other engagements</span>} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <WorkCard key={r.slug} project={r} />
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.client,
          headline: p.scope,
          description: p.summary,
          url: `${site.url}/work/${p.slug}`,
          author: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}

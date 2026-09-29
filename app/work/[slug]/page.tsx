import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { projects, getProject } from "@/content/work";
import { services } from "@/content/services";
import { process } from "@/content/process";
import { PageBand } from "@/components/site/page-band";
import { JsonLd } from "@/components/site/json-ld";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/primitives";
import { TagPill } from "@/components/ui/atoms";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/home/final-cta";

/* Case-study detail: Stackworx has no detail pages at all (their cards link
   nowhere). Template: fact strip, hero shot, brief / what we did, how the
   engagement runs, results (only client-approved figures), stack, next case. */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.client} case study: ${p.services.join(", ")}`,
    description: `${p.scope} ${p.summary}`.slice(0, 158),
    alternates: { canonical: `/work/${p.slug}` },
  };
}

function serviceHref(name: string) {
  const key = name.split(" ")[0].toLowerCase();
  return services.find((s) => s.name.toLowerCase().startsWith(key))?.slug;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const facts = [
    { label: "Client", value: p.client },
    { label: "Industry", value: p.industry },
    { label: "Market", value: p.market ?? "Online" },
    { label: "Services", value: p.services.join(", ") },
  ];

  return (
    <>
      <PageBand
        eyebrow={`Case study · ${p.industry}`}
        title={p.client}
        lead={p.scope}
        crumbs={[
          { label: "Work", href: "/work" },
          { label: p.client, href: `/work/${p.slug}` },
        ]}
      >
        <div className="mt-7 flex flex-wrap items-center gap-2">
          {p.services.map((s) => {
            const href = serviceHref(s);
            return href ? (
              <Link key={s} href={`/services/${href}`} className="rounded-md focus-visible:outline-2 focus-visible:outline-accent">
                <TagPill>{s}</TagPill>
              </Link>
            ) : (
              <TagPill key={s}>{s}</TagPill>
            );
          })}
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline"
            >
              Visit {p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              <ExternalLink className="size-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </PageBand>

      {/* Fact strip */}
      <section aria-label="Project facts" className="border-b border-border-1 bg-white">
        <Container>
          <dl className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-border-1">
            {facts.map((f) => (
              <div key={f.label} className="px-1 py-6 md:px-6 md:first:pl-0">
                <dt className="font-mono text-[11px] font-medium tracking-[0.14em] text-text-2 uppercase">{f.label}</dt>
                <dd className="mt-2 text-[15px] font-semibold text-text-1">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <Container>
          {p.image ? (
            <Reveal className="relative overflow-hidden rounded-3xl border border-border-1 bg-bg-1 p-3 shadow-[0_30px_70px_-30px_rgba(10,22,51,0.35)] md:p-4">
              <div className="mb-3 flex items-center gap-1.5 px-1" aria-hidden>
                <span className="size-2.5 rounded-full bg-border-2" />
                <span className="size-2.5 rounded-full bg-border-2" />
                <span className="size-2.5 rounded-full bg-border-2" />
                <span className="ml-3 h-5 flex-1 rounded-md bg-white" />
              </div>
              <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-white">
                <Image src={p.image} alt={p.imageAlt ?? `${p.client} website`} fill priority sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover object-top" />
              </div>
            </Reveal>
          ) : null}

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow>The brief</Eyebrow>
              <p className="font-display mt-4 text-[26px] leading-snug font-semibold text-text-1 md:text-[32px]">{p.scope}</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <Eyebrow>What eComet did</Eyebrow>
              <p className="mt-4 text-lg leading-relaxed text-text-2 md:text-xl">{p.summary}</p>
              <p className="mt-8 font-mono text-[12px] font-medium tracking-[0.14em] text-text-2 uppercase">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <li key={t} className="rounded-md border border-border-1 bg-bg-1 px-3 py-1.5 font-mono text-sm text-text-1">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* How the engagement runs */}
      <Section tone="night" aria-labelledby="how-heading">
        <div aria-hidden className="grid-dark absolute inset-0 opacity-50" />
        <Container className="relative">
          <SectionHeading tone="dark" eyebrow="How it runs" titleId="how-heading" title="Our standard path, applied to this account" />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map((s) => (
              <RevealItem key={s.n} className="h-full">
                <article className="h-full rounded-2xl border border-white/10 bg-night-card p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-night-tile text-signal">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-5 font-mono text-sm text-night-muted">//{s.n}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-night-muted">{s.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Results */}
      <Section aria-labelledby="results-heading">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Results" titleId="results-heading" title="Numbers only when the client signs off" />
          </div>
          <div className="lg:col-span-7">
            {p.results?.length ? (
              <dl className="grid grid-cols-2 gap-4">
                {p.results.map((r) => (
                  <div key={r.label} className="flex flex-col-reverse rounded-2xl border border-border-1 bg-bg-1 p-6">
                    <dt className="mt-2 text-sm text-text-2">{r.label}</dt>
                    <dd className="font-display text-4xl font-bold text-blue-700">{r.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="flex gap-4 rounded-2xl border border-border-1 bg-bg-1 p-6 md:p-8">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-tint text-blue-700">
                  <ShieldCheck className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-semibold text-text-1">Ask for a reference call</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-2">
                    We publish figures only when the client has approved them. If you would like to hear how this engagement runs, we can
                    connect you with the client directly.
                  </p>
                  <Button href={`/contact`} variant="blue" size="sm" className="mt-5">
                    Request a reference
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Pager */}
      <nav aria-label="More case studies" className="border-y border-border-1 bg-bg-1">
        <Container className="grid md:grid-cols-2 md:divide-x md:divide-border-1">
          <Link href={`/work/${prev.slug}`} className="group flex items-center gap-4 py-8 md:pr-8">
            <ArrowLeft className="size-5 text-text-3 transition-transform group-hover:-translate-x-1 group-hover:text-accent" aria-hidden />
            <span>
              <span className="block font-mono text-[11px] tracking-[0.14em] text-text-2 uppercase">Previous case</span>
              <span className="mt-1 block text-lg font-semibold text-text-1 group-hover:text-blue-700">{prev.client}</span>
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex items-center justify-end gap-4 border-t border-border-1 py-8 text-right md:border-t-0 md:pl-8">
            <span>
              <span className="block font-mono text-[11px] tracking-[0.14em] text-text-2 uppercase">Next case</span>
              <span className="mt-1 block text-lg font-semibold text-text-1 group-hover:text-blue-700">{next.client}</span>
            </span>
            <ArrowRight className="size-5 text-text-3 transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />
          </Link>
        </Container>
      </nav>

      <FinalCta />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.client} case study`,
          headline: p.scope,
          description: p.summary,
          url: `${site.url}/work/${p.slug}`,
          author: { "@id": `${site.url}/#organization` },
          about: p.services,
          ...(p.image ? { image: `${site.url}${p.image}` } : {}),
        }}
      />
    </>
  );
}

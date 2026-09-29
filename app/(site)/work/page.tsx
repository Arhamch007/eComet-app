import type { Metadata } from "next";
import { Suspense } from "react";
import { projects } from "@/content/work";
import { services } from "@/content/services";
import { PageBand } from "@/components/site/page-band";
import { Container, Section } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/count-up";
import { WorkFilter } from "@/components/work/work-filter";
import { WorkCard } from "@/components/home/selected-work";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Work: stores, workflows and platforms we look after",
  description:
    "Case studies from eComet's Shopify support, e-commerce operations, web development and automation engagements, filterable by service and platform.",
  alternates: { canonical: "/work" },
};

/* Stackworx stats bar, limited to figures we can stand behind. */
const stats = [
  { value: projects.length, label: "published case studies" },
  { value: new Set(projects.flatMap((p) => p.tools)).size, label: "platforms in these engagements" },
  { value: services.length, label: "service lines" },
  { value: 3, label: "markets: USA, Canada, Europe" },
];

export default function WorkPage() {
  return (
    <>
      <PageBand
        align="center"
        eyebrow="Work"
        title="Engagements described exactly as they ran"
        lead="No inflated numbers. Each case says what the client needed, what we did and which tools were involved. References are available on request."
        crumbs={[{ label: "Work", href: "/work" }]}
      />

      <section aria-label="Work in numbers" className="border-b border-border-1 bg-white">
        <Container>
          <dl className="grid grid-cols-2 divide-border-1 md:grid-cols-4 md:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-2 py-8 text-center md:py-10">
                <dt className="mt-3 text-sm text-text-2">{s.label}</dt>
                <dd className="font-display text-[40px] leading-none font-bold text-blue-700 md:text-[52px]">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <Container>
          <Suspense
            fallback={
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <WorkCard project={p} />
                  </li>
                ))}
              </ul>
            }
          >
            <WorkFilter projects={projects} />
          </Suspense>
        </Container>
      </Section>
      <Testimonials />
      <FinalCta />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects, type Project } from "@/content/work";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border-1 bg-surface-1 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-border-2 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border-1 bg-bg-1">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? `${project.client} website`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-surface-1">
            <span className="font-display relative text-5xl font-semibold text-text-3">
              {project.client.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {project.services.map((s) => (
            <span key={s} className="rounded-full border border-border-1 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-text-3">
              {s}
            </span>
          ))}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-text-1">{project.client}</h3>
        <p className="mt-1 text-sm text-text-3">{project.industry}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-text-2">{project.scope}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-mono text-xs text-text-3">{project.tools.join(" · ")}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-[gap] group-hover:gap-2.5">
            View <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SelectedWork() {
  return (
    <Section tone="alt" id="work" aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title={<span id="work-heading">Stores, workflows and platforms we look after</span>}
            lead="A sample of engagements described exactly as they ran. Ask us for references on any of them."
          />
          <Button href="/work" variant="secondary" className="shrink-0">
            All case studies
          </Button>
        </div>
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <WorkCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

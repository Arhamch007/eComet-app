import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, featuredProjects, type Project } from "@/content/work";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { TagPill, PixelBlocks } from "@/components/ui/atoms";
import { CountUp } from "@/components/ui/count-up";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* Image-led card used on /work and service pages. */
export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-border-1 bg-white shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/60 motion-safe:hover:-translate-y-1"
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
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-tint">
            <span className="font-display text-5xl font-semibold text-blue-700/40">{project.client.charAt(0)}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <TagPill tone="light" className="self-start">{project.services[0]}</TagPill>
        <h3 className="mt-4 text-xl font-semibold text-text-1">{project.client}</h3>
        <p className="mt-1 text-sm text-text-3">{project.industry}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-text-2">{project.scope}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-mono text-xs text-text-2">{project.tools.join(" · ")}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-[gap] group-hover:gap-2.5">
            View <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Stackworx outcome card, upgraded: whole card links to the case, hover lift
   with a blue border, "View case" affordance, tools row, keyboard focus. */
function OutcomeCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col rounded-[18px] bg-surface-3 p-6 shadow-[0_14px_36px_rgba(10,22,51,0.07)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_22px_48px_-12px_rgba(37,99,235,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:hover:-translate-y-1 md:p-7"
    >
      <TagPill className="self-start">{project.services[0]}</TagPill>
      <div className="mt-5 flex min-h-[132px] flex-col justify-center rounded-2xl border border-transparent bg-white px-7 py-7 transition-colors duration-300 group-hover:border-accent/50">
        <p className="text-[21px] leading-snug font-bold tracking-[-0.01em] text-text-1">
          {project.client}
          <span className="text-blue-700"> → </span>
          {project.industry.toLowerCase()}
        </p>
      </div>
      <p className="mt-6 text-[15px] leading-relaxed text-text-2">{project.scope}</p>
      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="font-mono text-xs text-text-2">{project.tools.join(" · ")}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 opacity-80 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
          View case <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function SelectedWork() {
  const cards = featuredProjects.slice(0, 5);
  const heroShots = projects.filter((p) => p.image).slice(0, 2);
  return (
    <Section id="work" aria-labelledby="work-heading" className="pb-20 md:pb-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Selected work"
              titleId="work-heading"
              title="Proof you can click through"
            />
            <Reveal delay={0.15}>
              <p className="mt-8 text-[30px] leading-tight font-bold text-text-1">
                <CountUp value={20} suffix="+" className="text-blue-700" /> specialists, 3 markets
              </p>
              <p className="mt-4 max-w-[520px] text-base leading-relaxed text-text-2">
                Shopify stores, automation stacks and platforms we build and run every week. Each case says exactly what we did; ask us for a reference on any of them.
              </p>
              <Button href="/work" variant="secondary" className="mt-8">
                All case studies <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Reveal>
          </div>
          {/* Right: layered screenshots with a blue pixel cluster (replaces their stock photo) */}
          <Reveal delay={0.1} className="relative hidden h-[420px] lg:col-span-6 lg:block">
            <div className="grid-light absolute inset-0 rounded-3xl opacity-80" />
            {heroShots[0]?.image ? (
              <div className="absolute top-8 left-6 w-[74%] overflow-hidden rounded-2xl border border-border-1 bg-white shadow-[var(--shadow-tile)]">
                <div className="relative aspect-[16/10]">
                  <Image src={heroShots[0].image} alt={heroShots[0].imageAlt ?? heroShots[0].client} fill sizes="480px" className="object-cover object-top" />
                </div>
              </div>
            ) : null}
            {heroShots[1]?.image ? (
              <div className="absolute right-4 bottom-6 w-[56%] overflow-hidden rounded-2xl border border-border-1 bg-white shadow-[var(--shadow-tile)]">
                <div className="relative aspect-[16/10]">
                  <Image src={heroShots[1].image} alt={heroShots[1].imageAlt ?? heroShots[1].client} fill sizes="360px" className="object-cover object-top" />
                </div>
              </div>
            ) : null}
            <PixelBlocks className="absolute top-0 right-0" cell={36} pattern={[[0, 0, 1], [0, 1, 2], [1, 0, 0]]} />
          </Reveal>
        </div>

        {/* 3 + 2 pyramid */}
        <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-6">
          {cards.map((p, i) => (
            <RevealItem key={p.slug} className={cn("h-full lg:col-span-2", i === 3 && "lg:col-start-2")}>
              <OutcomeCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

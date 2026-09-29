"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/content/services";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { TagPill } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

/* Stackworx numbered service columns with the "white panel shrinks to reveal"
   effect, upgraded: eight services in a 4 x 2 grid, the reveal also fires on
   keyboard focus and on tap, touch devices auto-reveal the card centred in the
   viewport, and the revealed side carries deliverables, tools and a link. */
function ServiceCard({ index, slug }: { index: number; slug: string }) {
  const s = services.find((x) => x.slug === slug)!;
  const ref = React.useRef<HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const touch = window.matchMedia("(hover: none)").matches;
    if (!touch) return;
    const io = new IntersectionObserver(([e]) => setOpen(e.isIntersecting), { rootMargin: "-42% 0px -42% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      data-open={open || undefined}
      onClick={() => setOpen((o) => !o)}
      className="group relative h-[360px] cursor-pointer overflow-hidden bg-night text-white focus-within:outline-none lg:h-[420px]"
    >
      {/* Revealed layer: navy with a blue glow and a fine grid */}
      <div aria-hidden className="grid-dark absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(77,159,255,0.35),transparent_70%)]" />

      {/* White cover panel shrinks to its centre on hover, focus or tap */}
      <div
        aria-hidden
        className="absolute inset-0 origin-center bg-white transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-0 group-focus-within:scale-0 group-data-[open]:scale-0 motion-reduce:transition-opacity motion-reduce:group-hover:scale-100 motion-reduce:group-hover:opacity-0 motion-reduce:group-focus-within:scale-100 motion-reduce:group-focus-within:opacity-0"
      />

      <div className="relative flex h-full flex-col p-6 lg:p-7">
        <TagPill className="self-start">{s.name}</TagPill>

        <span
          aria-hidden
          className="font-display mt-auto text-[96px] leading-none font-bold tracking-[-0.04em] text-tint-2 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0 group-data-[open]:opacity-0 lg:text-[120px]"
        >
          {num}
        </span>

        {/* Default copy */}
        <div className="mt-6 flex gap-4 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0 group-data-[open]:opacity-0">
          <span aria-hidden className="w-[3px] shrink-0 self-stretch rounded-full bg-accent" />
          <p className="text-[15px] leading-relaxed text-text-2">{s.short}</p>
        </div>

        {/* Revealed detail */}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-data-[open]:pointer-events-auto group-data-[open]:translate-y-0 group-data-[open]:opacity-100 lg:inset-x-7 lg:bottom-7">
          <ul className="space-y-2">
            {s.deliverables.slice(0, 3).map((d) => (
              <li key={d} className="flex gap-2.5 text-sm leading-snug text-white/90">
                <Check className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11px] tracking-wide text-night-muted">{s.tools.slice(0, 4).join(" · ")}</p>
          <Link
            href={`/services/${s.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            See {s.name.toLowerCase()} <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesReveal() {
  return (
    <Section id="services" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Services"
          titleId="services-heading"
          title="Eight service lines, one accountable team"
          lead="Hover, tap or tab through a card to see what is included."
          className="max-w-3xl"
        />
      </Container>
      <div className="mx-auto mt-14 grid max-w-[1440px] gap-px border-y border-border-1 bg-border-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} index={i} slug={s.slug} />
        ))}
      </div>
    </Section>
  );
}

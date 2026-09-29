"use client";

import * as React from "react";
import { process } from "@/content/process";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/* Stackworx sticky stacking process cards, upgraded:
   - earlier cards peek 18px above the active one like a deck
   - a sticky intro with a step rail that lights the active step
   - each card has a live mini-UI illustration in inline SVG, not an image */

const timelines = ["Day 1", "Week 1", "Weeks 2 to 4", "Ongoing"];

function Illustration({ step, active }: { step: number; active: boolean }) {
  const common = "h-full w-full";
  const t = active ? "opacity-100" : "opacity-60";
  if (step === 0)
    return (
      <svg viewBox="0 0 320 170" className={cn(common, t)} aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(24 ${22 + i * 34})`}>
            <rect width="18" height="18" rx="4" className={i < 3 ? "fill-accent" : "fill-tint-2"} />
            {i < 3 ? <path d="M5 9.5l3 3 5.5-6" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" /> : null}
            <rect x="30" y="4" width={180 - i * 22} height="10" rx="5" className="fill-surface-3" />
          </g>
        ))}
        <rect x="236" y="22" width="60" height="120" rx="10" className="fill-tint" />
        <rect x="248" y="96" width="36" height="34" rx="6" className="fill-accent" />
      </svg>
    );
  if (step === 1)
    return (
      <svg viewBox="0 0 320 170" className={cn(common, t)} aria-hidden>
        <path d="M60 85 H130 M190 85 H260 M130 85 C150 40 170 40 190 50 M130 85 C150 130 170 130 190 120" className="stroke-accent" strokeWidth="2" fill="none" strokeDasharray="6 5" />
        {[
          [30, 70, "fill-night"],
          [130, 70, "fill-accent"],
          [190, 35, "fill-tint-2"],
          [190, 105, "fill-tint-2"],
          [260, 70, "fill-night"],
        ].map(([x, y, c], i) => (
          <rect key={i} x={x as number} y={y as number} width="34" height="30" rx="8" className={c as string} />
        ))}
      </svg>
    );
  if (step === 2)
    return (
      <svg viewBox="0 0 320 170" className={cn(common, t)} aria-hidden>
        <rect x="18" y="20" width="284" height="130" rx="12" className="fill-night" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={40 + i * 90} y="62" width="62" height="46" rx="10" className={i === 1 ? "fill-accent" : "fill-night-tile"} />
            {i < 2 ? <path d={`M${102 + i * 90} 85 H${130 + i * 90}`} className="stroke-signal" strokeWidth="2" /> : null}
          </g>
        ))}
        <circle cx="116" cy="85" r="3.5" className="fill-signal">
          {active ? <animate attributeName="cx" values="104;128;104" dur="2.4s" repeatCount="indefinite" /> : null}
        </circle>
      </svg>
    );
  return (
    <svg viewBox="0 0 320 170" className={cn(common, t)} aria-hidden>
      {[46, 70, 58, 92, 84, 118, 132].map((h, i) => (
        <rect key={i} x={30 + i * 38} y={150 - h} width="24" height={h} rx="5" className={i === 6 ? "fill-accent" : "fill-tint-2"} />
      ))}
      <path d="M42 108 L80 86 L118 96 L156 64 L194 70 L232 40 L270 24" className="stroke-blue-700" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Process({ tone = "base" }: { tone?: "base" | "alt" }) {
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section tone={tone} id="process" aria-labelledby="process-heading">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading
            eyebrow="How we work"
            titleId="process-heading"
            title="From first call to fully running"
            lead="Four steps, a fixed price before work starts, and a named person at every stage."
          />
          <ol className="mt-10 hidden space-y-1 lg:block" aria-label="Process steps">
            {process.map((s, i) => (
              <li key={s.n} className="flex items-center gap-4">
                <span
                  className={cn(
                    "h-10 w-[3px] rounded-full transition-colors duration-300",
                    i <= active ? "bg-accent" : "bg-border-1"
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    "font-mono text-[13px] tracking-wide transition-colors duration-300",
                    i === active ? "font-semibold text-text-1" : "text-text-3"
                  )}
                  aria-current={i === active ? "step" : undefined}
                >
                  {s.n} · {s.title}
                </span>
              </li>
            ))}
          </ol>
          <Button href={site.cta.href} tile className="mt-10">
            {site.cta.label}
          </Button>
        </div>

        <div className="lg:col-span-7">
          {process.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className="sticky mb-8 last:mb-0"
              style={{ top: `calc(6.5rem + ${i * 18}px)`, zIndex: i + 1 }}
            >
              <article
                className={cn(
                  "rounded-2xl border border-border-1 bg-bg-1 p-5 shadow-[0_18px_48px_rgba(10,22,51,0.08)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i < active && "motion-safe:scale-[0.97]"
                )}
              >
                <div className="aspect-[320/170] overflow-hidden rounded-xl bg-white p-4">
                  <Illustration step={i} active={i === active} />
                </div>
                <div className="flex flex-col gap-2 px-2 pt-5 pb-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-sm text-text-3">//{s.n}</p>
                    <h3 className="mt-1 text-[22px] font-semibold text-text-1">{s.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-text-2">{s.text}</p>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-tint px-3 py-1.5 font-mono text-xs font-medium text-blue-700">
                    {timelines[i]}
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

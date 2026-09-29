import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services, type Service } from "@/content/services";
import { projects } from "@/content/work";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { TagPill } from "@/components/ui/atoms";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* Stackworx services-hub zig-zag row, upgraded: every row links to a full
   service page, carries its own CTA, a tool rail and a proof line pointing
   at real case studies, and alternates sides on desktop only. */

export function relatedProjects(s: Service) {
  const key = s.name.split(" ")[0].toLowerCase();
  return projects.filter((p) => p.services.some((x) => x.toLowerCase().includes(key)));
}

function Row({ s, index }: { s: Service; index: number }) {
  const flip = index % 2 === 1;
  const proof = relatedProjects(s);
  const num = String(index + 1).padStart(2, "0");
  return (
    <section id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-40 border-b border-border-1 py-16 last:border-b-0 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className={cn("lg:col-span-7", flip && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span aria-hidden className="font-display text-[64px] leading-none font-bold tracking-[-0.04em] text-tint-2 md:text-[88px]">
              {num}
            </span>
            <TagPill>{s.name.replace(" pre- and post-sales support", " support")}</TagPill>
          </div>
          <h2 id={`${s.slug}-title`} className="font-display mt-6 text-[30px] leading-[1.1] font-semibold text-text-1 md:text-[40px]">
            {s.short}
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-2">{s.intro}</p>

          <h3 className="mt-8 font-mono text-[12px] font-medium tracking-[0.14em] text-text-2 uppercase">What is included</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {s.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-[15px] leading-snug text-text-1/90">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-tint text-blue-700">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={`/services/${s.slug}`} variant="blue" tile>
              See the {s.name.replace(" pre- and post-sales support", " support")} page
            </Button>
            <Button href={`/contact?service=${s.slug}`} variant="secondary">
              Ask about this
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className={cn("lg:col-span-5", flip && "lg:order-1")}>
          <div data-theme="dark" className="relative overflow-hidden rounded-2xl bg-night p-7 text-white md:p-8">
            <div aria-hidden className="grid-dark absolute inset-0 opacity-60" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(70%_60%_at_100%_0%,rgba(77,159,255,0.28),transparent_70%)]" />
            <div className="relative">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-night-tile text-signal">
                <s.icon className="size-6" aria-hidden />
              </span>
              <p className="mt-6 font-mono text-[12px] tracking-[0.14em] text-night-muted uppercase">Good fit if</p>
              <p className="mt-2 text-lg leading-relaxed text-white">{s.audience}</p>

              <p className="mt-7 font-mono text-[12px] tracking-[0.14em] text-night-muted uppercase">Tools</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <li key={t} className="rounded-md bg-night-tile px-2.5 py-1.5 font-mono text-xs text-white/90">
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-7 font-mono text-[12px] tracking-[0.14em] text-night-muted uppercase">Pricing model</p>
              <p className="mt-2 text-[15px] text-white/90">{s.pricingModel}</p>
            </div>
          </div>
          {proof.length ? (
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-sm text-text-2">
              <span className="font-medium text-text-1">Recent work:</span>
              {proof.slice(0, 3).map((p, i) => (
                <span key={p.slug} className="inline-flex items-center">
                  <Link href={`/work/${p.slug}`} className="inline-flex items-center gap-0.5 font-medium text-blue-700 hover:underline">
                    {p.client}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </Link>
                  {i < Math.min(proof.length, 3) - 1 ? <span className="ml-2 text-text-3">·</span> : null}
                </span>
              ))}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

export function ServiceRows() {
  return (
    <div>
      {services.map((s, i) => (
        <Row key={s.slug} s={s} index={i} />
      ))}
    </div>
  );
}

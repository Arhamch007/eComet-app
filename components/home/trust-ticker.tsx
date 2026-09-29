import { projects } from "@/content/work";
import { heroTools } from "@/content/tools";
import { Marquee } from "@/components/ui/marquee";

/* Stackworx "trusted by" band, upgraded: accessible clone, mask fades,
   pause on hover/focus, static under reduced motion. Client names alternate
   with the platforms we run for them until logo permissions are confirmed. */
export function TrustTicker() {
  return (
    <section aria-label="Clients and platforms" className="border-y border-border-1 bg-white">
      <div className="flex h-[104px] items-center">
        <p className="hidden shrink-0 border-r border-border-1 pr-8 pl-8 font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-[0.14em] text-text-2 md:block">
          Brands and
          <br />
          platforms we run
        </p>
        <Marquee duration={70} className="h-full flex-1" trackClassName="h-full">
          {projects.map((p, i) => {
            const tool = heroTools[i % heroTools.length];
            return (
              <span key={p.slug} className="flex h-full items-center">
                <span className="font-display px-8 text-[22px] font-semibold tracking-tight whitespace-nowrap text-text-1/70">
                  {p.client}
                </span>
                <span className="flex items-center gap-2 px-8 text-sm font-medium whitespace-nowrap text-text-2 grayscale transition-[filter] duration-200 hover:grayscale-0">
                  <tool.Icon className="size-6" aria-hidden />
                  {tool.label}
                </span>
              </span>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}

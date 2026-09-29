import { services } from "@/content/services";
import { site } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";

/* Stackworx service ticker, upgraded to two counter-scrolling rows: services
   in solid type, tools in outline type. Visual only; the same lists are
   available to assistive tech as plain text. */
function Chevron() {
  return (
    <svg viewBox="0 0 16 24" className="mx-6 h-7 w-5 shrink-0 text-accent md:mx-9 md:h-9" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`a${i}`} x={2 + i * 2.4} y={2 + i * 2.2} width="2.2" height="2.2" rx="1" fill="currentColor" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`b${i}`} x={2 + (3 - i) * 2.4} y={13.2 + i * 2.2} width="2.2" height="2.2" rx="1" fill="currentColor" />
      ))}
    </svg>
  );
}

export function TickerBand() {
  const names = services.map((s) => s.name.replace(" pre- and post-sales support", " support"));
  return (
    <section aria-label="Services and tools" className="overflow-hidden border-y border-border-1 bg-surface-3 py-5 md:py-7">
      <p className="sr-only">Services: {names.join(", ")}. Tools: {site.tools.join(", ")}.</p>
      <div aria-hidden className="space-y-2 md:space-y-3">
        <Marquee duration={55}>
          {names.map((n) => (
            <span key={n} className="flex items-center">
              <span className="font-display text-[28px] font-bold whitespace-nowrap text-text-1 uppercase md:text-[64px] md:leading-none md:tracking-[-0.02em]">
                {n}
              </span>
              <Chevron />
            </span>
          ))}
        </Marquee>
        <Marquee duration={65} reverse>
          {site.tools.map((t) => (
            <span key={t} className="flex items-center">
              <span className="font-display text-outline text-[28px] font-bold whitespace-nowrap uppercase md:text-[64px] md:leading-none md:tracking-[-0.02em]">
                {t}
              </span>
              <Chevron />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

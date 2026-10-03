"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Testimonials, right after "How we work". All cards sit side by side in one
   continuous row (so nothing ever mounts, unmounts or re-flows); a click
   just moves that row with a plain CSS transform, which is what makes the
   slide read as smooth. One card is centred and active (the logo gradient);
   its two neighbours are glass (blurred, translucent) over soft colour
   blobs placed right behind them, and slightly out of focus. Phones show
   one card at a time, 640px+ shows three. Bounded, not a loop: the arrows
   disable at the first/last card instead of wrapping, so the row only ever
   travels the short way. */

export function TestimonialsSection() {
  const n = testimonials.length;
  const [index, setIndex] = React.useState(0);
  const [announce, setAnnounce] = React.useState("");
  const [wide, setWide] = React.useState(false);
  const [reduce, setReduce] = React.useState(false);

  React.useEffect(() => {
    const widthQuery = window.matchMedia("(min-width: 640px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncWidth = () => setWide(widthQuery.matches);
    const syncMotion = () => setReduce(motionQuery.matches);
    syncWidth();
    syncMotion();
    widthQuery.addEventListener("change", syncWidth);
    motionQuery.addEventListener("change", syncMotion);
    return () => {
      widthQuery.removeEventListener("change", syncWidth);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  const go = React.useCallback(
    (next: number) => {
      const i = Math.max(0, Math.min(n - 1, next));
      setIndex(i);
      setAnnounce(`Testimonial ${i + 1} of ${n}`);
    },
    [n]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  };

  const visibleCount = wide ? 3 : 1;
  const centerOffset = wide ? 1 : 0;
  const slideWidthPct = 100 / n;
  const trackWidthPct = (n / visibleCount) * 100;
  const translateXPct = -(index - centerOffset) * slideWidthPct;

  const arrow =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e1e5ec] bg-white text-[#555555] transition-colors duration-200 hover:border-[#1590ec]/60 hover:text-[#0d5df5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d5df5] disabled:pointer-events-none disabled:opacity-40";

  return (
    <LandingSection id="testimonials" tone="alt" labelledBy="testimonials-heading" className="relative isolate overflow-hidden">
      {/* soft colour blobs right behind the side cards, so the glass reads */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-6%] left-[8%] size-[300px] rounded-full bg-[#681bf5] opacity-[0.4] blur-[75px]" />
        <div className="absolute right-[6%] bottom-[-10%] size-[320px] rounded-full bg-[#01e2f8] opacity-[0.42] blur-[75px]" />
        <div className="absolute top-[40%] right-[30%] size-[220px] rounded-full bg-[#1590ec] opacity-[0.14] blur-[90px]" />
      </div>

      <LandingContainer>
        <LandingHeading id="testimonials-heading" title="What clients say" lead="A few words from businesses we've worked with." />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-12 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d5df5] md:mt-14"
        >
          <div className="flex items-stretch justify-center gap-3 sm:gap-5">
            <button type="button" className={cn(arrow, "mt-[108px] hidden self-start sm:inline-flex")} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <div className="flex-1 overflow-hidden">
              <div
                className="flex"
                style={{
                  width: `${trackWidthPct}%`,
                  transform: `translateX(${translateXPct}%)`,
                  transition: reduce ? undefined : "transform 450ms cubic-bezier(0.22,1,0.36,1)",
                  willChange: "transform",
                }}
              >
                {testimonials.map((t, i) => {
                  const active = i === index;
                  return (
                    <div key={t.name} style={{ flex: `0 0 ${slideWidthPct}%` }} className="box-border px-1.5 sm:px-2">
                      <figure
                        onClick={() => !active && go(i)}
                        className={cn(
                          "flex h-full min-h-[300px] flex-col rounded-[22px] p-6 sm:min-h-[260px] sm:p-7",
                          active
                            ? "bg-[linear-gradient(145deg,#1590ec_0%,#0d5df5_45%,#681bf5_100%)] text-white shadow-[0_28px_60px_-24px_rgba(13,93,245,0.55)]"
                            : "cursor-pointer border border-white/70 bg-white/35 text-[#2b2e38] opacity-90 shadow-[0_18px_44px_-28px_rgba(20,30,70,0.3)] backdrop-blur-lg backdrop-saturate-150 blur-[1.5px] transition-[opacity,filter] duration-200 hover:opacity-100 hover:blur-0"
                        )}
                      >
                        <blockquote className={cn("line-clamp-5 text-[15px] leading-[1.6] text-pretty", active ? "text-white" : "text-[#3b3f4a]")}>
                          {t.quote}
                        </blockquote>
                        <figcaption className={cn("mt-auto flex items-center gap-3 border-t pt-5", active ? "border-white/25" : "border-white/50")}>
                          <span
                            className={cn(
                              "relative size-10 shrink-0 overflow-hidden rounded-full ring-2",
                              active ? "ring-white/35" : "ring-white/70"
                            )}
                          >
                            <Image src={t.image} alt="" fill sizes="40px" className="object-cover" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[14px] font-semibold">{t.name}</span>
                            <span className={cn("block truncate text-[13px]", active ? "text-white/80" : "text-[#6b7080]")}>{t.role}</span>
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>

            <button type="button" className={cn(arrow, "mt-[108px] hidden self-start sm:inline-flex")} onClick={() => go(index + 1)} disabled={index === n - 1} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-6 items-center px-1 focus-visible:outline-2 focus-visible:outline-[#0d5df5]"
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-200",
                      i === index ? "w-6 bg-[#0d5df5]" : "w-2 bg-[#c9cedb] group-hover:bg-[#9aa3b8]"
                    )}
                  />
                </button>
              ))}
            </div>
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index + 1)} disabled={index === n - 1} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">{announce}</p>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

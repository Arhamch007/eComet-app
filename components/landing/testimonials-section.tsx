"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Testimonials, right after "How we work": a 3-up carousel (one card on
   phones). The centre card is active, filled with the logo gradient; the
   two side cards are glassy (translucent, blurred) over soft colour blobs
   so the glass effect actually reads. Arrow keys, buttons and dots all move
   the same index; reduced motion drops the slide transition. */

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

export function TestimonialsSection() {
  const n = testimonials.length;
  const [index, setIndex] = React.useState(0);
  const [announce, setAnnounce] = React.useState("");
  const reduce = useReducedMotion();

  const go = React.useCallback(
    (next: number) => {
      const i = ((next % n) + n) % n;
      setIndex(i);
      setAnnounce(`Testimonial ${i + 1} of ${n}`);
    },
    [n]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
  };

  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const arrow =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e1e5ec] bg-white text-[#555555] transition-colors duration-200 hover:border-[#1590ec]/60 hover:text-[#0d5df5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d5df5]";

  return (
    <LandingSection id="testimonials" tone="alt" labelledBy="testimonials-heading" className="relative isolate overflow-hidden">
      {/* soft colour blobs so the glass side cards have something to show through */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[6%] size-[320px] rounded-full bg-[#01e2f8] opacity-[0.16] blur-[90px]" />
        <div className="absolute right-[8%] bottom-[-14%] size-[360px] rounded-full bg-[#681bf5] opacity-[0.14] blur-[100px]" />
        <div className="absolute top-[30%] right-[22%] size-[220px] rounded-full bg-[#0d5df5] opacity-[0.12] blur-[90px]" />
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
          <div className="flex items-center gap-3 sm:gap-5">
            <button type="button" className={cn(arrow, "hidden sm:inline-flex")} onClick={() => go(index - 1)} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <div className="relative h-[340px] flex-1 overflow-hidden sm:h-[300px]">
              {testimonials.map((t, i) => {
                const off = offsetOf(i);
                const active = off === 0;
                const show = Math.abs(off) <= 1;
                const style: React.CSSProperties = reduce
                  ? { opacity: active ? 1 : 0, zIndex: active ? 2 : 0, transform: "translateX(-50%)" }
                  : {
                      transform: `translateX(calc(-50% + ${off * 56}%)) scale(${active ? 1 : 0.86})`,
                      opacity: show ? (active ? 1 : 0.9) : 0,
                      zIndex: active ? 2 : 1,
                      transition: "transform 480ms cubic-bezier(0.22,1,0.36,1), opacity 480ms ease",
                    };
                return (
                  <div
                    key={t.name}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${n}`}
                    aria-hidden={!active}
                    inert={!active}
                    onClick={() => !active && Math.abs(off) <= 1 && go(i)}
                    className={cn("absolute top-0 left-1/2 h-full w-[88%] sm:w-[420px]", !active && "cursor-pointer")}
                    style={style}
                  >
                    <figure
                      className={cn(
                        "flex h-full flex-col rounded-[22px] p-6 sm:p-7",
                        active
                          ? "bg-[linear-gradient(145deg,#1590ec_0%,#0d5df5_45%,#681bf5_100%)] text-white shadow-[0_28px_60px_-24px_rgba(13,93,245,0.55)]"
                          : "border border-white/60 bg-white/55 text-[#2b2e38] shadow-[0_18px_44px_-28px_rgba(20,30,70,0.3)] backdrop-blur-xl"
                      )}
                    >
                      <Quote
                        aria-hidden
                        className={cn("size-8", active ? "text-white/70" : "text-[#0d5df5]/35")}
                        strokeWidth={1.75}
                      />
                      <blockquote className={cn("mt-5 line-clamp-5 text-[15px] leading-[1.6] text-pretty", active ? "text-white" : "text-[#3b3f4a]")}>
                        {t.quote}
                      </blockquote>
                      <figcaption className={cn("mt-auto flex items-center gap-3 border-t pt-5", active ? "border-white/25" : "border-[#e1e5ec]")}>
                        <span
                          className={cn(
                            "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold",
                            active ? "bg-white/20 text-white" : "bg-[#eef1f6] text-[#0d5df5]"
                          )}
                        >
                          {initials(t.name)}
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

            <button type="button" className={cn(arrow, "hidden sm:inline-flex")} onClick={() => go(index + 1)} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index - 1)} aria-label="Previous testimonial">
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
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index + 1)} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">{announce}</p>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

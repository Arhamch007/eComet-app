"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Testimonials, right after "How we work". Three fixed slots (one on
   phones): prev / active / next. The slots themselves never move or
   resize — only the active slot's content changes, and the outgoing and
   incoming quote cross-fade (absolutely positioned inside the fixed-size
   card, so the card itself never reflows). The two side cards just swap
   instantly, in place; they are glass (blurred, translucent) over soft
   colour blobs placed right behind them, and slightly out of focus.
   Bounded, not a loop: the arrows disable at the first/last testimonial
   instead of wrapping. */

function CardBody({ t, active }: { t: (typeof testimonials)[number]; active: boolean }) {
  return (
    <>
      <blockquote className={cn("line-clamp-5 text-[15px] leading-[1.6] text-pretty", active ? "text-white" : "text-[#3b3f4a]")}>
        {t.quote}
      </blockquote>
      <figcaption className={cn("mt-auto flex items-center gap-3 border-t pt-5", active ? "border-white/25" : "border-white/50")}>
        <span className={cn("relative size-10 shrink-0 overflow-hidden rounded-full ring-2", active ? "ring-white/35" : "ring-white/70")}>
          <Image src={t.image} alt="" fill sizes="40px" className="object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[14px] font-semibold">{t.name}</span>
          <span className={cn("block truncate text-[13px]", active ? "text-white/80" : "text-[#6b7080]")}>{t.role}</span>
        </span>
      </figcaption>
    </>
  );
}

export function TestimonialsSection() {
  const n = testimonials.length;
  const [index, setIndex] = React.useState(0);
  const [announce, setAnnounce] = React.useState("");
  const reduce = useReducedMotion();

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

  const slots = [
    { i: index - 1, role: "prev" as const },
    { i: index, role: "active" as const },
    { i: index + 1, role: "next" as const },
  ];

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

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)_minmax(0,0.78fr)] sm:gap-4 md:gap-5">
              {slots.map(({ i, role }) => {
                if (i < 0 || i > n - 1) return <div key={role} className="hidden sm:block" aria-hidden />;
                const t = testimonials[i];
                const active = role === "active";
                return (
                  <figure
                    key={role}
                    onClick={() => !active && go(i)}
                    className={cn(
                      "relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[22px] p-6 sm:min-h-[260px] sm:p-7",
                      role !== "active" && "hidden sm:flex",
                      active
                        ? "bg-[linear-gradient(145deg,#1590ec_0%,#0d5df5_45%,#681bf5_100%)] text-white shadow-[0_28px_60px_-24px_rgba(13,93,245,0.55)]"
                        : "cursor-pointer border border-white/70 bg-white/35 text-[#2b2e38] opacity-90 shadow-[0_18px_44px_-28px_rgba(20,30,70,0.3)] backdrop-blur-lg backdrop-saturate-150 blur-[1.5px] transition-[opacity,filter] duration-200 hover:opacity-100 hover:blur-0"
                    )}
                  >
                    {active ? (
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={t.name}
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? undefined : { opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="absolute inset-0 flex flex-col"
                        >
                          <CardBody t={t} active />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <CardBody t={t} active={false} />
                    )}
                  </figure>
                );
              })}
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

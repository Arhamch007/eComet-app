"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Testimonials, right after "How we work": three cards side by side (one on
   phones), laid out in normal flow so they never overlap. The centre card is
   active: the logo gradient, full size. The two side cards are real glass
   (blurred, translucent, saturated) over soft colour blobs placed right
   behind them so the effect actually reads, and are slightly smaller and
   dimmed. Arrow keys, buttons and dots all move the same index; a slide
   crossfades in from the direction of travel; reduced motion skips that. */

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function at(i: number, n: number) {
  return ((i % n) + n) % n;
}

/* Variants read `custom` (the travel direction) at the moment each card
   enters or leaves, not at render time, so the exiting card always leaves
   the way the new one is arriving from. Using a fixed exit value from
   component state got the direction wrong on fast clicks and looked janky. */
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -dir * 90 }),
};

export function TestimonialsSection() {
  const n = testimonials.length;
  const [[index, dir], setState] = React.useState<[number, number]>([0, 0]);
  const [announce, setAnnounce] = React.useState("");
  const reduce = useReducedMotion();

  const go = React.useCallback(
    (next: number, direction: number) => {
      setState(([i]) => [at(next, n), direction]);
      setAnnounce(`Testimonial ${at(next, n) + 1} of ${n}`);
    },
    [n]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1, 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1, -1); }
  };

  const slots = [
    { i: at(index - 1, n), role: "prev" as const },
    { i: index, role: "active" as const },
    { i: at(index + 1, n), role: "next" as const },
  ];

  const arrow =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e1e5ec] bg-white text-[#555555] transition-colors duration-200 hover:border-[#1590ec]/60 hover:text-[#0d5df5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d5df5]";

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
            <button type="button" className={cn(arrow, "mt-[108px] hidden self-start sm:inline-flex")} onClick={() => go(index - 1, -1)} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  variants={slideVariants}
                  initial={reduce ? false : "enter"}
                  animate="center"
                  exit={reduce ? undefined : "exit"}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ willChange: "transform, opacity" }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)_minmax(0,0.78fr)] sm:gap-4 md:gap-5"
                >
                  {slots.map(({ i, role }) => {
                    const t = testimonials[i];
                    const active = role === "active";
                    return (
                      <figure
                        key={role}
                        onClick={() => !active && go(i, role === "next" ? 1 : -1)}
                        className={cn(
                          "flex h-full min-h-[300px] flex-col rounded-[22px] p-6 sm:min-h-[260px] sm:p-7",
                          role !== "active" && "hidden sm:flex",
                          active
                            ? "bg-[linear-gradient(145deg,#1590ec_0%,#0d5df5_45%,#681bf5_100%)] text-white shadow-[0_28px_60px_-24px_rgba(13,93,245,0.55)]"
                            : "cursor-pointer border border-white/70 bg-white/35 text-[#2b2e38] opacity-90 shadow-[0_18px_44px_-28px_rgba(20,30,70,0.3)] backdrop-blur-lg backdrop-saturate-150 blur-[1.5px] will-change-transform transition-[opacity,filter] duration-200 hover:opacity-100 hover:blur-0"
                        )}
                      >
                        <blockquote className={cn("line-clamp-5 text-[15px] leading-[1.6] text-pretty", active ? "text-white" : "text-[#3b3f4a]")}>
                          {t.quote}
                        </blockquote>
                        <figcaption className={cn("mt-auto flex items-center gap-3 border-t pt-5", active ? "border-white/25" : "border-white/50")}>
                          <span
                            className={cn(
                              "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold",
                              active ? "bg-white/20 text-white" : "bg-white/70 text-[#0d5df5]"
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
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <button type="button" className={cn(arrow, "mt-[108px] hidden self-start sm:inline-flex")} onClick={() => go(index + 1, 1)} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index - 1, -1)} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
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
            <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index + 1, 1)} aria-label="Next testimonial">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">{announce}</p>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

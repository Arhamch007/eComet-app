"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import { process } from "@/content/process";
import { LandingContainer, LandingHeading, LandingSection, palette } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* How we work: the four steps from content/process.ts as one path.
   - lg: a row of four; between each pair of steps runs a short comet trail of
     rounded dashes that grow and brighten towards the next step, shifting
     through the logo palette (aqua > ocean > blue > indigo).
   - md: 2 x 2 grid without trails.
   - mobile: stacked, marker on the left, the trail runs vertically.
   A one-time fade/rise as the list enters view; MotionConfig drops the
   movement for visitors who ask for reduced motion. */

const stops = [palette.aqua, palette.ocean, palette.blue, palette.indigo];

/* Static class strings per step (kept literal so Tailwind picks them up).
   Icon colours are deepened where needed to reach 3:1 against the tint. */
const markers = [
  "bg-[#01e2f8]/12 ring-[#01e2f8]/45 text-[#0596c7]",
  "bg-[#1590ec]/10 ring-[#1590ec]/40 text-[#1480d6]",
  "bg-[#0d5df5]/10 ring-[#0d5df5]/35 text-[#0d5df5]",
  "bg-[#681bf5]/10 ring-[#681bf5]/35 text-[#681bf5]",
];

/* Dash lengths (relative) for one trail segment: short and faint at the
   start, long and solid as it reaches the next step, like the logo's trail. */
const dashes = [2, 3, 4, 6, 8, 11, 15, 20];

function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const trail: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay: 0.25 } },
};

function Trail({ from, to, vertical = false, className }: { from: string; to: string; vertical?: boolean; className?: string }) {
  return (
    <motion.span
      aria-hidden
      variants={trail}
      className={cn("pointer-events-none absolute flex", vertical ? "flex-col gap-[5px]" : "items-center gap-[6px]", className)}
    >
      {dashes.map((len, i) => {
        const t = i / (dashes.length - 1);
        return (
          <span
            key={i}
            className={cn("block rounded-full", vertical ? "w-[4px]" : "h-[4px]")}
            style={{ flex: `${len} 1 0`, backgroundColor: mix(from, to, t), opacity: 0.35 + 0.65 * t }}
          />
        );
      })}
    </motion.span>
  );
}

export function ProcessSection() {
  return (
    <LandingSection id="process" tone="white" labelledBy="process-heading" className="font-[family-name:var(--font-figtree)]">
      <LandingContainer>
        <LandingHeading
          id="process-heading"
          kicker="How we work"
          title="From first call to launch, in four clear steps"
          lead="Every project follows the same path, so you always know what happens next, who is doing it and what it costs."
        />

        <MotionConfig reducedMotion="user">
          <motion.ol
            variants={list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-8"
          >
            {process.map((step, i) => {
              const Icon = step.icon;
              const last = i === process.length - 1;
              const next = stops[Math.min(i + 1, stops.length - 1)];
              return (
                <motion.li key={step.n} variants={item} className="relative flex gap-5 md:block">
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 grid size-14 shrink-0 place-items-center rounded-full ring-1 ring-inset",
                      markers[i]
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.9} />
                  </span>

                  {!last ? (
                    <>
                      {/* mobile: vertical trail down to the next marker */}
                      <Trail
                        vertical
                        from={stops[i]}
                        to={next}
                        className="top-[68px] bottom-[-28px] left-[26px] md:hidden"
                      />
                      {/* desktop: horizontal trail across to the next marker */}
                      <Trail from={stops[i]} to={next} className="top-[26px] right-[-20px] left-[70px] hidden lg:flex" />
                    </>
                  ) : null}

                  <div className="min-w-0 pt-1 md:mt-6 md:pt-0">
                    <p className="text-[13px] font-semibold tracking-[0.04em] text-[#6b7080] tabular-nums">
                      Step {step.n}
                    </p>
                    <h3 className="mt-1.5 text-[19px] leading-[1.25] font-bold tracking-[-0.015em] text-[#141414]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[420px] text-[15px] leading-[1.6] text-pretty text-[#555555]">{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </MotionConfig>
      </LandingContainer>
    </LandingSection>
  );
}

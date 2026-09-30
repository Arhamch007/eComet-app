"use client";

import { motion, MotionConfig, type Variants } from "motion/react";
import { process } from "@/content/process";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* How we work: the four steps from content/process.ts, joined by a plain
   hairline (row of four on lg, 2 x 2 on md, stacked on phones). A one-time
   fade/rise as the list enters view; MotionConfig drops the movement for
   visitors who ask for reduced motion. */

/* Static class strings per step (kept literal so Tailwind picks them up).
   Solid logo-gradient discs with white icons (same as the services tiles). */
const markers = [
  "bg-[linear-gradient(135deg,#01e2f8,#1590ec)] text-white shadow-[0_8px_18px_-8px_rgba(1,226,248,0.7)]",
  "bg-[linear-gradient(135deg,#1590ec,#0d5df5)] text-white shadow-[0_8px_18px_-8px_rgba(21,144,236,0.7)]",
  "bg-[linear-gradient(135deg,#0d5df5,#681bf5)] text-white shadow-[0_8px_18px_-8px_rgba(13,93,245,0.65)]",
  "bg-[linear-gradient(135deg,#681bf5,#0d5df5)] text-white shadow-[0_8px_18px_-8px_rgba(104,27,245,0.6)]",
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ProcessSection() {
  return (
    <LandingSection id="process" tone="white" labelledBy="process-heading" className="font-[family-name:var(--font-figtree)]">
      <LandingContainer>
        <LandingHeading
          id="process-heading"
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
              return (
                <motion.li key={step.n} variants={item} className="relative flex gap-5 md:block">
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 grid size-14 shrink-0 place-items-center rounded-full",
                      markers[i]
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.9} />
                  </span>

                  {!last ? (
                    <>
                      {/* plain hairline to the next step: vertical on phones, horizontal on lg */}
                      <span aria-hidden className="absolute top-[64px] bottom-[-36px] left-[27px] w-px bg-[#e1e4ea] md:hidden" />
                      <span aria-hidden className="absolute top-[28px] right-[-24px] left-[72px] hidden h-px bg-[#e1e4ea] lg:block" />
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

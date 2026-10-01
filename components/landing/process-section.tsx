"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { process } from "@/content/process";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* How we work, drawn as a comet's path (from the eComet name and logo).
   Desktop: a wave runs across the section with the four steps sitting on it,
   alternating high and low. As the section scrolls through the viewport the
   wave fills with the logo gradient behind a glowing comet head, and each
   step lights up (grey ring -> gradient disc) when the comet reaches it.
   Phones and tablets: the same idea runs top to bottom down the left edge.
   Reduced motion: the path is drawn in full and every step is lit. */

// Wave through the four stations in a 1000 x 180 box (stretched to fit).
const WAVE = "M0,125 C50,140 80,150 125,150 S290,80 375,80 S540,150 625,150 S790,80 875,80 S960,90 1000,85";
const STATIONS = [
  { x: 12.5, y: 150 / 180 },
  { x: 37.5, y: 80 / 180 },
  { x: 62.5, y: 150 / 180 },
  { x: 87.5, y: 80 / 180 },
];
// Path progress (0..1) at which the comet reaches each station.
const AT = [0.13, 0.38, 0.62, 0.87];

function StepMarker({ lit, Icon }: { lit: boolean; Icon: React.ElementType }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-14 shrink-0 place-items-center rounded-full border-2 bg-white transition-[border-color,box-shadow,color] duration-500",
        lit
          ? "border-transparent text-white shadow-[0_10px_30px_-8px_rgba(13,93,245,0.6)]"
          : "border-[#dfe3ea] text-[#9aa0ad]"
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-[linear-gradient(135deg,#01e2f8,#1590ec_35%,#0d5df5_65%,#681bf5)] transition-opacity duration-500",
          lit ? "opacity-100" : "opacity-0"
        )}
      />
      <Icon className="relative size-6" strokeWidth={1.9} />
    </span>
  );
}

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const length = useTransform(smooth, [0, 1], [0.02, 1]);
  const [progress, setProgress] = React.useState(0);
  useMotionValueEvent(smooth, "change", (v) => setProgress(v));
  const p = reduce ? 1 : progress;

  // comet head position along the drawn wave (desktop)
  const pathRef = React.useRef<SVGPathElement>(null);
  const [head, setHead] = React.useState({ x: 0, y: 125 });
  const [total, setTotal] = React.useState(0);
  const f = 0.02 + 0.98 * Math.min(1, Math.max(0, p));
  React.useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const t = el.getTotalLength();
    const pt = el.getPointAtLength(f * t);
    setTotal(t);
    setHead({ x: pt.x, y: pt.y });
  }, [f]);

  return (
    <LandingSection id="process" tone="white" labelledBy="process-heading" className="overflow-hidden">
      <LandingContainer>
        <LandingHeading
          id="process-heading"
          title="From first call to launch, in four clear steps"
          lead="Every project follows the same path, so you always know what happens next, who is doing it and what it costs."
        />

        <div ref={ref} className="relative mt-10 md:mt-12">
          {/* ---------- desktop: comet path ---------- */}
          <div className="relative hidden h-[180px] lg:block">
            <svg viewBox="0 0 1000 180" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="comet-path" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#01e2f8" />
                  <stop offset="0.35" stopColor="#1590ec" />
                  <stop offset="0.7" stopColor="#0d5df5" />
                  <stop offset="1" stopColor="#681bf5" />
                </linearGradient>
              </defs>
              <path d={WAVE} fill="none" stroke="#b9c1cf" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path ref={pathRef} d={WAVE} fill="none" stroke="none" />
              {/* filled part: dash offset from the same progress as the comet head */}
              <path
                d={WAVE}
                fill="none"
                stroke="url(#comet-path)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={total || undefined}
                strokeDashoffset={total ? total * (1 - f) : undefined}
              />
            </svg>
            {!reduce ? (
              <span
                aria-hidden
                className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(13,93,245,0.25),0_0_24px_8px_rgba(1,226,248,0.55)] transition-opacity duration-300"
                style={{ left: `${head.x / 10}%`, top: `${(head.y / 180) * 100}%`, opacity: p > 0.03 && p < 0.99 ? 1 : 0 }}
              />
            ) : null}
            {process.map((step, i) => (
              <div
                key={step.n}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${STATIONS[i].x}%`, top: `${STATIONS[i].y * 100}%` }}
              >
                <StepMarker lit={p >= AT[i]} Icon={step.icon} />
              </div>
            ))}
          </div>

          <ol className="mt-8 hidden grid-cols-4 gap-8 lg:grid">
            {process.map((step, i) => (
              <li key={step.n} className={cn("text-center transition-opacity duration-500", p >= AT[i] ? "opacity-100" : "opacity-75")}>
                <p className="text-[13px] font-semibold tracking-[0.04em] text-[#6b7080] tabular-nums">{step.n}</p>
                <h3 className="mt-1 text-[19px] leading-[1.25] font-bold tracking-[-0.015em] text-[#141414]">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[250px] text-[15px] leading-[1.6] text-pretty text-[#555555]">{step.text}</p>
              </li>
            ))}
          </ol>

          {/* ---------- phones and tablets: vertical path ---------- */}
          <ol className="relative lg:hidden">
            <span aria-hidden className="absolute top-2 bottom-2 left-[27px] w-[2px] rounded-full bg-[#cfd5df]" />
            <motion.span
              aria-hidden
              className="absolute top-2 bottom-2 left-[27px] w-[2px] origin-top rounded-full bg-[linear-gradient(180deg,#01e2f8,#1590ec_35%,#0d5df5_70%,#681bf5)]"
              style={{ scaleY: reduce ? 1 : length }}
            />
            {process.map((step, i) => (
              <li key={step.n} className="relative flex gap-5 pb-10 last:pb-0">
                <StepMarker lit={p >= AT[i] - 0.05} Icon={step.icon} />
                <div className="min-w-0 pt-1">
                  <p className="text-[13px] font-semibold tracking-[0.04em] text-[#6b7080] tabular-nums">{step.n}</p>
                  <h3 className="mt-1 text-[18px] leading-[1.25] font-bold tracking-[-0.015em] text-[#141414]">{step.title}</h3>
                  <p className="mt-2 max-w-[460px] text-[15px] leading-[1.6] text-pretty text-[#555555]">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* Adapted from Magic UI Scroll Based Velocity (MIT). One row only per page.
   Adds a pause control (WCAG 2.2.2), pauses off-screen and on hidden tabs,
   and holds base speed under prefers-reduced-motion. */

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type TickerProps = React.HTMLAttributes<HTMLDivElement> & {
  baseVelocity?: number;
  direction?: 1 | -1;
  scrollReactivity?: boolean;
  label?: string;
};

export function Ticker({
  children,
  baseVelocity = 4,
  direction = 1,
  scrollReactivity = true,
  label = "Logo ticker",
  className,
  ...props
}: TickerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const blockRef = React.useRef<HTMLDivElement>(null);
  const [copies, setCopies] = React.useState(3);
  const [paused, setPaused] = React.useState(false);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, (v) => {
    const sign = v < 0 ? -1 : 1;
    return sign * Math.min(5, (Math.abs(v) / 1000) * 5);
  });

  const baseX = useMotionValue(0);
  const unitWidth = useMotionValue(0);
  const dirRef = React.useRef<number>(direction);
  const inViewRef = React.useRef(true);
  const visibleRef = React.useRef(true);
  const prmRef = React.useRef(false);

  React.useEffect(() => {
    const container = containerRef.current;
    const block = blockRef.current;
    if (!container || !block) return;
    const update = () => {
      const cw = container.offsetWidth || 0;
      const bw = block.scrollWidth || 0;
      unitWidth.set(bw);
      setCopies(bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 3);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    ro.observe(block);
    const io = new IntersectionObserver(([e]) => (inViewRef.current = e.isIntersecting));
    io.observe(container);
    const onVis = () => (visibleRef.current = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPrm = () => (prmRef.current = mq.matches);
    onPrm();
    mq.addEventListener("change", onPrm);
    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener("change", onPrm);
    };
  }, [children, unitWidth]);

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1;
    return `${-wrap(0, width, Number(v) || 0)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (paused || !inViewRef.current || !visibleRef.current) return;
    const vf = scrollReactivity ? velocityFactor.get() : 0;
    const abs = Math.min(5, Math.abs(vf));
    if (abs > 0.1) dirRef.current = direction * (vf >= 0 ? 1 : -1);
    const bw = unitWidth.get() || 0;
    if (bw <= 0) return;
    const speed = prmRef.current ? 1 : 1 + abs;
    baseX.set(baseX.get() + dirRef.current * ((bw * baseVelocity) / 100) * speed * (delta / 1000));
  });

  return (
    <div className={cn("relative", className)} {...props}>
      <div ref={containerRef} className="noise-edge w-full overflow-hidden whitespace-nowrap" aria-label={label} role="group">
        <motion.div className="inline-flex transform-gpu items-center will-change-transform select-none" style={{ x }}>
          {Array.from({ length: copies }).map((_, i) => (
            <div key={i} ref={i === 0 ? blockRef : null} aria-hidden={i !== 0} className="inline-flex shrink-0 items-center">
              {children}
            </div>
          ))}
        </motion.div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play ticker" : "Pause ticker"}
        className="absolute top-1/2 right-2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-1 bg-bg-0/80 text-text-3 backdrop-blur-sm transition-colors hover:text-text-1 focus-visible:outline-2 focus-visible:outline-accent/50"
      >
        {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
      </button>
    </div>
  );
}

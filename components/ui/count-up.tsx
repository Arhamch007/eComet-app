"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/* Counts up once when scrolled into view; renders the final value on the
   server and under reduced motion. Tabular numerals prevent width jitter. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 0.9,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const format = React.useCallback(
    (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`,
    [prefix, suffix, decimals]
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration, format]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {format(value)}
    </span>
  );
}

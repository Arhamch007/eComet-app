"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* 3D coverflow carousel modelled on the Stackworx testimonial and team bands,
   with what theirs lacks: the ARIA carousel pattern, keyboard control
   (arrows, Home, End), inert hidden slides, a polite live region, pointer
   drag with a threshold, and a flat crossfade under reduced motion. */

type Slot = { x: number; rotate: number; scale: number; blur: number; opacity: number; z: number; origin: string };

function slotFor(offset: number, spread: [number, number]): Slot {
  const a = Math.abs(offset);
  const dir = Math.sign(offset);
  if (a === 0) return { x: 0, rotate: 0, scale: 1, blur: 0, opacity: 1, z: 5, origin: "50% 50%" };
  if (a === 1)
    return { x: dir * spread[0], rotate: -dir * 18, scale: 0.94, blur: 2, opacity: 0.8, z: 4, origin: dir > 0 ? "0% 50%" : "100% 50%" };
  if (a === 2)
    return { x: dir * spread[1], rotate: -dir * 28, scale: 0.88, blur: 4, opacity: 0.5, z: 3, origin: dir > 0 ? "0% 50%" : "100% 50%" };
  return { x: 0, rotate: 0, scale: 0.8, blur: 5, opacity: 0, z: 0, origin: "50% 50%" };
}

export function Coverflow<T>({
  items,
  renderItem,
  getKey,
  label,
  cardWidth = 460,
  cardHeight = 460,
  spread = [250, 440],
  className,
}: {
  items: T[];
  renderItem: (item: T, active: boolean) => React.ReactNode;
  getKey: (item: T) => string;
  label: string;
  cardWidth?: number;
  cardHeight?: number;
  spread?: [number, number];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [announce, setAnnounce] = React.useState("");
  const reduce = useReducedMotion();
  const n = items.length;
  const drag = React.useRef<{ x: number; id: number } | null>(null);

  const go = React.useCallback(
    (next: number) => {
      const i = ((next % n) + n) % n;
      setIndex(i);
      setAnnounce(`Slide ${i + 1} of ${n}`);
    },
    [n]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(n - 1); }
  };

  const offsetOf = (i: number) => {
    let d = i - index;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const arrow =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white/80 transition-colors hover:border-signal hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn("rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal", className)}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <button type="button" className={cn(arrow, "hidden sm:inline-flex")} onClick={() => go(index - 1)} aria-label="Previous slide">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div
          className="relative flex-1 touch-pan-y select-none overflow-hidden"
          style={{ height: `min(${cardHeight}px, calc(100vw - 2.5rem + 40px))`, perspective: 1400 }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, id: e.pointerId };
          }}
          onPointerUp={(e) => {
            if (!drag.current) return;
            const dx = e.clientX - drag.current.x;
            drag.current = null;
            if (Math.abs(dx) > 60) go(index + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => (drag.current = null)}
        >
          {items.map((item, i) => {
            const off = offsetOf(i);
            const s = slotFor(off, spread);
            const active = off === 0;
            const style: React.CSSProperties = reduce
              ? { opacity: active ? 1 : 0, zIndex: active ? 5 : 0, transform: "translateX(-50%)", transition: "opacity 300ms ease" }
              : {
                  transform: `translateX(calc(-50% + ${s.x}px)) rotateY(${s.rotate}deg) scale(${s.scale})`,
                  transformOrigin: s.origin,
                  filter: s.blur ? `blur(${s.blur}px)` : undefined,
                  opacity: s.opacity,
                  zIndex: s.z,
                  transition:
                    "transform 520ms cubic-bezier(0.22,1,0.36,1), filter 520ms ease, opacity 520ms ease",
                };
            return (
              <div
                key={getKey(item)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={!active}
                inert={!active}
                onClick={() => !active && Math.abs(off) <= 2 && go(i)}
                className={cn("absolute top-0 left-1/2 h-full", !active && "cursor-pointer")}
                style={{ width: `min(${cardWidth}px, calc(100vw - 2.5rem))`, ...style }}
              >
                {renderItem(item, active)}
              </div>
            );
          })}
        </div>
        <button type="button" className={cn(arrow, "hidden sm:inline-flex")} onClick={() => go(index + 1)} aria-label="Next slide">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index - 1)} aria-label="Previous slide">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <div className="flex items-center gap-1">
          {items.map((item, i) => (
            <button
              key={getKey(item)}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className="group inline-flex h-6 items-center px-1 focus-visible:outline-2 focus-visible:outline-signal"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-200",
                  i === index ? "w-6 bg-signal" : "w-2 bg-white/25 group-hover:bg-white/50"
                )}
              />
            </button>
          ))}
        </div>
        <button type="button" className={cn(arrow, "size-10 sm:hidden")} onClick={() => go(index + 1)} aria-label="Next slide">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}

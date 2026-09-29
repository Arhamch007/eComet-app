"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/* Adapted from the 21st.dev "Floating Icons Hero Section" (@ravikatiyar162)
   supplied in the brief. Changes for production:
   - one pointer listener for the whole section (rAF-throttled), not one
     window listener per icon; skipped entirely on touch devices
   - deterministic float durations (no Math.random in render)
   - float loop pauses when the hero is off-screen and is disabled under
     prefers-reduced-motion
   - opaque white tiles instead of backdrop-blur (cheaper on phones)
   - icons are decorative (aria-hidden); the content column carries meaning */

export type FloatingIcon = {
  id: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Tailwind position classes, e.g. "top-[10%] left-[8%]"; add "hidden md:flex" for desktop-only */
  className: string;
};

type PointerRef = React.MutableRefObject<{ x: number; y: number; active: boolean }>;
type Subscriber = () => void;

const PointerContext = React.createContext<{
  pointer: PointerRef;
  subscribe: (fn: Subscriber) => () => void;
} | null>(null);

function FloatingTile({
  data,
  index,
  animate,
}: {
  data: FloatingIcon;
  index: number;
  animate: boolean;
}) {
  const ctx = React.useContext(PointerContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    if (!ctx) return;
    return ctx.subscribe(() => {
      const el = ref.current;
      const p = ctx.pointer.current;
      if (!el || !p.active) {
        x.set(0);
        y.set(0);
        return;
      }
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(p.x - cx, p.y - cy);
      if (dist < 150) {
        const angle = Math.atan2(p.y - cy, p.x - cx);
        const force = (1 - dist / 150) * 45;
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    });
  }, [ctx, x, y]);

  const duration = 6 + ((index * 37) % 40) / 10; // 6.0 to 9.9 s, stable across renders

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute flex", data.className)}
    >
      <motion.div
        className="flex size-12 items-center justify-center rounded-2xl border border-border-1 bg-white p-2.5 shadow-[var(--shadow-tile)] md:size-[76px] md:rounded-3xl md:p-4"
        animate={
          animate
            ? { y: [0, -8, 0, 8, 0], x: [0, 5, 0, -5, 0], rotate: [0, 4, 0, -4, 0] }
            : { y: 0, x: 0, rotate: 0 }
        }
        transition={
          animate
            ? { duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        <data.Icon className="size-6 md:size-10" />
      </motion.div>
    </motion.div>
  );
}

export function FloatingIconsHero({
  icons,
  children,
  className,
}: {
  icons: FloatingIcon[];
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const pointer = React.useRef({ x: 0, y: 0, active: false });
  const subscribers = React.useRef(new Set<Subscriber>());
  const frame = React.useRef<number | null>(null);
  const [finePointer, setFinePointer] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const notify = React.useCallback(() => {
    if (frame.current != null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      subscribers.current.forEach((fn) => fn());
    });
  }, []);

  React.useEffect(() => () => {
    if (frame.current != null) cancelAnimationFrame(frame.current);
  }, []);

  const ctx = React.useMemo(
    () => ({
      pointer,
      subscribe: (fn: Subscriber) => {
        subscribers.current.add(fn);
        return () => {
          subscribers.current.delete(fn);
        };
      },
    }),
    []
  );

  const interactive = finePointer && !reduce;

  return (
    <PointerContext.Provider value={ctx}>
      <section
        ref={sectionRef}
        onPointerMove={
          interactive
            ? (e) => {
                pointer.current = { x: e.clientX, y: e.clientY, active: true };
                notify();
              }
            : undefined
        }
        onPointerLeave={
          interactive
            ? () => {
                pointer.current.active = false;
                notify();
              }
            : undefined
        }
        className={cn("relative isolate flex w-full items-center justify-center overflow-hidden", className)}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          {icons.map((icon, i) => (
            <FloatingTile key={icon.id} data={icon} index={i} animate={inView && !reduce} />
          ))}
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </section>
    </PointerContext.Provider>
  );
}

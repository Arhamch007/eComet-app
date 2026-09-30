import * as React from "react";
import { cn } from "@/lib/utils";

/* CSS-only marquee (Stackworx logo band and service ticker, upgraded):
   the clone is aria-hidden, edges fade with a mask, it pauses on hover and
   keyboard focus, and it stops under prefers-reduced-motion. */
export function Marquee({
  children,
  duration = 60,
  reverse = false,
  label,
  className,
  trackClassName,
  fadeColor,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  label?: string;
  className?: string;
  trackClassName?: string;
  /** Paint edge fades as static overlays in this colour instead of a mask
      (cheaper: the moving track is not re-masked every frame). */
  fadeColor?: string;
}) {
  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn("marquee relative overflow-hidden", !fadeColor && "mask-fade-x", className)}
    >
      <div
        className={cn("marquee-track flex w-max", trackClassName)}
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
      {fadeColor ? (
        <>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] min-w-10" style={{ background: `linear-gradient(90deg, ${fadeColor}, transparent)` }} />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] min-w-10" style={{ background: `linear-gradient(270deg, ${fadeColor}, transparent)` }} />
        </>
      ) : null}
    </div>
  );
}

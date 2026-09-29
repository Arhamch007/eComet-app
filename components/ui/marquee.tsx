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
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  label?: string;
  className?: string;
  trackClassName?: string;
}) {
  return (
    <div
      role={label ? "region" : undefined}
      aria-label={label}
      className={cn("marquee mask-fade-x relative overflow-hidden", className)}
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
    </div>
  );
}

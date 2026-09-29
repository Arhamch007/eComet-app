"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* Adapted from Magic UI Interactive Grid Pattern (MIT): decorative, hidden from
   assistive tech, no outer border, tinted with the violet token. Static on touch. */

type Props = React.SVGProps<SVGSVGElement> & {
  width?: number;
  height?: number;
  squares?: [number, number];
  squaresClassName?: string;
};

export function InteractiveGrid({
  width = 48,
  height = 48,
  squares = [40, 20],
  className,
  squaresClassName,
  ...props
}: Props) {
  const [horizontal, vertical] = squares;
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <svg
      aria-hidden="true"
      width={width * horizontal}
      height={height * vertical}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "pointer-events-auto stroke-white/[0.06] transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hovered === index ? "fill-comet-violet/15" : "fill-transparent",
              squaresClassName
            )}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          />
        );
      })}
    </svg>
  );
}

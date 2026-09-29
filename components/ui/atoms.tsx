import * as React from "react";
import { cn } from "@/lib/utils";

/* Small atoms derived from the Stackworx study, mapped to eComet blue. */

export function SignalSquare({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 shrink-0 rounded-[1px] bg-signal", className)} />;
}

/** Navy tag pill with a signal square: the most reused atom. */
export function TagPill({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold uppercase leading-none tracking-[0.07em]",
        tone === "dark" ? "bg-btn-dark text-white" : "bg-tint text-blue-700",
        className
      )}
    >
      <SignalSquare className={tone === "light" ? "bg-accent" : undefined} />
      {children}
    </span>
  );
}

/**
 * Stepped pixel-block cluster (Stackworx signature), drawn as a CSS grid so
 * it never becomes an image request or the LCP element.
 * pattern: rows of 0/1/2 (0 empty, 1 primary, 2 secondary tone).
 */
export function PixelBlocks({
  pattern,
  cell = 40,
  primary = "bg-signal",
  secondary = "bg-accent",
  className,
}: {
  pattern: number[][];
  cell?: number;
  primary?: string;
  secondary?: string;
  className?: string;
}) {
  const cols = Math.max(...pattern.map((r) => r.length));
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none grid", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gridAutoRows: `${cell}px` }}
    >
      {pattern.flatMap((row, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const v = row[c] ?? 0;
          return <span key={`${r}-${c}`} className={v === 1 ? primary : v === 2 ? secondary : undefined} />;
        })
      )}
    </div>
  );
}

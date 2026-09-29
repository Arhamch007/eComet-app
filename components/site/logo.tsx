import * as React from "react";
import { cn } from "@/lib/utils";

/* PLACEHOLDER MARK. The master comet "e" logo file was not available in the
   repository (design-audit Open Question 1). This SVG approximates the brief:
   a comet-shaped "e" carrying the cyan -> blue -> violet -> magenta gradient.
   Replace the <CometMark> paths with the real artwork when supplied. */

export function CometMark({ className, title = "eComet" }: { className?: string; title?: string }) {
  const id = React.useId();
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-8", className)}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.35" stopColor="#3b82f6" />
          <stop offset="0.7" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* e bowl: open ring */}
      <path
        d="M36.5 26.5c.3-1 .5-2 .5-3 0-7.2-5.8-13-13-13s-13 5.8-13 13 5.8 13 13 13c4.4 0 8.3-2.2 10.6-5.6"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* e crossbar */}
      <path
        d="M12.5 23.5h24"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* comet tail */}
      <path
        d="M34.5 12.5 45 2"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M39 16.5 46 9.5"
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CometMark />
      {wordmark ? (
        <span className="font-display text-[22px] font-semibold tracking-tight text-text-1">
          eComet
        </span>
      ) : null}
    </span>
  );
}

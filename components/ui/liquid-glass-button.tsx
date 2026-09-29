import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* Liquid glass pill, adapted from the 21st.dev "Liquid Glass Button" and
   restyled for the eComet palette (#01E2F8, #1590EC, #0D5DF5, #681BF5):
   frosted backdrop, bright top highlight instead of the dark bevel, and a
   logo-gradient fill (tint) or logo-gradient rim (clear). Renders a Next.js
   Link; no scale or movement on hover (styles in app/globals.css). */

type Tone = "tint" | "clear";

export function LiquidGlassLink({
  href,
  tone = "tint",
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  tone?: Tone;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "liquid-glass group relative isolate inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40",
        tone === "tint" ? "liquid-glass--tint" : "liquid-glass--clear",
        className
      )}
      {...props}
    >
      {/* frosted glass behind the tint */}
      <span aria-hidden className="liquid-glass__refract absolute inset-0 -z-20 rounded-full" />
      {/* logo-palette tint, deepens on hover */}
      <span aria-hidden className="liquid-glass__tint absolute inset-0 -z-10 rounded-full" />
      {/* glass highlight */}
      <span aria-hidden className="liquid-glass__bevel pointer-events-none absolute inset-0 z-0 rounded-full" />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Link>
  );
}


import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* Liquid glass pill, adapted from the 21st.dev "Liquid Glass Button":
   - same layered inset shadows and SVG displacement filter for the glass edge
   - a light tint in the logo palette (Electric Aqua #01E2F8, Bright Ocean
     #1590EC, Full Spectrum Blue #0D5DF5, Electric Indigo #681BF5)
   - renders a Next.js Link, so it works for navigation
   - no scale or movement on hover: only the tint deepens (0.2s fade in/out)
   - the SVG filter is defined once per page by <GlassFilterDefs />, not once
     per button (duplicate ids) */

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
        "liquid-glass group relative isolate inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-[#141414] outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40",
        tone === "tint" ? "liquid-glass--tint" : "liquid-glass--clear",
        className
      )}
      {...props}
    >
      {/* glass distortion behind the tint (Chromium; other browsers fall back to blur) */}
      <span aria-hidden className="liquid-glass__refract absolute inset-0 -z-20 rounded-full" />
      {/* logo-palette tint, deepens on hover */}
      <span aria-hidden className="liquid-glass__tint absolute inset-0 -z-10 rounded-full" />
      {/* bevel: the component's inset shadow stack */}
      <span aria-hidden className="liquid-glass__bevel pointer-events-none absolute inset-0 z-0 rounded-full" />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </Link>
  );
}

/* Render once per page (the hero does this). */
export function GlassFilterDefs() {
  return (
    <svg aria-hidden className="absolute h-0 w-0 overflow-hidden" focusable="false">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

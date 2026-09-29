import * as React from "react";
import { cn } from "@/lib/utils";

/* Shared building blocks for the single-page landing (app/page.tsx).
   Design rules for every landing section:
   - Font: Figtree (inherited from <main> in app/page.tsx).
   - Ink #141414, body #555555, muted #6b7080, hairline #e7e9ef.
   - Logo palette (no black): aqua #01E2F8, ocean #1590EC, blue #0D5DF5,
     indigo #681BF5. Page backgrounds: #f6f6f7 (hero, alt) and #ffffff.
   - Cards: white, 1px #e7e9ef border, 24px radius, soft shadow.
   - Hover: colour/shadow/border only, 200ms. Nothing moves or scales.
   - No square or dot markers before labels, no numbered giant columns,
     no navy tag pills, no pixel blocks (competitor signatures).
   - Honest content only: no invented numbers, clients or testimonials. */

export const palette = {
  aqua: "#01E2F8",
  ocean: "#1590EC",
  blue: "#0D5DF5",
  indigo: "#681BF5",
} as const;

export const logoGradient = "linear-gradient(100deg, #01e2f8 0%, #1590ec 32%, #0d5df5 68%, #681bf5 100%)";

export function LandingContainer({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1120px] px-5 sm:px-6", className)}>{children}</div>;
}

export function LandingSection({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "white" | "alt";
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 py-20 md:py-28", tone === "alt" ? "bg-[#f6f6f7]" : "bg-white", className)}
    >
      {children}
    </section>
  );
}

/** Small gradient-text label above a heading. */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "bg-[linear-gradient(100deg,#1590ec,#0d5df5_55%,#681bf5)] bg-clip-text text-[13px] font-semibold tracking-[0.12em] text-transparent uppercase",
        className
      )}
    >
      {children}
    </p>
  );
}

export function LandingHeading({
  id,
  kicker,
  title,
  lead,
  align = "center",
  className,
}: {
  id: string;
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("max-w-[640px]", align === "center" && "mx-auto text-center", className)}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2
        id={id}
        className="mt-3 text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-[#141414] md:text-[40px]"
      >
        {title}
      </h2>
      {lead ? <p className="mt-4 text-[16px] leading-[1.6] text-pretty text-[#555555] md:text-[17px]">{lead}</p> : null}
    </div>
  );
}

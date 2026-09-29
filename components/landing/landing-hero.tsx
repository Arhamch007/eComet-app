import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { HeroWaves } from "@/components/landing/hero-waves";
import { LiquidGlassLink } from "@/components/ui/liquid-glass-button";

/* Minimal centred hero (approved reference: floating pill nav, a large
   regular-weight headline and dark pill buttons) over soft light ribbons in
   the logo colours (see HeroWaves). */

/* Hero buttons: liquid glass pills in the logo palette, one-line labels. */
function HeroButton({
  href,
  icon,
  label,
  tone,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  tone: "tint" | "clear";
}) {
  return (
    <LiquidGlassLink href={href} tone={tone} className="h-11 w-full max-w-[280px] gap-2 px-5 whitespace-nowrap sm:w-auto">
      <span aria-hidden className={tone === "tint" ? "shrink-0 text-white" : "shrink-0 text-[#0d5df5]"}>
        {icon}
      </span>
      <span className="text-[14px] font-semibold tracking-[-0.01em]">{label}</span>
    </LiquidGlassLink>
  );
}

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#f6f6f7] px-5 pt-32 pb-20 font-[family-name:var(--font-figtree)]"
    >
      <HeroWaves />

      <div className="hero-rise mx-auto max-w-[1060px] text-center">
        {/* The agency's four core keywords are the H1 (see site.keywords):
            one per line on phones, two per line from tablet up. */}
        <h1
          id="hero-heading"
          className="text-[32px] leading-[1.12] font-bold tracking-[-0.03em] text-[#141414] sm:text-[40px] md:text-[36px] lg:text-[44px] xl:text-[52px]"
        >
          <span className="block md:inline">Web Solutions,</span> <span className="block md:inline">AI Automation,</span>
          {" "}
          <br className="hidden md:block" />
          <span className="block md:inline">Growth Marketing</span> <span className="block md:inline">&amp; Digital Support</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[15px] leading-[1.6] text-[#555555] sm:text-[16px] md:mt-6 md:text-[17px]">
          One team that builds stronger digital operations and helps businesses across the USA, Canada and Europe
          grow with confidence.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
          <HeroButton
            href={site.cta.href}
            icon={<CalendarDays className="size-4" strokeWidth={2} />}
            label="Book a free consultation"
            tone="tint"
          />
          <HeroButton
            href={site.secondaryCta.href}
            icon={<ArrowUpRight className="size-4" strokeWidth={2} />}
            label="See our work"
            tone="clear"
          />
        </div>
      </div>
    </section>
  );
}

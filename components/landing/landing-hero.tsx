import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { HeroWaves } from "@/components/landing/hero-waves";

/* Minimal centred hero (approved reference: floating pill nav, a large
   regular-weight headline and dark pill buttons) over soft light ribbons in
   the logo colours (see HeroWaves). */

/* Small dot in the logo gradient that separates two keywords on one line. */
function KeywordDot() {
  return (
    <span
      aria-hidden
      className="mx-[0.32em] hidden size-[0.22em] -translate-y-[0.14em] rounded-full bg-[linear-gradient(135deg,#00d5ff,#2f5bff_45%,#8b3dff_75%,#e93cf5)] align-middle lg:inline-block"
    />
  );
}

/* Hero buttons in the logo gradient.
   primary: filled blue -> violet -> magenta (white text stays above 4.5:1);
     on hover the gradient slides, a light sheen sweeps across, the button
     lifts and a cyan/violet glow appears.
   outline: white glass with a gradient border; on hover the gradient fills
     in, text turns white and the arrow nudges up-right.
   All motion is transform/opacity only and is removed under reduced motion. */
function PillButton({
  href,
  icon,
  kicker,
  label,
  variant = "primary",
}: {
  href: string;
  icon: React.ReactNode;
  kicker: string;
  label: string;
  variant?: "primary" | "outline";
}) {
  const primary = variant === "primary";
  return (
    <Link
      href={href}
      className={
        "comet-btn group relative isolate inline-flex h-[56px] w-full max-w-[320px] items-center gap-3 overflow-hidden rounded-[16px] pr-6 pl-5 text-left transition-[transform,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7b3dff] motion-safe:hover:-translate-y-[3px] motion-safe:active:translate-y-0 sm:w-auto sm:min-w-[236px] " +
        (primary
          ? "comet-btn--primary text-white shadow-[0_12px_28px_-12px_rgba(47,91,255,0.65)] hover:shadow-[0_18px_40px_-12px_rgba(123,61,255,0.7),0_0_0_1px_rgba(255,255,255,0.08),0_0_28px_-4px_rgba(0,213,255,0.45)]"
          : "comet-btn--outline bg-white/70 text-[#141414] shadow-[0_10px_24px_-14px_rgba(20,20,60,0.35)] backdrop-blur-md hover:text-white hover:shadow-[0_18px_40px_-14px_rgba(123,61,255,0.6)]")
      }
    >
      <span
        aria-hidden
        className={
          "relative z-10 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
          (primary ? "text-white group-hover:scale-110" : "text-[#5b3dff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white")
        }
      >
        {icon}
      </span>
      <span className="relative z-10 flex flex-col leading-none">
        <span className={"text-[12px] font-medium transition-colors duration-300 " + (primary ? "text-white/80" : "text-[#5f6272] group-hover:text-white/80")}>
          {kicker}
        </span>
        <span className="mt-1 text-[17px] font-semibold tracking-[-0.01em]">{label}</span>
      </span>
    </Link>
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
        {/* The agency's four core keywords are the H1 (see site.keywords). No
            punctuation: one keyword per line on small screens, two per line with a
            logo-gradient dot between them on desktop. Screen readers get the
            commas via sr-only text. */}
        <h1
          id="hero-heading"
          className="text-[38px] leading-[1.1] font-bold tracking-[-0.03em] text-[#141414] sm:text-[52px] lg:text-[56px] xl:text-[64px]"
        >
          <span className="block lg:inline">Web Solutions</span>
          <span className="sr-only">, </span>
          <KeywordDot />
          <span className="block lg:inline">AI Automation</span>
          <span className="sr-only">, </span>
          <br className="hidden lg:block" />
          <span className="block lg:inline">Growth Marketing</span>
          <KeywordDot />
          <span className="sr-only"> and </span>
          <span className="block lg:inline">Digital Support</span>
        </h1>
        <p className="mx-auto mt-7 max-w-[640px] text-pretty text-[17px] leading-[1.55] text-[#555555] md:text-[19px]">
          One 20-plus person team that builds, automates, markets and supports brands that sell online, across the
          USA, Canada and Europe.
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PillButton
            href={site.cta.href}
            icon={<CalendarDays className="size-[26px]" strokeWidth={1.8} />}
            kicker="Free, 20 minutes"
            label="Book a free consultation"
          />
          <PillButton
            href={site.secondaryCta.href}
            icon={<ArrowUpRight className="size-[26px]" strokeWidth={1.8} />}
            kicker="Case studies"
            label="See our work"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}

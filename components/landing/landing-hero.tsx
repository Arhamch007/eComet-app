import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { HeroWaves } from "@/components/landing/hero-waves";

/* Minimal centred hero (approved reference: floating pill nav, a large
   regular-weight headline and dark pill buttons) over soft light ribbons in
   the logo colours (see HeroWaves). */

/* Hero buttons in the logo gradient.
   primary: filled with the logo gradient, cyan at the top to magenta at the
     bottom (label over the blue band, white text readable);
     on hover the gradient slides, a light sheen sweeps across and a
     cyan/violet glow appears. The button itself never moves or scales.
   outline: white glass with a gradient border; on hover the gradient fills
     in and the text turns white.
   Hover changes colour only; reduced motion also drops the sheen. */
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
        "comet-btn group relative isolate inline-flex h-12 w-full max-w-[300px] items-center gap-2.5 overflow-hidden rounded-[14px] pr-5 pl-4 text-left transition-[box-shadow,color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#7b3dff] sm:w-[232px] " +
        (primary
          ? "comet-btn--primary text-white shadow-[0_12px_28px_-12px_rgba(14,108,242,0.7)] hover:shadow-[0_18px_40px_-12px_rgba(159,74,237,0.6),0_0_30px_-4px_rgba(4,229,251,0.5)]"
          : "comet-btn--outline bg-white/70 text-[#141414] shadow-[0_10px_24px_-14px_rgba(20,20,60,0.35)] backdrop-blur-md hover:text-white hover:shadow-[0_18px_40px_-14px_rgba(39,67,239,0.6),0_0_26px_-6px_rgba(4,229,251,0.45)]")
      }
    >
      <span
        aria-hidden
        className={
          "relative z-10 shrink-0 transition-colors duration-150 " +
          (primary ? "text-white" : "text-[#2743ef] group-hover:text-white")
        }
      >
        {icon}
      </span>
      <span className="relative z-10 flex flex-col leading-none">
        <span className={"text-[11px] font-medium transition-colors duration-150 " + (primary ? "text-white/80" : "text-[#5f6272] group-hover:text-white/80")}>
          {kicker}
        </span>
        <span className="mt-0.5 text-[15px] font-semibold tracking-[-0.01em]">{label}</span>
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
            punctuation: one keyword per line on small screens, two per line with extra
            space between them from tablet up. Screen readers get the
            commas via sr-only text. */}
        <h1
          id="hero-heading"
          className="text-[32px] leading-[1.12] font-bold tracking-[-0.03em] text-[#141414] sm:text-[40px] md:text-[36px] lg:text-[44px] xl:text-[52px]"
        >
          <span className="block md:inline">Web Solutions</span>
          <span className="sr-only">, </span>
          <span aria-hidden className="hidden w-[0.45em] md:inline-block" />
          <span className="block md:inline">AI Automation</span>
          <span className="sr-only">, </span>
          <br className="hidden md:block" />
          <span className="block md:inline">Growth Marketing</span>
          <span aria-hidden className="hidden w-[0.45em] md:inline-block" />
          <span className="sr-only"> and </span>
          <span className="block md:inline">Digital Support</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[600px] text-pretty text-[15px] leading-[1.6] text-[#555555] sm:text-[16px] md:mt-6 md:text-[17px]">
          One team that builds stronger digital operations and helps businesses across the USA, Canada and Europe
          grow with confidence.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9">
          <PillButton
            href={site.cta.href}
            icon={<CalendarDays className="size-[22px]" strokeWidth={1.8} />}
            kicker="Free, 20 minutes"
            label="Book a free consultation"
          />
          <PillButton
            href={site.secondaryCta.href}
            icon={<ArrowUpRight className="size-[22px]" strokeWidth={1.8} />}
            kicker="Case studies"
            label="See our work"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}

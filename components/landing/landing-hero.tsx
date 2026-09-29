import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { site } from "@/content/site";
import { HeroWaves } from "@/components/landing/hero-waves";

/* Minimal centred hero (approved reference: floating pill nav, a large
   regular-weight headline and dark pill buttons) over soft light ribbons in
   the logo colours (see HeroWaves). */

function PillButton({
  href,
  icon,
  kicker,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  kicker: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex h-[56px] min-w-[236px] items-center gap-3 rounded-[16px] bg-[#111111] pr-6 pl-5 text-left text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-black hover:shadow-[0_16px_32px_-14px_rgba(40,40,120,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#4f46e5] motion-safe:hover:-translate-y-0.5"
    >
      <span className="shrink-0 text-white" aria-hidden>
        {icon}
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-medium text-white/75">{kicker}</span>
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
        {/* The agency's four core keywords are the H1 (see site.keywords). */}
        <h1
          id="hero-heading"
          className="text-[38px] leading-[1.08] font-bold tracking-[-0.03em] text-balance text-[#141414] sm:text-[52px] lg:text-[56px] xl:text-[64px]"
        >
          Web Solutions, AI Automation,
          <br className="hidden lg:block" /> Growth Marketing &amp; Digital Support
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
          />
        </div>
      </div>
    </section>
  );
}

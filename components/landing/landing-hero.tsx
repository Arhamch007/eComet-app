import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { HeroWaves } from "@/components/landing/hero-waves";
import { PlatformsStrip } from "@/components/landing/platforms-strip";

/* Minimal centred hero (approved reference: floating pill nav, a large
   regular-weight headline and dark pill buttons) over soft light ribbons in
   the logo colours (see HeroWaves). */

/* Hero buttons: solid, so they stand out from the coloured waves behind.
   primary = logo gradient (#01E2F8 > #1590EC > #0D5DF5), white label, arrow
   secondary = solid white with a soft border
   Hover changes colour and shadow only (styles: .hero-cta in globals.css). */
function HeroButton({
  href,
  label,
  primary = false,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        "hero-cta relative isolate inline-flex h-11 w-full max-w-[280px] items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40 sm:w-auto " +
        (primary ? "hero-cta--primary text-white" : "hero-cta--secondary text-[#141414]")
      }
    >
      {label}
      {primary ? <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} /> : null}
    </Link>
  );
}

export function LandingHero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#f6f6f7] font-[family-name:var(--font-figtree)]"
    >
      <HeroWaves />

      {/* copy fills the space above the platforms band and stays centred */}
      <div className="flex flex-1 items-center justify-center px-5 pt-28 pb-12 md:pt-32 md:pb-16">
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
          <HeroButton href="#contact" label="Start a Project" primary />
          <HeroButton href="#services" label="Explore Services" />
        </div>
      </div>
      </div>

      <PlatformsStrip />
    </section>
  );
}

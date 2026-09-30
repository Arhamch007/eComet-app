import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { CountUp } from "@/components/ui/count-up";
import { LandingContainer } from "@/components/landing/ui";

/* Numbers band right after the hero: a deep indigo field with soft glows in
   the logo colours, the pitch on the left and four stat cards on the right
   that count up once when scrolled into view (static under reduced motion,
   see components/ui/count-up.tsx).
   Only figures eComet can stand behind are shown; replace or add project
   counts once the team confirms real totals. */

const stats = [
  { value: 20, suffix: "+", label: "Team specialists" },
  { value: services.length, suffix: "", label: "Services offered" },
  { value: 3, suffix: "", label: "Markets served: USA, Canada, Europe" },
  { value: 1, suffix: "", label: "Business day to reply" },
];

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative isolate overflow-hidden bg-[#0b0720] py-20 text-white md:py-28"
    >
      {/* background: deep indigo with logo-colour glows */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,#0b0720_0%,#150a3d_55%,#2a1170_100%)]" />
      <div aria-hidden className="absolute -top-40 right-[-10%] -z-10 size-[560px] rounded-full bg-[#681bf5] opacity-30 blur-[140px]" />
      <div aria-hidden className="absolute bottom-[-45%] left-[-8%] -z-10 size-[520px] rounded-full bg-[#0d5df5] opacity-20 blur-[140px]" />

      <LandingContainer className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h2
            id="stats-heading"
            className="text-[32px] leading-[1.1] font-bold tracking-[-0.03em] text-balance md:text-[44px] lg:text-[48px]"
          >
            Digital work that turns into real results
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.65] text-pretty text-white/75 md:text-[17px]">
            We combine technical expertise with practical digital support. Websites, automations, email campaigns and
            day-to-day digital work, delivered by one team that works as an extension of yours.
          </p>
          <Link
            href="#services"
            className="group mt-8 inline-flex items-center gap-2 rounded-md text-[13px] font-semibold tracking-[0.12em] text-[#9fd8ff] uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#01e2f8]"
          >
            Explore our services
            <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col-reverse justify-end rounded-[20px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-[border-color,background-color] duration-200 hover:border-white/20 hover:bg-white/[0.08] sm:p-7"
            >
              <dt className="mt-2 text-[13px] leading-[1.4] text-white/65 sm:text-[14px]">{s.label}</dt>
              <dd className="text-[40px] leading-none font-bold tracking-[-0.03em] sm:text-[52px]">
                <CountUp value={s.value} suffix={s.suffix} duration={1.6} />
              </dd>
            </div>
          ))}
        </dl>
      </LandingContainer>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { LandingContainer } from "@/components/landing/ui";

/* Numbers band right after the hero, on white: the pitch on the left and
   four stat cards on the right that count up once when scrolled into view
   (static under reduced motion, see components/ui/count-up.tsx).
   Cards are filled with the top of the logo's "e" (aqua into blue, deeper
   blue behind the labels so white text stays readable). On hover the card
   turns white, the text turns dark and a light beam in the logo colours
   travels round the border (.stat-card in globals.css). Like the old site,
   cards fade up on scroll one after another and do a rubber-band stretch
   on hover.
   Only figures eComet can stand behind are shown. */

const stats = [
  { value: 20, suffix: "+", label: "Team specialists" },
  { value: services.length, suffix: "", label: "Services offered" },
  { value: 3, suffix: "", label: "Markets served: USA, Canada, Europe" },
  { value: 1, suffix: "", label: "Business day to reply" },
];

export function StatsSection() {
  return (
    <section aria-labelledby="stats-heading" className="relative bg-white py-20 md:py-28">
      <LandingContainer className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h2
            id="stats-heading"
            className="text-[32px] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-[#141414] md:text-[44px] lg:text-[48px]"
          >
            Digital work that turns into real results
          </h2>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.65] text-pretty text-[#555555] md:text-[17px]">
            We combine technical expertise with practical digital support. Websites, automations, email campaigns and
            day-to-day digital work, delivered by one team that works as an extension of yours.
          </p>
          <Link
            href="#services"
            className="group mt-8 inline-flex items-center gap-2 rounded-md text-[13px] font-semibold tracking-[0.12em] text-[#0d5df5] uppercase transition-colors duration-200 hover:text-[#681bf5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d5df5]"
          >
            Explore our services
            <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:gap-4">
          {stats.map((s, i) => (
            /* fade-up on scroll, staggered like the old site (AOS fade-up 100-400ms);
               static hover target so the stretching card never slips off the pointer */
            <Reveal key={s.label} delay={0.1 * (i + 1)} y={40}>
            <div
              tabIndex={0}
              className="stat-wrap group rounded-[20px] outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40"
            >
              <div className="stat-card relative isolate flex h-full flex-col-reverse justify-end overflow-hidden rounded-[20px] p-5 sm:p-7">
                <dt className="mt-2 text-[13px] leading-[1.4] font-medium text-white/90 transition-colors duration-200 group-hover:text-[#555555] group-focus-visible:text-[#555555] sm:text-[14px]">
                  {s.label}
                </dt>
                <dd className="text-[40px] leading-none font-bold tracking-[-0.03em] text-white transition-colors duration-200 group-hover:text-[#141414] group-focus-visible:text-[#141414] sm:text-[52px]">
                  <CountUp value={s.value} suffix={s.suffix} duration={1.6} />
                </dd>
              </div>
            </div>
            </Reveal>
          ))}
        </dl>
      </LandingContainer>
    </section>
  );
}

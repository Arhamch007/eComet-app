import { services } from "@/content/services";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { LandingContainer } from "@/components/landing/ui";

/* Numbers band right after the hero, on white: the pitch on the left and
   four stat cards on the right that count up once when scrolled into view
   (static under reduced motion, see components/ui/count-up.tsx).
   Cards are one solid logo light blue (Bright Ocean #1590EC), laid out like
   the old site: square-cornered rectangles with a soft all-round shadow,
   centred text and a staggered 2 x 2 (second card lower, third higher). On hover the card
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
        </div>

        <dl className="grid grid-cols-2 gap-4 sm:gap-7">
          {stats.map((s, i) => (
            /* fade-up on scroll, staggered like the old site (AOS fade-up 100-400ms);
               static hover target so the stretching card never slips off the pointer */
            <Reveal
              key={s.label}
              delay={0.1 * (i + 1)}
              y={40}
              className={i === 1 ? "sm:mt-[30px]" : i === 2 ? "sm:-mt-[30px]" : undefined}
            >
            <div
              tabIndex={0}
              className="stat-wrap group rounded-[4px] outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40"
            >
              <div className="stat-card relative isolate flex h-full min-h-[150px] flex-col-reverse items-center justify-center overflow-hidden rounded-[4px] p-6 text-center sm:min-h-[190px] sm:p-10">
                <dt className="mt-2 text-[13px] leading-[1.4] font-semibold text-white transition-colors duration-200 group-hover:text-[#555555] group-focus-visible:text-[#555555] sm:text-[14px]">
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

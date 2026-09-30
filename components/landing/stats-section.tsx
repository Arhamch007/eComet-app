import { Clock3, Globe2, Layers, Users, type LucideIcon } from "lucide-react";
import { services } from "@/content/services";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { Kicker, LandingContainer } from "@/components/landing/ui";

/* Numbers section after the hero: the pitch on the left and an "at a glance"
   dashboard panel on the right. The panel is one white card with a faint dot
   grid, four metrics split by hairlines (icon, count-up number in the logo
   gradient, label, detail) and a four-colour logo bar along the bottom.
   Numbers count up once when scrolled into view (static under reduced
   motion). Only figures eComet can stand behind are shown. */

type Metric = { value: number; suffix: string; label: string; detail: string; icon: LucideIcon };

const metrics: Metric[] = [
  { value: 20, suffix: "+", label: "Specialists", detail: "Web, automation, marketing and support", icon: Users },
  { value: services.length, suffix: "", label: "Services", detail: "Under one accountable team", icon: Layers },
  { value: 3, suffix: "", label: "Markets", detail: "USA, Canada and Europe", icon: Globe2 },
  { value: 1, suffix: "", label: "Business day", detail: "To reply to every enquiry", icon: Clock3 },
];

export function StatsSection() {
  return (
    <section aria-labelledby="stats-heading" className="relative bg-white py-20 md:py-28">
      <LandingContainer className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Kicker>By the numbers</Kicker>
          <h2
            id="stats-heading"
            className="mt-3 text-[32px] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-[#141414] md:text-[44px]"
          >
            Digital work that turns into real results
          </h2>
          <p className="mt-5 max-w-[500px] text-[16px] leading-[1.65] text-pretty text-[#555555] md:text-[17px]">
            We combine technical expertise with practical digital support. Websites, automations, email campaigns and
            day-to-day digital work, delivered by one team that works as an extension of yours.
          </p>
          <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#e3e7ef] bg-white px-4 py-2 text-[13.5px] font-medium text-[#23262f] shadow-[0_6px_16px_-12px_rgba(20,30,70,0.35)]">
            <span aria-hidden className="live-dot size-2 rounded-full bg-[#10b981]" />
            Available now: replies within one business day
          </p>
        </div>

        <Reveal y={24}>
          <div className="relative overflow-hidden rounded-[28px] border border-[#e6e9f0] bg-white shadow-[0_2px_4px_rgba(20,30,60,0.04),0_40px_80px_-40px_rgba(13,60,160,0.35)]">
            {/* faint dot grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(13,93,245,0.09)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(80%_70%_at_100%_0%,#000,transparent)]"
            />

            <div className="relative flex items-center justify-between border-b border-[#eef0f4] px-6 py-4 sm:px-8">
              <p className="text-[13px] font-semibold tracking-[0.02em] text-[#23262f]">eComet at a glance</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ecfdf5] px-2.5 py-1 text-[11.5px] font-semibold text-[#047857]">
                <span aria-hidden className="size-1.5 rounded-full bg-[#10b981]" />
                Live
              </span>
            </div>

            <dl className="relative grid grid-cols-1 divide-y divide-[#eef0f4] sm:grid-cols-2 sm:divide-y-0">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={
                    "group flex flex-col-reverse justify-end gap-1 px-6 py-7 transition-colors duration-200 hover:bg-[#f7faff] sm:px-8 sm:py-8 " +
                    (i % 2 === 0 ? "sm:border-r sm:border-[#eef0f4] " : "") +
                    (i < 2 ? "sm:border-b sm:border-[#eef0f4]" : "")
                  }
                >
                  <dt className="mt-1">
                    <span className="block text-[15px] font-semibold text-[#141414]">{m.label}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-[1.5] text-[#6b7080]">{m.detail}</span>
                  </dt>
                  <dd className="flex items-center justify-between">
                    <span className="bg-[linear-gradient(100deg,#01c8ee,#1590ec_35%,#0d5df5_70%,#681bf5)] bg-clip-text text-[52px] leading-none font-bold tracking-[-0.04em] text-transparent md:text-[60px]">
                      <CountUp value={m.value} suffix={m.suffix} duration={1.6} />
                    </span>
                    <span
                      aria-hidden
                      className="relative grid size-11 place-items-center overflow-hidden rounded-[12px] bg-[#eef5fe] text-[#0d5df5] transition-colors duration-200 group-hover:text-white"
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(135deg,#01e2f8,#1590ec_35%,#0d5df5_65%,#681bf5)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <m.icon className="relative size-5" strokeWidth={2} />
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* logo colours along the bottom edge */}
            <div aria-hidden className="relative grid h-1.5 grid-cols-4">
              <span className="bg-[#01e2f8]" />
              <span className="bg-[#1590ec]" />
              <span className="bg-[#0d5df5]" />
              <span className="bg-[#681bf5]" />
            </div>
          </div>
        </Reveal>
      </LandingContainer>
    </section>
  );
}

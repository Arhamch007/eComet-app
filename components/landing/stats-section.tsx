import { services } from "@/content/services";
import { CountUp } from "@/components/ui/count-up";
import { LandingContainer } from "@/components/landing/ui";

/* Numbers section after the hero, kept deliberately plain: heading and a
   short paragraph on the left, four large figures in solid ink on the
   right, each under a short blue rule and split by hairlines. No badges,
   dot grids, gradient text or decorative icons. Figures count up once when
   scrolled into view (static under reduced motion); only figures eComet can
   stand behind are shown. */

const metrics = [
  { value: 20, suffix: "+", label: "Specialists", detail: "Across web, automation, marketing and support" },
  { value: services.length, suffix: "", label: "Services", detail: "Handled by one accountable team" },
  { value: 3, suffix: "", label: "Markets", detail: "Clients in the USA, Canada and Europe" },
  { value: 1, suffix: "", label: "Business day", detail: "To reply to every enquiry" },
];

export function StatsSection() {
  return (
    <section aria-labelledby="stats-heading" className="relative isolate overflow-hidden bg-white py-[72px] md:py-24 lg:py-28">
      {/* team photo (Unsplash, Annie Spratt) at low opacity behind the section */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url(/images/sections/team-unsplash.jpg)] bg-cover bg-center opacity-[0.22] grayscale-[20%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.15),rgba(255,255,255,0.5)_55%,rgba(255,255,255,0.65))]" />
      <LandingContainer className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="max-w-[460px]">
          <h2
            id="stats-heading"
            className="text-[32px] leading-[1.1] font-bold tracking-[-0.03em] text-balance text-[#141414] md:text-[44px]"
          >
            The team behind your digital work
          </h2>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#555555] md:text-[17px]">
            Websites, automations, email campaigns and <span className="whitespace-nowrap">day-to-day</span> digital
            tasks, handled by one team that works as an extension of yours.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end border-t border-[#e6e9f0] pt-6">
              <dt className="mt-3">
                <span className="block text-[15px] font-semibold text-[#141414]">{m.label}</span>
                <span className="mt-1 block text-[14px] leading-[1.5] text-[#6b7080]">{m.detail}</span>
              </dt>
              <dd className="relative text-[48px] leading-none font-bold tracking-[-0.04em] text-[#141414] md:text-[64px]">
                <span aria-hidden className="absolute -top-[25px] left-0 h-[2px] w-10 bg-[#0d5df5]" />
                <CountUp value={m.value} suffix={m.suffix} duration={1.6} />
              </dd>
            </div>
          ))}
        </dl>
      </LandingContainer>
    </section>
  );
}

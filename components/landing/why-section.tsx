import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { LandingContainer, LandingSection } from "@/components/landing/ui";

/* Why eComet as a plain before/after comparison on white (so it reads
   differently from the grey Services cards): the usual way of getting
   digital work done next to working with eComet, row by row. The eComet
   column is outlined in the logo gradient. Points follow the client's
   brief (one team, practical, flexible, experienced).
   Static server component; nothing moves on hover. */

const rows = [
  {
    topic: "Who does the work",
    without: "Separate freelancers for web, automation, email and admin",
    with: "One team covering web, automation, email marketing and digital support",
  },
  {
    topic: "Who you talk to",
    without: "Several people to brief, chase and keep in sync",
    with: "One contact who knows your business and your projects",
  },
  {
    topic: "What you get",
    without: "Work that ticks a box but does not fit how you operate",
    with: "Practical solutions that fix real problems and make daily work easier",
  },
  {
    topic: "When needs change",
    without: "Find, brief and onboard someone new each time",
    with: "One-time projects or ongoing support from the same team",
  },
  {
    topic: "Experience",
    without: "Strong in one area, guessing in the rest",
    with: "Hands-on with websites, e-commerce, automation, email and operations",
  },
];

export function WhySection() {
  return (
    <LandingSection id="why" tone="white" labelledBy="why-heading" className="bg-white py-16 md:py-24">
      <LandingContainer className="max-w-[1100px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <h2
              id="why-heading"
              className="text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-[#141414] md:text-[40px]"
            >
              Why businesses choose eComet
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-pretty text-[#555555] md:text-[17px]">
              We work as an extension of your team, so you get one partner for your digital work instead of several to
              manage.
            </p>
          </div>
          <Link
            href="#contact"
            className="hero-cta hero-cta--primary relative isolate inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start overflow-hidden rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40 md:self-auto"
          >
            Start a Project
            <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {/* the usual way */}
          <div className="rounded-[22px] border border-[#e6e9f0] bg-[#f7f8fa] p-6 sm:p-8">
            <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#6b7080]">Juggling separate freelancers</h3>
            <ul className="mt-5">
              {rows.map((r) => (
                <li key={r.topic} className="flex gap-3 border-t border-[#e6e9f0] py-4 last:pb-0">
                  <span aria-hidden className="mt-[2px] grid size-[20px] shrink-0 place-items-center rounded-full bg-[#e3e6ec] text-[#8a90a0]">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-[1.55] text-[#6b7080]">{r.without}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* with eComet: logo-gradient outline */}
          <div className="rounded-[22px] bg-[linear-gradient(135deg,#01e2f8,#1590ec_35%,#0d5df5_65%,#681bf5)] p-[1.5px] shadow-[0_24px_60px_-30px_rgba(13,93,245,0.5)]">
            <div className="h-full rounded-[20.5px] bg-white p-6 sm:p-8">
              <h3 className="text-[17px] font-bold tracking-[-0.01em] text-[#0d5df5]">With eComet</h3>
              <ul className="mt-5">
                {rows.map((r) => (
                  <li key={r.topic} className="flex gap-3 border-t border-[#e3ebfb] py-4 last:pb-0">
                    <span aria-hidden className="mt-[2px] grid size-[20px] shrink-0 place-items-center rounded-full bg-[#0d5df5] text-white">
                      <Check className="size-3" strokeWidth={3.2} />
                    </span>
                    <span className="text-[15px] leading-[1.55] font-medium text-[#141414]">{r.with}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

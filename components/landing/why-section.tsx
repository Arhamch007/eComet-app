"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { LandingContainer, LandingSection, logoGradient } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Why eComet, as one interactive panel rather than two static columns: a
   two-way toggle ("Freelancers" / "eComet") switches every row's icon and
   line between the two ways of getting digital work done, and the panel
   itself grows a soft logo-gradient ring once "eComet" is selected. Rows
   use Framer Motion's `layout` so a height difference between the two
   lines never causes a jump — it morphs. Points follow the client's brief
   (one team, practical, flexible, experienced); nothing invented.
   Starts on "Freelancers" (the problem) so switching to "eComet" reads as
   the reveal. role="tablist"/"tabpanel" for keyboard and screen-reader use. */

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
  const [withEcomet, setWithEcomet] = React.useState(false);

  return (
    <LandingSection id="why" tone="white" labelledBy="why-heading" className="bg-[#eef1f6]">
      <LandingContainer className="max-w-[720px]">
        <div className="mx-auto max-w-[560px] text-center">
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

        <div
          role="tablist"
          aria-label="Compare the usual way of getting digital work done with working with eComet"
          className="mt-8 flex justify-center md:mt-10"
        >
          <div className="inline-flex items-center rounded-full border border-[#dfe3ea] bg-white p-1 shadow-[0_1px_2px_rgba(20,20,20,0.04)]">
            <button
              type="button"
              role="tab"
              aria-selected={!withEcomet}
              onClick={() => setWithEcomet(false)}
              className={cn(
                "rounded-full px-5 py-2 text-[14px] font-semibold transition-colors duration-200",
                !withEcomet ? "bg-[#eef1f6] text-[#141414]" : "text-[#6b7080] hover:text-[#141414]"
              )}
            >
              Freelancers
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={withEcomet}
              onClick={() => setWithEcomet(true)}
              className={cn(
                "rounded-full px-5 py-2 text-[14px] font-semibold transition-colors duration-200",
                withEcomet ? "text-white" : "text-[#6b7080] hover:text-[#141414]"
              )}
              style={withEcomet ? { backgroundImage: logoGradient } : undefined}
            >
              eComet
            </button>
          </div>
        </div>

        <div className="relative mt-6 rounded-[28px] p-[1.5px] md:mt-8">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[28px] transition-opacity duration-500"
            style={{ backgroundImage: logoGradient, opacity: withEcomet ? 1 : 0 }}
          />
          <div
            role="tabpanel"
            aria-label={withEcomet ? "With eComet" : "Juggling separate freelancers"}
            className="relative rounded-[26.5px] border border-[#e1e5ec] bg-white px-6 shadow-[0_24px_60px_-34px_rgba(20,30,70,0.35)] sm:px-8"
          >
            {rows.map((r) => (
              <motion.div
                layout
                key={r.topic}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-start gap-4 border-t border-[#eceef3] py-5 first:border-t-0"
              >
                <motion.span
                  layout
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    withEcomet ? "bg-[#0d5df5] text-white" : "bg-[#eef1f6] text-[#9aa1b1]"
                  )}
                >
                  {withEcomet ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={2.75} />}
                </motion.span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold tracking-[0.06em] text-[#9aa1b1] uppercase">{r.topic}</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={withEcomet ? "with" : "without"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn("mt-1 text-[15px] leading-[1.55] text-pretty", withEcomet ? "font-medium text-[#141414]" : "text-[#6b7080]")}
                    >
                      {withEcomet ? r.with : r.without}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

import Link from "next/link";
import { ArrowRight, Clock, FileCheck, KeyRound, UserRound, type LucideIcon } from "lucide-react";
import { LandingContainer, LandingHeading, LandingSection, palette } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Why eComet: pitch and one call to action on the left; on the right a card
   of three plain facts (with a small comet dash trail as its accent) and
   four commitments as small white cards, each with a solid logo-colour icon disc.
   Static server component: no motion, no client JavaScript. */

const facts = [
  { value: "20+", label: "specialists", detail: "across web, automation, marketing and support" },
  { value: "3", label: "markets", detail: "USA · Canada · Europe" },
  { value: "1", label: "business day", detail: "to reply to every enquiry" },
];

const commitments: { title: string; text: string; icon: LucideIcon; tint: string }[] = [
  {
    title: "Written scope, fixed price",
    text: "You approve the scope, price and timeline before any work starts.",
    icon: FileCheck,
    tint: "bg-[linear-gradient(135deg,#01e2f8,#1590ec)] text-white shadow-[0_8px_18px_-8px_rgba(1,226,248,0.7)]",
  },
  {
    title: "One named contact",
    text: "A single person who knows your project and keeps it moving.",
    icon: UserRound,
    tint: "bg-[linear-gradient(135deg,#1590ec,#0d5df5)] text-white shadow-[0_8px_18px_-8px_rgba(21,144,236,0.7)]",
  },
  {
    title: "Your accounts, your data",
    text: "Everything is set up in your name and stays yours. NDA on request.",
    icon: KeyRound,
    tint: "bg-[linear-gradient(135deg,#0d5df5,#681bf5)] text-white shadow-[0_8px_18px_-8px_rgba(13,93,245,0.65)]",
  },
  {
    title: "Hours that overlap yours",
    text: "We work across North American and European business days.",
    icon: Clock,
    tint: "bg-[linear-gradient(135deg,#681bf5,#0d5df5)] text-white shadow-[0_8px_18px_-8px_rgba(104,27,245,0.6)]",
  },
];

/* The logo's speed trail as a row of rounded dashes, short and pale on the
   left, long and saturated on the right. */
const trail = [
  { w: 6, c: palette.aqua, o: 0.45 },
  { w: 10, c: palette.aqua, o: 0.7 },
  { w: 16, c: palette.ocean, o: 0.8 },
  { w: 22, c: palette.ocean, o: 1 },
  { w: 30, c: palette.blue, o: 1 },
  { w: 40, c: palette.indigo, o: 1 },
];

const card =
  "rounded-[24px] border border-[#e7e9ef] bg-white shadow-[0_12px_32px_-20px_rgba(20,30,70,0.28)] transition-[border-color,box-shadow] duration-200";

export function WhySection() {
  return (
    <LandingSection id="why" tone="alt" labelledBy="why-heading" className="font-[family-name:var(--font-figtree)]">
      <LandingContainer>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <LandingHeading
              id="why-heading"
              align="left"
              kicker="Why eComet"
              title="One accountable team, with the terms agreed up front"
              lead="eComet brings web, automation, marketing and support specialists together in one team. You know the scope and the price before we start, you talk to one person throughout, and everything we build stays in your name."
            />
            <Link
              href="#contact"
              className="hero-cta hero-cta--primary relative isolate mt-8 inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40"
            >
              Start a Project
              <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
            </Link>
          </div>

          <div className="min-w-0">
            <div className={cn(card, "px-6 pt-6 pb-2 sm:px-8 sm:pt-7 sm:pb-3")}>
              <div aria-hidden className="flex items-center gap-[6px]">
                {trail.map((d, i) => (
                  <span
                    key={i}
                    className="block h-[4px] rounded-full"
                    style={{ width: d.w, backgroundColor: d.c, opacity: d.o }}
                  />
                ))}
              </div>
              <ul className="mt-2 grid divide-y divide-[#e7e9ef] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {facts.map((f) => (
                  <li key={f.label} className="py-5 sm:px-6 sm:py-5 sm:first:pl-0 sm:last:pr-0">
                    <p className="bg-[linear-gradient(100deg,#1590ec,#0d5df5_55%,#681bf5)] bg-clip-text text-[40px] leading-none font-bold tracking-[-0.03em] text-transparent tabular-nums">
                      {f.value}
                    </p>
                    <p className="mt-3 text-[15px] leading-[1.3] font-semibold text-[#141414]">{f.label}</p>
                    <p className="mt-1 text-[14px] leading-[1.5] text-[#555555]">{f.detail}</p>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {commitments.map(({ title, text, icon: Icon, tint }) => (
                <li
                  key={title}
                  className={cn(
                    card,
                    "flex gap-4 p-5 hover:border-[#c9d7f7] hover:shadow-[0_16px_36px_-20px_rgba(13,93,245,0.4)] motion-reduce:transition-none"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("grid size-10 shrink-0 place-items-center rounded-full", tint)}
                  >
                    <Icon className="size-[18px]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] leading-[1.3] font-bold tracking-[-0.01em] text-[#141414]">{title}</h3>
                    <p className="mt-1 text-[14px] leading-[1.55] text-[#555555]">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

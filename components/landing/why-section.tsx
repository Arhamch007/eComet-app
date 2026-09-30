import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarClock, Lightbulb, Users, type LucideIcon } from "lucide-react";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";
import { cn } from "@/lib/utils";

/* Why eComet: short pitch and one call to action on the left; the four
   reasons from the client's brief as equal 2 x 2 cards on the right. Each
   card has a solid logo-colour icon tile.
   The figures (20+, 3 markets, 1 day) live in the stats band after the hero,
   so they are not repeated here.
   Static server component; hover changes border and shadow only. */

const reasons: { title: string; text: string; icon: LucideIcon; tile: string }[] = [
  {
    title: "One team for your digital work",
    text: "From development and automation to email marketing and daily digital tasks, handle more of your work with one reliable team.",
    icon: Users,
    tile: "bg-[linear-gradient(135deg,#01e2f8,#1590ec)] shadow-[0_8px_18px_-8px_rgba(1,226,248,0.7)]",
  },
  {
    title: "Practical solutions",
    text: "We focus on solutions that solve real business problems, improve efficiency and make everyday work easier.",
    icon: Lightbulb,
    tile: "bg-[linear-gradient(135deg,#1590ec,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(21,144,236,0.7)]",
  },
  {
    title: "Flexible support",
    text: "Whether you need a one-time project or ongoing support, we work around your business needs.",
    icon: CalendarClock,
    tile: "bg-[linear-gradient(135deg,#0d5df5,#681bf5)] shadow-[0_8px_18px_-8px_rgba(13,93,245,0.65)]",
  },
  {
    title: "Experienced team",
    text: "Experience across websites, e-commerce, automation, email marketing and digital operations for businesses in different industries.",
    icon: BadgeCheck,
    tile: "bg-[linear-gradient(135deg,#681bf5,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(104,27,245,0.6)]",
  },
];

export function WhySection() {
  return (
    <LandingSection id="why" tone="alt" labelledBy="why-heading" className="bg-[#e5e7eb] py-16 font-[family-name:var(--font-figtree)] md:py-24">
      <LandingContainer className="max-w-[1200px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <LandingHeading
              id="why-heading"
              align="left"
              title="Why businesses choose eComet"
              lead="We combine technical expertise with practical digital support, and work as an extension of your team so more gets done."
            />
            <Link
              href="#contact"
              className="hero-cta hero-cta--primary relative isolate mt-8 inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap text-white outline-none focus-visible:ring-[3px] focus-visible:ring-[#0d5df5]/40"
            >
              Start a Project
              <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
            </Link>
          </div>

          <ul className="grid gap-4 sm:auto-rows-fr sm:grid-cols-2 sm:gap-5">
            {reasons.map(({ title, text, icon: Icon, tile }) => (
              <li
                key={title}
                className="relative flex flex-col overflow-hidden rounded-[20px] border border-[#e1e4ea] bg-white p-6 shadow-[0_1px_2px_rgba(20,20,20,0.04),0_10px_28px_-20px_rgba(20,30,70,0.25)] transition-[border-color,box-shadow] duration-200 hover:border-[#c9d7f7] hover:shadow-[0_18px_40px_-22px_rgba(13,93,245,0.42)] motion-reduce:transition-none sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden className={cn("grid size-11 place-items-center rounded-[12px] text-white", tile)}>
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mt-5 text-[18px] leading-[1.3] font-bold tracking-[-0.015em] text-[#141414]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.6] text-pretty text-[#555555]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </LandingContainer>
    </LandingSection>
  );
}

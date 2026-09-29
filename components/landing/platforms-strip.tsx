import { heroTools } from "@/content/tools";
import { LandingContainer } from "@/components/landing/ui";

/* Slim, static band directly under the hero: the platforms eComet builds on
   and runs day to day, shown as brand marks in their own colours with names.
   No marquee. 3 x 3 grid on phones (mark above name), one centred wrapping
   row from sm up. The marks are decorative next to their visible names, so
   they are hidden from assistive tech. */

const platformIds = [
  "shopify",
  "wordpress",
  "meta",
  "instagram",
  "zapier",
  "make",
  "n8n",
  "airtable",
  "analytics",
] as const;

const platforms = platformIds
  .map((id) => heroTools.find((tool) => tool.id === id))
  .filter((tool): tool is (typeof heroTools)[number] => Boolean(tool));

export function PlatformsStrip() {
  return (
    <section aria-labelledby="platforms-label" className="border-y border-[#e7e9ef] bg-white py-8 md:py-10">
      <LandingContainer>
        <p id="platforms-label" className="text-center text-[13px] font-medium tracking-[0.01em] text-[#6b7080] md:text-[14px]">
          Platforms we build on and run every day
        </p>
        <ul className="mx-auto mt-6 grid max-w-[360px] grid-cols-3 gap-x-2 gap-y-5 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-4">
          {platforms.map(({ id, label, Icon }) => (
            <li
              key={id}
              className="flex min-w-0 flex-col items-center gap-2 text-center sm:flex-row sm:gap-2.5 sm:text-left"
            >
              <Icon aria-hidden focusable="false" className="size-6 shrink-0 sm:size-5" />
              <span className="text-[13px] leading-tight font-semibold tracking-[-0.01em] text-[#3b3f4a] sm:text-[15px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </LandingContainer>
    </section>
  );
}

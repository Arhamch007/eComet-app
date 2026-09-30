import {
  siShopify,
  siWordpress,
  siNextdotjs,
  siReact,
  siVercel,
  siStripe,
  siGoogleanalytics,
  siGooglesheets,
  siZendesk,
  siZapier,
  siMake,
  siN8n,
  siHubspot,
  siMeta,
  siInstagram,
  siAirtable,
  siNotion,
  type SimpleIcon,
} from "simple-icons";
import { fromSimpleIcon } from "@/content/tools";
import { Marquee } from "@/components/ui/marquee";

/* Platforms band under the hero: two rows of equal-size white logo tiles
   (brand mark in its own colour + name) drifting slowly in opposite
   directions, with faded edges. It sits on the hero's #f6f6f7 so it reads as
   part of the first screen, pauses on hover/focus and is static under
   prefers-reduced-motion (see .marquee in globals.css).
   Only platforms named in content/services.ts are listed. Mailchimp is left
   out because its yellow mark is unreadable on white. */

type Platform = { name: string; icon: SimpleIcon };

const buildAndSell: Platform[] = [
  { name: "Shopify", icon: siShopify },
  { name: "WordPress", icon: siWordpress },
  { name: "Next.js", icon: siNextdotjs },
  { name: "React", icon: siReact },
  { name: "Vercel", icon: siVercel },
  { name: "Stripe", icon: siStripe },
  { name: "Google Analytics", icon: siGoogleanalytics },
  { name: "Zendesk", icon: siZendesk },
];

const automateAndGrow: Platform[] = [
  { name: "Zapier", icon: siZapier },
  { name: "Make", icon: siMake },
  { name: "n8n", icon: siN8n },
  { name: "HubSpot", icon: siHubspot },
  { name: "Meta", icon: siMeta },
  { name: "Instagram", icon: siInstagram },
  { name: "Airtable", icon: siAirtable },
  { name: "Notion", icon: siNotion },
  { name: "Google Sheets", icon: siGooglesheets },
];

function Tile({ platform }: { platform: Platform }) {
  const Icon = fromSimpleIcon(platform.icon);
  return (
    <li className="mx-2 flex h-14 shrink-0 items-center gap-3 rounded-2xl border border-[#e7e9ef] bg-white pr-5 pl-4 shadow-[0_1px_2px_rgba(20,20,40,0.04),0_8px_20px_-14px_rgba(20,30,70,0.25)] transition-[border-color,box-shadow] duration-200 hover:border-[#c9d6f4] hover:shadow-[0_10px_24px_-14px_rgba(13,93,245,0.35)] md:mx-2.5 md:h-16 md:pr-6 md:pl-5">
      <Icon aria-hidden focusable="false" className="size-6 shrink-0 md:size-7" />
      <span className="text-[14px] font-semibold tracking-[-0.01em] whitespace-nowrap text-[#23262f] md:text-[15px]">
        {platform.name}
      </span>
    </li>
  );
}

function Row({ items, reverse, duration }: { items: Platform[]; reverse?: boolean; duration: number }) {
  return (
    <Marquee duration={duration} reverse={reverse} className="py-1.5">
      <ul className="flex items-center">
        {items.map((p) => (
          <Tile key={p.name} platform={p} />
        ))}
      </ul>
    </Marquee>
  );
}

export function PlatformsStrip() {
  const all = [...buildAndSell, ...automateAndGrow];
  return (
    <section aria-labelledby="platforms-label" className="relative bg-[#f6f6f7] pt-2 pb-16 md:pb-24">
      <p
        id="platforms-label"
        className="px-5 text-center text-[12px] font-semibold tracking-[0.1em] text-balance text-[#6b7080] uppercase sm:text-[13px] sm:tracking-[0.12em]"
      >
        Platforms we build on and run every day
      </p>
      <p className="sr-only">{all.map((p) => p.name).join(", ")}.</p>
      <div aria-hidden className="mx-auto mt-7 max-w-[1440px] space-y-2 md:space-y-3">
        <Row items={buildAndSell} duration={48} />
        <Row items={automateAndGrow} duration={56} reverse />
      </div>
    </section>
  );
}

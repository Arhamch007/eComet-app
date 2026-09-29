import { Bot, Check, Headset, MonitorSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { heroTools } from "@/content/tools";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";

/* "What we do": the four core keywords as a 2 x 2 grid of cards (1 column on
   phones). Each card carries one logo colour (aqua, ocean, blue, indigo) as a
   thin gradient top edge, a solid gradient icon tile and a faint corner glow,
   lists the real services behind the keyword (linked to their pages) and a
   few tool chips with brand marks where we have them.
   Hover: border, shadow and link colour only, 200ms; nothing moves.
   Tailwind needs literal class names, so every accent string is spelled out. */

type Accent = {
  /** thin top edge */
  edge: string;
  /** solid icon tile */
  tile: string;
  /** faint corner glow */
  glow: string;
  /** card hover border + shadow */
  hover: string;
  /** service link hover/focus colour (>= 4.5:1 on white) */
  check: string;
};

const accents = {
  aqua: {
    edge: "bg-[linear-gradient(90deg,#01e2f8,#1590ec)]",
    tile: "bg-[linear-gradient(135deg,#01e2f8,#1590ec)] shadow-[0_8px_18px_-8px_rgba(1,226,248,0.7)]",
    glow: "bg-[radial-gradient(closest-side,rgba(1,226,248,0.14),transparent)]",
    hover: "hover:border-[#01e2f8]/60 hover:shadow-[0_22px_48px_-24px_rgba(1,190,220,0.45)]",
    check: "text-[#0e7490]",
  },
  ocean: {
    edge: "bg-[linear-gradient(90deg,#1590ec,#0d5df5)]",
    tile: "bg-[linear-gradient(135deg,#1590ec,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(21,144,236,0.7)]",
    glow: "bg-[radial-gradient(closest-side,rgba(21,144,236,0.12),transparent)]",
    hover: "hover:border-[#1590ec]/50 hover:shadow-[0_22px_48px_-24px_rgba(21,144,236,0.45)]",
    check: "text-[#0369a1]",
  },
  blue: {
    edge: "bg-[linear-gradient(90deg,#0d5df5,#681bf5)]",
    tile: "bg-[linear-gradient(135deg,#0d5df5,#681bf5)] shadow-[0_8px_18px_-8px_rgba(13,93,245,0.65)]",
    glow: "bg-[radial-gradient(closest-side,rgba(13,93,245,0.1),transparent)]",
    hover: "hover:border-[#0d5df5]/45 hover:shadow-[0_22px_48px_-24px_rgba(13,93,245,0.4)]",
    check: "text-[#0d5df5]",
  },
  indigo: {
    edge: "bg-[linear-gradient(90deg,#681bf5,#1590ec)]",
    tile: "bg-[linear-gradient(135deg,#681bf5,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(104,27,245,0.6)]",
    glow: "bg-[radial-gradient(closest-side,rgba(104,27,245,0.09),transparent)]",
    hover: "hover:border-[#681bf5]/40 hover:shadow-[0_22px_48px_-24px_rgba(104,27,245,0.38)]",
    check: "text-[#681bf5]",
  },
} satisfies Record<string, Accent>;

type Pillar = {
  keyword: string;
  icon: LucideIcon;
  promise: string;
  /** what the area covers, drawn from content/services.ts */
  includes: string[];
  /** chip labels; `logo` is a heroTools id when a brand mark exists */
  tools: { label: string; logo?: string }[];
  accent: Accent;
};

const pillars: Pillar[] = [
  {
    keyword: "Web Solutions",
    icon: MonitorSmartphone,
    promise: "Fast, accessible websites, web apps and online stores, from custom builds to Shopify and WordPress.",
    includes: ["Websites and web apps", "Shopify and WordPress stores", "Speed, SEO and accessibility checks"],
    tools: [
      { label: "Next.js" },
      { label: "Shopify", logo: "shopify" },
      { label: "WordPress", logo: "wordpress" },
      { label: "WooCommerce" },
    ],
    accent: accents.aqua,
  },
  {
    keyword: "AI Automation",
    icon: Bot,
    promise: "AI agents and connected workflows that take repetitive work off your team, with a person reviewing what matters.",
    includes: ["AI agents and workflows", "Zapier, Make and n8n automation", "GoHighLevel CRM and funnels"],
    tools: [
      { label: "OpenAI" },
      { label: "Zapier", logo: "zapier" },
      { label: "Make", logo: "make" },
      { label: "n8n", logo: "n8n" },
      { label: "GoHighLevel" },
    ],
    accent: accents.ocean,
  },
  {
    keyword: "Growth Marketing",
    icon: TrendingUp,
    promise: "Email flows and Meta ad campaigns measured on revenue, with tracking you can trust.",
    includes: ["Email marketing flows and campaigns", "Meta ads on Facebook and Instagram", "Tracking and monthly reporting"],
    tools: [
      { label: "Klaviyo" },
      { label: "Meta Ads", logo: "meta" },
      { label: "Instagram", logo: "instagram" },
      { label: "Google Analytics", logo: "analytics" },
    ],
    accent: accents.blue,
  },
  {
    keyword: "Digital Support",
    icon: Headset,
    promise: "Trained support agents and assistants who keep your store, inbox and admin running smoothly.",
    includes: ["Shopify pre- and post-sales support", "Virtual assistants", "Weekly reporting"],
    tools: [
      { label: "Shopify", logo: "shopify" },
      { label: "Gorgias" },
      { label: "Google Workspace" },
      { label: "Notion", logo: "notion" },
    ],
    accent: accents.indigo,
  },
];

const logos = new Map(heroTools.map((tool) => [tool.id, tool.Icon]));

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const { keyword, icon: Icon, promise, accent } = pillar;
  const headingId = `pillar-${index}-heading`;

  return (
    <li
      className={
        "relative isolate flex flex-col overflow-hidden rounded-[24px] border border-[#e7e9ef] bg-white p-6 shadow-[0_1px_2px_rgba(20,20,20,0.04),0_12px_32px_-20px_rgba(20,20,20,0.12)] transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none sm:p-8 " +
        accent.hover
      }
    >
      <span aria-hidden className={"absolute inset-x-0 top-0 h-[3px] " + accent.edge} />
      <span
        aria-hidden
        className={"pointer-events-none absolute -top-28 -right-28 -z-10 size-72 rounded-full " + accent.glow}
      />

      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className={"flex size-12 shrink-0 items-center justify-center rounded-[14px] text-white " + accent.tile}
        >
          <Icon className="size-[22px]" strokeWidth={2} />
        </span>
        <h3 id={headingId} className="text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-[#141414] md:text-[24px]">
          {keyword}
        </h3>
      </div>

      <p className="mt-4 text-[15px] leading-[1.6] text-pretty text-[#555555] md:text-[16px]">{promise}</p>

      <p className="mt-6 text-[12px] font-semibold tracking-[0.1em] text-[#6b7080] uppercase" id={`${headingId}-includes`}>
        Includes
      </p>
      <ul aria-labelledby={`${headingId}-includes`} className="mt-2 divide-y divide-[#eef0f4] border-y border-[#eef0f4]">
        {pillar.includes.map((item) => (
          <li key={item}>
            <span className="flex items-center gap-3 py-3 text-[15px] leading-[1.35] font-semibold text-[#141414]">
              <Check aria-hidden className={"size-4 shrink-0 " + accent.check} strokeWidth={2.6} />
              {item}
            </span>
          </li>
        ))}
      </ul>

      <ul aria-label={`${keyword} tools`} className="mt-auto flex flex-wrap gap-2 pt-6">
        {pillar.tools.map(({ label, logo }) => {
          const Logo = logo ? logos.get(logo) : undefined;
          return (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e7e9ef] bg-white px-3 py-1 text-[13px] leading-[1.4] font-medium text-[#3b3f4a]"
            >
              {Logo ? <Logo aria-hidden focusable="false" className="size-3.5 shrink-0" /> : null}
              {label}
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export function ServicesSection() {
  return (
    <LandingSection id="services" tone="alt" labelledBy="services-heading">
      <LandingContainer>
        <LandingHeading
          id="services-heading"
          kicker="What we do"
          title="One team to build, automate, grow and support your business"
          lead="Start with one area or combine them. Every engagement starts with a written scope and a fixed price."
        />
        <ul className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.keyword} pillar={pillar} index={index} />
          ))}
        </ul>
      </LandingContainer>
    </LandingSection>
  );
}

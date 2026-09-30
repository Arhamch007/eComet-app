import { Bot, Check, Headset, MonitorSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";

/* "Our Services": the four core keywords as one row of compact cards on
   large screens (2 x 2 on tablets, stacked on phones). Copy follows the
   client's rewrite brief (eComet Text Re-Write.pdf): a one-line description
   and a short "What we can help with" checklist per service.
   Each card carries one logo colour (aqua, ocean, blue, indigo) as a thin
   top edge, a solid icon tile and the check marks.
   Hover: border and shadow only, 200ms; nothing moves.
   Tailwind needs literal class names, so every accent string is spelled out. */

type Accent = { edge: string; tile: string; hover: string; check: string };

const accents = {
  aqua: {
    edge: "bg-[linear-gradient(90deg,#01e2f8,#1590ec)]",
    tile: "bg-[linear-gradient(135deg,#01e2f8,#1590ec)] shadow-[0_8px_18px_-8px_rgba(1,226,248,0.7)]",
    hover: "hover:border-[#01e2f8]/60 hover:shadow-[0_18px_40px_-22px_rgba(1,190,220,0.5)]",
    check: "text-[#0e7490]",
  },
  ocean: {
    edge: "bg-[linear-gradient(90deg,#1590ec,#0d5df5)]",
    tile: "bg-[linear-gradient(135deg,#1590ec,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(21,144,236,0.7)]",
    hover: "hover:border-[#1590ec]/50 hover:shadow-[0_18px_40px_-22px_rgba(21,144,236,0.5)]",
    check: "text-[#0369a1]",
  },
  blue: {
    edge: "bg-[linear-gradient(90deg,#0d5df5,#681bf5)]",
    tile: "bg-[linear-gradient(135deg,#0d5df5,#681bf5)] shadow-[0_8px_18px_-8px_rgba(13,93,245,0.65)]",
    hover: "hover:border-[#0d5df5]/45 hover:shadow-[0_18px_40px_-22px_rgba(13,93,245,0.45)]",
    check: "text-[#0d5df5]",
  },
  indigo: {
    edge: "bg-[linear-gradient(90deg,#681bf5,#1590ec)]",
    tile: "bg-[linear-gradient(135deg,#681bf5,#0d5df5)] shadow-[0_8px_18px_-8px_rgba(104,27,245,0.6)]",
    hover: "hover:border-[#681bf5]/40 hover:shadow-[0_18px_40px_-22px_rgba(104,27,245,0.42)]",
    check: "text-[#681bf5]",
  },
} satisfies Record<string, Accent>;

type Service = {
  title: string;
  icon: LucideIcon;
  summary: string;
  helpWith: string[];
  accent: Accent;
};

const services: Service[] = [
  {
    title: "Web Solutions",
    icon: MonitorSmartphone,
    summary: "Modern, responsive websites and web applications built around your business needs.",
    helpWith: [
      "Business websites",
      "Web applications",
      "Shopify development",
      "WordPress development",
      "Custom features and integrations",
      "Website maintenance and support",
    ],
    accent: accents.aqua,
  },
  {
    title: "AI Automation",
    icon: Bot,
    summary: "Smart workflows and integrations that reduce repetitive work and save your team time.",
    helpWith: [
      "Workflow automation",
      "API integrations",
      "CRM automation",
      "Lead management",
      "Data automation",
      "Custom business processes",
    ],
    accent: accents.ocean,
  },
  {
    title: "Growth Marketing",
    icon: TrendingUp,
    summary: "Campaigns, automation and email systems designed to engage customers and drive results.",
    helpWith: [
      "Email campaigns",
      "Email automation",
      "Lead nurturing",
      "Customer follow-ups",
      "List management",
      "Campaign optimization",
    ],
    accent: accents.blue,
  },
  {
    title: "Digital Support",
    icon: Headset,
    summary: "Reliable day-to-day support for the digital tasks that keep your business moving.",
    helpWith: [
      "Digital operations support",
      "E-commerce management",
      "Customer experience support",
      "Content management",
      "Research and data management",
      "Workflow management",
    ],
    accent: accents.indigo,
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { title, icon: Icon, summary, helpWith, accent } = service;
  const headingId = `service-${index}-heading`;

  return (
    <li
      aria-labelledby={headingId}
      className={
        "relative flex flex-col overflow-hidden rounded-[20px] border border-[#e1e4ea] bg-white p-6 shadow-[0_1px_2px_rgba(20,20,20,0.04),0_10px_28px_-20px_rgba(20,20,20,0.18)] transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none " +
        accent.hover
      }
    >
      <span aria-hidden className={"absolute inset-x-0 top-0 h-[3px] " + accent.edge} />

      <span aria-hidden className={"flex size-11 items-center justify-center rounded-[12px] text-white " + accent.tile}>
        <Icon className="size-5" strokeWidth={2} />
      </span>

      <h3 id={headingId} className="mt-5 text-[19px] leading-[1.25] font-bold tracking-[-0.015em] text-[#141414]">
        {title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.55] text-pretty text-[#555555]">{summary}</p>

      <p className="mt-5 border-t border-[#eef0f4] pt-4 text-[11.5px] font-semibold tracking-[0.1em] text-[#6b7080] uppercase">
        What we can help with
      </p>
      <ul className="mt-3 space-y-2">
        {helpWith.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.4] font-medium text-[#23262f]">
            <Check aria-hidden className={"mt-[3px] size-3.5 shrink-0 " + accent.check} strokeWidth={3} />
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}

export function ServicesSection() {
  return (
    <LandingSection id="services" tone="alt" labelledBy="services-heading" className="bg-[#e5e7eb] py-16 md:py-20">
      <LandingContainer className="max-w-[1240px]">
        <LandingHeading
          id="services-heading"
          kicker="What we do"
          title="Our Services"
          lead="Practical digital solutions that help your business work better and grow faster."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </ul>
      </LandingContainer>
    </LandingSection>
  );
}

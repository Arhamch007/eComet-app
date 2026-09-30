import { ArrowRight, Bot, Headset, MonitorSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LandingContainer, LandingSection } from "@/components/landing/ui";

/* "Our Services": a blue gradient panel with the heading and translucent
   glass pillars in its bottom corners; the four service cards start inside
   the panel and run out past its bottom edge (about half in, half out), like
   the approved pricing reference. Copy follows the client's rewrite brief.
   Each card: round icon, summary, round check list and a Get started link
   to the contact form. Hover changes border and shadow only; nothing moves. */

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
  const { title, icon: Icon, summary, helpWith } = service;
  const headingId = `service-${index}-heading`;

  /* Layout from the approved reference (icon tile, faded number, title,
     summary, tag chips, text link), in the site's light theme. Hover: the
     icon tile fills with the logo gradient, the number and link turn blue,
     the border turns blue and a soft blue/indigo glow appears. Nothing moves. */
  return (
    <li
      aria-labelledby={headingId}
      className="group relative flex flex-col rounded-[20px] border border-[#e6e9f0] bg-white p-6 shadow-[0_2px_4px_rgba(20,30,60,0.04),0_20px_44px_-26px_rgba(13,60,160,0.35)] transition-[border-color,box-shadow] duration-200 hover:border-[#1590ec]/60 hover:shadow-[0_0_0_1px_rgba(21,144,236,0.18),0_24px_56px_-22px_rgba(104,27,245,0.38),0_0_40px_-12px_rgba(1,226,248,0.4)] motion-reduce:transition-none sm:p-7"
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden
          className="relative grid size-12 place-items-center overflow-hidden rounded-[14px] border border-[#e3e7ef] bg-[#f5f7fa] text-[#23262f] transition-[border-color,color] duration-200 group-hover:border-transparent group-hover:text-white"
        >
          <span className="absolute inset-0 bg-[linear-gradient(135deg,#01e2f8,#1590ec_35%,#0d5df5_65%,#681bf5)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <Icon className="relative size-[22px]" strokeWidth={1.9} />
        </span>
        <span
          aria-hidden
          className="text-[26px] leading-none font-bold tracking-[-0.02em] text-[#e3e7ef] tabular-nums transition-colors duration-200 group-hover:text-[#1590ec]/35"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 id={headingId} className="mt-6 text-[19px] leading-[1.25] font-bold tracking-[-0.015em] text-[#141414]">
        {title}
      </h3>
      <p className="mt-2 text-[14.5px] leading-[1.6] text-pretty text-[#555555]">{summary}</p>

      <ul aria-label={`${title}: what we can help with`} className="mt-5 flex flex-wrap gap-2">
        {helpWith.map((item) => (
          <li
            key={item}
            className="rounded-[10px] border border-[#e3e7ef] bg-[#f7f8fb] px-3 py-1 text-[12.5px] leading-[1.45] font-medium text-[#3b3f4a] transition-colors duration-200 group-hover:border-[#1590ec]/25 group-hover:bg-[#eef6fe]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          href="#contact"
          aria-label={`Get started with ${title}`}
          className="inline-flex items-center gap-1.5 rounded-md text-[14px] font-semibold text-[#0d5df5] transition-colors duration-200 hover:text-[#681bf5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d5df5]"
        >
          Get started
          <ArrowRight aria-hidden className="size-4" strokeWidth={2.2} />
        </Link>
      </div>
    </li>
  );
}

/* Translucent glass pillars in the bottom corners of the blue panel, tallest
   at the edge and stepping down towards the middle (reference design). */
function Pillars({ side }: { side: "left" | "right" }) {
  const bars = [
    { w: 88, h: 380, o: 0.22 },
    { w: 72, h: 300, o: 0.16 },
    { w: 58, h: 235, o: 0.11 },
  ];
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute bottom-0 hidden items-end gap-3 xl:flex " +
        (side === "left" ? "left-6 xl:left-8" : "right-6 flex-row-reverse xl:right-8")
      }
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className="block rounded-t-[22px] border border-b-0 border-white/35 backdrop-blur-[2px]"
          style={{
            width: b.w,
            height: b.h,
            background: `linear-gradient(180deg, rgba(255,255,255,${b.o + 0.12}) 0%, rgba(255,255,255,${b.o * 0.35}) 100%)`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        />
      ))}
    </div>
  );
}

export function ServicesSection() {
  return (
    <LandingSection id="services" tone="alt" labelledBy="services-heading" className="bg-[#e5e7eb] py-16 md:py-20">
      <LandingContainer className="max-w-[1280px]">
        {/* Blue panel: heading on top; the cards below start inside it and
            run out past its bottom edge, so it covers about half of them. */}
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#4fb3f6_0%,#1590ec_38%,#0d5df5_100%)] px-5 pt-14 pb-[180px] text-center shadow-[0_30px_60px_-30px_rgba(13,93,245,0.6)] md:rounded-[36px] md:pt-20 md:pb-[230px]">
          <div aria-hidden className="pointer-events-none absolute -top-24 right-[-8%] size-[420px] rounded-full bg-white/25 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-[20%] size-[380px] rounded-full bg-[#01e2f8]/25 blur-[100px]" />
          <Pillars side="left" />
          <Pillars side="right" />
          <div className="relative mx-auto max-w-[640px]">
            <p className="text-[13px] font-semibold tracking-[0.14em] text-white/85 uppercase">What we do</p>
            <h2
              id="services-heading"
              className="mt-3 text-[34px] leading-[1.08] font-bold tracking-[-0.03em] text-white md:text-[48px]"
            >
              Our Services
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.6] text-pretty text-white/85 md:text-[17px]">
              Practical digital solutions that help your business work better and grow faster.
            </p>
          </div>
        </div>

        <ul className="relative z-10 -mt-[140px] grid grid-cols-1 gap-5 px-3 sm:grid-cols-2 md:-mt-[190px] md:px-6 lg:px-12 xl:grid-cols-4 xl:px-10 2xl:px-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </ul>
      </LandingContainer>
    </LandingSection>
  );
}

import { ArrowRight, Bot, Headset, MonitorSmartphone, TrendingUp, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { LandingContainer, LandingHeading, LandingSection } from "@/components/landing/ui";

/* "Our Services": heading and the four service cards in one row from 1024px
   (2 x 2 on tablets, one column on phones); sizing tightens on small laptops, laid out like the approved reference in the site's light theme.
   Copy follows the client's rewrite brief. */

type Service = {
  title: string;
  icon: LucideIcon;
  summary: string;
  helpWith: string[];
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
      className="group relative flex flex-col rounded-[20px] border border-[#e6e9f0] bg-white p-6 shadow-[0_2px_4px_rgba(20,30,60,0.04),0_20px_44px_-26px_rgba(13,60,160,0.35)] transition-[border-color,box-shadow] duration-200 hover:border-[#1590ec]/60 hover:shadow-[0_0_0_1px_rgba(21,144,236,0.18),0_24px_56px_-22px_rgba(104,27,245,0.38),0_0_40px_-12px_rgba(1,226,248,0.4)] motion-reduce:transition-none lg:p-4 xl:p-6"
    >
      <div className="flex items-start justify-between">
        <span
          aria-hidden
          className="relative grid size-11 place-items-center overflow-hidden rounded-[12px] border border-[#e3e7ef] bg-[#f5f7fa] text-[#23262f] transition-[border-color,color] duration-200 group-hover:border-transparent group-hover:text-white"
        >
          <span className="absolute inset-0 bg-[linear-gradient(135deg,#01e2f8,#1590ec_35%,#0d5df5_65%,#681bf5)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <Icon className="relative size-5" strokeWidth={1.9} />
        </span>
        <span
          aria-hidden
          className="text-[22px] leading-none font-bold tracking-[-0.02em] text-[#e3e7ef] tabular-nums transition-colors duration-200 group-hover:text-[#1590ec]/35"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 id={headingId} className="mt-5 text-[18px] leading-[1.25] font-bold lg:mt-4 lg:text-[16px] xl:mt-5 xl:text-[18px] tracking-[-0.015em] text-[#141414]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.55] text-pretty text-[#555555] lg:text-[13px] xl:text-[14px]">{summary}</p>

      <ul aria-label={`${title}: what we can help with`} className="mt-4 flex flex-wrap gap-1.5">
        {helpWith.map((item) => (
          <li
            key={item}
            className="rounded-full border border-[#dfe3ea] bg-transparent px-2.5 py-[3px] text-[12px] whitespace-nowrap lg:px-2 lg:text-[11px] xl:px-2.5 xl:text-[12px] leading-[1.45] font-medium text-[#3b3f4a] transition-colors duration-200 group-hover:border-[#1590ec]/45 group-hover:text-[#0d5df5]"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
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

export function ServicesSection() {
  return (
    <LandingSection id="services" tone="alt" labelledBy="services-heading" className="bg-[#e5e7eb] py-16 md:py-24">
      <LandingContainer className="max-w-[1280px] lg:px-4 xl:px-6">
        <LandingHeading
          id="services-heading"
          kicker="What we do"
          title="Our Services"
          lead="Practical digital solutions that help your business work better and grow faster."
        />
        <ul className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-3 xl:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </ul>
      </LandingContainer>
    </LandingSection>
  );
}

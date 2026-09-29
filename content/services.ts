import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Code2,
  ShoppingBag,
  Mail,
  Megaphone,
  Workflow,
  Layers,
  Headset,
} from "lucide-react";

/* DRAFT copy: structure and claims are modest by design. The eComet team should
   confirm deliverables, tools and FAQ answers before launch. */

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  featured?: boolean;
  intro: string;
  audience: string;
  deliverables: string[];
  tools: string[];
  pricingModel: string;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    name: "AI automation",
    short: "Agents and workflows that take repetitive work off your team's desk.",
    icon: Bot,
    featured: true,
    intro:
      "We design and build AI-assisted workflows for support, sales and operations: triage, drafting, data entry, reporting and hand-offs between the tools you already use.",
    audience:
      "Teams that answer the same questions, copy the same data or write the same reports every day.",
    deliverables: [
      "Process map of the workflow before and after automation",
      "Prompted agents and guardrails for each step",
      "Integrations with your CRM, helpdesk, store or sheets",
      "Human review points, logging and a fallback path",
      "Documentation and a hand-over session",
    ],
    tools: ["OpenAI", "n8n", "Make", "Zapier", "GoHighLevel", "Slack"],
    pricingModel: "Fixed-scope sprint per workflow, then an optional monthly care plan.",
    faqs: [
      { q: "Which tasks are a good fit for AI automation?", a: "Repetitive, rule-based work with a clear input and output: inbox triage, order and ticket routing, first-draft replies, data enrichment and scheduled reports. We start with one workflow and measure it before adding more." },
      { q: "Will a human still be in the loop?", a: "Yes, wherever a mistake would cost money or trust. Every workflow we build has review points and a fallback to a person." },
      { q: "Who owns the accounts and prompts?", a: "You do. Everything is set up in your own accounts and documented so any team member can maintain it." },
    ],
  },
  {
    slug: "web-development",
    name: "Web development",
    short: "Fast, maintainable websites and web apps built on modern stacks.",
    icon: Code2,
    intro:
      "From marketing sites to customer portals, we build with performance, accessibility and search visibility in the plan from day one.",
    audience: "Businesses that need a site or web app they can trust to load fast, rank and grow with them.",
    deliverables: [
      "Design system and responsive layouts",
      "Next.js, React or WordPress builds depending on your needs",
      "CMS setup so your team can edit content",
      "Core Web Vitals, accessibility and SEO checks before launch",
      "Hosting, analytics and hand-over",
    ],
    tools: ["Next.js", "React", "WordPress", "Tailwind CSS", "Vercel", "Netlify"],
    pricingModel: "Project quote after a scoping call, with phased delivery.",
    faqs: [
      { q: "Can you work with our existing site?", a: "Yes. We audit what you have first and recommend a rebuild only when it costs less than patching." },
      { q: "How do you handle performance?", a: "Image optimisation, self-hosted fonts, minimal JavaScript and a motion budget are part of every build, and we measure with Lighthouse before launch." },
    ],
  },
  {
    slug: "shopify-support",
    name: "Shopify pre- and post-sales support",
    short: "Agents who answer customers, manage orders and keep your store tidy.",
    icon: ShoppingBag,
    intro:
      "Trained support agents handle pre-sales questions, order changes, returns, reviews and store housekeeping so your customers get answers and your team gets its day back.",
    audience: "Shopify brands whose inbox, chat and order queue have outgrown the founders.",
    deliverables: [
      "Shared inbox, chat and social DM coverage",
      "Order edits, returns, exchanges and refunds by your policy",
      "Product uploads, collections and content updates",
      "Review and FAQ management",
      "Weekly reporting on volume, response times and themes",
    ],
    tools: ["Shopify", "Gorgias", "Zendesk", "Klaviyo", "Meta Business Suite"],
    pricingModel: "Monthly retainer by hours of coverage.",
    faqs: [
      { q: "Do you cover our time zone?", a: "Coverage windows are agreed per client. Tell us the hours that matter and we staff them." },
      { q: "How do agents learn our brand voice?", a: "We build a playbook with your policies, tone and macros during onboarding and review it with you monthly." },
    ],
  },
  {
    slug: "email-marketing",
    name: "Email marketing",
    short: "Flows and campaigns that bring customers back without spamming them.",
    icon: Mail,
    intro:
      "Welcome, abandoned cart, post-purchase and win-back flows, plus campaigns planned around your calendar, all measured on revenue rather than opens.",
    audience: "E-commerce and service brands with a list that is not yet paying for itself.",
    deliverables: [
      "Account audit and deliverability check",
      "Core automated flows with copy and design",
      "Campaign calendar and monthly sends",
      "Segmentation and A/B tests",
      "Monthly revenue and list-health report",
    ],
    tools: ["Klaviyo", "Mailchimp", "GoHighLevel", "Shopify"],
    pricingModel: "Setup project plus a monthly management retainer.",
    faqs: [
      { q: "Which platform do you recommend?", a: "Klaviyo for Shopify brands; GoHighLevel for service businesses already using it for CRM. We work in whichever you have." },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta ads",
    short: "Facebook and Instagram campaigns managed for return, not reach.",
    icon: Megaphone,
    intro:
      "Campaign structure, creative testing and weekly optimisation on Meta, with tracking set up properly so the numbers you see are the numbers that matter.",
    audience: "Brands spending on Meta that want clearer reporting and steadier results.",
    deliverables: [
      "Pixel, Conversions API and event setup",
      "Campaign structure and audience plan",
      "Creative briefs and testing cadence",
      "Weekly optimisation and budget pacing",
      "Monthly performance report",
    ],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Shopify", "Google Analytics"],
    pricingModel: "Monthly management fee, ad spend billed to your account.",
    faqs: [
      { q: "Do you make the creative?", a: "We write briefs and can produce static and simple video creative; larger productions are scoped separately." },
    ],
  },
  {
    slug: "gohighlevel",
    name: "GoHighLevel",
    short: "CRM, funnels, calendars and automations set up and run for you.",
    icon: Layers,
    intro:
      "We configure GoHighLevel end to end: pipelines, funnels, booking calendars, SMS and email automations, and the reporting your team will actually look at.",
    audience: "Agencies and service businesses running sales and follow-up on GoHighLevel.",
    deliverables: [
      "Account structure, pipelines and custom fields",
      "Funnels, forms and booking calendars",
      "Follow-up automations for leads and appointments",
      "Snapshots for repeatable client setups",
      "Training and ongoing administration",
    ],
    tools: ["GoHighLevel", "Twilio", "Zapier", "Make"],
    pricingModel: "Setup project plus an optional monthly administration plan.",
    faqs: [
      { q: "Can you migrate us from another CRM?", a: "Yes. We map fields and stages, import contacts and run both systems in parallel for a short period." },
    ],
  },
  {
    slug: "workflow-automation",
    name: "Zapier, Make and n8n automation",
    short: "Connect your tools so data moves without anyone copying it.",
    icon: Workflow,
    intro:
      "Order, lead, invoice and support data flowing between your store, CRM, sheets and messaging tools, with error handling and monitoring included.",
    audience: "Teams juggling five or more tools and re-typing data between them.",
    deliverables: [
      "Integration map and trigger list",
      "Scenarios built in Zapier, Make or n8n",
      "Error handling, retries and alerts",
      "Documentation of every automation",
      "Monthly review and clean-up",
    ],
    tools: ["Zapier", "Make", "n8n", "Airtable", "Google Sheets", "Slack"],
    pricingModel: "Per-automation fixed price or a monthly automation retainer.",
    faqs: [
      { q: "Zapier, Make or n8n: which one?", a: "Zapier for speed and breadth of connectors, Make for complex branching at lower cost, n8n when you want to self-host. We recommend after seeing your stack." },
    ],
  },
  {
    slug: "virtual-assistants",
    name: "Virtual assistants",
    short: "Trained assistants for admin, research, data and customer operations.",
    icon: Headset,
    intro:
      "Dedicated or shared assistants for inbox and calendar management, research, data entry, listings, bookkeeping support and customer operations, managed by a team lead.",
    audience: "Founders and managers who need reliable hands without hiring in-house.",
    deliverables: [
      "Role definition and onboarding playbook",
      "Dedicated assistant with a backup",
      "Daily task tracking and weekly summaries",
      "Quality checks by a team lead",
      "Flexible hours as your needs change",
    ],
    tools: ["Google Workspace", "Notion", "Slack", "Shopify", "GoHighLevel"],
    pricingModel: "Monthly retainer by hours.",
    faqs: [
      { q: "How quickly can an assistant start?", a: "Typically within one to two weeks of the onboarding call, once the playbook is agreed." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

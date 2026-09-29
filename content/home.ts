import { Handshake, UserCheck, Clock3, type LucideIcon } from "lucide-react";

/* DRAFT copy for the eComet team to confirm. */

/** Pain points for the self-diagnosis grid; each maps to one service slug. */
export const pains: { id: string; text: string; service: string }[] = [
  { id: "inbox", text: "Customer emails wait hours for a reply", service: "shopify-support" },
  { id: "sync", text: "Orders, stock and sheets never match", service: "workflow-automation" },
  { id: "leads", text: "New leads go cold before anyone calls", service: "gohighlevel" },
  { id: "copy", text: "Your team re-types data between tools", service: "ai-automation" },
  { id: "ads", text: "Ad spend climbs but sales stay flat", service: "meta-ads" },
  { id: "email", text: "Your email list is not earning its keep", service: "email-marketing" },
  { id: "site", text: "The website is slow or hard to update", service: "web-development" },
  { id: "admin", text: "Founders are stuck doing admin", service: "virtual-assistants" },
];

export const pillars: { icon: LucideIcon; title: string; text: string; stat: string }[] = [
  {
    icon: Handshake,
    title: "One team to build it and run it",
    text: "The developers who build your store or automation sit next to the agents and assistants who operate it every day, so fixes do not wait for a hand-off.",
    stat: "8 service lines, one point of contact",
  },
  {
    icon: UserCheck,
    title: "Automation with a person in the loop",
    text: "Every AI workflow ships with review points, logging and a fallback to a person, so speed never costs you a customer.",
    stat: "Review points on every workflow",
  },
  {
    icon: Clock3,
    title: "Hours that overlap yours",
    text: "Coverage windows are agreed per client across North American and European business days, with weekly reporting you can read in two minutes.",
    stat: "USA · Canada · Europe",
  },
];

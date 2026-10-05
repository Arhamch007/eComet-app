/* Site-wide facts. Values marked TODO are open questions from the design audit
   (design-audit/README.md) and must be confirmed by the eComet team before launch. */

/** Preview deploys set NEXT_PUBLIC_NOINDEX=1 so search engines keep them out of the index. */
export const noindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const site = {
  name: "eComet",
  legalName: "eComet Technologies",
  /** Set NEXT_PUBLIC_SITE_URL for a preview deploy (e.g. a netlify.app address) so canonical, sitemap and the share image point at that host. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://teamecomet.com",
  tagline: "Web development, automation, email marketing and digital support for businesses that want to work smarter and grow",
  /** The agency's four core keywords, in this order, used in the hero and page titles. */
  keywords: ["Web Solutions", "AI Automation", "Growth Marketing", "Digital Support"],
  description:
    "eComet delivers Web Solutions, AI Automation, Growth Marketing and Digital Support: web development, Shopify support, AI and Zapier, Make and n8n automation, email marketing, Meta ads, GoHighLevel and virtual assistants for businesses in the USA, Canada and Europe.",
  email: "hr@teamecomet.com", // TODO (audit F-07): replace with a sales mailbox
  phone: null as string | null, // TODO (audit F-04): the live number and its tel link disagree; confirm one number with country code
  whatsapp: null as string | null, // TODO: WhatsApp business number, if any
  address: {
    street: "F-Block, Street #9",
    city: "Vehari",
    country: "Pakistan",
  },
  markets: ["United States", "Canada", "Europe"],
  hours: "Working hours that overlap North American and European business days", // DRAFT: confirm coverage windows
  social: {
    linkedin: "https://www.linkedin.com/company/ecomet-technologies/",
    facebook: "https://www.facebook.com/profile.php?id=100090162676178",
    upwork: "https://www.upwork.com/agencies/1114861152675102720/",
  },
  cta: { label: "Book a free consultation", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  tools: ["Shopify", "Klaviyo", "Meta Ads", "GoHighLevel", "Zapier", "Make", "n8n", "OpenAI", "React", "Next.js"],
} as const;

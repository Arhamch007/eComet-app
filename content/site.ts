/* Site-wide facts. Values marked TODO are open questions from the design audit
   (design-audit/README.md) and must be confirmed by the eComet team before launch. */

export const site = {
  name: "eComet",
  legalName: "eComet Technologies",
  url: "https://teamecomet.com",
  tagline: "AI automation, web development and e-commerce support for growing brands",
  description:
    "eComet is a 20-plus person agency delivering AI automation, web development, Shopify pre- and post-sales support, email marketing, Meta ads, GoHighLevel, Zapier, Make and n8n automation and virtual assistants for businesses in the USA, Canada and Europe.",
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
  secondaryCta: { label: "See our work", href: "/work" },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  tools: ["Shopify", "Klaviyo", "Meta Ads", "GoHighLevel", "Zapier", "Make", "n8n", "OpenAI", "React", "Next.js"],
} as const;

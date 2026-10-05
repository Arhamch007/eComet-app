import { site } from "@/content/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/logo.svg`,
        description: site.description,
        email: site.email,
        sameAs: [site.social.linkedin, site.social.facebook, site.social.upwork],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressCountry: "PK",
        },
        areaServed: ["US", "CA", "EU"],
        knowsAbout: [...site.keywords, ...site.tools],
        // The four services as shown in the Services section.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "eComet services",
          itemListElement: [
            ["Web Solutions", "Modern, responsive websites and web applications built around your business needs."],
            ["AI Automation", "Smart workflows and integrations that reduce repetitive work and save your team time."],
            ["Growth Marketing", "Campaigns, automation and email systems designed to engage customers and drive results."],
            ["Digital Support", "Reliable day-to-day support for the digital tasks that keep your business moving."],
          ].map(([name, description]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, description, provider: { "@id": `${site.url}/#organization` } },
          })),
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: site.email,
            areaServed: ["US", "CA", "EU"],
            availableLanguage: ["en"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

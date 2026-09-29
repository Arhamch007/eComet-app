/* DRAFT. Descriptions are rewritten from the previous site's own wording for
   the projects it described from eComet's side. Projects whose old pages used
   the client's corporate copy (Halyard, Proficio) or credited another agency
   (audit F-01) are left out until the team confirms eComet's role
   (audit Open Question 2). No outcome metrics are stated because none were
   verified; add `results` once real figures exist. */

export type Project = {
  slug: string;
  client: string;
  industry: string;
  market?: string;
  services: string[];
  tools: string[];
  scope: string;
  summary: string;
  url?: string;
  /** Omit when no usable screenshot exists; the UI renders a designed placeholder. */
  image?: string;
  imageAlt?: string;
  results?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "beauty-smile",
    client: "Beauty Smile",
    industry: "Dental cosmetics e-commerce",
    market: "France",
    services: ["Shopify support", "Virtual assistants"],
    tools: ["Shopify"],
    scope: "Shopify store management and a streamlined product upload process.",
    summary:
      "Ongoing Shopify store management for a dental-cosmetics brand: product uploads, catalogue organisation and content updates handled by a dedicated support agent so the team can focus on the brand.",
    url: "https://beautesourire.fr/",
    image: "/images/services-details/Luke/Luke2.png",
    imageAlt: "Beauty Smile Shopify storefront",
  },
  {
    slug: "havoc-parts",
    client: "Havoc Parts",
    industry: "Motorcycle parts retail",
    services: ["Shopify support"],
    tools: ["Shopify"],
    scope: "Product uploads, collections and day-to-day store support on Shopify.",
    summary:
      "E-commerce support for a parts retailer: uploading and organising products on the Shopify store, keeping collections and content current and handling routine store tasks.",
    image: "/images/services-details/Jarrod/havoc1.png",
    imageAlt: "Havoc Parts Shopify storefront",
  },
  {
    slug: "dr-ganja",
    client: "Dr.Ganja",
    industry: "Online retail",
    market: "United States",
    services: ["Virtual assistants", "E-commerce operations"],
    tools: ["WordPress"],
    scope: "Order processing for domestic and international orders on a WordPress store.",
    summary:
      "A dedicated team processes orders from placement through fulfilment, covering both domestic and international customers for a WordPress-based store.",
    url: "https://www.drganja.com/",
    image: "/images/services-details/Ganja/ganja3.png",
    imageAlt: "Dr.Ganja online store",
  },
  {
    slug: "merley",
    client: "Merley",
    industry: "Online retail",
    services: ["Shopify support"],
    tools: ["Shopify"],
    scope: "Product uploads and store upkeep for a Shopify retailer.",
    summary:
      "Efficient, checked product uploads and ongoing catalogue upkeep on Shopify so new items go live quickly and consistently.",
    url: "https://www.merley.se/",
    // The previous site's Merley screenshots are corrupt PNGs; add a fresh capture when available.
  },
  {
    slug: "snap-smile",
    client: "Snap Smile",
    industry: "Online retail",
    services: ["Shopify support"],
    tools: ["Shopify"],
    scope: "Product uploads and catalogue curation on Shopify.",
    summary:
      "Product uploads with curated titles, descriptions and imagery on the Shopify store, keeping the catalogue vibrant and customer-friendly.",
    url: "https://shopsnapsmile.com/",
    image: "/images/services-details/Ben/Ben2.png",
    imageAlt: "Snap Smile Shopify storefront",
  },
  {
    slug: "lively",
    client: "Lively",
    industry: "Women's apparel e-commerce",
    services: ["Web development", "Workflow automation"],
    tools: ["Ruby on Rails", "React"],
    scope: "Development on a Rails and React codebase plus a custom web app for internal automation.",
    summary:
      "Enhancements to an existing Ruby on Rails and React platform for a large online women's store, including a custom web application that automates internal processes.",
    url: "https://www.wearlively.com",
    image: "/images/services-details/Lively/Lively1.jpg",
    imageAlt: "Lively online store",
  },
  {
    slug: "fellon",
    client: "Fellon",
    industry: "Online retail",
    services: ["Shopify support"],
    tools: ["Shopify"],
    scope: "Product uploads and catalogue management on Shopify.",
    summary:
      "Expert assistance uploading products to the Shopify store, from imagery and descriptions to collections, as part of a broader e-commerce support engagement.",
    image: "/images/services-details/Fellon/fellon3.png",
    imageAlt: "Fellon Shopify storefront",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.slice(0, 6);

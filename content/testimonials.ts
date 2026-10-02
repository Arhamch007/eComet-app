/* Pulled verbatim from the live site (teamecomet.com) at the client's
   direction (2026-10-02), as the testimonial copy for the redesign. Portraits
   are intentionally not shown until real ones exist. */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  source?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "eComet's seamless interface and centralized task management are transformative for our e-commerce operations, efficiency redefined for unparalleled productivity.",
    name: "David Ko",
    role: "CEO, Drganja.com",
  },
  {
    quote:
      "eComet stands out as a top-tier software house. They're not just problem solvers; they're incredibly creative ones. Reliable, smart, and fun to work with, they're truly the full package.",
    name: "Lexi Ehrman",
    role: "Head of Technology",
  },
  {
    quote:
      "eComet's business development services are exceptional: tailored strategies, insightful analysis, and seamless communication. An invaluable partner in our growth journey.",
    name: "Alexander Nouveau",
    role: "CEO, nouveaustartups.com",
  },
  {
    quote:
      "They are highly professional and seasoned, evident in their top-quality deliverables. Committed, creative, and a pleasure to work with, their expertise shines through in every project.",
    name: "Logan Smith",
    role: "TechCorp Solutions",
  },
  {
    quote:
      "Quick, efficient communication and execution. Went from idea to completion in just hours. Clean, clear code, direct and easy to work with.",
    name: "Oscar Adams",
    role: "InnovateTech Ventures",
  },
];

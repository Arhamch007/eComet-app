/* Quotes, names and titles supplied by the client (2026-11-14), replacing
   the earlier set carried over from the previous site. Portraits exist only
   for the two people who were already on the site; the client will send the
   rest, and until then the cards show the person's initials. */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Portrait under /public. Leave out to show initials instead. */
  image?: string;
  source?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Their web solutions team turned our outdated site into a polished, fast experience that’s easy for customers to use.",
    name: "Ben Gardner",
    role: "CEO | European Safety Bureau & Navitas Safety",
  },
  {
    quote:
      "The AI automation they set up saves our team hours each week and keeps routine tasks running smoothly.",
    name: "Christian Crenshaw",
    role: "CEO | Community Launch",
  },
  {
    quote:
      "Our marketing campaigns are more focused now, and we’re seeing better engagement from the right audience.",
    name: "Alexander Sean",
    role: "Founder | Nouveau Startups",
    image: "/images/testimonials/alexander-sean.jpg",
  },
  {
    quote:
      "Support is responsive and practical; whenever we run into an issue, they help us find a clear solution.",
    name: "Sharif Ceasar",
    role: "Founder | Content Cartel",
  },
  {
    quote:
      "eComet understood our goals and brought our website, marketing, and digital tools together in a way that works.",
    name: "David Ko",
    role: "Founder | Dr Ganja",
    image: "/images/testimonials/david-ko.jpg",
  },
  {
    quote:
      "From the first call to launch, the team communicated clearly and delivered exactly what our business needed.",
    name: "Willow Sibert",
    role: "Founder | Peak Aspirations",
  },
];

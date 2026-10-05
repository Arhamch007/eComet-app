import dynamic from "next/dynamic";
import { FloatingNav } from "@/components/landing/floating-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { StatsSection } from "@/components/landing/stats-section";
import { ServicesSection } from "@/components/landing/services-section";
import { WhySection } from "@/components/landing/why-section";
import { LandingFooter } from "@/components/landing/landing-footer";

/* The three heaviest client components (scroll-linked animation, carousel
   state, form state) are all well below the fold. Loading them as separate
   chunks instead of bundling them into the initial script lets the browser
   finish hydrating the Hero and nav first and spreads the rest of the
   hydration work into smaller pieces it can interleave with scrolling,
   instead of one long task blocking the main thread right after load (the
   actual cause of sections/the hero briefly not responding on a scroll
   right after the page appears ready -- confirmed with CPU throttling: the
   long tasks showed up before any scrolling happened at all, purely from
   hydrating everything at once). Server-rendered HTML is unchanged either
   way (ssr stays on), so there is no content flash and no SEO impact. */
const ProcessSection = dynamic(() => import("@/components/landing/process-section").then((m) => m.ProcessSection));
const TestimonialsSection = dynamic(() =>
  import("@/components/landing/testimonials-section").then((m) => m.TestimonialsSection)
);
const ContactSection = dynamic(() => import("@/components/landing/contact-section").then((m) => m.ContactSection));

/* Single-page site: nav anchors #services, #process, #why, #contact. */
export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-figtree)]">
      <FloatingNav />
      <main id="main">
        <LandingHero />
        <StatsSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <WhySection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
}

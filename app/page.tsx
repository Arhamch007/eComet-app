import { FloatingNav } from "@/components/landing/floating-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { StatsSection } from "@/components/landing/stats-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ProcessSection } from "@/components/landing/process-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { WhySection } from "@/components/landing/why-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { LandingFooter } from "@/components/landing/landing-footer";

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
        <FaqSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
}

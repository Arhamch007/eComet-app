import { FloatingNav } from "@/components/landing/floating-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { ServicesSection } from "@/components/landing/services-section";
import { ProcessSection } from "@/components/landing/process-section";
import { WhySection } from "@/components/landing/why-section";
import { ContactSection } from "@/components/landing/contact-section";
import { LandingFooter } from "@/components/landing/landing-footer";

/* Single-page site: nav anchors #services, #process, #why, #contact. */
export default function HomePage() {
  return (
    <div className="font-[family-name:var(--font-figtree)]">
      <FloatingNav />
      <main id="main">
        <LandingHero />
        <ServicesSection />
        <ProcessSection />
        <WhySection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
}

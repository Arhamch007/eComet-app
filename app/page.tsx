import { Hero } from "@/components/home/hero";
import { TrustTicker } from "@/components/home/trust-ticker";
import { SelectedWork } from "@/components/home/selected-work";
import { ProblemCheck } from "@/components/home/problem-check";
import { ServicesReveal } from "@/components/home/services-reveal";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";
import { Process } from "@/components/home/process";
import { TickerBand } from "@/components/home/ticker-band";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { ContactBand } from "@/components/home/contact-band";

/* Section order follows the Stackworx home flow, upgraded (see
   design-audit/stackworx/stackworx-home-spec.md). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <SelectedWork />
      <ProblemCheck />
      <ServicesReveal />
      <Testimonials />
      <WhyChoose />
      <Process />
      <TickerBand />
      <Faq />
      <FinalCta />
      <ContactBand />
    </>
  );
}

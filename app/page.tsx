import { Hero } from "@/components/home/hero";
import { TrustTicker } from "@/components/home/trust-ticker";
import { ServicesBento } from "@/components/home/services-bento";
import { SelectedWork } from "@/components/home/selected-work";
import { Process } from "@/components/home/process";
import { Proof } from "@/components/home/proof";
import { CtaBand } from "@/components/home/cta-band";
import { Testimonials } from "@/components/home/testimonials";
import { TeamSnapshot } from "@/components/home/team-snapshot";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <ServicesBento />
      <SelectedWork />
      <Process />
      <Proof />
      <CtaBand />
      <Testimonials />
      <TeamSnapshot />
      <Faq />
      <FinalCta />
    </>
  );
}

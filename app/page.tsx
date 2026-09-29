import { FloatingNav } from "@/components/landing/floating-nav";
import { LandingHero } from "@/components/landing/landing-hero";

/* New design, step 1: navigation and hero only. Sections below the hero are
   added once they are approved. */
export default function HomePage() {
  return (
    <>
      <FloatingNav />
      <main id="main">
        <LandingHero />
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { PageBand } from "@/components/site/page-band";
import { ServiceNav } from "@/components/services/service-nav";
import { ServiceRows } from "@/components/services/service-rows";
import { EngagementModels } from "@/components/services/engagement-models";
import { Button } from "@/components/ui/button";
import { TickerBand } from "@/components/home/ticker-band";
import { Testimonials } from "@/components/home/testimonials";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services: AI automation, web development, Shopify support and more",
  description:
    "Eight service lines under one team: AI automation, web development, Shopify pre- and post-sales support, email marketing, Meta ads, GoHighLevel, Zapier, Make and n8n automation, and virtual assistants.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBand
        align="center"
        eyebrow="Services"
        title="Eight service lines. One team that builds it and runs it."
        lead="Pick one service or combine several. Every engagement gets a named point of contact, a written scope and a fixed price before work starts."
        crumbs={[{ label: "Services", href: "/services" }]}
      >
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={site.cta.href} variant="blue" size="lg" tile>
            {site.cta.label}
          </Button>
          <Button href="#models-heading" variant="secondary" size="lg">
            Ways to work with us
          </Button>
        </div>
      </PageBand>
      <ServiceNav />
      <ServiceRows />
      <TickerBand />
      <EngagementModels />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}

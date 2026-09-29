import { CalendarClock, Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="final-cta-heading">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-feature border border-border-1 bg-bg-1 p-8 md:p-14">
            {/* The gradient's one wash on the page, at 20 percent over black */}
            <div aria-hidden className="gradient-comet absolute inset-0 opacity-20" />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_0%,rgba(7,7,11,0)_0%,rgba(7,7,11,0.85)_100%)]" />
            <div aria-hidden className="glow-violet pointer-events-none absolute -top-20 right-0 h-72 w-96" />

            <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <h2 id="final-cta-heading" className="font-display text-[32px] leading-[1.1] font-semibold text-text-1 md:text-[44px]">
                  Ready when you are
                </h2>
                <p className="mt-4 max-w-xl text-lg text-text-2">
                  Book a free consultation, or write to us with what you need. You will hear back within one business day.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={site.cta.href} size="lg">
                    {site.cta.label}
                  </Button>
                  <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                    <Mail className="size-4" aria-hidden /> {site.email}
                  </Button>
                </div>
              </div>
              <dl className="grid gap-5 text-sm md:col-span-5">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="font-medium text-text-1">Office</dt>
                    <dd className="text-text-2">
                      {site.address.street}, {site.address.city}, {site.address.country}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CalendarClock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="font-medium text-text-1">Markets and hours</dt>
                    <dd className="text-text-2">
                      {site.markets.join(", ")}. {site.hours}.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

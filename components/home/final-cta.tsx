import { CalendarClock, Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/* The one full gradient block on a page (Mau5tech-style contact card).
   Deep 700-level stops keep white text above 4.5:1. */
export function FinalCta() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="final-cta-heading">
      <Container>
        <Reveal>
          <div className="gradient-comet-deep relative overflow-hidden rounded-feature p-8 text-white shadow-[0_30px_60px_-20px_rgba(79,70,229,0.45)] md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <h2 id="final-cta-heading" className="font-display text-[34px] leading-[1.08] font-semibold md:text-[48px]">
                  Ready when you are
                </h2>
                <p className="mt-4 max-w-xl text-lg text-white/90">
                  Book a free consultation, or write to us with what you need. You will hear back within one business day.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href={site.cta.href} variant="inverse" size="lg">
                    {site.cta.label}
                  </Button>
                  <Button href={`mailto:${site.email}`} variant="outline-light" size="lg">
                    <Mail className="size-4" aria-hidden /> Email us
                  </Button>
                </div>
              </div>
              <dl className="grid gap-5 rounded-card bg-white/10 p-6 text-sm ring-1 ring-white/20 md:col-span-5">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <div>
                    <dt className="font-semibold">Office</dt>
                    <dd className="text-white/90">
                      {site.address.street}, {site.address.city}, {site.address.country}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CalendarClock className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <div>
                    <dt className="font-semibold">Markets and hours</dt>
                    <dd className="text-white/90">
                      {site.markets.join(", ")}. {site.hours}.
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <div>
                    <dt className="font-semibold">Email</dt>
                    <dd>
                      <a href={`mailto:${site.email}`} className="text-white/90 underline-offset-4 hover:underline">
                        {site.email}
                      </a>
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

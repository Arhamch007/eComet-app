import { site } from "@/content/site";
import { Container } from "@/components/ui/primitives";
import { TagPill } from "@/components/ui/atoms";
import { ContactForm } from "@/components/site/contact-form";

/* Stackworx dark contact block (3px accent top rule, big links left, form
   right), in navy with the multi-step qualifier instead of three bare fields. */
export function ContactBand() {
  return (
    <section
      id="contact"
      data-theme="dark"
      aria-labelledby="contact-band-heading"
      className="relative border-t-[3px] border-accent bg-night text-white shadow-[0_-1px_24px_rgba(77,159,255,0.35)]"
    >
      <div aria-hidden className="grid-dark absolute inset-0 opacity-40" />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-2 lg:gap-0 lg:py-24">
        <div className="lg:border-r lg:border-white/10 lg:pr-14">
          <TagPill className="bg-night-tile">Contact</TagPill>
          <h2 id="contact-band-heading" className="font-display mt-6 text-[32px] leading-[1.1] font-semibold md:text-[44px]">
            Tell us what you need
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 block text-[22px] font-bold break-all transition-colors hover:text-signal md:text-[28px]"
          >
            {site.email}
          </a>
          {site.phone ? (
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="mt-3 block text-[22px] font-bold hover:text-signal md:text-[28px]">
              {site.phone}
            </a>
          ) : null}

          <div className="mt-12">
            <TagPill className="bg-night-tile">Where we work</TagPill>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-lg font-semibold">Clients in</dt>
                <dd className="mt-1 text-night-muted">{site.markets.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">Office</dt>
                <dd className="mt-1 text-night-muted">
                  {site.address.street}, {site.address.city}, {site.address.country}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-lg font-semibold">Hours</dt>
                <dd className="mt-1 text-night-muted">{site.hours}.</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="lg:pl-14">
          <ContactForm tone="dark" />
        </div>
      </Container>
    </section>
  );
}

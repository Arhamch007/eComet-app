import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/primitives";

const company = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-1 bg-bg-1">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-text-2">{site.tagline}</p>
            <p className="mt-4 text-sm text-text-3">
              Serving clients in {site.markets.join(", ")}.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">Services</h2>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-[15px] text-text-2 transition-colors hover:text-text-1">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[15px] text-text-2 transition-colors hover:text-text-1">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">Connect</h2>
            <ul className="mt-4 space-y-2.5">
              <li><a href={site.social.linkedin} target="_blank" rel="noreferrer" className="text-[15px] text-text-2 hover:text-text-1">LinkedIn</a></li>
              <li><a href={site.social.upwork} target="_blank" rel="noreferrer" className="text-[15px] text-text-2 hover:text-text-1">Upwork agency</a></li>
              <li><a href={site.social.facebook} target="_blank" rel="noreferrer" className="text-[15px] text-text-2 hover:text-text-1">Facebook</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-3">Contact</h2>
            <address className="mt-4 space-y-2.5 text-[15px] not-italic text-text-2">
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-text-1">{site.email}</a>
              </p>
              {site.phone ? (
                <p>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-text-1">{site.phone}</a>
                </p>
              ) : null}
              <p>
                {site.address.street}, {site.address.city}, {site.address.country}
              </p>
              <p className="text-sm text-text-3">{site.hours}</p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-1 pt-6 text-sm text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p>{site.markets.join(" · ")}</p>
        </div>
      </Container>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { LandingContainer, logoGradient } from "@/components/landing/ui";

/* Compact dark footer: logo-gradient hairline on top, three short columns
   (brand, page links, contact) and a bottom row with the legal line. */

const pageLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Why eComet", href: "#why" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
  { label: "Upwork", href: site.social.upwork },
];

const linkClass =
  "rounded-sm text-[14px] text-[#c3c7d4] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5fb4ff]";
const headingClass =
  "text-[12px] font-semibold tracking-[0.12em] text-[#8f95a6] uppercase";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0b0d14] text-white">
      <div
        aria-hidden
        className="h-px w-full"
        style={{ backgroundImage: logoGradient }}
      />

      <LandingContainer className="py-12 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="#top"
              aria-label="eComet, back to top"
              className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5fb4ff]"
            >
              <Image
                src="/brand/ecomet-logo-on-dark.png"
                alt="eComet"
                width={640}
                height={159}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[340px] text-[14px] leading-[1.6] text-pretty text-[#a9aebd]">
              {site.tagline}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className={headingClass}>On this page</h2>
            <ul className="mt-4 space-y-2.5">
              {pageLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Get in touch</h2>
            <a
              href={`mailto:${site.email}`}
              className={`${linkClass} mt-4 inline-block font-semibold break-all text-white`}
            >
              {site.email}
            </a>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#a9aebd]">
              {site.address.street}, {site.address.city}, {site.address.country}
            </p>
            <ul
              className="mt-5 flex flex-wrap gap-2"
              aria-label="eComet on social media"
            >
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`eComet on ${s.label} (opens in a new tab)`}
                    className="inline-flex h-9 items-center gap-1 rounded-full border border-white/15 px-3.5 text-[13px] font-medium text-[#d7dae3] transition-colors duration-200 hover:border-[#1590ec] hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fb4ff]"
                  >
                    {s.label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5"
                      strokeWidth={2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[13px] text-[#8f95a6] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <p>Serving clients in the USA, Canada and Europe.</p>
        </div>
      </LandingContainer>
    </footer>
  );
}

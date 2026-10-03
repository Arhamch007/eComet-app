import Link from "next/link";
import { site } from "@/content/site";
import { LandingContainer } from "@/components/landing/ui";

/* Dark footer with rounded top corners, sitting on the page like a panel:
   the eComet wordmark and the three short link columns (navigation,
   profiles, contact) share one row, then a bottom row (legal line, markets,
   back to top). Background is a subtle navy-to-indigo gradient rather than
   flat navy. Hover changes colour only. */

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Why eComet", href: "#why" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Profiles",
    links: [
      { label: "LinkedIn", href: site.social.linkedin, external: true },
      { label: "Facebook", href: site.social.facebook, external: true },
      { label: "Upwork", href: site.social.upwork, external: true },
    ],
  },
  {
    title: "Contact",
    links: [{ label: site.email, href: `mailto:${site.email}` }],
  },
];

const linkClass =
  "rounded-sm text-[15px] text-[#d3d7e2] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5fb4ff]";

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-white px-2 pt-2 sm:px-3 sm:pt-3">
      <footer className="relative overflow-hidden rounded-t-[24px] bg-[linear-gradient(160deg,#0a0f24_0%,#111a4a_30%,#1d1868_58%,#391780_80%,#5a1de0_100%)] text-white sm:rounded-t-[32px]">
        <div aria-hidden className="pointer-events-none absolute -right-20 -bottom-32 size-[380px] rounded-full bg-[#01e2f8] opacity-[0.12] blur-[110px]" />
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-16 size-[300px] rounded-full bg-[#1590ec] opacity-[0.1] blur-[100px]" />
        <LandingContainer className="py-12 md:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
            <Link
              href="#top"
              aria-label="eComet, back to top"
              className="inline-block shrink-0 rounded-md text-[32px] leading-none font-bold tracking-[-0.03em] text-transparent select-none bg-[linear-gradient(135deg,#ffffff_0%,#9fe9fb_30%,#1590ec_62%,#681bf5_100%)] bg-clip-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5fb4ff] sm:text-[38px]"
            >
              eComet
            </Link>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:gap-x-14">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title} className={col.title === "Contact" ? "col-span-2 sm:col-span-1" : undefined}>
                  <h2 className="text-[12px] font-semibold tracking-[0.12em] text-[#7d849a] uppercase">{col.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.external ? (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                            {l.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <Link href={l.href} className={`${linkClass} break-all`}>
                            {l.label}
                          </Link>
                        )}
                      </li>
                    ))}
                    {col.title === "Contact" ? (
                      <li className="text-[15px] text-[#9aa0b2]">
                        {site.address.city}, {site.address.country}
                      </li>
                    ) : null}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-[#7d849a] sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            <p>Serving clients in the USA, Canada and Europe</p>
            <Link href="#top" className={`${linkClass} text-[14px]`}>
              Back to top ↑
            </Link>
          </div>
        </LandingContainer>
      </footer>
    </div>
  );
}

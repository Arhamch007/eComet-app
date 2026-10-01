import Link from "next/link";
import { site } from "@/content/site";
import { LandingContainer } from "@/components/landing/ui";

/* Dark footer with rounded top corners, sitting on the page like a panel:
   three short link columns (navigation, profiles, contact), a bottom row
   (legal line, markets, back to top) and the eComet name set very large
   across the full width, cropped at the bottom edge. Hover changes colour
   only. */

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
      <footer className="relative overflow-hidden rounded-t-[24px] bg-[#0a0f24] text-white sm:rounded-t-[32px]">
        <LandingContainer className="pt-14 md:pt-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className={col.title === "Contact" ? "col-span-2 md:col-span-1" : undefined}>
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

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-[#7d849a] sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            <p>Serving clients in the USA, Canada and Europe</p>
            <Link href="#top" className={`${linkClass} text-[14px]`}>
              Back to top ↑
            </Link>
          </div>
        </LandingContainer>

        {/* large wordmark, cropped by the bottom edge */}
        <p
          aria-hidden
          className="mt-8 -mb-[0.13em] text-center text-[25vw] leading-[0.85] font-bold tracking-[-0.06em] whitespace-nowrap text-white select-none md:mt-10"
        >
          eComet
        </p>
      </footer>
    </div>
  );
}

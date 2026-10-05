import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { LandingContainer } from "@/components/landing/ui";

/* Dark footer with rounded top corners, sitting on the page like a panel.
   Left: a proper brand block (logo, one-line tagline, circular social
   icons) instead of the logo sitting alone with empty space under it.
   Right: two link columns (Navigation, Contact) — social links moved into
   the brand block's icons, so they are not also listed as text there.
   Background is a subtle navy-to-indigo gradient. Hover changes colour
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
    title: "Contact",
    links: [{ label: site.email, href: `mailto:${site.email}` }],
  },
];

const socials: { label: string; href: string; path: string }[] = [
  {
    label: "LinkedIn",
    href: site.social.linkedin,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Upwork",
    href: site.social.upwork,
    path: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z",
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
            <div className="max-w-[300px] shrink-0">
              <Link
                href="#top"
                aria-label="eComet, back to top"
                className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5fb4ff]"
              >
                <Image src="/brand/ecomet-logo-on-dark.png" alt="eComet" width={640} height={159} className="h-7 w-auto sm:h-8" />
              </Link>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-pretty text-[#a9aebd]">
                A digital team for web, automation, marketing and day-to-day support.
              </p>
              <ul className="mt-5 flex items-center gap-2.5" aria-label="eComet on social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`eComet on ${s.label} (opens in a new tab)`}
                      className="flex size-9 items-center justify-center rounded-full border border-white/15 text-[#c3c7d4] transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5fb4ff]"
                    >
                      <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
                        <path d={s.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-16 sm:gap-y-0">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-[#7d849a] uppercase">{col.title}</p>
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

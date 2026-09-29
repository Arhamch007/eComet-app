"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled || open
          ? "border-b border-border-1 bg-bg-0/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-6 md:h-[72px]">
        <Link href="/" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50" aria-label="eComet home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[15px] font-medium text-text-2 transition-colors hover:text-text-1 focus-visible:outline-2 focus-visible:outline-accent/50",
                  active && "text-text-1"
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-px bg-accent transition-opacity",
                    active ? "opacity-100" : "opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={site.cta.href} size="sm" className="hidden sm:inline-flex">
            {site.cta.label}
          </Button>
          <Button href={site.cta.href} size="sm" className="sm:hidden" aria-label={site.cta.label}>
            Book a call
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full text-text-1 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent/50 md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg-0 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
          {site.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display flex items-center justify-between border-b border-border-1 py-4 text-[34px] font-semibold text-text-1 last:border-b-0"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
              <ArrowUpRight className="size-6 text-text-3" aria-hidden />
            </Link>
          ))}
        </nav>
        <div className="border-t border-border-1 px-6 py-6">
          <Button href={site.cta.href} size="lg" className="w-full">
            {site.cta.label}
          </Button>
          <div className="mt-5 flex flex-col gap-1 text-sm text-text-3">
            <a href={`mailto:${site.email}`} className="hover:text-text-1">
              {site.email}
            </a>
            {site.phone ? (
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="hover:text-text-1">
                {site.phone}
              </a>
            ) : null}
            <span>{site.markets.join(" · ")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

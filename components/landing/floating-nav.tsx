"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { LiquidGlassLink } from "@/components/ui/liquid-glass-button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* Floating pill navigation: a white rounded bar that sits inside the hero,
   logo left, links and one dark call-to-action right. */
export function FloatingNav() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-6">
      <div className="mx-auto max-w-[964px] rounded-[18px] bg-white/90 shadow-[0_1px_2px_rgba(20,20,30,0.04),0_8px_24px_-12px_rgba(20,20,40,0.12)] ring-1 ring-black/[0.04] backdrop-blur-md">
        <div className="flex h-[46px] items-center justify-between pr-1.5 pl-4">
          <Link href="/" aria-label="eComet home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4f46e5]">
            <Image src="/brand/ecomet-logo.png" alt="eComet" width={640} height={159} priority className="h-[30px] w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[15px] font-medium text-[#2b2b2b] transition-colors hover:bg-black/[0.04] hover:text-black focus-visible:outline-2 focus-visible:outline-[#4f46e5]"
              >
                {l.label}
              </Link>
            ))}
            <LiquidGlassLink href={site.cta.href} tone="tint" className="ml-3 h-[34px] px-4 text-[14px] font-semibold">
              Book a call
            </LiquidGlassLink>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="landing-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full text-[#111] hover:bg-black/[0.05] md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>

        <div id="landing-menu" hidden={!open} className="border-t border-black/[0.06] px-3 pt-2 pb-3 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[17px] font-medium text-[#1a1a1a] hover:bg-black/[0.04]"
              >
                {l.label}
              </Link>
            ))}
            <LiquidGlassLink
              href={site.cta.href}
              tone="tint"
              onClick={() => setOpen(false)}
              className="mt-2 w-full text-base font-semibold"
            >
              Book a call
            </LiquidGlassLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

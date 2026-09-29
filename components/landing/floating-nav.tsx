"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
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
      <div className="mx-auto max-w-[964px] rounded-[20px] bg-white/90 shadow-[0_1px_2px_rgba(20,20,30,0.04),0_8px_24px_-12px_rgba(20,20,40,0.12)] ring-1 ring-black/[0.04] backdrop-blur-md">
        <div className="flex h-[54px] items-center justify-between pr-2 pl-5">
          <Link href="/" aria-label="eComet home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4f46e5]">
            <Image src="/brand/ecomet-logo.png" alt="eComet" width={640} height={159} priority className="h-9 w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[15px] font-medium text-[#2b2b2b] transition-colors hover:bg-black/[0.04] hover:text-black focus-visible:outline-2 focus-visible:outline-[#4f46e5]"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={site.cta.href}
              className="comet-btn--primary relative ml-3 inline-flex h-[38px] items-center overflow-hidden rounded-[12px] px-4 text-[15px] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(47,91,255,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b3dff] motion-safe:hover:-translate-y-px"
            >
              Book a call
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="landing-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full text-[#111] hover:bg-black/[0.05] md:hidden"
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
            <Link
              href={site.cta.href}
              onClick={() => setOpen(false)}
              className="comet-btn--primary relative mt-2 inline-flex h-12 items-center justify-center overflow-hidden rounded-[14px] text-base font-semibold text-white"
            >
              Book a call
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

import * as React from "react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/* Sticky service switcher (upgrade over Stackworx, which has none): anchors
   to each row, highlights the row in view, scrolls the active chip into view
   on small screens. */
export function ServiceNav() {
  const [active, setActive] = React.useState(services[0].slug);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    services.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const chip = listRef.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    const list = listRef.current;
    // Only scroll when the chips overflow (phones); on desktop they all fit.
    if (chip && list && list.scrollWidth > list.clientWidth + 1) {
      list.scrollTo({ left: chip.offsetLeft - 20, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Services on this page"
      className="sticky top-16 z-30 border-b border-border-1 bg-white/90 backdrop-blur-md md:top-[72px]"
    >
      <ul ref={listRef} className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-6 lg:px-8 lg:[&>li:first-child]:ml-auto lg:[&>li:last-child]:mr-auto">
        {services.map((s) => (
          <li key={s.slug} className="shrink-0">
            <a
              href={`#${s.slug}`}
              data-slug={s.slug}
              aria-current={active === s.slug ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors",
                active === s.slug
                  ? "border-accent bg-accent text-white"
                  : "border-border-1 bg-white text-text-2 hover:border-accent/50 hover:text-text-1"
              )}
            >
              <s.icon className="size-4" aria-hidden />
              {s.name.replace(" pre- and post-sales support", " support")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

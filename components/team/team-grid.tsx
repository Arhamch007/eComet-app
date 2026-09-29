"use client";

import * as React from "react";
import Image from "next/image";
import type { Member } from "@/content/team";
import { cn } from "@/lib/utils";

/* Team grid with role filters (upgrade over Stackworx's single carousel).
   Photos on file are small (about 130 px), so they are shown at a size that
   stays sharp instead of stretched into large tiles. */
export function TeamGrid({ team, groups }: { team: Member[]; groups: Member["group"][] }) {
  const [group, setGroup] = React.useState<Member["group"] | "All">("All");
  const shown = group === "All" ? team : team.filter((m) => m.group === group);

  return (
    <div>
      <div role="group" aria-label="Filter by team" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap">
        {(["All", ...groups] as const).map((g) => {
          const count = g === "All" ? team.length : team.filter((m) => m.group === g).length;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                group === g ? "border-accent bg-accent text-white" : "border-border-2 bg-white text-text-1 hover:border-accent/60 hover:bg-tint"
              )}
            >
              {g}
              <span className={cn("rounded-full px-1.5 text-xs", group === g ? "bg-white/20" : "bg-bg-1 text-text-2")}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul aria-live="polite" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <li key={m.name}>
            <article className="group flex h-full items-center gap-5 rounded-2xl border border-border-1 bg-white p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-200 hover:border-accent/40 hover:shadow-[var(--shadow-card-hover)] motion-safe:hover:-translate-y-0.5">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-tint">
                <Image src={m.image} alt={`${m.name}, ${m.role}`} fill sizes="96px" className="object-cover object-top" />
              </div>
              <div className="min-w-0">
                <span className="inline-flex items-center rounded-md bg-tint px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-blue-700 uppercase">
                  {m.group}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-text-1">{m.name}</h3>
                <p className="text-sm text-text-2">{m.role}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

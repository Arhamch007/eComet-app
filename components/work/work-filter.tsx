"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { Project } from "@/content/work";
import { WorkCard } from "@/components/home/selected-work";
import { cn } from "@/lib/utils";

/* Filterable case grid (Stackworx shows one 12,000 px wall): service and
   platform chips with aria-pressed, filters synced to the URL so a filtered
   view can be shared, an honest count, and a no-results state. */

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        active ? "border-accent bg-accent text-white" : "border-border-2 bg-white text-text-1 hover:border-accent/60 hover:bg-tint"
      )}
    >
      {children}
    </button>
  );
}

export function WorkFilter({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const service = params.get("service") ?? "";
  const tool = params.get("tool") ?? "";

  const allServices = React.useMemo(() => [...new Set(projects.flatMap((p) => p.services))].sort(), [projects]);
  const allTools = React.useMemo(() => [...new Set(projects.flatMap((p) => p.tools))].sort(), [projects]);

  const set = (key: "service" | "tool", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const shown = projects.filter(
    (p) => (!service || p.services.includes(service)) && (!tool || p.tools.includes(tool))
  );

  return (
    <div>
      <div className="space-y-4 rounded-2xl border border-border-1 bg-bg-1 p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <p className="w-24 shrink-0 font-mono text-[12px] font-medium tracking-[0.14em] text-text-2 uppercase">Service</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0">
            <Chip active={!service} onClick={() => set("service", "")}>All</Chip>
            {allServices.map((s) => (
              <Chip key={s} active={service === s} onClick={() => set("service", s)}>
                {s}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <p className="w-24 shrink-0 font-mono text-[12px] font-medium tracking-[0.14em] text-text-2 uppercase">Platform</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0">
            <Chip active={!tool} onClick={() => set("tool", "")}>All</Chip>
            {allTools.map((t) => (
              <Chip key={t} active={tool === t} onClick={() => set("tool", t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-[15px] text-text-2">
          Showing <span className="font-semibold text-text-1">{shown.length}</span> of {projects.length} case studies
        </p>
        {service || tool ? (
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline"
          >
            <X className="size-4" aria-hidden /> Clear filters
          </button>
        ) : null}
      </div>

      {shown.length ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug} className="h-full">
              <WorkCard project={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border-2 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-text-1">No case studies match both filters yet.</p>
          <p className="mt-2 text-[15px] text-text-2">Clear one filter, or ask us for a private reference in that area.</p>
        </div>
      )}
    </div>
  );
}

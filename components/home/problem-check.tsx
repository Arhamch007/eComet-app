"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { pains } from "@/content/home";
import { services } from "@/content/services";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { cn } from "@/lib/utils";

/* Stackworx "The problem" grid, upgraded into a self-diagnosis: each pain is a
   checkbox; the summary recommends the matching services and links to them.
   One DOM for every breakpoint (theirs ships two). */
export function ProblemCheck() {
  const [picked, setPicked] = React.useState<string[]>([]);
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const recommended = Array.from(new Set(pains.filter((p) => picked.includes(p.id)).map((p) => p.service)))
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean) as typeof services;

  return (
    <Section tone="alt" aria-labelledby="problem-heading">
      <PixelBlocks
        className="absolute top-0 right-0 hidden md:grid"
        cell={44}
        primary="bg-white"
        secondary="bg-tint-2"
        pattern={[[0, 1, 1], [0, 0, 2], [1, 0, 0]]}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Sound familiar?"
          titleId="problem-heading"
          title="Tick what is slowing you down"
          lead="Pick everything that applies. We will point you to the service that fixes it, no call needed."
        />

        <fieldset className="mt-12">
          <legend className="sr-only">Problems your business has right now</legend>
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {pains.map((p) => {
              const on = picked.includes(p.id);
              return (
                <label
                  key={p.id}
                  className={cn(
                    "group relative block cursor-pointer rounded-2xl p-1.5 sm:p-3 shadow-[0_10px_28px_rgba(10,22,51,0.06)] transition-[background-color,transform,box-shadow] duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent motion-safe:hover:-translate-y-0.5",
                    on ? "bg-accent shadow-[0_16px_32px_-10px_rgba(37,99,235,0.5)]" : "bg-white"
                  )}
                >
                  <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(p.id)} />
                  <span
                    className={cn(
                      "flex min-h-[64px] items-start sm:min-h-[92px] gap-3 rounded-xl p-5 transition-colors duration-200",
                      on ? "bg-blue-700 text-white" : "bg-night text-white"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] transition-colors",
                        on ? "bg-white text-blue-700" : "bg-signal text-night"
                      )}
                    >
                      {on ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>
                    <span className="text-[13px] leading-[1.4] font-semibold tracking-[0.02em] uppercase">{p.text}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div
          aria-live="polite"
          className={cn(
            "mt-8 flex flex-col gap-4 rounded-2xl border bg-white p-5 transition-colors duration-200 md:flex-row md:items-center md:justify-between md:p-6",
            picked.length ? "border-accent/40" : "border-border-1"
          )}
        >
          <p className="text-[15px] text-text-2">
            {picked.length === 0 ? (
              "Nothing ticked yet. Most clients tick two or three."
            ) : (
              <>
                <span className="font-semibold text-text-1">
                  {picked.length} of {pains.length} sound familiar.
                </span>{" "}
                We would start with:
              </>
            )}
          </p>
          {recommended.length ? (
            <ul className="flex flex-wrap gap-2">
              {recommended.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3.5 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-tint-2"
                  >
                    {s.name} <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeFaqs } from "@/content/faqs";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { JsonLd } from "@/components/site/json-ld";
import { cn } from "@/lib/utils";

/* Stackworx FAQ (grid-rows 0fr -> 1fr panels, square plus/minus toggle),
   upgraded: aria-controls + region roles, a visible hover state, FAQPage
   schema and a closing link to the booking page. */
export function Faq({
  items = homeFaqs,
  title = "Before you get started",
  tone = "base",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  tone?: "base" | "alt";
}) {
  const [open, setOpen] = React.useState<number | null>(0);
  const baseId = React.useId();

  return (
    <Section tone={tone} aria-labelledby={`${baseId}-h`}>
      <PixelBlocks
        className="absolute top-0 left-0 hidden md:grid"
        cell={40}
        primary="bg-tint-2"
        secondary="bg-tint"
        pattern={[[1, 1, 0], [2, 0, 0], [0, 0, 0]]}
      />
      <Container className="relative max-w-[900px]">
        <SectionHeading align="center" eyebrow="FAQ" titleId={`${baseId}-h`} title={title} className="mx-auto max-w-3xl" />
        <div className="mt-12 flex flex-col gap-4">
          {items.map((f, i) => {
            const isOpen = open === i;
            const qid = `${baseId}-q${i}`;
            const pid = `${baseId}-p${i}`;
            return (
              <div
                key={f.q}
                className={cn(
                  "rounded-xl transition-[background-color,transform,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen
                    ? "bg-surface-3 shadow-[0_14px_36px_rgba(10,22,51,0.08)] motion-safe:-translate-y-0.5"
                    : "bg-bg-1 hover:bg-tint"
                )}
              >
                <h3>
                  <button
                    id={qid}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-4 rounded-xl p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="text-[17px] leading-snug font-semibold text-text-1 md:text-lg">{f.q}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "relative inline-flex size-9 shrink-0 items-center justify-center rounded transition-colors duration-300",
                        isOpen ? "bg-accent" : "bg-night group-hover:bg-accent"
                      )}
                    >
                      <span className="absolute h-0.5 w-3.5 rounded-full bg-white" />
                      <span
                        className={cn(
                          "absolute h-3.5 w-0.5 rounded-full bg-white transition-[transform,opacity] duration-300",
                          isOpen && "scale-y-0 opacity-0"
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={pid}
                  role="region"
                  aria-labelledby={qid}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "max-w-[720px] px-6 pb-6 text-[15px] leading-[1.65] text-text-2 transition-[opacity,transform] duration-300",
                        isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
                      )}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-[15px] text-text-2">
          Still unsure?{" "}
          <Link href="/contact" className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline">
            Ask us directly <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </Section>
  );
}

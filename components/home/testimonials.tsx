"use client";

import { BadgeCheck } from "lucide-react";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { Coverflow } from "@/components/ui/coverflow";
import { cn } from "@/lib/utils";

function QuoteMark() {
  return (
    <svg viewBox="0 0 56 40" className="h-10 w-14 text-signal" aria-hidden>
      <path
        fill="currentColor"
        d="M0 40V24.6C0 10.4 6.6 2.2 19.8 0l2.2 5.2C15 7.2 11.4 11.6 11 18.4h9.6V40H0Zm33.4 0V24.6C33.4 10.4 40 2.2 53.2 0l2.2 5.2c-7 2-10.6 6.4-11 13.2H54V40H33.4Z"
      />
    </svg>
  );
}

function TestimonialCard({ t, active }: { t: Testimonial; active: boolean }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-night-card p-7 text-white",
        active
          ? "border-signal/70 shadow-[0_0_0_1px_rgba(77,159,255,0.2),0_24px_60px_rgba(0,0,0,0.45)]"
          : "border-white/10"
      )}
    >
      <QuoteMark />
      <blockquote className="mt-auto pt-8 text-[17px] leading-[1.65] text-white/95">{t.quote}</blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-night-tile font-mono text-sm font-medium text-signal">
          {t.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block truncate text-[13px] text-night-muted">{t.role}</span>
        </span>
        {t.source ? (
          <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-night-muted sm:inline-flex">
            <BadgeCheck className="size-4 text-signal" aria-hidden /> {t.source}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section tone="night" aria-labelledby="testimonials-heading" className="py-20 md:py-28">
      <div aria-hidden className="glow-signal absolute inset-0" />
      <div aria-hidden className="grid-dark absolute inset-0 opacity-60" />
      <PixelBlocks
        className="absolute top-0 right-0 hidden md:grid"
        cell={40}
        primary="bg-white"
        secondary="bg-signal"
        pattern={[[0, 1, 1], [1, 2, 0], [0, 1, 0]]}
      />
      <Container className="relative">
        <SectionHeading tone="dark" eyebrow="What clients say" titleId="testimonials-heading" title="Partners, not vendors" />
        <Coverflow
          className="mt-12"
          label="Client testimonials"
          items={testimonials}
          getKey={(t) => t.name}
          renderItem={(t, active) => <TestimonialCard t={t} active={active} />}
        />
      </Container>
    </Section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { TagPill } from "@/components/ui/atoms";
import { RevealText } from "@/components/ui/reveal-text";

/* Stackworx staircase CTA, rebuilt: the blue steps are live blocks that rise
   into place once on scroll (theirs is one static image), the CTA is split
   into a booking path and an email path, and the placeholder copy is gone. */

// Steps from the edge inwards: [offset %, width %, height px, colour]; mirrored.
const steps: [number, number, number, string][] = [
  [0, 14, 150, "bg-accent"],
  [14, 12, 108, "bg-blue-700"],
  [26, 10, 66, "bg-signal"],
];

export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-bg-1">
      <div aria-hidden className="grid-light absolute inset-0 opacity-70" />
      <Container className="relative pt-20 pb-44 text-center md:pt-28 md:pb-60">
        <RevealText
          as="h2"
          id="final-cta-heading"
          text="Ready to hand off the busywork?"
          className="font-display mx-auto max-w-[820px] text-[34px] leading-[1.08] font-semibold text-text-1 uppercase md:text-[58px]"
        />
        <p className="mx-auto mt-5 max-w-xl text-lg text-text-2">
          Book a 20-minute call. You will leave with a plan and a price, whether or not you work with us.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={site.cta.href} variant="blue" size="lg" tile>
            {site.cta.label}
          </Button>
          <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
            Email us instead
          </Button>
        </div>
      </Container>

      {/* Staircase */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] origin-bottom scale-y-[0.7] md:scale-y-100">
        {steps.flatMap(([offset, width, h, colour], i) =>
          (["left", "right"] as const).map((side) => (
            <motion.div
              key={side + i}
              className={`absolute bottom-0 ${colour}`}
              style={{ [side]: `${offset}%`, width: `${width}%`, height: h }}
              initial={reduce ? false : { y: 70, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -5% 0px" }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            />
          ))
        )}
      </div>
      <div className="absolute bottom-4 left-4 hidden md:block">
        <TagPill>USA · Canada · Europe</TagPill>
      </div>
      <div className="absolute right-4 bottom-4 hidden md:block">
        <TagPill>Reply within 1 business day</TagPill>
      </div>
    </section>
  );
}

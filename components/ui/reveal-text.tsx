"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/* Word-by-word heading reveal (Stackworx .word-reveal-token): opacity, 2px blur
   and a .55em rise, 74ms per word, once. The full string stays available to
   assistive tech via aria-label; the animated words are aria-hidden. */

type Tag = "h1" | "h2" | "h3" | "p" | "span";

export function RevealText({
  text,
  as = "h2",
  className,
  id,
  stagger = 0.074,
  delay = 0,
}: {
  text: string;
  as?: Tag;
  className?: string;
  id?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.h2;
  const words = text.split(" ");
  if (reduce) {
    const Plain = as;
    return (
      <Plain id={id} className={className}>
        {text}
      </Plain>
    );
  }
  return (
    <Comp
      id={id}
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <motion.span
            aria-hidden
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: "0.55em", filter: "blur(2px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Comp>
  );
}

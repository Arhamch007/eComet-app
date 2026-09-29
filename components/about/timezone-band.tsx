"use client";

import * as React from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";

/* "Where we work" band (upgrade over Stackworx): live local times for the
   client markets next to the team's own clock, so overlap is visible rather
   than claimed. Renders placeholders on the server, fills in after mount. */

const zones = [
  { city: "Vancouver", region: "Canada", tz: "America/Vancouver" },
  { city: "New York", region: "USA", tz: "America/New_York" },
  { city: "Toronto", region: "Canada", tz: "America/Toronto" },
  { city: "London", region: "Europe", tz: "Europe/London" },
  { city: "Berlin", region: "Europe", tz: "Europe/Berlin" },
  { city: "eComet HQ", region: "Vehari, Pakistan", tz: "Asia/Karachi", home: true },
];

function useNow() {
  const [now, setNow] = React.useState<Date | null>(null);
  React.useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function TimezoneBand() {
  const now = useNow();
  return (
    <section data-theme="dark" aria-labelledby="tz-heading" className="relative overflow-hidden bg-night py-16 text-white md:py-24">
      <div aria-hidden className="grid-dark absolute inset-0 opacity-50" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(77,159,255,0.22),transparent_70%)]" />
      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Where we work"
          titleId="tz-heading"
          title="Your business day, covered"
          lead="Coverage windows are agreed per client. Here is what time it is right now where our clients and our team are."
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {zones.map((z) => {
            const time = now
              ? new Intl.DateTimeFormat("en-US", { timeZone: z.tz, hour: "numeric", minute: "2-digit" }).format(now)
              : "--:--";
            const hour = now ? Number(new Intl.DateTimeFormat("en-US", { timeZone: z.tz, hour: "numeric", hourCycle: "h23" }).format(now)) : 12;
            const working = hour >= 9 && hour < 18;
            return (
              <li
                key={z.city}
                className={
                  z.home
                    ? "rounded-2xl border border-signal/60 bg-night-tile p-5"
                    : "rounded-2xl border border-white/10 bg-night-card p-5"
                }
              >
                <p className="font-mono text-[11px] tracking-[0.14em] text-night-muted uppercase">{z.region}</p>
                <p className="mt-1 text-lg font-semibold">{z.city}</p>
                <p className="font-display mt-4 text-[32px] leading-none font-bold tabular-nums" suppressHydrationWarning>
                  {time}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-xs text-night-muted">
                  <span aria-hidden className={working ? "size-2 rounded-full bg-signal" : "size-2 rounded-full bg-white/25"} />
                  {now ? (working ? "Business hours" : "Outside business hours") : "Local time"}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

import { Check, Boxes, CalendarClock, UserRound } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/* Engagement models strip (not on Stackworx). Pricing is described by model
   only; add "from" figures once the team confirms them. DRAFT copy. */
const models = [
  {
    icon: Boxes,
    name: "Project",
    best: "Websites, store builds, automations, CRM setups",
    points: ["Written scope and fixed price", "Weekly check-ins", "Hand-over and documentation"],
    featured: false,
  },
  {
    icon: CalendarClock,
    name: "Monthly retainer",
    best: "Shopify support, email, Meta ads, automation care",
    points: ["Agreed hours or outcomes each month", "Weekly report you can read in two minutes", "Change or pause with 30 days' notice"],
    featured: true,
  },
  {
    icon: UserRound,
    name: "Dedicated assistant",
    best: "Admin, research, listings, customer operations",
    points: ["A named assistant plus a backup", "Hours that overlap yours", "Team-lead quality checks"],
    featured: false,
  },
];

export function EngagementModels() {
  return (
    <Section tone="alt" aria-labelledby="models-heading">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Ways to work with us"
          titleId="models-heading"
          title="Three engagement models, no lock-in"
          lead="Start with one, switch when your needs change. You always see scope and price before we begin."
          className="max-w-3xl"
        />
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {models.map((m) => (
            <RevealItem key={m.name} className="h-full">
              <article
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-white p-7 shadow-[var(--shadow-card)]",
                  m.featured ? "border-accent shadow-[0_24px_48px_-20px_rgba(37,99,235,0.35)]" : "border-border-1"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-xl", m.featured ? "bg-accent text-white" : "bg-tint text-blue-700")}>
                    <m.icon className="size-6" aria-hidden />
                  </span>
                  {m.featured ? (
                    <span className="rounded-full bg-tint px-3 py-1 text-xs font-semibold text-blue-700">Most chosen</span>
                  ) : null}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-text-1">{m.name}</h3>
                <p className="mt-2 text-[15px] text-text-2">Best for: {m.best}</p>
                <ul className="mt-6 space-y-3 border-t border-border-1 pt-6">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] text-text-1/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={3} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

import { projects } from "@/content/work";
import { Container } from "@/components/ui/primitives";

/* Static client strip (no marquee). Names come from the work list, which only
   includes engagements described from eComet's side; replace with logo files
   once the team confirms permission (audit Open Question 3). */

export function TrustTicker() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-border-1 bg-bg-1 py-10">
      <Container>
        <h2 id="clients-heading" className="text-center text-sm font-medium text-text-3">
          Stores and teams we support across three markets
        </h2>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
          {projects.map((p) => (
            <li key={p.slug} className="font-display text-xl font-semibold tracking-tight text-text-3/80 md:text-2xl">
              {p.client}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

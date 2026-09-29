import { site } from "@/content/site";
import { Container, Section, Eyebrow, Card } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/* Only facts from the brief are shown. Replace or extend with verified figures
   (projects delivered, hours, years) once the team confirms them (audit F-03). */

const numbers = [
  { value: "20+", label: "specialists", note: "developers, support agents, automation experts and VAs" },
  { value: "3", label: "markets served", note: "USA, Canada and Europe" },
  { value: "8", label: "service lines", note: "from AI automation to virtual assistants" },
  { value: "4", label: "disciplines", note: "engineering, growth, support and operations" },
];

export function Proof() {
  return (
    <Section tone="alt" aria-labelledby="proof-heading">
      <Container>
        <Reveal>
          <Card className="p-6 hover:translate-y-0 md:p-10">
            <Eyebrow id="proof-heading">Proof, not promises</Eyebrow>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {numbers.map((n) => (
                <div key={n.label}>
                  <dt className="order-2 text-sm font-medium text-text-1">{n.label}</dt>
                  <dd className="font-mono text-4xl font-medium text-text-1 md:text-5xl">{n.value}</dd>
                  <p className="mt-2 text-sm text-text-3">{n.note}</p>
                </div>
              ))}
            </dl>
            <div className="mt-10 border-t border-border-1 pt-6">
              <p className="text-sm text-text-3">Platforms we work in</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border-1 bg-bg-0/60 px-3 py-1.5 font-mono text-xs text-text-2"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  );
}

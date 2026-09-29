import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow, GradientText } from "@/components/ui/primitives";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { Reveal } from "@/components/ui/reveal";

const proof = [
  { value: "20+", label: "specialists on the team" },
  { value: "3", label: "markets: USA, Canada, Europe" },
  { value: "8", label: "service lines under one roof" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* One texture, one glow: the only decoration allowed behind the H1 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(420px_circle_at_50%_30%,white,transparent)] md:[mask-image:radial-gradient(560px_circle_at_50%_30%,white,transparent)]"
      >
        <InteractiveGrid />
      </div>
      <div
        aria-hidden
        className="glow-violet pointer-events-none absolute left-1/2 top-[-120px] h-[520px] w-[820px] -translate-x-1/2"
      />

      <Container className="relative pt-20 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center text-center max-sm:[&>span:first-child]:hidden">
            AI automation · Web · Shopify support · Marketing · VAs
          </Eyebrow>
          <h1 className="font-display mt-6 text-balance text-[40px] leading-[1.05] font-semibold text-text-1 sm:text-[52px] md:text-[64px]">
            Crafted <GradientText>automation and growth</GradientText> for brands that sell online
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">
            eComet is a 20-plus person team of AI automation experts, web developers, Shopify
            support agents and virtual assistants working with businesses across the USA, Canada
            and Europe.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.cta.href} size="lg" className="w-full sm:w-auto">
              {site.cta.label}
            </Button>
            <Button href={site.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
              {site.secondaryCta.label}
            </Button>
          </div>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-14 grid max-w-3xl grid-cols-3 divide-x divide-border-1 border-y border-border-1 py-5">
          {proof.map((p) => (
            <div key={p.label} className="px-3 text-center sm:px-6">
              <div className="font-mono text-2xl font-medium text-text-1 md:text-3xl">{p.value}</div>
              <div className="mt-1 text-xs text-text-3 sm:text-sm">{p.label}</div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

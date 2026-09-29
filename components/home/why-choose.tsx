import { pillars } from "@/content/home";
import { Container, Section, SectionHeading, IconTile } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

/* Stackworx "Why choose" row: full-bleed three columns split by hairlines.
   Upgrade: a 2px blue top rule draws across on hover or focus, and each
   pillar ends with a concrete, checkable line. */
export function WhyChoose() {
  return (
    <Section tone="alt" aria-labelledby="why-heading" className="pb-0 md:pb-0">
      <PixelBlocks
        className="absolute top-0 right-0 hidden md:grid"
        cell={44}
        primary="bg-white"
        secondary="bg-tint-2"
        pattern={[[1, 1, 0], [0, 2, 1]]}
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why eComet"
          titleId="why-heading"
          title="Built to run, not just to launch"
          lead="Most agencies hand over and disappear. We stay on as the team that operates what we build."
        />
      </Container>
      <RevealGroup className="mx-auto mt-14 grid max-w-[1440px] border-t border-border-1 lg:grid-cols-3 lg:divide-x lg:divide-border-1">
        {pillars.map((p) => (
          <RevealItem key={p.title}>
            <article
              tabIndex={0}
              className="group relative h-full border-b border-border-1 px-6 py-10 outline-none focus-visible:bg-white lg:border-b-0 lg:px-10 lg:py-12"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
              <IconTile icon={p.icon} variant="night" className="size-16 rounded-xl [&_svg]:size-7" />
              <h3 className="mt-10 max-w-[300px] text-[22px] leading-snug font-semibold text-text-1">{p.title}</h3>
              <p className="mt-3 max-w-[340px] text-[15px] leading-relaxed text-text-2">{p.text}</p>
              <p className="mt-6 font-mono text-[12px] font-medium tracking-wide text-blue-700 uppercase">{p.stat}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

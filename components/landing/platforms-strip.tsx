import { heroTools } from "@/content/tools";
import { Marquee } from "@/components/ui/marquee";
import { ParticlesBg } from "@/components/ui/particles-bg";

/* Platforms band at the bottom of the hero: same surface as the floating nav
   (white at 90% with a backdrop blur), a faint logo-colour particle network,
   and one row of white square tiles (real platform marks) scrolling slowly
   to the left. Edges fade into the band, the row pauses on hover or focus
   and stands still under prefers-reduced-motion (see .marquee in
   globals.css). Tiles are decorative; the names are in a screen-reader-only
   heading. */

const order = [
  "shopify",
  "meta",
  "ai",
  "zapier",
  "n8n",
  "airtable",
  "make",
  "wordpress",
  "stripe",
  "instagram",
  "hubspot",
  "analytics",
  "notion",
];

const tiles = order
  .map((id) => heroTools.find((t) => t.id === id))
  .filter((t): t is (typeof heroTools)[number] => Boolean(t));

const names = tiles.map((t) => t.label).filter((n) => n !== "AI automation");

export function PlatformsStrip() {
  return (
    <section
      aria-labelledby="platforms-heading"
      className="relative isolate w-full shrink-0 overflow-hidden border-y border-black/[0.05] bg-white/90 backdrop-blur-md"
    >
      <h2 id="platforms-heading" className="sr-only">
        Platforms we build on and run every day: {names.join(", ")}.
      </h2>
      <ParticlesBg className="-z-10 opacity-60" density={1 / 7000} linkDistance={110} />
      <Marquee duration={40} fadeColor="rgba(255,255,255,0.95)" className="py-4 md:py-6">
        <ul className="flex items-center" aria-hidden>
          {tiles.map(({ id, Icon }) => (
            <li
              key={id}
              className="mx-2 flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#e7e9ef] bg-white p-2.5 shadow-[0_8px_20px_-10px_rgba(20,30,70,0.25)] md:mx-3 md:size-[68px] md:rounded-[20px] md:p-3.5"
            >
              <Icon aria-hidden focusable="false" className="size-full" />
            </li>
          ))}
        </ul>
      </Marquee>
    </section>
  );
}

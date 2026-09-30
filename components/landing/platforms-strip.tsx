"use client";

import { heroTools } from "@/content/tools";
import { FloatingIconsHero, type FloatingIcon } from "@/components/ui/floating-icons-hero";
import { ParticlesBg } from "@/components/ui/particles-bg";

/* Platforms section: an off-white (#f5f7fa) band with a logo-colour particle
   network and white tiles with real platform marks that float
   gently and move away from the cursor (desktop). A light aqua-to-indigo
   field with a logo-colour particle network sets it apart from the hero. Tiles keep to the edges so
   they never cover the text; phones show eight small tiles in a row above
   and below. Motion stops under prefers-reduced-motion. Tiles are
   decorative; the platform names are listed for screen readers. */

/* Tailwind position classes per tile. Phones: top and bottom rows (8 tiles).
   md+: around the edges; lg+: all 13. */
const positions: Record<string, string> = {
  shopify: "top-[5%] left-[5%] md:top-[14%] md:left-[7%]",
  meta: "top-[2%] left-[29%] md:top-[6%] md:left-[27%]",
  ai: "top-[2%] right-[29%] md:top-[4%] md:left-[47%] md:right-auto",
  zapier: "top-[5%] right-[5%] md:top-[9%] md:right-[27%]",
  n8n: "hidden md:flex md:top-[18%] md:right-[7%]",
  airtable: "hidden md:flex md:top-[38%] md:left-[18%]",
  make: "bottom-[5%] left-[5%] md:bottom-auto md:top-[40%] md:left-[2%]",
  wordpress: "hidden md:flex md:top-[46%] md:right-[3%]",
  stripe: "hidden lg:flex lg:top-[40%] lg:right-[17%]",
  instagram: "bottom-[2%] left-[29%] md:bottom-[4%] md:left-[5%]",
  hubspot: "bottom-[2%] right-[29%] md:bottom-[14%] md:left-[19%] md:right-auto",
  analytics: "bottom-[5%] right-[5%] md:bottom-[10%] md:right-[18%]",
  notion: "hidden md:flex md:bottom-[6%] md:right-[5%]",
};

const order = Object.keys(positions);

const icons: FloatingIcon[] = order
  .map((id) => heroTools.find((t) => t.id === id))
  .filter((t): t is (typeof heroTools)[number] => Boolean(t))
  .map((t) => ({ id: t.id, Icon: t.Icon, className: positions[t.id] }));

const names = order
  .map((id) => heroTools.find((t) => t.id === id)?.label)
  .filter((n): n is string => Boolean(n) && n !== "AI automation");

function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[#f5f7fa]" />
      <ParticlesBg />
      {/* hairline edges in the logo gradient mark the section boundary */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#1590ec_30%,#681bf5_70%,transparent)] opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#1590ec_30%,#681bf5_70%,transparent)] opacity-40" />
    </>
  );
}

export function PlatformsStrip() {
  return (
    <FloatingIconsHero
      icons={icons}
      labelledBy="platforms-heading"
      backdrop={<Backdrop />}
      className="min-h-[260px] md:min-h-[380px]"
    >
      <h2 id="platforms-heading" className="sr-only">
        Platforms we build on and run every day: {names.join(", ")}.
      </h2>
    </FloatingIconsHero>
  );
}

"use client";

import { heroTools } from "@/content/tools";
import { FloatingIconsHero, type FloatingIcon } from "@/components/ui/floating-icons-hero";

/* Platforms section: the heading sits in the centre over a soft wash of the
   logo colours, surrounded by white tiles with real platform marks that float
   gently and move away from the cursor (desktop). Tiles keep to the edges so
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
  make: "bottom-[5%] left-[5%] md:bottom-auto md:top-[52%] md:left-[3%]",
  wordpress: "hidden md:flex md:top-[46%] md:right-[3%]",
  stripe: "hidden lg:flex lg:top-[40%] lg:right-[17%]",
  instagram: "bottom-[2%] left-[29%] md:bottom-[8%] md:left-[4%]",
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

function Wash() {
  return (
    <>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(46%_58%_at_50%_50%,rgba(1,226,248,0.16),rgba(21,144,236,0.12)_32%,rgba(13,93,245,0.08)_52%,rgba(104,27,245,0.06)_66%,rgba(255,255,255,0)_80%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(#f6f6f7,rgba(246,246,247,0))]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(rgba(246,246,247,0),#f6f6f7)]" />
    </>
  );
}

export function PlatformsStrip() {
  return (
    <FloatingIconsHero
      icons={icons}
      labelledBy="platforms-heading"
      backdrop={<Wash />}
      className="min-h-[520px] py-36 md:min-h-[560px] md:py-24"
    >
      <div className="mx-auto max-w-[620px] px-5 text-center">
        <h2
          id="platforms-heading"
          className="text-[30px] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-[#141414] md:text-[44px]"
        >
          Platforms we build on and{" "}
          <span className="bg-[linear-gradient(100deg,#01e2f8,#1590ec_35%,#0d5df5_70%,#681bf5)] bg-clip-text text-transparent">
            run every day
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[540px] text-[16px] leading-[1.6] text-pretty text-[#555555] md:text-[17px]">
          We work inside the tools you already use, so nothing has to be rebuilt.
        </p>
        <p className="sr-only">Including {names.join(", ")}.</p>
      </div>
    </FloatingIconsHero>
  );
}

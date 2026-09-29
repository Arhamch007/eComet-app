"use client";

import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { heroTools } from "@/content/tools";
import { Button } from "@/components/ui/button";
import { Container, GradientText } from "@/components/ui/primitives";
import { FloatingIconsHero, type FloatingIcon } from "@/components/ui/floating-icons-hero";

/* Positions: tiles hug the edges so they never sit on the copy.
   Mobile shows eight small tiles in a top and bottom row; the rest are md+. */
const positions: Record<string, string> = {
  shopify: "top-[3%] left-[6%] md:top-[12%] md:left-[7%]",
  meta: "top-[7%] left-[30%] md:top-[6%] md:left-[27%]",
  zapier: "top-[3%] right-[30%] md:top-[8%] md:right-[29%]",
  n8n: "top-[7%] right-[6%] md:top-[15%] md:right-[8%]",
  make: "hidden md:flex md:top-[40%] md:left-[3.5%]",
  wordpress: "hidden md:flex md:top-[38%] md:right-[4%]",
  ai: "hidden md:flex md:top-[3%] md:left-[48%]",
  hubspot: "bottom-[4%] left-[8%] md:bottom-[26%] md:left-[12%]",
  mailchimp: "bottom-[8%] left-[32%] md:bottom-[9%] md:left-[22%]",
  stripe: "bottom-[4%] right-[30%] md:bottom-[7%] md:right-[26%]",
  analytics: "bottom-[8%] right-[7%] md:bottom-[25%] md:right-[11%]",
  instagram: "hidden md:flex md:top-[64%] md:left-[4%]",
  woocommerce: "hidden md:flex md:bottom-[4%] md:left-[46%]",
  notion: "hidden md:flex md:top-[62%] md:right-[3.5%]",
  airtable: "hidden lg:flex lg:top-[24%] lg:left-[17%]",
};

const icons: FloatingIcon[] = heroTools.map((t) => ({
  id: t.id,
  Icon: t.Icon,
  className: positions[t.id] ?? "hidden",
}));

export function Hero() {
  return (
    <FloatingIconsHero
      icons={icons}
      className="wash-top min-h-[calc(100svh-64px)] pt-36 pb-32 md:pb-24 md:min-h-[max(720px,calc(100svh-72px))] md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          <h1 className="font-display text-balance text-[42px] leading-[1.04] font-semibold text-text-1 sm:text-[56px] md:text-[76px]">
            Crafted <GradientText>automation and growth</GradientText> for brands that sell online
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-pretty text-lg leading-relaxed text-text-2 md:text-xl">
            A 20-plus person team of AI automation experts, web developers, Shopify support agents
            and virtual assistants, working with businesses across the USA, Canada and Europe.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.cta.href} size="lg" className="w-full px-8 sm:w-auto">
              {site.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={site.secondaryCta.href} variant="secondary" size="lg" className="w-full px-8 sm:w-auto">
              {site.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </FloatingIconsHero>
  );
}

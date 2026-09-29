import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { PixelBlocks } from "@/components/ui/atoms";
import { JsonLd } from "@/components/site/json-ld";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href: string };

/* Stackworx "PageHero" band, upgraded: blue pixel blocks sit in reserved
   gutters so they never overlap the copy, the heading is static text because
   it is the LCP element, breadcrumbs carry BreadcrumbList schema, and an
   optional actions slot holds a CTA the competitor never offers. */
export function PageBand({
  eyebrow,
  title,
  lead,
  crumbs = [],
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  const centre = align === "center";
  const h1Class =
    "font-display mt-5 text-balance text-[38px] leading-[1.04] font-semibold text-text-1 md:text-[60px]";
  return (
    <section className="relative overflow-hidden border-b border-border-1 bg-bg-1">
      <div aria-hidden className="grid-light pointer-events-none absolute inset-0 opacity-80" />
      <div aria-hidden className="wash-top pointer-events-none absolute inset-0" />
      <PixelBlocks
        className="absolute top-0 left-0 hidden lg:grid"
        cell={36}
        pattern={[[1, 2, 0], [2, 0, 0], [0, 0, 0]]}
      />
      <PixelBlocks
        className="absolute top-0 right-0 hidden md:grid"
        cell={36}
        primary="bg-white"
        secondary="bg-tint-2"
        pattern={[[0, 1, 1], [0, 0, 2], [0, 0, 1]]}
      />
      <Container className={cn("relative pt-14 pb-14 md:pt-20 md:pb-20", centre && "text-center")}>
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className={cn("flex flex-wrap items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-text-3", centre && "justify-center")}>
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="size-3.5" aria-hidden /> : null}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-text-1">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="text-text-2 hover:text-accent">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: trail.map((c, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: c.label,
                  item: `${site.url}${c.href}`,
                })),
              }}
            />
          </nav>
        ) : null}
        <div className={cn("max-w-3xl", centre && "mx-auto")}>
          {eyebrow ? <Eyebrow className={centre ? "justify-center" : undefined}>{eyebrow}</Eyebrow> : null}
          <h1 className={h1Class}>{title}</h1>
          {lead ? (
            <p className={cn("mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-text-2 md:text-xl", centre && "mx-auto")}>
              {lead}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}

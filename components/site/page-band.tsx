import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { JsonLd } from "@/components/site/json-ld";

type Crumb = { label: string; href: string };

export function PageBand({
  eyebrow,
  title,
  lead,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden border-b border-border-1">
      <div aria-hidden className="dot-texture pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative pt-12 pb-12 md:pt-16 md:pb-16">
        {crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-text-3">
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="size-3.5" aria-hidden /> : null}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-text-2">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="hover:text-text-1">{c.label}</Link>
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
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h1 className="font-display mt-4 max-w-3xl text-[36px] leading-[1.05] font-semibold text-text-1 md:text-[56px]">
          {title}
        </h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-2 md:text-xl">{lead}</p> : null}
        {children}
      </Container>
    </section>
  );
}

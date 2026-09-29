import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-6", className)} {...props}>
      {children}
    </div>
  );
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "base" | "alt";
  as?: "section" | "div";
};

export function Section({ className, tone = "base", as = "section", children, ...props }: SectionProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "relative py-16 md:py-24",
        tone === "alt" && "bg-bg-1",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-text-3",
        className
      )}
      {...props}
    >
      <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 self-start rounded-full bg-accent" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center [&_p.eyebrow]:justify-center",
        className
      )}
    >
      {eyebrow ? <Eyebrow className="eyebrow">{eyebrow}</Eyebrow> : null}
      <h2 className="font-display mt-4 text-[32px] leading-[1.1] font-semibold text-text-1 md:text-[44px]">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-text-2">{lead}</p> : null}
    </div>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

export function Card({
  className,
  children,
  featured = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { featured?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-1 bg-surface-1 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-border-2 hover:bg-surface-2",
        featured && "gradient-border border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

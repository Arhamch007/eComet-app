import * as React from "react";
import { cn } from "@/lib/utils";
import { SignalSquare } from "@/components/ui/atoms";
import { RevealText } from "@/components/ui/reveal-text";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "base" | "alt" | "night";
  as?: "section" | "div";
};

export function Section({ className, tone = "base", as = "section", children, ...props }: SectionProps) {
  const Tag = as;
  return (
    <Tag
      data-theme={tone === "night" ? "dark" : undefined}
      className={cn(
        "relative py-16 md:py-24",
        tone === "alt" && "bg-bg-1",
        tone === "night" && "overflow-hidden bg-night text-white",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* Mono label with a signal square (Stackworx eyebrow), contrast-safe colours. */
export function Eyebrow({
  className,
  children,
  tone = "light",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-text-2" : "text-night-muted",
        className
      )}
      {...props}
    >
      <SignalSquare className={tone === "light" ? "bg-accent" : undefined} />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  titleId,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  titleId?: string;
  lead?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const h2Class = cn(
    "font-display mt-4 text-[32px] leading-[1.1] font-semibold md:text-[46px]",
    tone === "light" ? "text-text-1" : "text-white"
  );
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      {typeof title === "string" ? (
        <RevealText as="h2" id={titleId} text={title} className={h2Class} />
      ) : (
        <h2 id={titleId} className={h2Class}>
          {title}
        </h2>
      )}
      {lead ? (
        <p className={cn("mt-4 text-lg leading-relaxed", tone === "light" ? "text-text-2" : "text-night-muted")}>{lead}</p>
      ) : null}
    </div>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

export function IconTile({
  icon: Icon,
  variant = "tint",
  className,
}: {
  icon: React.ElementType;
  variant?: "tint" | "gradient" | "night";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-xl",
        variant === "gradient" && "gradient-comet-deep text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]",
        variant === "tint" && "bg-tint text-blue-700",
        variant === "night" && "bg-night-tile text-signal",
        className
      )}
    >
      <Icon className="size-[22px]" aria-hidden />
    </span>
  );
}

export function Card({
  className,
  children,
  featured = false,
  interactive = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { featured?: boolean; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card border border-border-1 bg-surface-1 shadow-[var(--shadow-card)]",
        interactive &&
          "transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-border-2 hover:shadow-[var(--shadow-card-hover)]",
        featured && "gradient-border border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

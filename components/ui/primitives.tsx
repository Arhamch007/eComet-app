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
    <Tag className={cn("relative py-16 md:py-24", tone === "alt" && "bg-bg-1", className)} {...props}>
      {children}
    </Tag>
  );
}

/* Letter-spaced label above a heading. No dot or ornament. */
export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[13px] font-semibold uppercase tracking-[0.16em] text-accent",
        className
      )}
      {...props}
    >
      {children}
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
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display mt-3 text-[32px] leading-[1.1] font-semibold text-text-1 md:text-[46px]">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-text-2">{lead}</p> : null}
    </div>
  );
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return <span className="text-gradient">{children}</span>;
}

/* Gradient icon tile: one of the gradient's allowed roles */
export function IconTile({
  icon: Icon,
  variant = "tint",
  className,
}: {
  icon: React.ElementType;
  variant?: "tint" | "gradient";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl",
        variant === "gradient" ? "gradient-comet-deep text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.45)]" : "bg-tint text-accent",
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

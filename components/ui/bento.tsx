import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* Adapted from Magic UI Bento Grid (MIT). Dark-only tokens, always-visible
   link so keyboard focus never lands on an invisible control. */

export function BentoGrid({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("grid w-full grid-cols-1 gap-4 md:grid-cols-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type BentoCardProps = React.ComponentPropsWithoutRef<"div"> & {
  name: string;
  description: string;
  href: string;
  cta: string;
  Icon: React.ElementType;
  featured?: boolean;
  background?: React.ReactNode;
};

export function BentoCard({
  name,
  description,
  href,
  cta,
  Icon,
  featured = false,
  background,
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[15rem] flex-col overflow-hidden rounded-card border border-border-1 bg-surface-1 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-border-2 hover:bg-surface-2 focus-within:border-border-2 motion-safe:hover:-translate-y-0.5",
        featured &&
          "gradient-border border-transparent [box-shadow:0_-40px_120px_-40px_rgba(139,92,246,0.35)_inset]",
        className
      )}
      {...props}
    >
      {background ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {background}
        </div>
      ) : null}
      <div className="relative z-10 flex h-full flex-col p-6">
        <span className="inline-flex size-11 items-center justify-center rounded-xl border border-border-1 bg-bg-0/60 text-text-2 transition-colors duration-200 group-hover:text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-text-1">{name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-text-2">{description}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-accent transition-[gap] duration-200 group-hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/50"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

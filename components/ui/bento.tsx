import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "@/components/ui/primitives";

/* Adapted from Magic UI Bento Grid (MIT): light cards, always-visible link so
   keyboard focus never lands on an invisible control. */

export function BentoGrid({ children, className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("grid w-full grid-cols-1 gap-5 md:grid-cols-3", className)} {...props}>
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
};

export function BentoCard({ name, description, href, cta, Icon, featured = false, className, ...props }: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[15rem] flex-col overflow-hidden rounded-card border border-border-1 bg-surface-1 shadow-[var(--shadow-card)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-border-2 hover:shadow-[var(--shadow-card-hover)] focus-within:border-border-2 motion-safe:hover:-translate-y-1",
        featured && "gradient-border border-transparent bg-[linear-gradient(135deg,#ffffff_40%,#eef4ff_100%)]",
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col p-7">
        <IconTile icon={Icon} variant={featured ? "gradient" : "tint"} />
        <h3 className="mt-5 text-xl font-semibold text-text-1">{name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-text-2">{description}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent transition-[gap] duration-200 group-hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent/60"
        >
          {cta}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

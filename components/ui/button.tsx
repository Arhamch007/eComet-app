import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/60 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-text-1 text-white shadow-[0_1px_2px_rgba(16,24,40,0.12)] hover:bg-[#1c2335] hover:shadow-[0_10px_24px_-8px_rgba(16,24,40,0.45)]",
        blue: "bg-accent text-white shadow-[0_1px_2px_rgba(16,24,40,0.12)] hover:bg-blue-700 hover:shadow-[0_12px_28px_-8px_rgba(37,99,235,0.55)]",
        secondary:
          "border border-border-2 bg-white text-text-1 hover:border-text-3/60 hover:bg-surface-2",
        inverse: "bg-white text-text-1 hover:bg-white/90 hover:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]",
        "outline-light": "border border-white/50 text-white hover:bg-white/10",
        ghost: "text-text-2 hover:bg-surface-2 hover:text-text-1",
        link: "h-auto rounded-none p-0 text-accent underline-offset-4 hover:underline motion-safe:hover:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[15px]",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /** Stackworx-style signal tile with an arrow at the start of the button */
  tile?: boolean;
};

function Tile() {
  return (
    <span aria-hidden className="-ml-3 mr-0.5 inline-flex size-8 items-center justify-center rounded-lg bg-signal text-text-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:rotate-45">
      <ArrowUpRight className="size-4" strokeWidth={2.5} />
    </span>
  );
}

type LinkProps = CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type NativeProps = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type ButtonProps = LinkProps | NativeProps;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, href, tile, ...rest } = props;
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size }), tile && "group/btn", className)} {...rest}>
        {tile ? <Tile /> : null}
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, tile, ...rest } = props;
  return (
    <button className={cn(buttonVariants({ variant, size }), tile && "group/btn", className)} {...rest}>
      {tile ? <Tile /> : null}
      {children}
    </button>
  );
}

export { buttonVariants };

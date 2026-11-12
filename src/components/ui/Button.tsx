import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  newTab?: boolean;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200";

const variants = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary:
    "border border-border bg-surface text-foreground hover:border-accent/60",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  newTab = false,
  className,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
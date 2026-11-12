import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
};

export function Card({ children, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6",
        interactive && "transition-colors duration-200 hover:border-accent/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
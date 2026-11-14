import { cn } from "@/lib/cn";

type DashListProps = {
  items: readonly string[];
  className?: string;
};

export function DashList({ items, className }: DashListProps) {
  return (
    <ul className={cn("space-y-4 text-sm leading-6 text-muted sm:text-base sm:leading-7", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.85em] h-px w-3 shrink-0 bg-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
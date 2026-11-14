import { cn } from "@/lib/cn";

type Stat = { value: string; label: string };

type StatStripProps = {
  stats: readonly Stat[];
  className?: string;
};

export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <dl
      className={cn(
        "grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-1 bg-surface p-5">
          <dt className="text-sm text-muted">{stat.label}</dt>
          <dd className="font-mono text-3xl font-medium tracking-tight text-accent">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
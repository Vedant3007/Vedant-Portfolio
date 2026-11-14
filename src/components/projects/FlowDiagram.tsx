import { ArrowDown } from "lucide-react";
import type { Tier } from "@/content/projects";

type FlowDiagramProps = {
  tiers: readonly Tier[];
};

export function FlowDiagram({ tiers }: FlowDiagramProps) {
  return (
    <ol>
      {tiers.map((tier, index) => {
        const isLast = index === tiers.length - 1;
        const connects = tier.connectsToNext !== false;

        return (
          <li key={tier.label}>
            <div className="rounded-xl border border-border bg-surface p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {tier.label}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
                {tier.nodes.map((node) => (
                  <div
                    key={node.name}
                    className="rounded-lg border border-border bg-background px-4 py-3"
                  >
                    <p className="text-sm font-medium">{node.name}</p>
                    {node.detail && (
                      <p className="mt-1 text-xs leading-5 text-muted">{node.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {!isLast &&
              (connects ? (
                <div aria-hidden="true" className="flex justify-center py-2 text-muted">
                  <ArrowDown className="h-4 w-4" />
                </div>
              ) : (
                <div aria-hidden="true" className="h-3" />
              ))}
          </li>
        );
      })}
    </ol>
  );
}
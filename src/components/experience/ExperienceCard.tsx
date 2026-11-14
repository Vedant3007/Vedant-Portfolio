import { DashList } from "@/components/ui/DashList";
import { MediaImage } from "@/components/ui/MediaImage";
import type { ExperienceItem } from "@/content/experience";

type ExperienceCardProps = {
  item: ExperienceItem;
  /** Show an image slot (with placeholder) even when no image is set. */
  showMedia?: boolean;
};

export function ExperienceCard({ item, showMedia = false }: ExperienceCardProps) {
  const hasMedia = showMedia || item.image !== null;
  const meta = [item.organisation, item.location].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
      {hasMedia && (
        <MediaImage
          src={item.image}
          alt={item.imageAlt}
          label={item.organisation}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="border-b border-border"
        />
      )}
      <div className="flex-1 p-6 sm:p-8">
        <h3 className="text-xl font-semibold tracking-tight">{item.role}</h3>
        <p className="mt-1 text-sm text-muted">{meta}</p>
        {item.period && (
          <p className="mt-1 font-mono text-xs text-accent">{item.period}</p>
        )}
        <DashList items={item.highlights} className="mt-6" />
      </div>
    </article>
  );
}
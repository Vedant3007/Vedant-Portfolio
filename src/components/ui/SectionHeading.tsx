import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  description,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}
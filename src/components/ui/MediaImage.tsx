import Image from "next/image";
import { cn } from "@/lib/cn";

type MediaImageProps = {
  src: string | null;
  alt: string;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// 16:9 image slot. Shows a neutral placeholder until `src` is set.
export function MediaImage({
  src,
  alt,
  label,
  sizes,
  priority = false,
  className,
}: MediaImageProps) {
  return (
    <div className={cn("relative aspect-video overflow-hidden bg-surface", className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-end p-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px), radial-gradient(70% 90% at 80% 0%, color-mix(in srgb, var(--accent) 18%, transparent), transparent)",
            backgroundSize: "32px 32px, 32px 32px, auto",
          }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
import Link from "next/link";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-accent/50">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="block border-b border-border"
      >
        <MediaImage
          src={project.image}
          alt=""
          label={project.category}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {project.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link href={href} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
        <p className="mt-5 font-mono text-xs leading-5 text-muted">
          {project.tech.slice(0, 6).join(" · ")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={href} size="sm">
            View details
          </Button>
          <Button href={project.repoUrl} newTab variant="secondary" size="sm">
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>
    </article>
  );
}
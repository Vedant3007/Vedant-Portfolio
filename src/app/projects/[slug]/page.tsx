import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FlowDiagram } from "@/components/projects/FlowDiagram";
import { StatStrip } from "@/components/projects/StatStrip";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { DashList } from "@/components/ui/DashList";
import { DataTable } from "@/components/ui/DataTable";
import { MediaImage } from "@/components/ui/MediaImage";
import { projects, type Project, type Section } from "@/content/projects";

// All project pages are generated ahead of time, so a blocking route costs nothing.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

function toId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SectionBlock({ section, project }: { section: Section; project: Project }) {
  const id = `${toId(section.title)}-heading`;

  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {section.title}
      </h2>

      {section.kind === "highlights" && (
        <DashList items={project.highlights} className="mt-6" />
      )}

      {section.kind === "text" && (
        <>
          {section.paragraphs && (
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          {section.bullets && <DashList items={section.bullets} className="mt-6" />}
        </>
      )}

      {section.kind === "architecture" && (
        <figure className="mt-6">
          <FlowDiagram tiers={section.tiers} />
          <figcaption className="mt-4 text-sm text-muted">{section.caption}</figcaption>
        </figure>
      )}

      {section.kind === "table" && (
        <>
          {section.intro && (
            <p className="mt-4 text-base leading-7 text-muted">{section.intro}</p>
          )}
          <div className="mt-6">
            <DataTable columns={section.columns} rows={section.rows} />
          </div>
        </>
      )}

      {section.kind === "image" && (
        <figure className="mt-6">
          <MediaImage
            src={section.src}
            alt={section.alt}
            label={section.title}
            sizes="(min-width: 1024px) 700px, 100vw"
            className="rounded-xl border border-border"
          />
          <figcaption className="mt-3 text-sm text-muted">{section.caption}</figcaption>
        </figure>
      )}
    </section>
  );
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const previous = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <Container className="py-12 sm:py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {project.category}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {project.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={project.repoUrl} newTab>
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </Button>
          <Button href="/contact" variant="secondary">
            Discuss this project
          </Button>
        </div>
      </header>

      <div className="mt-12">
        <MediaImage
          src={project.image}
          alt={project.imageAlt}
          label={project.category}
          sizes="(min-width: 1152px) 1104px, 100vw"
          priority
          className="rounded-2xl border border-border"
        />
      </div>

      <StatStrip stats={project.stats} className="mt-8" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-14">
          {project.sections.map((section) => (
            <SectionBlock
              key={`${section.kind}-${section.title}`}
              section={section}
              project={project}
            />
          ))}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
              Tech stack
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              {project.tech.join(" · ")}
            </p>
          </Card>
          <Card>
            <h2 className="font-mono text-xs uppercase tracking-widest text-accent">
              What this demonstrates
            </h2>
            <DashList items={project.demonstrates} className="mt-4 !text-sm !leading-6" />
          </Card>
        </aside>
      </div>

      <nav
        aria-label="More projects"
        className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="group">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Previous project
            </p>
            <span className="mt-3 block text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div aria-hidden="true" className="hidden sm:block" />
        )}

        <Link
          href={next ? `/projects/${next.slug}` : "/projects"}
          className="group sm:text-right"
        >
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted sm:justify-end">
            {next ? "Next project" : "Back to projects"}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </p>
          <span className="mt-3 block text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
            {next ? next.title : "All projects"}
          </span>
        </Link>
      </nav>
    </Container>
  );
}
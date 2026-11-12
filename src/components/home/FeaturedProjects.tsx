import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/content/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card interactive={project.published} className="relative flex h-full flex-col">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {project.category}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.summary}</p>
      <p className="mt-5 font-mono text-xs leading-5 text-muted">
        {project.tech.join(" · ")}
      </p>
      <div className="mt-5 text-sm">
        {project.published ? (
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-medium after:absolute after:inset-0"
          >
            Read the case study
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span className="text-muted">Case study coming soon</span>
        )}
      </div>
    </Card>
  );
}

export function FeaturedProjects() {
  const primary = projects.filter((project) => project.emphasis === "primary");
  const supporting = projects.filter((project) => project.emphasis === "supporting");

  return (
    <section id="work" aria-label="Featured projects" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            description="Technical case studies covering cloud infrastructure, containerised systems and algorithms."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {primary.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {supporting.map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
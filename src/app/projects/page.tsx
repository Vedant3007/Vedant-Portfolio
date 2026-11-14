import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Vedant Patel covering AWS cloud infrastructure, Kubernetes microservices with monitoring, and graph algorithms.",
};

export default function ProjectsPage() {
  const primary = projects.filter((project) => project.emphasis === "primary");
  const supporting = projects.filter((project) => project.emphasis === "supporting");

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Projects"
        title="Selected projects"
        description="Hands-on work across cloud infrastructure, containerised systems and algorithms. Open a project for the full details, or go straight to the code on GitHub."
      />

      <section aria-labelledby="infra-heading" className="mt-14">
        <h2
          id="infra-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Cloud and systems
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {primary.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      <section aria-labelledby="software-heading" className="mt-16">
        <h2
          id="software-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Software and algorithms
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {supporting.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
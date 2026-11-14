import type { Metadata } from "next";
import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { communityActivities, workExperience } from "@/content/experience";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Vedant Patel, including IT infrastructure support at Cargill Australia, plus mentoring, student leadership and tech community involvement.",
};

export default function ExperiencePage() {
  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Experience"
        title="Where I’ve worked and contributed"
        description="Enterprise IT support and infrastructure experience, alongside mentoring, student leadership and tech community involvement."
      />

      <section aria-labelledby="work-heading" className="mt-14">
        <h2
          id="work-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Professional experience
        </h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {workExperience.map((item) => (
            <ExperienceCard key={item.id} item={item} showMedia />
          ))}
        </div>
      </section>

      <section aria-labelledby="community-heading" className="mt-20">
        <h2
          id="community-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          Community and leadership
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityActivities.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Button href={siteConfig.resumeUrl} newTab>
          Download Resume
        </Button>
        <Button href="/contact" variant="secondary">
          Get in touch
        </Button>
      </div>
    </Container>
  );
}
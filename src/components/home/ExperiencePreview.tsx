import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredRole } from "@/content/experience";

export function ExperiencePreview() {
  return (
    <section aria-label="Experience" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Hands-on enterprise IT"
            description="Frontline and infrastructure support across 16 Australian sites, backed by hands-on cloud and software projects."
          />
          <div className="mt-6">
            <Button href="/experience" variant="secondary">
              View full experience
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight">{featuredRole.role}</h3>
            <p className="mt-1 text-sm text-muted">
              {featuredRole.company} · {featuredRole.location}
            </p>
            <p className="mt-1 font-mono text-xs text-accent">{featuredRole.period}</p>

            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted">
              {featuredRole.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-3 shrink-0 bg-accent"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
import {
  Cloud,
  Code,
  Container as ContainerIcon,
  Server,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/content/home";

const icons = {
  server: Server,
  cloud: Cloud,
  container: ContainerIcon,
  code: Code,
} as const;

export function Capabilities() {
  return (
    <section aria-label="Capabilities" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="From the service desk to the cloud"
            description="Day-to-day enterprise IT experience, backed by hands-on infrastructure and software projects."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.06} className="h-full">
                <Card className="h-full">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
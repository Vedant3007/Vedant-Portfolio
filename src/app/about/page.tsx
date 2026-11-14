import type { Metadata } from "next";
import Image from "next/image";
import {
  Cloud,
  Code,
  Container as ContainerIcon,
  Database,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent, type SkillIcon } from "@/content/about";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Vedant Patel: Computer Science graduate and IT professional with experience in enterprise IT operations, AWS cloud infrastructure and software engineering.",
};

const skillIcons = {
  server: Server,
  cloud: Cloud,
  container: ContainerIcon,
  code: Code,
  database: Database,
} as const satisfies Record<SkillIcon, unknown>;

export default function AboutPage() {
  const { education, certifications, skills, bio } = aboutContent;

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/vedant-web.jpg"
              alt="Portrait of Vedant Patel"
              fill
              priority
              sizes="(min-width: 1024px) 384px, 320px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="Computer Science graduate and IT professional"
          />
          <div className="mt-6 space-y-5 text-base leading-7 text-muted">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            {siteConfig.availability.reach} · {siteConfig.availability.start}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.resumeUrl} newTab>
              Download Resume
            </Button>
            <Button href="/contact" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </div>

      <section aria-label="Education and training" className="mt-24">
        <SectionHeading eyebrow="Education" title="Education and training" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold tracking-tight">{education.title}</h3>
            <p className="mt-1 text-sm text-muted">{education.institution}</p>
            <p className="mt-1 font-mono text-xs text-accent">{education.period}</p>
            <p className="mt-5 text-sm text-muted">{education.result}</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted">
              Relevant coursework
            </p>
            <p className="mt-2 text-sm leading-7 text-muted">
              {education.coursework.join(" · ")}
            </p>
          </Card>

          <div className="space-y-6">
            {certifications.map((certification) => (
              <Card key={certification.title}>
                <h3 className="text-base font-semibold tracking-tight">
                  {certification.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-accent">{certification.date}</p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {certification.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Technical skills" className="mt-24">
        <SectionHeading
          eyebrow="Skills"
          title="Technical skills"
          description="Technologies I have used in professional work or in my projects, grouped by where I used them."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skills.map((skill) => {
            const Icon = skillIcons[skill.icon];
            return (
              <Card key={skill.group} className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">{skill.group}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted">
                  <span className="font-mono uppercase tracking-widest">Used in</span>
                  {" · "}
                  {skill.usedIn}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
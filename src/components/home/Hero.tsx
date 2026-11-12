import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatusPill } from "@/components/ui/StatusPill";
import { heroContent } from "@/content/home";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        backgroundImage:
          "radial-gradient(60% 50% at 85% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent)",
      }}
    >
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {siteConfig.name} · {siteConfig.role}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {heroContent.headline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {heroContent.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/projects">Explore My Work</Button>
            <Button href={siteConfig.resumeUrl} newTab variant="secondary">
              Download Resume
            </Button>
          </div>

          <div className="mt-6 space-y-2">
            <StatusPill>{siteConfig.availability.summary}</StatusPill>
            <p className="text-xs leading-5 text-muted">
              {siteConfig.availability.reach} · {siteConfig.availability.start}
            </p>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
            {heroContent.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-xs leading-5 text-muted">{stat.label}</dt>
                <dd className="font-mono text-2xl font-medium tracking-tight sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto w-full max-w-xs lg:max-w-sm lg:justify-self-end">
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
      </Container>
    </section>
  );
}
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/content/site";

export function ContactCta() {
  return (
    <section aria-label="Contact" className="pb-12 pt-10 sm:pb-16">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Contact
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Hiring for IT, infrastructure or cloud? Let’s talk.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted">
              Send me a message and it goes straight to my inbox.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Send a message</Button>
              <Button href={`mailto:${siteConfig.email}`} variant="secondary">
                Email me
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
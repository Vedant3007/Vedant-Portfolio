import { Container } from "@/components/ui/Container";
import { profileLinks, siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.copyrightYear} {siteConfig.name} · {siteConfig.availability.short}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {profileLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
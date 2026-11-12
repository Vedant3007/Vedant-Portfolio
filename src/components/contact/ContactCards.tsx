import { ArrowUpRight, Briefcase, GitBranch, Mail, MapPin, Phone } from "lucide-react";
import { contactLinks, siteConfig, type ContactIcon } from "@/content/site";

const icons = {
  phone: Phone,
  mail: Mail,
  linkedin: Briefcase,
  github: GitBranch,
} as const satisfies Record<ContactIcon, unknown>;

const iconBox =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-accent";

export function ContactCards() {
  return (
    <ul className="mt-8 space-y-3">
      {contactLinks.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/60"
            >
              <span className={iconBox}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
                  {link.label}
                </span>
                <span className="block truncate text-sm">{link.detail}</span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                aria-hidden="true"
              />
            </a>
          </li>
        );
      })}

      <li>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
          <span className={iconBox}>
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[11px] uppercase tracking-widest text-muted">
              Location
            </span>
            <span className="block text-sm">{siteConfig.location}</span>
          </span>
        </div>
      </li>
    </ul>
  );
}
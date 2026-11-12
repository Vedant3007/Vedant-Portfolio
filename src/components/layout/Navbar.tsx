"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur"
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-medium tracking-tight"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground",
                isActive(item.href) ? "text-foreground" : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <Button href={siteConfig.resumeUrl} newTab variant="secondary" size="sm">
              Resume
            </Button>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm md:hidden"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg md:hidden"
        >
          <Container className="flex flex-col py-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "border-b border-border py-4 text-base",
                  isActive(item.href) ? "text-accent" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button
              href={siteConfig.resumeUrl}
              newTab
              variant="secondary"
              className="my-4 w-full"
            >
              Resume
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
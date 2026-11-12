"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: theme simply won't persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground"
    >
      <Sun className="block h-4 w-4 [[data-theme=light]_&]:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 [[data-theme=light]_&]:block" aria-hidden="true" />
    </button>
  );
}
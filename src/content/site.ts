export const siteConfig = {
  name: "Vedant Patel",
  role: "IT Infrastructure · Cloud · Software Engineering",
  title: "Vedant Patel | IT Infrastructure, Cloud & Software Engineering",
  description:
    "Computer Science graduate and IT professional with experience in enterprise IT operations, AWS cloud infrastructure and software engineering.",
  copyrightYear: 2026,
  resumeUrl: "/resume/Vedant-Patel-CV.pdf",
  email: "vedantpatel1st@gmail.com",
  phone: "+61 410 612 444",
  availability: {
    summary: "Open to graduate and entry-level IT roles",
    short: "Available across Australia",
    reach: "Willing to relocate anywhere in Australia",
    start: "Available to start within one week",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/vedantpatel3007",
    github: "https://github.com/Vedant3007/",
  },
} as const;

// Shown in the footer.
export const profileLinks = [
  { label: "Email", href: `mailto:${siteConfig.email}`, external: false },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "GitHub", href: siteConfig.links.github, external: true },
].filter((link) => link.href);

export type ContactIcon = "phone" | "mail" | "linkedin" | "github";

// Shown on the Contact page (includes the phone number).
export const contactLinks: ReadonlyArray<{
  label: string;
  detail: string;
  href: string;
  external: boolean;
  icon: ContactIcon;
}> = [
  {
    label: "Phone",
    detail: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    external: false,
    icon: "phone",
  },
  {
    label: "Email",
    detail: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    detail: "linkedin.com/in/vedantpatel3007",
    href: siteConfig.links.linkedin,
    external: true,
    icon: "linkedin",
  },
  {
    label: "GitHub",
    detail: "github.com/Vedant3007",
    href: siteConfig.links.github,
    external: true,
    icon: "github",
  },
];
import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];

  const routes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return routes.map((route) => ({ url: `${siteUrl}${route}` }));
}
import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

// Crawling stays allowed so link previews work. Listing in search results is
// controlled by the "noindex" meta tag in layout.tsx.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteConfig.indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
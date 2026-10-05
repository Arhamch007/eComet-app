import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

/* Single-page site: one URL. The old multi-page routes (/services, /work,
   /about, /team, /contact) were dropped from this sitemap when the site
   became one page — leaving them in was sending crawl budget and duplicate-
   content risk to pages the live design no longer links to. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

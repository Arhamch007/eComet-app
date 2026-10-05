import type { MetadataRoute } from "next";
import { noindex, site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview deploys (NEXT_PUBLIC_NOINDEX=1) ask every crawler to stay out.
  if (noindex) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

import type { MetadataRoute } from "next";
import { getAllProjectIds } from "@/lib/projects";
import { exhibitionMode, siteUrl } from "@/lib/site";

// Every page on the site; project pages come straight from lib/projects.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, priority: 1 },
    { url: `${siteUrl}/contact`, priority: 0.8 },
    ...(exhibitionMode ? [] : getAllProjectIds()).map((id) => ({
      url: `${siteUrl}/project/${id}`,
      priority: 0.7,
    })),
  ];
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Everything is open to search engines and AI assistants — being found by
// them is the point. The AI crawlers are named explicitly so no default
// or future rule shuts them out by accident.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

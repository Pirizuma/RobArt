import { profile } from "@/lib/profile";
import { projects, hasPage } from "@/lib/projects";
import { series as allSeries } from "@/lib/series";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

// /llms.txt — a plain-text summary of the site for AI assistants
// (see llmstxt.org). Built at deploy time from lib/profile.ts.
export const dynamic = "force-static";

export function GET() {
  const contactLines = [
    profile.email && `- Email: ${profile.email}`,
    profile.phone && `- Phone: ${profile.phone}`,
    `- Enquiry form: ${siteUrl}/contact`,
  ].filter(Boolean);

  const body = `# ${siteName}

> ${siteDescription}

${profile.name} — ${profile.headline}. Based in ${profile.locationLabel}; taking commissions ${profile.serviceArea}.

## About
${profile.about.join("\n\n")}

## Services
${profile.services.map((s) => `- ${s}`).join("\n")}

## Has worked with
${profile.workedWith.map((w) => `- ${w}`).join("\n")}

## Works
${projects
  .filter(hasPage)
  .map((p) => `- [${p.title}](${siteUrl}/project/${p.id}) — ${p.summary ?? ""}`)
  .join("\n")}

Refractory Period is Robert's current exhibition piece.

## Series
${Object.values(allSeries)
  .map((s) => `### ${s.name}${s.meaning ? ` (“${s.meaning}”)` : ""}\n${s.text}\nWorks: ${projects.filter((p) => p.series && allSeries[p.series] === s).map((p) => p.title).join(", ")}`)
  .join("\n\n")}

## Contact
${contactLines.join("\n")}

## Pages
- [Home — portfolio of work](${siteUrl}/)
- [Contact and commissions](${siteUrl}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

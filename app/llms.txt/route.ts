import { profile } from "@/lib/profile";
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

${profile.name} is a ${profile.role.toLowerCase()} with ${profile.experience} of experience, based in ${profile.locationLabel} and taking on commissions ${profile.serviceArea}.

## Services
${profile.services.map((s) => `- ${s}`).join("\n")}

## Has worked with
${profile.workedWith.map((w) => `- ${w}`).join("\n")}

## Featured work
- Refractory Period (2026) — current exhibition piece

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

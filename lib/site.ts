// Site-wide constants used for metadata, link previews, robots and sitemap.

// Absolute URL of the live site. Set NEXT_PUBLIC_SITE_URL once the domain is
// known (e.g. https://robertmariotti.com). On Vercel it falls back to the
// project's production URL automatically; locally it falls back to localhost.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Imago Studio by Robert Mariotti";

export const siteDescription =
  "Robert Mariotti is a Darwin-based sculptor and artist with over 40 years’ experience specialising in model making, dioramas, and fibreglass sculpture.";

// Next.js replaces (doesn't merge) a page's `openGraph` block with its parent's,
// so every page that sets its own spreads this in to keep the shared fields.
export const openGraphBase = {
  type: "website",
  siteName,
  locale: "en_AU",
} as const;

// Formspree form ID — the part after /f/ in the form's endpoint
// (https://formspree.io/f/<id>). Not a secret: it's sent with every submission.
export const formspreeFormId = "xaeoozll";

// Exhibition (MVP) mode: tiles open a swipeable image modal instead of
// linking to project pages, and project pages aren't built. Set to false
// to restore the full site once titles/descriptions are ready.
export const exhibitionMode = true;

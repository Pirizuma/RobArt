// Site-wide constants used for metadata, link previews, robots and sitemap.

// Absolute URL of the live site — used for canonical links, share previews,
// the sitemap, structured data and /llms.txt. Production builds (including
// Vercel previews) always point at the real domain; local dev uses
// localhost. NEXT_PUBLIC_SITE_URL overrides both if ever needed.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://robartstudio.com"
    : "http://localhost:3000");

export const siteName = "robArt Studio by Robert Mariotti";

export const siteDescription =
  "Robert Mariotti is a Darwin-based sculptor and artist with over 40 years of experience in model making, dioramas and fibreglass sculpture. Commissions taken across Australia and overseas.";

// Next.js replaces (doesn't merge) a page's `openGraph` block with its parent's,
// so every page that sets its own spreads this in to keep the shared fields.
// Large link-preview image (iMessage, WhatsApp, Facebook, LinkedIn…).
// Included in openGraphBase so every page gets it, not just the homepage.
export const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: siteName,
};

export const openGraphBase = {
  type: "website" as const,
  siteName,
  locale: "en_AU",
  images: [shareImage],
};

// Formspree form ID — the part after /f/ in the form's endpoint
// (https://formspree.io/f/<id>). Not a secret: it's sent with every submission.
export const formspreeFormId = "xaeoozll";

// Works with written content (a summary/description in lib/projects.ts) get
// their own page; the rest open straight into the image viewer from the
// homepage. See hasPage() in lib/projects.ts.

// Dates and prices are kept in lib/projects.ts but hidden for now.
// Flip these to show them again.
export const showDates = false;
export const showPrices = false;

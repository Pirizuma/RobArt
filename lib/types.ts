export type Project = {
  /** URL slug: /project/<id>. */
  id: string;
  title: string;
  /** Short one-line statement (tiles, link previews, search, AI summary). */
  summary?: string;
  /** Longer text for the project page, one string per paragraph. */
  description?: string[];
  materials?: string[];
  dimensions?: string;
  weight?: string;
  /** Extra practical notes, e.g. "Requires a power outlet". */
  notes?: string[];
  /** Key into lib/series.ts, for works that belong to a series. */
  series?: string;
  thumbnailImage: string;
  images: string[];

  // ── Kept for later, not shown on the site yet ──────────────────────────
  // Shown again when `showDates` / `showPrices` in lib/site.ts are true.
  year?: number;
  /** Where/when it was shown, e.g. "DVAA Arts Exhibition, 2007". */
  exhibited?: string;
  /** Historical asking price — not displayed. */
  price?: string;
};

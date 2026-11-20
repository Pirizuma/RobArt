import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/lib/projects";
import {
  ProjectCard,
  type TileAspect,
  type TilePad,
} from "@/components/ProjectCard";
import { LiquidGlassButton } from "@/components/LiquidGlassButton";
import { HeroMeshGradient } from "@/components/HeroMeshGradient";
import { openGraphBase } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, url: "/" },
};

function p(id: string) {
  return projects.find((proj) => proj.id === id)!;
}

type Tile = { id: string; aspect: TileAspect; pad: TilePad };
// `gap` defaults to "gap-6 sm:gap-8" when not set.
type Row = { cols: string; gap?: string; tiles: Tile[] };

// Editorial rhythm down the page: 1 → 2 → 3 → 3 (mobile: 1 → 1 → 1 → 2 → 2 → 2).
// The exhibition piece leads; "Other Works" (single-image pieces) closes.
const layout: Row[] = [
  {
    cols: "grid-cols-1",
    tiles: [{ id: "refractory-period", aspect: "wide", pad: "lg" }],
  },
  {
    cols: "grid-cols-1 sm:grid-cols-2",
    tiles: [
      { id: "womb", aspect: "portrait", pad: "lg" },
      { id: "octo", aspect: "portrait", pad: "lg" },
    ],
  },
  // Six small tiles in one grid: 3 rows of 2 on mobile, 2 rows of 3 on sm:+.
  // Vertical gap matches the spacing between the page's other rows.
  {
    cols: "grid-cols-2 sm:grid-cols-3",
    gap: "gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10",
    tiles: [
      { id: "white-chiave", aspect: "square", pad: "sm" },
      { id: "sun-chair", aspect: "square", pad: "sm" },
      { id: "mirror", aspect: "square", pad: "sm" },
      { id: "chair-jacket", aspect: "square", pad: "sm" },
      { id: "sardine", aspect: "square", pad: "sm" },
      { id: "other-works", aspect: "square", pad: "sm" },
    ],
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 sm:space-y-10">

      {/* Hero — single tile, stacks on mobile */}
      <div data-tile="hero" className="relative border border-stone-200 rounded-3xl overflow-hidden">
        {/* Backdrop — paper-design MeshGradient (warm cream/tan) */}
        <div data-tile="hero-bg" aria-hidden className="absolute inset-0">
          <HeroMeshGradient />
        </div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2">

          {/* Portrait half — left on desktop, top on mobile.
              aspect-[4/5] gives it a height on mobile (where it's alone in
              its own row); on sm:+ it instead matches whatever height the
              bio card actually needs, so the two halves always line up
              even when the bio text wraps to more lines than usual. */}
          <div data-tile="hero-portrait" className="relative aspect-[4/5] sm:aspect-auto sm:h-full">
            <div className="absolute inset-[clamp(2rem,7vw,5rem)] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/images/site/portrait.jpg"
                alt="Robert Mariotti"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bio half — right on desktop, bottom on mobile.
              min-height (not aspect-ratio) is what actually gives a normal
              CSS box "prefer this size, but grow if content needs more" —
              aspect-ratio computes a fixed used height once width is known
              and doesn't yield to content. The min-height curve below
              approximates the portrait's own aspect-[4/5] height at each
              width, so the two halves still look matched in the common
              case, but the bio card is free to grow taller when the text
              wraps to more lines than that — it no longer clips. */}
          <div data-tile="hero-bio" className="relative -mt-8 sm:mt-0">
            <div
              className="relative m-[clamp(2rem,7vw,5rem)] min-h-[clamp(260px,38vw,490px)] flex flex-col justify-center"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <div style={{
                position: "absolute",
                inset: 0,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                background: "rgba(255,255,255,0.55)",
                borderRadius: "inherit",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "rgba(255,255,255,0.4) 0px 1px 0px inset, rgba(255,255,255,0.08) 0px 0px 18px inset, rgba(0,0,0,0.25) 0px 8px 32px",
              }} />
              <div className="relative z-10 flex flex-col px-6 py-8 sm:px-8 sm:py-10">
                <h2 className="text-xl font-medium text-stone-900 tracking-tight">Robert Mariotti</h2>
                <p className="mt-4 text-stone-700 leading-relaxed text-sm sm:text-base">
                  Robert Mariotti is a Darwin-based sculptor and artist with
                  over 40 years&rsquo; experience specialising in model making,
                  dioramas, and fibreglass sculpture.
                </p>
                <LiquidGlassButton href="/contact" className="mt-6 sm:mt-8 self-start">
                  Get in touch →
                </LiquidGlassButton>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Project rows — see `layout` above. Rows stack to one column on
          mobile except the small-tile grid, which goes two-up. */}
      {layout.map((row, i) => {
        // Tile width hint for responsive images (container caps at 1152px).
        const sizes =
          row.tiles.length === 1
            ? "(max-width: 1152px) 100vw, 1100px"
            : row.tiles.length === 2
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 50vw, 33vw";
        return (
          <div key={i} className={`grid ${row.cols} ${row.gap ?? "gap-6 sm:gap-8"}`}>
            {row.tiles.map((t) => (
              <ProjectCard key={t.id} project={p(t.id)} aspect={t.aspect} pad={t.pad} sizes={sizes} />
            ))}
          </div>
        );
      })}

    </div>
  );
}

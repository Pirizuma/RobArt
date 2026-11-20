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
type Row = { cols: string; tiles: Tile[] };

// Varied editorial rhythm down the page: 2 → 3 → 1 → 3 → 2.
// "Other Works" (single-image pieces) always closes the page.
const layout: Row[] = [
  {
    cols: "grid-cols-1 sm:grid-cols-2",
    tiles: [
      { id: "womb", aspect: "portrait", pad: "lg" },
      { id: "white-chiave", aspect: "portrait", pad: "lg" },
    ],
  },
  {
    cols: "grid-cols-2 sm:grid-cols-3",
    tiles: [
      { id: "shark", aspect: "square", pad: "sm" },
      { id: "mirror", aspect: "square", pad: "sm" },
      { id: "chair-jacket", aspect: "square", pad: "sm" },
    ],
  },
  {
    cols: "grid-cols-1",
    tiles: [{ id: "sardine", aspect: "wide", pad: "lg" }],
  },
  {
    cols: "grid-cols-2 sm:grid-cols-3",
    tiles: [
      { id: "sun-chair", aspect: "square", pad: "sm" },
      { id: "human", aspect: "square", pad: "sm" },
      { id: "king-tut", aspect: "square", pad: "sm" },
    ],
  },
  {
    cols: "grid-cols-1 sm:grid-cols-2",
    tiles: [
      { id: "octo", aspect: "landscape", pad: "md" },
      { id: "other-works", aspect: "landscape", pad: "md" },
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
                src="/images/Portrait.jpg"
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

      {/* Project rows — varied layout.
          On mobile, a row of 3 would otherwise leave its 3rd tile alone in a
          half-width column with dead space beside it. Instead, tile 1 spans
          the full mobile width and tiles 2+3 pair up cleanly below it — no
          tile ever sits alone at half width. Unaffected on sm:+, where all
          three sit side by side as designed. */}
      {layout.map((row, i) => (
        <div key={i} className={`grid ${row.cols} gap-6 sm:gap-8`}>
          {row.tiles.map((t, ti) => {
            const isFirstOfThree = row.tiles.length === 3 && ti === 0;
            return (
              <div
                key={t.id}
                className={isFirstOfThree ? "col-span-2 sm:col-span-1" : undefined}
              >
                <ProjectCard project={p(t.id)} aspect={t.aspect} pad={t.pad} />
              </div>
            );
          })}
        </div>
      ))}

    </div>
  );
}

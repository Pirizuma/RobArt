"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export type TileAspect = "portrait" | "square" | "landscape" | "wide";
export type TilePad = "sm" | "md" | "lg";

const aspectClass: Record<TileAspect, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

// Fluid padding: scales continuously with viewport width instead of
// jumping at a breakpoint, reaching its max around the site's max-w-6xl
// container cap (1152px) and floored at the old mobile value below that.
const padClass: Record<TilePad, string> = {
  sm: "p-[clamp(1rem,2vw,1.5rem)]",
  md: "p-[clamp(1.5rem,3.5vw,2.5rem)]",
  lg: "p-[clamp(2.5rem,7vw,5rem)]",
};

type ProjectCardProps = {
  project: Project;
  aspect?: TileAspect;
  pad?: TilePad;
};

export function ProjectCard({
  project,
  aspect = "portrait",
  pad = "lg",
}: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 rounded-2xl"
    >
      <article data-tile={`card-${project.id}`}>
        <div className={`border border-stone-200 rounded-3xl ${padClass[pad]}`}>
          <div
            className={`${aspectClass[aspect]} relative overflow-hidden rounded-2xl shadow-sm`}
          >
            <Image
              src={project.thumbnailImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>
          <div
            data-tile={`card-label-${project.id}`}
            className="pt-5 text-left"
          >
            <h2 className="font-light text-stone-900 text-base group-hover:text-stone-500 transition-colors">
              {project.title}
            </h2>
            <p className="text-stone-400 text-sm mt-0.5">{project.year}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

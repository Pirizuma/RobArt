"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { imageSizes } from "@/lib/imageSizes";
import { imagePlaceholders } from "@/lib/imagePlaceholders";
import { preloadViewerImages } from "@/lib/preloadViewerImages";
import { Lightbox } from "@/components/Lightbox";
import { showDates, showPrices } from "@/lib/site";
import { noWidow } from "@/lib/text";
import type { Project } from "@/lib/types";

/**
 * A work's own page: title, statement and details above a masonry gallery.
 * Tapping a photo opens the same swipeable viewer as the homepage tiles,
 * starting on that photo.
 */
export function ProjectView({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = project.images.length;

  const details = [
    project.materials?.length && { label: "Materials", value: project.materials.join(", ") },
    project.dimensions && { label: "Dimensions", value: project.dimensions },
    project.weight && { label: "Weight", value: project.weight },
    showDates && project.year && { label: "Year", value: String(project.year) },
    showPrices && project.price && { label: "Price", value: project.price },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center -my-2 text-stone-500 hover:text-stone-900 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 rounded"
        >
          ← Back
        </Link>

        <header className="max-w-3xl mt-6 sm:mt-8">
          <h1 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            {project.title}
          </h1>

          {project.summary && (
            <p className="mt-4 text-lg sm:text-xl font-light text-stone-700 leading-relaxed">
              {noWidow(project.summary)}
            </p>
          )}

          {project.description?.map((para) => (
            <p key={para.slice(0, 24)} className="mt-4 text-stone-600 leading-relaxed">
              {noWidow(para)}
            </p>
          ))}

          {(details.length > 0 || project.notes?.length) && (
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-xs uppercase tracking-wider text-stone-500">{d.label}</dt>
                  <dd className="mt-1 text-stone-900">{d.value}</dd>
                </div>
              ))}
              {project.notes?.map((note) => (
                <div key={note}>
                  <dt className="text-xs uppercase tracking-wider text-stone-500">Note</dt>
                  <dd className="mt-1 text-stone-900">{note}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {/* Masonry gallery: photos keep their natural proportions and flow
            into the shortest column (1 → 2 → 3 columns as the screen widens). */}
        <div className="mt-10 sm:mt-14 columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          {project.images.map((src, idx) => {
            const dims = imageSizes[src];
            const blur = imagePlaceholders[src];
            return (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                onPointerEnter={() => preloadViewerImages(project.images.slice(idx), 1)}
                onFocus={() => preloadViewerImages(project.images.slice(idx), 1)}
                aria-label={`View ${project.title}, image ${idx + 1} of ${total}`}
                className="group mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-stone-100 shadow-sm cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
              >
                <Image
                  src={src}
                  alt=""
                  width={dims ? dims[0] : 1200}
                  height={dims ? dims[1] : 1200}
                  priority={idx < 2}
                  placeholder={blur ? "blur" : "empty"}
                  blurDataURL={blur}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          title={project.title}
        />
      )}
    </>
  );
}

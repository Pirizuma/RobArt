"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { imageSizes } from "@/lib/imageSizes";
import { Lightbox } from "@/components/Lightbox";
import type { Project } from "@/lib/types";

/** Interactive project detail: header text, masonry gallery, lightbox. */
export function ProjectView({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const total = project.images.length;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          href="/"
          className="inline-block text-stone-500 hover:text-stone-900 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 rounded"
        >
          ← Back
        </Link>

        {/* Text header — above the gallery on every breakpoint */}
        <header className="max-w-3xl mt-8">
          <h1 className="text-3xl sm:text-4xl font-light text-stone-900 tracking-tight">
            {project.title}
          </h1>
          <p className="text-stone-500 mt-1">{project.year}</p>

          <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <dt className="text-stone-500 text-sm">Materials</dt>
              <dd className="text-stone-900 mt-0.5">
                {project.materials.join(", ")}
              </dd>
            </div>
            {project.dimensions && (
              <div>
                <dt className="text-stone-500 text-sm">Dimensions</dt>
                <dd className="text-stone-900 mt-0.5">{project.dimensions}</dd>
              </div>
            )}
          </dl>

          <p className="mt-6 text-stone-700 leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Gallery — masonry: images flow up into the shortest column so there
            are no row gaps. Gets denser as the screen widens (1 → 2 → 3
            columns). At every column width images stay well under the height
            cap, so no per-image sizing rule is needed. */}
        <div className="mt-10 sm:mt-14 columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          {project.images.map((src, idx) => {
            const dims = imageSizes[src];
            return (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={`View ${project.title}, image ${idx + 1} of ${total}`}
                className="group mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-stone-100 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
              >
                <Image
                  src={src}
                  alt={`${project.title} — image ${idx + 1}`}
                  width={dims ? dims[0] : 0}
                  height={dims ? dims[1] : 0}
                  priority={idx === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  unoptimized={src.startsWith("http")}
                />
              </button>
            );
          })}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={project.images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectIds, getProjectById } from "@/lib/projects";
import { imageSizes } from "@/lib/imageSizes";
import { ProjectView } from "@/components/ProjectView";
import { openGraphBase, siteUrl } from "@/lib/site";
import { series as allSeries } from "@/lib/series";

type Props = { params: Promise<{ id: string }> };

// Pre-render every project page at build time (fast, and crawlable).
// Only works with written content get a page (see hasPage in lib/projects.ts).
export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id }));
}

// Unknown project ids 404 instead of rendering on demand.
export const dynamicParams = false;

function summarise(text: string, max = 160) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)) + "…";
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById((await params).id);
  if (!project) return {};

  const description = summarise(project.summary ?? project.description?.join(" ") ?? "");
  const dims = imageSizes[project.thumbnailImage];
  const image = {
    url: project.thumbnailImage,
    alt: project.title,
    ...(dims && { width: dims[0], height: dims[1] }),
  };

  // e.g. "Once Upon A Time — Sculpture by Robert Mariotti"
  const title = `${project.title} — Sculpture by Robert Mariotti`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/project/${project.id}` },
    openGraph: {
      ...openGraphBase,
      title,
      description,
      url: `/project/${project.id}`,
      images: [image],
    },
    twitter: { title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectById((await params).id);
  if (!project) notFound();

  // schema.org VisualArtwork, linked to Robert's Person entry (#robert-mariotti
  // in components/StructuredData.tsx) so search engines and AI assistants
  // connect each work to the artist.
  const s = project.series ? allSeries[project.series] : undefined;
  const artwork = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "@id": `${siteUrl}/project/${project.id}#artwork`,
    name: project.title,
    url: `${siteUrl}/project/${project.id}`,
    description: [project.summary, ...(project.description ?? [])]
      .filter(Boolean)
      .join(" "),
    artform: "Sculpture",
    creator: { "@id": `${siteUrl}/#robert-mariotti` },
    image: project.images.slice(0, 6).map((src) => `${siteUrl}${src}`),
    ...(project.materials && { artMedium: project.materials.join(", ") }),
    // Order of the three measurements isn't specified in the source, so
    // they're published as written rather than as width/height/depth.
    ...(project.dimensions && { size: project.dimensions }),
    ...(s && { isPartOf: { "@type": "CreativeWorkSeries", name: s.name, description: s.text } }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artwork) }}
      />
      <ProjectView project={project} />
    </>
  );
}

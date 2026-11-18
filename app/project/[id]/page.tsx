import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectIds, getProjectById } from "@/lib/projects";
import { imageSizes } from "@/lib/imageSizes";
import { ProjectView } from "@/components/ProjectView";
import { openGraphBase } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

// Pre-render every project page at build time (fast, and crawlable).
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

  const description = summarise(project.description);
  const dims = imageSizes[project.thumbnailImage];
  const image = {
    url: project.thumbnailImage,
    alt: project.title,
    ...(dims && { width: dims[0], height: dims[1] }),
  };

  return {
    title: project.title,
    description,
    alternates: { canonical: `/project/${project.id}` },
    openGraph: {
      ...openGraphBase,
      title: project.title,
      description,
      url: `/project/${project.id}`,
      images: [image],
    },
    twitter: { title: project.title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectById((await params).id);
  if (!project) notFound();
  return <ProjectView project={project} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailsPage } from "@/components/project-details-page";
import { getCaseStudyBySlug, getProjectBySlug } from "@/lib/sanity/content";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project case study could not be found.",
    };
  }

  return {
    title: `${project.name} Project Details`,
    description: project.oneLiner,
  };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const caseStudy = await getCaseStudyBySlug(slug);

  return <ProjectDetailsPage project={project} caseStudy={caseStudy} />;
}

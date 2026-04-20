import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceDetailPage } from "@/components/experience-detail-page";
import { getExperienceBySlug, getSiteSettings } from "@/lib/sanity/content";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "This experience could not be found.",
    };
  }

  return {
    title: `${experience.title} · ${experience.company}`,
    description: experience.summary,
  };
}

export default async function ExperienceDetailRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const siteSettings = await getSiteSettings();
  return <ExperienceDetailPage experience={experience} siteTitle={siteSettings?.siteTitle} />;
}

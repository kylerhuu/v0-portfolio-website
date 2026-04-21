import { ProjectLegalFooter } from "@/components/project-legal-footer";
import { getLegalPagesByProjectSlug, getProjectBySlug, getSiteSettings } from "@/lib/sanity/content";

export default async function ProjectSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [legalPages, project, siteSettings] = await Promise.all([
    getLegalPagesByProjectSlug(slug),
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  const name = project?.name ?? slug;
  const pagesWithPath = legalPages
    .filter((p) => p.projectLegalPath?.trim())
    .sort((a, b) => (a.title ?? "").localeCompare(b.title ?? "", undefined, { sensitivity: "base" }));

  const showWebsiteLegal = project?.showWebsiteLegalInProductFooter !== false;

  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <ProjectLegalFooter
        projectSlug={slug}
        projectName={name}
        productLegalFooterHeading={project?.productLegalFooterHeading}
        showWebsiteLegalLinks={showWebsiteLegal}
        legalPages={pagesWithPath}
        siteSettings={siteSettings}
      />
    </>
  );
}
